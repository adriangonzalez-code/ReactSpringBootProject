import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes.jsx";
import { LoginPage } from "./auth/pages/LoginPage.jsx";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
    const { isAuth } = useSelector(state => state.auth);

    return (
        <>
            <Routes >
                {
                    isAuth ? (
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