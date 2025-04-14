package ter.behome.microservice_authentification.entities;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Proprietaire {
    private String cin;
    private String rib;
    private String banque;
    private String agence;
}
