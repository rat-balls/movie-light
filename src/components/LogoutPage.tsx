import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { app } from '..';
import { useNavigate } from 'react-router-dom';

export default function LogoutPage() {
    const auth = getAuth(app);
    const navigate = useNavigate();

    useEffect(() => {
        signOut(auth);
        navigate('/')
        console.log(auth.currentUser)
    }, [auth, navigate])

    return (
        <div className="user-page">
            <h1 className="user-name">Logging out from {auth.currentUser?.displayName}</h1>
        </div>
    )
}
