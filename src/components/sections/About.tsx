import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";

import DownloadResume from "../DownloadResume";
import { Header } from "../atoms/Header";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <Tilt
    glareEnable
    tiltEnable
    tiltMaxAngleX={30}
    tiltMaxAngleY={30}
    glareColor="#aaa6c3"
  >
    <div className="max-w-[250px] w-full xs:w-[250px]">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px] border"
        style={{ borderColor: 'var(--accent)', borderWidth: 2 }}
      >
        <div className="bg-tertiary flex min-h-[220px] sm:min-h-[280px] flex-col items-center justify-evenly rounded-[20px] px-6 py-4 sm:px-12 sm:py-5">
          <img
            src={icon}
            alt="web-development"
            className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
          />
          <h3 className="text-center text-[18px] sm:text-[20px] font-bold text-white">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-full sm:max-w-3xl text-[15px] sm:text-[17px] leading-[26px] sm:leading-[30px] px-2 sm:px-0"
      >
        {config.sections.about.content}
      </motion.p>

      {/* Animated Download Resume Button */}
      <div className="mt-8 flex justify-center sm:justify-start px-2 sm:px-0">
        <DownloadResume />
      </div>

      <div className="mt-10 sm:mt-20 flex flex-wrap gap-6 sm:gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
