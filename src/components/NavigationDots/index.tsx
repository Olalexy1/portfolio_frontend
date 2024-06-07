import React from 'react';
import NextLink from 'next/link';

const NavigationDots = ({ active }: any) => (
  <div className="app__navigation">
    {['home', 'about', 'portfolio', 'skills', 'contact'].map((item, index) => (
      <NextLink
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        style={active === item ? { backgroundColor: '#3CD6EB' } : {}}
        aria-label={active === item ? `Active Section Navigation Dot - ${item}` : `Section Navigation Dot for - ${item}`}
      />
    ))}
  </div>
);

export default NavigationDots;