import React from 'react';
//import { Button } from 'react-bootstrap';
import {
 Table,Button
} from 'reactstrap';
import Header from '../components/userheader.js';

import autoBind from 'auto-bind';
import ReactModal from 'react-modal';
import axios from 'axios';
import {TRELLO_API} from '../utils/constants'
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
      showuserModal: false,
      showModal:false,
      token : window.localStorage.getItem('token'),
      res:'',
      employee:{
        response:[]
      }    
    };
   
  }
  componentDidMount = async () =>{

    await axios.get(`${TRELLO_API}/employees`, {
      headers: {
        'Authorization': `Basic ${this.state.token}`
      }
    }).then(response => {
       // console.log(response.data);
        this.setState({employee:response.data}); 
     });


    let result = this.state.employee;
     this.state.data = result
    // for (var i =1 ; i < result.length ; i++){
    //  this.setState({ data: [...this.state.data, result[i]] }) ;
     
    // };
    console.log(this.state.data);

  
  }
 
  handleOpenModal= async() =>{
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


  handleOpenEmployeeModal= async() =>{
    console.log(this.state.token);
    this.setState({ showModal: true });
    
  }

  handleCloseModal() {
    this.setState({ showuserModal: false });
    this.setState({ showModal: false });
    this.setState(null)
  }
  getCourse = async () =>{
    let userEmail = {
      email: "nikhil@gmail.com"
    }
    await axios.post(`${TRELLO_API}/courses`,{userEmail}).then(res =>{
      console.log(res);
    })
  }
  logout = async()=>{
    console.log(this.state.token)
        window.localStorage.clear();
        this.props.history.push('/');
        console.clear();
  }

  render() {
    let { match } = this.props;
    let { showuserModal } = this.state;
    let { showModal } = this.state;
    let res = this.state;
   
    return (
      <React.Fragment>
      <Header/>
      <section className="page container">
        <h1>
          Boards{' '}
          <br></br>
          <div>
          <Button color="btn btn-success" style={{"marginLeft":"2%"}} onClick={this.handleOpenModal}>
            Check Profile
          </Button>        
          <Button color="btn btn-warning" style={{"marginLeft":"10%"}} onClick={this.handleOpenEmployeeModal}>
            Employee Details
          </Button>
          <Button color="btn btn-danger" onClick={this.logout} style={{"marginLeft":"50%"}}>
            Logout
          </Button>
         
        
          </div>
          
          <ReactModal
          isOpen={showModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Inline Styles Modal Example">
            
            <div>
          <Table>
      <thead>
        <tr>
          <th>No</th>
          <th>Email</th>
          <th>Designation</th>
          <th>Manager</th>
          <th></th>
        </tr>
      </thead>
     
      <tbody>
      {this.state.data !== undefined ? this.state.data.map(element => 
                 <tr>
          <th scope="row"></th>
          <td><input type="text" value={element.email} /></td>
          <td><input type="text" value={element.role} /></td>
          <td><input type="text" value={element.manager} /></td>
          <td><input class="btn btn-sm  btn-success" type="submit" value="Get Course" onClick={this.getCourse} /></td>
          </tr> 
       
      ): null}
       
        </tbody>
        </Table>
            </div>
           <div class="closeModal"><Button color= "btn btn-sm btn-danger" onClick={this.handleCloseModal}>Close Modal</Button></div>
          
        </ReactModal>
        
         
        </h1>
        {/*<div id="boards">
          {boards.map(b => (
            <div key={b._id} className="board">
              <Link
                to={`${match.url}/b/${b._id}/${b.slug}`}
                className="board-tile"
              >
                <div className="board-details">
                  <span className="board-title">{b.name}</span>
                </div>
              </Link>
            </div>
          ))}
          </div>*/}

        <ReactModal
          isOpen={showuserModal}
          className="Modal"
          overlayClassName="Overlay"
          contentLabel="Inline Styles Modal Example">
            
            <div>
          <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Designation</th>
          <th>Manager</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td><input type="text" value={res.email} ></input></td>
          <td><input type="text" value={res.role} /></td>
          <td><input type="text" value={res.manager} /></td>
        </tr>
        </tbody>
        </Table>
            </div>
           
            <div class="closeModal"> <Button color= "btn btn-danger" onClick={this.handleCloseModal}>Close Modal</Button></div>
        </ReactModal>
        
      </section>
      </React.Fragment>
    );
  }
}

export default ManagerDashboard;


{/* <div>
<Card>
  <CardImg top width="100%" src="/images/team.jpg" alt="Card image cap" />
  <CardBody>
    <CardTitle>{res.email}</CardTitle>
    <CardSubtitle>{res.role}</CardSubtitle>
    <CardText> 
    <p>Your Manager: <input type= "text" value = {res.manager} /></p></CardText>
  </CardBody>
</Card>
</div> */}