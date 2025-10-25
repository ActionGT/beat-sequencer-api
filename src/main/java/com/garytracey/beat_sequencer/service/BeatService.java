package com.garytracey.beat_sequencer.service;

import com.garytracey.beat_sequencer.dto.BeatResponseDto;
import com.garytracey.beat_sequencer.dto.CreateBeatRequest;
import com.garytracey.beat_sequencer.model.Beat;
import com.garytracey.beat_sequencer.model.User;
import com.garytracey.beat_sequencer.repository.BeatRepository;
import com.garytracey.beat_sequencer.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BeatService {

    private final BeatRepository beatRepository;
    private final UserRepository userRepository;

    public BeatService(BeatRepository beatRepository, UserRepository userRepository) {
        this.beatRepository = beatRepository;
        this.userRepository = userRepository;
    }

    // This annotation ensures the whole method runs in one transaction
    @Transactional
    public void saveBeat(CreateBeatRequest createBeatRequest, SecurityUser securityUser) {
        User currentUser = userRepository.findByUsername(securityUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Beat newBeat = new Beat();
        newBeat.setName(createBeatRequest.name());
        newBeat.setPattern(createBeatRequest.pattern());
        newBeat.setUser(currentUser);

        beatRepository.save(newBeat);
    }

    // This annotation solves our LOB error!
    @Transactional(readOnly = true)
    public List<BeatResponseDto> getMyBeats(SecurityUser securityUser) {
        User currentUser = userRepository.findByUsername(securityUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Beat> userBeats = beatRepository.findByUser(currentUser);

        // Because this map() is now INSIDE the transaction,
        // beat.getPattern() can successfully load the LOB data.
        return userBeats.stream()
                .map(beat -> new BeatResponseDto(beat.getId(), beat.getName(), beat.getPattern()))
                .collect(Collectors.toList());
    }
    @Transactional
    public String generateShareId(Long beatId, SecurityUser securityUser) {
        // 1. Find the beat by its primary ID
        Beat beat = beatRepository.findById(beatId)
                .orElseThrow(() -> new RuntimeException("Beat not found with id: " + beatId));

        // 2. SECURITY CHECK: Ensure the logged-in user owns this beat
        if (!beat.getUser().getUsername().equals(securityUser.getUsername())) {
            throw new AccessDeniedException("You do not have permission to share this beat.");
        }

        // 3. Generate a shareId if it doesn't already have one
        if (beat.getShareId() == null) {
            beat.setShareId(UUID.randomUUID());
            beatRepository.save(beat); // Save the updated beat
        }

        // 4. Return the shareable ID as a string
        return beat.getShareId().toString();
    }
    // This is the method for our public (non-authenticated) endpoint
    @Transactional(readOnly = true)
    public BeatResponseDto getPublicBeat(UUID shareId) {
        // 1. Find the beat in the DB using the new repository method
        Beat beat = beatRepository.findByShareId(shareId)
                .orElseThrow(() -> new RuntimeException("Beat not found with shareId: " + shareId));

        // 2. Convert the Beat entity to our safe DTO and return it
        // (This runs inside the transaction, so the @Lob is loaded safely)
        return new BeatResponseDto(beat.getId(), beat.getName(), beat.getPattern());
    }
}