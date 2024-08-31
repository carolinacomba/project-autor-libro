package scaffolding.cc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scaffolding.cc.dto.LibroDTO;
import scaffolding.cc.entities.LibroEntity;
import scaffolding.cc.models.Libro;
import scaffolding.cc.services.LibroService;

import java.util.List;

@RestController
@RequestMapping("/api/libro")
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {

    @Autowired
    LibroService libroService;

    @GetMapping("/getLibros")
    public ResponseEntity<List<Libro>> getLibros() {
        List<Libro> libros = libroService.getLibros();
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }

    @GetMapping("/getLibroById/{id}")
    public ResponseEntity<Libro> getLibroById(@PathVariable Long id) {
        Libro libro = libroService.getLibroById(id);
        if (libro != null) {
            return new ResponseEntity<>(libro, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/saveLibro/{dni}")
    public ResponseEntity<LibroEntity> saveLibro(@RequestBody LibroDTO libro, @PathVariable Integer dni) {
        LibroEntity savedLibro = libroService.saveLibro(libro, dni);
        return new ResponseEntity<>(savedLibro, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteLibro/{id}")
    public ResponseEntity<Void> deleteLibro(@PathVariable Long id) {
        boolean isDeleted = libroService.deleteLibro(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateLibro/{id}")
    public ResponseEntity<LibroEntity> updateLibro(@RequestBody LibroDTO libro, @PathVariable Long id) {
        LibroEntity updatedLibro = libroService.updateLibro(id, libro);
        if (updatedLibro != null) {
            return ResponseEntity.ok(updatedLibro);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getLibrosByAutor/{dni}")
    public ResponseEntity<List<Libro>> getLibrosByAutor(@PathVariable Integer dni) {
        List<Libro> libros = libroService.getLibrosByAutor(dni);
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }
}
