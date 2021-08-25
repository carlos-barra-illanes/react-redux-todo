import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Checkbox from "@material-ui/core/Checkbox";
import  { useEffect, useState } from "react";
import { getTodosAsync } from '../redux/todoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { addTodoAsync } from '../redux/todoSlice';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ id, descripcion, fecha, vigente }) {
  const [checked, setChecked] = React.useState(vigente);
  const [descripcionSt, setDescripcionSt] = useState(descripcion);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
      dispatch(getTodosAsync());

  }, [dispatch]);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date(fecha));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = (event) => {
    event.preventDefault(); 
        dispatch(
            addTodoAsync({
                id:id,
                descripcion: descripcionSt,
                fecha:selectedDate,
                vigente:checked
            })
        );
    
        setOpen(false);
    
};

const onChangeInput = (event) => {

    setDescripcionSt(event.target.value);

}


  const body = (
    <form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">Id : {id}</h3>
      <h3 id="simple-modal-title">
        Titulo : <input type="text" name="descripcion" value={descripcionSt} onChange={onChangeInput} />
      </h3>
      <h3 id="simple-modal-title">
        Vigente :
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </h3>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Fechas de Creacion"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <button className="btn btn-danger" type='submit' >
        Guardar
      </button>
    </div>
    </form>
  );

  return (
    <>
      <button className="btn btn-danger" type="button" onClick={handleOpen}>
        Editar
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
