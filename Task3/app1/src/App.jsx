import { Routes, Route, Navigate } from 'react-router'
import Todo from './pages/Todo'

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/todo" />} />

      {/* Todo page */}
      <Route path="/todo" element={<Todo />} />

      {/* Handle unknown routes */}
      <Route path="*" element={<Navigate to="/todo" />} />
    </Routes>
  )
}

export default App
