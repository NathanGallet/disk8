import { Socket, Presence } from "phoenix";
import { WS_API_URL } from '../constants/constants';

class Disk8Sock8 {

    constructor(url) {
        this.url = url;
    }

    createSocket(token) {
        let parameters = {
            params: {
                token
            }
        };

        this.socket = new Socket(`${this.url}/socket`, parameters);
        this.socket.connect();
        this.socket.onError(() => console.error('There was an error with the connection !'));
        this.socket.onClose(() => console.error("the connection dropped !"));
    }

    joinChannel(channelName) {
        this.channel = this.socket.channel(`room:${channelName}`, {});
        this.channel
            .join()
            .receive("ok", () => { console.log("Joined successfully") })
            .receive("error", resp => { console.log("Unable to join", resp) })

    }

    initPresence() {
        this.presence = new Presence(this.channel);
    }

    getPresence() {
        return this.presence;
    }

    pushNewUser() {
        this.channel.push("new_user");
    }

    pushMessage(message, id) {
        let parameters = {
            id,
            message
        }

        return this.channel.push("message", parameters);
    }

    onMessagePushed(callbackFunction) {
        this.channel.on("message", payload => {
            callbackFunction(payload.message, payload.user)
        })
    }

    onNewUser(callbackFunction) {
        this.channel.on("new_user", payload => {
            callbackFunction(payload.user, payload.public_key)
        })
    }
}

export default new Disk8Sock8(WS_API_URL)
