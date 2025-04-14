package com.example.bien.openfeign;



import com.example.bien.request.UserRequest;
import lombok.AllArgsConstructor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@FeignClient("microservice-authentification")
public interface AuthentificationFeign {



    @GetMapping("/api/v1/users/{locataire_id}")
    public ResponseEntity<UserRequest> getUserByLocataireId(@RequestParam("locataire_id") UUID locataire_id);



}



