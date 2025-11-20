
import java.math.BigDecimal;

public class Profesor extends Persona {

    private BigDecimal sueldo;

    public Profesor() {
    }

    public Profesor(Integer id, String nombre, String apellido, String rut, Direccion direccion, BigDecimal sueldo) {
        super(id, nombre, apellido, rut, direccion);
        this.sueldo = sueldo;
    }

    public BigDecimal getSueldo() {
        return sueldo;
    }

    public void setSueldo(BigDecimal sueldo) {
        this.sueldo = sueldo;
    }
}
