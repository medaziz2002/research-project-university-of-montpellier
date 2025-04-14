package com.example.bien.entities;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.List;

@Entity
@Table(name = "type_biens")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class TypeBien  {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String nom;

    @Column(length = 2000)
    private String description;

    @OneToMany(mappedBy = "typeBien")
    private List<Annonce> annonces;

    @OneToOne
    private Image image;

}