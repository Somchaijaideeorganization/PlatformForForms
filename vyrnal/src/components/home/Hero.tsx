import React from "react";
import { FlipWords } from "../ui/flip-words";

import { Globe } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-screen flex flex-col justify-evenly items-center">
      <div className="leading-tight flex flex-col items-center md:gap-2">
        <FlipWords
          words={["Collaborate", "Contribute", "Capture"]}
          duration={1500}
          className="text-4xl md:text-7xl font-black"
        />
        <br />
        <h2
          className="scroll-m-20 text-xl md:text-3xl font-semibold
lg:text-5xl"
        >
          to the World of Research <Globe className="w-12 h-12 md:inline-block hidden" />
        </h2>
      </div>
    </div>
  );
};

export default Hero;
