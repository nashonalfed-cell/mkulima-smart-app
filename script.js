/**
 * MKULIMA SMART AI - FULL SCRIPT
 * Developer: Nashon Alfred
 * Bwana Shamba: +255797818582
 * Powered by Gemini AI
 */

const nambaYaBwanaShamba = "255797818582";
const GEMINI_API_KEY = "AIzaSyCny-1dpLIFhclCdffYPtd-UnoWdn4AAI8";

// 1. BEI ZA MASOKO
const marketData = [
    {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑", c: "text-success"},
    {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Sawa -", c: "text-secondary"},
    {z: "Nyanya", s: "Kilombero", b: "25k/Sado", h: "Shuka ↓", c: "text-danger"},
    {z: "Ufuta", s: "Lindi", b: "3,350/kg", h: "Panda ↑", c: "text-success"}
];

function loadMarket() {
    let rows = "";
    marketData.forEach(m => {
        rows += `<tr>
            <td>${m.z}</td>
            <td>${m.s}</td>
            <td class="fw-bold text-dark">${m.b}</td>
            <td class="${m.c} fw-bold">${m.h}</td>
        </tr>`;
    });
    document.getElementById('marketTable').innerHTML = rows;
}

// 2. 📸 AI VISUAL SCANNER (TensorFlow)
let net;
async function startAI() { 
    try {
        if (!net) net = await mobilenet.load(); 
        console.log("AI Model Loaded!");
    } catch (e) { console.error("AI failed to load", e); }
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    const topResult = predictions[0].className.toLowerCase();

    const plantKeys = ["leaf", "plant", "tree", "flower", "fruit", "vegetable", "corn", "maize", "grass", "branch", "nature", "crop"];
    const diseaseKeys = ["spot", "rust", "mildew", "rot", "pest", "worm", "fungus", "blight", "damage", "wilt", "aphid", "bug", "yellow", "dry"];

    const isPlant = plantKeys.some(word => topResult.includes(word));
    const hasDisease = diseaseKeys.some(word => topResult.includes(word));

    if (!isPlant) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2 fw-bold">🛑 Huu sio mmea. Piga picha jani vizuri.</div>`;
    } else if (!hasDisease) {
        resultDiv.innerHTML = `<div class="alert alert-success mt-2 fw-bold">✅ Mmea unaonekana una afya!</div>`;
    } else {
        resultDiv.innerHTML = `<div class="alert alert-warning mt-2 fw-bold">⚠️ Tatizo: <span class="text-danger">${topResult}</span></div>`;
    }
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('previewImg').src = ev.target.result;
            document.getElementById('imagePreviewContainer').style.display = 'block';
            if (net) analyzeLeaf();
        };
        reader.readAsDataURL(file);
    }
});

// 3. 🧪 SOIL TEST
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "✅ Udongo Mweusi: Una rutuba sana. Unafaa kwa Mahindi na Nyanya." : 
                 color === "red" ? "⚠️ Udongo Mwekundu: Unafaa kwa Kahawa na Viazi, ongeza samadi." : 
                 "⚠️ Udongo wa Mchanga: Unafaa kwa Tikiti Maji na Muhogo.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. 🔍 SEARCH MAZAO
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query.toUpperCase();

    let detailedGuide = "";
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        detailedGuide = data.extract ? `<p>${data.extract}</p>` : `<p>Maelezo ya ${query} yatatolewa na Bwana Shamba AI kwenye chat hapo chini.</p>`;
    } catch (e) { detailedGuide = "<p>Shida ya mtandao imetokea.</p>"; }

    const waMsg = encodeURIComponent(`Habari Bwana Shamba, nahitaji msaada wa ${query.toUpperCase()}`);
    detailedGuide += `<div class="mt-4"><a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold">💬 WHATSAPP BWANA SHAMBA</a></div>`;
    
    document.getElementById("infoArea").innerHTML = detailedGuide;
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania" target="_blank" class="btn btn-outline-danger w-100">TAZAMA VIDEO ZA ${query.toUpperCase()}</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// 5. 🎤 SAUTI
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sw-TZ';
    recognition.onresult = (e) => {
        document.getElementById("userCrop").value = e.results[0][0].transcript;
        generateData();
    };
    recognition.start();
}

// 6. 💬 GEMINI AI CHAT
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="mb-2 text-end"><span class="bg-primary text-white p-2 rounded-3 d-inline-block">${msg}</span></div>`;
    input.value = "";
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="mb-2" id="${loadingId}"><span class="bg-white p-2 rounded-3 d-inline-block shadow-sm"><b>AI:</b> Inafikiria...</span></div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili: ${msg}` }] }] })
        });
        const data = await res.json();
        const responseText = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).innerHTML = `<span class="bg-white p-2 rounded-3 d-inline-block shadow-sm"><b>AI:</b> ${responseText}</span>`;
    } catch (error) {
        document.getElementById(loadingId).innerHTML = `<span class="text-danger">Hitilafu imetokea.</span>`;
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

window.onload = () => { loadMarket(); startAI(); };
