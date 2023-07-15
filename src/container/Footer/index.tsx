import React from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { motion } from 'framer-motion';


const Footer = () => {
    const navTheme = useTheme();
    const isMobile = useMediaQuery(navTheme.breakpoints.down('md'));

    return (
        <div className='app__footer app__flex'>
            <Stack direction={isMobile ? "column" : "row"} spacing={2} width={'100%'}>
                <div className='app__footer-desc'>
                    <h4>Ajayi Olalekan Bamidele</h4>
                    <p>A passionate Frontend React Developer based in Lagos, Nigeria. Building the Frontend of Web and Mobile Applications that leads to the success of the overall product.</p>
                </div>
                <div className='app__footer-links'>

                </div>
            </Stack>
        </div>
    )
}

export default Footer;