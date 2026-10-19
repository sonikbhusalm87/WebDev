import {useRef, useState, useEffect} from 'react'
import Navbar from "./components/navbar.jsx"
import "./App.css"



export default function App() {

  const[Todo, setTodo] = useState("")
  const[Todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("Todos")

    if(savedTodos)
    {
      return JSON.parse(savedTodos);
    }

    else{
      return [];
    }
  });
  const[editId, seteditId] = useState(null)
  const inputref = useRef(null)

  function handleSave()
  {
    if(Todo === "")
    {
      return;
    }

    if(editId != null)
    {
      setTodos(currentTodos =>
        currentTodos.map(todo =>
        {
          if(todo.id === editId)
          {
            return {...todo, title : Todo};
          }

          else{
            return todo;
          }
        })
      )
      seteditId(null);
    }
    else{
      const newTodo = {
        id : crypto.randomUUID(),
        title : Todo,
        isCompleted : false
      };

    setTodos(prevTodos => [...prevTodos, newTodo])
    }

    setTodo("");
  }

  const handleDelete = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id ))
  };

  const handleEdit = (id) => {
    const todo_to_edit = Todos.find(todo => todo.id === id)
    setTodo(todo_to_edit.title)
    seteditId(id);
    inputref.current.focus()
  }

  const checkComplete = (id, value) => {
    setTodos(currentTodos => 
      currentTodos.map(todo => {
        if(id === todo.id)
        {
          return{...todo, isCompleted : value}
        }

        else{
          return todo;
        }
      })
    )
  }

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos))
  }, [Todos]);

  const remainingTasks = Todos.filter(todo => !(todo.isCompleted)).length

  return (
    <>
      <Navbar/>

      <main>

        <div className = "bg-[#132B40] h-[85vh] w-4/5 xl:w-2/5 mx-auto my-6 rounded-xl py-4 px-2">
          <p className = "text-2xl font-bold w-full text-white text-center"> iTask - Manage your Todos at one place </p>

          <p className = "text-lg font-bold text-white my-4 mx-2"> Add a TODO</p>

          <div className = "flex gap-4">
            <input ref = {inputref} type = "text" name = "todo-input" className = "w-9/12 rounded-xl h-7 text-[#132B40] pl-2 font-bold" value = {Todo} onChange = {e => setTodo(e.target.value)}></input>

            <button className = "bg-[#2DD4BF] rounded-full px-3 py-2 font-bold text-xs text-[#132B40] hover:bg-[#5EEAD4] hover:-translate-y-1 transition-all duration-200 active:scale-95" onClick = {()=> handleSave()}> {editId !== null ? "Update" : "Save"} </button>
          </div>

          <p className = "text-white text-lg font-bold mt-8 mx-2 mb-4"> Your TODOs</p>

          <div className = "mx-2 mb-4 text-[#2DD4BF] text-xs"> {remainingTasks} {remainingTasks === 1 ? "task" : "tasks"} remaining</div>

          <div className = "flex flex-col gap-4">
              {Todos.map((todo) =>{
                return (<div className = "flex justify-start gap-2 h-12 mx-2 bg-[#1D3B52] rounded-xl p-2" key = {todo.id}>
                          <input type = "checkbox"
                            checked = {todo.isCompleted}
                            onChange = {e => checkComplete(todo.id, e.target.checked)}/>
                          <div className = "flex w-full justify-between items-center">

                            <p className = {todo.isCompleted ? "line-through text-white text-sm" : "text-white text-sm" }  > {todo.title}</p>
                            <div className = "flex justify-start gap-2">
                          
                              <button onClick = {() => handleEdit(todo.id)}> 
                                <svg className = "text-[#132B40] bg-[#2DD4BF] p-2 rounded-lg w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                              </button>

                              <button onClick = {() => handleDelete(todo.id)}> 
                                <svg className = "text-[#132B40] bg-[#2DD4BF] p-2 rounded-lg w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                              </button>

                            </div>
                          </div>
                        </div>
                        );
              })}
          </div>

        </div>
      </main>
    </>
  )
}