import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])

  const handleEdit = () => {

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  // const handleCheckBox = (e) => {
  //   let id = e.target.id
  //   let index = todos.findIndex((item) => {
  //     return item.id == id
  //   })
  //   let newTodos = [...todos];
  //   newTodos[index].isCompleted = !newTodos[index].isCompleted
  //   setTodos(newTodos)
  // }
  const handleCheckBox = (e) => {
    const id = e.target.id;
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl  bg-cyan-600 min-h-[80vh]">

        <div className="addTodo my-5">

          <h1 className='text-xl font-bold p-2'>Add a Todo</h1>
          <input onChange={handleChange} value={todo} className="bg-white w-1/2 text-black" type="text" />
          <button onClick={handleAdd} className='bg-cyan-900 text-white  px-3 py-2 rounded-xl mx-4 font-bold text-sm'>Add</button>

        </div>
        <h2 className='text-xl font-bold p-2'>Your Todos</h2>

        <div className="todos p-4 ">

          {todos.length === 0 && <div> No Todos to Display</div>}
          
          {todos.map((item) => {

            return <div key={item.id} className="todo flex my-3 justify-between w-1/2 text-white ">

              <div className="flex">
                {/* there is checkbox and if todo is completed then linethrough will be implemented */}
                <input onChange={handleCheckBox} type="checkbox" name="" value={item.isCompleted} id={item.id} />

                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>

              <div className="button">
                {/* there are two button edit and delete */}
                <button onClick={handleEdit} className='bg-cyan-900 text-white  px-2 py-2 rounded-xl mx-1 font-bold text-sm'>Edit</button>

                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-cyan-900 text-white  px-2 py-2 rounded-xl mx-1 font-bold text-sm'>Delete</button>

              </div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
