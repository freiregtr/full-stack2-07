import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StickyNote.module.css';

// este componente recibe datos por props y los muestra
// recibe: id, title, content, category, color, isFavorite, onDelete, onToggleFavorite
function StickyNote({ id, title, content, category, color, isFavorite, onDelete, onToggleFavorite }) {
  const navigate = useNavigate();

  // navegar al detalle al hacer click en la nota
  const handleCardClick = () => {
    navigate(`/note/${id}`);
  };

  // ejecutar accion sin disparar handleCardClick
  // e.stopPropagation detiene la propagacion del evento
  const handleActionClick = (e, callback) => {
    e.stopPropagation();
    callback(id);
  };

  return (
    <div
      className={styles.stickyNote}
      style={{ '--note-color': color }}
      onClick={handleCardClick}
    >
      <div className={styles.stickyNoteHeader}>
        <span className={styles.category}>{category}</span>
        <div className={styles.actions}>
          <button
            onClick={(e) => handleActionClick(e, onToggleFavorite)}
            className={styles.btnIcon}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            onClick={(e) => handleActionClick(e, onDelete)}
            className={styles.btnIcon}
          >
            ×
          </button>
        </div>
      </div>

      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default StickyNote;
