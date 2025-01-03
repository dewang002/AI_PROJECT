import React, { useContext, useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import UserContext from "../../context/User.context";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [projectname, setProjectname] = useState("");
  const [projectView, setProjectView] = useState([]);
  const navigate = useNavigate();

  const createProject = (e) => {
    e.preventDefault();
    axios
      .post("/projects/create", {
        name: projectname,
      })
      .then((res) => {
        setModal(false);
      })
      .catch((error) => {
        console.log("error in home " + error);
      });
  };

  const handleProject = () => {
    navigate("/project", {
      state: { projectView },
    });
  };

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProjectView(res.data.projects);
      })
      .catch((e) => {
        console.log("while gettin projects");
      });
  }, []);

  return (
    <>
      <div className="project flex gap-4">
        <button
          className="flex items-center gap-4 text-lg text-[#2E5077] font-bold border-[#2E5077] border-2 rounded-xl p-4 "
          onClick={() => setModal(!modal)}
        >
          <IoAddCircleOutline size="20" style={{ color: "#2E5077" }} />
          New Project
        </button>

        {projectView.map((elem) => (
          <div
            key={elem._id}
            onClick={handleProject}
            className="project_tile w-fit p-2 text-lg font-bold border-2 rounded-md border-[#f0f0f0f0] my-4"
          >
            <h3>{elem.name}</h3>
            <div className="flex justify-start items-center">
              <IoPersonOutline />
              <h4>Collaboratores : &nbsp; {elem.users.length}</h4>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="modal_parent">
          <div className=" w-1/4 rounded-md bg-zinc-200 flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold">Create new Project</h3>
            <form onSubmit={createProject}>
              <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                <div className="h-8">
                  <h4>Name Project</h4>
                  <input
                    onChange={(e) => setProjectname(e.target.value)}
                    className=" rounded-md"
                    type="text"
                  />
                </div>

                <div className="flex">
                  <button
                    className="w-full text-white bg-zinc-600 rounded-md"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full text-white bg-blue-600 rounded-md"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
