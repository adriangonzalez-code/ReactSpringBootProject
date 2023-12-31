import { useEffect, useState } from "react";
import {useUsers} from "../hooks/useUsers.js";

export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { handlerAddUser, initialUserForm, errors } = useUsers();
    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email, admin } = userForm;
    const [checked, setChecked] = useState(userForm.admin);

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

        // Guadar el user form en el listado de usuarios
        handlerAddUser(userForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
                ...userForm,
                admin: checked
            }
        )
    }

    return (
        <form onSubmit={ onSubmit }>
            <input value={username} onChange={ onInputChange } type="text" className="form-control my-3 w-75" placeholder="Username" name="username"/>
            <p className="text-danger">{errors?.username}</p>

            {id > 0 || (<input value={password} onChange={ onInputChange } type="password" className="form-control my-3 w-75" placeholder="Password" name="password"/>)}
            <p className="text-danger">{errors?.password}</p>

            <input value={email} onChange={ onInputChange } type="text" className="form-control my-3 w-75" placeholder="Email" name="email"/>
            <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox" className="form-check-input" name="admin" checked={admin} onChange={onCheckboxChange}/>
                <label className="form-check-label">Admin</label>
            </div>

            <input type="hidden" value={id} name="id" />
            <button className="btn btn-primary" type="submit">{id > 0 ? 'Update' : 'Create'}</button>
            { !handlerCloseForm || (
                <button className="btn btn-primary mx-2" type="button" onClick={() => onCloseForm() }>Cerrar</button>
            ) }
        </form>
    )
}