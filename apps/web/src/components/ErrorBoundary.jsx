import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Algo deu errado</h2>
            <button onClick={() => window.location.reload()} className="text-yellow-400 underline">
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
