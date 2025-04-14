package ter.behome.microservice_authentification.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleRequest {


    private Integer id;
    private String nomRole;

}

