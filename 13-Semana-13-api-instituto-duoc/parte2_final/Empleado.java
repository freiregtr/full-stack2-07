
import java.math.BigDecimal;

public class Empleado extends Persona {

    private BigDecimal sueldo;
    private TipoEmpleado tipo;

    public Empleado() {
    }

    public Empleado(Integer id, String nombre, String apellido, String rut, Direccion direccion, BigDecimal sueldo, TipoEmpleado tipo) {
        super(id, nombre, apellido, rut, direccion);
        this.sueldo = sueldo;
        this.tipo = tipo;
    }

    public BigDecimal getSueldo() {
        return sueldo;
    }

    public void setSueldo(BigDecimal sueldo) {
        this.sueldo = sueldo;
    }

    public TipoEmpleado getTipo() {
        return tipo;
    }

    public void setTipo(TipoEmpleado tipo) {
        this.tipo = tipo;
    }
}
