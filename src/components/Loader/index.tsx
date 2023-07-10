import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { images } from '@/util';
import myStyles from './loader.module.scss';

function LoadingScreen() {
    return (
      <div className={myStyles.preloaderWrapper}>
        <Image className={myStyles.loaderImg} src={images.preloader} alt="logo"></Image>
      </div>
    );
  }
  
  export default LoadingScreen;