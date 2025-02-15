import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements = [], setElements, tool, color }) => { // ✅ Ensured elements is always an array
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    if (!elements || elements.length === 0) return; // ✅ Prevents accessing elements when undefined

    const roughCanvas = rough.canvas(canvasRef.current);
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    elements.forEach((element) => {
      if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0


            }
          )
        );
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0
            }
          )
        );
      } else if (element.type === "pencil") {
        roughCanvas.linearPath(element.path || [],{
          stroke: element.stroke,
          strokeWidth: 5,
          roughness: 0
        }
          

        ); // ✅ Fallback to an empty array
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (!isDrawing || elements.length === 0) return; // ✅ Prevent errors when elements is empty

    setElements((prevElements) => {
      return prevElements.map((ele, index) => {
        if (index === prevElements.length - 1) {
          if (tool === "pencil") {
            return {
              ...ele,
              path: [...(ele.path || []), [offsetX, offsetY]], // ✅ Ensured 'path' exists
            };
          } else {
            return {
              ...ele,
              width: offsetX,
              height: offsetY,
            };
          }
        }
        return ele;
      });
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-dark border-3 h-100 w-100 overflow-hidden"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;
