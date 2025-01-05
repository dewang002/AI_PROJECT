import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "../../config/axios";

const Project = () => {
  const [showMember, setShowMember] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [user, setUser] = useState([]);
  const groupListRef = useRef(null);
  const location = useLocation();

  //this just add users in the popup modal
  const handleSelect = (id) => {
    const isSelected = selectedUser.includes(id);
    if (isSelected) {
      setSelectedUser(selectedUser.filter((userId) => userId !== id));
    } else {
      setSelectedUser([...selectedUser, id]);
    }
  };
  //this is to set the collaborators, who can access certain projects
  const settingCollaborators = () => {
    axios.put("/projects/add-user",
      {
        projectId: location.state.projectView.map(elem=>elem._id),
        users: Array.from(selectedUser),
      })
        .then((res) => {
          
          setModal(false);
        })
        .catch((err) => {
          console.log("error while adding collaborators "+err);
        });
  };

  useEffect(() => {
    axios
      .get("/users/all")
      .then((res) => {
        setUser(res.data.users);
      })
      .catch((err) => {
        console.log("error while showing all users");
      });
  }, []);

  useEffect(() => {
    //this handleclose just close the side bar when you click outside of the box
    const handleClose = (e) => {
      if (groupListRef.current && !groupListRef.current.contains(e.target)) {
        setShowMember(false);
      }
    };

    document.addEventListener("mousedown", handleClose);
    return () => {
      document.addEventListener("mousedown", handleClose);
    };
  });
  return (
    <div className="h-screen w-screen flex">
      <section className="relative sideBar flex flex-col max-w-[24%] h-full shadow-xl bg-zinc-300">
        <header className="w-full h-16 border-b-[1px] border-black flex justify-between items-center p-4 ">
          <button onClick={() => setModal(true)}>
            <IoMdPersonAdd size={24} />
          </button>
          <button onClick={() => setShowMember(true)}>
            <FaUserGroup size={24} />
          </button>
        </header>

        <div className="message_area cursor-default flex-grow flex flex-col ">
          <div className="messages flex-grow overflow-y-auto flex flex-col p-2">
            <div className="incoming_message">
              <small className="text-md font-semibold">userGmail</small>
              <h4 className="w-fit  max-w-[55%] bg-white p-1 rounded-lg">
                hello this is Surbhi,adfadf df asdf asdf adsf asdf asdf asdf{" "}
              </h4>
            </div>
            <div className="outgoing_message flex flex-col items-end ">
              <small className="text-md font-semibold">userGmail</small>
              <h4 className="w-fit max-w-[55%] bg-white p-1 rounded-lg">
                kya likha hai ye sab btau abhi hai ..aldjfladjflaodjf
                lasjdfoajsdl f
              </h4>
            </div>
          </div>

          <div className="message_input flex gap-4 w-full p-2">
            <input
              className="p-2 drop-shadow-xl w-full rounded"
              type="any"
              placeholder="type message..."
            />
            <button className="flex-grow hover:scale-95">
              {<GrSend size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`group_list w-full top-0 overflow-hidden transition-all  ${
            showMember ? "translate-x-0" : "translate-x-[-100%]"
          } h-full bg-zinc-400 absolute`}
          ref={groupListRef}
        >
          <header className="w-full h-16 border-b-[1px] border-black flex justify-end items-center p-4 ">
            <button onClick={() => setShowMember(false)}>
              <IoIosCloseCircleOutline size={24} />
            </button>
          </header>

          <div className="users flex flex-col gap-2 h-full w-full">
            <div className="user cursor-pointer hover:bg-zinc-300 p-2 flex items-center gap-2">
              <div className="p-1 bg-zinc-500 w-fit h-fit rounded-full">
                <CiUser size={24} />
              </div>
              <h3 className="font-semibold text-lg">dewang</h3>
            </div>
          </div>
        </div>
      </section>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/45">
          <div className=" bg-white w-1/5 rounded-lg shadow-lg p-6 ">
            <h2 className="text-lg font-bold mb-4">Add Collaborators</h2>
            <div className="max-h-[40vh] flex flex-col gap-2 overflow-auto">
              {user.map((elem) => (
                <div
                  key={elem._id}
                  onClick={() => handleSelect(elem?._id)}
                  className={`flex items-center gap-2 text-lg font-semibold hover:bg-zinc-300 ${
                    selectedUser.indexOf(elem?._id) != -1 ? "bg-zinc-300" : ""
                  } `}
                >
                  <CiUser /> {elem.email}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setModal(!modal)}
                className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 w-full rounded"
              >
                Cancel
              </button>
              <button
                onClick={settingCollaborators}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Project;
