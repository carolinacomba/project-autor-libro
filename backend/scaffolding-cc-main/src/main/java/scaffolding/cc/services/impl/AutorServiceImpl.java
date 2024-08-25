package scaffolding.cc.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import scaffolding.cc.entities.AutorEntity;
import scaffolding.cc.models.Autor;
import scaffolding.cc.repositories.jpa.AutorRepository;
import scaffolding.cc.services.AutorService;

import java.util.ArrayList;
import java.util.List;

@Service
public class AutorServiceImpl implements AutorService {

    @Autowired
    private AutorRepository autorRepository;


    @Override
    public List<Autor> getAutores() {
        List<AutorEntity> autorEntities = autorRepository.findAll();
        List<Autor> autors = new ArrayList<>();
        for (AutorEntity aEntity : autorEntities) {
            Autor autor = new Autor();
            autor.setNombre(aEntity.getNombre());
            autor.setApellido(aEntity.getApellido());
            autor.setDni(aEntity.getDni());
            autors.add(autor);
        }
        return autors;
    }

    @Override
    public Autor getAutorById(Long id) {
        AutorEntity autorEntity = autorRepository.findById(id).get();
        Autor autor = new Autor();
        autor.setNombre(autorEntity.getNombre());
        autor.setApellido(autorEntity.getApellido());
        autor.setDni(autorEntity.getDni());
        return autor;
    }

    @Override
    public Autor getAutorByDni(Integer dni) {
        AutorEntity autorEntity = autorRepository.findByDni(dni);
        Autor autor = new Autor();
        autor.setNombre(autorEntity.getNombre());
        autor.setApellido(autorEntity.getApellido());
        autor.setDni(autorEntity.getDni());
        return autor;
    }

    @Override
    public AutorEntity saveAutor(Autor autor) {
        AutorEntity autorEntity = new AutorEntity();
        autorEntity.setNombre(autor.getNombre());
        autorEntity.setApellido(autor.getApellido());
        autorEntity.setDni(autor.getDni());
        AutorEntity autorSaved = autorRepository.save(autorEntity);
//        Autor autorSavedModel = new Autor();
//        autorSavedModel.setNombre(autorSaved.getNombre());
//        autorSavedModel.setApellido(autorSaved.getApellido());
//        autorSavedModel.setDni(autorSaved.getDni());
        return autorSaved;
    }

    @Override
    public Boolean deleteAutor(Long id) {
        if (autorRepository.findById(id).isPresent()) {
            autorRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public AutorEntity updateAutor(Integer dni, Autor autor) {
        AutorEntity autorEntity = autorRepository.findByDni(dni);

        if (autorEntity != null) {
            autorEntity.setNombre(autor.getNombre());
            autorEntity.setApellido(autor.getApellido());
            autorEntity.setDni(autor.getDni());

            return autorRepository.save(autorEntity);
        } else {
            throw new IllegalArgumentException("Autor no encontrado");
        }
    }

    @Override
    public Boolean deleteByDni(Integer dni) {
        if (autorRepository.findByDni(dni) != null) {
            autorRepository.delete(autorRepository.findByDni(dni));
            return true;
        } else {
            throw new IllegalArgumentException("Autor no encontrado");
        }
    }
}
