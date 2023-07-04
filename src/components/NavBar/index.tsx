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
// import { Link } from 'react-router-dom';
import NextLink from 'next/link';
import myStyles from './navBar.module.scss';

import MaterialUISwitch from '../Switch';
import { height } from '@mui/system';

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
    // localStorage.getItem('theme') || 'light'
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
    // {
    //   text: 'Home',
    //   link: "/"
    // },
    {
      text: 'About',
      link: '/about'
    },
    {
      text: 'Projects',
      link: '/projects'
    },
    {
      text: 'Contact',
      link: '/contact'
    },
  ];

  const renderDesktopMenuItems = () => {
    return (
      <div className={myStyles.navItems}>
        {menuItems.map((item, index) => (
          <NextLink className={myStyles.links} key={index} href={item.link}>{item.text}</NextLink>
        ))}
        <MaterialUISwitch onChange={toggleTheme} />
      </div>
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
      <AppBar position="relative" color='transparent' style={!isMobile ? styles.appBar : styles.appBarAlt}>
        <Toolbar className={myStyles.navBar}>
          <Stack direction="row" spacing={'10px'} className={myStyles.logo}>
            <NextLink href={"/"} className={myStyles.links}>Olalekan.dev</NextLink>
          </Stack>
          <Box>
            {!isMobile && renderDesktopMenuItems()}
            {isMobile && renderMobileMenuItems()}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer className={myStyles.customDrawer} anchor="left" open={isMobile ? isDrawerOpen : false} onClose={toggleDrawer}>
        <div className={myStyles.mobileNavbar}>
        <NextLink href={"/"} className={myStyles.links} style={{marginBottom: '30px'}}>Olalekan.dev</NextLink>
          {menuItems.map((item, index) => (
            <NextLink key={index} className={`${myStyles.links} ${myStyles.links_mobile}`} href={item.link}>{item.text}</NextLink>
          ))}
          <div className='mobileSwitch'>
            <MaterialUISwitch onChange={toggleTheme} />
          </div>
        </div>
      </Drawer>
    </>
  );
};


export default NavBar;
