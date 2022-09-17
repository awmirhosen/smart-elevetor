import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from 'yup';
import style from '../login/login.module.scss';


const Login = ({ SubmitLogin }) => {

    const [viewPassword, setViewPassword] = useState('password');

    const ChangeViewPassword = () => {

        if (viewPassword == 'password') {
            setViewPassword('text');
        } else {
            setViewPassword('password');
        }
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('نام کاربری الزامی میباشد'),
        password: Yup.string().required('پسوورد الزامی میباشد')
    });

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            userName: '',
            password: ''
        },
        onSubmit: values => {

            SubmitLogin(values);

        },
        validationSchema: validationSchema

    });

    return (
        <div>

            <div className={`${style.logoBox} d-flex justify-content-center`}>
                <span className={`${style.logo}`}>

                </span>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className={`${style.user} mt-4`}>
                    <div className={style.title}>
                        <span>
                            Username
                        </span>
                    </div>
                    <div className={style.userForm}>
                        <span className={style.userIcon}>

                        </span>
                        <input
                            name={'userName'}
                            onChange={formik.handleChange}
                            type={'text'}
                        // onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className={style.error}>
                        {formik.errors.userName ? formik.errors.userName : null}
                    </div>
                </div>
                <div>
                    <div className={`${style.user} mt-4`}>
                        <div className={style.title}>
                            <span>
                                Password
                            </span>
                        </div>
                        <div className={style.userForm}>
                            <span className={style.passwordIcon}>

                            </span>
                            <input
                                name={'password'}
                                type={viewPassword}
                                onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            />
                            <span
                                className={style.eyeIcon}
                                onClick={ChangeViewPassword}>

                            </span>
                        </div>
                        <div className={style.error}>
                            {
                                formik.errors.password
                                    ? formik.errors.password
                                    : null}
                        </div>
                    </div>
                    <div className={`${style.forget} 
                    d-flex justify-content-between mt-4`}>
                        <div>
                            Forget Password
                        </div>
                        <div className={'d-flex align-item-center'}>
                            <div className={'me-1 mt-1'}>
                                <input
                                    type={'checkbox'}
                                    className={`${style.checkBox}`}
                                    name={'remember'}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <span>
                                    Remember Me
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`d-flex justify-content-center mt-2`}>
                    <button
                        type={'submit'}
                        className={`${style.loginbottom} mt-2`}
                    >
                        LOGIN
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Login;