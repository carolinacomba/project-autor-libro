package scaffolding.cc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import scaffolding.cc.entities.AutorEntity;
import scaffolding.cc.models.Autor;
import scaffolding.cc.services.AutorService;

import java.util.List;

@RestController
@RequestMapping("/api/autor")
@CrossOrigin(origins = "http://localhost:4200")
public class AutorController {

    @Autowired
    AutorService autorService;

    @GetMapping("/getAutores")
    public ResponseEntity<List<Autor>> getAutores() {
        List<Autor> autores = autorService.getAutores();
        return new ResponseEntity<>(autores, HttpStatus.OK);
    }

    @GetMapping("/getAutorById/{id}")
    public ResponseEntity<Autor> getAutorById(@PathVariable Long id) {
        Autor autor = autorService.getAutorById(id);
        if (autor != null) {
            return new ResponseEntity<>(autor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getAutorByDni/{dni}")
    public ResponseEntity<Autor> getAutorByDni(@PathVariable Integer dni) {
        Autor autor = autorService.getAutorByDni(dni);
        if (autor != null) {
            return new ResponseEntity<>(autor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/saveAutor/")
    public ResponseEntity<AutorEntity> saveAutor(@RequestBody Autor autor) {
        AutorEntity savedAutor = autorService.saveAutor(autor);
        return new ResponseEntity<>(savedAutor, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteAutor/{id}")
    public ResponseEntity<Void> deleteAutor(@PathVariable Long id) {
        boolean isDeleted = autorService.deleteAutor(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateAutor/{dni}")
    public ResponseEntity<AutorEntity> updateAutor(@RequestBody Autor autor, @PathVariable Integer dni) {
        AutorEntity updatedAutor = autorService.updateAutor(dni, autor);
        if (updatedAutor != null) {
            return new ResponseEntity<>(updatedAutor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteByDni/{dni}")
    public ResponseEntity<Void> deleteByDni(@PathVariable Integer dni) {
        boolean isDeleted = autorService.deleteByDni(dni);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
