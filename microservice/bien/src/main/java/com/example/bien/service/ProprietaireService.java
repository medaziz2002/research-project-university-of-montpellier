package com.example.bien.service;


import com.example.bien.entities.Locataire;
import com.example.bien.entities.Proprietaire;
import com.example.bien.repository.LocataireRepo;
import com.example.bien.repository.ProprietaireRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProprietaireService {


    private final ProprietaireRepo repo;

    public UUID create(Proprietaire request) {


        if (request.getId() == null) {
            request.setId(UUID.randomUUID());
        }


        return
                repo.save(request).getId();
    }



    public void updateUserId(UUID locataireId, Long userId) {
        Proprietaire proprietaire = repo.findById(locataireId)
                .orElseThrow(() -> new RuntimeException("Locataire non trouvé"));
        proprietaire.setId_user(userId);
        repo.save(proprietaire);
    }

}
