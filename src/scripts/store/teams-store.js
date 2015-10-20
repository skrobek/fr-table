import AppDispatcher from './../dispatcher/dispatcher';
import objectAssign from 'react/lib/Object.assign';
import constans from './../constans/team-constans';
import Event from 'events';
import AppSockets from './../lib/app-sockets';
import _ from 'lodash';

const EventEmitter = Event.EventEmitter;
const CHANGE_EVENT = 'CHANGE';
const END_SEASON_EVENT = 'END_SEASON';
const WIN_POINTS = 3;
const DRAW_POINTS = 1;
const TEAM_DEFAULTS = {
  points: 0,
  goalsFor: 0,
  goalsAgainst: 0,
  goalsDiff: 0,
  games: 0,
  won: 0,
  drawn: 0,
  lost: 0
};

let SEASON_END = 0;


class TeamsStore extends EventEmitter {
  constructor() {
    super();
    this.teams = [];
  }


  setTeams(data) {
    data.forEach( (item) => {
      Object.assign(item, item, TEAM_DEFAULTS);
    });

    this.teams = data;
    this.sortTeams();
  }

  sortTeams = () => {
    this.teams = _.sortByOrder(
      this.teams,
      ['points', 'goalsDiff', 'goalsFor', 'name'],
      ['desc', 'desc', 'desc', 'asc']
    );
  }


  getTeams() {
    return this.teams;
  }


  _findTeamIndex(id) {
    return _.findIndex(this.teams, { 'id': id });
  }


  updateTeams(data) {
    let homeTeamIndex = this._findTeamIndex(data.homeTeamId);
    let awayTeamIndex = this._findTeamIndex(data.awayTeamId);

    this._calculatePoints(this.teams[homeTeamIndex], data.homeGoals, data.awayGoals);
    this._calculatePoints(this.teams[awayTeamIndex], data.awayGoals, data.homeGoals);

    this.sortTeams();
  }


  _calculatePoints(team, goalsFor, goalsAgainst) {
    goalsFor = parseInt(goalsFor, 10);
    goalsAgainst = parseInt(goalsAgainst, 10);

    let points = 0;
    let matchResult = "lost";

    if (goalsFor > goalsAgainst) {
      points = 3;
      matchResult = "won";
    }

    if (goalsFor == goalsAgainst) {
      points = 1;
      matchResult = "drawn";
    }

    team.points += points;
    team.goalsFor += goalsFor;
    team.goalsAgainst += goalsAgainst;
    team.goalsDiff += goalsFor - goalsAgainst;
    team.games += 1;
    team[matchResult] += 1;

    this._checkSeasonEnd(team.games);

    return team;
  }


  _checkSeasonEnd(games) {
    if (games == 38) {
      SEASON_END += 1;

      if (SEASON_END == 20) {
        this.sockets.close();
        this.emit(END_SEASON_EVENT);
      }
    }
  }


  initSockets() {
    this.sockets = new AppSockets();
  }


  onChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }


  offChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }


  onEndSeason(cb) {
    this.on(END_SEASON_EVENT, cb);
  }


  emitChange() {
    this.emit(CHANGE_EVENT);
  }

}

const teamsStore = new TeamsStore();

teamsStore.dispatchToken = AppDispatcher.register( (payload) => {
  let data = payload.action.data;

  switch (payload.action.actionType) {
    case constans.LOAD_TEAMS:
      teamsStore.setTeams(data);
      teamsStore.emitChange(CHANGE_EVENT);
      teamsStore.initSockets();
      break;

    case constans.NEW_SCORE:
      teamsStore.updateTeams(data);
      teamsStore.emitChange(CHANGE_EVENT);
      break;
  }
});

export default teamsStore;
