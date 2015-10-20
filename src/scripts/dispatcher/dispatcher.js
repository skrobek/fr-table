import Flux from 'flux';

const AppDispatcher = new Flux.Dispatcher();

AppDispatcher.handleAction = function (action) {
  this.dispatch({
    source: 'APP_ACTION',
    action: action
  })
}

export default AppDispatcher;
