import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "../../config/axios";
import {
  initializeSocket,
  reciveMessage,
  sendMessage,
} from "../../config/socket";
import UserContext from "../../context/User.context";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Project = () => {
  const location = useLocation();
  const [showMember, setShowMember] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [fileTree, setFileTree] = useState({});
  const [currentFile, setCurrentFile] = useState(null);
  const [openFile,setOpenFile] = useState([])

  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState(location.state.elem);
  const groupListRef = useRef(null);
  const messageBox = React.createRef();
  const { user } = useContext(UserContext);

  const handleInputText =(e)=>{
    clearTimeout(timer)
    const timer = setTimeout(()=>{
      setMessage(e.target.value)
    },300)
  }

  
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
    axios
      .put("/projects/add-user", {
        projectId: location.state.elem._id,
        users: Array.from(selectedUser),
      })
      .then((res) => {
        setModal(false);
      })
      .catch((err) => {
        console.log("error while adding collaborators " + err);
      });
  };

  const send = () => {
    sendMessage("project-message", {
      message,
      sender: user,
    });
    setMessages((prev) => [...prev, { sender: user, message: message }]);
    setMessage("");
  };

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message);

    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          children={messageObject.text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    initializeSocket(projects._id);

    reciveMessage("project-message", (data) => {
      const message = JSON.parse(data.message)
      console.log(message)
      if(message?.fileTree){
        setFileTree(message.fileTree)
      }
      setMessages((prev) => [...prev, data]);
    });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log("error while showing all users");
      });

    axios
      .get(`/projects/get-project/${location.state.elem._id}`)
      .then((res) => {
        setProjects(res.data.project);
      })
      .catch((err) => {
        console.log("error showing number of collaborators");
      });
  }, []);
  console.log(fileTree)

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

  const smoothScrollChat = () => {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  };

  return (
    <div className="h-screen w-screen flex">
      <section className="relative sideBar flex flex-col w-[32%] h-screen shadow-xl bg-zinc-300">
        <header className="absolute z-10 top-0 w-full h-16 border-b-[1px] border-black flex justify-between items-center p-4 ">
          <button onClick={() => setModal(true)}>
            <IoMdPersonAdd size={24} />
          </button>
          <button onClick={() => setShowMember(true)}>
            <FaUserGroup size={24} />
          </button>
        </header>

        <div className="message_area cursor-default h-full flex-grow flex flex-col pt-16 pb-10 relative">
          <div
            ref={messageBox}
            className="messages p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full"
          >
            {messages.map((elem, index) => (
              <div
                key={index}
                className={`${
                  elem.sender._id === "ai" ? "max-w-80" : "max-w-52"
                } ${
                  elem.sender._id == user._id.toString() && "ml-auto"
                }  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">
                  {elem.sender.email}
                </small>
                <div className="text-sm">
                  {elem.sender._id === "ai" ? (
                    WriteAiMessage(elem.message)
                  ) : (
                    <p>{elem.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="message_input flex absolute bottom-0 gap-4 w-full">
            <input
              value={message}
              onChange={handleInputText}
              className="p-2 drop-shadow-xl w-full rounded"
              type="any"
              placeholder="type message..."
            />
            <button onClick={send} className="flex-grow hover:scale-95">
              {<GrSend size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`group_list w-full z-10 top-0 overflow-hidden transition-all  ${
            showMember ? "translate-x-0" : "translate-x-[-100%]"
          } h-full bg-zinc-400 absolute`}
          ref={groupListRef}
        >
          <header className="w-full  h-16 border-b-[1px] border-black flex justify-between items-center p-4 ">
            <h1 className="text-lg font-semibold">Collaborators</h1>
            <button onClick={() => setShowMember(false)}>
              <IoIosCloseCircleOutline size={24} />
            </button>
          </header>
          <div className="users flex flex-col gap-2 h-full w-full">
            {projects?.users &&
              projects?.users.map((elem) => (
                <div
                  key={elem._id}
                  className="user cursor-pointer hover:bg-zinc-300 p-2 flex items-center gap-2"
                >
                  <div className="p-1 bg-zinc-500 w-fit h-fit rounded-full">
                    <CiUser size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">{elem.email}</h3>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="work_space h-full flex-grow flex">
        <div className="max-w-40 min-w-32 h-full bg-slate-200">
          <div className="fileTree w-full">
            {Object.keys(fileTree).map((elem) => {
              return (
                <button
                  onClick={() =>{ setCurrentFile(elem)
                    setOpenFile([...new Set([...openFile, elem])])
                  }}
                  className="treeElement w-full p-2 bg-zinc-400"
                >
                  <p className="font-semibold text-lg text-zinc-200">{elem}</p>
                </button>
              );
            })}
          </div>
        </div>

        {currentFile && (
          <div className="code_editor flex flex-col flex-grow h-full">
            <div className="top px-2 bg-black flex gap-2">
              {
                openFile.map((elem)=>(
                  <button onClick={()=>setCurrentFile(elem)} className={`font-bold text-zinc-200 p-2 text-lg ${currentFile==elem?'bg-zinc-400':''}`}>{elem}</button>

                ))
              }
            </div>
            <div className="bottom flex flex-grow ">
              {fileTree[currentFile] && (
                 <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                 <pre
                     className="hljs h-full">
                     <code
                         className="hljs h-full outline-none"
                         contentEditable
                         suppressContentEditableWarning
                         onBlur={(e) => {
                             const updatedContent = e.target.innerText;
                             const ft = {
                                 ...fileTree,
                                 [ currentFile ]: {
                                     file: {
                                         contents: updatedContent
                                     }
                                 }
                             }
                             setFileTree(ft)
                             saveFileTree(ft)
                         }}
                         dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[ currentFile ].file.contents).value }}
                         style={{
                             whiteSpace: 'pre-wrap',
                             paddingBottom: '25rem',
                             counterSet: 'line-numbering',
                         }}
                     />
                 </pre>
             </div>
              )}
            </div>
          </div>
        )}
      </section>

      {modal && (
        <div className="fixed  inset-0 flex items-center justify-center bg-black/45">
          <div className=" bg-white w-1/5 rounded-lg shadow-lg p-6 ">
            <h2 className="text-lg font-bold mb-4">Add Collaborators</h2>
            <div className="max-h-[40vh] flex flex-col gap-2 overflow-auto">
              {users.map((elem) => (
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
