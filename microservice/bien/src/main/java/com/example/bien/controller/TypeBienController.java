package com.example.bien.controller;

import com.example.bien.request.TypeBienDTO;
import com.example.bien.service.TypeBienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/v1/typebiens")
@RequiredArgsConstructor
public class TypeBienController {

    private final TypeBienService typeBienService;










    @PostMapping
    public ResponseEntity<TypeBienDTO> createTypeBien(
            @RequestPart("typeBienDTO") TypeBienDTO typeBienDTO,
            @RequestPart("pathImage") MultipartFile file1) throws IOException {
        TypeBienDTO createdTypeBien = typeBienService.createTypeBien(typeBienDTO, file1);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTypeBien);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeBienDTO> updateTypeBien(
            @PathVariable Long id,
            @RequestPart("typeBienDTO") TypeBienDTO typeBienDTO,
            @RequestPart(value = "pathImage", required = false) MultipartFile file1) throws IOException {
        TypeBienDTO updatedTypeBien = typeBienService.updateTypeBien(id, typeBienDTO, file1);
        return updatedTypeBien != null ? ResponseEntity.ok(updatedTypeBien) : ResponseEntity.notFound().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<TypeBienDTO> getTypeBienById(@PathVariable Long id) {
        TypeBienDTO typeBienDTO = typeBienService.getTypeBienById(id);
        return typeBienDTO != null ? ResponseEntity.ok(typeBienDTO) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TypeBienDTO>> getAllTypeBiens() {
        List<TypeBienDTO> typeBiens = typeBienService.getAllTypeBiens();
        return ResponseEntity.ok(typeBiens);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeBien(@PathVariable Long id) {
        boolean deleted = typeBienService.deleteTypeBien(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


    @GetMapping("/count")
    public ResponseEntity<Long> getNombreTypeBien() {
        return ResponseEntity.ok(typeBienService.getNombreTypeBien());
    }

}
