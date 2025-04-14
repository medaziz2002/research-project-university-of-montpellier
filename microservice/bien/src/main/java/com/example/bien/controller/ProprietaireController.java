package com.example.bien.controller;


import com.example.bien.entities.Locataire;
import com.example.bien.entities.Proprietaire;
import com.example.bien.service.LocataireService;
import com.example.bien.service.ProprietaireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/proprietaires")
@RequiredArgsConstructor
public class ProprietaireController {

    private final ProprietaireService service;
    @PostMapping("/add")
    public UUID save (@RequestBody Proprietaire request)
    {
        return service.create(request);
    }

    @PutMapping("/modUserId")
    public ResponseEntity<Void> saveUserId(@RequestParam UUID proprietaireId, @RequestParam Long userId) {
        service.updateUserId(proprietaireId, userId);
        return ResponseEntity.ok().build();
    }


}
