import {Table, TableRow, TableBody, TableHeader, TableRowColumn, TableHeaderColumn} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import AJAX from '../../../ajax.js';
import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      received: [],
      session: {},
      sent: []
    };
  }

  componentWillMount() {
    AJAX.get('/session', {}, (session) => {
      this.setState({session: session}, () => {
        AJAX.get('/messages', {receiver: this.state.session.id}, (received) => {
          this.setState({received: received}, () => {
            AJAX.get('/messages', {sender: this.state.session.id}, (sent) => {
              this.setState({sent: sent});
            });  
          });
        });
      });
    });
  }

  render() {
    const messageElement = (message, type, index) => (
      <TableRow key={index}>
        <TableRowColumn style={{
          fontSize: 15,
          width: '20%'
        }}>
          {type + message.receiver.first}
        </TableRowColumn>
        <TableRowColumn style={{
          fontSize: 15,
          width: '80%'
        }}>
          {message.message}
        </TableRowColumn>
      </TableRow>
    );

    return (
      <div style={{
        height: '96%',
        width: '100%'
      }}>
        <div className="col-lg-3 col-sm-12" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}>
          <div className="row">
            <div className="col-lg-12 col-sm-4" style={{
              display: 'flex',
              height: '200px',
              padding: '20px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img style={{height: '100%'}} src={
                this.state.session.image_url ||
                "https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg"
              }/>
            </div>
            <div className="col-lg-12 col-sm-4" style={{
              border: 'solid',
              display: 'flex',
              height: '200px'
            }}>
              DASHBOARD
              {this.state.session.first}
            </div>
            <div className="col-lg-12 col-sm-4" style={{
              border: 'solid',
              display: 'flex',
              height: '200px'
            }}>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-sm-12" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>
          <div className="row">
            <div className="col-lg-12 col-sm-6 col-6" style={{
              border: 'solid',
              display: 'flex',
              height: '400px',
              flexWrap: 'wrap'
            }}>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn colSpan="3" style={{fontSize: 20}}>
                      Received
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>{
                  this.state.received.map((message, index) => messageElement(message, 'From: ', index))
                }
                </TableBody>
              </Table>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn colSpan="3" style={{fontSize: 20}}>
                      Sent
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>{
                  this.state.sent.map((message, index) => messageElement(message, 'To: ', index))
                }
                </TableBody>
              </Table>    
            </div>
            <div className="col-lg-12 col-sm-6 col-6" style={{
              border: 'solid',
              display: 'flex',
              height: '400px'
            }}>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;