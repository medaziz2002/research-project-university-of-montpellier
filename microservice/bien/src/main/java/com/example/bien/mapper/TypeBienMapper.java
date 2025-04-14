package com.example.bien.mapper;

import com.example.bien.entities.Image;
import com.example.bien.entities.TypeBien;
import com.example.bien.request.ImageDto;
import com.example.bien.request.TypeBienDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TypeBienMapper {

    private final ImageMapper imageMapper;

    public TypeBienDTO toDTO(TypeBien typeBien) {
        ImageDto imageDTO = null;
        if (typeBien.getImage() != null) {
            imageDTO = imageMapper.toImageDto(typeBien.getImage());
        }

        return TypeBienDTO.builder()
                .id(typeBien.getId())
                .nom(typeBien.getNom())
                .description(typeBien.getDescription())
                .imageDto(imageDTO)
                .build();
    }



    public TypeBien toEntity(TypeBienDTO typeBienDTO) {
        TypeBien typeBien = new TypeBien();


        typeBien.setNom(typeBienDTO.getNom());
        typeBien.setDescription(typeBienDTO.getDescription());


        if (typeBienDTO.getImageDto() != null) {
            Image image = imageMapper.toImage(typeBienDTO.getImageDto());
            typeBien.setImage(image);
        }

        return typeBien;
    }

}
