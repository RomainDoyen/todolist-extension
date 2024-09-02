import { useEffect, useState, CSSProperties } from 'react';
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import './CardDescription.css';
import { supabase } from '../supabase/client';
// import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { PostgrestError } from '@supabase/supabase-js';
import { Todo, CardDescriptionProps } from '../types/types.ts';

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
    
          {/* <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
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
                <input
                  type="text"
                  className='input-todo'
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <button className='btn-todo' onClick={() => updateTodo(todoDetails.id, { ...todoDetails, title: updatedTitle, description: updatedDescription })}>
                  <IoSaveOutline /> Enregistrer
                </button>
                <button className='btn-todo' onClick={() => setIsEditing(false)}>
                  <MdOutlineCancel /> Annuler
                </button>
              </>
            ) : (
              <>
                <h2>{todoDetails.title}</h2>
                <button className='btn-todo' onClick={() => setIsEditing(true)}>
                  <LuPencil /> Modifier
                </button>
                <button className='btn-todo' onClick={() => deleteTodo(todoDetails.id)}>
                  <FaRegTrashAlt /> Supprimer
                </button>
              </>
            )}
          </div>
          <div className="card-edit-description">
            {isEditing ? (
              <textarea
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
