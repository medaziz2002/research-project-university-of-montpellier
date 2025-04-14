package ter.behome.microservice_authentification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ter.behome.microservice_authentification.entities.Utilisateur;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Utilisateur, Long> {




    Optional<Utilisateur> findByEmail(String email);

    @Query("SELECT u FROM Utilisateur u WHERE u.locataireId = :locataireId")
    Optional<Utilisateur> findByLocataireId(@Param("locataireId") UUID locataireId);



}
