import React ,{useRef,useEffect, useState} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { auth, db } from '../../services/firebase';
import ChatMessage from '../../components/chatMessage';
import { collection,deleteDoc,doc,addDoc,updateDoc,getDocs,getDoc, FieldValue,Timestamp, onSnapshot, orderBy, query } from '@firebase/firestore';


const ChatRoom=()=> {
    const dummy = useRef();
    const messagesRef = collection(db,'messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);
    // const query = messagesRef;
  
    // const [messages] = useCollectionData(query, { idField: 'id' });
    const [messages,setMessages] = useState([]);
  
    const [formValue, setFormValue] = useState('');
  

    useEffect(() => {
        onSnapshot(query(collection(db, "messages"), orderBy("createdAt")), (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
      }, []);
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
      await addDoc(messagesRef,{
        text: formValue,
        createdAt: Timestamp.fromDate(new Date()),
        uid,
        photoURL
      })
 
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<div className="w-full md:w-3/6  mx-auto">
      <main className="w-full overflow-y-scroll h-[80vh] bg-violet-800 flex flex-col px-2">
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <div className=" h-16 w-16 bg-amber-500 " ref={dummy}></div>
  
      </main>
  
      <form className="w-full bg-violet-800 " onSubmit={sendMessage}>
  
        <input value={formValue} className="w-5/6 py-2" onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" className="bg-amber-500 w-1/6 text-white font-bold py-2" disabled={!formValue}>Send</button>
  
      </form>
    </div>)
  }

  export default ChatRoom;