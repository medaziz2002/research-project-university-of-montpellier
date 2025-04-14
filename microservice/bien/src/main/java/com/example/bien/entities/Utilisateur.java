package com.example.bien.entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@Builder
public class Utilisateur {


    private Long id;
    private String nom;
    private String prenom;
    private String login;
    private String mdp;
    private String email;
    private Date dateNaissance;


}
