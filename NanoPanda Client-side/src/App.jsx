// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from "./components/AuthContext";
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Invitations from './pages/Invitations';

// PrivateRoute protects routes that require authentication
const PrivateRoute = ({ children }) => {  const { user, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/invitations"
            element={
              <PrivateRoute>
                <Invitations />
              </PrivateRoute>
            }
          />
          {/* Default route – show Home/Workspace for logged-in users */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <div className="min-h-screen flex flex-col font-sans bg-[#0a0b0e] text-white overflow-hidden">
                  <Home />
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;