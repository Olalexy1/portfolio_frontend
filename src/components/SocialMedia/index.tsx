import { Link } from '@mui/material';
import React from 'react';
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <Link href="https://www.linkedin.com/in/ajayiolalekan/" color="inherit" underline="none" className='socialIcon'>
        <BsLinkedin />
      </Link>
    </div>
    <div>
      <Link href="https://github.com/Olalexy1" color="inherit" underline="none" className='socialIcon'>
        <BsGithub />
      </Link>
    </div>
    <div>
      <Link href="https://twitter.com/Olalexy007" color="inherit" underline="none" className='socialIcon'>
        <BsTwitter />
      </Link>
    </div>
  </div>
);

export default SocialMedia;
