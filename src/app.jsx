/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { Route, Routes, Navigate } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import PropTypes from 'prop-types'; // Import PropTypes
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import DashboardLayout from './layouts/dashboard';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const DocumentPage = lazy(() => import('src/pages/document'));
export const DocumentListPage = lazy(() => import('src/pages/documentList'));

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
    <div>
      <ToastContainer />
      <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <IndexPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/document"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DocumentPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/document/:documentId"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DocumentPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/document-list"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DocumentListPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <UserPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Suspense>
                    <ProductsPage />
                  </Suspense>
                </DashboardLayout>
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
                <Page404 />
              </PublicRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}
