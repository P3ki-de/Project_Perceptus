package szyfr.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "uzytkownicy") // Ensure this matches your table name in phpMyAdmin
public class Uzytkownik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Login") // Matches your column name
    private String login;

    @Column(name = "haslo") // Matches your column name
    private String haslo;

    // Getters and Setters
    public Long getId() { return id; }
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    public String getHaslo() { return haslo; }
    public void setHaslo(String haslo) { this.haslo = haslo; }
}