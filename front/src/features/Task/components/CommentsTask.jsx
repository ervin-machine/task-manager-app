import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import commentValidationSchema from '../schemas/commentSchema';
import { useTranslation } from 'react-i18next';

function CommentsTask(props) {
  const { addComment, task } = props
  const { t } = useTranslation();

  const handleSubmit = async (values, { resetForm }) => {
      await addComment({ taskId: task._id, content: values.comment})
      resetForm();
  };
  return (
    <div className='border-2 border-gray-300 m-2 dark:text-white'>
        <div className='p-5 text-4xl rounded-lg lg:max-w-md w-full'>
          {t('taskComment')}
        </div>
        <div>
        <Formik
          initialValues={{ comment: '' }}
          validationSchema={commentValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="p-5 rounded-lg lg:max-w-md w-full">
              <div className="space-y-4">
                <div>
                  <Field
                    id="comment"
                    name="comment"
                    type="comment"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('taskComment')}
                  />
                  <ErrorMessage name="comment" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md transition">
                {t('taskComment')}
              </button>
            </Form>
          )}
        </Formik>
        </div>
        <div className='p-5'>
          {task?.comments?.map((task, indeks) => (
              <p key={indeks}>{task}</p>
          ))}
        </div>
    </div>
  )
}

export default CommentsTask