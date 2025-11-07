import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotesGrid from '../components/NotesGrid';
import AddNoteForm from '../components/AddNoteForm';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';

// pagina principal con formulario modal, busqueda, filtros y lista de notas
// recibe: notes, isModalOpen, openModal, closeModal, onAdd, onDelete, onToggleFavorite
function Home({ notes, isModalOpen, openModal, closeModal, onAdd, onDelete, onToggleFavorite }) {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category');

  // filtrar por categoria
  let filteredNotes = categoryFilter
    ? notes.filter(note => note.category === categoryFilter)
    : notes;

  // filtrar por busqueda
  if (searchTerm) {
    filteredNotes = filteredNotes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="container">
      {/* boton flotante para abrir modal */}
      <button className="btn-add-note" onClick={openModal}>
        +
      </button>

      {/* modal para crear notas */}
      <AddNoteForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={onAdd}
      />

      <div className="controls">
        <SearchBar onSearch={setSearchTerm} />
        <FilterBar />
      </div>

      {(categoryFilter || searchTerm) && (
        <p className="filter-info">
          mostrando {filteredNotes.length} notas
          {categoryFilter && ` de categoria: ${categoryFilter}`}
          {searchTerm && ` con busqueda: "${searchTerm}"`}
        </p>
      )}

      <NotesGrid
        notes={filteredNotes}
        onDelete={onDelete}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}

export default Home;
