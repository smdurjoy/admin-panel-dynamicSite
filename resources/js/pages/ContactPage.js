import React, {Component, Fragment} from 'react';
import MainLayout from "../components/MainLayout";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import Loading from "../components/Loading";
import WentWrong from "../components/WentWrong";
import Swal from 'sweetalert2'
import {Link} from "react-router-dom";

class ContactPage extends Component {

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
                    Axios.post('/contactDelete', {id:this.state.selectRowId}).then((response) => {
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
        if(this.state.isLoading == true) {
            return(
                <MainLayout title="Contact">
                    <Container>
                        <Loading/>
                    </Container>
                </MainLayout>
            )
        } else if(this.state.isError == true) {
            return(
                <MainLayout title="Contact">
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
                    <MainLayout title="Contact">
                        <Container>
                            <Row>
                                <Col md={4} lg={4} sm={4}>
                                    <Button className="btn btn-danger mt-5 btn-sm" onClick={this.deleteRow}>{ this.state.deleteBtnText }</Button>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className=" text-center titleText mt-5">Contact Information</h1>
                                </Col>
                                <Col md={4} lg={4} sm={4}>
                                    <h1 className="desText float-right mt-5">
                                        <Link to='/' className="pageLink">Home</Link> / <Link to='/contact' className="pageLink">Contact</Link>
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
                    </MainLayout>
                </Fragment>
            );
        }
    }
}

export default ContactPage;
