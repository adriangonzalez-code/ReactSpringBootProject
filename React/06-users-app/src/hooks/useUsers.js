import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService.js";
import { AuthContext } from "../auth/context/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenForm, onCloseForm, initialUserForm } from "../store/slices/users/usersSlice.js";



export const useUsers = () => {

    const { users, userSelected, visibleForm, errors } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const { login, handlerLogout } = useContext(AuthContext);

    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const result = await findAll();
            dispatch(loadingUsers(result.data));
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
                dispatch(addUser(... response.data));
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

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
                    dispatch(removeUser(id));

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
        dispatch(onUserSelectedForm({...user}));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
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