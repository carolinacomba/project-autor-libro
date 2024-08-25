package scaffolding.cc.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import scaffolding.cc.entities.LibroEntity;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Autor {
    private String nombre;
    private String apellido;
    private Integer dni;
}