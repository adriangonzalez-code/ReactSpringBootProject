import Swal from "sweetalert2";
import { loginUser } from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice.js";

export const useAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAdmin, isAuth } = useSelector(state => state.auth);

    const handlerLogin = async ({username, password}) => {
        try {
            const response = await loginUser({username, password});
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);
            const user = { username: claims.username }

            dispatch(onLogin({user, isAdmin: claims.isAdmin}));
            sessionStorage.setItem('login', JSON.stringify({isAuth: true, user, isAdmin: claims.isAdmin}));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate("/users");
        } catch (error) {
            if (error.response?.status === 401) {
                Swal.fire('Error Login', 'Username o Password inválidos', 'error');
            } else if (error.response?.status === 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permiso', 'error');
            } else {
                throw error;
            }
        }
    }

    const handlerLogout = () => {
        dispatch(onLogout());

        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    }

    return {
        login: {
            user,
            isAdmin,
            isAuth
        },
        handlerLogin,
        handlerLogout
    }
}