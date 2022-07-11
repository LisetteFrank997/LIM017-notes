import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    updateProfile,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
 } from "firebase/auth";
import { auth } from "../Firebase/Confi.js";

export const authContext = createContext()

export const useAuth= () =>{
    const context= useContext(authContext);
    return context;
}

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUp= (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth, currentUser => {
        setUser(currentUser);
        });
    }
    const logIn= (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

    const logOut= () =>signOut(auth)

    const loginWithGoogle= () =>{
    const googleProvider= new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
       onAuthStateChanged(auth, currenUser => {
            setUser(currenUser);
            setLoading(false);
            })
    }, [] )
    
    return(
        <authContext.Provider value={{ signUp, logIn, user, logOut, loading, loginWithGoogle }}>
            {children}
        </authContext.Provider>
    )
}