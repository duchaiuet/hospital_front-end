/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { Route, Routes, Navigate } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import PropTypes from 'prop-types'; // Import PropTypes
import { AppView } from './sections/overview/view';
import LoginPage from './pages/login';
import NotFoundPage from './pages/page-not-found';
// ----------------------------------------------------------------------

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Defining prop types for children
};
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired, // Defining prop types for children
};

// A layout component for private routes
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

// A layout component for public routes
function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
}

// Simulating authentication check
const isAuthenticated = () => !!localStorage.getItem('user');

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppView />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PublicRoute>
              <NotFoundPage />
            </PublicRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
