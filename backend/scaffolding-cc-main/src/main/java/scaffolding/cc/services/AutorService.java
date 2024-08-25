package scaffolding.cc.services;

import org.springframework.stereotype.Service;
import scaffolding.cc.entities.AutorEntity;
import scaffolding.cc.models.Autor;

import java.util.List;

@Service
public interface AutorService {
    List<Autor> getAutores();

    Autor getAutorById(Long id);

    Autor getAutorByDni(Integer dni);

    AutorEntity saveAutor(Autor autor);

    Boolean deleteAutor(Long id);

    AutorEntity updateAutor(Integer dni, Autor autor);

    Boolean deleteByDni(Integer dni);
}
