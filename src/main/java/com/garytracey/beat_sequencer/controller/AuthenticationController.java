package com.garytracey.beat_sequencer.controller;

import com.garytracey.beat_sequencer.dto.RegistrationRequest;
import com.garytracey.beat_sequencer.model.User;
import com.garytracey.beat_sequencer.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth") // Base URL for all endpoints in this controller
public class AuthenticationController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        // Check if user already exists
        if (userRepository.findByUsername(registrationRequest.username()).isPresent()) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }

        // Create new user
        User newUser = new User();
        newUser.setUsername(registrationRequest.username());
        newUser.setPassword(passwordEncoder.encode(registrationRequest.password()));

        userRepository.save(newUser);

        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }
}