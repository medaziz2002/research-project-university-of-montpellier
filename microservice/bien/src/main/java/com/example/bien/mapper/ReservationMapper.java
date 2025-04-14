package com.example.bien.mapper;

import com.example.bien.entities.Locataire;
import com.example.bien.entities.Reservation;
import com.example.bien.openfeign.AuthentificationFeign;
import com.example.bien.repository.LocataireRepo;
import com.example.bien.request.LocataireDto;
import com.example.bien.request.ReservationDto;


import com.example.bien.request.UserRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Component
@AllArgsConstructor
public class ReservationMapper {

    private final LocataireRepo locataireRepo;

    private final AuthentificationFeign authentificationFeign;




    public Reservation toEntity(ReservationDto dto) {
        Reservation.ReservationBuilder builder = Reservation.builder()
                .idReservation(dto.getIdReservation())
                .dateDebut(dto.getDateDebut())
                .dateFin(dto.getDateFin())
                .prixTotal(dto.getPrixTotal())
                .dateReservation(LocalDateTime.ofInstant(new Date().toInstant(), ZoneId.systemDefault()))
                .statut(dto.getStatut() != null ? Reservation.Statut.valueOf(dto.getStatut()) : Reservation.Statut.EnAttente);

        if(dto.getIdLocataire() != null) {
            builder.locataire(locataireRepo.findById(dto.getIdLocataire()).get());
        }

        return builder.build();
    }

    public ReservationDto toDto(Reservation entity) {


        UserRequest userRequest = authentificationFeign.getUserByLocataireId(entity.getLocataire().getId()).getBody();


        ReservationDto.ReservationDtoBuilder builder = ReservationDto.builder()
                .idReservation(entity.getIdReservation())
                .idLocataire(entity.getLocataire().getId())
                .dateDebut(entity.getDateDebut())
                .dateFin(entity.getDateFin())
                .prixTotal(entity.getPrixTotal())
                .dateReservation(entity.getDateReservation())
                .statut(entity.getStatut().name());


        if (userRequest != null) {
            builder.locataireDto(LocataireDto.builder()
                    .nom(userRequest.getNom())
                    .prenom(userRequest.getPrenom())
                    .build());
        }


        return builder.build();
    }

}

