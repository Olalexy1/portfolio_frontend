import React from 'react';
import { Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { BsFillBriefcaseFill, BsWhatsapp } from 'react-icons/bs';
import { HiMiniDocumentText } from 'react-icons/hi2';

const footerItems = [
  {
    text: 'My Résumé',
    link: "https://drive.google.com/file/d/1BN4nghukGAYXgRhDk-E5CslnF-U_Hdo8/view?usp=drive_link",
    icon: <HiMiniDocumentText/>,
  },
  {
    text: 'Projects',
    link: '#projects',
    icon: <BsFillBriefcaseFill />,
  },
  // {
  //   text: 'WhatsApp',
  //   link: 'https://wa.me/2347053755127?text=Hi%2C%20I%20think%20we%20need%20a%20web%20application.%20How%20soon%20can%20we%20discuss%20this%3F',
  //   icon: <BsWhatsapp/>,
  // },
];


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
          <ul>
            {
              footerItems?.map((item,index) => (
                <li key={index}>
                  <NextLink href={item.link} target={item.link === "#projects" ? "_self" : "_blank"}>{item.icon} &nbsp; {item.text}</NextLink>
                </li>
              ))
            }
          </ul>
        </div>
      </Stack>
      <div className="divider" />
      <div className="copyright">
        <p className="p-text">© Ajayi Olalekan Bamidele 2023</p>
      </div>

    </div>
  )
}

export default Footer;