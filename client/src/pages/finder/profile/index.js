import React from 'react';

import Paper from 'material-ui/Paper';

import CancelBar from './cancelBar';
import TrainerProfile from './leftView';
import Appointments from './rightView';


class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (

      <Paper zDepth={5} style={{
        height: '96%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>

        <CancelBar toggle={this.props.toggle} />

        <div style={{
          height: '95.5%',
          width: '100%',
          margin: '0',
        }}> 

          <TrainerProfile profile={this.props.profile} session={this.props.session}/>

          <Appointments profile={this.props.profile} session={this.props.session}/>

        </div>

      </Paper>

    );

  }
}

export default Profile;