import React, { useState, useEffect } from 'react';
import { AiOutlineLink, AiFillGithub, AiFillInfoCircle, AiFillAndroid, AiFillApple } from 'react-icons/ai';
import { HiX } from 'react-icons/hi';
import { BiLogoFigma } from 'react-icons/bi';
import { motion, TargetAndTransition } from 'framer-motion';
import { AppWrap, MotionWrap } from '@/components/Wrapper';
import { urlFor, client } from '../../client';
import Image, { StaticImageData } from "next/image";
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube'

interface ProjectData {
    _type: string;
    imgUrl: string;
    imgUrlTwo: string;
    name: string;
    projectLink: string;
    codeLink: string;
    title: string;
    description: string;
    videoLink: string;
    downloadLink: string;
    figmaLink: string;
    androidLink: string;
    iphoneLink?: string;
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
    const [toggle, setToggle] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);


    useEffect(() => {
        const query = `*[_type == "projects" && !(_id in path("drafts.**"))] | order(_createdAt desc)`

        client.fetch<ProjectData[]>(query).then((data) => {
            setProjects(data);
            setFilterProject(data);
        });
    }, []);

    // 'videoURL': projects.video.asset._ref

    // const asset = selectedProject?.video.asset._ref

    // const videoUrl = new URL(`${asset}?dl=`, baseUrl);

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
            <h1 className="head-text">
                My Creative <span>Portfolio</span> Section
            </h1>

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
                                src={urlFor(project?.imgUrlTwo).url()}
                                alt={project.title} />

                            <motion.div
                                whileInView={{ opacity: [0, 0.8] }}
                                // whileHover={{ opacity: [0, 1] }}
                                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                className="app__work-hover app__flex"
                            >

                                {
                                    project.projectLink && (
                                        <Link href={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? '#home' : project?.projectLink} target={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? "_self" : "_blank"} rel="noreferrer" aria-label={`Link to ${project.name} website`}>
                                            <motion.div
                                                whileInView={{ scale: [0, 1] }}
                                                whileHover={{ scale: [1, 0.9] }}
                                                transition={{ duration: 0.25 }}
                                                className="app__flex"
                                            >
                                                <AiOutlineLink />
                                            </motion.div>
                                        </Link>
                                    )
                                }
                                {/* 
                                <Link href={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? '#home' : project?.projectLink} target={project?.projectLink === 'https://lexy-portfolio-frontend.vercel.app/' ? "_self" : "_blank"} rel="noreferrer">
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiOutlineLink />
                                    </motion.div>
                                </Link> */}
                                <Link href={project?.codeLink} target="_blank" rel="noreferrer" aria-label={`Link to ${project.name} github`}>
                                    <motion.div
                                        whileInView={{ scale: [0, 1] }}
                                        whileHover={{ scale: [1, 0.9] }}
                                        transition={{ duration: 0.25 }}
                                        className="app__flex"
                                    >
                                        <AiFillGithub />
                                    </motion.div>
                                </Link>

                                {project.tags.includes('Mobile App') && (
                                    <Link href={project?.androidLink || '#'} target={"_blank"} rel="noreferrer" aria-label={`Link to ${project.name} APK download`}>
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.9] }}
                                            transition={{ duration: 0.25 }}
                                            className="app__flex"
                                        >
                                            <AiFillAndroid />
                                        </motion.div>
                                    </Link>
                                )}

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
                            <h2 className="bold-text">{project.title}</h2>
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
                    <div className='app__project-header'>
                        <h1 className="project-head-text">
                            {selectedProject.title} <span>Project</span>
                        </h1>

                        <HiX onClick={() => setToggle(false)} size='30' className='close_btn' />
                    </div>

                    <div className='app__project-content'>
                        <div
                            className="app__project-item"
                        >

                            <div className="gallery">
                                <div className="card">
                                    {selectedProject.tags.includes('Mobile App') &&
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Image src={urlFor(selectedProject?.imgUrl).url()} alt="Mobile App Screenshot" height={200} width={300} className='mobile-frame' loading='lazy' />
                                        </div>
                                    }
                                    {selectedProject.tags.includes('Web App') &&
                                        <div>
                                            <Image src={urlFor(selectedProject?.imgUrl).url()} alt="Website Screenshot" height={400} width={500} className='laptop-frame'
                                                loading='lazy' />
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>
                        <div
                            className="app__project-item"
                        >
                            <div className="project-desc">
                                <h2 className="bold-text">Project Description</h2>
                                <p className="p-text" style={{ marginBottom: '20px' }}>
                                    {selectedProject.description}
                                </p>

                                {selectedProject?.videoLink && (
                                    <ReactPlayer
                                        url={selectedProject.videoLink}
                                        playing={true}
                                        width={'100%'}
                                    />
                                )}
                            </div>

                            <div className="project-desc">
                                <h2 className="bold-text">Project Tags</h2>
                                <div className='project-tag-content'>
                                    {selectedProject.tags.map((item, index) => (
                                        <span className="p-text" key={index}>{item}&nbsp;</span>
                                    ))}
                                </div>
                            </div>

                            <div className="project-desc">
                                <h2 className="bold-text">Links and References</h2>
                                <ul className='project-links'>
                                    {
                                        selectedProject?.projectLink && (
                                            <li>
                                                <Link href={selectedProject?.projectLink} target={"_blank"} rel="noreferrer" aria-label={`Link to ${selectedProject.name} website`}>
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

                                        )
                                    }
                                    <li>
                                        <Link href={selectedProject?.codeLink} target={"_blank"} rel="noreferrer" aria-label={`Link to ${selectedProject.name} github`}>
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
                                            <li>
                                                <Link href={selectedProject?.figmaLink} target={"_blank"} rel="noreferrer" aria-label={`Link to ${selectedProject.name} figma`}>
                                                    <motion.div
                                                        whileInView={{ scale: [0, 1] }}
                                                        whileHover={{ scale: [1, 0.9] }}
                                                        transition={{ duration: 0.25 }}
                                                        className="app__flex"
                                                    >
                                                        <BiLogoFigma size='28' />
                                                    </motion.div>
                                                </Link>
                                            </li>
                                        )
                                    }

                                    {selectedProject.tags.includes('Mobile App') &&

                                        <>
                                            <li>
                                                <Link href={selectedProject?.androidLink || '#'} target={"_blank"} rel="noreferrer" aria-label={`Link to ${selectedProject.name} APK download`}>
                                                    <motion.div
                                                        whileInView={{ scale: [0, 1] }}
                                                        whileHover={{ scale: [1, 0.9] }}
                                                        transition={{ duration: 0.25 }}
                                                        className="app__flex"
                                                    >
                                                        <AiFillAndroid size='30' />
                                                        <span className='project-info-tip'>
                                                            Download APK File
                                                        </span>
                                                    </motion.div>
                                                </Link>
                                            </li>

                                            {/* <li>
                                                <Link href={selectedProject?.iphoneLink || '#'} target={"_blank"} rel="noreferrer">
                                                    <motion.div
                                                        whileInView={{ scale: [0, 1] }}
                                                        whileHover={{ scale: [1, 0.9] }}
                                                        transition={{ duration: 0.25 }}
                                                        className="app__flex"
                                                    >
                                                        <AiFillApple size='30' />
                                                    </motion.div>
                                                </Link>
                                            </li> */}
                                        </>
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
