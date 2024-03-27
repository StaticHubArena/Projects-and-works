const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chat_box = document.querySelector(".chat_box");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) =>{
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages : [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) =>{
        console.log(error);
    })
}

const handleChat = () =>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chat_box.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout (() => {
        chat_box.appendChild(createChatLi("Thinking...", "incoming")); 
        generateResponse();
    }, 600)
}

sendChatBtn.addEventListener("click", handleChat);