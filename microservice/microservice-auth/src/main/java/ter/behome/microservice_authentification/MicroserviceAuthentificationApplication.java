package ter.behome.microservice_authentification;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ter.behome.microservice_authentification.entities.MotDePasse;
import ter.behome.microservice_authentification.entities.Utilisateur;
import ter.behome.microservice_authentification.repository.MotdepasseRepository;
import ter.behome.microservice_authentification.repository.UserRepository;

import java.beans.Transient;
import java.util.Date;
import java.util.Optional;


@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class MicroserviceAuthentificationApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceAuthentificationApplication.class, args);
	}



	@Component
	public class InitSuperAdmin implements CommandLineRunner {

		@Autowired
		private UserRepository userRepository;

		@Autowired
		private MotdepasseRepository motdepasseRepository;

		private static final Logger logger = LoggerFactory.getLogger(InitSuperAdmin.class);

		@Override
		public void run(String... args) {
			// Vérifier si l'utilisateur admin existe déjà
			userRepository.findByEmail("admin@gmail.com").ifPresentOrElse(
					user -> {
						logger.info("Admin user already exists with email: admin@gmail.com");
					},
					() -> {
						try {
							// Créer le mot de passe
							MotDePasse motDePasse = new MotDePasse();
							BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
							motDePasse.setValeurMotdepasse(bCryptPasswordEncoder.encode("1234"));
							motDePasse.setDateCreation(new Date());
                            motdepasseRepository.save(motDePasse);
							// Créer l'utilisateur admin
							Utilisateur admin = Utilisateur.builder()
									.nom("Admin")
									.prenom("Super")
									.email("admin@gmail.com")
									.dateNaissance(new Date())
									.etat(true)
									.role("SUPERADMIN")
									.motdepasse(motDePasse)
									.build();

							// Sauvegarder en cascade
							motDePasse.setUser(admin); // Établir la relation bidirectionnelle
							Utilisateur savedAdmin = userRepository.save(admin);

							logger.info("Super admin created successfully with ID: {}", savedAdmin.getId());
						} catch (Exception e) {
							logger.error("Failed to create admin user: {}", e.getMessage());
							throw new RuntimeException("Failed to initialize admin user", e);
						}
					}
			);
		}


	}





}
