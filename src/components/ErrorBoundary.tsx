import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    console.error('❌ ErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('❌ ErrorBoundary componentDidCatch:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const pathname = window.location.pathname;

      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#fee',
          padding: '20px',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            border: '3px solid #dc2626'
          }}>
            <h1 style={{ color: '#dc2626', marginTop: 0, fontSize: '24px' }}>
              ❌ Application Error
            </h1>

            <div style={{ marginBottom: '20px' }}>
              <strong>Current Route:</strong>
              <div style={{
                backgroundColor: '#f3f4f6',
                padding: '10px',
                borderRadius: '4px',
                marginTop: '5px'
              }}>
                {pathname}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong>Error Message:</strong>
              <div style={{
                backgroundColor: '#fef2f2',
                padding: '10px',
                borderRadius: '4px',
                marginTop: '5px',
                color: '#991b1b',
                fontWeight: 'bold'
              }}>
                {error?.message || 'Unknown error'}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong>Error Stack:</strong>
              <pre style={{
                backgroundColor: '#1f2937',
                color: '#fff',
                padding: '15px',
                borderRadius: '4px',
                marginTop: '5px',
                overflow: 'auto',
                maxHeight: '300px',
                fontSize: '12px'
              }}>
                {error?.stack || 'No stack trace available'}
              </pre>
            </div>

            {errorInfo && errorInfo.componentStack && (
              <div style={{ marginBottom: '20px' }}>
                <strong>Component Stack:</strong>
                <pre style={{
                  backgroundColor: '#1f2937',
                  color: '#fbbf24',
                  padding: '15px',
                  borderRadius: '4px',
                  marginTop: '5px',
                  overflow: 'auto',
                  maxHeight: '300px',
                  fontSize: '12px'
                }}>
                  {errorInfo.componentStack}
                </pre>
              </div>
            )}

            <div style={{ marginTop: '30px' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginRight: '10px'
                }}
              >
                🔄 Reload Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🏠 Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
