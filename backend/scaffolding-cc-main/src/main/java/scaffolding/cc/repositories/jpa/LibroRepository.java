package scaffolding.cc.repositories.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import scaffolding.cc.entities.LibroEntity;

@Repository
public interface LibroRepository extends JpaRepository<LibroEntity, Long> {
}
