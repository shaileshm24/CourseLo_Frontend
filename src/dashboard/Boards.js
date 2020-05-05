import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React from 'react';
import {Image } from 'react-bootstrap';
import {
 Table,Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from '../components/userheader.js';
import autoBind from 'auto-bind';
import ReactModal from 'react-modal';
import axios from 'axios';
import {TRELLO_API} from '../utils/constants';
import {udemy} from '../utils/constants';

class Boards extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.el = document.createElement('div');
    
    this.state = {
      showModal: false,
      showCourse:false,
      token : window.localStorage.getItem('token'),
      course:{
        title: '',
        url: '',
        image_480x270: ''
      }
      
    };
    this.closeModal = this.closeModal.bind(this);
    this.showCourse = this.showCourse.bind(this);
  }

  showCourse=()=>{
    this.setState({
      showCourse:false
    })
  }
  closeModal(){
    this.setState({
      showModal:false
    })
  }

  handleOpenModal= async() =>{
    console.log(this.state.token);
    this.setState({ showModal: true });
    await axios.get(`${TRELLO_API}/verify`, {
      headers: {
        'Authorization': `Basic ${this.state.token}`
      }
    }).then(res => {
      console.log(res)
        this.setState(res.data);
        this.setState({showCourse:true});
        //this.setState({course:res.data.course}) 
     });
  }

  getCourse (url) {
    window.open(udemy+url);
  }

  courseData =async ()=>{
    this.setState({showModal:false});
    await axios.get(`${TRELLO_API}/verify`, {
      headers: {
        'Authorization': `Basic ${this.state.token}`
      }
    }).then(res => {
      console.log(res);
        this.setState({course:res.data.course});
       
     });

  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  logout = async()=>{
    console.log(this.state.token)
        window.localStorage.clear();
        this.props.history.push('/');
        console.clear();
  }

  render() {
    let { showModal} = this.state;
    let res = this.state;
    let course = this.state.course;
    var divStyle = {
      display:this.state.showCourse?'block':'none'
    };
    // let course = res.course;
//console.log("course.image_480x270,==============,course.title,==============,course.url",course.title);
    return (
      <React.Fragment>
      <Header/>
      <section className="page container">
        <h1>
          Boards{' '}
          <br></br>
          <Button color="btn btn-success" style={{"marginLeft":"2%"}} onClick={this.handleOpenModal}>
            Check Profile
          </Button>
         
           <Button color="btn btn-danger" style={{"marginLeft":"50%"}} onClick={this.logout}>
            Logout
          </Button>       
        </h1>

        <Modal
          open={showModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Inline Styles Modal Example"
          onClose={this.closeModal}>
          <div>
            <Table>
              <thead>
                  <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Manager</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td><input type="text" value={res.name} ></input></td>
                  <td><input type="text" value={res.role} /></td>
                  <td><input type="text" value={res.manager} /></td>
                  <td><input type="text" value={res.email} /></td>

                </tr>
                </tbody>
            </Table>
           
                  
            </div>
            {/* <Button className="closeModal" color="btn btn-success" onClick={this.courseData}>Your Course</Button> */}
            {/* <div className="closeModal"><Button color= "btn btn-danger" onClick={this.handleCloseModal}>Close Modal</Button></div> */}
        </Modal>
        
        <div style={divStyle}>  
        <h2>Your Course</h2>             
        <div  className = "card-layout" >
        <div className="card" >
        <div className = "column" style={{ "backgroundColor" : "#fdedd4" ,"paddingTop":"10px" }}> 
        <Image className="card-img-top" src= {course.image_480x270} alt="Card image cap" responsive />
        <div className="card-body">
          <h3 className= "card-title" >Title:-  {course.title}</h3>
          <hr style = {{"height":"2px","backgroundColor":"green","color":"green"}}></hr>
          <Link to="#" style={{"fontSize":"20px","color":"green"}} onClick={this.getCourse.bind(this,course.url)}>Get Course Here</Link>
       </div>
       </div>
        </div>
        </div>
        </div>
      </section>
      </React.Fragment>
    );
  }
}

export default Boards;
