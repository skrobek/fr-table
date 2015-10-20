import React from "react";

class TableRow extends React.Component {
  renderGoalsDiff(diff) {
    return (diff > 0) ? `+${diff}` : diff;
  }


  getRowClass() {
    if (this.props.position < 5) {
      return "success";
    }

    if (this.props.position > 17) {
      return "danger";
    }

    return "";
  }


  render() {
    let item = this.props.item;

    return(
      <tr className={this.getRowClass()}>
        <td>{this.props.position}</td>
        <td>{item.name}</td>
        <td>{item.games}</td>
        <td>{item.won}</td>
        <td>{item.drawn}</td>
        <td>{item.lost}</td>
        <td>{item.goalsFor}</td>
        <td>{item.goalsAgainst}</td>
        <td>{this.renderGoalsDiff(item.goalsDiff)}</td>
        <td>{item.points}</td>
      </tr>
    );
  }
}

export default TableRow;
