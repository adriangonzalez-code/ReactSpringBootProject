import { UserForm } from "./UserForm.jsx";

export const UserModalForm = ({ handlerAddUser, initialUserForm, userSelected, handlerCloseForm }) => {
    return (
        <>
            <div className="abrir-modal animacion fadeIn">
                <div className="modal" tabIndex="-1" style={ {display: "block"} }>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">{ userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <UserForm handlerAddUser= { handlerAddUser } initialUserForm={ initialUserForm } userSelected = { userSelected } handlerCloseForm={ handlerCloseForm } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}