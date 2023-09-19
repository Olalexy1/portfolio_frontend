import React, { useState, useEffect } from 'react';
import { AiOutlineLink, AiFillGithub, AiFillInfoCircle } from 'react-icons/ai';
import { HiX } from 'react-icons/hi';
import { BiLogoFigma } from 'react-icons/bi';
import { motion, TargetAndTransition } from 'framer-motion';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { urlFor, client } from '../../client';
import Image, { StaticImageData } from "next/image";
import Stack from '@mui/material/Stack';
import { images } from '@/util';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ProjectData {
    _type: string;
    imgUrl: string;
    name: string;
    projectLink: string;
    codeLink: string;
    title: string;
    description: string;
    figmaLink: string;
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
    const router = useRouter();
    const [toggle, setToggle] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);


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
                                <Link href={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? '#home' : project?.projectLink} target={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? "_self" : "_blank"} rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiOutlineLink />
                                    </motion.div>
                                </Link>
                                <Link href={project?.codeLink} target="_blank" rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillGithub />
                                    </motion.div>
                                </Link>

                                <span>
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                        onClick={() => {
                                            setSelectedProject(project);
                                            setToggle(true)
                                        }}
                                    >
                                        <AiFillInfoCircle />
                                    </motion.div>
                                </span>

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

            {toggle && selectedProject && (
                <motion.div
                    whileInView={{ x: [300, 0] }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                    className='app__project'
                // exit={{ opacity: 0 }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <h2 className="head-text">
                            {selectedProject.title} <span>Project</span>
                        </h2>
                        <HiX onClick={() => setToggle(false)} size='30' className='close_btn' />
                    </div>

                    <div className='app__project-content'>
                        <div
                            // whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                            // transition={{ duration: 0.10 }}
                            className="app__project-item"
                        // key={about.title + index}
                        >

                            <div className="gallery">
                                <div className="card">
                                    <div>
                                        <Image src={images.laptopFrame} alt="Laptop Frame" height={200} width={400} className='laptop-frame' />
                                        <img src={urlFor(selectedProject?.imgUrl).url()} alt="Website Screenshot" className="screenshot" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div
                            // whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                            // transition={{ duration: 0.10 }}
                            className="app__project-item"
                        // key={about.title + index}
                        >
                            <div className="project-desc">
                                <h4 className="bold-text">Project Description</h4>
                                <p className="p-text">
                                    {selectedProject.description}
                                </p>

                            </div>

                            <div className="project-desc">
                                <h4 className="bold-text">Tags</h4>
                                <div className='project-tag-content'>
                                    {selectedProject.tags.map((item, index) => (
                                        <span className="p-text" key={index}>{item}&nbsp;</span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-desc">
                                <h4 className="bold-text">Links and References</h4>
                                <ul className='project-links'>
                                    <li>
                                        <Link href={selectedProject?.projectLink} target={"_blank"} rel="noreferrer">
                                            <motion.div
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: 0.25 }}
                                                className="app__flex"
                                            >
                                                <AiOutlineLink size='30' />
                                            </motion.div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={selectedProject?.codeLink} target={"_blank"} rel="noreferrer">
                                            <motion.div
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: 0.25 }}
                                                className="app__flex"
                                            >
                                                <AiFillGithub size='30' />
                                            </motion.div>
                                        </Link>
                                    </li>
                                    {
                                        selectedProject.figmaLink && (
                                            <Link href={selectedProject?.codeLink} target={"_blank"} rel="noreferrer">
                                                <motion.div
                                                    whileInView={{ scale: [0, 1] }}
                                                    whileHover={{ scale: [1, 0.9] }}
                                                    transition={{ duration: 0.25 }}
                                                    className="app__flex"
                                                >
                                                    <BiLogoFigma />
                                                </motion.div>
                                            </Link>
                                        )
                                    }
                                </ul>
                            </div>

                        </div>
                    </div>


                </motion.div>
            )}

        </>
    );
};

export default AppWrap(
    MotionWrap(Projects, { classNames: 'app__works' }),
    { idName: 'portfolio', classNames: '' }
);
