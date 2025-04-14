package com.example.bien.repository;

import com.example.bien.entities.Annonce;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnnonceRepo extends JpaRepository<Annonce, Long> {
    // Méthodes de base (sans filtres de prix)
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndTypeBienId(
            String etat, String status, String titre, String gouvernorat, Long typeBienId, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernorat(
            String etat, String status, String titre, String gouvernorat, Pageable pageable);

    Page<Annonce> findByEtatAndStatus(String etat, String status, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndGouvernorat(String etat, String status, String gouvernorat, Pageable pageable);

    Page<Annonce> findByEtat(String etat, Pageable pageable);
    Page<Annonce> findByStatus(String status, Pageable pageable);
    Page<Annonce> findByTitreContaining(String titre, Pageable pageable);
    Page<Annonce> findByGouvernorat(String gouvernorat, Pageable pageable);
    Page<Annonce> findByTypeBienId(Long typeBienId, Pageable pageable);

    // Méthodes pour PRINTEMPS
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixPrintempsBetweenAndTypeBienId(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Long typeBienId, Pageable pageable);

    Page<Annonce> findByTitreContainingAndGouvernoratAndPrixPrintempsBetween(
            String titre, String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByGouvernoratAndPrixPrintempsBetween(
            String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixPrintempsBetween(double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixPrintempsGreaterThanEqual(double prixMin, Pageable pageable);

    Page<Annonce> findByPrixPrintempsLessThanEqual(double prixMax, Pageable pageable);

    // Méthodes pour ETE
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixEteBetweenAndTypeBienId(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Long typeBienId, Pageable pageable);

    Page<Annonce> findByTitreContainingAndGouvernoratAndPrixEteBetween(
            String titre, String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByGouvernoratAndPrixEteBetween(
            String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixEteBetween(double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixEteGreaterThanEqual(double prixMin, Pageable pageable);

    Page<Annonce> findByPrixEteLessThanEqual(double prixMax, Pageable pageable);

    // Méthodes pour AUTOMNE
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixAutomneBetweenAndTypeBienId(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Long typeBienId, Pageable pageable);

    Page<Annonce> findByTitreContainingAndGouvernoratAndPrixAutomneBetween(
            String titre, String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByGouvernoratAndPrixAutomneBetween(
            String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixAutomneBetween(double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixAutomneGreaterThanEqual(double prixMin, Pageable pageable);

    Page<Annonce> findByPrixAutomneLessThanEqual(double prixMax, Pageable pageable);

    // Méthodes pour HIVER
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixHiverBetweenAndTypeBienId(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Long typeBienId, Pageable pageable);

    Page<Annonce> findByTitreContainingAndGouvernoratAndPrixHiverBetween(
            String titre, String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByGouvernoratAndPrixHiverBetween(
            String gouvernorat, double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixHiverBetween(double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByPrixHiverGreaterThanEqual(double prixMin, Pageable pageable);

    Page<Annonce> findByPrixHiverLessThanEqual(double prixMax, Pageable pageable);

    // Méthodes combinées sans typeBienId
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixPrintempsBetween(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixEteBetween(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixAutomneBetween(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixHiverBetween(
            String etat, String status, String titre, String gouvernorat,
            double prixMin, double prixMax, Pageable pageable);


    Page<Annonce> findByEtatAndStatusAndTypeBien_Id(
            String etat, String status, Long typeBienId, Pageable pageable);


    Page<Annonce> findByEtatAndStatusAndTitre(String etat, String status, String titre, Pageable pageable);
    Page<Annonce> findByEtatAndStatusAndTitreContainingIgnoreCase(String etat, String status, String titre, Pageable pageable);


    // Recherche pour le printemps
    Page<Annonce> findByEtatAndStatusAndPrixPrintempsBetween(
            String etat, String status, Double prixMin, Double prixMax, Pageable pageable);

    // Recherche pour l'été
    Page<Annonce> findByEtatAndStatusAndPrixEteBetween(
            String etat, String status, Double prixMin, Double prixMax, Pageable pageable);

    // Recherche pour l'automne
    Page<Annonce> findByEtatAndStatusAndPrixAutomneBetween(
            String etat, String status, Double prixMin, Double prixMax, Pageable pageable);

    // Recherche pour l'hiver
    Page<Annonce> findByEtatAndStatusAndPrixHiverBetween(
            String etat, String status, Double prixMin, Double prixMax, Pageable pageable);




    Page<Annonce> findByEtatAndStatusAndTitreContainingIgnoreCaseAndPrixPrintempsBetween(
            String etat, String status, String titre, Double prixMin, Double prixMax, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingIgnoreCaseAndPrixEteBetween(
            String etat, String status, String titre, Double prixMin, Double prixMax, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingIgnoreCaseAndPrixAutomneBetween(
            String etat, String status, String titre, Double prixMin, Double prixMax, Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndTitreContainingIgnoreCaseAndPrixHiverBetween(
            String etat, String status, String titre, Double prixMin, Double prixMax, Pageable pageable);



    Page<Annonce> findByEtatAndStatusAndTitreContainingAndTypeBienId(
            String etat,
            String status,
            String titre,
            Long typeBienId,
            Pageable pageable);


    Page<Annonce> findByEtatAndStatusAndPrixAutomneBetweenAndGouvernorat(
            String etat, String status, Double prixMin, Double prixMax, String gouvernorat, Pageable pageable);


    Page<Annonce> findByEtatAndStatusAndPrixHiverBetweenAndGouvernorat(
            String etat, String status, Double prixMin, Double prixMax, String gouvernorat, Pageable pageable);


    Page<Annonce> findByEtatAndStatusAndPrixEteBetweenAndGouvernorat(
            String etat, String status, Double prixMin, Double prixMax, String gouvernorat, Pageable pageable);



    Page<Annonce> findByEtatAndStatusAndPrixPrintempsBetweenAndGouvernorat(
            String etat, String status, Double prixMin, Double prixMax, String gouvernorat, Pageable pageable);


    Page<Annonce> findByTitreAndPrixPrintempsBetween(String titre, Double prixMin, Double prixMax, Pageable pageable);

    // Méthode pour rechercher par titre et prix en été
    Page<Annonce> findByTitreAndPrixEteBetween(String titre, Double prixMin, Double prixMax, Pageable pageable);

    // Méthode pour rechercher par titre et prix en automne
    Page<Annonce> findByTitreAndPrixAutomneBetween(String titre, Double prixMin, Double prixMax, Pageable pageable);

    // Méthode pour rechercher par titre et prix en hiver
    Page<Annonce> findByTitreAndPrixHiverBetween(String titre, Double prixMin, Double prixMax, Pageable pageable);



    Page<Annonce> findByEtatAndStatusAndTitreContainingAndPrixPrintempsBetween(
            String etat,
            String status,
            String titre,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    // Pour Ete
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndPrixEteBetween(
            String etat,
            String status,
            String titre,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    // Pour Automne
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndPrixAutomneBetween(
            String etat,
            String status,
            String titre,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    // Pour Hiver
    Page<Annonce> findByEtatAndStatusAndTitreContainingAndPrixHiverBetween(
            String etat,
            String status,
            String titre,
            Double prixMin,
            Double prixMax,
            Pageable pageable);










    Page<Annonce> findByEtatAndStatusAndTypeBienIdAndPrixPrintempsBetween(
            String etat,
            String status,
            Long typeBienId,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    // Pour Ete
    Page<Annonce> findByEtatAndStatusAndTypeBienIdAndPrixEteBetween(
            String etat,
            String status,
            Long typeBienId,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    // Pour Automne
    Page<Annonce> findByEtatAndStatusAndTypeBienIdAndPrixAutomneBetween(
            String etat,
            String status,
            Long typeBienId,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    // Pour Hiver
    Page<Annonce> findByEtatAndStatusAndTypeBienIdAndPrixHiverBetween(
            String etat,
            String status,
            Long typeBienId,
            Double prixMin,
            Double prixMax,
            Pageable pageable);

    Page<Annonce> findByEtatAndStatusAndGouvernoratAndTypeBienId(String etat, String status, String gouvernorat, Long typeBienId, Pageable pageable);



    List<Annonce> findTop4ByEtatAndStatus(String etat, String status);


    List<Annonce> findByProprietaireId(UUID proprietaireId);




}