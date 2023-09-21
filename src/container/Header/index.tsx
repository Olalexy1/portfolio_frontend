import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '@/util';
import Image from "next/image";
import NextLink from 'next/link';
import { AppWrap } from '@/components/Wrapper';


const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};

const Typewriter = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(100); // Adjust typing speed here
    const phrases = ['Ajayi Olalekan', 'Frontend Developer', 'Mobile Developer']; // Array of phrases to display

    useEffect(() => {
        const timer = setTimeout(() => {
            handleTyping();
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, currentIndex, isDeleting]);

    const handleTyping = () => {
        const currentPhrase = phrases[currentIndex];

        if (!isDeleting) {
            setText(currentPhrase.substring(0, text.length + 1));

            if (text === currentPhrase) {
                setIsDeleting(true);
                setTypingSpeed(200); // Adjust delay before deleting here
            }
        } else {
            setText(currentPhrase.substring(0, text.length - 1));

            if (text === '') {
                setIsDeleting(false);
                setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                setTypingSpeed(200); // Adjust typing speed after deleting here
            }
        }
    };

    return (
        <div className="typewriter">
            {text}<span className="cursor">|</span>
        </div>
    );
};

const Header: React.FC = () => (

    <div className="app__header app__flex">
        <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__header-info"
        >
            <div className="app__header-badge">

                <div className="badge-cmp app__flex">
                    <span>👋</span>
                    <div style={{ marginLeft: '10px' }}>
                        <p className="p-text">Hello, I am</p>
                        <Typewriter />
                    </div>
                </div>

                <div className="tag-cmp app__flex">
                    <p className='p-text'>
                        A passionate Frontend React Developer based in Lagos, Nigeria. Building the Frontend of Web and Mobile Applications that leads to the success of the overall product.
                    </p>
                </div>

                <NextLink id='button' className="p-text" target='_blank' href="https://drive.google.com/file/d/15p8iowrdiBLfDX2vPAXsLEV0x7AcaAUj/view?usp=drive_link">My Résumé</NextLink>

            </div>
        </motion.div>

        <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delayChildren: 0.5 }}
            className="app__header-img"
        >
            <Image src={images.olaImg} alt="profile_bg" />
        </motion.div>

        <motion.div
            variants={scaleVariants}
            whileInView={scaleVariants.whileInView}
            className="app__header-circles"
        >
            {[images.typescript, images.react, images.sass].map((circle, index) => (
                <div className="circle-cmp app__flex" key={`circle-${index}`}>
                    <Image src={circle} alt="profile_bg" />
                </div>
            ))}
        </motion.div>
    </div>
);

export default AppWrap(Header, { idName: 'home' });

