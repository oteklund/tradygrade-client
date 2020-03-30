/*
This component allows a new visitor to create a user account.
*/
import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { StoreState, User, Error } from '../../models/types'
import { connect } from 'react-redux'
import { register } from "../../actions/userActions"

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
    user: User,
    error: Error,
    register: (data: Object) => void 
}

const Register = ({user, error, register}: any) => {

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const data = {
            name: name,
            password: password,
            email: email
        }
        if (password !== confirmPassword) alert("Passwords do not match")
        else register(data)
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }

    const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.target.value)
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }

    return (
        <>
            <button type="button" onClick={handleOpen}>Register</button>
            <Modal
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
                    <div className={classes.paper}>
                        <form onSubmit={handleRegister}>
                            <input type="text" placeholder="username" onChange={onNameChange} />
                            <input type="text" placeholder="email" onChange={onEmailChange} />
                            <input type="password" placeholder="password" onChange={onPasswordChange} />
                            <input type="password" placeholder="confirm password" onChange={onConfirmPasswordChange} />
                            <button type="submit">register</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

const mapDispatchToProps = {
    register
}

const mapStateToProps = (state: StoreState) => ({
    user: state.user,
    error: state.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
