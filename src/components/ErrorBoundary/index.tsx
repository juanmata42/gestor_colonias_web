import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTE_PATH } from '../../routes';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
    }, () => {
      if (window.location.hostname === 'localhost') {
        console.error('<----- ERROR ---->');
        console.error(error ? error.toString() : '');
        console.error(errorInfo.componentStack);
      } else {
        /* TODO: MAKE API CALL TO SEND LOG VIA EMAIL */
        /* createLog({
          sysURL: window.location.origin,
          currentPath: window.location.href,
          navigator: window.navigator.userAgent,
          error: error ? error.toString() : '',
          errorInfo: errorInfo.componentStack,
        }); */
      }
    });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Redirect to={`${ROUTE_PATH.ERROR}/500`} />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
