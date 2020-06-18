import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import errorImage from '../../images/wentWrong.png';

class WentWrong extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center">
                    <Row>
                        <Col className="wentWrong">
                            <img className="wentWrongImage" src={errorImage}/> <br/>
                            <h3><span>Opss!</span> Something Went Wrong!</h3>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default WentWrong;
