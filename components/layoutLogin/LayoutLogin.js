import React from "react";

import style from '../layoutLogin/LayoutLogin.module.scss';

const LayoutLogin = ({ children }) => {
    return (
        <div className={style.bg1}>
            <div className={style.child}>
                {children}
            </div>
        </div>
    )
}

export default LayoutLogin;