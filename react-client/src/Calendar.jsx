import React, { Component } from 'react';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }



  render() {
    return (<Transition animation='fade up' duration={1000} transitionOnMount={true}>
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>
          {`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}
        </style>
        <div>
              <img src={'./images/googlesignin.png'}  />
            </div>
        </div>
      </Transition>)
    }
} 

export default Calendar;