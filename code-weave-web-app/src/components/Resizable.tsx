import "./Resizable.css";

import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";

import type { ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ children, direction }) => {
  let resizableBoxProps: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [resizeBoxWidth, setResizeBoxWidth] = useState(
    window.innerWidth * 0.75
  );

  useEffect(() => {
    let timer: number;
    const handleResize = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);

        if (window.innerWidth * 0.75 < resizeBoxWidth) {
          setResizeBoxWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (direction === "horizontal") {
    resizableBoxProps = {
      className: "resize-horizontal",
      height: Infinity,
      width: resizeBoxWidth,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.25, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (_, data) => setResizeBoxWidth(data.size.width),
    };
  } else {
    resizableBoxProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }
  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
