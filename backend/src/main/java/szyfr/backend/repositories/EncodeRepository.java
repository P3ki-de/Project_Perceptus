package szyfr.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import szyfr.backend.models.EncodedData;

public interface EncodeRepository extends JpaRepository<EncodedData, Long> {
}