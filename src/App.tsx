import React, { useEffect, useState } from 'react';
import CardDescription from './components/feature/CardDescription.tsx';
import CardInput from './components/feature/CardInput.tsx';
import CardNotes from './components/feature/CardNotes.tsx';
import { supabase } from './supabase/client';
import { Todo } from './types/types.ts';

function App(): React.JSX.Element {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

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
          <CardDescription todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
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
