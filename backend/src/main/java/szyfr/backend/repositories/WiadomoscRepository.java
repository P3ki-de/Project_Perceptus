package szyfr.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import szyfr.backend.models.Wiadomosc;

import java.util.List;

@Repository
public interface WiadomoscRepository extends JpaRepository<Wiadomosc, Long> {

    // This is a "magic method". Spring figures out the SQL just from the name!
    // It will find all messages belonging to a specific user ID.
    List<Wiadomosc> findByIdUzytkownika(Long idUzytkownika);
}