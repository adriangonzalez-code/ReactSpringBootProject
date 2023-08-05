import { UserForm } from "./components/UserForm.jsx";
import { UsersList } from "./components/UsersList.jsx";
import { useReducer, useState } from "react";
import { usersReducer } from "./reducers/usersReducer.js";

const initialUsers = [
    {
        id: 1,
        username: 'John',
        password: 'password',
        email: 'john@mail.com'
    }
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
};


export const UserApp = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);

    const handlerAddUser = (user) => {
        let type;

        if (user.id === 0) {
            type = 'addUser';
        } else {
            type = 'updateUser';
        }

        dispatch({
            type,
            payload: user
        });
    };

    const handlerRemoveUser = (id) => {
        // console.log(id);
        dispatch({
            type: 'removeUser',
            payload: id
        });
    };

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setUserSelected({...user});
    }

    return (
        <div className="container my-4">
            <h2>Users App</h2>
            <div className="row">
                <div className="col">
                    <UserForm handlerAddUser= { handlerAddUser } initialUserForm={ initialUserForm } userSelected = { userSelected } />
                </div>
                <div className="col">
                    { users?.length == 0 ? <div className='alert alert-warn'>No hay usuarios en el sistema</div> : (<UsersList users={ users } handlerRemoveUser={ handlerRemoveUser }  handlerUserSelectedForm = { handlerUserSelectedForm } />)}
                </div>
            </div>
        </div>
    )
}