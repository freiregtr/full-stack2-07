import React from 'react';
import StickyNote from './StickyNote';

// este componente renderiza una lista de notas
// recibe notes (un array), onDelete (una funcion), onToggleFavorite (otra funcion)
function NotesGrid({ notes, onDelete, onToggleFavorite }) {
  // primero, si no hay notas mostramos un mensaje que no hay notas
  if (notes.length === 0) {
    return <p className="empty-state">no hay notas todavia. crea una!</p>;
  }

  // recorremos el array de notas con map y por cada una creamos un componente StickyNote
  return (
    <div className="notes-grid">
      {notes.map(note => (
        <StickyNote
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          category={note.category}
          color={note.color}
          isFavorite={note.isFavorite}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default NotesGrid;
