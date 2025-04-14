package ter.behome.microservice_authentification.entities;


import java.util.*;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class Utilisateur   {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(nullable = false)
    private String nom;
    @Column(nullable = false)
    private String prenom;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private Date dateNaissance;
    private UUID tokenToResetPassword;
    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean etat;
    @OneToOne
    private Image image;

    @Transient
    private Locataire locataire;
    @Column(name = "locataire_id") // Assurez-vous que cette annotation est correcte
    private UUID locataireId;


    @Transient
    private Proprietaire proprietaire;
    private  UUID proprietaire_id ;



    @OneToOne
    private MotDePasse motdepasse;



    private String role;


}

