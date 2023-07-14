import React, { useState, ChangeEvent } from 'react';
import { images } from '@/util';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { client } from '../../client';
import Image from 'next/image';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { name, email, message } = formData;

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
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
    };

    return (
        <>
            <h2 className="head-text">Send Me a message!</h2>

            <p>Got an inquiry or proposal, or just want to say hello? Go ahead. </p>
            <p>You can use my contact below or submit the form.</p>
            <p>I am very responsive to messages </p>

            <div className="app__footer-cards">
                <div className="app__footer-card ">
                    <Image
                        width={45}
                        height={45}
                        src={images.email}
                        alt='email' />
                    <a href="mailto:ajayiolalekan729@gmail.com" className="p-text">ajayiolalekan729@gmail.com</a>
                </div>
                <div className="app__footer-card">
                    <Image
                        width={45}
                        height={45}
                        src={images.mobile}
                        alt='mobile' />
                    <a href="tel: +2348188394639" className="p-text">+2348188394639</a>
                </div>
            </div>
            {!isFormSubmitted ? (
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input className="p-text" type="text" placeholder="Enter your Name" name="name" value={name} onChange={handleChangeInput} />
                    </div>
                    <div className="app__flex">
                        <input className="p-text" type="email" placeholder="Enter your Email" name="email" value={email} onChange={handleChangeInput} />
                    </div>
                    <div>
                        <textarea
                            className="p-text"
                            placeholder="Hi, I think we need a web application. How soon can we discuss this?"
                            value={message}
                            name="message"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
                </div>
            ) : (
                <div>
                    <h3 className="head-text">
                        Thank you for getting in touch!
                    </h3>
                </div>
            )}
        </>
    );
};

export default AppWrap(
    MotionWrap(Contact, { classNames: 'app__footer' }),
    { idName: 'contact', classNames: '' }
);
