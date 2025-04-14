package com.example.bien.request;

import com.example.bien.entities.Image;
import com.example.bien.entities.TypeBien;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class AnnonceDTO {
    private Long id;
    private String titre;
    private UUID prop_id;
    private int nbchambre;
    private Date createdAt;
    private int nblits;
    private double superficie;
    private String pays;
    private Long type_bien_id;
    private TypeBienDTO typeBien;
    private double longitude;
    private double latitude;
    private String status;
    private String etat;
    private String ville;
    private String gouvernorat;
    private String rue;
    private String code_postal;
    private double prixHiver;
    private double prixEte;
    private double prixPrintemps;
    private double prixAutomne;
    private String namepricipale;
    private Double moyenneNotes;
    private List<MultipartFile> images;
    private List<ImageDto> imagesList;
}