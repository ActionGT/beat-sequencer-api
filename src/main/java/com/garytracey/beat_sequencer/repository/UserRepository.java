package com.garytracey.beat_sequencer.repository;
import com.garytracey.beat_sequencer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // This method will be used by Spring Security to find a user by their username
    Optional<User> findByUsername(String username);
}