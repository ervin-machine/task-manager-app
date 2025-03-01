import * as Yup from 'yup';

const taskValidationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters')
        .required('Title is required'),

    description: Yup.string()
        .trim()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters')
        .required('Description is required'),

    dueDate: Yup.date()
        .min(new Date(), 'Due date cannot be in the past')
        .required('Due date is required'),
});

export default taskValidationSchema;