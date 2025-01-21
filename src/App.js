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
import Dashboard from './pages/MembersPages/dashboard';
import Resource  from './pages/MembersPages/Resources/Resources';

// Existing components
import Message from './components/message/message'; 

// **NEW**: Import the ProblemSolver, Solution, and Workspace components
import ProblemSolver from './components/ProblemSolver/ProblemSolver';
import Solution from './components/Solution/Solution';
import Workspace from './components/Dashboard/workspace';

// Lazy-loaded components
const About = lazy(() => import('./pages/About/About'));
const Purpose = lazy(() => import('./pages/About/Purpose'));
const Mission = lazy(() => import('./pages/About/Mission'));
const Vision = lazy(() => import('./pages/About/Vision'));
const CoreValues = lazy(() => import('./pages/About/CoreValues'));
const WhoWeAre = lazy(() => import('./pages/About/WhoWeAre'));
const Globe = lazy(() => import('./components/Globe/Globe'));
const MainDashboard = lazy(() => import('./components/Dashboard/MainDashboard'));
const Notification = lazy(() => import('./components/Notification/Notification'));


// -- MEMBERS PAGES --
const MemberLanding = lazy(() => import('./pages/MembersPages/MemberLanding'));
const MemberHome = lazy(() => import('./pages/MembersPages/MemberHome'));
const InternalArchive = lazy(() => import('./pages/MembersPages/InternalArchive/InternalArchive'));
const IdeaHub = lazy(() => import('./pages/MembersPages/IdeaHub/IdeaHub'));
const MemberNews = lazy(() => import('./pages/MembersPages/MemberNews'));
const Announcements = lazy(() => import('./pages/MembersPages/Announcements/Announcements'));
const DecisionMakingSystem = lazy(() => import('./pages/MembersPages/DecisionPage/DecisionPage'));
const Feedback = lazy(() => import('./pages/MembersPages/FeedbackPage/FeedbackPage'));
const CommunityNews = lazy(() => import('./pages/MembersPages/CommunityNewsPage/CommunityNewsPage'));


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
  const excludeLayoutRoutes = [
    '/dashboard', 
    '/globe', 
    '/message', 
    '/notifications', 
    '/problem-solver', 
    '/solution',
    '/workspace' // Added '/workspace' to exclude Navbar and Footer
  ];

  // Determine if the current path is in the exclude list
  const shouldHideLayout = excludeLayoutRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
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

            {/* ProblemSolver Route (Protected) */}
            <Route
              path="/problem-solver"
              element={
                <ProtectedRoute>
                  <LoginHeader />
                  <ProblemSolver />
                </ProtectedRoute>
              }
            />

            {/* Solution Route (Protected) */}
            <Route
              path="/solution"
              element={
                <ProtectedRoute>
                  <LoginHeader />
                  <Solution />
                </ProtectedRoute>
              }
            />

            {/* **NEW**: Workspace Route (Protected) */}
            <Route
              path="/workspace"
              element={
                <ProtectedRoute>
                  <LoginHeader />
                  <Workspace />
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

            {/* Message Page (Protected) */}
            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  {/* Hide Navbar & Footer, but show LoginHeader */}
                  <LoginHeader />
                  <Message />
                </ProtectedRoute>
              }
            />

            {/* Notification Page (Protected) */}
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <LoginHeader />
                  <Notification />
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
      
               {/* -- MEMBERS ROUTES -- */}
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <MemberLanding />
                </ProtectedRoute>
              }
            >
              {/* Default sub-route: /members -> MemberHome */}
              <Route index element={<MemberHome />} />

              {/* Other sub-pages nested under /members/... */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="internal-archive" element={<InternalArchive />} />
              <Route path="idea-hub" element={<IdeaHub />} />
              <Route path="member-news" element={<MemberNews />} />
              <Route path="resources" element={<Resource />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="decisions" element={<DecisionMakingSystem />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="community-news" element={<CommunityNews />} />
            </Route>
            {/* ===================================== */}
            {/* Add a catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
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
