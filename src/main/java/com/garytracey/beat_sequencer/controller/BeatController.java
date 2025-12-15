package com.garytracey.beat_sequencer.controller;

import java.util.UUID;
import org.springframework.web.bind.annotation.PathVariable;
import com.garytracey.beat_sequencer.dto.BeatResponseDto;
import com.garytracey.beat_sequencer.dto.CreateBeatRequest;
import com.garytracey.beat_sequencer.service.BeatService;
import com.garytracey.beat_sequencer.service.SecurityUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*; // Make sure this is imported
import java.util.List;
import org.springframework.security.access.AccessDeniedException;
import java.util.UUID;

@RestController
@RequestMapping("/api/beats")
public class BeatController {

    private final BeatService beatService; // Inject our new service

    public BeatController(BeatService beatService) {
        this.beatService = beatService; // No more repositories
    }

    @PostMapping
    public ResponseEntity<String> saveBeat(@RequestBody CreateBeatRequest createBeatRequest,
                                           @AuthenticationPrincipal SecurityUser securityUser) {

        // Delegate all logic to the service
        beatService.saveBeat(createBeatRequest, securityUser);

        return new ResponseEntity<>("Beat saved successfully!", HttpStatus.CREATED);
    }

    @PostMapping("/{beatId}/share")
    public ResponseEntity<String> generateShareLink(@PathVariable Long beatId,
                                                    @AuthenticationPrincipal SecurityUser securityUser) {
        try {
            String shareId = beatService.generateShareId(beatId, securityUser);
            // We'll return the full, shareable path as a convenience
            String shareUrl = "/api/beats/public/" + shareId;
            return ResponseEntity.ok(shareUrl);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
        catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BeatResponseDto>> getMyBeats(@AuthenticationPrincipal SecurityUser securityUser) {

        // Delegate all logic to the service
        List<BeatResponseDto> beatDtos = beatService.getMyBeats(securityUser);

        return ResponseEntity.ok(beatDtos);
    }
    @GetMapping("/public/{shareId}")
    public ResponseEntity<BeatResponseDto> getBeatByShareId(@PathVariable UUID shareId) {
        try {
            BeatResponseDto beatDto = beatService.getPublicBeat(shareId);
            return ResponseEntity.ok(beatDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }



}