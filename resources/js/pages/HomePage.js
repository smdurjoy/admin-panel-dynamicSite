import React, {Component, Fragment} from 'react';
import MainLayout from "../components/MainLayout";
import {Card, Col, Container, Row} from "react-bootstrap";
import Axios from "axios";
import Loading from "../components/Loading";
import WentWrong from "../components/WentWrong";

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
        }
    }

    componentDidMount() {
        Axios.get('/countSummary').then((response) => {
            if(response.status == 200) {
                this.setState({dataList: response.data, isLoading: false})
            } else {
                this.setState({isLoading: false, isError: true})
            }
        }).catch((error) => {
            this.setState({isLoading: false, isError: true})
        })
    }

    render() {
        if(this.state.isLoading == true) {
            return(
                <MainLayout title="Home">
                    <Container>
                        <Loading/>
                    </Container>
                </MainLayout>
            )

        } else if(this.state.isError == true) {
            return(
                <MainLayout title="Home">
                    <Container>
                        <WentWrong/>
                    </Container>
                </MainLayout>
            )
        } else {
            const data = this.state.dataList;
            return (
                <Fragment>
                    <MainLayout title="Home">
                        <Container className="mt-4">
                            <Row>
                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h1 className="titleText">{data['course']}</h1>
                                            <h1 className="desText">Total Course</h1>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h1 className="titleText">{data['project']}</h1>
                                            <h1 className="desText">Total Projects</h1>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h1 className="titleText">{data['service']}</h1>
                                            <h1 className="desText">Total Service</h1>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h1 className="titleText">{data['clientReview']}</h1>
                                            <h1 className="desText">Client Review</h1>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={12}>
                                    <Card>
                                        <Card.Body>
                                            <h1 className="titleText">{data['contact']}</h1>
                                            <h1 className="desText">Contact Request</h1>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </MainLayout>
                </Fragment>
            );
        }
    }
}

export default HomePage;
