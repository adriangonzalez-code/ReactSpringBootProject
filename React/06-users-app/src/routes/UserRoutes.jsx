import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage.jsx";
import { NavBar } from "../components/layout/NavBar.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { UserProvider } from "../context/UserProvider.jsx";

export const UserRoutes = () => {
    return(
        <>
            <UserProvider>
                <NavBar />
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage  />} />
                    <Route path="/" element={<Navigate to="/users" />} />
                </Routes>
            </UserProvider>
        </>
    );
}