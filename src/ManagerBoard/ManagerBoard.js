import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Loader from 'react-loader-spinner'
import React from 'react';
import { Image } from 'react-bootstrap';
import {
  Table, Button
} from 'reactstrap';
import Header from '../components/userheader.js';

import autoBind from 'auto-bind';
import ReactModal from 'react-modal';
import axios from 'axios';
import { TRELLO_API } from '../utils/constants'
class ManagerDashboard extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      arrayname: [],
      data: []
    }

    autoBind(this);
    this.el = document.createElement('div');

    this.state = {
      isLoading: false,
      showuserModal: false,
      showModal: false,

      token: window.localStorage.getItem('token'),
      res: '',
      employee: {
        response: []
      },
      courses: {
        courseData: []
      }
    };
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal() {
    this.setState({
      showModal: false,
      showuserModal: false
    })
  }

  componentDidMount = async () => {

    await axios.get(`${TRELLO_API}/employees`, {
      headers: {
        'Authorization': `Basic ${this.state.token}`
      }
    }).then(response => {
      // console.log(response.data);
      this.setState({ employee: response.data });
    });


    let result = this.state.employee;
    this.state.data = result
    // for (var i =1 ; i < result.length ; i++){
    //  this.setState({ data: [...this.state.data, result[i]] }) ;

    // };
    console.log(this.state.data);

  }

  handleOpenModal = async () => {
    console.log(this.state.token);
    this.setState({ showuserModal: true });
    await axios.get(`${TRELLO_API}/verify`, {
      headers: {
        'Authorization': `Basic ${this.state.token}`
      }
    }).then(res => {
      console.log(res)
      this.setState(res.data);
    });
  }


  handleOpenEmployeeModal = async () => {
    console.log(this.state.token);
    this.setState({ showModal: true });

  }

  handleCloseModal() {
    this.setState({ showuserModal: false });
    this.setState({ showModal: false });
    this.setState(null)
  }
  getCourse = async (inputEmail) => {
    //this.setState({showModal:false});
    console.log(inputEmail);
    let userEmail = {
      email: inputEmail
    }
    this.setState({ userEmail });
    console.log(userEmail);
    await axios.post(`${TRELLO_API}/courses`, { userEmail }).then(res => {

      this.setState({ courses: res.data });
    })
    let courseValue = this.state.courses;
    this.state.value = courseValue;
    console.log(this.state.value);
    if (courseValue) {
      this.setState({ showModal: false });
    }
    else {

    }
  }

  assignCourse = async (course) => {
    console.log(course);
    let emailId = this.state.userEmail;
    await axios.put(`${TRELLO_API}/assign`, { emailId, course }).then(res => {
      console.log(res);
      window.location.reload();
    })
  }

  logout = async () => {
    console.log(this.state.token)
    window.localStorage.clear();
    this.props.history.push('/');
    console.clear();
  }

  render() {
    let { showuserModal } = this.state;
    let { showModal } = this.state;
    let res = this.state;

    return (
      <React.Fragment>
        <Header />
        <section className="page container">
          <h1>
            Boards{' '}
            <br></br>
            <div>
              <Button color="btn btn-success" style={{ "marginLeft": "2%" }} onClick={this.handleOpenModal}>
                Check Profile
          </Button>
              <Button color="btn btn-warning" style={{ "marginLeft": "10%" }} onClick={this.handleOpenEmployeeModal}>
                Employee Details
          </Button>
              <Button color="btn btn-danger" onClick={this.logout} style={{ "marginLeft": "52%" }}>
                Logout
          </Button>


            </div>

            <Modal
              open={showModal}
              className="Modal"
              overlayClassName="Overlay"
              contentLabel="Inline Styles Modal Example"
              onClose={this.closeModal}>

              <div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Designation</th>
                      <th>Manager</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.data !== undefined ? this.state.data.map((element, i) =>
                      <tr key={i}>
                        <th>{element.name}</th>
                        <td >{element.email}</td>
                        <td>{element.role}</td>
                        <td>{element.manager} </td>
                        <td><input className="btn btn-sm  btn-success" disabled={this.state.isLoading} type="submit" value="Get Course" onClick={this.getCourse.bind(this, element.email)} >
                        </input>
                        </td>
                      </tr>

                    ) : null}

                  </tbody>
                </table>
              </div>
              {/* <div className="closeModal"><Button color= "btn btn-sm btn-danger" onClick={this.handleCloseModal}>Close Modal</Button></div> */}

            </Modal>


            {this.state.value !== undefined ? this.state.value.map((element) =>
              <div className="card-layout">

                <div className="card">
                  <div className="column" style={{ "backgroundColor": "#fdedd4", "paddingTop": "10px" }}>
                    <Image className="card-img-top" src={element.image_480x270} alt="Card image cap" responsive />
                    <div className="card-body">
                      <h2 className="card-title" >{element.title}</h2>
                      {/* <CardSubtitle>{element.url}</CardSubtitle> */}
                      {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                      <hr style={{ "height": "2px", "backgroundColor": "grey", "color": "grey" }}></hr>
                      <button className="btn btn-success" style={{ "marginBottom": "5px" }} onClick={this.assignCourse.bind(this, element)}>Assign Course</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <br></br>
          </h1>

          <Modal
            open={showuserModal}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel="Inline Styles Modal Example"
            onClose={this.closeModal}>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Manager</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="text" value={res.name} ></input></td>
                    <td><input type="text" value={res.email} ></input></td>
                    <td><input type="text" value={res.role} /></td>
                    <td><input type="text" value={res.manager} /></td>
                  </tr>
                </tbody>
              </Table>
            </div>

            {/* <div className="closeModal"> <Button color= "btn btn-danger" onClick={this.handleCloseModal}>Close Modal</Button></div> */}
          </Modal>

        </section>
      </React.Fragment>
    );
  }
}

export default ManagerDashboard;