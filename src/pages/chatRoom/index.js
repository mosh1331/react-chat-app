import React, { useRef, useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { auth, db } from '../../services/firebase'
import ChatMessage from '../../components/chatMessage'
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  FieldValue,
  Timestamp,
  onSnapshot,
  orderBy,
  query
} from '@firebase/firestore'
import Loader from '../../components/loader'

const ChatRoom = () => {
  const dummy = useRef()
  const messagesRef = collection(db, 'messages')
  // const query = messagesRef.orderBy('createdAt').limit(25);
  // const query = messagesRef;

  // const [messages] = useCollectionData(query, { idField: 'id' });
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)

  const [formValue, setFormValue] = useState('')

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'messages'), orderBy('createdAt')),
      snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()))
      }
    )
  }, [])

  const sendMessage = async e => {
    e.preventDefault()
    setSending(true)

    const { uid, photoURL } = auth.currentUser
    await addDoc(messagesRef, {
      text: formValue,
      createdAt: Timestamp.fromDate(new Date()),
      uid,
      photoURL
    })

    setFormValue('')
  }

  useEffect(() => {
    if (formValue === '') {
      dummy.current.scrollIntoView({ behavior: 'smooth' })
      setSending(false)
    }
  }, [formValue])

  return (
    <div className='w-full h-full md:w-3/6 relative  mx-auto '>
      <main className='w-full overflow-y-scroll h-full  bg-white flex flex-col px-2 pb-12'>
        {messages &&
          messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div className=' h-80 w-16  ' ref={dummy}></div>
      </main>
      <form className='w-full md:w-3/6 fixed bottom-0 md:bottom-0 h-12 items-center  flex ' onSubmit={sendMessage}>
        <input
          value={formValue}
          className='w-5/6 p-2 h-full bg-slate-200 text-black'
          onChange={e => setFormValue(e.target.value)}
          placeholder='Say something nice'
        />
        <button
          type='submit'
          className='bg-indigo-800 w-1/6 h-full text-white font-bold py-2 items-center justify-center flex'
          disabled={!formValue || sending}
        >
          {sending ? <Loader /> : 'Send'}{' '}
        </button>
      </form>
    </div>
  )
}

export default ChatRoom
