import React from 'react';

import style from '../welcomeTo/welcomeTo.module.scss';

const WelcomeTo = () => {

    return (
        <div className={'mt-5 pe-4 ps-4'}>
            <div className={'d-flex justify-content-center'}>
                <span>
                    Welcome To
                </span>
            </div>
            <div className={'d-flex justify-content-center mt-2'}>
                <span>
                    Please Select Project
                </span>
            </div>
            <div className={'d-flex justify-content-center mt-2'}>
                <select className={`${style.selector} d-flex align-items-center`}>
                    <option>
                        Project 1
                    </option>
                    <option>
                        Project 2
                    </option>
                </select>
            </div>
        </div>
    )

}

export default WelcomeTo;