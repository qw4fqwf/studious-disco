import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";

const Hero = () => {
  // Robust fallbacks for hero section
  const heroName = typeof config.hero?.name === "string" && config.hero.name.trim() !== "" ? config.hero.name : "Manav Mahawar";
  const heroP0 = Array.isArray(config.hero?.p) && typeof config.hero.p[0] === "string" && config.hero.p[0].trim() !== "" ? config.hero.p[0] : "I'm a multidisciplinary creative specializing in design, writing, and digital media.";
  const heroP1 = Array.isArray(config.hero?.p) && typeof config.hero.p[1] === "string" && config.hero.p[1].trim() !== "" ? config.hero.p[1] : "I bring ideas to life through visuals, words, and content that connects.";

  return (

    <section className="relative mx-auto h-screen w-full">
      <div
        className={`absolute inset-0 top-[100px] mx-auto max-w-7xl ${styles.paddingX} flex flex-col sm:flex-row items-start gap-5 px-4 sm:px-8`}
      >
        <div className="mt-5 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0">
          <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-24 w-1 sm:h-40 md:h-80" />
        </div>

        <div className="w-full sm:w-auto">
          <h1 className={`${styles.heroHeadText} text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight`}>
            Hi, I'm <span className="text-[#915EFF]">{heroName}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2 text-base xs:text-lg sm:text-xl md:text-2xl max-w-[95vw] sm:max-w-xl`}>
            {heroP0}
            <br className="hidden sm:block" />
            {heroP1}
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="xs:bottom-10 absolute bottom-20 xs:bottom-10 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-12 w-8 sm:h-[64px] sm:w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
