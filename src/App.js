import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';


const App = () => {
	return (
		<div className='container bg-white p-4 mt-5'>
			<h1>Mi lista de tareas</h1>
			<AddTodoForm />
			<TodoList />
			
		</div>
	);
};

export default App;
