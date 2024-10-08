import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

// const initialStateTodos = [
//   { id:1, title:"Complete online Javascript udemy curse", completed: true  },
//   { id:2, title:"Jog around the park 3x", completed: false  },
//   { id:3, title:"10 minutes meditation", completed: false  },
//   { id:4, title:"Pick up groceries", completed: false  },
//   { id:5, title:"Complete Todo App on Frontend Mentor", completed: false  },
// ]

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const App = () => {

  const [todos, setTodos] = useState(initialStateTodos)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    }

    setTodos([...todos, newTodo])
   }

   const removeTodo = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id))
    }

    const updateTodo = (id) => {
      setTodos(todos.map(
        todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
     }

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const [filter, setFilter] = useState("all")

  const changeFilter = (filter) => setFilter(filter)

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  return(
    <div className="bg-[url('./assets/images/bg-mobile-light.jpg')] 
    bg-no-repeat bg-contain bg-gray-300 min-h-screen
    dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] 
    md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]
    md:bg-[url('./assets/images/bg-desktop-light.jpg')]">

      <Header />

      <main className="container mx-auto px-4 mt-8 md:max-w-xl">

      <TodoCreate createTodo={createTodo}/>

      <TodoList todos={filteredTodos()} removeTodo={removeTodo} updateTodo={updateTodo}/>

      <TodoComputed computedItemsLeft={computedItemsLeft} clearCompleted={clearCompleted}/>
       
      <TodoFilter changeFilter={changeFilter} filter={filter}/>
      </main>

      

      <footer className="mt-8 text-center dark:text-gray-400">Drag and drop to reorder list</footer>
    </div>
  ) 
}

export default App;
