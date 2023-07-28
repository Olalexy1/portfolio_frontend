import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
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
import { Icon } from '@mui/material';
import MaterialUISwitch from '../Switch';
import { images } from '@/util';
import Image from "next/image";

const styles = {
  appBar: {
    boxShadow: 'none',
  },

  appBarAlt: {
    margin: '0px',
    width: '100%',
    height: '70px',
    justifyContent: 'center'
  }
};

const NavBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navTheme = useTheme();
  const isMobile = useMediaQuery(navTheme.breakpoints.down('md'));

  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : ''
  );

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const [activeLink, setActiveLink] = useState(0);
  const [activeMobileLink, setActiveMobileLink] = useState(0);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);


  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

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
        <MaterialUISwitch onChange={toggleTheme} />
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
      <AppBar position="fixed" color='transparent' style={!isMobile ? styles.appBar : styles.appBarAlt}>
        <Toolbar className={myStyles.navBar}>
          <Stack direction="row" spacing={'10px'} className={myStyles.logo}>
            <NextLink href={"/"} className={myStyles.links}>
              <Image src={theme === 'light' ? images.olaDevLogoLight : images.olaDevLogoDark} alt="logo"></Image>
            </NextLink>
          </Stack>
          <Box>
            {!isMobile && renderDesktopMenuItems()}
            {isMobile && renderMobileMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer className={myStyles.customDrawer} anchor="left" open={isMobile ? isDrawerOpen : false} onClose={toggleDrawer}>
        <div className={myStyles.mobileNavbar} style={theme === 'dark' ? { backgroundColor: '#333', color: '#fff' } : { backgroundColor: '#fff', color: '#000' }}>
          <div className={myStyles.customLogoContainer}>
            <NextLink href={"/"} className={myStyles.links}>
              <Image src={theme === 'light' ? images.olaDevLogoLight : images.olaDevLogoDark} alt="logo"></Image>
            </NextLink>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          {menuItems.map((item, index) => (
            <NextLink
              key={index}
              onClick={() => setActiveLink(index)}
              className={`${myStyles.links} ${myStyles.links_mobile}`}
              style={index === activeLink ? { color: '#3CD6EB' } : {}}
              href={`#${item.text.toLowerCase()}`}>
              <Stack direction="row" spacing={2}>
                {item.icon} &nbsp; &nbsp; {item.text}
              </Stack>
            </NextLink>
          ))}
          <div className={myStyles.mobileSwitch}>
            <MaterialUISwitch onChange={toggleTheme} />
          </div>
        </div>
      </Drawer>
    </>
  );
};


export default NavBar;
