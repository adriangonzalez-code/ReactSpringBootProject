export const LoginPage = () => {
    return (
        <>
            <div className="modal" tabIndex="-1" style={ {display: "block"} }>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                        </div>
                        <form action="">
                            <div className="modal-body">
                                <input type="text" className="form-control my-3" placeholder="Username" name="username"/>
                                <input type="password" className="form-control my-3" placeholder="Password" name="password"/>
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