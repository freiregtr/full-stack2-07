import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NoteDetail from './pages/NoteDetail';
import mockNotes from './data/mockNotes';
import './App.css';

function App() {
  // leer de localStorage al iniciar con lazy initialization
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('stickynotes');
    if (saved) {
      return JSON.parse(saved);
    }
    return mockNotes;
  });

  // state para controlar si el modal esta abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // guardar en localStorage cada vez que notes cambie
  useEffect(() => {
    localStorage.setItem('stickynotes', JSON.stringify(notes));
  }, [notes]);

  const handleAdd = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="app-title">
            <h1>StickyNotes</h1>
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-link">todas</Link>
            <Link to="/favorites" className="nav-link">favoritas</Link>
          </nav>

          <button
            className="btn-clear"
            onClick={() => {
              if (window.confirm('borrar todas las notas?')) {
                setNotes([]);
                localStorage.removeItem('stickynotes');
              }
            }}
          >
            limpiar todo
          </button>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                notes={notes}
                isModalOpen={isModalOpen}
                openModal={openModal}
                closeModal={closeModal}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                notes={notes}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/note/:id"
            element={<NoteDetail notes={notes} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
