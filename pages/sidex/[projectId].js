
//sidex/:projectId

import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";
import Layout from "../../components/layout/Layout";
import Sidex from "../../components/Sidex/Sidex";
import { useSelector } from 'react-redux';


const Index = () => {

    const state = useSelector(state => state.sidexReducer)

    // console.log(state)

    const router = useRouter();

    useEffect(() => {

        if (!localStorage.getItem('token')) {
            router.push('/login')
        }

    }, [])

    return (
        <Layout>
            <Sidex />
        </Layout>
    )

}

export default Index;