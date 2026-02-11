package szyfr.backend.controllers;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import szyfr.backend.models.LoginRequest;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow your React app
public class AuthController {

    @Autowired
    private UserService userService; // We will create this next

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Find user and verify password
        Optional<User> user = userService.authenticate(request.getLogin(), request.getPassword());

        if (user.isPresent()) {
            // Your React code expects the User ID back as JSON
            return ResponseEntity.ok(user.get().getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}