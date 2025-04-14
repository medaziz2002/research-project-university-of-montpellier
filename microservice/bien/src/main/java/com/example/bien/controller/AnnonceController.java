package com.example.bien.controller;


import com.example.bien.request.AnnonceDTO;
import com.example.bien.request.AnnoncePageDTO;
import com.example.bien.request.TypeBienDTO;
import com.example.bien.service.AnnonceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/annonces")
@RequiredArgsConstructor
public class AnnonceController {

    private final AnnonceService annonceService;





    @PostMapping
    public ResponseEntity<AnnonceDTO> createAnnonce(
            @RequestPart("annonceDTO") AnnonceDTO annonceDTO,
            @RequestPart("pathImages") MultipartFile[] files) throws IOException {
        if (annonceDTO.getType_bien_id() == null) {
            throw new IllegalArgumentException("L'ID du type de bien est requis");
        }
        AnnonceDTO result = annonceService.createAnnonce(annonceDTO, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }




    @PutMapping("/{id}")
    public ResponseEntity<AnnonceDTO> modifierAnnonce(@PathVariable Long id,
            @RequestPart("annonceDTO") AnnonceDTO annonceDTO,
            @RequestPart("pathImages") MultipartFile[] files) throws IOException {
        if (annonceDTO.getType_bien_id() == null) {
            throw new IllegalArgumentException("L'ID du type de bien est requis");
        }
        AnnonceDTO result = annonceService.modifierAnnonce(id,annonceDTO, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }




    @GetMapping("/{id}")
    public ResponseEntity<AnnonceDTO> getAnnonceById(@PathVariable Long id) {
        AnnonceDTO annonceDTO = annonceService.getAnnonceById(id);
        return ResponseEntity.ok(annonceDTO);
    }


    @GetMapping("/getAnnonceByProp/{id}")
    public ResponseEntity<List<AnnonceDTO>> getAnnoncesByUserId(@PathVariable UUID id) {
        List<AnnonceDTO> annonces = annonceService.getAnnoncesByUserId(id);
        return ResponseEntity.ok(annonces);
    }






    @GetMapping("/visibleannonce/{id}")
    public ResponseEntity<?> rendreAnnonceVisible(@PathVariable Long id) {
        boolean result = annonceService.rendreAnnonceVisible(id);
        if (result) {
            return ResponseEntity.ok("Annonce rendue visible avec succès");
        } else {
            return ResponseEntity.status(400).body("Erreur lors de la mise à jour de l'annonce");
        }
    }

    // Accepter l'annonce
    @GetMapping("/accepteannonce/{id}")
    public ResponseEntity<?> accepterAnnonce(@PathVariable Long id) {
        boolean result = annonceService.accepterAnnonce(id);
        if (result) {
            return ResponseEntity.ok("Annonce acceptée avec succès");
        } else {
            return ResponseEntity.status(400).body("Erreur lors de l'acceptation de l'annonce");
        }
    }


    @PostMapping("/rejeterannonce/{id}")
    public ResponseEntity<?> rejeterAnnonce(@PathVariable Long id, @RequestParam String cause) {
        boolean result = annonceService.rejeterAnnonce(id, cause);
        if (result) {
            return ResponseEntity.ok("Annonce refusée avec succès");
        } else {
            return ResponseEntity.status(400).body("Erreur lors du refus de l'annonce");
        }
    }


    @GetMapping
    public ResponseEntity<AnnoncePageDTO> getAnnonces(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "nbAnnoncePerPage", required = false) Integer nbAnnoncePerPage,
            @RequestParam(value = "etat", required = false) String etat,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "titre", required = false) String titre,
            @RequestParam(value = "gouvernorat", required = false) String gouvernorat,
            @RequestParam(value = "prixMin", required = false) Double prixMin,
            @RequestParam(value = "prixMax", required = false) Double prixMax,
            @RequestParam(value = "type_bien_id", required = false) Long typeBienId) {


        AnnoncePageDTO annonces = annonceService.getAnnonces(
                page, nbAnnoncePerPage, etat, status, titre, gouvernorat, prixMin, prixMax, typeBienId);
        return ResponseEntity.ok(annonces);
    }




    @GetMapping("/getLast4Annonces")
    public ResponseEntity<List<AnnonceDTO>> getLast4Annonces(
            @RequestParam(value = "etat", required = false) String etat,
            @RequestParam(value = "status", required = false) String status) {


        List<AnnonceDTO> annonces = annonceService.getLast4Annonces(etat, status);
        return ResponseEntity.ok(annonces);
    }


    @GetMapping("/count")
    public ResponseEntity<Long> getNombreAnnonces() {
        return ResponseEntity.ok(annonceService.getNombreAnnonces());
    }

    @GetMapping("/archiverannonce/{id}")
    public ResponseEntity<Void> archiverAnnonce(@PathVariable Long id) {
        annonceService.archiverAnnonce(id);
        return ResponseEntity.ok().build();
    }



}