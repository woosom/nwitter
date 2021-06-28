import React from 'react'
import { useState } from 'react'
import { authService } from 'fbase'

export const AuthForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState()

    const onChange = (event) => {
        const { target: { name, value } } = event
        switch (name) {
            case "email":
                setEmail(value)
                break;
            case "password":
                setPassword(value)
                break;
            default:
                break;
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (newAccount) {
            let data = await authService.createUserWithEmailAndPassword(email, password).then(function (data) {
                console.log('success')
            })
                .catch(function (error) {
                    console.log('failed')
                    console.log(error)
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    switch (errorCode) {
                        case 'auth/email-already-in-use':
                            alert(errorMessage);
                            break;
                        case 'auth/invalid-email':
                            alert(errorMessage);
                            break;
                        case 'auth/operation-not-allowed':
                            alert(errorMessage);
                            break;
                        case 'auth/weak-password':
                            alert(errorMessage);
                            break;
                        default:
                            break;
                    }
                })
            console.log(data)
        }
        else {
            authService.signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/invalid-email':
                        alert(errorMessage);
                        break;
                    case 'auth/user-disabled':
                        alert(errorMessage);
                        break;
                    case 'auth/user-not-found':
                        alert(errorMessage);
                        break;
                    case 'auth/wrong-password':
                        alert(errorMessage);
                        break;
                    default:
                        break;
                }
                console.log(error);
            })
        }
    }
    
    const toggleAccount = () => {
        setNewAccount((newAccount) => { return !newAccount })
    }


    return (
        <div>
            <form>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} onClick={onSubmit} />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Creat Account"}
            </span>
        </div>
    )
}

export default AuthForm
