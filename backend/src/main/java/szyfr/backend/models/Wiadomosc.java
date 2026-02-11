package szyfr.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "") // Replace with your actual table name
public class Wiadomosc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wiadomosci")
    private String wiadomosci;

    @Column(name = "id_uzytkownika")
    private Long idUzytkownika;

    // Setters and Getters
    public void setWiadomosci(String wiadomosci) { this.wiadomosci = wiadomosci; }
    public void setIdUzytkownika(Long idUzytkownika) { this.idUzytkownika = idUzytkownika; }

    public void save(Wiadomosc data) {
    }
}