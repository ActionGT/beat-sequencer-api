package com.garytracey.beat_sequencer.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data // Lombok: Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor // Lombok: Generates a no-argument constructor
@AllArgsConstructor // Lombok: Generates a constructor with all arguments
@Entity // Tells JPA this class is a database entity
@Table(name = "users") // Specifies the table name in the database
public class User {

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increments the ID
    private Long id;

    @Column(nullable = false, unique = true) // DB constraints: cannot be null, must be unique
    private String username;

    @Column(nullable = false) // DB constraint: cannot be null
    private String password;

}
