import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { urlFor, client } from '../../client';
import useFindAllAbouts from '@/api/about';
import Image, { StaticImageData } from "next/image";
import Stack from '@mui/material/Stack';
import Tilt from 'react-parallax-tilt';

interface AboutData {
    _type: string;
    imgUrl: string;
    title: string;
    description: string;
}


const About: React.FC = () => {

    const { abouts } = useFindAllAbouts();

    return (
        <>
            <h2 className="head-text">
                I Know that <span>Good Software</span> <br />means  <span>Successful Business</span>
            </h2>

            <div className="app__profiles">
                {abouts.map((about, index) => (
                    <Tilt
                        key={about.title + index}
                        perspective={500}>
                        <motion.div
                            whileInView={{ opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5, type: 'tween' }}
                            className="app__profile-item"
                            key={about.title + index}
                        >
                            <Image
                                width={230}
                                height={210}
                                src={urlFor(about.imgUrl).url()}
                                alt={about.title} />
                            <Stack direction='column' spacing='2px' padding='5px'>
                                <h2 className="bold-text" style={{ marginTop: '10px', color: '#3CD6EB' }}>{about.title}</h2>
                                <p className="p-text" style={{ marginTop: '5px' }}>{about.description}</p>
                            </Stack>

                        </motion.div>
                    </Tilt>
                ))}
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(About, { classNames: 'app__about' }),
    { idName: 'about', classNames: '' }
);