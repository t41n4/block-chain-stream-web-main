import * as Yup from 'yup';

const username = Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required');

const user_password = Yup.string()
    .min(8, 'Too Short! Minimum 8 characters')
    .max(70, 'Too Long! Maximum 70 characters')
    .required('Required')

const user_email = Yup.string()
    .email('Invalid email')
    .required('Required')

const user_fullname = Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required')

const user_avatar = Yup.string().nullable()

const comments = Yup.object().shape({
    username: Yup.string(),
    message: Yup.object().shape({
        data: Yup.string().required('Data is Required'),
        sender: Yup.string().required('Sender is Required'),
        // timestamp: Yup.number().required('Timestamp is Required'),
    })
});

const video = Yup.object().shape({
    video_name: Yup.string().required('Title is Required'),
    video_thumbnail: Yup.string().required('Thumbnail is Required'),
});

export const SignupSchema = Yup.object().shape({
    username: username,
    user_password: user_password,
    user_email: user_email,
    user_fullname: user_fullname,
    user_agree: Yup.boolean()
        .required('Required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('user_password')], 'Passwords must match')
        .required('Required'),
});

export const LoginSchema = Yup.object().shape({
    username: username,
    user_password: user_password,
});

export const UpdateSchema = Yup.object().shape({
    username: username,
    user_fullname: user_fullname,
    user_email: user_email,
    user_avatar: user_avatar,
});

export const CommentSchema = comments;
export const VideoSchema = video;