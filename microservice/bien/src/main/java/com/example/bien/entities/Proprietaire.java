package com.example.bien.entities;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "proprietaires")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Proprietaire {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id = UUID.randomUUID();
    @Transient
    private Utilisateur utilisateur;
    private Long id_user;

    @OneToMany(mappedBy = "proprietaire")
    private List<Annonce> annonces;

}