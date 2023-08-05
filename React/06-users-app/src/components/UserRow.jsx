export const UserRow = ({ id, username, email , password, handlerRemoveUser, handlerUserSelectedForm }) => {

    return (
        <>
            <tr>
                <td>{ id }</td>
                <td>{ username }</td>
                <td>{ email }</td>
                <td>
                    <button className="btn btn-secondary btn-sm" type="button" onClick={() => handlerUserSelectedForm({ id, username, email, password })}>Update</button>
                </td>
                <td>
                    <button className="btn btn-danger btn-sm" type="button" onClick={ () => handlerRemoveUser(id) }>Remove</button>
                </td>
            </tr>
        </>
    )
}