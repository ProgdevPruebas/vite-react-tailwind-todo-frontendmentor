import { useState } from "react";

const TodoCreate = ({createTodo}) => {

  const [title, setTitle] = useState('');

  const handleSubmitAddTodo = (e) => {
      e.preventDefault();

      if (!title.trim() ){
        return setTitle("") ; 
      }
      createTodo(title);
      setTitle("")
  }

    return (
        <form onSubmit={handleSubmitAddTodo} className="bg-white rounded-md overflow-hidden py-4 flex gap-4 items-center px-4 transition-all duration-500 dark:bg-gray-800">
          <span className="rounded-full border-2 h-5 w-5 inline-block transition-all duration-500 dark:bg-gray-800"></span>
          <input 
            type="text" 
            placeholder="Create a new todo..."
            className="w-full text-gray-400 outline-none transition-all duration-500 dark:bg-gray-800" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            
        </form>
    )
 }

 export default TodoCreate