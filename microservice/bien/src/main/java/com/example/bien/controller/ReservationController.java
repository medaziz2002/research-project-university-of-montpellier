package com.example.bien.controller;

import com.example.bien.request.ReservationDto;
import com.example.bien.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Long> createReservation(@RequestBody ReservationDto dto) {
        ReservationDto created = reservationService.createReservation(dto);
        Long reservationId = created.getIdReservation();

        return ResponseEntity.ok(reservationId);
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        List<ReservationDto> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable Long id) {
        ReservationDto reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idContrat}/confirm-payment")
    public ResponseEntity<Void> confirmPayment(@PathVariable("idContrat") Long idContrat) {
        reservationService.confirmPayment(idContrat);
        return ResponseEntity.ok().build();
    }



}
