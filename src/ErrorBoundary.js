import React, { Component } from 'react';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: undefined
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      message: error.message
    });
  }

  render() {
    const { hasError, message } = this.state;

    if (hasError) {
      return (
        <div className="ErrorBoundary">
          {message}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
