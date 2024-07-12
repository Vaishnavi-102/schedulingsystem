'use client'

import { PROJECT_NAME } from "@/utils/globals"
import { Menubar } from "primereact/menubar"
import { useRouter } from 'next/navigation'
import {LogoutLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
const Header = () => {
  const { user } = useKindeBrowserClient();
    const router = useRouter()
    const items = [
        {
            label: 'Home',
            command: () => {
                router.push('/')
            },
            className: "vammo"
        },
        {
            label: 'Create Service',
            command: () => {
                router.push('/create')
            },
            className: "vammo"
        },
        {
            label: 'Services',
            command: () => {
                router.push('/services')
            },
            className: "vammo"
        },
        {
            label: 'My Bookings',
            command: () => {
                router.push('/bookings')
            },
        }
    ];


    return (
        <>
        <div className="p-4 text-center border-b font-bold">
            <h1>{PROJECT_NAME}</h1>
            
        </div>
        <Menubar model={items} end={user ? <LogoutLink className="text-red-500 mr-2">Logout</LogoutLink> : 
        <LoginLink className="text-blue-500 mr-2">Login</LoginLink>
    }/>
        </>
    )
}


export default Header