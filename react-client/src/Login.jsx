import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit() {
    $.ajax({
      url: '/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({email: this.state.email, password: this.state.password}),
      success: (data) => {
        this.postLogin(data);
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  changeView() {
    this.props.changeView('Signup')
  }

  postLogin(data) {
    this.props.getUsername(data);
    this.props.changeView('UserHome');
  }

  render() {
    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
              <div><Icon name ='film' /> <Icon name='child' /> WatchBuddy</div>
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input onChange={this.handleEmailChange.bind(this)}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input onChange={this.handlePasswordChange.bind(this)}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />

                <Button color='green' fluid size='large' onClick={this.handleSubmit.bind(this)}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a onClick={this.changeView.bind(this)}>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Login;