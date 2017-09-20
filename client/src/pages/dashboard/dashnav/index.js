import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import AJAX from '../../../ajax.js';

class DashNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionType: { } 
    };
  }

  componentWillMount() {
    // current user
    AJAX.get('/session', {}, (session) => {
      this.setState({ sessionType: session.type});
    });
  }

  render() {

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}>
        <span style={{width: '100%', height: '2px', backgroundColor: '#cee61f'}}></span>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#4DC1EA'
        }}>
          <Link to="/dashboard/schedule"><FlatButton label="Schedule" style={{color: 'white'}} hoverColor="#2b3c55"/></Link>
          <Link to="/dashboard/trainers"><FlatButton label={this.state.sessionType === 'trainer' ? 'My Trainees' : 'My Trainers'} style={{color: 'white'}} hoverColor="#2b3c55"/></Link>
          <Link to="/dashboard/profile"><FlatButton label="Profile" style={{color: 'white'}} hoverColor="#2b3c55"/></Link>
        </div>
      </div>
    );

  }
}

export default DashNav;