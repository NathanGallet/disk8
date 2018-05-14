import { Socket } from "phoenix"
import { WS_API_URL } from '../utils/config'

class Disk8Sock8 {

    constructor(url) {
        this.url = url;
    }

    createSocket() {
        this.socket = new Socket(`${this.url}/socket`);
        this.socket.connect()
        this.socket.onError(() => console.error('There was an error with the connection !'))
        this.socket.onClose(() => console.error("the connection dropped !"))
    }

    joinChannel(channelName) {
        this.channel = this.socket.channel(`room:${channelName}`, {});
        this.channel
            .join()
            .receive("ok", resp => { console.log("Joined successfully", resp) })
            .receive("error", resp => { console.log("Unable to join", resp) })
    }

    // TODO: need to change, json is send now
    pushMessage(message) {
        this.channel.push("message", message)
    }

    _pushMessage(callbackFunction) {

        // TODO: Change de payload, add informations of the user
        this.channel.on("message", payload => {
            console.log('New Message :', payload)
            callbackFunction(payload.content)
        })
    }
}

export const Sock8 = new Disk8Sock8(WS_API_URL)
