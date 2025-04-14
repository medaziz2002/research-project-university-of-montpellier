package com.example.bien.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageDto {


    private Long id;
    private String name;
    private String type;
    private byte[] image;
}
