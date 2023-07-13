import React from 'react';
import { motion } from 'framer-motion';

interface MotionWrapProps {
  classNames: string;
}

const MotionWrap = <P extends object>(Component: React.ComponentType<P>, { classNames }: MotionWrapProps) => {
  const HOC: React.FC<P> = (props) => {

    return (
      <motion.div
        whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.5 }}
        className={`${classNames} app__flex`}
      >
        <Component {...props} />
      </motion.div>
    );
  };

  return HOC;
};

export default MotionWrap;
