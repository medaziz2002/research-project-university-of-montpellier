package com.example.bien.repository;

import com.example.bien.entities.Locataire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocataireRepo  extends JpaRepository<Locataire, UUID> {
}
