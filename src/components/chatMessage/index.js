import React from 'react'
import { auth } from "../../services/firebase";

const ChatMessage = ({ message }) => {
    const { text, uid, photoURL } = message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`${messageClass === 'sent' ? 'self-end flex-row-reverse' : 'self-start'}  mb-4 flex items-center `}>
            <div className="w-8 h-8 rounded-full overflow-hidden ">
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className="w-full h-full object-cover" />
            </div>
            <p className="bg-slate-100 rounded mx-2 px-2">{text}</p>
        </div>
    </>)
}


export default ChatMessage;