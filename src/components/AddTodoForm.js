import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/todoSlice";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import SimpleAlerts from './SimpleAlerts'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onSubmit = (event) => {
    event.preventDefault();
    const dateCreate = new Date();
    if (value) {
      dispatch(
        addTodoAsync({
          descripcion: value,
          fecha: dateCreate,
          vigente: true,
        })
      );
	  setError(false);
    } else {
		setError(true);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
	   {error &&
          <SimpleAlerts msje="Se ha producido un error , por favor ingrese una descripcion para la tarea" />
	   }	
      <label className="sr-only">Descripcion</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Descripcion de la tarea"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>

      <button type="submit" className="btn btn-primary mb-2">
        Guardar
      </button>
    </form>
  );
};

export default AddTodoForm;
