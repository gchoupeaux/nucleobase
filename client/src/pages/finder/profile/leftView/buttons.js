import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import EmailDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AJAX from '../../../../ajax.js';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenEmail = this.handleOpenEmail.bind(this);
    this.state = {
      text: '',
      openEmail: false
    };
  }

  handleOpenEmail() {
    this.setState({openEmail: true, text: ''});
  }

  handleCloseEmail() {
    this.setState({openEmail: false, text: ''});
  }

  // semd email
  handleSendEmail() {
    this.setState({openEmail: false});

    AJAX.post('/messages', {

      // user 
      sender: this.props.session.id, 
      senderDisplay: this.props.session.first, 
      senderEmail: this.props.session.email,

      // trainer
      receiver: this.props.profile.id, 
      receiverDisplay: this.props.profile.first, 
      receiverEmail: this.props.profile.email, 

      // message
      message: this.state.text

    }, (data) =>{
      console.log(data);
    });

  }

  // email 
  handleChange(e) {
    this.setState({text: e.target.value});
  } 


  render() {

    const sendEmail = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.handleCloseEmail.bind(this)}
      />,
      <FlatButton
        label="Send"
        primary={true}
        onClick={this.handleSendEmail.bind(this)}
      />
    ];

    return (

      <div style={{
        height: '100px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <RaisedButton 
          label='Contact Me'
          labelColor="#ffffff"
          backgroundColor="#f44336"
          onClick={this.handleOpenEmail}
        />

        <EmailDialog
          actions={sendEmail}
          modal={true}
          open={this.state.openEmail}
        >
          <h4>Message</h4>
          <TextField hintText='your message'
            floatingLabelText="Email"
            multiLine={true}
            onChange={this.handleChange.bind(this)}
            value={this.state.text}
          />
        </EmailDialog>

      </div>

    );

  }
}

export default Buttons;