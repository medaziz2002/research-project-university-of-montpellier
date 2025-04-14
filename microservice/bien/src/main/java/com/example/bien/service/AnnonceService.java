package com.example.bien.service;


import com.example.bien.entities.Annonce;
import com.example.bien.entities.Image;
import com.example.bien.entities.TypeBien;
import com.example.bien.entities.Utilisateur;
import com.example.bien.mapper.AnnonceMapper;
import com.example.bien.repository.AnnonceRepo;
import com.example.bien.repository.ImageRepo;
import com.example.bien.repository.ProprietaireRepo;
import com.example.bien.repository.TypeBienRepo;
import com.example.bien.request.AnnonceDTO;
import com.example.bien.request.AnnoncePageDTO;
import com.example.bien.request.TypeBienDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class AnnonceService {

    private final AnnonceRepo annonceRepository;
    private final ImageRepo imageRepository;
    private final AnnonceMapper annonceMapper;

    public AnnonceDTO createAnnonce(AnnonceDTO annonceDTO, MultipartFile[] files) throws IOException {

        if (files == null || files.length == 0) {
            throw new IllegalArgumentException("Au moins une image est requise");
        }


        Annonce annonce = annonceMapper.toEntity(annonceDTO);
        Annonce savedAnnonce = annonceRepository.save(annonce);

        List<Image> images = new ArrayList<>();

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            ByteArrayInputStream bais = new ByteArrayInputStream(file.getBytes());
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
            nouvelleImage.setAnnonce(savedAnnonce);
            nouvelleImage.setName(file.getOriginalFilename());
            nouvelleImage.setImage(baos.toByteArray());
            nouvelleImage.setType(file.getContentType());


            Image savedImage = imageRepository.save(nouvelleImage);
            images.add(savedImage);
        }


        savedAnnonce.setImages(images);
        annonceRepository.save(savedAnnonce);


        return annonceMapper.toDto(savedAnnonce);
    }

    @Transactional
    public AnnonceDTO modifierAnnonce(Long id, AnnonceDTO annonceDTO, MultipartFile[] files) throws IOException {
        Annonce existingAnnonce = annonceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée avec l'id : " + id));


        Annonce updatedAnnonce = annonceMapper.toEntity(annonceDTO);

        if (files != null && files.length > 0) {
            imageRepository.deleteByAnnonceId(id);

            List<Image> newImages = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.isEmpty()) {
                    continue;
                }

                ByteArrayInputStream bais = new ByteArrayInputStream(file.getBytes());
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
                nouvelleImage.setAnnonce(updatedAnnonce);
                nouvelleImage.setName(file.getOriginalFilename());
                nouvelleImage.setImage(baos.toByteArray());
                nouvelleImage.setType(file.getContentType());


                Image savedImage = imageRepository.save(nouvelleImage);
                newImages.add(savedImage);
            }


            updatedAnnonce.setImages(newImages);
        } else {

            updatedAnnonce.setImages(existingAnnonce.getImages());
        }


        Annonce savedAnnonce = annonceRepository.save(updatedAnnonce);


        return annonceMapper.toDto(savedAnnonce);
    }



    public List<AnnonceDTO> getAnnoncesByUserId(UUID userId) {
        List<Annonce> annonces = annonceRepository.findByProprietaireId(userId);
        return annonces.stream()
                .map(annonceMapper::toDto)
                .collect(Collectors.toList());
    }




    public AnnonceDTO getAnnonceById(Long id) {
        Annonce annonce = annonceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Annonce non trouvée avec l'id : " + id));
        return annonceMapper.toDto(annonce);
    }


    public boolean rendreAnnonceVisible(Long id) {
        Annonce annonce = annonceRepository.findById(id).orElse(null);
        if (annonce != null) {
            annonce.setStatus("visible");
            annonceRepository.save(annonce);
            return true;
        }
        return false;
    }

    // Accepter l'annonce
    public boolean accepterAnnonce(Long id) {
        Annonce annonce = annonceRepository.findById(id).orElse(null);
        if (annonce != null) {
            annonce.setEtat("accepté");
            annonceRepository.save(annonce);
            return true;
        }
        return false;
    }


    public boolean rejeterAnnonce(Long id, String cause) {
        Annonce annonce = annonceRepository.findById(id).orElse(null);
        if (annonce != null) {
            annonce.setEtat("refusé");
            annonceRepository.save(annonce);
            return true;
        }
        return false;
    }




    public AnnoncePageDTO getAnnonces(Integer pageNumber, Integer nbAnnoncePerPage, String etat, String status,
                                      String titre, String gouvernorat, Double prixMin, Double prixMax, Long typeBienId) {


        pageNumber = (pageNumber != null && pageNumber > 0) ? pageNumber : 1;
        nbAnnoncePerPage = (nbAnnoncePerPage != null && nbAnnoncePerPage > 0) ? nbAnnoncePerPage : 10;

        Pageable pageable = PageRequest.of(pageNumber - 1, nbAnnoncePerPage);
        Page<Annonce> annoncesPage = null;

        etat = (etat != null && etat.trim().isEmpty()) ? null : etat;
        status = (status != null && status.trim().isEmpty()) ? null : status;
        titre = (titre != null && titre.trim().isEmpty()) ? null : titre;
        gouvernorat = (gouvernorat != null && gouvernorat.trim().isEmpty()) ? null : gouvernorat;
        prixMin = (prixMin != null && prixMin <= 0) ? null : prixMin;
        prixMax = (prixMax != null && prixMax <= 0) ? null : prixMax;
        typeBienId = (typeBienId != null && typeBienId <= 0) ? null : typeBienId;

        String currentSeason = getCurrentSeason();



        if (etat != null && status != null) {
            // Tous les filtres
            if (titre != null && gouvernorat != null && prixMin != null && prixMax != null && typeBienId != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixPrintempsBetweenAndTypeBienId(
                                etat, status, titre, gouvernorat, prixMin, prixMax, typeBienId, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixEteBetweenAndTypeBienId(
                                etat, status, titre, gouvernorat, prixMin, prixMax, typeBienId, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixAutomneBetweenAndTypeBienId(
                                etat, status, titre, gouvernorat, prixMin, prixMax, typeBienId, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixHiverBetweenAndTypeBienId(
                                etat, status, titre, gouvernorat, prixMin, prixMax, typeBienId, pageable);
                        break;
                }
            }

            else if (titre != null && gouvernorat != null && prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixPrintempsBetween(
                                etat, status, titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixEteBetween(
                                etat, status, titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixAutomneBetween(
                                etat, status, titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernoratAndPrixHiverBetween(
                                etat, status, titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                }
            }

            else if (titre != null  && prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndPrixPrintempsBetween(
                                etat, status, titre, prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndPrixEteBetween(
                                etat, status, titre, prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndPrixAutomneBetween(
                                etat, status, titre, prixMin, prixMax, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndPrixHiverBetween(
                                etat, status, titre, prixMin, prixMax, pageable);
                        break;
                }
            }


            else if (gouvernorat != null && prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixPrintempsBetweenAndGouvernorat(
                                etat, status, prixMin, prixMax, gouvernorat, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixEteBetweenAndGouvernorat(
                                etat, status, prixMin, prixMax, gouvernorat, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixAutomneBetweenAndGouvernorat(
                                etat, status, prixMin, prixMax, gouvernorat, pageable);
                        break;
                    default:
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixHiverBetweenAndGouvernorat(
                                etat, status, prixMin, prixMax, gouvernorat, pageable);
                        break;
                }
            }

            else if (typeBienId != null && prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTypeBienIdAndPrixPrintempsBetween(
                                etat, status,typeBienId, prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTypeBienIdAndPrixEteBetween(
                                etat, status,typeBienId, prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTypeBienIdAndPrixAutomneBetween(
                                etat, status,typeBienId, prixMin, prixMax, pageable);
                        break;
                    default:
                        annoncesPage = annonceRepository.findByEtatAndStatusAndTypeBienIdAndPrixHiverBetween(
                                etat, status,typeBienId, prixMin, prixMax, pageable);
                        break;
                }
            }

            else if (typeBienId != null && gouvernorat != null) {
                annoncesPage = annonceRepository.findByEtatAndStatusAndGouvernoratAndTypeBienId(
                        etat, status, gouvernorat,typeBienId, pageable);
            }

            else if (titre != null && gouvernorat != null) {
                annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingAndGouvernorat(
                        etat, status, titre, gouvernorat, pageable);
            }

            else if (prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixPrintempsBetween(
                                etat, status, prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixEteBetween(
                                etat, status, prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixAutomneBetween(
                                etat, status, prixMin, prixMax, pageable);
                        break;
                    default:
                        annoncesPage = annonceRepository.findByEtatAndStatusAndPrixHiverBetween(
                                etat, status, prixMin, prixMax, pageable);
                        break;
                }
            }

            else if (gouvernorat != null) {
                annoncesPage = annonceRepository.findByEtatAndStatusAndGouvernorat(
                        etat, status, gouvernorat, pageable);
            }

            else if (typeBienId != null) {
                annoncesPage = annonceRepository.findByEtatAndStatusAndTypeBien_Id(
                        etat, status, typeBienId, pageable);
            }

            else if (titre != null) {
                annoncesPage = annonceRepository.findByEtatAndStatusAndTitreContainingIgnoreCase(
                        etat, status, titre, pageable);
            }

            else {
                annoncesPage = annonceRepository.findByEtatAndStatus(etat, status, pageable);
            }
        }

        else {

            if (titre != null && gouvernorat != null && prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByTitreContainingAndGouvernoratAndPrixPrintempsBetween(
                                titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByTitreContainingAndGouvernoratAndPrixEteBetween(
                                titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByTitreContainingAndGouvernoratAndPrixAutomneBetween(
                                titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByTitreContainingAndGouvernoratAndPrixHiverBetween(
                                titre, gouvernorat, prixMin, prixMax, pageable);
                        break;
                }
            }

            else if (gouvernorat != null && prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByGouvernoratAndPrixPrintempsBetween(
                                gouvernorat, prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByGouvernoratAndPrixEteBetween(
                                gouvernorat, prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByGouvernoratAndPrixAutomneBetween(
                                gouvernorat, prixMin, prixMax, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByGouvernoratAndPrixHiverBetween(
                                gouvernorat, prixMin, prixMax, pageable);
                        break;
                }
            }

            else if (prixMin != null && prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByPrixPrintempsBetween(prixMin, prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByPrixEteBetween(prixMin, prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByPrixAutomneBetween(prixMin, prixMax, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByPrixHiverBetween(prixMin, prixMax, pageable);
                        break;
                }
            }

            else if (prixMin != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByPrixPrintempsGreaterThanEqual(prixMin, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByPrixEteGreaterThanEqual(prixMin, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByPrixAutomneGreaterThanEqual(prixMin, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByPrixHiverGreaterThanEqual(prixMin, pageable);
                        break;
                }
            }

            else if (prixMax != null) {
                switch (currentSeason) {
                    case "Printemps":
                        annoncesPage = annonceRepository.findByPrixPrintempsLessThanEqual(prixMax, pageable);
                        break;
                    case "Ete":
                        annoncesPage = annonceRepository.findByPrixEteLessThanEqual(prixMax, pageable);
                        break;
                    case "Automne":
                        annoncesPage = annonceRepository.findByPrixAutomneLessThanEqual(prixMax, pageable);
                        break;
                    default: // Hiver
                        annoncesPage = annonceRepository.findByPrixHiverLessThanEqual(prixMax, pageable);
                        break;
                }
            }

            else if (titre != null) {
                annoncesPage = annonceRepository.findByTitreContaining(titre, pageable);
            }

            else if (gouvernorat != null) {
                annoncesPage = annonceRepository.findByGouvernorat(gouvernorat, pageable);
            }

            else if (typeBienId != null) {
                annoncesPage = annonceRepository.findByTypeBienId(typeBienId, pageable);
            }

            else if (etat != null) {
                annoncesPage = annonceRepository.findByEtat(etat, pageable);
            }

            else if (status != null) {
                annoncesPage = annonceRepository.findByStatus(status, pageable);
            }

            else {
                annoncesPage = annonceRepository.findAll(pageable);
            }
        }


        List<AnnonceDTO> annonceDTOList = annoncesPage.getContent().stream()
                .map(annonce -> {
                    AnnonceDTO dto = annonceMapper.toDto(annonce);
                    switch (currentSeason) {
                        case "Printemps":
                            dto.setPrixPrintemps(annonce.getPrixPrintemps());
                            break;
                        case "Ete":
                            dto.setPrixEte(annonce.getPrixEte());
                            break;
                        case "Automne":
                            dto.setPrixAutomne(annonce.getPrixAutomne());
                            break;
                        default: // Hiver
                            dto.setPrixHiver(annonce.getPrixHiver());
                            break;
                    }
                    return dto;
                })
                .collect(Collectors.toList());

        return new AnnoncePageDTO(
                annonceDTOList,
                (int) annoncesPage.getTotalElements(),
                annoncesPage.getTotalPages(),
                pageNumber
        );
    }





    private String getCurrentSeason() {

        Calendar cal = Calendar.getInstance();

        int month = cal.get(Calendar.MONTH) + 1;


        if (month >= 3 && month <= 5) {
            return "Printemps";
        } else if (month >= 6 && month <= 8) {
            return "Ete";
        } else if (month >= 9 && month <= 11) {
            return "Automne";
        } else {

            return "Hiver";
        }
    }






    public Long getNombreAnnonces() {
       return annonceRepository.count();

    }






        public List<AnnonceDTO> getLast4Annonces(String etat, String status) {
            List<Annonce> annonces = null;
            if (etat != null && status != null) {
                annonces = annonceRepository.findTop4ByEtatAndStatus(etat, status);
            }
            return annonces.stream()
                    .map(annonceMapper::toDto)
                    .collect(Collectors.toList());
        }


    public void archiverAnnonce(Long id) {
        Optional<Annonce> optionalAnnonce = annonceRepository.findById(id);
        if (optionalAnnonce.isPresent()) {
            Annonce annonce = optionalAnnonce.get();
            annonce.setStatus("ARCHIVED");
            annonceRepository.save(annonce);
        }
    }




}