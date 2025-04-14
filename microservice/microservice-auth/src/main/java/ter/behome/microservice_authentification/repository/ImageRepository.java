package ter.behome.microservice_authentification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ter.behome.microservice_authentification.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}


