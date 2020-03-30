/*
This component allows the user to log in.
*/
import React, { useState } from 'react'
import { logIn } from "../../actions/userActions"
import { connect } from 'react-redux'
import history from '../../history'

interface Props {
    logInConnect: (name: string, password: string) => void
}

const LogIn = ({ logInConnect }: Props) => {

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!name || !password) console.log("Please fill out the required fields.")
        else {
            try {
                logInConnect(name, password)
                history.push("/home")
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
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" onChange={onNameChange} />
                <input type="password" placeholder="password" onChange={onPasswordChange} />
                <button type="submit">log in</button>
            </form>
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
