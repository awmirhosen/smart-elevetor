import React from "react";

import style from '../projectName/projectName.module.scss';

const ProjectName = () => {

    return (
        <div>
            {/* <div className={style.frame}>
            </div> */}
            <div>
                <div className={`${style.title} mt-4 d-flex justify-content-center mb-4 mt-2`}>
                    Project Analysis
                </div>
                <div className={style.div}>
                    <div className={[
                        style.button,
                        style.active
                        , style.buttonFlex
                    ].join(' ')}>
                        ELEVATOR
                    </div>

                    <div className={[
                        style.button,
                        style.buttonFlex
                    ].join(' ')}>
                        PASSENGER
                    </div>
                </div>
                <div className={style.div}>
                    <div className={[
                        style.button,
                        style.active
                        , style.buttonFlex
                    ].join(' ')}>
                        TODAY
                    </div>
                    <div className={[
                        style.button,
                        style.active
                        , style.buttonFlex
                    ].join(' ')}>
                        YESTERDAY
                    </div>
                    <div className={[
                        style.button,
                        style.active
                        , style.buttonFlex
                    ].join(' ')}>
                        1 WEEK AGO
                    </div>
                    <div className={[
                        style.button,
                        style.active
                        , style.buttonFlex
                    ].join(' ')}>
                        1 Mounth
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProjectName;