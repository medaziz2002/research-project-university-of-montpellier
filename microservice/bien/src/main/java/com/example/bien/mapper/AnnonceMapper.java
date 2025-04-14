package com.example.bien.mapper;

import com.example.bien.entities.Annonce;
import com.example.bien.entities.Image;
import com.example.bien.entities.TypeBien;
import com.example.bien.repository.ProprietaireRepo;
import com.example.bien.repository.TypeBienRepo;
import com.example.bien.request.AnnonceDTO;
import com.example.bien.request.ImageDto;
import com.example.bien.request.TypeBienDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Component
@AllArgsConstructor
public class AnnonceMapper {

    private  final ImageMapper imageMapper;
    private  final TypeBienMapper typeBienMapper;
    private final TypeBienRepo typeBienRepo;
    private final ProprietaireRepo proprietaireRepo;



    public Annonce toEntity(AnnonceDTO dto) {
        Annonce annonce = new Annonce();
        annonce.setId(dto.getId());
        annonce.setTitre(dto.getTitre());
        annonce.setNbchambre(dto.getNbchambre());
        annonce.setNblits(dto.getNblits());
        annonce.setSuperficie(dto.getSuperficie());
        annonce.setCreatedAt(new Date());
        annonce.setPays(dto.getPays());
        annonce.setProprietaire(proprietaireRepo.getReferenceById(dto.getProp_id()));
        annonce.setLongitude(dto.getLongitude());
        annonce.setLatitude(dto.getLatitude());
        annonce.setStatus(dto.getStatus());
        annonce.setEtat(dto.getEtat());
        annonce.setVille(dto.getVille());
        annonce.setGouvernorat(dto.getGouvernorat());
        annonce.setRue(dto.getRue());
        annonce.setCode_postal(dto.getCode_postal());
        annonce.setPrixHiver(dto.getPrixHiver());
        annonce.setPrixEte(dto.getPrixEte());
        annonce.setPrixPrintemps(dto.getPrixPrintemps());
        annonce.setPrixAutomne(dto.getPrixAutomne());
        TypeBien typeBien = typeBienRepo.findById(dto.getType_bien_id())
                .orElseThrow(() -> new EntityNotFoundException("TypeBien non trouvé"));

        annonce.setTypeBien(typeBien);
        return annonce;
    }



    public AnnonceDTO toDto(Annonce annonce) {
        if (annonce == null) {
            return null;
        }

        return AnnonceDTO.builder()
                .id(annonce.getId())
                .titre(annonce.getTitre())
                .nbchambre(annonce.getNbchambre())
                .nblits(annonce.getNblits())
                .etat(annonce.getEtat())
                .superficie(annonce.getSuperficie())
                .status(annonce.getStatus())
                .createdAt(annonce.getCreatedAt())
                .prixHiver(annonce.getPrixHiver())
                .prixEte(annonce.getPrixEte())
                .prixPrintemps(annonce.getPrixPrintemps())
                .prixAutomne(annonce.getPrixAutomne())
                .pays(annonce.getPays())
                .ville(annonce.getVille())
                .prop_id(annonce.getProprietaire().getId())
                .gouvernorat(annonce.getGouvernorat())
                .rue(annonce.getRue())
                .code_postal(annonce.getCode_postal())
                .latitude(annonce.getLatitude())
                .longitude(annonce.getLongitude())
                .typeBien(typeBienMapper.toDTO(annonce.getTypeBien()))
                .type_bien_id(annonce.getTypeBien().getId())
                .imagesList(convertToImageDTOList(annonce.getImages()))
                .build();
    }

    private List<ImageDto> convertToImageDTOList(List<Image> images) {
        if (images == null) {
            return Collections.emptyList();
        }
        return images.stream()
                .map(imageMapper::toImageDto)
                .collect(Collectors.toList());
    }












}
