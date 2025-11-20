
import java.util.Optional;

public interface CarreraDAO {

    Optional<Carrera> findById(Integer id);

    Carrera save(Carrera carrera);

    Iterable<Carrera> findAll();

    void deleteById(Integer id);

}
