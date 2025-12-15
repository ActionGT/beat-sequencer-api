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
import com.garytracey.beat_sequencer.dto.LoginRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/auth") // Base URL for all endpoints in this controller
public class AuthenticationController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    // Add AuthenticationManager here
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(UserRepository userRepository, PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
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
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Try to authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    )
            );

            // 2. If successful, set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3. Return success (We'll return a JWT token here later)
            return ResponseEntity.ok("User logged in successfully!");

        } catch (Exception e) {
            // If authentication fails (bad username/password)
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }
}