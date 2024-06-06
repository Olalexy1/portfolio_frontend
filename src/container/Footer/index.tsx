import React from 'react';
import { Divider, Stack, useMediaQuery, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { BsFillBriefcaseFill, BsWhatsapp } from 'react-icons/bs';
import { HiMiniDocumentText } from 'react-icons/hi2';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { WebsiteCarbonBadge } from 'react-websitecarbon-badge';
import { useContextTheme } from '@/context';


const footerItems = [
  {
    text: 'My Résumé',
    link: "https://docs.google.com/document/d/1gDBrsL9zlU06kNvBP1nCT-Puvqle_YX4oVb3XB09zFo/edit?usp=sharing",
    icon: <HiMiniDocumentText />,
  },
  {
    text: 'Portfolio',
    link: '#portfolio',
    icon: <BsFillBriefcaseFill />,
  },
  {
    text: 'WhatsApp',
    link: 'https://wa.me/2348188394639?text=Hi%2C%20I%20think%20we%20need%20a%20web%20application.%20How%20soon%20can%20we%20discuss%20this%3F',
    icon: <IoLogoWhatsapp />,
  },
  {
    text: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ajayiolalekan/',
    icon: <FaLinkedin />,
  },
  {
    text: 'GitHub',
    link: 'https://github.com/Olalexy1',
    icon: <FaGithub />
    ,
  },
];


const Footer = () => {
  const navTheme = useTheme();
  const isMobile = useMediaQuery(navTheme.breakpoints.down('sm'));
  const { contextTheme } = useContextTheme();

  return (
    <div className='app__footer app__flex'>
      <Stack direction={isMobile ? "column" : "row"} spacing={2} width={'100%'} 
      // style={{ backgroundColor: '#3CD6EB' }}
      >
        <div className='app__footer-desc'>
          <h4>Ajayi Olalekan Bamidele</h4>
          <p>A passionate Frontend React Developer based in Lagos, Nigeria. Building the Frontend of Web and Mobile Applications that leads to the success of the overall product.</p>
        </div>
        <div className='app__footer-links'>
          <ul>
            {
              footerItems?.map((item, index) => (
                <li key={index}>
                  <NextLink href={item.link} target={item.link === "#portfolio" ? "_self" : "_blank"}>{item.icon} &nbsp; {item.text}</NextLink>
                </li>
              ))
            }
          </ul>
        </div>
      </Stack>
      <div className="divider" />
      <div className="copyright">
        <p className="p-text">© Ajayi Olalekan B. 2023</p>
        <div>
          <WebsiteCarbonBadge url='lexy-portfolio-frontend.vercel.app' co2="0.16" percentage="84" dark={contextTheme === "dark" ? true : false} />
        </div>
      </div>

    </div>
  )
}

export default Footer;