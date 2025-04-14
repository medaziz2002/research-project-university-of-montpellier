package com.example.bien.entities;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "annonces")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Annonce  {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String titre;
    private int nbchambre;
    private int nblits;
    private String etat;
    private double superficie;
    private String status;

    private double prixHiver;
    private double prixEte;
    private double prixPrintemps;
    private double prixAutomne;
    private Date createdAt;
    private String pays;
    private String ville;
    private String gouvernorat;
    private String rue;
    private String code_postal;





    private double latitude;
    private double longitude;
    @ManyToOne
    @JoinColumn(name = "type_bien_id")
    private TypeBien typeBien;



    @ManyToOne
    @JoinColumn(name = "proprietaire_id")
    private Proprietaire proprietaire;

    @OneToMany(mappedBy = "annonce")
    private List<Image> images;


}