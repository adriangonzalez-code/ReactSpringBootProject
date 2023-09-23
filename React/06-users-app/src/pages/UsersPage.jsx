 import { UserModalForm } from "../components/UserModalForm.jsx";
import { UsersList } from "../components/UsersList.jsx";
 import { useEffect } from "react";
 import { useUsers } from "../hooks/useUsers.js";
 import { useAuth } from "../auth/hooks/useAuth.js";

export const UsersPage = () => {

    const { users, visibleForm, handlerOpenForm, getUsers, isLoading } = useUsers();

    const { login } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            {!visibleForm || <UserModalForm />}
            <div className="container my-4">
                <h2>Users App</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || (<button className="btn btn-primary my-2" type="button" onClick={ handlerOpenForm }>Nuevo Usuario</button>)}
                        { users?.length === 0 ? <div className='alert alert-warning'>No hay usuarios en el sistema</div> : (<UsersList />)}
                    </div>
                </div>
            </div>
        </>
    )
}