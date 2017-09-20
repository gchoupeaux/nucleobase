import {List, ListItem, makeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import React from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Star from 'material-ui/svg-icons/toggle/star';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarRatingComponent from 'react-star-rating-component';
import AJAX from '../../../../ajax.js';

class Affiliations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rating: 1,
      reviewedId: 0,
      review: ''
    };
  }

  handleOpen(id) {
    this.setState({
      open: !this.state.open,
      reviewedId: id
    });
  }

  handleClose() {
    this.setState({
      open: !this.state.open
    });

    //select * from ratings where user_id=24 and trainer_id=receiver: this.state.session.id;
    AJAX.get('/ratings', {user_id: this.props.session.id, trainer_id: this.state.reviewedId}, (data) => {

      if (data.length) {
        //update
        AJAX.put('/ratings', {

          id: data[0].id,
          // value between 1-5
          user_rating: this.state.rating,
          // not used
          trainer_rating: 0,

        }, () => {});

      } else {
        //create
        AJAX.post('/ratings', {

          // user_id => rater can be user or trainer
          user_id: this.props.session.id,
          // trainer_id => rated person can be a user or a trainer 
          trainer_id: this.state.reviewedId, 
          // value between 1-5
          user_rating: this.state.rating,
          // not used
          trainer_rating: 0,

        }, () => {});
      }
    });


    AJAX.post('/reviews', {
      // user_id => reviewer can be trainee or trainer
      user_id: this.props.session.id,
      // trainer_id => reviewee person can be a trainee or a trainer 
      trainer_id: this.state.reviewedId, 
      // value between 1-5
      review: this.state.review
    }, () => {});

  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleReviewChange(event) {
    this.state.review = event.target.value;
  }

  render() {
    const action = [
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];

    const userElement = (user, index) => (
      <ListItem
        key={index}
        leftAvatar={
          <Avatar src={
            user.image_url ||
            'https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg'
          }/>
        }
      >
        {user.first + ' ' + user.last}
        <FlatButton hoverColor='red' label='add review' onClick={this.handleOpen.bind(this, user.id)} fullWidth={false} style={{marginLeft: '20px'}}></FlatButton>
        <Dialog
          actions={action}
          modal={true}
          open={this.state.open}
        >
          <h4>Your review</h4><br/>
          <div>
            <StarRatingComponent 
                name='star'
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)}
            />
            <h4>
              {this.state.rating < 5 ? this.state.rating < 4 ? this.state.rating < 3 ? this.state.rating < 2 ? 'Meh, I experienced better.' : 'I may not book the second one with this trainer.' : 'A-Ok.' : 'Yay! I am a fan.' : 'Woohoo! This tranier is awsome!'}
            </h4>
          </div>
          <TextField hintText='Please write a review'
            floatingLabelText="Your review"
            fullWidth={true}
            multiLine={true}
            onChange={this.handleReviewChange.bind(this)}
          /><br/>
        </Dialog>
      </ListItem>
    );

    return (
      <List>
        <Subheader>{
          this.props.trainers.length ?
          'My Trainers' :
          ''
        }
        </Subheader>
          <div>{
            this.props.trainers.map((trainer, index) => userElement(trainer, index))
          }
          </div>
        <Subheader>{
          this.props.trainees.length ?
          'My Trainees' :
          ''
        }
        </Subheader>
          <div>{
              this.props.trainees.map((trainee, index) => userElement(trainee, index))
          }
          </div>
      </List>
    );
  }
}


export default Affiliations;