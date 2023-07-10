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
import NextLink from 'next/link';
import myStyles from './navBar.module.scss';

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
      link: "/"
    },
    {
      text: 'About',
      link: '/about'
    },
    {
      text: 'Projects',
      link: '/projects'
    },
    {
      text: 'Skills',
      link: '/skills'
    },
    {
      text: 'Contact',
      link: '/contact'
    },
  ];

  const renderDesktopMenuItems = () => {
    return (
      <nav className={myStyles.navItems}>
        {menuItems.map((item, index) => (
          // <NextLink className={myStyles.links} key={index} href={item.link}>{item.text}</NextLink>
          <NextLink className={myStyles.links} key={`link-${item}`} href={`#${item}`}>{item.text}</NextLink>
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
        <div className={myStyles.mobileNavbar} style={ theme === 'dark' ? { backgroundColor: '#333', color: '#fff' } : { backgroundColor: '#fff', color: '#000'} }>
          {/* <NextLink href={"/"} className={myStyles.links} style={{ marginBottom: '30px' }}>Olalekan.dev</NextLink> */}
          <div className={myStyles.customLogoContainer}>
            <NextLink href={"/"} className={myStyles.links}>
              <Image src={theme === 'light' ? images.olaDevLogoLight : images.olaDevLogoDark} alt="logo"></Image>
            </NextLink>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          {menuItems.map((item, index) => (
            <NextLink key={index} className={`${myStyles.links} ${myStyles.links_mobile}`} href={item.link}>{item.text}</NextLink>
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
