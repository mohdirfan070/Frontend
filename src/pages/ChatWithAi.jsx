import React, { useState, useRef, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const getResponseFromAi = async(prop)=>{
  // console.log(prop)
  try {
    const res = await axios.post(import.meta.env.VITE_backendUrl+'/gemini/product',prop);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error)
    return null;
  }
}

const getChatResponse = async(prop)=>{
  try {
    const res = await axios.post(import.meta.env.VITE_backendUrl+'/gemini/chat',prop);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error)
    return null;
  }
}


export default function ChatWithAi() {
  const navigate = useNavigate();
  const { productContext } = useProductContext();

  if (!productContext) {
    navigate("/scan");
  }

  const [chatMessages, setChatMessages] = useState([
    {
      text: "Hi there! \n How can I help you today?",
      time:  new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "ai",
    },
    
  ]);

  const [inputText, setInputText] = useState(`Tell me more about this product "${
        productContext?.product_name || productContext?.brands}"`);
  const [loading, setLoading] = useState(false);
  const [aiTypingText, setAiTypingText] = useState("");
  const [query , setQuery ] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, aiTypingText]);


  const handleSend =async () => {
    if (!inputText.trim() || loading) return;
         const newMessage = {
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
    };
     if (!query.trim() || loading) return;
         const newQuery = {
          text: query,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
    };

    setChatMessages((prev) => [...prev, newMessage || newQuery]);
    setInputText("");
    setLoading(true);
    setAiTypingText("Analyzing...");
  
    await getResponseFromAi({id:'070',username:'mohdirfan070',productName: productContext?.product_name,"product":{...productContext}}).then((res)=>{
      setAiTypingText("Generating Answer...");
      setTimeout(() => {
        const aiResponse = {
          data:{...res.data},
          text: res.data.msg +" "+ res.data.payload.productName ,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: "ai",
        };
        setChatMessages((prev) => [...prev, aiResponse]);
        setLoading(false);
      }, 3000);

       if(!res.data.msg){
          // setAiTypingText("Generating Answer...")
          setTimeout(() => {
            setChatMessages((prev) => [...prev , {
        text: "Can't Process Your Request \n Try Again After Sometime!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "ai",
      }]);
            setLoading(false);
          }, 2000);
        }
    }).catch((error)=>{
     console.log(error);
    })
      

    
    // const newMessage = {
    //   text: inputText,
    //   time: new Date().toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   }),
    //   sender: "user",
    // };

    // setChatMessages((prev) => [...prev, newMessage]);
    // setInputText("");
    // setLoading(true);

    // const typingPhrases = [
    //   "Analyzing...",
    //   "Understanding...",
    //   "Generating response...",
    // ];
    // let phraseIndex = 0;

    // const typingInterval = setInterval(() => {
    //   setAiTypingText(typingPhrases[phraseIndex]);
    //   phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    // }, 700);

    

    // setTimeout(() => {
    //   // clearInterval(typingInterval);
    //   setAiTypingText("");

    //   setChatMessages((prev) => [
    //     ...prev,
    //     {
    //       text: "after Thanks for your message! Let me look into that.",
    //       time: new Date().toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       }),
    //       sender: "ai",
    //     },
    //   ]);
    //   setLoading(false);
    // }, 9000);
  };




  return (
    <>
      {productContext ? (
        <div className="flex flex-col h-[80dvh] w-[100vw] bg-gray-100 rounded-md shadow-md z-[999]">
          {/* Header */}
          <div className="flex gap-x-[0.8vh] bg-green-600 text-white px-4 py-2 rounded-t-md">
            <Link to={"/barcode"}>
              <svg
                className="m-[1vh]"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </Link>
            <div>
              <h2 className="text-lg font-semibold">GeminiAI</h2>
              <p className="text-sm text-green-200">
                Product: {productContext.product_name || productContext.brands}
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="w-[100vw] flex-1 flex flex-col overflow-y-auto px-4 py-2 space-y-3">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[90%] whitespace-pre-line break-words ${
                  msg.sender === "user"
                    ? "self-end items-end"
                    : "self-start items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-pvt-color2 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
              </div>
            ))}

            {/* Typing Animation */}
            {loading && aiTypingText && (
              <div className="flex flex-col max-w-[90%] self-start items-start">
                <div className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 animate-pulse">
                  {aiTypingText}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
          

          {/* Input Bar */}
          <div className="flex min-h-[5vh] items-center px-4 py-[1vh] bg-white border-t">
            <textarea
              value={inputText || query }
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() =>
                bottomRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              autoFocus
              placeholder="Type your message..."
              rows={2}
              className="w-full text-[1.42rem] px-[0.75vh] py-[0vh] rounded-[0.5vh] resize-none focus:outline-none whitespace-pre-line focus:h-[5.8dvh] h-[4dvh] min-h-[4dvh]"
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className={`ml-2 px-4 py-2 rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pvt-color2 hover:bg-pvt-color5"
              } text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[100vh] w-[100vw] bg-gray-100 rounded-md shadow-md justify-center items-center">
          Please Scan Again Product Data Lost!
          <Link to={"/scan"}>
            <svg
              className="m-[1vh]"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0000FF"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </Link>
        </div>
      )}
    </>
  );
}
