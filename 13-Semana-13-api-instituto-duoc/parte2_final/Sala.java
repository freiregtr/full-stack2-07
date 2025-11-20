
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class Sala implements Serializable {

    private Integer id;
    private Integer numero;
    private String tamanio;
    private Integer cantidadEscritorios;
    private TipoPizarra tipoPizarra;
    private LocalDateTime fechaAlta;
    private LocalDateTime fechaModificacion;

    public Sala() {
    }

    public Sala(Integer id, Integer numero, String tamanio, Integer cantidadEscritorios, TipoPizarra tipoPizarra) {
        this.id = id;
        this.numero = numero;
        this.tamanio = tamanio;
        this.cantidadEscritorios = cantidadEscritorios;
        this.tipoPizarra = tipoPizarra;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getTamanio() {
        return tamanio;
    }

    public void setTamanio(String tamanio) {
        this.tamanio = tamanio;
    }

    public Integer getCantidadEscritorios() {
        return cantidadEscritorios;
    }

    public void setCantidadEscritorios(Integer cantidadEscritorios) {
        this.cantidadEscritorios = cantidadEscritorios;
    }

    public TipoPizarra getTipoPizarra() {
        return tipoPizarra;
    }

    public void setTipoPizarra(TipoPizarra tipoPizarra) {
        this.tipoPizarra = tipoPizarra;
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

    @Override
    public String toString() {
        return "Sala{" +
                "id=" + id +
                ", numero=" + numero +
                ", tamanio='" + tamanio + '\'' +
                ", cantidadEscritorios=" + cantidadEscritorios +
                ", tipoPizarra=" + tipoPizarra +
                ", fechaAlta=" + fechaAlta +
                ", fechaModificacion=" + fechaModificacion +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sala sala = (Sala) o;
        return id.equals(sala.id) && numero.equals(sala.numero);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numero);
    }
}
