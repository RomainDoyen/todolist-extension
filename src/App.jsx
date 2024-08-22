import CardInput from './components/CardInput';
import CardNotes from './components/CardNotes';

function App() {

  return (
    <div className='contains'>
      <CardInput />
      <div className="container">
        <CardNotes />
      </div>
    </div>
  )
}

export default App
