import { UserRow } from "./UserRow.jsx";

export const UsersList = ({ users = [], handlerRemoveUser, handlerUserSelectedForm }) => {
    return (
        <table className="table table-hover table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Update</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(({id, username, email, password}) => (
                    <UserRow key={id} id={ id } username={ username } email={ email } password={password} handlerRemoveUser={ handlerRemoveUser } handlerUserSelectedForm = { handlerUserSelectedForm } />
                ))
            }
            </tbody>
        </table>
    )
}