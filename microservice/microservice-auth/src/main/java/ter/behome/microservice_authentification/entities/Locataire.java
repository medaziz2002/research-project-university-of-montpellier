package ter.behome.microservice_authentification.entities;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Locataire {
    private String cin;
    private String profession;
    private Double revenuMensuel;
    private String nationalite;
    private String situationFamiliale;
    private String garantNom;
    private String garantPrenom;
    private String garantTelephone;
}
