package com.example.bien.repository;

import com.example.bien.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image,Long> {

    Image findByNameAndType(String name, String type);


    void deleteByAnnonceId(Long annonceId);
}
