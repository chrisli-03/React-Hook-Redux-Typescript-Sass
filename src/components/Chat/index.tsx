import React, {useState} from 'react'

import { SystemState } from '@/store/system/types';
import { updateSession } from '@/store/system/actions';

import { ChatState } from '@/store/chat/types';
import { sendMessage } from '@/store/chat/actions';

import ChatHistory from '@/components/Chat/ChatHistory';
import ChatInterface from '@/components/Chat/ChatInterface';

import { thunkSendMessage } from '@/thunks';
import { connect } from "react-redux";
import { AppState } from "@/store";

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>

interface ChatProps {
    sendMessage: typeof sendMessage
    updateSession: typeof updateSession
    chat: ChatState
    system: SystemState
    thunkSendMessage: any
}

const Chat: React.FC<ChatProps> = ({ chat, system, sendMessage }) => {
    const [message, setMessage] = useState('')

    const update = (event: UpdateMessageParam) => {
        setMessage(event.currentTarget.value);
    };

    const send = (message: string) => {
        sendMessage({
            user: system.username,
            message: message,
            timestamp: new Date().getTime()
        });
        setMessage("");
    };

    return <div className="App">
        <ChatHistory messages={chat.messages} />
        <ChatInterface
            username={system.username}
            message={message}
            updateMessage={update}
            sendMessage={send}
        />
    </div>
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    chat: state.chat
})

export default connect(
    mapStateToProps,
    { sendMessage, updateSession, thunkSendMessage }
)(Chat)
