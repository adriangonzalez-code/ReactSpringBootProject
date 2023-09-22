import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, updateUser, loadingUsers, onUserSelectedForm, onOpenForm, onCloseForm, initialUserForm, loadingError } from "../store/slices/users/usersSlice.js";
import { useAuth } from "../auth/hooks/useAuth.js";

export const useUsers = () => {

    const { users, userSelected, visibleForm, errors, isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const { login, handlerLogout } = useAuth();

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
                dispatch(addUser(response.data));
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
                dispatch(loadingError(err.response.data));
            } else if (err.response && err.response.status === 500 && err.response.data?.message?.includes('constraint')) {
                if (err.response.data?.message?.includes('UK_username')) {
                    dispatch(loadingError({username: 'El username ya existe'}));
                }

                if (err.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({email: 'El email ya existe'}));
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
        dispatch(loadingError({}));
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    };
};