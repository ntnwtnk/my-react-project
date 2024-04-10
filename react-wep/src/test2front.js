import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {todos.map(todos)}
    </div>
  )
    
}
export default App()
