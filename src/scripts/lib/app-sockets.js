import config from './../config/api';
import constans from './../constans/team-constans';
import AppDispatcher from './../dispatcher/dispatcher';


class AppSockets {
  constructor () {
    let socketsUrl = `${config.ws}/games`;
    this.socket = new WebSocket(socketsUrl, "steam");

    this.socket.onmessage = (event) => {
      AppDispatcher.handleAction({
        actionType: constans.NEW_SCORE,
        data: JSON.parse(event.data)
      });
    }
  }

  close() {
    this.socket.close();
  }
}

export default AppSockets;
