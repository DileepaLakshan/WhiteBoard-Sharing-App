import { useState } from "react";
import "./index.css";

const RoomPage = () => {

    const [tool, setTool] = useState("pencil");
    return (
        <div className="row">
            <h1 className="text-center py-5">White Board Sharing App</h1>
            <div className="col-md-12 mt-4 mb-5 d-flex align-items-center justify-content-around ">
                <div className="d-flex col-md-4  justify-content-center-between gap-1">
                    <div className="d-flex gap-1">
                        <lable for="pencil" >Pencil</lable>
                    </div>
                    <input
                        type="radio"
                        name="tool"
                        id="pencil"
                        value="pencil"
                        onChange={(e) => setTool(e.target)} />

                    <div className="d-flex gap-1">
                        <lable for="line" >Line</lable>
                    </div>
                    <input
                        type="radio"
                       
                        name="tool"
                        id="line"
                        value="line"
                        onChange={(e) => setTool(e.target)} />

                    <div className="d-flex gap-1">
                        <lable for="pencil" >Pencil</lable>
                    </div>
                    <input
                        type="radio"
                        name="tool"
                        id="pencil"
                        value="pencil"
                        onChange={(e) => setTool(e.target)} />


                </div>

            </div>

        </div>
    )
}

export default RoomPage;
