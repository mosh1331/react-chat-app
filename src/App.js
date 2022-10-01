import logo from './logo.svg'
import './App.css'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';
import { useEffect } from 'react';
import ChatRoom from './pages/chatRoom';
import Home from './pages/home';
import Header from './components/header';

function App () {

const [user] = useAuthState(auth);

  return <div className=' bg-indigo-500 h-screen'>
    <Header user={user}/>
    {user ? <ChatRoom />: <Home/>}
  </div>
}

export default App
