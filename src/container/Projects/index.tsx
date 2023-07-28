import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion, TargetAndTransition } from 'framer-motion';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { urlFor, client } from '../../client';
import Image, { StaticImageData } from "next/image";
import Stack from '@mui/material/Stack';
import NextLink from 'next/link';

interface ProjectData {
    _type: string;
    imgUrl: string;
    name: string;
    projectLink: string;
    codeLink: string;
    title: string;
    description: string;
    tags: string[];
}

interface AnimateCardState {
    y: number;
    opacity: number;
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [filterProject, setFilterProject] = useState<ProjectData[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState<AnimateCardState>({ y: 0, opacity: 1 });

    useEffect(() => {
        const query = '*[_type == "projects"]';

        client.fetch<ProjectData[]>(query).then((data) => {
            setProjects(data);
            setFilterProject(data);
        });
    }, []);

    const handleWorkFilter = (item: string) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });

        setTimeout(() => {
            setAnimateCard({ y: 0, opacity: 1 });

            if (item === 'All') {
                setFilterProject(projects);
            } else {
                setFilterProject(projects.filter((project) => project.tags.includes(item)));
            }
        }, 500);
    };

    return (
        <>
            <h2 className="head-text">
                My Creative <span>Portfolio</span> Section
            </h2>

            <div className="app__work-filter">
                {['All', 'Web App', 'Mobile App', 'React Js', 'React Native', 'Next Js', 'TypeScript'].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''
                            }`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__work-portfolio"
            >
                {filterProject.map((project, index) => (
                    <div className="app__work-item app__flex" key={index}>
                        <div className="app__work-img app__flex">
                            <Image
                                width={230}
                                height={230}
                                src={urlFor(project.imgUrl).url()}
                                alt={project.title} />

                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                className="app__work-hover app__flex"
                            >
                                <a href={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? '#home' : project?.projectLink} target={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? "_self" : "_blank"} rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillEye />
                                    </motion.div>
                                </a>
                                <a href={project?.codeLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillGithub />
                                    </motion.div>
                                </a>
                            </motion.div>
                        </div>

                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{project.title}</h4>
                            <p className="p-text" style={{ marginTop: 10 }}>
                                {project.description}
                            </p>

                        </div>

                        <div className='tag-content'>
                            <div>
                                {project.tags.map((item, index) => (
                                    <p className="p-text" key={index}>{item}&nbsp;</p>
                                ))}
                            </div>
                        </div>

                        <motion.div className="app__work-tag app__flex"
                            // initial={{ opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}>
                            <p className="p-text" style={{ color: '#fff' }}>Technology Used</p>
                        </motion.div>
                    </div>
                ))}
            </motion.div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Projects, { classNames: 'app__works' }),
    { idName: 'projects', classNames: '' }
);
