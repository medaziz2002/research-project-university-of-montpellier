package com.example.bien.request;

import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocataireDto {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private boolean etat;
    private String password;
    private UUID prop_id;
    private UUID loc_id;
    private Long imageId;
    private Long motdepasseId;
    private Date dateNaissance;
    private String role;

}
