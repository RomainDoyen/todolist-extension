import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import './CardInput.css';
import { supabase } from '../supabase/client';

export default function CardInput({ todos, setTodos }) {
  const [title, setTitle] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log('Creating todo with title:', title);
  
    try {
      const { data, error } = await supabase
        .from('Todo')
        .insert([{ title, updatedAt: new Date() }]);
  
      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to create todo');
      }
  
      console.log('Todo created:', data);
      if (data && data.length > 0) {
        setTodos([...todos, data[0]]);
      }
      setTitle('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  return (
    <div className='card-input'>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Insérer une nouvelle note...'
          required
        />
        <button className='circle' type="submit">
          <FaPlus size={35} color='black' />
        </button>
      </form>
    </div>
  );
}
