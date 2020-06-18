import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import loaderIcon from '../../images/loader.svg';

class Loading extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center">
                    <Row>
                        <Col>
                            <img src={loaderIcon}/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Loading;
