import { CSSProperties, useEffect, useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { supabase } from '../../supabase/client.ts';
import './CardDescription.css';
import { PostgrestError } from '@supabase/supabase-js';
import BeatLoader from "react-spinners/BeatLoader";
import { CardDescriptionProps, Todo } from '../../types/types.ts';
import Input from '../ui/Input.tsx';
import Button from '../ui/Button.tsx';
import Textarea from '../ui/Textarea.tsx';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#b97c7c",
};

export default function CardDescription({ todo, setSelectedTodo }: CardDescriptionProps): React.JSX.Element {
  const [todoDetails, setTodoDetails] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [updatedDescription, setUpdatedDescription] = useState<string>('');

  let [loading] = useState<boolean>(true);
  let [color] = useState<string>("#b97c7c");

  const getTodoDetails = async (id: number): Promise<void> => {
    try {
      const { data, error }: { data: null; error: PostgrestError | null } = await supabase
        .from('Todo')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error('Failed to fetch todo details');
      }

      setTodoDetails(data);
      setUpdatedTitle((data as unknown as Todo)?.title || '');
      setUpdatedDescription((data as unknown as Todo)?.description || '');
      // console.log('Todo details fetched:', data);
    } catch (error) {
      console.error('Error fetching todo details:', error);
    }
  };

  const updateTodo = async (id: number, updatedData: Partial<Todo>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('Todo')
        .update(updatedData)
        .eq('id', id);

      if (error) {
        throw new Error('Failed to update todo');
      }

      getTodoDetails(id); // Refresh todo details after update
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const { error } = await supabase
        .from('Todo')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Failed to delete todo');
      }

      setSelectedTodo(null); // Return to the list after deletion
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    // console.log('Todo prop:', todo);
    if (todo && todo.id) {
      getTodoDetails(todo.id);
    } else {
      setTodoDetails(null); // Reset details if no todo is selected
    }
  }, [todo]);

  return (
    <div className="card-description">
      {todoDetails === null ? (
        <div className="sweet-loading">
          <BeatLoader 
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            margin={10}
            speedMultiplier={0.5}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="card-item">
          <div className='card-infos'>
            {isEditing ? (
              <>
                <Input 
                  type="text"
                  title={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  className='input-todo'
                />
                <Button 
                  className='btn-todo'
                  text='Enregistrer'
                  onClick={() => updateTodo(todoDetails.id, { ...todoDetails, title: updatedTitle, description: updatedDescription })}
                  icon={<IoSaveOutline />}
                />
                <Button 
                  className='btn-todo'
                  text='Annuler'
                  onClick={() => setIsEditing(false)}
                  icon={<MdOutlineCancel />}
                />
              </>
            ) : (
              <>
                <h2>{todoDetails.title}</h2>
                <Button 
                  className='btn-todo'
                  text='Modifier'
                  onClick={() => setIsEditing(true)}
                  icon={<LuPencil />}
                />
                <Button 
                  className='btn-todo'
                  text='Supprimer'
                  onClick={() => deleteTodo(todoDetails.id)}
                  icon={<FaRegTrashAlt />}
                />
              </>
            )}
          </div>
          <div className="card-edit-description">
            {isEditing ? (
              <Textarea
                value={updatedDescription}
                className='textarea-todo'
                placeholder='Ajouter une description...'
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            ) : (
              <p>{todoDetails.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );  
}
