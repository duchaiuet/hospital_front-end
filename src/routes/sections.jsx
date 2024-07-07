import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const DocumentPage = lazy(() => import('src/pages/document'));
export const DocumentListPage = lazy(() => import('src/pages/documentList'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

const isAuthenticated = () => !!localStorage.getItem('user');

const PrivateRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // Defining prop types for children
};

const PublicRoute = ({ children }) => (isAuthenticated() ? <Navigate to="/" replace /> : children);

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired, // Defining prop types for children
};
export default function Router() {
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
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
    <Route path="*" element={<Page404 />} />
  </Routes>;
}
