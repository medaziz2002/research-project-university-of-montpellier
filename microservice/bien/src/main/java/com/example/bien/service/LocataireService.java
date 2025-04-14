package com.example.bien.service;



import com.example.bien.entities.Locataire;
import com.example.bien.repository.LocataireRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocataireService {


    private final LocataireRepo repo;

    public UUID create(Locataire request) {

        if (request.getId() == null) {
            request.setId(UUID.randomUUID());
        }


        return repo.save(request).getId();
    }


    public void updateUserId(UUID locataireId, Long userId) {
        Locataire locataire = repo.findById(locataireId)
                .orElseThrow(() -> new RuntimeException("Locataire non trouvé"));
        locataire.setId_user(userId);
        repo.save(locataire);
    }





}
