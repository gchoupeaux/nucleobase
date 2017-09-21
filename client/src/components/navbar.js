import React from 'react';
import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';


const Navbar = (props) => (

  <Paper zDepth={1} style={{
    height: '50px',
    minWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000a12'
  }}>
    
    <div className="col-sm-8 col-sm-offset-2" style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>

      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        overflowX: 'visible',
      }}>
        <img src='/logo.png'></img>
      </div>

      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        {
          typeof props.session === 'object' && props.session.type !== null && props.session.type !== 'trainer' ?
            <div>
              <Link to="/"><FlatButton label="Search" style={{color: 'white'}} hoverColor="#4f5b62"/></Link>
              <span style={{width: '30px'}}></span>
              <Link to="/dashboard/profile"><FlatButton label="Dashboard" style={{color: 'white'}} hoverColor="#4f5b62"/></Link>
            </div> :
            <span></span>
        }
      </div>

      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        {
          typeof props.session === 'object' ?
            <div>
              <a href="/logout"><FlatButton label="Logout" style={{color: 'white'}} hoverColor="#f44336"/></a>
            </div> :
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <span style={{width: '30px'}}></span>
              <Link to="/signup"><FlatButton label="Signup" style={{color: 'white'}} hoverColor="#4f5b62"/></Link>
              <span style={{width: '30px'}}></span>
              <Link to="/login"><FlatButton label="Login" style={{color: 'white'}} hoverColor="#4f5b62"/></Link>
            </div>
        }

        
      </div>

    </div>

  </Paper>

);

export default Navbar;

//<span style={{fontSize: '20px', color: '#f44336'}}> TRAINER FINDER</span>

