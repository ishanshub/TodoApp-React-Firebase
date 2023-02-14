import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
  li: 'flex justify-between bg-slate-300 p-4 my-2 capitalize rounded-full',
  liComplete: 'flex justify-between bg-slate-400 p-4 my-2 capitalize rounded-full',
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`
}

const Todo = ( {todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
        <div className='flex pl-3 items-center'>
            <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
            <p onClick={() => toggleComplete(todo)}  className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)} className='cursor-pointer flex items-center pr-2'><FaRegTrashAlt /></button>
    </li>
  )
}

export default Todo
