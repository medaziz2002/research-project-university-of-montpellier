package ter.behome.microservice_authentification.controller;




import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ter.behome.microservice_authentification.request.ChangePasswordRequest;
import ter.behome.microservice_authentification.request.UserPageDTO;
import ter.behome.microservice_authentification.request.UserRequest;
import ter.behome.microservice_authentification.service.UserServiceImpl;

import java.util.List;
import java.util.UUID;



@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserServiceImpl userService;



    @GetMapping
    public ResponseEntity<UserPageDTO> getUsers(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size) {

        UserPageDTO userPageDTO = userService.getUsersByPage(page, size);
        return ResponseEntity.ok(userPageDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<UserRequest> save(@RequestBody UserRequest userDto){
        return userService.save(userDto);
    }

    @GetMapping("/checkIfPasswordIsValid/{email}")
    public ResponseEntity<Boolean> checkIfPasswordIsValid(@PathVariable String email)

    {
        return userService.checkIfPasswordIsValid(email);

    }


    @PutMapping("/{userId}")
    public ResponseEntity<UserRequest> updateUser(
            @PathVariable Long userId,
            @RequestBody UserRequest userDto) {
        return userService.updateUser(userId, userDto);
    }


    @GetMapping("/generateToken/{email}")
    public ResponseEntity<UUID> generateToken(@PathVariable String email)

    {
        return userService.generateToken(email);

    }



    @GetMapping("/getByEmail/{email}")
    public UserRequest getUserByEmail(@PathVariable String email)

    {

        return userService.getUserByEmail(email);

    }



    @GetMapping("/blockUser/{id}")
    public ResponseEntity<Boolean> blockUser(@PathVariable Long id) {
        boolean blocked = userService.blockUser(id);
        return ResponseEntity.ok(blocked); // 200 OK + body: true ou false
    }

    @GetMapping("/unblockUser/{id}")
    public ResponseEntity<Boolean> unblockUser(@PathVariable Long id) {
        boolean unblocked = userService.unblockUser(id);
        return ResponseEntity.ok(unblocked); // 200 OK + body: true ou false
    }




    @GetMapping("/count")
    public ResponseEntity<Long> getNombreUtilisateur() {
        return ResponseEntity.ok(userService.getNombreUtilisateur());
    }


    @PutMapping("/change-password/{userId}")
    public ResponseEntity<?> changePassword(
            @PathVariable Long userId,
            @RequestBody ChangePasswordRequest changePasswordRequest) {

        try {
            userService.changeUserPassword(userId, changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{locataire_id}")
    public ResponseEntity<UserRequest> getUserByLocataireId(
            @PathVariable UUID locataire_id) {
        return userService.getUserByLocataireId(locataire_id);
    }






}












