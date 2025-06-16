import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)
  //  it will save all the todos to localstorage
  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!ShowFinished)

  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()

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
    saveToLocalStorage()
  };



  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 rounded-xl  bg-cyan-700 min-h-[70vh] md:w-[40%]">
        <h1 className='font-bold text-white text-center text-2xl'>STask - Manage your todos at one place</h1>
        <div className="addTodo my-5">

          <h1 className='text-xl  font-bold p-2'>Add a Todo</h1>

          <div className="flex ">

            <input onChange={handleChange} value={todo} className="bg-white rounded-lg mx-1 px-3 py-1 w-[80%] border-1  text-black" type="text" />

            <button onClick={handleAdd} disabled={todo.length < 1} className='bg-cyan-900 text-white mx-2 px-3 py-2 rounded-xl  my-1 disabled:bg-cyan-950 font-bold text-sm cursor-pointer'>Save</button>

          </div>

        </div>
        <input type="checkbox" className="mx-4 my-3" onChange={toggleFinished} checked={ShowFinished} /> Show Finished
        <div className='bg-cyan-950 opacity-30 h-[1px] w-[90%] mx-auto'></div>
        <h2 className='text-xl mx-3 my-1 font-bold p-2'>Your Todos</h2>

        <div className="todos  mx-4">

          {todos.length === 0 && <div className='mx-2'> No Todos to Display</div>}

          {todos.map((item) => {

            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-2 justify-between  bg-cyan-800 rounded-xl p-3  font-bold text-white ">

              <div className="flex gap-3 content-center">
                {/* there is checkbox and if todo is completed then linethrough will be implemented */}
                <input onChange={handleCheckBox} type="checkbox" name="" value={item.isCompleted} id={item.id} />

                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>

              <div className="button flex h-full">
                {/* there are two button edit and delete */}
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-cyan-950 text-white  px-2 py-2 rounded-lg mx-1 font-bold  cursor-pointer'><FaEdit /></button>

                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-cyan-950 text-white  px-2 py-2 rounded-lg mx-1 font-bold  cursor-pointer'><MdDelete /></button>

              </div>
            </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
