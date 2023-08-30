import { NavLink } from "react-router-dom";

export const UserRow = ({ id, username, email, handlerRemoveUser, handlerUserSelectedForm }) => {

    return (
        <>
            <tr>
                <td>{ id }</td>
                <td>{ username }</td>
                <td>{ email }</td>
                <td>
                    <NavLink className="btn btn-secondary btn-sm" to={'/users/edit/' + id}>update Route</NavLink>
                </td>
                <td>
                    <button className="btn btn-secondary btn-sm" type="button" onClick={() => handlerUserSelectedForm({ id, username, email })}>Update</button>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" type="button" onClick={ () => handlerRemoveUser(id) }>Remove</button>
                </td>
            </tr>
        </>
    )
}