import React from 'react'
import { logout } from '../../services/firebase'

const Header = ({user}) => {
    return (
        <div className="w-full h-[10vh] bg-indigo-800 flex justify-center items-center ">
            <h2 className="text-white font-bold text-xl">Chat Room - React</h2>
            {user ?
         <button onClick={logout} className="bg-rose-600 rounded p-2 text-white font-bold absolute top-6 right-12 ">Signout</button>
        :null    
        }
        </div>
    )
}

export default Header