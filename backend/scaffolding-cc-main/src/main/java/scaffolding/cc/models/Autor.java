package scaffolding.cc.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Autor {
    private String nombre;
    private String apellido;
    private Integer dni;
}