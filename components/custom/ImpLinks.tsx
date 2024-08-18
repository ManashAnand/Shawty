
import React from "react";
import Leetcode from "./Leetcode";
import Github from "./Github";
import CodeForce from "./CodeForce";


const ImpLinks = () => {

  return (
    <>
    <div className="flex gap-4">

      <Leetcode  />
      <Github />
      <CodeForce/>
    </div>
    </>
  );
};

export default ImpLinks;
