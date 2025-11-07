import React from 'react';
import { useLocation, Link } from 'react-router-dom';

// barra de filtros por categoria usando query strings
function FilterBar() {
  const location = useLocation();

  // extraer el parametro category de la URL
  // si URL es /?category=trabajo entonces category = 'trabajo'
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get('category') || 'todas';

  const categories = [
    { name: 'todas', label: 'todas', color: '#E5E5E5' },
    { name: 'personal', label: 'personal', color: '#FFE17B' },
    { name: 'trabajo', label: 'trabajo', color: '#A7C7E7' },
    { name: 'ideas', label: 'ideas', color: '#FFB6D9' },
    { name: 'estudio', label: 'estudio', color: '#B4E7CE' }
  ];

  return (
    <div className="filter-bar">
      <span className="filter-label">filtrar:</span>
      <div className="filter-buttons">
        {categories.map(cat => (
          <Link
            key={cat.name}
            to={cat.name === 'todas' ? '/' : `/?category=${cat.name}`}
            className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
            style={{
              '--filter-color': activeCategory === cat.name ? cat.color : '#F5F5F5'
            }}
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
