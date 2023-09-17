import { UserRow } from "./UserRow.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { AuthContext } from "../auth/context/AuthContext.jsx";

export const UsersList = () => {

    const { users = []} = useContext(UserContext);
    const { login } = useContext(AuthContext);

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