import { useEffect, useRef, useState, } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();


const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements
}) => {

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctxRef.current = ctx;
  }, []);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements)=>[
      ...prevElements,
      {
        type: "pencil",
        offsetX,
        offsetY,
        Path: [[offsetX, offsetY]],
        storke: "black",


      },
    ])
    

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {

      //pencil by default as static
      const {path} = elements[elements.length -1];
      const newPath = [...path, [offsetX, offsetY]];

      setElements((prevElements))

    }

  }

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  }

  return (
    <>
      {JSON.stringify(elements)}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border border-dark border-3 h-100 w-100"

      ></canvas>
    </>
  );
};

export default WhiteBoard;


