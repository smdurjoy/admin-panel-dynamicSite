import React, {Component, Fragment} from 'react';
import MainLayout from "../components/MainLayout";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import Loading from "../components/Loading";
import WentWrong from "../components/WentWrong";

class ContactPage extends Component {

    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
            selectRowId: ''
        }

        this.deleteRow = this.deleteRow.bind(this)
    }

    componentDidMount() {
        Axios.get('/contactData').then((response) => {
            if(response.status == 200) {
                this.setState({dataList: response.data, isLoading: false})
            } else {
                this.setState({isLoading: false, isError: true})
            }
        }).catch((error) => {
            this.setState({isLoading: false, isError: true})
        })
    }

    deleteRow() {
        if(this.state.selectRowId == '') {
            alert('Please select a row')
        } else {
            Axios.post('/contactDelete', {id:this.state.selectRowId}).then((response) => {
                alert(response.data)
                this.componentDidMount()
            }).catch((error) => {

            })
        }
    }

    render() {
        if(this.state.isLoading == true) {
            return(
                <MainLayout>
                    <Container>
                        <Loading/>
                    </Container>
                </MainLayout>
            )
        } else if(this.state.isError == true) {
            return(
                <MainLayout>
                    <Container>
                        <WentWrong/>
                    </Container>
                </MainLayout>
            )
        } else {
            const data = this.state.dataList;
            const columns = [
                {dataField: "id", text: "ID"},
                {dataField: "name", text: "Name"},
                {dataField: "email", text: "Email"},
                {dataField: "message", text: "Message"}
            ]

            const selectRow = {
                mode: "radio",
                onSelect: (row, isSelect, rowIndex) => {
                    this.setState({selectRowId: row['id']})
                }
            }

            return (
                <Fragment>
                    <MainLayout>
                        <Container>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <h1 className=" text-center mt-5">Contact Information</h1>
                                    <Button className="btn btn-dark float-right my-2" onClick={this.deleteRow}>Delete</Button>
                                    <BootstrapTable
                                        keyField='id'
                                        data={ data }
                                        columns={ columns }
                                        pagination={ paginationFactory() }
                                        selectRow={selectRow}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </MainLayout>
                </Fragment>
            );
        }
    }
}

export default ContactPage;
