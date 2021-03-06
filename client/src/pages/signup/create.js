import React from 'react';
import { Redirect } from 'react-router-dom';

import { Step, Stepper, StepLabel, StepButton, StepContent } from 'material-ui/Stepper';

import StepOne from './steps/stepOne';
import StepTwo from './steps/stepTwo';
import StepThree from './steps/stepThree';
import StepFour from './steps/stepFour';

import AJAX from '../../ajax.js';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {},
      finished: false,
      stepIndex: 0,
      type: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      biography: '',
      qualification: '',
      goals: '',
      gyms: '',
      image_url: '',
      location: ''
    };
    this.selectProfileType = this.selectProfileType.bind(this);
    this.stepTwoUpdater = this.stepTwoUpdater.bind(this);
    this.stepThreeUpdater = this.stepThreeUpdater.bind(this);
    this.stepFourUpdater = this.stepFourUpdater.bind(this);
  }

  componentWillMount() {
    AJAX.get('/session', {}, (session) => {
      this.setState({session: session});
    });
  }

  selectProfileType(type) {
    this.setState({
      type,
      stepIndex: 1
    });
  }

  stepTwoUpdater(options) {
    const { firstName, lastName, biography, phoneNumber, location } = options;
    let stepIndex = 3;
    if (this.state.type === 'trainer') {
      stepIndex = 2;
    }
    this.setState({
      firstName,
      lastName,
      biography,
      phoneNumber,
      location,
      stepIndex: stepIndex
    });
  }

  stepThreeUpdater(options) {
    const { qualification, goals } = options;
    this.setState({
      qualification,
      goals,
      stepIndex: 3
    });
  }

  stepFourUpdater(options) {
    const { gyms, image_url } = options;
    this.setState({
      gyms,
      image_url,
      finished: true
    });
  }

  render() {

    const { stepIndex, type, session, finished } = this.state;

    if (finished === true) {
      var options = {
        biography: this.state.biography,
        first: this.state.firstName,
        goals: this.state.goals,
        gyms: this.state.gyms,
        image_url: this.state.image_url,
        id: this.state.session.id,
        last: this.state.lastName,
        location: this.state.location,
        phone: this.state.phoneNumber,
        qualification: this.state.qualification,
        type: this.state.type
      };
      AJAX.put('/ihateandy2', options, (result) => {
        window.location.pathname = '/dashboard';
      });
    }

    return (

      <div className="col-sm-8 col-sm-offset-2" style={{
        height: '94.8%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
      }}>

        <div style={{maxWidth: '800px', maxHeight: '800px'}}>
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onClick={() => this.setState({stepIndex: 0, finished: false})}>
                Choose Account Type
              </StepButton>
              <StepContent>
                <StepOne select={this.selectProfileType}/>
              </StepContent>
            </Step>
            <Step>
              {
                this.state.type === '' ?
                  <StepLabel>
                    Basic Info
                  </StepLabel> :
                  <StepButton onClick={() => this.setState({stepIndex: 1, finished: false})}>
                    Basic Info
                  </StepButton>
              }
              <StepContent>
                <StepTwo updateInfo={this.stepTwoUpdater} profileType={type}/>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>
                <span style={{fontStyle: 'italic'}}>Trainers Only</span>
              </StepLabel>
              <StepContent>
                <StepThree updateInfo={this.stepThreeUpdater}/>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>
                Profile Picture &
              </StepLabel>
              <StepContent>
                <StepFour session={session} updateInfo={this.stepFourUpdater}/>
              </StepContent>
            </Step>
          </Stepper>
        </div>

      </div>

    );

  }
}

export default Create;