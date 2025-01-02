// src/App.js

import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

// Context Providers
import { LangProvider } from './components/Context/LangContext';
import { ModalProvider } from './components/Context/ModalContext';
import { AuthProvider } from './components/Context/AuthContext';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Chatbot from './components/Chatbot/Chatbot'; 
import Login from './components/Auths/Login';
import Signup from './components/Auths/Signup';
import ForgotPassword from './components/Auths/ForgotPassword';
import AdvancedUserProfile from './components/Auths/AdvancedUserProfile';
import SubmitProblem from './components/ProblemAlert/SubmitProblem';
import LoginHeader from './components/Navbar/LoginHeader';
import ProtectedRoute from './protect/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; 

// Import your new Message component (place it at the top with other imports)
import Message from './components/message/message'; // Adjust path if necessary

// Lazy-loaded components
const About = lazy(() => import('./pages/About/About'));
const Purpose = lazy(() => import('./pages/About/Purpose'));
const Mission = lazy(() => import('./pages/About/Mission'));
const Vision = lazy(() => import('./pages/About/Vision'));
const CoreValues = lazy(() => import('./pages/About/CoreValues'));
const WhoWeAre = lazy(() => import('./pages/About/WhoWeAre'));

// Lazy-loaded Globe.js
const Globe = lazy(() => import('./components/Globe/Globe'));

// Lazy-load MainDashboard
const MainDashboard = lazy(() => import('./components/Dashboard/MainDashboard'));

function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <ModalProvider>
          <Router>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </Router>
        </ModalProvider>
      </LangProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();

  // Define routes where Navbar and Footer should be hidden
  const excludeLayoutRoutes = ['/dashboard', '/globe', '/message'];

  // Determine if the current path is in the exclude list
  const shouldHideLayout = excludeLayoutRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="App">
      {!shouldHideLayout && <Navbar />}

      <Suspense fallback={<div>Loading...</div>}>
        <div className="main-content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Globe Route (Protected) */}
            <Route
              path="/globe"
              element={
                <ProtectedRoute>
                  <LoginHeader />
                  <Globe />
                </ProtectedRoute>
              }
            />

            {/* Dashboard Route (Protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <LoginHeader />
                  <MainDashboard />
                </ProtectedRoute>
              }
            />

            {/* Auth Routes (Unauthenticated) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Submit Problem Route (Protected) */}
            <Route
              path="/submit-problem"
              element={
                <ProtectedRoute>
                  <SubmitProblem />
                </ProtectedRoute>
              }
            />

            {/* LoginHeader Route (Protected) */}
            <Route
              path="/login-header"
              element={
                <ProtectedRoute>
                  <>
                    <LoginHeader />
                    <Globe />
                  </>
                </ProtectedRoute>
              }
            />

            {/* NEW: Message Page (Protected) */}
            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  {/* Hide default Navbar & Footer, but show a LoginHeader */}
                  <LoginHeader />
                  <Message />
                </ProtectedRoute>
              }
            />

            {/* Redirect "/about-us" to "/about" for consistency */}
            <Route path="/about-us" element={<Navigate to="/about" replace />} />

            {/* About Routes with Nested Sub-Routes */}
            <Route path="/about" element={<About />}>
              {/* Default Sub-Route */}
              <Route index element={<Navigate to="purpose" replace />} />
              <Route path="purpose" element={<Purpose />} />
              <Route path="mission" element={<Mission />} />
              <Route path="vision" element={<Vision />} />
              <Route path="corevalues" element={<CoreValues />} />
              <Route path="whoweare" element={<WhoWeAre />} />
            </Route>
          </Routes>
        </div>
      </Suspense>

      {!shouldHideLayout && <Footer />}

      <Chatbot />
    </div>
  );
}

export default App;
