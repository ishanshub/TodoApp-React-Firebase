import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from "./components/Todo";
import { db } from "./firebase";
import { 
  query, 
  collection, 
  onSnapshot, 
  updateDoc, 
  doc, 
  addDoc, 
  deleteDoc, 
  Timestamp, 
  orderBy 
} from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('') ;

  //create
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(input === '') {
      alert('Please enter valid text')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text:input,
      completed: false,
      timestamp: Timestamp.now()
    });
    setInput('');
  }

  //read
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //update
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  //delete
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }


  return (
    <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#141E30] to-[#243B55] overflow-auto" >
      <div class="flex items-center justify-center h-[100%]">
        <div className="bg-slate-200 max-w-[600px] w-full m-auto rounded-[50px] shadow-xl p-12 items-center">

          <h3 className="text-3xl font-bold text-center text-gray-800 p-2 mb-4">Todo App</h3>

          <form onSubmit={createTodo} className="flex justify-between">

            <input 
            value ={input} 
            onChange={(e) => setInput(e.target.value)} 
            type="text" placeholder="Add Todo" 
            className="border p-2 w-full text-xl rounded-full indent-4"/>

            <button className="border-2 p-4 ml-2 bg-[#DEA01E] text-slate-200 rounded-full hover:bg-[#C58F1B]"> 
            <AiOutlinePlus size={30} /> 
            </button>

          </form>

          <ul>
            {todos.map((todo, index) => (
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
            ))}
          </ul>

            { todos.length <1 ? null : <p className="text-center pt-4 pb-2">{`You have ${todos.length} todos`}</p> }

          </div>
        </div>
      </div>
  );
}

export default App;
