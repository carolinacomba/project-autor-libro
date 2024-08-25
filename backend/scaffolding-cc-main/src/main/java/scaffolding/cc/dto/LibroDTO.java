package scaffolding.cc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import scaffolding.cc.models.Autor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LibroDTO {
    private String nombre;
    private String editorial;
    private String genero;
}
