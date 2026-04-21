import { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const [sidebar, setSidebar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [animatedText, setAnimatedText] = useState("");

  const [contextMenu, setContextMenu] = useState(null);

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const userName = localStorage.getItem("user") || "User";

  useEffect(() => {
    const text = `Hi ${userName}`;
    let i = 0;

    const interval = setInterval(() => {
      i++;
      setAnimatedText(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, [userName]);

  const newChat = () => {
    const chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };
    setChats((prev) => [chat, ...prev]);
    setCurrentChatId(chat.id);
    setSidebar(false);
  };

  const clearCurrentChat = () => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [] }
          : chat
      )
    );
  };

  const duplicateChat = () => {
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat) return;

    const copy = {
      ...chat,
      id: Date.now(),
      title: chat.title + " Copy",
    };

    setChats((prev) => [copy, ...prev]);
  };

  const openRename = () => {
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat) return;
    setRenameValue(chat.title);
    setRenameOpen(true);
  };

  const saveRename = () => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, title: renameValue }
          : chat
      )
    );
    setRenameOpen(false);
  };

  const currentChat = chats.find((c) => c.id === currentChatId);

  useEffect(() => {
  if (!currentChatId && chats.length === 0) {
    newChat();
  }
}, [currentChatId, chats]);

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // typing animation
 const typeBotMessage = (fullText) => {
  let index = 0;

  const interval = setInterval(() => {
    index++;

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== currentChatId) return chat;

        const updatedMessages = [...chat.messages];
        const lastIndex = updatedMessages.length - 1;

        // 👇 SAME LAST MESSAGE UPDATE (NO NEW MESSAGE)
        updatedMessages[lastIndex] = {
          sender: "bot",
          text: fullText.slice(0, index),
          loading: false,
        };

        return { ...chat, messages: updatedMessages };
      })
    );

    if (index >= fullText.length) {
      clearInterval(interval);
      setTyping(false);
    }
  }, 20);
};

  const sendMessage = async () => {
    if (!message.trim()) return;

    const msg = message;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? msg.slice(0, 20)
                  : chat.title,
              messages: [...chat.messages, { sender: "user", text: msg }],
            }
          : chat
      )
    );

    setMessage("");
    setTyping(true);
    setChats((prev) =>
  prev.map((chat) =>
    chat.id === currentChatId
      ? {
          ...chat,
          messages: [
            ...chat.messages,
            { sender: "bot", text: "", loading: true },
          ],
        }
      : chat
  )
);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/chat", {
        message: msg,
      });

      typeBotMessage(res.data.reply);

    } catch {
      setTyping(false);
    }
  };

  const deleteChat = (id) => {
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);
    setCurrentChatId(updated[0]?.id || null);
  };

  return (
    <div className={`${dark ? "bg-[#0f172a] text-white" : "bg-[#f5f5f5] text-black"} flex h-screen`}>

      {/* SIDEBAR */}
      <div className={`fixed left-0 top-0 h-full w-64 ${dark ? "bg-[#020617]" : "bg-white"} p-4 shadow transition flex flex-col ${sidebar ? "translate-x-0" : "-translate-x-full"}`}>
        
        <button className="mb-3" onClick={() => setSidebar(false)}>✕</button>

        <h2 className="mb-4 font-bold">Menu</h2>

        <div onClick={newChat} className="cursor-pointer p-2 rounded hover:bg-gray-300 mb-2">
          ➕ New Conversation
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div onClick={clearCurrentChat} className="cursor-pointer p-2 rounded hover:bg-gray-300">
            🧹 Clear Chat
          </div>

          <div onClick={duplicateChat} className="cursor-pointer p-2 rounded hover:bg-gray-300">
            📋 Duplicate Chat
          </div>

          <div onClick={openRename} className="cursor-pointer p-2 rounded hover:bg-gray-300">
            ✏️ Rename Chat
          </div>
        </div>
       
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setCurrentChatId(chat.id)}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({
                x: e.pageX,
                y: e.pageY,
                id: chat.id,
              });
            }}
            className="p-2 rounded hover:bg-gray-300 cursor-pointer"
          >
            {chat.title}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="flex justify-between items-center p-4">
          <button onClick={() => setSidebar(!sidebar)}>☰</button>

          <div className="flex items-center gap-3">
            <button onClick={() => setDark(!dark)}>
              {dark ? "🌞" : "🌙"}
            </button>

            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer"
              >
                {userName[0]}
              </div>

              {profileOpen && (
                <div className={`absolute right-0 mt-2 p-3 rounded shadow ${
                  dark ? "bg-[#1e293b]" : "bg-white"
                }`}>
                  <div className="mb-2 font-semibold">{userName}</div>

                  <div
                    className="cursor-pointer text-red-400"
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    🔴 Sign out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER */}
        {currentChat?.messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">

            <h2 className="text-lg opacity-70 mb-2">
              {animatedText}
            </h2>

            <h1 className="text-3xl font-semibold mb-6 text-center">
              I'm ready to help you plan, study, bring ideas
              to life and more.
            </h1>

            <div className={`w-[600px] rounded-2xl shadow p-4 flex items-center gap-3 ${
              dark ? "bg-[#1e293b]" : "bg-white"
            }`}>

              <button>➕</button>

              <input
                className={`flex-1 outline-none ${
                  dark ? "bg-transparent text-white" : ""
                }`}
                placeholder="Enter a prompt..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <button>🎤</button>

              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Send
              </button>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto items-center">

      {currentChat?.messages.map((msg, i) => (
  <div key={i} className="w-[600px] flex mb-4">

    {msg.sender === "user" ? (
      // USER → RIGHT
      <div className="ml-auto text-[15px] leading-relaxed whitespace-pre-wrap">
        {msg.text}
      </div>
    ) : (
      // BOT → LEFT
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm">
          ✦
        </div>

        <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
          {msg.loading ? (
  <>
    <span className="text-lg"></span>
    <span className="animate-bounce">.</span>
    <span className="animate-bounce delay-100">.</span>
    <span className="animate-bounce delay-200">.</span>
  </>
) : (
  msg.text
)}
          {typing && i === currentChat.messages.length - 1 && (
            <span className="animate-pulse ml-1">|</span>
          )}
        </div>
      </div>
    )}

  </div>
))}

            
            <div className="mt-auto flex justify-center">
              <div className={`w-[600px] flex items-center gap-3 px-4 py-3 rounded-full shadow ${
                dark ? "bg-[#1e293b]" : "bg-white"
              }`}>

                <input
                  className={`flex-1 outline-none ${
                    dark ? "bg-transparent text-white" : ""
                  }`}
                  placeholder="Ask anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <button
                  onClick={sendMessage}
                  className="text-blue-500 font-medium"
                >
                  Send
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* RENAME POPUP */}
      {renameOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow text-black w-80">
            <h2 className="mb-3 font-semibold">Rename Chat</h2>

            <input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setRenameOpen(false)} className="px-3 py-1 border rounded">
                Cancel
              </button>

              <button onClick={saveRename} className="px-3 py-1 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT CLICK MENU */}
      {contextMenu && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="absolute bg-white shadow p-2 rounded"
        >
          <div
            onClick={() => {
              deleteChat(contextMenu.id);
              setContextMenu(null);
            }}
            className="cursor-pointer"
          >
            Delete Chat
          </div>
        </div>
      )}
    </div>
  );
}