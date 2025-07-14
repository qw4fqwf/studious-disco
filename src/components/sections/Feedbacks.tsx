import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { fadeIn } from "../../utils/motion";
import { testimonials } from "../../constants";
import { Header } from "../atoms/Header";
import { TTestimonial } from "../../types";
import { Carousel } from "../atoms/Carousel";
import { config } from "../../constants/config";

const FeedbackCard: React.FC<{ index: number } & TTestimonial> = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 xs:w-[320px] w-full rounded-3xl p-6 sm:p-10 border"
    style={{ borderColor: 'var(--accent)', borderWidth: 2 }}
  >
    <p className="text-[32px] sm:text-[48px] font-black text-white">"</p>

    <div className="mt-1">
      <p className="text-[15px] sm:text-[18px] tracking-wider text-white">{testimonial}</p>

      <div className="mt-7 flex items-center justify-between gap-1">
        <div className="flex flex-1 flex-col">
          <p className="text-[14px] sm:text-[16px] font-medium text-white">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="text-secondary mt-1 text-[11px] sm:text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
      <div className="bg-black-100 mt-8 sm:mt-12 rounded-[20px]">
      <div
        className={`${styles.padding} bg-tertiary min-h-[200px] sm:min-h-[300px] rounded-2xl`}
      >
        <Header useMotion={true} {...config.sections.feedbacks} />
      </div>
      <div className={`${styles.paddingX} -mt-10 sm:-mt-20 pb-10 sm:pb-14 flex justify-center px-2 sm:px-0`}>
        <Carousel
          items={testimonials}
          autoRotateMs={6000}
          renderItem={(testimonial, index) => (
            <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
          )}
        />
      </div>
    </div>
  );
};

export default Feedbacks;
