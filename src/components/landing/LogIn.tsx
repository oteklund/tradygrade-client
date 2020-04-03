/*
This component allows the user to log in.
*/
import React, { useState } from 'react'
import { logIn } from "../../actions/userActions"
import { returnErrors, clearErrors } from "../../actions/errorActions"
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { StoreState, Error } from '../../models/types'

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        outline: 0,
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}))

interface Props {
    logInConnect: (name: string, password: string) => void
    returnErrorsConnect: (error: Error) => void
    clearErrorsConnect: () => void
    errorState: Error
}

const LogIn = ({ logInConnect, returnErrorsConnect, errorState }: Props) => {

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setErrorMessage("")
    }

    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!name || !password) setErrorMessage("Please fill out the required fields.")
        else {
            try {
                logInConnect(name, password)
            } catch (error) {
                returnErrorsConnect({...error, id: "LOGIN_FAIL"})
            }
        }
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    return (
        <>
            <button type="button" onClick={handleOpen}>Login</button>
            <Modal id="login-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="modal">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <h3>Login</h3>
                            <input type="text" placeholder="username" onChange={onNameChange} />
                            <input type="password" placeholder="password" onChange={onPasswordChange} />
                            <button type="submit">log in</button>
                            <p id="login-error-response">{errorMessage}</p>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    errorState: state.error
})

const mapDispatchToProps = {
    logInConnect: logIn,
    returnErrorsConnect: returnErrors,
    clearErrorsConnect: clearErrors
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LogIn)
