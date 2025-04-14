package com.example.bien.service;

import com.example.bien.entities.Locataire;
import com.example.bien.entities.Reservation;
import com.example.bien.mapper.ReservationMapper;
import com.example.bien.repository.LocataireRepo;
import com.example.bien.repository.ReservationRepo;
import com.example.bien.request.ReservationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService  {

    private final ReservationRepo reservationRepository;
    private final LocataireRepo locataireRepository;
    private final ReservationMapper mapper;


    public ReservationDto createReservation(ReservationDto dto) {


        Reservation reservation = mapper.toEntity(dto);
        reservation = reservationRepository.save(reservation);

        return mapper.toDto(reservation);
    }


    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }


    public ReservationDto getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée"));
        return mapper.toDto(reservation);
    }


    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }



    public void confirmPayment(Long idContrat) {
        Reservation reservation = reservationRepository.findById(idContrat)
                .orElseThrow(() -> new RuntimeException("Réservation non trouvée avec l'id : " + idContrat));

        reservation.setStatut(Reservation.Statut.Confirmee);
        reservationRepository.save(reservation);
    }


}
