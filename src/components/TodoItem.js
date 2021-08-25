import React from 'react';
import { useDispatch } from 'react-redux';
import {  deleteTodoAsync } from '../redux/todoSlice';
import moment from 'moment';
import 'moment/locale/es';
import SimpleModal from './Modal';

const TodoItem = ({key, id, title, completed ,fecha}) => {
	const dispatch = useDispatch();



	const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({ id }));
	};

	return (
		<li key={key} className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
	
					<div className="descripcion">Descripcion : </div> <div className="detalle">{title} </div> 
				      
					<div className="descripcion">Fecha de creacion : </div> <div className="detalle">{moment(fecha).format('LL')}</div>
				</span>
				<div className="boton-borrar">
				<button onClick={handleDeleteClick} className='btn btn-danger'>
					Borrar
				</button>
				<SimpleModal descripcion={title} fecha={fecha} id={id} vigente={completed} ></SimpleModal>
				</div>
				
				
			</div>
			
		</li>
	);
};

export default TodoItem;
