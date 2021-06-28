import AuthForm from 'components/AuthForm'
import { authService, firebaseInstance } from 'fbase'
import React from 'react'
import { useState } from 'react'

export const Auth = () => {
    
    const onClickWithSocial = async (event) => {
        const { target: { name } } = event

        let provider
        switch (name) {
            case "google":
                provider = new firebaseInstance.auth.GoogleAuthProvider()
                break;
            case "github":
                provider = new firebaseInstance.auth.GithubAuthProvider()
                break;
            default:
                break;
        }
        
        await authService.signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            
        });
}

    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onClickWithSocial}>Continue with Google</button>
                <button name="github" onClick={onClickWithSocial}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;