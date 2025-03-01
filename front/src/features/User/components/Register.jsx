import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import registerSchema from '../schemas/registerSchema';
import GoogleAuth from './GoogleAuth';

function Register({ registerUser, googleAuth, error }) {
  const { t } = useTranslation()
  
  const handleSubmit = (values, { setSubmitting }) => {
    registerUser(values);
    setSubmitting(false);
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white p-8 shadow-md rounded-lg lg:max-w-md w-full">
              <GoogleAuth googleAuth={googleAuth} />
              <h3 className="text-gray-800 text-2xl font-bold mb-6">{t('createAccount')}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-gray-800 text-sm block mb-1">{t('name')}</label>
                  <Field id="name" name="name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('nameText')} />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-800 text-sm block mb-1">{t('email')}</label>
                  <Field id="email" name="email" type="email" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('emailText')} />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="text-gray-800 text-sm block mb-1">{t('password')}</label>
                  <Field id="password" name="password" type="password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('passwordText')} />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-md transition dark:bg-[#76ABAE] dark:text-black" disabled={isSubmitting}>
                {t('register')}
              </button>
              <p>{error === "Refresh token not found" ? "" : error }</p>
              <p className="text-sm text-gray-800 mt-4">
                {t('alreadyHaveAccount')} <Link to="/login" className="text-indigo-600 font-semibold hover:underline">{t('loginHere')}</Link>
              </p>
            </Form>
          )}
        </Formik>
        <div className="hidden lg:block">
          <img src="https://readymadeui.com/login-image.webp" className="w-full h-auto object-cover" alt="login" />
        </div>
      </div>
    </div>
  );
}

export default Register;
