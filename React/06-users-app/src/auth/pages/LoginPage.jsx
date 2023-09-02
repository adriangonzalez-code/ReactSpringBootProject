import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext.jsx";

const initialLoginForm = {
    username: '',
    password: ''
}
export const LoginPage = () => {

    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;
    const { handlerLogin } = useContext(AuthContext);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [name] : value
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            Swal.fire('Error de validación', 'Username y Password requeridos', 'error');
        }

        handlerLogin({username, password});

        setLoginForm(initialLoginForm);
    }

    return (
        <>
            <div className="modal" tabIndex="-1" style={ {display: "block"} }>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                        </div>
                        <form action="" onSubmit={ onSubmit }>
                            <div className="modal-body">
                                <input type="text" className="form-control my-3" placeholder="Username" name="username" value={ username } onChange={ onInputChange }/>
                                <input type="password" className="form-control my-3" placeholder="Password" name="password" value={ password } onChange={ onInputChange }/>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}