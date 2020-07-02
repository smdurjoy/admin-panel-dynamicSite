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

class ProjectPage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
            selectRowId: '',
            deleteBtnText: 'Delete',
            showHide: "d-none",
            addModal: false
        }

        this.deleteRow = this.deleteRow.bind(this)
        this.imgCellFormat = this.imgCellFormat.bind(this)
        this.addModalToggle = this.addModalToggle.bind(this)
        this.addProjectButtonClick = this.addProjectButtonClick.bind(this)
        this.addProject = this.addProject.bind(this)
    }

    componentDidMount() {
        Axios.get('/projectData').then((response) => {
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
                    Axios.post('/projectDelete', {id:this.state.selectRowId}).then((response) => {
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

    // Add project modal
    addModalToggle() {
        if(this.state.addModal == false) {
            this.setState({addModal: true});
        } else {
            this.setState({
                addModal: false
            });
        }
    }

    addProjectButtonClick() {
        let projectName = document.getElementById('projectName').value;
        let shortDes = document.getElementById('shortDes').value;
        let imgOne = document.getElementById('imgOne').value;
        let imgTwo = document.getElementById('imgTwo').value;
        let livePreview = document.getElementById('livePreview').value;
        let proFeature = document.getElementById('proFeature').value;

        this.addProject(projectName, shortDes, imgOne, imgTwo, livePreview, proFeature)
    }

    addProject(projectName, shortDes, imgOne, imgTwo, livePreview, proFeature) {
        Axios.post('/addProject', {
            project_name: projectName,
            short_description: shortDes,
            image_one: imgOne,
            image_two: imgTwo,
            live_preview: livePreview,
            project_features: proFeature
        }).then((response) => {
            if(response.status == 200 && response.data == 1) {
                Swal.fire('Project Added Successfully !');
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

    imgCellFormat(cell) {
        return <img className="tableImage" src={cell}/>
    }

    render() {
        if(this.state.isLoading == true) {
            return(
                <MainLayout title="Project">
                    <Container>
                        <Loading/>
                    </Container>
                </MainLayout>
            )
        } else if(this.state.isError == true) {
            return(
                <MainLayout title="Project">
                    <Container>
                        <WentWrong/>
                    </Container>
                </MainLayout>
            )
        } else {
            const data = this.state.dataList;
            const columns = [
                {dataField: "id", text: "ID"},
                {dataField: "image_one", text: "Image", formatter:this.imgCellFormat},
                {dataField: "project_name", text: "Name"},
                {dataField: "short_description", text: "Short Description"}
            ]

            const selectRow = {
                mode: "radio",
                onSelect: (row) => {
                    this.setState({selectRowId: row['id']})
                }
            }

            return (
                <Fragment>
                    <MainLayout title="Project">
                        <Container>
                            <Row>
                                <Col md={4} lg={4} sm={4}>
                                    <Button className="btn btn-info mt-5 btn-sm" onClick={this.addModalToggle}>Add</Button>
                                    <Button className="btn btn-info mt-5 btn-sm">Edit</Button>
                                    <Button className="btn btn-danger mt-5 btn-sm" onClick={this.deleteRow}>{ this.state.deleteBtnText }</Button>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className=" text-center titleText mt-5">Projects</h1>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className="desText float-right mt-5">
                                        <Link to='/' className="pageLink">Home</Link> / <Link to='/projects' className="pageLink">Projects</Link>
                                    </h1>
                                </Col>
                            </Row>
                            <Row className="mt-3">
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

                        <MDBContainer>
                            <MDBModal isOpen={this.state.addModal} toggle={this.addModalToggle} size="lg">
                                <MDBModalHeader toggle={this.addModalToggle}>Add Project</MDBModalHeader>
                                <MDBModalBody>
                                    <Row>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Project Name" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="projectName"/>
                                            <MDBInput label="Image One" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="imgOne"/>
                                            <MDBInput label="Live Preview Link" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="livePreview"/>
                                        </Col>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Short Description" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="shortDes"/>
                                            <MDBInput label="Image Two" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="imgTwo"/>
                                            <MDBInput type="textarea" label="Project Features" rows="3" id="proFeature"/>
                                        </Col>
                                    </Row>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="primary" size="sm" onClick={this.addProjectButtonClick}>Add</MDBBtn>
                                    <MDBBtn color="danger" size="sm" onClick={this.addModalToggle}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>

                    </MainLayout>
                </Fragment>
            );
        }
    }
}

export default ProjectPage;
