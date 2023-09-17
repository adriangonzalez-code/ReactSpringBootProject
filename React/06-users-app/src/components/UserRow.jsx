import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { AuthContext } from "../auth/context/AuthContext.jsx";

export const UserRow = ({ id, username, email, admin }) => {

    const { handlerRemoveUser, handlerUserSelectedForm } = useContext(UserContext);
    const { login } = useContext(AuthContext);

    return (
        <>
            <tr>
                <td>{ id }</td>
                <td>{ username }</td>
                <td>{ email }</td>
                {!login.isAdmin ||
                    <>
                        <td>
                            <NavLink className="btn btn-secondary btn-sm" to={'/users/edit/' + id}>update Route</NavLink>
                        </td>
                        <td>
                            <button className="btn btn-secondary btn-sm" type="button" onClick={() => handlerUserSelectedForm({ id, username, email, admin })}>Update</button>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-sm" type="button" onClick={ () => handlerRemoveUser(id) }>Remove</button>
                        </td>
                    </>
                }
            </tr>
        </>
    )
}