// Saga effects are usesul to interact with the saga middleware
// TODO: import socket file here
import { put, select, call, take } from 'redux-saga/effects';
import { POST_MESSAGE } from '../constants/chat';
import { postmessage } from '../actions/chat';

const connectSocket = () => {
    return () =>  {
    }
};

const initWebsocket = () => {
    return eventChannel(emitter => {
        var socket = io.connect('http://localhost:1337');
        socket.onopen = () => {
            console.log('opening...')
            ws.send('hello server')
        }
        socket.onerror = (error) => {
            console.log('WebSocket error ' + error)
            console.dir(error)
        }

        socket.onmessage = (e) => {
            let msg = null
            try {
                msg = JSON.parse(e.data)
            } catch(e) {
                console.error(`Error parsing : ${e.data}`)
            }
            if (msg) {
                const { payload: book } = msg

                const channel = msg.channel
                switch (channel) {
                    case 'ADD_BOOK':
                        return emitter({ type: ADD_BOOK, book })
                    case 'REMOVE_BOOK':
                        return emitter({ type: REMOVE_BOOK, book })
                    default:
                }
            }
        }

        // unsubscribe function
        return () => {
            console.log('Socket off')
        }
    })
}

function* watchSocket() {
    const channel = yield call(initWebsocket)

    while (true) {
        const action = yield take(channel)
        yield put(action)
    }
}

export {
    watchSocket
};
