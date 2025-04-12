import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <p className="text-primary font-extrabold text-xl md:text-2xl">Vyrnal</p>
    </Link>
  );
};

export default Logo;
