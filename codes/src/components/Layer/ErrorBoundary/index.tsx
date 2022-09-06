import React, { memo } from 'react';
import cn from 'classnames';
import scopedStyle from './index.module.css';
import type { Props, State } from './types';

const INITIAL_STATE: State = {
  hasError: false,
  errorMessage: null,
  callStack: null,
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = INITIAL_STATE;

  static getDerivedStateFromError(error: Error) {
    const errorMessage = error.message ? error.message : String(error);

    const callStack = error.stack
      ? error.stack.split('\n').slice(1).join('\n')
      : null;

    return {
      callStack,
      errorMessage,
      hasError: true,
    };
  }

  render() {
    const { children } = this.props;
    const { hasError, errorMessage, callStack } = this.state;

    if (hasError) {
      return (
        <div>
          <div className={cn(scopedStyle.errorBoundaryTitle)}>
            Oops: {errorMessage}
          </div>
          <pre className={cn(scopedStyle.errorBoundaryMessage)}>
            {callStack}
          </pre>
        </div>
      );
    }

    return children;
  }
}

export default memo(ErrorBoundary);
