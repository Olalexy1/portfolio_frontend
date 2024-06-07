import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { urlFor, client } from '../../client';
import Image from 'next/image';

interface SkillData {
  _type: string;
  name: string;
  bgColor: string;
  icon: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillData[]>([]);

  useEffect(() => {
    const query = '*[_type == "skills" && !(_id in path("drafts.**"))]';

    client.fetch<SkillData[]>(query).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">My <span>Skills</span></h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
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
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, { classNames: 'app__skills' }),
  { idName: 'skills', classNames: '' }
);