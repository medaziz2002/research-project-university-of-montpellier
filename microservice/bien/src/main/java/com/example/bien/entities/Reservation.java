package com.example.bien.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation") // "booking" traduit par "reservation"
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReservation;

    // Utilisateur qui effectue la réservation
    @ManyToOne
    @JoinColumn(name = "id_locataire", nullable = false)
    private Locataire locataire;



    // Date de début de la réservation
    @Column(nullable = false)
    private LocalDate dateDebut;

    // Date de fin de la réservation
    @Column(nullable = false)
    private LocalDate dateFin;

    // Prix total de la réservation
    @Column(nullable = false)
    private Float prixTotal;





    // Date à laquelle la réservation a été effectuée
    @Column(nullable = false)
    private LocalDateTime dateReservation = LocalDateTime.now();

    // Statut de la réservation : En attente, Confirmée ou Annulée
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Statut statut = Statut.EnAttente;




    public enum Statut {
        EnAttente, Confirmee, Annulee
    }

}
