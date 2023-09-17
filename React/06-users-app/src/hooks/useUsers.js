import { useContext, useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService.js";
import { AuthContext } from "../auth/context/AuthContext.jsx";

const initialUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false
};

const initialErrors = {
    username: '',
    password: '',
    email: ''
};

export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);
    const { login, handlerLogout } = useContext(AuthContext);

    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const result = await findAll();
            dispatch({
                type: 'loadingUsers',
                payload: result.data
            })
        } catch (err) {
            if (err.response?.status === 401) {
                handlerLogout();
            }
        }
    };

    const handlerAddUser = async (user) => {

        if (!login.isAdmin) return;

        let response;

        try {
            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await update(user);
            }

            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data
            });

            Swal.fire(
                (user.id === 0) ? 'Usuario Creado' : 'Usuario Actualizado',
                (user.id === 0) ? 'El usuario ha sido creado con éxito!' : 'El usuario ha sido actualizado con éxito!',
                'success'
            );

            handlerCloseForm();
            navigate("/users");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setErrors(err.response.data);
            } else if (err.response && err.response.status === 500 && err.response.data?.message?.includes('constraint')) {
                if (err.response.data?.message?.includes('UK_username')) {
                    setErrors({username: 'El username ya existe'});
                }

                if (err.response.data?.message?.includes('UK_email')) {
                    setErrors({email: 'El email ya existe'});
                }
            } else if (err.response?.status === 401) {
                handlerLogout();
            } else {
                throw err;
            }
        }
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
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch({
                        type: 'removeUser',
                        payload: id
                    });

                    Swal.fire(
                        'Eliminado!',
                        'Usuario eliminado con éxito!',
                        'success'
                    )
                } catch (err) {
                    if (err.response?.status === 401) {
                        handlerLogout();
                    }
                }
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
        setErrors({});
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    };
};