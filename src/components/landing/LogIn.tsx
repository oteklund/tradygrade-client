/*
This component allows the user to log in.
*/
import React, { useState } from 'react'
import { logIn } from "../../actions"
import { connect } from 'react-redux'

interface Props {
    logInConnect: (name: string, password:string) => void
}

const LogIn = ({ logInConnect }: Props) => {

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log(name, password)
        logInConnect(name, password)
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
