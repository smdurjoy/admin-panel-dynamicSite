import React, {Component, Fragment} from 'react';
import MainLayout from "../components/MainLayout";
import Axios from "axios";
import Swal from "sweetalert2";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import Loading from "../components/Loading";
import WentWrong from "../components/WentWrong";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from "react-router-dom";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput} from 'mdbreact';

class CoursePage extends Component {
    constructor() {
        super();
        this.state = {
            dataList: [],
            isLoading: true,
            isError: false,
            selectRowId: '',
            deleteBtnText: 'Delete',
            editModal: false,
            short_title: '',
            short_des: '',
            short_img: '',
            long_title: '',
            long_des: '',
            total_lecture: '',
            total_students: '',
            skill_all: '',
            video_url: '',
            course_link: '',
            addModal: false
        }

        this.deleteRow = this.deleteRow.bind(this)
        this.imgCellFormat = this.imgCellFormat.bind(this)
        this.editRow = this.editRow.bind(this)
        this.editCourse = this.editCourse.bind(this)
        this.editModalToggle = this.editModalToggle.bind(this)
        this.addModalToggle = this.addModalToggle.bind(this)
        this.addCourse = this.addCourse.bind(this)
        this.addCourseButtonClick = this.addCourseButtonClick.bind(this)
    }

    componentDidMount() {
        Axios.get('/courseData').then((response) => {
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
                    Axios.post('/courseDelete', {id:this.state.selectRowId}).then((response) => {
                        if(response.data == 1 && response.status == 200) {
                            this.setState({deleteBtnText: "Delete Success"})
                            setTimeout(function () {
                                this.setState({deleteBtnText: "Delete"})
                            }.bind(this), 2000)
                            this.componentDidMount()
                        } else {
                            this.setState({deleteBtnText: "Delete Failed"})
                            setTimeout(function () {
                                this.setState({deleteBtnText: "Delete"})
                            }.bind(this), 2000)
                        }
                    }).catch((error) => {
                        this.setState({deleteBtnText: "Delete Failed"})
                        setTimeout(function () {
                            this.setState({deleteBtnText: "Delete"})
                        }.bind(this), 2000)
                    })
                }
            });
        }
    }

    editRow() {
        const id = this.state.selectRowId
        const short_title = this.state.short_title
        const short_des = this.state.short_des
        const short_img = this.state.short_img
        const long_title = this.state.long_title
        const long_des = this.state.long_des
        const total_lecture = this.state.total_lecture
        const total_students = this.state.total_students
        const skill_all = this.state.skill_all
        const video_url = this.state.video_url
        const course_link = this.state.course_link

        this.editCourse(id, short_title, short_des, short_img, long_title, long_des, total_lecture, total_students, skill_all, video_url, course_link)
    }

    editCourse(id, sTitle, sDes, sImg, lTitle, lDes, tLecture, tStudent, skill, videoUrl, cLink) {
        Axios.post('/editCourse', {
            id: id,
            short_title: sTitle,
            short_des: sTitle,
            short_img: sImg,
            long_title: lTitle,
            long_des: lDes,
            total_lecture: tLecture,
            total_students: tStudent,
            skill_all: skill,
            video_url: videoUrl,
            course_link: cLink
        }).then((response) => {
            if(response.status == 200) {
                Swal.fire('Course has been updated !')
                this.editModalToggle()
                this.componentDidMount()
            } else {
                Swal.fire('Something Went Wrong !')
                this.editModalToggle()
            }
        }).catch((error) => {
            Swal.fire('Something Went Wrong !')
            this.editModalToggle()
        })
    }


    //modal open and get edit course data
    editModalToggle() {
        if(this.state.selectRowId == '') {
            return Swal.fire('Please select a row for Update!')
        } else {
            if(this.state.editModal == false) {
                this.setState({editModal: true});
                Axios.post('/courseEditDetails', {id:this.state.selectRowId}).then((response) => {
                    if(response.status == 200) {
                        this.setState({
                            short_title: response.data[0]['short_title'],
                            short_des: response.data[0]['short_des'],
                            short_img: response.data[0]['short_img'],
                            long_title: response.data[0]['long_title'],
                            long_des: response.data[0]['long_des'],
                            total_lecture: response.data[0]['total_lecture'],
                            total_students: response.data[0]['total_students'],
                            skill_all: response.data[0]['skill_all'],
                            video_url: response.data[0]['video_url'],
                            course_link: response.data[0]['course_link']
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

    // Add course modal
    addModalToggle() {
        if(this.state.addModal == false) {
            this.setState({addModal: true});
        } else {
            this.setState({
                addModal: false
            });
        }
    }

    addCourseButtonClick() {
        let shortTitle = document.getElementById('shortTitle').value;
        let shortDes = document.getElementById('shortDes').value;
        let totalLec = document.getElementById('totalLec').value;
        let courseUrl = document.getElementById('courseUrl').value;
        let longDes = document.getElementById('longDes').value;
        let longTitle = document.getElementById('longTitle').value;
        let shortImg = document.getElementById('shortImg').value;
        let totalStu = document.getElementById('totalStu').value;
        let courseLink = document.getElementById('courseLink').value;
        let allSkill = document.getElementById('allSkill').value;

        this.addCourse(shortTitle, shortDes, shortImg, longTitle, longDes, totalLec, totalStu, allSkill, courseUrl, courseLink)
    }

    addCourse(sTitle, sDes, sImg, lTitle, lDes, tLecture, tStudent, skill, videoUrl, cLink) {
        Axios.post('/addCourse', {
            short_title: sTitle,
            short_des: sDes,
            short_img: sImg,
            long_title: lTitle,
            long_des: lDes,
            total_lecture: tLecture,
            total_students: tStudent,
            skill_all: skill,
            video_url: videoUrl,
            course_link: cLink
        }).then((response) => {
            if(response.status == 200 && response.data == 1) {
                Swal.fire('Course Added Successfully !');
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
                <MainLayout title="Course">
                    <Container>
                        <Loading/>
                    </Container>
                </MainLayout>
            )
        } else if(this.state.isError == true) {
            return(
                <MainLayout title="Course">
                    <Container>
                        <WentWrong/>
                    </Container>
                </MainLayout>
            )
        } else {
            const data = this.state.dataList;
            const columns = [
                {dataField: "id", text: "ID"},
                {dataField: "short_img", text: "Image", formatter:this.imgCellFormat},
                {dataField: "short_title", text: "Short Title"},
                {dataField: "short_des", text: "Short Description"},
                {dataField: "total_lecture", text: "Total Lecture"},
                {dataField: "total_students", text: "Total Students"}
            ]

            const selectRow = {
                mode: "radio",
                onSelect: (row) => {
                    this.setState({selectRowId: row['id']})
                }
            }

            return (
                <Fragment>
                    <MainLayout title="Course">
                        <Container>
                            <Row>
                                <Col md={4} lg={4} sm={4}>
                                    <Button className="btn btn-info mt-5 btn-sm" onClick={this.addModalToggle}>Add</Button>
                                    <Button className="btn btn-info mt-5 btn-sm" onClick={this.editModalToggle}>Edit</Button>
                                    <Button className="btn btn-danger mt-5 btn-sm" onClick={this.deleteRow}>{ this.state.deleteBtnText }</Button>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className="text-center titleText mt-5">Courses</h1>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className="desText float-right mt-5">
                                        <Link to='/' className="pageLink">Home</Link> / <Link to='/courses' className="pageLink">Courses</Link>
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
                            <MDBModal isOpen={this.state.editModal} toggle={this.editModalToggle} size="lg">
                                <MDBModalHeader toggle={this.editModalToggle}>Edit Course</MDBModalHeader>
                                <MDBModalBody>
                                    <Row>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Short Title" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.short_title } onChange={e => this.setState({ short_title: e.target.value })}/>
                                            <MDBInput label="Short Description" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.short_des } onChange={e => this.setState({ short_des: e.target.value })}/>
                                            <MDBInput label="Total Lecture" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.total_lecture } onChange={e => this.setState({ total_lecture: e.target.value })}/>
                                            <MDBInput label="Course Video Url" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.video_url } onChange={e => this.setState({ video_url: e.target.value })}/>
                                            <MDBInput type="textarea" label="Long Description" rows="4" value={ this.state.long_des } onChange={e => this.setState({ long_des: e.target.value })}/>
                                        </Col>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Long Title" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.long_title } onChange={e => this.setState({ long_title: e.target.value })}/>
                                            <MDBInput label="Short Image" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.short_img } onChange={e => this.setState({ short_img: e.target.value })}/>
                                           <MDBInput label="Total Students" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.total_students } onChange={e => this.setState({ total_students: e.target.value })}/>
                                            <MDBInput label="Course Link" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" value={ this.state.course_link } onChange={e => this.setState({ course_link: e.target.value })}/>
                                            <MDBInput type="textarea" label="All Skills" rows="4" value={ this.state.skill_all } onChange={e => this.setState({ skill_all: e.target.value })}/>
                                        </Col>
                                    </Row>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="primary" size="sm" onClick={this.editRow}>Update</MDBBtn>
                                    <MDBBtn color="danger" size="sm" onClick={this.editModalToggle}>Close</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBContainer>

                        <MDBContainer>
                            <MDBModal isOpen={this.state.addModal} toggle={this.addModalToggle} size="lg">
                                <MDBModalHeader toggle={this.addModalToggle}>Add Course</MDBModalHeader>
                                <MDBModalBody>
                                    <Row>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Short Title" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="shortTitle"/>
                                            <MDBInput label="Short Description" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="shortDes"/>
                                            <MDBInput label="Total Lecture" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="totalLec"/>
                                            <MDBInput label="Course Video Url" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="courseUrl"/>
                                            <MDBInput type="textarea" label="Long Description" rows="4" id="longDes"/>
                                        </Col>
                                        <Col md={6} sm={6} lg={6}>
                                            <MDBInput label="Long Title" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="longTitle"/>
                                            <MDBInput label="Short Image" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="shortImg"/>
                                           <MDBInput label="Total Students" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="totalStu"/>
                                            <MDBInput label="Course Link" icon="envelope" group type="text" validate error="wrong"
                                                      success="right" id="courseLink"/>
                                            <MDBInput type="textarea" label="All Skills" rows="4" id="allSkill"/>
                                        </Col>
                                    </Row>
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="primary" size="sm" onClick={this.addCourseButtonClick}>Add</MDBBtn>
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

export default CoursePage;
