package scaffolding.cc.repositories.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import scaffolding.cc.entities.AutorEntity;

@Repository
public interface AutorRepository extends JpaRepository<AutorEntity, Long> {
    @Query("SELECT a FROM AutorEntity a WHERE a.dni = :dni")
    AutorEntity findByDni(@Param("dni") Integer dni);
}
