import React from 'react';
import { Stack } from '@mui/material';
import NextLink from 'next/link';
import { motion } from 'framer-motion';


const Footer = () => {
    return (
        <div className='app__footer app__flex'>
            <Stack direction="row" spacing={2} width={'100%'}>
                <div>
                    <h4>Ajayi Olalekan Bamidele</h4>
                    <p className='p-text'>A passionate Frontend React Developer based in Lagos, Nigeria. Building the Frontend of Web and Mobile Applications that leads to the success of the overall product.</p>
                </div>
                <div>

                </div>
            </Stack>
        </div>
    )
}

export default Footer;