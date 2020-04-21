import React from 'react';
//import { Button } from 'react-bootstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Table,Button
} from 'reactstrap';

import autoBind from 'auto-bind';
import ReactModal from 'react-modal';
import axios from 'axios';
import {TRELLO_API} from '../utils/constants'
class Boards extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.el = document.createElement('div');
    
    this.state = {
      showModal: false,
      token : window.localStorage.getItem('token')
      
    };
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
        this.setState(res.data[0]); 
     });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  logout = async()=>{
    console.log(this.state.token)
        window.localStorage.clear();
        this.props.history.push('/');
  }

  render() {
    let { match } = this.props;
    let { showModal } = this.state;
    let res = this.state;
    console.log(res)
    return (
      <section className="page container">
        <h1>
          Boards{' '}
          <Button color="primary" onClick={this.handleOpenModal}>
            Check Profile
          </Button>
          <div><Button color="secondary" onClick={this.logout}>
            Logout
          </Button>
          </div>
          
         
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
          isOpen={showModal}
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
         
         
          <Button color= "primary" onClick={this.handleCloseModal}>Close Modal</Button>
        </ReactModal>
        
      </section>
    );
  }
}

export default Boards;


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