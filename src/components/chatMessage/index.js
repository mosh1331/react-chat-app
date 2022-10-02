import React from 'react'
import { auth } from "../../services/firebase";

const dayjs = require('dayjs')

export const DATE_STANDARD_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_STANDARD_FORMAT = 'MMM D, YYYY h:mm A';
export const DATE_TIME_STANDARD_FORMAT_LIVE = 'ddd, DD MMM';
const DATE_TIME = 'ddd h m a	'

const ChatMessage = ({ message }) => {
    const { text, uid, photoURL, createdAt } = message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    const getChatDisplayDateFromEpoche = (epochTimeSeconds: number) => {
        const now = dayjs()
        const otherDate = dayjs(epochTimeSeconds * 1000)
        const formatedDate = dayjs(epochTimeSeconds * 1000).format(DATE_STANDARD_FORMAT)
        const difference = now.diff(otherDate, 'day')
        //console.log(now,otherDate,difference,'daydadyadyaydyadyadyaydyadaydaydyayd')
        if (difference == 0) {
            return 'Today'
        } else if (difference == 1) {
            return 'Yesterday'

        } else {
            return formatedDate

        }
    };
    const formatEpochTime = (
        epochTimeInSeconds: number,
        format: string,
    ) => {
        return dayjs(epochTimeInSeconds * 1000).format(format)
    };


    return (<>
        <div className={`${messageClass === 'sent' ? 'self-end flex-row-reverse' : 'self-start'}  mb-4 flex items-center `}>
            <div className="w-8 h-8 rounded-full overflow-hidden ">
                <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className="w-full h-full object-cover" />
            </div>
            <div className=" bg-slate-100 rounded mx-2 px-2 flex flex-col">
                <p className="">{text}</p>
                <p className={`text-xs text-slate-400 ${messageClass === 'sent' ? 'self-start ' : 'self-end'}  `}>{formatEpochTime(createdAt.seconds, DATE_TIME)}</p>
            </div>
        </div>
    </>)
}


export default ChatMessage;