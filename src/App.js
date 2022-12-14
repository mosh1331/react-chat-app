import logo from './logo.svg'
import './App.css'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';
import { useEffect } from 'react';
import ChatRoom from './pages/chatRoom';
import Home from './pages/home';
import Header from './components/header';

function App() {

  const [user] = useAuthState(auth);

  return <div className=' bg-slate-100 h-screen'>
    <Header user={user} />
    <div className="h-[90vh] md:h-[90vh]">
      {user ?
        <ChatRoom /> : <Home />}

    </div>
  </div>
}

export default App
