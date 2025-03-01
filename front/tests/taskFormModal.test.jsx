import { render, screen, fireEvent } from '@testing-library/react';
import TaskFormModal from '../src/features/Task/components/TaskFormModal';
import { vi } from 'vitest';

const addTask = vi.fn();
const editTask = vi.fn();
const setOpen = vi.fn();

test('renders form fields', () => {
  render(<TaskFormModal open={true} setOpen={setOpen} addTask={addTask} editTask={editTask} />);
  
  expect(screen.getByLabelText(/taskTitle/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/taskDesc/i)).toBeInTheDocument();
});
