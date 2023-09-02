import { UserContext } from "./UserContext.jsx";
import { useUsers } from "../hooks/useUsers.js";

export const UserProvider = ({ children }) => {
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

    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm
            }
        }>
            { children }
        </UserContext.Provider>
    )
}