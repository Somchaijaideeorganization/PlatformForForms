/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const Section = ({ opacityTransform, children, ...props }) => {
  const [zIndex, setZIndex] = useState(opacityTransform.get() > 0 ? 10 : 0);

  useEffect(() => {
    const onChange = (v) => {
      setZIndex(v > 0 ? 10 : 0);
    };

    opacityTransform.on("change", onChange);
    return () => {
      opacityTransform.on("change", () => {});
    };
  }, [opacityTransform, setZIndex]);

  return (
    <motion.div
      className="w-full h-[100vh] fixed top-0 flex flex-col gap-8 justify-center items-center bg-background"
      style={{
        opacity: opacityTransform,
        zIndex: zIndex,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Section;
