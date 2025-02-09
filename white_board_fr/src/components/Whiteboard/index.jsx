import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    elements.forEach((element) => {
      roughCanvas.linearPath(element.path);
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => [
      ...prevElements,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]], // ✅ Fix: Changed 'Path' to 'path'
        stroke: "black",
      },
    ]);

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => {
      return prevElements.map((ele, index) => {
        if (index === prevElements.length - 1) {
          return {
            ...ele,
            path: [...ele.path, [offsetX, offsetY]], // ✅ Fix: Ensured 'path' exists
          };
        } else {
          return ele;
        }
      });
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-dark border-3 h-100 w-100"
    ></canvas>
  );
};

export default WhiteBoard;
