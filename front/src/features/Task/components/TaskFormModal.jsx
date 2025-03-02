import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { statuses, priorities, categories } from '../../../constants/initialValues';
import taskValidationSchema from '../schemas/taskSchema';
import { useTranslation } from 'react-i18next';

const TaskFormModal = (props) => {
  const { open, userID, setOpen, addTask, editTask, selectedTask } = props;
  const { t } = useTranslation();

  const [isNewTask, setIsNewTask] = useState(false);

  const handleSubmit = (values) => {
    if (isNewTask) {
      addTask({ createdBy: userID, ...values });
    }
    else editTask(selectedTask?._id, values);
    setOpen();
  };

  useEffect(() => {
    setIsNewTask(selectedTask === null);
  }, [selectedTask]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex w-full min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-[#09122C]"
          >
            <div className="bg-white w-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-[#09122C]">
              <div className="w-full sm:flex sm:items-start">
                <div className="mt-3 w-[90%] text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                  {isNewTask ? t('addNewTask') : t('edit')}
                  </DialogTitle>
                  <div className="mt-2 w-full">
                    <Formik
                      initialValues={
                        isNewTask
                          ? { title: '', description: '', status: statuses[0].name, priority: priorities[0]?.name, category: categories[0]?.name, dueDate: new Date().toISOString().split('T')[0], comments: [] }
                          : {...selectedTask, dueDate: selectedTask?.dueDate?.split("T")[0]}
                      }
                      validationSchema={taskValidationSchema}
                      onSubmit={handleSubmit}
                    >
                      {() => (
                        <Form className="mt-2 w-full">
                          <div>
                            <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                              {t('taskTitle')}
                            </label>
                            <Field
                              id="title"
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              name="title"
                              placeholder={t('taskTitle')}
                              type="text"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                              {t('taskDesc')}
                            </label>
                            <Field
                              id="description"
                              className="h-40 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              name="description"
                              placeholder={t('taskDesc')}
                              type="text"
                              component="textarea"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label htmlFor="priority" className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                              {t('taskPriority')}
                            </label>
                            <Field id="priority" name="priority" as="select" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                              {priorities.map(priority => (
                                <option key={priority.id} value={priority.name}>
                                  {t(priority.name)}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div>
                            <label htmlFor="status" className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                              {t('taskStatus')}
                            </label>
                            <Field id="status" name="status" as="select" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                              {statuses.map(status => (
                                <option key={status.id} value={status.name}>
                                  {t(status.name)}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div>
                            <label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                              {t('taskCategory')}
                            </label>
                            <Field id="category" name="category" as="select" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                              {categories.map(category => (
                                <option key={category.id} value={category.name}>
                                  {t(category.name)}
                                </option>
                              ))}
                            </Field>
                          </div>

                          <div>
                            <label htmlFor="dueDate" className="mb-3 block text-base font-medium text-[#07074D] dark:text-white">
                              {t('taskDueDate')}
                            </label>
                            <Field id="dueDate" name="dueDate" placeholder={t('taskDueDate')} type="date" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-[#09122C]">
                            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto">
                              {t('submitButton')}
                            </button>
                            <button type="button" onClick={() => setOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">
                              {t('cancelButton')}
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskFormModal;