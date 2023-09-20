import { useContext } from "react";
import { AuthContext } from "./auth/context/AuthContext.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes.jsx";
import { LoginPage } from "./auth/pages/LoginPage.jsx";

export const AppRoutes = () => {
    const { login } = useContext(AuthContext);

    return (
        <>
            <Routes >
                {
                    login.isAuth ? (
                            <Route path={"/*"} element={ <UserRoutes /> } />
                        ) :
                        <>
                            <Route path="/login" element={ <LoginPage /> } />
                            <Route path="/*" element={<Navigate to="/login" />}/>
                        </>
                }
            </Routes>
        </>
    )
}