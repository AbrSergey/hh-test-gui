import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import User from './components/User/Main';
import ErrorBoundry from './components/ErrorBoundry/Main';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootStyle = {
      backgroundColor: '#F0F0F0',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }

    return (
      <ErrorBoundry>
        <div style={rootStyle}>
          <Container>
            <User/>
          </Container>
        </div>
      </ErrorBoundry>
    );
  }
}

export default App;