import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import PassengerView from '../../components/passengerView/PassengerView'


const index = () => {

    // const router = useRouter();

    // useEffect(() => {

    //     router.push('/login')

    // }, [])

    return (
        <Layout>
            <PassengerView />
        </Layout>
    )
}

export default index;