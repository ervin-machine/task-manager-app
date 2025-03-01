import * as Yup from 'yup';

const commentValidationSchema = Yup.object({
    comment: Yup.string()
        .trim()
        .min(3, 'Title must be at least 3 characters')
        .required('Comment is required'),

});

export default commentValidationSchema;