import React, {Component, Fragment} from 'react';
import {Button, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faAmericanSignLanguageInterpreting,
    faBars,
    faComments,
    faHome,
    faLaptopCode,
    faSortDown,
    faWindowRestore
} from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink} from "react-router-dom";

class MainLayout extends Component {
    constructor(props) {
        super();
        this.state = {
            sideNav: false,
            sideNavClass: "sideNavClose",
            mainOverlay: "overlayClose",
            activeNavClass: ""
        }

        this.showHideSideNav = this.showHideSideNav.bind(this);
    }

    showHideSideNav () {
        if(this.state.sideNav == false) {
            this.setState({sideNav: true, sideNavClass: "sideNavOpen", mainOverlay: "overlayOpen"})
        } else {
            this.setState({sideNav: false, sideNavClass: "sideNavClose", mainOverlay: "overlayClose"})
        }
    }

    render() {
        return (
            <Fragment>
                <title>{this.props.title}</title>
                <Navbar expand="lg" className="fixed-top navBar" variant="light" bg="light">
                    <Navbar.Brand href="#" onClick={this.showHideSideNav}> <FontAwesomeIcon icon={faBars}/> </Navbar.Brand>
                    <h6 className="ml-auto"> Welcome Admin <FontAwesomeIcon icon={faSortDown}/></h6>
                </Navbar>

                <div className={this.state.sideNavClass}>
                    <div className="navDiv">
                         <NavLink className="p-2 my-0 navItem" exact to="/" activeStyle={{ background: '#f8f9fa', color:'#1b1e21' }}> <FontAwesomeIcon icon={faHome}/> Home</NavLink>
                         <NavLink className="p-2 my-0 navItem" exact to="/courses" activeStyle={{ background: '#f8f9fa', color:'#1b1e21' }}> <FontAwesomeIcon icon={faLaptopCode}/> Courses</NavLink>
                         <NavLink className="p-2 my-0 navItem" exact to="/projects" activeStyle={{ background: '#f8f9fa', color:'#1b1e21' }}> <FontAwesomeIcon icon={faWindowRestore}/> Projects</NavLink>
                         <NavLink className="p-2 my-0 navItem" exact to="/services" activeStyle={{ background: '#f8f9fa', color:'#1b1e21' }}> <FontAwesomeIcon icon={faAmericanSignLanguageInterpreting}/> Services</NavLink>
                         <NavLink className="p-2 my-0 navItem" exact to="/clientReview" activeStyle={{ background: '#f8f9fa', color:'#1b1e21' }}> <FontAwesomeIcon icon={faComments}/> Client Review</NavLink>
                         <NavLink className="p-2 my-0 navItem" exact to="/contact" activeStyle={{ background: '#f8f9fa', color:'#1b1e21' }}> <FontAwesomeIcon icon={faAddressBook}/> Contact</NavLink>
                    </div>
                </div>
                <div onClick={this.showHideSideNav} className={this.state.mainOverlay}>

                </div>

                <div className="mt-5">
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default MainLayout;
