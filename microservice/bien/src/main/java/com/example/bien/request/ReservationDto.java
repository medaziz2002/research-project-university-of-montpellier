package com.example.bien.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ReservationDto {
    private Long idReservation;
    private UUID idLocataire;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private Float prixTotal;
    private Float montantPaye;
    private LocalDateTime dateReservation;
    private String statut;
    private LocataireDto locataireDto;
}
