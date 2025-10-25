package com.garytracey.beat_sequencer.service;

import com.garytracey.beat_sequencer.dto.BeatResponseDto;
import com.garytracey.beat_sequencer.dto.CreateBeatRequest;
import com.garytracey.beat_sequencer.model.Beat;
import com.garytracey.beat_sequencer.model.User;
import com.garytracey.beat_sequencer.repository.BeatRepository;
import com.garytracey.beat_sequencer.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Import this!

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
}