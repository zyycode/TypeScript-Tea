import React from 'react';

interface IProps {
  content: string;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('组件崩溃 Error', error);
    console.log('组件崩溃 Info', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.content;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
