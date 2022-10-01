import React from 'react'
import { signInWithGoogle } from '../../services/firebase'

const Home = () => {
  return (
    <div className="w-4/6 mx-auto bg-slate-100 h-full">

        <button onClick={signInWithGoogle} className="p-2 bg-amber-500">
            Sign in
        </button>
    </div>
  )
}

export default Home;