import React from 'react';
import NotesGrid from '../components/NotesGrid';
import { Link } from 'react-router-dom';

// pagina que muestra solo las notas favoritas
// recibe: notes, onDelete, onToggleFavorite
function Favorites({ notes, onDelete, onToggleFavorite }) {
  // filtrar solo las favoritas
  const favoriteNotes = notes.filter(note => note.isFavorite);

  return (
    <div className="container">
      <div className="page-header">
        <h2>notas favoritas</h2>
        <Link to="/" className="btn-back">volver a todas</Link>
      </div>

      {favoriteNotes.length === 0 ? (
        <p className="empty-state">no tienes notas favoritas todavia</p>
      ) : (
        <NotesGrid
          notes={favoriteNotes}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}

export default Favorites;
