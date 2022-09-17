
//analysis/:projectId

import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import ProjectName from '../../components/projectName/ProjectName';


const Index = () => {

    // const router = useRouter();

    // useEffect(() => {

    //     router.push('/login')

    // }, [])

    return (
        <>
            <Layout>
                <ProjectName />
            </Layout>
        </>
    )
}

export default Index;