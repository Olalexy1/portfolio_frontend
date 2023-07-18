import React, { ComponentType, JSXElementConstructor } from 'react';
import NavigationDots from '../NavigationDots';
import SocialMedia from '../SocialMedia';

interface AppWrapProps {
  idName: string;
  classNames?: string;
}

const AppWrap = <P extends object>(Component: React.ComponentType<P>, { idName, classNames }: AppWrapProps) => {
  const HOC: React.FC<P> = (props) => (
    <div id={idName} className={`app__container ${classNames}`}>
      <SocialMedia />
      <div className="app__wrapper app__flex">
        <Component {...props} />
      </div>
      <NavigationDots active={idName} />
    </div>
  );

  return HOC;
};

export default AppWrap;

