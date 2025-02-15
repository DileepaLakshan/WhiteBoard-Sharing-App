import { useRef, useState } from "react";
import "./index.css";
import WhiteBoard from "../../components/Whiteboard";


const RoomPage = () => {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);



    return (
        <div className="row">
            <h1 className="text-center py-4">White Board Sharing App<span className="text-primary">[Users Online: 0]</span></h1>
            <div className="col-md-12 gap-3 mt-4 mb-5 d-flex align-items-center justify-content-between ">
                <div className="d-flex col-md-2  justify-content-center-between gap-3">
                    <div className="d-flex gap-1 align-items-center">
                        <lable html for="pencil" >Pencil</lable>
                    </div>
                    <input
                        type="radio"
                        name="tool"
                        id="pencil"
                        checked={tool==="pencil"}
                        value="pencil"
                        className="mt-1"
                        onChange={(e) => setTool(e.target.value)} />

                    <div className="d-flex gap-1 align-items-center">
                        <lable for="line" >Line</lable>
                    </div>
                    <input
                        type="radio"
                        name="tool"
                        id="line"
                        checked={tool==="line"}
                        value="line"
                        className="mt-1"
                        onChange={(e) => setTool(e.target.value)} />

                    <div className="d-flex  gap-1 align-items-center">
                        <lable for="rect" >Rectangle</lable>
                    </div>
                    <input
                        type="radio"
                        name="tool"
                        id="rect"
                        checked={tool==="rect"}
                        value="rect"
                        onChange={(e) => setTool(e.target.value)} />


                </div>
                <div className="col-md-2 mx-auto">
                    <div className="d-flex  align-items-center">
                        <lable htmlFor="color">Select Color:</lable>
                        <input
                        type="color"
                        id="color"
                        className="mt-1 ms-3"
                        value={color}
                        onChange={(e)=>setColor(e.target.value)}/>

                            
                            
                    </div>
                </div>
                <div className="col-md-3 d-flex gap-2">
                    <button className="btn btn-primary mt-1">Undo</button>
                    <button className="btn btn-outline-primary mt-1">Redo</button>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-danger">Clear Canvas</button>

                </div>

            </div>

            <div className="col-md-10 mx-auto mt-4 canvas-box ">
                <WhiteBoard 
                canvasRef={canvasRef} 
                ctxRef={ctxRef}
                elements = {elements}
                setElements={setElements}
                tool={tool}
                />

                

            </div>

        </div>
    )
}

export default RoomPage;
