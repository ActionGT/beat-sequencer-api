package com.garytracey.beat_sequencer.controller;

import com.garytracey.beat_sequencer.dto.BeatResponseDto;
import com.garytracey.beat_sequencer.dto.CreateBeatRequest;
import com.garytracey.beat_sequencer.service.BeatService;
import com.garytracey.beat_sequencer.service.SecurityUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*; // Make sure this is imported

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<BeatResponseDto>> getMyBeats(@AuthenticationPrincipal SecurityUser securityUser) {

        // Delegate all logic to the service
        List<BeatResponseDto> beatDtos = beatService.getMyBeats(securityUser);

        return ResponseEntity.ok(beatDtos);
    }
}