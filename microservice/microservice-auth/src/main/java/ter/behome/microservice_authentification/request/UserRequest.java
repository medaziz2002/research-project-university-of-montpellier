package ter.behome.microservice_authentification.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRequest {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private boolean etat;
    private String password;
    private UUID prop_id;
    private UUID loc_id;
    private Long imageId;
    private Long motdepasseId;
    private Date dateNaissance;
    private String role;



}