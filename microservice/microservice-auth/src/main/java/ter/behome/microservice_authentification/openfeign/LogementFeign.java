package ter.behome.microservice_authentification.openfeign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import ter.behome.microservice_authentification.entities.Locataire;
import ter.behome.microservice_authentification.entities.Proprietaire;

import java.util.UUID;

@FeignClient("microservice-logement")
public interface  LogementFeign {


    @PostMapping("/api/v1/locataires/add")
    UUID saveLocataire(@RequestBody Locataire locataire);


    @PostMapping("/api/v1/proprietaires/add")
    UUID saveProprietaire(@RequestBody Proprietaire proprietaire);




    @PutMapping("/api/v1/locataires/modUserId")
    void saveLocataireUserId(@RequestParam("locataireId") UUID locataireId, @RequestParam("userId") Long userId);

    @PutMapping("/api/v1/proprietaires/modUserId")
    void saveProprietaireUserId(@RequestParam("proprietaireId") UUID proprietaireId, @RequestParam("userId") Long userId);
}


