import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserForm = ({ handlerAddUser, initialUserForm, userSelected, handlerCloseForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            password: ''
        });
    }, [userSelected]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!username || (!password && id === 0) || !email) {
            Swal.fire(
                'Error de validación',
                'Debe completar los campos del formulario',
                'error'
            )
            return;
        }

        // Guadar el user form en el listado de usuarios
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <form onSubmit={ onSubmit }>
            <input value={username} onChange={ onInputChange } type="text" className="form-control my-3 w-75" placeholder="Username" name="username"/>
            {id > 0 || <input value={password} onChange={ onInputChange } type="password" className="form-control my-3 w-75" placeholder="Password" name="password"/>}
            <input value={email} onChange={ onInputChange } type="email" className="form-control my-3 w-75" placeholder="Email" name="email"/>
            <input type="hidden" value={id} name="id" />
            <button className="btn btn-primary" type="submit">{id > 0 ? 'Update' : 'Create'}</button>
            <button className="btn btn-primary mx-2" type="button" onClick={() => onCloseForm() }>Cerrar</button>
        </form>
    )
}