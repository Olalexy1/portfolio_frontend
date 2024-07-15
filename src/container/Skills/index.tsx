import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { urlFor, client } from '../../client';
import Image from 'next/image';
import { BallCanvas } from '@/components/canvas';
import {
  useTheme,
  useMediaQuery,
} from '@mui/material';
interface SkillData {
  _type: string;
  name: string;
  bgColor: string;
  icon: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const mobileTheme = useTheme();
  const isMobile = useMediaQuery(mobileTheme.breakpoints.down('md'));

  useEffect(() => {

    const fetchSkills = async () => {
      const query = '*[_type == "skills" && !(_id in path("drafts.**"))]';

      client.fetch<SkillData[]>(query).then((data) => {
        setSkills(data);
      });

      setIsLoading(false);

    }

    fetchSkills();

  }, []);

  // const reducedSkills = skills.slice(0,10)

  return (
    <>
      <h2 className="head-text">My <span>Skills</span></h2>

      <div className="app__skills-container">

        {isLoading ?
          <>

          </> :

          <motion.div className="app__skills-list">

            {isMobile ?

              <>
                {skills.map((skill) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-item app__flex"
                    key={skill.name}

                  >
                    <div
                      className="app__flex"
                    // style={{ backgroundColor: skill.bgColor }}
                    >
                      <Image
                        width={45}
                        height={45}
                        src={urlFor(skill.icon).url()}
                        alt={skill.name} />
                    </div>
                    <p className="p-text" aria-label={`${skill.name}`}>{skill.name}</p>
                  </motion.div>
                ))}
              </>
              :
              <>
                {skills.map((skill) => (
                  <div key={skill.name} className="app__flex">
                    <div className='ball' >
                      <BallCanvas icon={urlFor(skill.icon).url()} />
                      <p className="p-text" style={{ textAlign: 'center'}} aria-label={`${skill.name}`}>{skill.name}</p>
                    </div>
                  </div>
                ))}
              </>

            }
          </motion.div>
        }
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, { classNames: 'app__skills' }),
  { idName: 'skills', classNames: '' }
);