package scaffolding.cc.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import scaffolding.cc.dto.LibroDTO;
import scaffolding.cc.entities.AutorEntity;
import scaffolding.cc.entities.LibroEntity;
import scaffolding.cc.models.Autor;
import scaffolding.cc.models.Libro;
import scaffolding.cc.repositories.jpa.AutorRepository;
import scaffolding.cc.repositories.jpa.LibroRepository;
import scaffolding.cc.services.LibroService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class LibroServiceImpl implements LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private AutorRepository autorRepository;


    @Override
    public List<Libro> getLibros() {
        List<Libro> libros = new ArrayList<>();
        for (LibroEntity l : libroRepository.findAll()) {
            libros.add(new Libro(l.getId(), l.getNombre(), l.getEditorial(), l.getGenero(), new Autor(l.getAutor().getNombre(), l.getAutor().getApellido(), l.getAutor().getDni())));
        }
        return libros;
    }

    @Override
    public Libro getLibroById(Long id) {
        LibroEntity libroEntity = libroRepository.findById(id).get();
        Libro libro = new Libro();
        libro.setId(libroEntity.getId());
        libro.setNombre(libroEntity.getNombre());
        libro.setEditorial(libroEntity.getEditorial());
        libro.setGenero(libroEntity.getGenero());
        Autor autor = new Autor();
        autor.setNombre(libroEntity.getAutor().getNombre());
        autor.setApellido(libroEntity.getAutor().getApellido());
        autor.setDni(libroEntity.getAutor().getDni());
        libro.setAutor(autor);
        return libro;
    }

    @Override
    public LibroEntity saveLibro(LibroDTO libro, Integer dni) {
        LibroEntity libroEntity = new LibroEntity();
        libroEntity.setNombre(libro.getNombre());
        libroEntity.setEditorial(libro.getEditorial());
        libroEntity.setGenero(libro.getGenero());
        AutorEntity autorEntity = autorRepository.findByDni(dni);
        libroEntity.setAutor(autorEntity);
        return libroRepository.save(libroEntity);
    }

    @Override
    public Boolean deleteLibro(Long id) {
        if (libroRepository.findById(id).isPresent()) {
            libroRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public LibroEntity updateLibro(Long id, LibroDTO libro) {
        LibroEntity libroEntity = libroRepository.findById(id).get();
        libroEntity.setNombre(libro.getNombre());
        libroEntity.setEditorial(libro.getEditorial());
        libroEntity.setGenero(libro.getGenero());
        return libroRepository.save(libroEntity);
    }

    @Override
    public List<Libro> getLibrosByAutor(Integer dni) {
        List<Libro> libros = new ArrayList<>();
        for (Libro l : getLibros()) {
            if (Objects.equals(l.getAutor().getDni(), dni)) {
                libros.add(l);
            }
        }
        return libros;
    }
}
