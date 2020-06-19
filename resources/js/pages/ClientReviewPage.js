import React, {Component, Fragment} from 'react';
import MainLayout from "../components/MainLayout";
import Axios from "axios";
import Swal from "sweetalert2";
import {Button, Col, Container, Row} from "react-bootstrap";
import Loading from "../components/Loading";
import WentWrong from "../components/WentWrong";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom";

class ClientReviewPage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
            selectRowId: '',
            deleteBtnText: 'Delete'
        }

        this.deleteRow = this.deleteRow.bind(this)
    }

    componentDidMount() {
        Axios.get('/clientData').then((response) => {
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
            return Swal.fire('Please select a row for delete!')
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.setState({
                        deleteBtnText: "Deleting..."
                    })
                    Axios.post('/clientDelete', {id:this.state.selectRowId}).then((response) => {
                        if(response.data == 1 && response.status == 200) {
                            this.setState({deleteBtnText: "Delete Success"})
                            setTimeout(function () {
                                this.setState({deleteBtnText: "Delete"})
                            }.bind(this), 2000)
                            this.componentDidMount()
                        } else {
                            this.setState({deleteBtnText: "Delete Failed"})
                        }
                    }).catch((error) => {
                        this.setState({deleteBtnText: "Delete Failed"})
                    })
                }
            });
        }
    }

    render() {
        console.log(this.state.dataList)
        if(this.state.isLoading == true) {
            return(
                <MainLayout title="Client Review">
                    <Container>
                        <Loading/>
                    </Container>
                </MainLayout>
            )
        } else if(this.state.isError == true) {
            return(
                <MainLayout title="Client Review">
                    <Container>
                        <WentWrong/>
                    </Container>
                </MainLayout>
            )
        } else {
            const data = this.state.dataList;
            const columns = [
                {dataField: "id", text: "ID"},
                {dataField: "client_name", text: "Client Name"},
                {dataField: "client_comment", text: "Client Comment"},
                {dataField: "client_image", text: "Client Image"}
            ]

            const selectRow = {
                mode: "radio",
                onSelect: (row, isSelect, rowIndex) => {
                    this.setState({selectRowId: row['id']})
                }
            }

            return (
                <Fragment>
                    <MainLayout title="Client Review">
                        <Container>
                            <Row>
                                <Col md={4} lg={4} sm={4}>
                                    <Button className="btn btn-dark mt-5" onClick={this.deleteRow}>{ this.state.deleteBtnText }</Button>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className=" text-center titleText mt-5">Client Review</h1>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className="desText float-right mt-5">
                                        <Link to='/' className="pageLink">Home</Link> / <Link to='/clientReview' className="pageLink">Client Review</Link>
                                    </h1>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col lg={12} md={12} sm={12}>
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

export default ClientReviewPage;
