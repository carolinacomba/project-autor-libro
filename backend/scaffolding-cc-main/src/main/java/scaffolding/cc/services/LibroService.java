package scaffolding.cc.services;

import org.springframework.stereotype.Service;
import scaffolding.cc.dto.LibroDTO;
import scaffolding.cc.entities.LibroEntity;
import scaffolding.cc.models.Libro;

import java.util.List;

@Service
public interface LibroService {
    List<Libro> getLibros();

    Libro getLibroById(Long id);

    LibroEntity saveLibro(LibroDTO libro, Integer dni);

    Boolean deleteLibro(Long id);

    LibroEntity updateLibro(Long id, LibroDTO libro);

    List<Libro> getLibrosByAutor(Integer dni);
}
