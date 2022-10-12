import React from 'react'
import { logout } from '../../services/firebase'

const Header = ({user}) => {
    return (
        <div className="w-full h-[10vh] bg-indigo-800 flex justify-center items-center shadow-lg ">
            <h2 className="text-white font-bold text-md md:text-xl">Chat Room - React</h2>
            {user ?
         <button onClick={logout} className="bg-rose-600 rounded p-2 text-sm md:text-l text-white font-bold absolute top-4 right-2 md:top-6 md:right-12 ">Signout</button>
        :null    
        }
        </div>
    )
}

export default Header