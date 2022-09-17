
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import LayoutLogin from "../components/layoutLogin/LayoutLogin";
import Login from "../components/login/Login";
import PassengerView from "../components/passengerView/PassengerView";
import ProjectInfo from "../components/projectInfo/ProjectInfo";
import ProjectName from "../components/projectName/ProjectName";
import Sidex from "../components/Sidex/Sidex";
import WelcomeTo from "../components/welcomeTo/WelcomeTo";

{/* <Layout> */ }
{/* <ProjectName/> */ }
{/* <PassengerView /> */ }
{/* <Sidex /> */ }
{/* <ProjectInfo /> */ }
{/* <Login /> */ }
{/* <WelcomeTo/> */ }
{/* </Layout> */ }

const Index = () => {

    const router=useRouter();

    useEffect(()=>{

        router.push('/login')
        
    },[])

    return (
        <>
        <LayoutLogin>
            <Login/>
        </LayoutLogin>
        </>
    )
}

export default Index;