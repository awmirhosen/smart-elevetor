import LayoutLogin from "../components/layoutLogin/LayoutLogin";

import Login from "../components/login/Login";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../src/redux/user/userActions";

import { useRouter } from 'next/router';
import { useEffect } from "react";

const Index = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.userReducer.user);

    const router = useRouter()

    const type = useSelector(state => state);
    console.log(type);

    const SubmitLogin = (values) => {
        dispatch(login(values))
    }

    useEffect(() => {
      
        console.log(state.token)

        if(localStorage.getItem('token')!=null){
            router.push(`/sidex/${localStorage.getItem('project_id')}`)
        }


    }, [state])

    return (
        <>
            <LayoutLogin>
                <Login SubmitLogin={SubmitLogin} />
            </LayoutLogin>
        </>
    )
}

export default Index;