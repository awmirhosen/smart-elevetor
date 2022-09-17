
import React from 'react';

import style from '../projectInfo/projectInfo.module.scss';


const ProjectInfo = () => {

    return (
        <div>
            <div className={`${style.title} d-flex justify-content-center mt-4`}>
                <span>
                    Project Info
                </span>
            </div>
            <div className={`${style.box} mt-4`}>
                <div className={'d-flex align-items-center'}>
                    <div className={'col-8 mt-3'}>
                        Network :
                    </div>
                    <div className={'col-4'}>
                        <div>
                            <div className={'d-flex justify-content-center'}>
                                3G
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <span>
                                    MCI
                                </span>
                                <span className={'mr-2 ml-2'}>
                                    icon
                                </span>
                                <span>
                                    icon
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div className={'col-8'}>
                        Connection Status :
                    </div>
                    <div className={'col-4'}>
                        Online
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div className={'col-8'}>
                        Project Code :
                    </div>
                    <div className={'col-4'}>
                        24
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div className={'col-8'}>
                        Elevator Number :
                    </div>
                    <div className={'col-4'}>
                        2
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div className={'col-8'}>
                        Hall Number :
                    </div>
                    <div className={'col-4'}>
                        9
                    </div>
                </div>
            </div>
        </div>
    )

}



export default ProjectInfo;