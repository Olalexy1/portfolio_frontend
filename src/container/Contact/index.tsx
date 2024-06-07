import React, { useState, ChangeEvent } from 'react';
import { images, validateEmail } from '@/util';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { client } from '../../client';
import Image from 'next/image';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState({
        nameInput: false,
        emailInput: false,
        messageInput: false
    });
    const [open, setOpen] = React.useState(false);

    const { name, email, message } = formData;

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleFocus = (inputName: any) => {
        setIsFocused(prevState => ({
            ...prevState,
            [inputName]: true
        }));
    };

    const handleBlur = (inputName: any) => {
        setIsFocused(prevState => ({
            ...prevState,
            [inputName]: false
        }));
    };

    const validateInputs = () => {
        let validationPassed = true;
        const newErrors = { name: '', email: '', message: '' };

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            validationPassed = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            validationPassed = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
            setOpen(true);
            validationPassed = false;
        }

        if (!message.trim()) {
            newErrors.message = 'Message is required';
            validationPassed = false;
        }

        setErrors(newErrors);
        return validationPassed;
    };

    const handleSubmit = () => {

        if (validateInputs()) {
            setLoading(true);

            const contact = {
                _type: 'contact',
                name: formData.name,
                email: formData.email,
                message: formData.message,
            };

            client.create(contact)
                .then(() => {
                    setLoading(false);
                    setIsFormSubmitted(true);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <h2 className="head-text">Send Me a <span>Message!</span></h2>

            <p className="contact-text">Got an inquiry or proposal, Go ahead. You can use my contact below or submit the form. I am very responsive to messages.</p>

            <div className="app__contact-cards">
                <div className="app__contact-card ">
                    <Image
                        width={45}
                        height={45}
                        src={images.email}
                        alt='email' />
                    <a href="mailto:ajayiolalekan729@gmail.com" aria-label='ajayiolalekan729@gmail.com'>ajayiolalekan729@gmail.com</a>
                </div>
                <div className="app__contact-card">
                    <Image
                        width={45}
                        height={45}
                        src={images.phone}
                        alt='mobile' />
                    <a href="tel: +2348188394639" aria-label='+2348188394639'>+2348188394639</a>
                </div>
            </div>
            {!isFormSubmitted ? (
                <div className="app__contact-form app__flex">
                    <div className="app__flex">
                        <input
                            className="p-text"
                            type="text"
                            placeholder={isFocused.nameInput ? '' : 'Enter your Name'}
                            name="name"
                            value={name}
                            onChange={handleChangeInput}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            style={errors.name ? { border: "2px solid red" } : {}}
                        />
                    </div>
                    <div className="app__flex">
                        <input
                            className="p-text"
                            type="email"
                            placeholder={isFocused.emailInput ? '' : 'Enter your Email'}
                            name="email"
                            value={email}
                            onChange={handleChangeInput}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            style={errors.email ? { border: "2px solid red" } : {}}
                        />
                    </div>
                    <div>
                        <textarea
                            className="p-text"
                            placeholder={isFocused.emailInput ? '' : 'Hi, I think we need a web application. How soon can we discuss this?'}
                            value={message}
                            name="message"
                            onChange={handleChangeInput}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            style={errors.message ? { border: "2px solid red" } : {}}
                            spellCheck="true"
                        />
                    </div>
                    <button id='button' type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
                </div>
            ) : (
                <div>
                    <h3 className="head-text">
                        Thank you for getting in touch!
                    </h3>
                </div>
            )}

            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} action={action}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errors.email}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AppWrap(
    MotionWrap(Contact, { classNames: 'app__contact' }),
    { idName: 'contact', classNames: '' }
);
