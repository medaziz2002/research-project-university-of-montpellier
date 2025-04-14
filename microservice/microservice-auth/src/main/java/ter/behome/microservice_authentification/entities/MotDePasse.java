package ter.behome.microservice_authentification.entities;

import jakarta.persistence.*;
import lombok.*;


import java.util.Date;




@Entity
@Table(name = "motdepasses")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MotDePasse  {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    private String valeurMotdepasse;
    private Date dateCreation;

    @OneToOne
    private Utilisateur user;
}

