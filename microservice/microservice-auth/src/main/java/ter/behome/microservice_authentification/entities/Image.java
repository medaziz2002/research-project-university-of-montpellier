package ter.behome.microservice_authentification.entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import lombok.*;


@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image  {


 @Id
 @GeneratedValue(strategy = GenerationType.TABLE)
 private Long id;

 private String name ;
 private String type ;
 @Column( name = "IMAGE" , length = 4048576 )
 @Lob
 private byte[] image;


}

