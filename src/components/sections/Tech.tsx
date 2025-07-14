import { BallCanvas } from "../canvas";
import { useAccentColor } from "../../utils/useAccentColor";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";


import React from "react";

const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Tech = () => {
  const accent = useAccentColor();
  const [shuffled, setShuffled] = React.useState(technologies);

  const handleShuffle = () => {
    setShuffled(shuffleArray(shuffled));
  };

  return (
    <>
      <div className="flex justify-center mb-4 sm:mb-6 px-2 sm:px-0">
        <button
          className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-bold border-2 text-sm sm:text-base"
          style={{ borderColor: accent, color: accent }}
          onClick={handleShuffle}
        >
          Shuffle
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-10 px-2 sm:px-0">
        {shuffled.map((technology) => (
          <div className="h-20 w-20 sm:h-28 sm:w-28" key={technology.name}>
            <BallCanvas icon={technology.icon} accent={accent} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
