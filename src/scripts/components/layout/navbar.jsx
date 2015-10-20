import React from "react";
import {Navbar, NavBrand} from "react-bootstrap";


class AppNavbar extends React.Component {
  render() {
    return(
      <Navbar fluid={true} fixedTop={true} inverse={true}>
        <NavBrand>2011/12 English Premier League</NavBrand>
      </Navbar>
    );
  }
}

export default AppNavbar;
