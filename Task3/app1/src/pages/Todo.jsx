import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  // State for todos and input
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Start editing a todo
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edited todo
  const saveEdit = (id) => {
    if (editText.trim() === '') {
      setEditingId(null);
      return;
    }

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Clear all todos
  const clearAllTodos = () => {
    if (window.confirm('Are you sure you want to delete all todos?')) {
      setTodos([]);
    }
  };

  // Handle key press for adding todo (Enter key)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Count completed and pending todos
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>📝 My Todo List</h1>
        <p className="todo-subtitle">Stay organized and productive</p>
      </header>

      <div className="todo-stats">
        <div className="stat-card">
          <span className="stat-number">{todos.length}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-number">{pendingCount}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="todo-input-section">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            Add Todo
          </button>
        </div>
        {todos.length > 0 && (
          <button onClick={clearAllTodos} className="clear-all-btn">
            Clear All
          </button>
        )}
      </div>

      {todos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No todos yet</h3>
          <p>Add your first todo item above to get started!</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                
                {editingId === todo.id ? (
                  <div className="edit-container">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button onClick={() => saveEdit(todo.id)} className="save-btn">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="cancel-btn">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      className="todo-text"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.text}
                    </span>
                    <div className="todo-actions">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="edit-btn"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              {!editingId === todo.id && (
                <div className="todo-meta">
                  <span className="todo-date">
                    Added: {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className="todo-footer">
        <p>Double-click todo text to toggle completion</p>
        <p>{pendingCount} {pendingCount === 1 ? 'item' : 'items'} pending</p>
      </footer>
    </div>
  );
};

export default Todo;