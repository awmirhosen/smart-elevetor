import React from 'react'
import classes from './logout.module.css'
import {useRouter} from "next/router";



const Logout = () => {

    const router = useRouter()

    const logoutHandler = () => {
        window.localStorage.clear()
        router.push(`/login`);
    }

    return (
        <>
            <div className={classes.logout}
                 onClick={logoutHandler}
            >
                Logout
            </div>
        </>
    )
}
export default Logout