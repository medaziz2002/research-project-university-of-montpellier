package ter.behome.microservice_authentification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ter.behome.microservice_authentification.entities.MotDePasse;

public interface MotdepasseRepository extends JpaRepository<MotDePasse, Long> {
}

