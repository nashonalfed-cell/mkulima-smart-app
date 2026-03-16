/**
 * MKULIMA SMART AI - FINAL STABLE VERSION
 * Developer: Nashon Alfred
 * API: Gemini 1.5 Flash
 */

const nambaYaBwanaShamba = "255797818582";
const GEMINI_API_KEY = "AIzaSyB3R_geIR-seSQ0eQZ65DCVpGxeUHJkT5I"; // API Key yako mpya

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
        rows += `<tr><td>${m.z}</td><td>${m.s}</td><td class="fw-bold">${m.b}</td><td class="${m.c} fw-bold">${m.h}</td></tr>`;
    });
    document.getElementById('marketTable').innerHTML = rows;
}

// 2. AI SCANNER
let net;
async function startAI() { 
    try { if (!net) net = await mobilenet.load(); } catch (e) { console.log("AI Load Error"); }
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    const res = predictions[0].className.toLowerCase();
    resultDiv.innerHTML = `<div class="alert alert-info mt-2">Matokeo: ${res}</div>`;
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(ev) {
        document.getElementById('previewImg').src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        if (net) analyzeLeaf();
    };
    reader.readAsDataURL(e.target.files[0]);
});

// 3. SOIL TEST
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "Udongo Mweusi: Rutuba nyingi sana." : color === "red" ? "Udongo Mwekundu: Ongeza samadi." : "Udongo wa Mchanga: Unafaa kwa tikiti.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. SEARCH MAZAO
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query.toUpperCase();
    
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        document.getElementById("infoArea").innerHTML = data.extract ? `<p>${data.extract}</p>` : `<p>Uliza maelezo ya ${query} kwenye chat hapo chini.</p>`;
    } catch (e) { document.getElementById("infoArea").innerHTML = "Hitilafu ya mtandao."; }
    
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}" target="_blank" class="btn btn-outline-danger w-100">TAZAMA VIDEO</a>`;
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// 5. SAUTI
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sw-TZ';
    recognition.onresult = (e) => {
        document.getElementById("userCrop").value = e.results[0][0].transcript;
        generateData();
    };
    recognition.start();
}

// 6. 💬 CHATI NA GEMINI AI (THE REAL DEAL)
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    // Onyesha ujumbe wa mkulima
    windowChat.innerHTML += `<div class="mb-2 text-end"><span class="bg-primary text-white p-2 rounded-3 d-inline-block">${msg}</span></div>`;
    input.value = "";
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="mb-2" id="${loadingId}"><span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> Inafikiria...</span></div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni mtaalamu wa kilimo (Bwana Shamba) nchini Tanzania. Jibu swali hili kwa Kiswahili: ${msg}` }] }]
            })
        });
        const data = await res.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).innerHTML = `<span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> ${aiResponse}</span>`;
    } catch (err) {
        document.getElementById(loadingId).innerHTML = `<span class="text-danger small">AI imekwama. Hakikisha API Key iko sawa na una bando.</span>`;
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

window.onload = () => { loadMarket(); startAI(); };
