import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";

const Project = () => {
  const [showMember, setShowMember] = useState(false);
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="h-screen w-screen">
      <section className="relative sideBar flex flex-col max-w-[24%] h-full shadow-xl bg-zinc-300">
        <header className="w-full h-16 border-b-[1px] border-black flex justify-end items-center p-4 ">
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
            <button className="flex-grow hover:scale-95">{<GrSend size={24} />}</button>
          </div>
        </div>

        <div className={`w-full top-0 overflow-hidden transition-all  ${showMember?"translate-x-0":"translate-x-[-100%]"} h-full bg-zinc-400 absolute`}>
          <header className="w-full h-16 border-b-[1px] border-black flex justify-end items-center p-4 ">
            <button onClick={() => setShowMember(false)}>
              <IoIosCloseCircleOutline size={24} />
            </button>
          </header>

            <div className="users flex flex-col gap-2 h-full w-full">
                <div className="user cursor-pointer hover:bg-zinc-300 p-2 flex items-center gap-2">
                    <div className="p-1 bg-zinc-500 w-fit h-fit rounded-full" >
                        <CiUser size={"1.4vw"} />                        
                    </div>
                    <h3 className="font-semibold text-lg">dewang</h3>
                </div>
            </div>

        </div>


      </section>
    </div>
  );
};
export default Project;
