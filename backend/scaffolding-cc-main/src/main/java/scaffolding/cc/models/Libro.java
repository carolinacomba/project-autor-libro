package scaffolding.cc.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Libro {
    private Long id;
    private String nombre;
    private String editorial;
    private String genero;
    private Autor autor;
}
