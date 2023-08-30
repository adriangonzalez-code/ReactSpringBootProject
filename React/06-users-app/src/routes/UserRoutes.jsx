import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage.jsx";
import { NavBar } from "../components/layout/NavBar.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { useUsers } from "../hooks/useUsers.js";

export const UserRoutes = ({ login, handlerLogout }) => {

    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm
    } = useUsers();

    return(
        <>
            <NavBar handlerLogout={ handlerLogout } login={ login } />
            <Routes>
                <Route path="users" element={<UsersPage handlerAddUser={ handlerAddUser } userSelected={ userSelected } handlerCloseForm={ handlerCloseForm } users={ users } handlerRemoveUser={ handlerRemoveUser } initialUserForm={ initialUserForm } handlerOpenForm={ handlerOpenForm } handlerUserSelectedForm={ handlerUserSelectedForm } visibleForm={ visibleForm } />} />
                <Route path="users/register" element={<RegisterPage initialUserForm={ initialUserForm } handlerAddUser={ handlerAddUser } />} />
                <Route path="users/edit/:id" element={<RegisterPage initialUserForm={ initialUserForm } handlerAddUser={ handlerAddUser } users={ users } />} />
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </>
    );
}