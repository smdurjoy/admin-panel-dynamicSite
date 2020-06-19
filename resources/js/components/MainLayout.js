import React, {Component, Fragment} from 'react';
import {Button, Navbar, NavLink} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class MainLayout extends Component {
    constructor(props) {
        super();
        this.state = {
            sideNav: false,
            sideNavClass: "sideNavClose",
            mainOverlay: "overlayClose"
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
                <Navbar expand="lg" className="fixed-top" variant="light" bg="light">
                    <Navbar.Brand href="#" onClick={this.showHideSideNav}> <FontAwesomeIcon icon={faBars}/> </Navbar.Brand>
                    <Link className="btn btn-dark ml-auto">Logout</Link>
                </Navbar>

                <div className={this.state.sideNavClass}>
                    <NavLink> <Link className="p-2 my-0 text-white" to="/"> <FontAwesomeIcon icon={faHome}/> Home</Link> </NavLink>
                    <NavLink> <Link className="p-2 my-0 text-white" to="/courses"> <FontAwesomeIcon icon={faHome}/> Courses</Link> </NavLink>
                    <NavLink> <Link className="p-2 my-0 text-white" to="/projects"> <FontAwesomeIcon icon={faHome}/> Projects</Link> </NavLink>
                    <NavLink> <Link className="p-2 my-0 text-white" to="/services"> <FontAwesomeIcon icon={faHome}/> Services</Link> </NavLink>
                    <NavLink> <Link className="p-2 my-0 text-white" to="/clientReview"> <FontAwesomeIcon icon={faHome}/> Client Review</Link> </NavLink>
                    <NavLink> <Link className="p-2 my-0 text-white" to="/contact"> <FontAwesomeIcon icon={faHome}/> Contact</Link> </NavLink>
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
