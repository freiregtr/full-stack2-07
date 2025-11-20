
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "empleados")
@PrimaryKeyJoinColumn(name = "persona_id")
public class Empleado extends Persona {

    private BigDecimal sueldo;

    @Column(name = "tipo_empleado")
    @Enumerated(EnumType.STRING)
    private TipoEmpleado tipo;

    @ManyToOne(
            optional = true,
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "ala_id",
            foreignKey = @ForeignKey(name = "FK_ALA_ID")
    )
    private Ala ala;

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

    public Ala getAla() {
        return ala;
    }

    public void setAla(Ala ala) {
        this.ala = ala;
    }

    @Override
    public String toString() {
        return super.toString() +
                "\tEmpleado{" +
                "sueldo=" + sueldo +
                ", tipo=" + tipo +
                '}';
    }
}
