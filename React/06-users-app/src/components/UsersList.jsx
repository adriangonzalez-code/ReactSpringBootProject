import { UserRow } from "./UserRow.jsx";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

export const UsersList = () => {

    const { users = []} = useContext(UserContext);

    return (
        <table className="table table-hover table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Update Route</th>
                <th>Update</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(({id, username, email}) => (
                    <UserRow key={id} id={ id } username={ username } email={ email } />
                ))
            }
            </tbody>
        </table>
    )
}