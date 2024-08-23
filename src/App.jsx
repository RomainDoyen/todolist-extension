import CardInput from './components/CardInput';
import CardNotes from './components/CardNotes';
import CardDescription from './components/CardDescription';
import { useState, useEffect } from 'react';
import { supabase } from './supabase/client';

function App() {

  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const getTodos = async () => {
    try {
      const { data: todos, error } = await supabase
        .from('Todo')
        .select('*')
        .order('id', { ascending: false });
      if (error) {
        throw new Error('Failed to fetch todos');
      }
      setTodos(todos);
      // console.log('Todos fetched:', todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);


  return (
    <div className='contains'>
      <CardInput todos={todos} setTodos={setTodos} />
      <div className="container">
        <CardNotes todos={todos} setSelectedTodo={setSelectedTodo} />
        {selectedTodo ? (
          <CardDescription />
        ) : (
          <div className="card-description">
            <div className="card-no-description">
              <p className='not'>Aucune note sélectionnée.</p>
              <p className='not'>Veuillez sélectionner une note pour voir les détails.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
