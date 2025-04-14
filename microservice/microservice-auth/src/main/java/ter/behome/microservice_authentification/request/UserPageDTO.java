package ter.behome.microservice_authentification.request;

import lombok.*;
import ter.behome.microservice_authentification.request.UserRequest;

import java.util.List;


@Getter
@AllArgsConstructor
@Setter
@NoArgsConstructor
@Builder
public class UserPageDTO {

    private List<UserRequest> users;
    private int totalPages;
    private long totalElements;
    private int currentPage;


}
