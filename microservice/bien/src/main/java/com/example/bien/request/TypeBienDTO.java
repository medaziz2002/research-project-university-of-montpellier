package com.example.bien.request;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TypeBienDTO {
    private Long id;
    private String nom;
    private String description;
    private ImageDto imageDto;
}