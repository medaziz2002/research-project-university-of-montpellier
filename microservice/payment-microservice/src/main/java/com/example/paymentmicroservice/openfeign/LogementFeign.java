package com.example.paymentmicroservice.openfeign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.UUID;

@FeignClient("microservice-logement")
public interface  LogementFeign {


    @PutMapping("/api/v1/reservations/{idContrat}/confirm-payment")
    ResponseEntity<Void> confirmPayment(
            @PathVariable("idContrat") Long idContrat);
}


