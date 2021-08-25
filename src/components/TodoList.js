import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
		console.log(todos);
	}, [dispatch]);

	return (
		<ul className='list-group'>

			{todos.map((todo) => (
				<>
				<TodoItem key={todo.id} id={todo.id} title={todo.descripcion} completed={todo.vigente} fecha={todo.fecha} />
				</>
			))}
		</ul>
	);
};

export default TodoList;
