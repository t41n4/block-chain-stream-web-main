"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import clsx from "clsx"
import { useSearchParams } from "next/navigation"
import Login from "../login"
import SignUp from "../sign-up"
import "./index.scss"

const AuthenticationPageTempalate = () => {
    return (
        <main className='container h-[100vh] center-item'>
            <video src="https://firebasestorage.googleapis.com/v0/b/streamweb-9675d.appspot.com/o/gradient%2Fshadergradient7.webm?alt=media&token=0f4b8567-4976-450b-b64e-697d8873d192" autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover z-[-1]' />
            <Tabs defaultValue='login' className='w-[80vw] shadow-2xl medium:w-[400px] bg-secondary scale-[85%] rounded-3xl transition-all' aria-label="Login/Register your account">
                <TabsList className='flex justify-between items-center w-full text-white'>
                    <TabsTrigger className={clsx("w-full", "rounded-tl-3xl tab-trigger")} value='login'>Login</TabsTrigger>
                    <TabsTrigger className={clsx("w-full", "rounded-tr-3xl tab-trigger")} value='signup'>Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value='login' className='login__tab'>
                    <Login />
                </TabsContent>

                <TabsContent value='signup' className='signup__tab '>
                    <SignUp />
                </TabsContent>
            </Tabs>

        </main >

    )
};


export default AuthenticationPageTempalate