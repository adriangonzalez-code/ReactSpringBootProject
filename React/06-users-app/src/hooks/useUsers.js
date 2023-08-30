import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
    {
        id: 1,
        username: 'John',
        password: 'password',
        email: 'john@mail.com'
    }
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
};

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) => {
        dispatch({
            type: (user.id === 0) ? 'addUser' : 'updateUser',
            payload: user
        });

        Swal.fire(
            (user.id === 0) ? 'Usuario Creado' : 'Usuario Actualizado',
            (user.id === 0) ? 'El usuario ha sido creado con éxito!' : 'El usuario ha sido actualizado con éxito!',
            'success'
        );

        handlerCloseForm();
        navigate("/users");
    };

    const handlerRemoveUser = (id) => {
        // console.log(id);

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta operación no podrá ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id
                });

                Swal.fire(
                    'Eliminado!',
                    'Usuario eliminado con éxito!',
                    'success'
                )
            }
        })
    };

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setVisibleForm(true);
        setUserSelected({...user});
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm
    };
};