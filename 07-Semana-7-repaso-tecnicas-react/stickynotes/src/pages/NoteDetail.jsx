import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// pagina de detalle de una nota usando useParams
// recibe: notes (para buscar la nota por id)
function NoteDetail({ notes }) {
  // useParams captura el id de la URL
  // si la URL es /note/123 entonces id = '123'
  const { id } = useParams();
  const navigate = useNavigate();

  // buscar la nota con ese id
  const note = notes.find(n => n.id === id);

  // si no existe la nota mostrar error
  if (!note) {
    return (
      <div className="container">
        <div className="note-not-found">
          <h2>nota no encontrada</h2>
          <Link to="/" className="btn-back">volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="note-detail">
        <button
          onClick={() => navigate(-1)}
          className="btn-back"
        >
          volver atras
        </button>

        <div
          className="note-detail-card"
          style={{ '--note-color': note.color }}
        >
          <div className="note-detail-header">
            <span className="category">{note.category}</span>
            {note.isFavorite && <span className="favorite-badge">favorita</span>}
          </div>

          <h1>{note.title}</h1>
          <p className="note-content">{note.content}</p>

          <div className="note-meta">
            <small>
              creada: {new Date(note.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;
