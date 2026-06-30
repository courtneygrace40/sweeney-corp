
import './App.css';
// src/App.jsx
import Login from './components/Login.js'; // Adjust the path depending on where your file is
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
function App() {
  return (
    <AuthProvider>
    <div className="app-container">
      {/* Rendering your login component here */}
      <Login />
    </div>
    </AuthProvider>
  );
}

export default App;
