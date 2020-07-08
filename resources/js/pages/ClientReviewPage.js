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
import {MDBBtn, MDBContainer, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";

class ClientReviewPage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
            selectRowId: '',
            deleteBtnText: 'Delete',
            addModal: false,
            client_name: '',
            client_comment: '',
            client_image: '',
            editModal: false
        }

        this.deleteRow = this.deleteRow.bind(this)
        this.addModalToggle = this.addModalToggle.bind(this)
        this.addClientReviewButtonClick = this.addClientReviewButtonClick.bind(this)
        this.addClientReview = this.addClientReview.bind(this)
        this.editRow = this.addClientReview.bind(this)
        this.editClientReview = this.editClientReview.bind(this)
        this.editModalToggle = this.editModalToggle.bind(this)
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

    // Add service functions
    addModalToggle() {
        if(this.state.addModal == false) {
            this.setState({addModal: true});
        } else {
            this.setState({
                addModal: false
            });
        }
    }

    addClientReviewButtonClick() {
        let clientName = document.getElementById('clientName').value;
        let clientComment = document.getElementById('clientComment').value;
        let clientImg = document.getElementById('clientImg').value;

        this.addClientReview(clientName, clientComment, clientImg)
    }

    addClientReview(clientName, clientComment, clientImg) {
        Axios.post('/addClientReview', {
            client_name: clientName,
            client_comment: clientComment,
            client_image: clientImg
        }).then((response) => {
            if(response.status == 200 && response.data == 1) {
                Swal.fire('Client Review Added Successfully !');
                this.addModalToggle();
                this.componentDidMount();
            } else {
                Swal.fire('Something Went Wrong !');
                this.addModalToggle();
            }
        }).catch((error) => {
            Swal.fire('Something Went Wrong !');
            this.addModalToggle();
        })
    }

    // Edit client review functions
    editModalToggle() {
        if(this.state.selectRowId == '') {
            return Swal.fire('Please select a row for Update!')
        } else {
            if(this.state.editModal == false) {
                this.setState({editModal: true});
                Axios.post('/clientReviewEditDetails', {id:this.state.selectRowId}).then((response) => {
                    if(response.status == 200) {
                        this.setState({
                            client_name: response.data[0]['client_name'],
                            client_comment: response.data[0]['client_comment'],
                            client_image: response.data[0]['client_image']
                        });
                    } else {
                        Swal.fire('Something Went Wrong !');
                    }
                }).catch((error) => {
                    Swal.fire('Something Went Wrong !');
                })
            } else {
                this.setState({
                    editModal: false
                });
            }
        }
    }

    editRow() {
        const id = this.state.selectRowId
        const clientName = this.state.client_name
        const clientComment = this.state.client_comment
        const clientImg = this.state.client_image

        this.editClientReview(id, clientName, clientComment, clientImg)
    }

    editClientReview(id, clientName, clientComment, clientImg) {
        Axios.post('/editClientReview', {
            id: id,
            client_name: clientName,
            client_comment: clientComment,
            client_image: clientImg,
        }).then((response) => {
            if(response.status == 200) {
                Swal.fire('Client Review Added Successfully !')
            } else {
                Swal.fire('Something Went Wrong !')
            }
        }).catch((error) => {
            alert('Something Went Wrong');
        })
    }

    render() {
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
                onSelect: (row) => {
                    this.setState({selectRowId: row['id']})
                }
            }

            return (
                <Fragment>
                    <MainLayout title="Client Review">
                        <Container>
                            <Row>
                                <Col md={4} lg={4} sm={4}>
                                    <Button className="btn btn-info mt-5 btn-sm" onClick={this.addModalToggle}>Add</Button>
                                    <Button className="btn btn-info mt-5 btn-sm" onClick={this.editModalToggle}>Edit</Button>
                                    <Button className="btn btn-danger mt-5 btn-sm" onClick={this.deleteRow}>{ this.state.deleteBtnText }</Button>
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

                        {/*Client review add modal*/}
                        <MDBContainer>
                            <MDBModal isOpen={this.state.addModal} toggle={this.addModalToggle} size="lg">
                                <MDBModalHeader toggle={this.addModalToggle}>Add Client Review</MDBModalHeader>
                                <MDBModalBody>
                                    <Row>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Client Name" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="clientName"/>
                                            <MDBInput label="Client Image" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="clientImg"/>
                                        </Col>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput type="textarea" label="Client Comment" rows="3" id="clientComment"/>
                                        </Col>
                                    </Row>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="primary" size="sm" onClick={this.addClientReviewButtonClick}>Add</MDBBtn>
                                    <MDBBtn color="danger" size="sm" onClick={this.addModalToggle}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>

                        {/*Client review edit modal*/}
                        <MDBContainer>
                            <MDBModal isOpen={this.state.editModal} toggle={this.editModalToggle} size="lg">
                                <MDBModalHeader toggle={this.editModalToggle}>Edit Client Review</MDBModalHeader>
                                <MDBModalBody>
                                    <Row>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Client Name" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.client_name } onChange={e => this.setState({ client_name: e.target.value })}/>
                                            <MDBInput label="Client Image" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.client_image } onChange={e => this.setState({ client_image: e.target.value })}/>
                                        </Col>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput type="textarea" label="Client Description" rows="4" value={ this.state.client_comment } onChange={e => this.setState({ client_comment: e.target.value })}/>
                                        </Col>
                                    </Row>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="primary" size="sm" onClick={this.editRow}>Update</MDBBtn>
                                    <MDBBtn color="danger" size="sm" onClick={this.editModalToggle}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>

                    </MainLayout>
                </Fragment>
            );
        }
    }
}

export default ClientReviewPage;
