package com.example.paymentmicroservice.paypal;

import com.example.paymentmicroservice.openfeign.LogementFeign;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@Slf4j
public class PaypalController {

    private final PaypalService paypalService;
    private final LogementFeign logementFeign;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createPayment(
            @RequestParam("amount") double amount,
            @RequestParam("idContrat") Long idContrat) {

        try {
            String cancelUrl = "http://localhost:4200/fail/" + idContrat;
            String successUrl = "http://localhost:4200/success/" + idContrat;

            Payment payment = paypalService.createPayment(
                    amount,
                    "USD",
                    "paypal",
                    "sale",
                    "Payment for contract " + idContrat,
                    cancelUrl,
                    successUrl
            );

            for (Links links : payment.getLinks()) {
                if ("approval_url".equals(links.getRel())) {
                    Map<String, String> response = new HashMap<>();
                    response.put("link", links.getHref());
                    return ResponseEntity.ok(response);
                }
            }

        } catch (PayPalRESTException e) {
            log.error("Error occurred during PayPal payment creation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }


    @GetMapping("/success/{idContrat}")
    public ResponseEntity<?> paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId,
            @PathVariable("idContrat") Long idContrat) {

        System.out.println("Executing payment...");
        System.out.println("paymentId: " + paymentId);
        System.out.println("payerId: " + payerId);
        System.out.println("idContrat: " + idContrat);

        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                log.info("Payment approved, confirming contract {}", idContrat);
                logementFeign.confirmPayment(idContrat);
                return ResponseEntity.ok().body(Map.of(
                        "status", "success",
                        "message", "Paiement approuvé avec succès"
                ));
            }
        } catch (PayPalRESTException e) {
            log.error("Error executing payment with paymentId: {} and payerId: {}", paymentId, payerId, e);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("status", "error", "message", "Échec du paiement"));
    }


}