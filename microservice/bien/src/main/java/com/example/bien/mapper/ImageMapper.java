package com.example.bien.mapper;

import com.example.bien.entities.Image;
import com.example.bien.request.ImageDto;
import org.springframework.stereotype.Component;

@Component
public class ImageMapper {



    public Image toImage(ImageDto request)
    {
        return Image.builder()
                .id(request.getId())
                .name(request.getName())
                .image(request.getImage())
                .type(request.getType())
                .build();
    }


    public ImageDto toImageDto(Image request)
    {
        return ImageDto.builder()
                .id(request.getId())
                .name(request.getName())
                .image(request.getImage())
                .type(request.getType())
                .build();
    }





}

