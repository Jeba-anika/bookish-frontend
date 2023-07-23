import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.config'
 
export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logout = ()=>{
        setLoading(true);
        return signOut(auth)
    }

    const userDelete = ()=>{
        setLoading(true)
        return deleteUser(auth.currentUser)
    }

    const updateUser = (name, photo)=>{
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : photo
        })
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=> {
            return unsubscribe()
        }
    },[])


    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        updateUser,
        login,
        logout,
        googleLogin,
        userDelete
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;