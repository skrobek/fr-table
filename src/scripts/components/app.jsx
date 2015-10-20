import React from "react";
import {Grid} from "react-bootstrap";
import AppNavbar from './layout/navbar.jsx';
import TeamsTable from './table/table.jsx';

class App extends React.Component {
  render() {
    return(
      <div className="react-app">
        <AppNavbar />
          <Grid fluid={true}>
            <div className="content">
              <TeamsTable />
            </div>
          </Grid>
      </div>
    );
  }
}

export default App;
