/**
 * MKULIMA SMART AI - DYNAMIC SEARCH VERSION
 * Developer: Nashon Alfred
 */

const GEMINI_API_KEY = "AIzaSyDnnwU81GTQpGxPECI5UEI7FrNL1MIaIPw";

// 🔍 TAFUTA ZAO LOLOTE (DYNAMIC SEARCH)
async function generateData() {
    const input = document.getElementById('userCrop').value.trim();
    const cropCard = document.getElementById('cropCard');
    const cropTitle = document.getElementById('cropTitle');
    const cropImage = document.getElementById('cropImage');
    const infoArea = document.getElementById('infoArea');
    const loading = document.getElementById('loadingSpinner');

    if (!input) {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    loading.style.display = "block";
    cropCard.style.display = "none";

    try {
        // Tunaiomba AI itupe maelezo na link ya picha kulingana na zao
        const prompt = `Nipe maelezo mafupi ya kitaalamu kuhusu kilimo cha zao la ${input} nchini Tanzania. Pia, nipe link moja ya picha ya zao hili kutoka Unsplash (https://source.unsplash.com/800x600/?${input}). Jibu kwa Kiswahili.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        // Sasisha muonekano
        cropTitle.innerText = input.toUpperCase();
        // Tunatumia picha ya moja kwa moja kulingana na jina la zao
        cropImage.src = `https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=60&w=800&crop=faces`; 
        // Kumbuka: Kwa matokeo bora ya picha, tunatumia mfumo wa keywords
        cropImage.src = `https://loremflickr.com/800/600/${input}`;

        infoArea.innerHTML = `<p class="mt-3">${aiResponse}</p>`;
        
        loading.style.display = "none";
        cropCard.style.display = "block";

    } catch (err) {
        loading.style.display = "none";
        alert("Kuna tatizo la mtandao, jaribu tena.");
    }
}

// 💬 AI CHAT NA BWANA SHAMBA
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="user-msg">${msg}</div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="ai-msg" id="${loadingId}">Bwana Shamba anajibu...</div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili: ${msg}` }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).innerHTML = aiText;
    } catch (err) {
        document.getElementById(loadingId).innerHTML = "Hitilafu ya mtandao.";
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// 💰 MARKET DATA (BEI)
document.addEventListener('DOMContentLoaded', () => {
    const marketTable = document.getElementById('marketTable');
    const items = [
        {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑"},
        {z: "Nyanya", s: "Ilala", b: "20k/Sado", h: "Shuka ↓"}
    ];
    marketTable.innerHTML = items.map(i => `<tr><td>${i.z}</td><td>${i.s}</td><td>${i.b}</td><td>${i.h}</td></tr>`).join('');
});

// 🧪 SOIL TEST
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    res.innerHTML = color === "black" ? "✅ Udongo Mweusi: Lima Mahindi." : "⚠️ Ongeza mbolea.";
}
