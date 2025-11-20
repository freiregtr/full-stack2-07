
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "alas")
public class Ala implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cantidad_pisos")
    private Integer cantidadPisos;

    @Column(name = "nombre_ala", unique = true, nullable = false)
    private String nombre;

    @Column(name = "fecha_alta")
    private LocalDateTime fechaAlta;

    @Column(name = "fecha_modificacion")
    private LocalDateTime fechaModificacion;

    @OneToMany(
            mappedBy = "ala",
            fetch = FetchType.LAZY,
            cascade = CascadeType.MERGE
    )
    private Set<Sala> salas;

    public Ala() {
    }

    public Ala(Integer id, Integer cantidadPisos, String nombre) {
        this.id = id;
        this.cantidadPisos = cantidadPisos;
        this.nombre = nombre;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCantidadPisos() {
        return cantidadPisos;
    }

    public void setCantidadPisos(Integer cantidadPisos) {
        this.cantidadPisos = cantidadPisos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDateTime getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(LocalDateTime fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public LocalDateTime getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(LocalDateTime fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public Set<Sala> getSalas() {
        return salas;
    }

    public void setSalas(Set<Sala> salas) {
        this.salas = salas;
    }

    @PrePersist
    private void antesDePersistir() {
        this.fechaAlta = LocalDateTime.now();
    }

    @PreUpdate
    private void antesDeUpdate() {
        this.fechaModificacion = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Ala{" +
                "id=" + id +
                ", cantidadPisos=" + cantidadPisos +
                ", nombre='" + nombre + '\'' +
                ", fechaAlta=" + fechaAlta +
                ", fechaModificacion=" + fechaModificacion +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ala ala = (Ala) o;
        return id.equals(ala.id) && nombre.equals(ala.nombre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre);
    }
}
