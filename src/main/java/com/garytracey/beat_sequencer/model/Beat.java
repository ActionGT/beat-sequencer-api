package com.garytracey.beat_sequencer.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "beats")
public class Beat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // We use @Lob to store a large text object, like a JSON string
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String pattern;

    // --- Relationship ---
    @ManyToOne(fetch = FetchType.LAZY) // Many beats can belong to one user
    @JoinColumn(name = "user_id", nullable = false) // The foreign key column in this table
    private User user;

}