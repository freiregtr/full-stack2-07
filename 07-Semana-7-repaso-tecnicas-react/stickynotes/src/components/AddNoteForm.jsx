import React, { useState } from 'react';
import styles from './AddNoteForm.module.css';

// modal para crear notas nuevas
// recibe: isOpen (boolean), onClose (funcion para cerrar), onAdd (funcion al crear nota)
function AddNoteForm({ isOpen, onClose, onAdd }) {
  // creamos un state para cada campo del formulario
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('personal');

  const handleSubmit = (e) => {
    // evitamos que el navegador recargue la pagina
    e.preventDefault();

    // validacion: el titulo no puede estar vacio
    if (!title.trim()) {
      alert('el titulo es obligatorio');
      return;
    }

    // crear objeto de nueva nota
    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      color: getCategoryColor(category),
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    // llamamos a onAdd que viene como prop desde App.js
    onAdd(newNote);

    // limpiamos todos los campos
    setTitle('');
    setContent('');
    setCategory('personal');

    // cerramos el modal automaticamente
    onClose();
  };

  // funcion helper para obtener color segun categoria
  const getCategoryColor = (cat) => {
    const colors = {
      personal: '#FFE17B',
      trabajo: '#A7C7E7',
      ideas: '#FFB6D9',
      estudio: '#B4E7CE'
    };
    return colors[cat] || '#FFE17B';
  };

  // si no esta abierto no renderizamos nada (renderizado condicional)
  if (!isOpen) return null;

  // retornamos el modal con overlay y contenido
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* modal content: caja blanca centrada */}
      {/* e.stopPropagation evita que click en la caja cierre el modal */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* boton X para cerrar */}
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {/* formulario con controlled components */}
        <form className={styles.addNoteForm} onSubmit={handleSubmit}>
          <h2>crear nueva nota</h2>

          <div className={styles.formGroup}>
            <label>titulo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="titulo de la nota..."
              maxLength={50}
            />
          </div>

          <div className={styles.formGroup}>
            <label>contenido</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="escribe aqui..."
              rows={4}
              maxLength={200}
            />
          </div>

          <div className={styles.formGroup}>
            <label>categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="personal">personal</option>
              <option value="trabajo">trabajo</option>
              <option value="ideas">ideas</option>
              <option value="estudio">estudio</option>
            </select>
          </div>

          <button type="submit" className={styles.btnPrimary}>
            agregar nota
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNoteForm;
