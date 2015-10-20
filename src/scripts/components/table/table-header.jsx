import React from "react";

class TableHeader extends React.Component {
  render() {
    return(
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>Games</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Losses</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Goals Difference</th>
          <th><b>Points</b></th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
