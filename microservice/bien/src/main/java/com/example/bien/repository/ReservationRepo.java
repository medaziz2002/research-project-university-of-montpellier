package com.example.bien.repository;

import com.example.bien.entities.Proprietaire;
import com.example.bien.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
}
