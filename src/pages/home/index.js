import React from 'react'
import { signInWithGoogle } from '../../services/firebase'

const Home = () => {
  return (
    <div className="w-2/6 rounded mx-auto bg-slate-100 h-[50vh] justify-center items-center flex flex-col mt-12">
            <h2 className="text-2xl mb-4">Welcome to Chat room  </h2>
        <button onClick={signInWithGoogle} className="p-2 bg-amber-500 text-white font-bold rounded">
            Sign in With Google
        </button>
    </div>
  )
}

export default Home;