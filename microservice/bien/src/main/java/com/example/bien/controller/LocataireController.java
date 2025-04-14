package com.example.bien.controller;


import com.example.bien.entities.Locataire;
import com.example.bien.service.LocataireService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/locataires")
@RequiredArgsConstructor
public class LocataireController {




    private final LocataireService service;
    @PostMapping("/add")
    public UUID save (@RequestBody Locataire request)
    {
        return service.create(request);
    }


    @PutMapping("/modUserId")
    public ResponseEntity<Void> saveUserId(@RequestParam UUID locataireId, @RequestParam Long userId) {
        service.updateUserId(locataireId, userId);
        return ResponseEntity.ok().build();
    }


}
