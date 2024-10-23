import React from 'react';
import { history} from '../../App'

/** для редиректа на /auth при неотловленной ошибке */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  // }
  
  render() {
    if (this.state.hasError) {
      history.push('/auth')
    }

    return this.props.children; 
  }
}