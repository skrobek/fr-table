import config from './../config/api';
import AppDispatcher from './../dispatcher/dispatcher';
import constans from './../constans/team-constans';

const teamActions = {
  getEndpoint(path) {
    return `${config.host}/${path}`;
  },


  loadTeams() {
    let url = this.getEndpoint('teams');

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        AppDispatcher.handleAction({
          actionType: constans.LOAD_TEAMS,
          data: json
        });
      });
  }
}

export default teamActions;
