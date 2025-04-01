"use client";

import React from "react";
import { motion } from "motion/react";

const Section = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="w-full h-[100vh] flex flex-col gap-8 justify-center items-center bg-background"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Section;
