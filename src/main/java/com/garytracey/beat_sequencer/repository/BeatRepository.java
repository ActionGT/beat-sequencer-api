package com.garytracey.beat_sequencer.repository;

import com.garytracey.beat_sequencer.model.Beat;
import com.garytracey.beat_sequencer.model.User; // <-- You may be missing this import
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // <-- You may be missing this import
import java.util.Optional;
import java.util.UUID;

public interface BeatRepository extends JpaRepository<Beat, Long> {

    // THIS IS THE LINE YOU NEED TO ADD:
    List<Beat> findByUser(User user);
    // Find a 'Beat' where the 'shareId' field matches the provided UUID
    Optional<Beat> findByShareId(UUID shareId);
}