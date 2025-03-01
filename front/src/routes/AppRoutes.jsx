import React, { useEffect, lazy, Suspense, memo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser, selectIsLoading } from '../features/User/store/selectors';
import { registerUser, loginUser, googleAuth, getLoggedUser } from '../features/User/store/actions';

// Lazy Loading Components
const Register = lazy(() => import('../features/User/components/Register'));
const Login = lazy(() => import('../features/User/components/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const TaskDetail = lazy(() => import('../pages/TaskDetail'));

const PrivateRoute = memo(({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
});

const PublicRoute = memo(({ token, children }) => {
  return token ? <Navigate to="/dashboard" /> : children;
});

const AppRoutes = ({ token, registerUser, loginUser, googleAuth, getLoggedUser, isLoading }) => {

  useEffect(() => {
    getLoggedUser()
  }, []);
  
  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/register"
            element={
              <PublicRoute token={token}>
                <Register registerUser={registerUser} />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute token={token}>
                <Login loginUser={loginUser} googleAuth={googleAuth} />
              </PublicRoute>
            }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute token={token}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute token={token}>
                <TaskDetail />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken(),
  user: selectUser(),
  isLoading: selectIsLoading()
});

const mapDispatchToProps = dispatch => ({
  registerUser: (newUser) => dispatch(registerUser(newUser)),
  loginUser: (existingUser) => dispatch(loginUser(existingUser)),
  getLoggedUser: () => dispatch(getLoggedUser()),
  googleAuth: (credential) => dispatch(googleAuth(credential))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
