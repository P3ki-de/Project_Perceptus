package szyfr.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import szyfr.backend.models.Uzytkownik;
import szyfr.backend.models.Wiadomosc;
import szyfr.backend.repositories.WiadomoscRepository; // Make sure this matches your repo name
import java.util.Base64;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class Klikniecie {



    @Autowired
    private WiadomoscRepository wiadomoscRepository;

    // Request body structure for the JSON from React
    public record LoginRequest(String login, String password) {}



    // --- DEFINE THE ENVELOPE HERE ---
    // This must match the JSON you send from React: { "text": "...", "userId": 1 }
    public record EncodeRequest(String text, Long userId) {}

    @PostMapping("/encode")
    public String encodeText(@RequestBody EncodeRequest request) {

        // Check if userId was sent
        if (request.userId() == null) {
            System.out.println("Warning: No User ID provided!");
            return "Error: User not logged in";
        }

        String original = request.text();
        String encoded = Base64.getEncoder().encodeToString(original.getBytes());

        // Save to Database using the ID from the request
        Wiadomosc data = new Wiadomosc();
        data.setWiadomosci(encoded);        // Save the text
        data.setIdUzytkownika(request.userId()); // Save the User ID

        wiadomoscRepository.save(data);

        return encoded;
    }
}