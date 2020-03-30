/*
This component allows the user to log in.
*/
import React, { useState } from 'react'
import { logIn } from "../../actions/userActions"
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

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
}

const LogIn = ({ logInConnect }: Props) => {

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!name || !password) console.log("Please fill out the required fields.")
        else {
            try {
                logInConnect(name, password)
            } catch (error) {
                console.error(error.message)
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
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="username" onChange={onNameChange} />
                            <input type="password" placeholder="password" onChange={onPasswordChange} />
                            <button type="submit">log in</button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

const mapDispatchToProps = {
    logInConnect: logIn
}

export default connect(
    null,
    mapDispatchToProps,
)(LogIn)
