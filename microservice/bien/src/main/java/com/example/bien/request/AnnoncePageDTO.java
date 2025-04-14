package com.example.bien.request;

import lombok.*;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnnoncePageDTO {
    private List<AnnonceDTO> annonces;
    private int totalElements;
    private int totalPages;
    private int currentPage;

}
