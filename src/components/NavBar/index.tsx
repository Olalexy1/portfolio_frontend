import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Box,
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { BiSolidHomeAlt2 } from 'react-icons/bi';
import { BsFillPersonFill, BsFillBriefcaseFill } from 'react-icons/bs';
import { TiMessages } from 'react-icons/ti';
import { GiSkills } from 'react-icons/gi';
import NextLink from 'next/link';
import myStyles from './navBar.module.scss';
import { useContextTheme } from '@/context';
import { images } from '@/util';
import Image from "next/image";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const styles = {
  appBar: {
    boxShadow: 'none',
  },

  appBarAlt: {
    margin: '0px',
    width: '100%',
    height: '70px',
    justifyContent: 'space-between',
  }
};

const NavBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navTheme = useTheme();
  const isMobile = useMediaQuery(navTheme.breakpoints.down('md'));

  // const [theme, setTheme] = useState('light');
  const { contextTheme, setContextTheme } = useContextTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        // setTheme(storedTheme);
        setContextTheme(storedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    // setTheme((prev) => (prev === "light" ? "dark" : "light"))
    setContextTheme((prev) => (prev === "light" ? "dark" : "light"))
  };

  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    localStorage.setItem('theme', contextTheme);
    document.body.className = contextTheme;
  }, [contextTheme]);


  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleActiveLink = (index: any) => {
    setActiveLink(index)
    setDrawerOpen(!isDrawerOpen);
  }

  const menuItems = [
    {
      text: 'Home',
      link: "/",
      icon: <BiSolidHomeAlt2 />,
    },
    {
      text: 'About',
      link: '/about',
      icon: <BsFillPersonFill />,
    },
    {
      text: 'Portfolio',
      link: '/projects',
      icon: <BsFillBriefcaseFill />,
    },
    {
      text: 'Skills',
      link: '/skills',
      icon: <GiSkills />,
    },
    {
      text: 'Contact',
      link: '/contact',
      icon: <TiMessages />,
    },
  ];

  const renderDesktopMenuItems = () => {
    return (
      <nav className={myStyles.navItems}>
        {menuItems.map((item, index) => (
          <NextLink
            onClick={() => setActiveLink(index)}
            className={myStyles.links}
            style={index === activeLink ? { color: '#3CD6EB' } : {}}
            key={`link-${item}`}
            href={`#${item.text.toLowerCase()}`}>{item.text}
          </NextLink>
        ))}
        <IconButton onClick={toggleTheme}>
          {contextTheme === "dark" ? (
            <DarkModeOutlinedIcon htmlColor="white" />
          ) : (
            <LightModeOutlinedIcon htmlColor="black" />
          )}
        </IconButton>
      </nav>
    );
  };

  const renderMobileMenuItems = () => {
    return (
      <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    );
  };

  return (
    <>
      <div className={myStyles.navBar} style={!isMobile ? styles.appBar : styles.appBarAlt}>
        <NextLink href={"/"} className={myStyles.links}>
          <Image src={contextTheme === 'light' ? images.olaDevLogoLight : images.olaDevLogoDark} alt="logo"></Image>
        </NextLink>
        <Box>
          {!isMobile && renderDesktopMenuItems()}
          {isMobile && renderMobileMenuItems()}
        </Box>
      </div>

      <Drawer className={myStyles.customDrawer} anchor="left" open={isMobile ? isDrawerOpen : false} onClose={toggleDrawer}>
        <div className={myStyles.mobileNavbar} style={contextTheme === 'dark' ? { backgroundColor: '#333', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}>
          <div className={myStyles.customLogoContainer}>
            <NextLink href={"/"} className={myStyles.links}>
              <Image src={contextTheme === 'light' ? images.olaDevLogoLight : images.olaDevLogoDark} alt="logo"></Image>
            </NextLink>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          {menuItems.map((item, index) => (
            <NextLink
              key={index}
              onClick={() => handleActiveLink(index)}
              className={`${myStyles.links} ${myStyles.links_mobile}`}
              style={index === activeLink ? { color: '#3CD6EB' } : {}}
              href={`#${item.text.toLowerCase()}`}>
              <Stack direction="row" spacing={2}>
                {item.icon} &nbsp; &nbsp; {item.text}
              </Stack>
            </NextLink>
          ))}
          <div className={myStyles.mobileSwitch}>
            <IconButton onClick={toggleTheme}>
              {contextTheme === "dark" ? (
                <DarkModeOutlinedIcon htmlColor="white" />
              ) : (
                <LightModeOutlinedIcon htmlColor="black" />
              )}
            </IconButton>
          </div>
        </div>
      </Drawer>
    </>
  );
};


export default NavBar;
