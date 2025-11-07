// array con 5 notas de ejemplo
// cada nota tiene: id, title, content, category, color, isFavorite, createdAt
const mockNotes = [
  {
    id: '1',
    title: 'compras del super',
    content: 'pan integral, leche descremada, huevos, yogurt griego',
    category: 'personal',
    color: '#FFE17B',
    isFavorite: true,
    createdAt: '2025-01-15T09:00:00'
  },
  {
    id: '2',
    title: 'reunion con cliente',
    content: 'presentar propuesta de proyecto nuevo',
    category: 'trabajo',
    color: '#A7C7E7',
    isFavorite: false,
    createdAt: '2025-01-15T10:30:00'
  },
  {
    id: '3',
    title: 'idea: app de habitos',
    content: 'app para trackear habitos diarios con gamificacion',
    category: 'ideas',
    color: '#FFB6D9',
    isFavorite: true,
    createdAt: '2025-01-15T14:20:00'
  },
  {
    id: '4',
    title: 'estudiar React Router',
    content: 'repasar useParams y useLocation para el examen',
    category: 'estudio',
    color: '#B4E7CE',
    isFavorite: false,
    createdAt: '2025-01-16T08:00:00'
  },
  {
    id: '5',
    title: 'llamar al dentista',
    content: 'agendar limpieza dental para febrero',
    category: 'personal',
    color: '#FFE17B',
    isFavorite: false,
    createdAt: '2025-01-16T11:15:00'
  }
];

export default mockNotes;
