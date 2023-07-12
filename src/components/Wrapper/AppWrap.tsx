import React, { ComponentType, JSXElementConstructor } from 'react';
import NavigationDots from '../NavigationDots';
import SocialMedia from '../SocialMedia';

import { Typography, Box } from '@mui/material';

// import myStyles from './app.module.scss';

// interface AppWrapProps {
//     idName: string;
//     classNames: string;
//     Component: JSXElementConstructor<any>;
// }

const AppWrap = ({ idName, classNames, children }: any) => (
    <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
            {children}
            <div className="copyright">
                <Typography className="p-text">@2023 AJAYI OLALEKAN BAMIDELE</Typography>
                <Typography className="p-text">All rights reserved</Typography>
            </div>
        </div>
        <NavigationDots active={idName} />
    </div>
);

export default AppWrap;
