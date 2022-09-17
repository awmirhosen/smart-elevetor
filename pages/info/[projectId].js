import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import ProjectInfo from '../../components/projectInfo/ProjectInfo'

// const router=useRouter();

// useEffect(()=>{

//     router.push('/login')
    
// },[])


const index=()=>{
    return(
        <Layout>
            <ProjectInfo/>
        </Layout>
    )
}
export default index;