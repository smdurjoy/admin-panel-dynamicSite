import React, {Component, Fragment} from 'react';
import MainLayout from "../components/MainLayout";
import Axios from "axios";
import Swal from "sweetalert2";
import {Button, Col, Container, Row} from "react-bootstrap";
import Loading from "../components/Loading";
import WentWrong from "../components/WentWrong";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

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
            proF: ""
        }

        this.deleteRow = this.deleteRow.bind(this)
        this.imgCellFormat = this.imgCellFormat.bind(this)
    }

    componentDidMount() {
        Axios.get('/projectData').then((response) => {
            if(response.status == 200) {
                this.setState({dataList: response.data, isLoading: false, proF: response.data['project_features']})
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

    imgCellFormat(cell) {
        return <img className="w-75" src={cell}/>
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
                                <Col lg={12} md={12} sm={12}>
                                    <h1 className=" text-center mt-5">Projects</h1>
                                    <div className={this.state.showHide}>Ami show hide div</div>
                                    <Button className="btn btn-dark my-2" onClick={this.deleteRow}>{ this.state.deleteBtnText }</Button>
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

export default ProjectPage;
