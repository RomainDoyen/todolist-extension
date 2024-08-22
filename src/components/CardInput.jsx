import { FaPlus } from 'react-icons/fa6';
import './CardInput.css';

export default function CardInput() {
  return (
    <div className='card-input'>
      <form>
        <input
          type="text"
          placeholder='Insérer une nouvelle note...'
          required
        />
        <button className='circle' type="submit">
          <FaPlus size={35} color='black' />
        </button>
      </form>
    </div>
  )
}
