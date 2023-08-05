import { useEffect, useState } from "react";

export const UserForm = ({ handlerAddUser, initialUserForm, userSelected }) => {

    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, password, email } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            // password: ''
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

        if (!username || !password || !email) {
            alert('Debe completar los campos del formulario!');
            return;
        }

        // Guadar el user form en el listado de usuarios
        handlerAddUser(userForm);
        setUserForm(initialUserForm);
    }

    return (
        <form onSubmit={ onSubmit }>
            <input value={username} onChange={ onInputChange } type="text" className="form-control my-3 w-75" placeholder="Username" name="username"/>
            <input value={password} onChange={ onInputChange } type="password" className="form-control my-3 w-75" placeholder="Password" name="password"/>
            <input value={email} onChange={ onInputChange } type="email" className="form-control my-3 w-75" placeholder="Email" name="email"/>
            <input type="hidden" value={id} name="id" />
            <button className="btn btn-primary" type="submit">{id > 0 ? 'Update' : 'Create'}</button>
        </form>
    )
}