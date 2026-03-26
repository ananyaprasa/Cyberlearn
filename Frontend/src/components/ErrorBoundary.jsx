import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('🚨 ErrorBoundary caught an error:', error);
    console.error('🚨 Error info:', errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          background: '#0a0a0a',
          color: '#e0e0e0',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#ff4444', marginBottom: '20px' }}>
            🚨 Something went wrong
          </h1>
          
          <div style={{
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '600px',
            marginBottom: '20px'
          }}>
            <h3>Error Details:</h3>
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              fontSize: '12px',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '10px',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {this.state.error && this.state.error.toString()}
              {this.state.errorInfo.componentStack}
            </pre>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p>This error has been logged to the console.</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#2dd68f',
                color: '#0a0a0a',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                margin: '10px'
              }}
            >
              Reload Page
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                background: '#ff4444',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                margin: '10px'
              }}
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;