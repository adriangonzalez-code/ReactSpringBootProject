import { UserForm } from "../components/UserForm.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export const RegisterPage = () => {

    const { initialUserForm, users=[] } = useContext(UserContext);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id]);

    return (
        <div className="container my-4">
            <h4>{userSelected.id > 0 ? 'Editar' : 'Registar'} Usuarios</h4>
            <div className="row">
                <div className="col">
                    <UserForm userSelected={ userSelected } />
                </div>
            </div>
        </div>
    )
}