/**
 * MKULIMA SMART AI - SCRIPT KAMILI
 * Developer: Nashon Alfred
 */

const GEMINI_API_KEY = "AIzaSyB3R_geIR-seSQ0eQZ65DCVpGxeUHJkT5I";
const nambaYaBwanaShamba = "255797818582";

// 1. MASOKO
const marketData = [
    {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑", c: "text-success"},
    {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Sawa -", c: "text-secondary"},
    {z: "Nyanya", s: "Kilombero", b: "25k/Sado", h: "Shuka ↓", c: "text-danger"}
];

function loadMarket() {
    let html = "";
    marketData.forEach(m => {
        html += `<tr><td>${m.z}</td><td>${m.s}</td><td>${m.b}</td><td class="${m.c}">${m.h}</td></tr>`;
    });
    document.getElementById('marketTable').innerHTML = html;
}

// 2. SCANNER
let net;
async function startAI() { 
    try { net = await mobilenet.load(); } catch (e) { console.log("AI Load Error"); }
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const predictions = await net.classify(document.getElementById('previewImg'));
    resultDiv.innerText = "Nimeona: " + predictions[0].className;
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(ev) {
        document.getElementById('previewImg').src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        if(net) analyzeLeaf();
    };
    reader.readAsDataURL(e.target.files[0]);
});

// 3. SOIL TEST
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "Udongo Mweusi: Rutuba nyingi. Lima Mahindi." : color === "red" ? "Udongo Mwekundu: Ongeza samadi." : "Udongo wa Mchanga: Unafaa kwa tikiti.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. SEARCH
async function generateData() {
    const query = document.getElementById("userCrop").value.trim();
    if(!query) return;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query.toUpperCase();
    
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        document.getElementById("infoArea").innerHTML = data.extract ? `<p>${data.extract}</p>` : `<p>Uliza maelezo ya ${query} kwenye chat.</p>`;
    } catch (e) { document.getElementById("infoArea").innerHTML = "Error."; }
    
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}" target="_blank" class="btn btn-danger w-100">VIDEO ZA MAFUNZO</a>`;
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// 5. CHATBOT (FIXED)
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="user-msg">${msg}</div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="ai-msg" id="${loadingId}">Bwana Shamba anafikiria...</div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili: ${msg}` }] }] })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).innerText = aiText;
    } catch (err) {
        document.getElementById(loadingId).innerText = "Hitilafu: Hakikisha una internet.";
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

window.onload = () => { loadMarket(); startAI(); };
