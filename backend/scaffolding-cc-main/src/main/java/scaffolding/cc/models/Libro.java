package scaffolding.cc.models;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import scaffolding.cc.entities.AutorEntity;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Libro {
    private String nombre;
    private String editorial;
    private String genero;
    private Autor autor;
}
