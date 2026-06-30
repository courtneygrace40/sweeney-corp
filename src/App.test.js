// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

describe('Sweeney Corp Main App', () => {
  
  test('renders the login screen for unauthenticated users', () => {
    // Wrap the app in your AuthContext to provide state
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
    
    // Look for a specific element on your Login page
    const loginHeader = screen.getByRole('heading', { name: /login/i });
    expect(loginHeader).toBeInTheDocument();
  });

});