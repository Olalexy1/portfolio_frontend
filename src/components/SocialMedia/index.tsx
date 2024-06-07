import { Link } from '@mui/material';
import React from 'react';
import { BsTwitter, BsLinkedin, BsGithub, BsWhatsapp } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <Link href="https://www.linkedin.com/in/ajayiolalekan/" color="inherit" underline="none" className='socialIcon' aria-label='LinkedIn'>
        <BsLinkedin />
      </Link>
    </div>
    <div>
      <Link href="https://github.com/Olalexy1" color="inherit" underline="none" className='socialIcon' aria-label='Github'>
        <BsGithub />
      </Link>
    </div>
    <div>
      <Link href="https://twitter.com/Olalexy007" color="inherit" underline="none" className='socialIcon' aria-label='Twitter'>
        <BsTwitter />
      </Link>
    </div>
    <div>
      <Link href="https://wa.me/2347053755127?text=Hi%2C%20I%20think%20we%20need%20a%20web%20application.%20How%20soon%20can%20we%20discuss%20this%3F" color="inherit" underline="none" className='socialIcon' aria-label='WhatsApp'>
        <BsWhatsapp />
      </Link>
    </div>
  </div>
);

export default SocialMedia;
