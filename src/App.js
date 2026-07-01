
import { useEffect } from 'react';
import './App.css';
// src/App.jsx
import Login from './components/Login.js'; // Adjust the path depending on where your file is
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
function App() {
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const loadClaims = async () => {
      const {
        data: { claims },
      } = await supabase.auth.getClaims();
      setClaims(claims);
    }
    
    loadClaims();

    const {
      data : { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadClaims();
    })

    return () => subscription.unsubscribe();
    }, []);

  return (
    <AuthProvider>
    <div className="app-container">
      {!claims ? <Auth /> : <Account key={claims.sub} claims={claims} />}
      <Login />
    </div>
    </AuthProvider>
  );
}

export default App;
