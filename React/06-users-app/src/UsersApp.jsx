import { LoginPage } from "./auth/pages/LoginPage.jsx";
import { useAuth } from "./auth/hooks/useAuth.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes.jsx";

export const UsersApp = () => {

    const { login, handlerLogin, handlerLogout } = useAuth();

    return (
        <>
            <Routes >
                {
                    login.isAuth ? (
                        <Route path={"/*"} element={ <UserRoutes login={ login } handlerLogout={ handlerLogout } /> } />
                        ) :
                        <>
                            <Route path="/login" element={ <LoginPage handlerLogin={ handlerLogin } /> } />
                            <Route path="/*" element={<Navigate to="/login" />}/>
                        </>
                }
            </Routes>
        </>
    )
}