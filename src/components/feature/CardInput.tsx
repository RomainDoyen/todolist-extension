import { PostgrestError } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { supabase } from '../../supabase/client.ts';
import { CardInputProps } from '../../types/todoTypes.ts';
import Button from '../ui/Button.tsx';
import Input from '../ui/Input.tsx';
import './CardInput.css';

export default function CardInput({ todos, setTodos }: CardInputProps): React.JSX.Element {
  const [title, setTitle] = useState<string>('');

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Creating todo with title:', title);
  
    try {
      const { data, error }: { data: null; error: PostgrestError | null } = await supabase
        .from('Todo')
        .insert([{ title, updatedAt: new Date() }]);
  
      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to create todo');
      }
  
      console.log('Todo created:', data);
      if (data && (data as any[]).length > 0) {
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
        <Input 
          type="text"
          title={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Insérer une nouvelle note...'
        />
        <Button 
          className='circle'
          type='submit'
          icon={<FaPlus size={35} color='black' />}
        />
      </form>
    </div>
  );
}
