import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {selectFilteredTodos, getTodoAsync, toggleTodoAsync, removeTodoAsync } from '../Redux/todos/todosSlice';
import Loading from './Loading';
import Error from './Error';



function TodoList() {
	const dispatch = useDispatch();
    
    const filteredTodos = useSelector(selectFilteredTodos)
    // const items = useSelector((state) => state.todos.items)
    // items kullanılacak birden fazla component varsa items i Slice içinde seçip
    // component içerisinde use selector ile çağırmak daha iyi.
    // const items = useSelector(selectTodos);
    // console.log(items)
    const isLoading = useSelector(state => state.todos.isLoading)
    const error = useSelector(state => state.todos.error)

    useEffect(() => {
        dispatch(getTodoAsync())
    },[dispatch])

	const handleDestroy = async (id) => {
		if(window.confirm('Are u sure?')){
			await dispatch(removeTodoAsync(id))
		}
	}

    const handleToggle = async (id, completed) => {
        await  dispatch(toggleTodoAsync({id, data : {completed}}))
    }

   if(isLoading){
    return <Loading/>
   }
   if(error){
    return <Error message={error}/>
   }


  return (

    <ul className="todo-list">

            {filteredTodos.map((item) => (
                <li key={item.id} className = {item.completed ? 'completed' : ''}>
                    <div className='view'>
                        <input 
						className='toggle' 
						type='checkbox' 
						onChange={() => handleToggle(item.id, !item.completed)}
						checked = {item.completed}
						/>
                        <label>{item.title}</label>
                        <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
                    </div>
                </li>
            ))}

            
			
		</ul>

  )
}

export default TodoList