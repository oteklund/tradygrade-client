/*
This component allows a new visitor to create a user account.
*/
import React, { useState } from 'react'

interface Props {

}

const Register = (props: Props) => {

    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (password !== confirmPassword) alert("Passwords do not match")
        else {
            const body = {
                name: name,
                password: password,
                email: email
            }
            fetch("http://localhost:4000/api/users", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }
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
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="email" onChange={onEmailChange} />
                <input type="text" placeholder="username" onChange={onNameChange} />
                <input type="password" placeholder="password" onChange={onPasswordChange} />
                <input type="password" placeholder="confirm password" onChange={onConfirmPasswordChange} />
                <button type="submit">register</button>
            </form>
        </>
    )
}

export default Register
