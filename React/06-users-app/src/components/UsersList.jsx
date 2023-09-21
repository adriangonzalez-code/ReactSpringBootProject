import { UserRow } from "./UserRow.jsx";
import { useUsers } from "../hooks/useUsers.js";
import { useAuth } from "../auth/hooks/useAuth.js";

export const UsersList = () => {

    const { users = []} = useUsers();
    const { login } = useAuth();

    return (
        <table className="table table-hover table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                { !login.isAdmin ||
                    <>
                        <th>Update Route</th>
                        <th>Update</th>
                        <th>Remove</th>
                    </>
                }
            </tr>
            </thead>
            <tbody>
            {
                users.map(({ id, username, email, admin }) => (
                    <UserRow key={id} id={ id } username={ username } email={ email } admin={ admin } />
                ))
            }
            </tbody>
        </table>
    )
}