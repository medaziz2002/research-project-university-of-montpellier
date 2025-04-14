package com.example.bien.service;


import com.example.bien.entities.Image;
import com.example.bien.entities.TypeBien;
import com.example.bien.mapper.TypeBienMapper;
import com.example.bien.repository.ImageRepo;
import com.example.bien.repository.TypeBienRepo;
import com.example.bien.request.TypeBienDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TypeBienService {

    private final TypeBienRepo typeBienRepository;
    private final TypeBienMapper typeBienMapper;
    private final ImageRepo imageRepo;



    public TypeBienDTO createTypeBien(TypeBienDTO typeBienDTO, MultipartFile file1) throws IOException {

        if (file1 == null || file1.isEmpty()) {
            throw new IllegalArgumentException("Le fichier image ne peut pas être vide");
        }


        TypeBien typeBien = typeBienMapper.toEntity(typeBienDTO);

        TypeBien savedTypeBien = typeBienRepository.save(typeBien);


        ByteArrayInputStream bais = new ByteArrayInputStream(file1.getBytes());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            Thumbnails.of(bais)
                    .size(500, 600)
                    .outputFormat("jpg")
                    .toOutputStream(baos);
        } catch (IOException e) {
            throw new IOException("Erreur lors du traitement de l'image: " + e.getMessage());
        }


        Image nouvelleImage = new Image();
        nouvelleImage.setTypeBien(savedTypeBien);
        nouvelleImage.setName(file1.getOriginalFilename());
        nouvelleImage.setImage(baos.toByteArray());
        nouvelleImage.setType(file1.getContentType());


        Image savedImage = imageRepo.save(nouvelleImage);


        savedTypeBien.setImage(savedImage);


        typeBienRepository.save(savedTypeBien);


        return typeBienMapper.toDTO(savedTypeBien);
    }


    public TypeBienDTO getTypeBienById(Long id) {
        Optional<TypeBien> typeBien = typeBienRepository.findById(id);
        return typeBien.map(typeBienMapper::toDTO).orElse(null);
    }

    public List<TypeBienDTO> getAllTypeBiens() {
        List<TypeBien> typeBiens = typeBienRepository.findAll();
        return typeBiens.stream()
                .map(typeBienMapper::toDTO)
                .toList();
    }

    @Transactional
    public TypeBienDTO updateTypeBien(Long id, TypeBienDTO typeBienDTO, MultipartFile file1) throws IOException {
        Optional<TypeBien> existingTypeBien = typeBienRepository.findById(id);
        if (existingTypeBien.isEmpty()) {
            return null;
        }

        TypeBien typeBien = existingTypeBien.get();
        typeBien.setNom(typeBienDTO.getNom());
        typeBien.setDescription(typeBienDTO.getDescription());


        if (file1 != null && !file1.isEmpty()) {

            ByteArrayInputStream bais = new ByteArrayInputStream(file1.getBytes());
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            try {
                Thumbnails.of(bais)
                        .size(500, 600)
                        .outputFormat("jpg")
                        .toOutputStream(baos);
            } catch (IOException e) {
                throw new IOException("Erreur lors du traitement de l'image: " + e.getMessage());
            }


            Image existingImage = imageRepo.findByNameAndType(file1.getOriginalFilename(), file1.getContentType());
            if (existingImage != null) {

                typeBien.setImage(existingImage);
            } else {

                Image nouvelleImage = new Image();
                nouvelleImage.setTypeBien(typeBien);
                nouvelleImage.setName(file1.getOriginalFilename());
                nouvelleImage.setImage(baos.toByteArray());
                nouvelleImage.setType(file1.getContentType());


                Image savedImage = imageRepo.save(nouvelleImage);

                typeBien.setImage(savedImage);
            }
        } else if (typeBien.getImage() == null && file1 == null) {

            return null;
        }


        TypeBien updatedTypeBien = typeBienRepository.save(typeBien);


        return typeBienMapper.toDTO(updatedTypeBien);
    }



    public boolean deleteTypeBien(Long id) {
        Optional<TypeBien> typeBien = typeBienRepository.findById(id);
        if (typeBien.isPresent()) {
            typeBienRepository.deleteById(id);
            return true;
        }
        return false;
    }




    public Long getNombreTypeBien() {
        return typeBienRepository.count();
    }

}
