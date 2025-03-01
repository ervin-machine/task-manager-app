import { render, screen } from '@testing-library/react';
import TaskContent from '../src/features/Task/components/TaskContent';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { MemoryRouter } from 'react-router-dom';  // ✅ Import this!

const tasks = [
  { _id: '1', title: 'Task 1', status: 'TODO' }
];

test('renders tasks in the correct column', () => {
  render(<DragDropContext onDragEnd={() => {}}>
  <Droppable droppableId="test">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <MemoryRouter>
          <TaskContent boardType={{ id: 'TODO', title: 'Pending' }} tasks={tasks} />
        </MemoryRouter>
      {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>);
  
  expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
});
