import React, { Component } from 'react';

export default class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],

      openModal: false
    };
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          BOOM!
        </div>
      )
    }

    return this.props.children;
  }
};
