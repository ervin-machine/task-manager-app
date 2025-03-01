import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../src/pages/Dashboard';
import { thunk } from 'redux-thunk';

const mockStore = configureStore([thunk]);
const store = mockStore({
  task:{ tasks: [
    { _id: '1', title: 'Test Task 1', status: 'TODO', priority: "LOW", category: "Work", dueDate: "2025-03-01" },
    { _id: '2', title: 'Test Task 2', status: 'DONE', priority: "LOW", category: "Work", dueDate: "2025-03-01" }
  ]},
  user: { _id: '123', name: 'Test User', email: "fake@test.com" }
});

test('renders Dashboard and child components', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
});

test('opens task form modal when clicking Add Task', () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );

  const addButton = screen.getByText(/addNewTask/i);
  fireEvent.click(addButton);

  expect(screen.getByText(/taskTitle/i)).toBeInTheDocument();
});