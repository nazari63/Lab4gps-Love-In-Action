// src/App.js

import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { LangProvider } from './components/Context/LangContext';
import { ModalProvider } from './components/Context/ModalContext'; // Import ModalProvider
import { AuthProvider } from './components/Context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Chatbot from './components/Chatbot/Chatbot'; // Import the Chatbot component

// Import Auth Components
import Login from './components/Auths/Login';
import Signup from './components/Auths/Signup';
import ForgotPassword from './components/Auths/ForgotPassword';
import AdvancedUserProfile from './components/Auths/AdvancedUserProfile';
import SubmitProblem from './components/ProblemAlert/SubmitProblem';
import LoginHeader from './components/Navbar/LoginHeader'; // Import LoginHeader

// Import ProtectedRoute
import ProtectedRoute from './protect/ProtectedRoute';

// Lazy-loaded components
const About = lazy(() => import('./pages/About/About'));
const Purpose = lazy(() => import('./pages/About/Purpose'));
const Mission = lazy(() => import('./pages/About/Mission'));
const Vision = lazy(() => import('./pages/About/Vision'));
const CoreValues = lazy(() => import('./pages/About/CoreValues'));
const WhoWeAre = lazy(() => import('./pages/About/WhoWeAre'));

// Import Globe.js as a lazy-loaded component
const Globe = lazy(() => import('./components/Globe/Globe')); // Ensure the correct path to Globe.js

// const NotFound = lazy(() => import('./pages/NotFound')); // Optional

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <LangProvider>
        <ModalProvider> {/* Wrap the application with ModalProvider */}
          <Router>
            <AppContent /> {/* Separate component to use hooks */}
          </Router>
        </ModalProvider>
      </LangProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();

  // Define routes where Navbar and Footer should be hidden
  const excludeLayoutRoutes = ['/login-header'];

  // Determine if the current path is in the exclude list
  const shouldHideLayout = excludeLayoutRoutes.includes(location.pathname);

  // Determine if current route is '/login-header' to add padding
  const isLoginHeader = location.pathname === '/login-header';

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {!shouldHideLayout && <Navbar />}

      {/* Main Content with Suspense for Lazy-Loaded Components */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className={isLoginHeader ? 'main-content with-header-padding' : 'main-content'}>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Globe Route (Public) */}
            <Route path="/globe" element={<Globe />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<AdvancedUserProfile />} />

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
                    <Globe /> {/* Render Globe.js below LoginHeader */}
                  </>
                </ProtectedRoute>
              }
            />

            {/* Redirect "/about-us" to "/about" for consistency */}
            <Route path="/about-us" element={<Navigate to="/about" replace />} />

            {/* About Routes with Nested Sub-Routes */}
            <Route path="/about" element={<About />}>
              {/* Default Sub-Route: Redirect "/about" to "/about/purpose" */}
              <Route index element={<Navigate to="purpose" replace />} />

              {/* Sub-Pages */}
              <Route path="purpose" element={<Purpose />} />
              <Route path="mission" element={<Mission />} />
              <Route path="vision" element={<Vision />} />
              <Route path="corevalues" element={<CoreValues />} />
              <Route path="whoweare" element={<WhoWeAre />} />

              {/* Optional: Handle Undefined Sub-Routes */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>

            {/* Optional: Handle Undefined Routes */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Suspense>

      {/* Conditionally render Footer */}
      {!shouldHideLayout && <Footer />}

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
