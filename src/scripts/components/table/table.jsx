import React from "react";
import {Grid, Table} from "react-bootstrap";
import TableHeader from "./table-header.jsx";
import TableRow from "./table-row.jsx";

import teamActions from './../../actions/team-actions';
import store from './../../store/teams-store';


class AppTable extends React.Component {
  constructor() {
    super();

    this.state = {
      table: [],
      seasonEnd: false
    }
  }


  componentDidMount() {
    store.onChangeListener(this.handleTableChange);
    store.onEndSeason(this.endSeasonHandler);
    teamActions.loadTeams();
  }


  componentWillUnmount() {
    store.offChangeListener(this.handleTableChange)
  }


  handleTableChange = () => {
    this.setState({
      table: store.getTeams()
    })
  }


  endSeasonHandler = () => {
    this.setState({ seasonEnd: true });
  }


  renderRow = (item, i) => {
    return <TableRow item={item} position={i + 1} key={i} />
  }


  renderTable() {
    if (this.state.table.length > 0) {
      return(
        <Table responsive striped className={(this.state.seasonEnd) ? "season-end" : ""}>
          <TableHeader />
          <tbody>
            {this.state.table.map(this.renderRow)}
          </tbody>
        </Table>
      );
    }

    return <p className="text-primaru">Loading...</p>
  }


  render() {
    return(
      <div className="table-component">
        {this.renderTable()}
      </div>
    );
  }
}

export default AppTable;
