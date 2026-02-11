package szyfr.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "history")
public class EncodedData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalText;
    private String encodedText;

    // --- ADD THESE SETTERS MANUALLY ---

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public void setEncodedText(String encodedText) {
        this.encodedText = encodedText;
    }

    // You'll also likely want getters to read the data later
    public String getOriginalText() { return originalText; }
    public String getEncodedText() { return encodedText; }
}