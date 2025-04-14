package com.example.bien.repository;

import com.example.bien.entities.Proprietaire;
import com.example.bien.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ProprietaireRepo  extends JpaRepository<Proprietaire, UUID> {




    @Query("SELECT p FROM Proprietaire p WHERE p.id_user = :userId")
    Proprietaire findProprietaireById_user(@Param("userId") Long userId);



}
