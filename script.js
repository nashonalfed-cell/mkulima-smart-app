/**
 * MKULIMA SMART AI - FULL COMPREHENSIVE SCRIPT
 * Developer: Nashon Alfred
 * Features: Chat, Scanner, Soil, Market, Wiki, WhatsApp Integration
 */

const GEMINI_API_KEY = "AIzaSyB3R_geIR-seSQ0eQZ65DCVpGxeUHJkT5I";
const nambaYaBwanaShamba = "255797818582";

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
    const table = document.getElementById('marketTable');
    if (table) table.innerHTML = rows;
}

// 2. AI SCANNER
let net;
async function startAI() { 
    try { 
        if (!net) net = await mobilenet.load(); 
    } catch (e) { console.error("AI Load Fail", e); }
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    resultDiv.innerHTML = `<div class="alert alert-info mt-2">Nimeona: <span class="text-primary">${predictions[0].className}</span></div>`;
}

// 3. SOIL TEST
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "✅ Udongo Mweusi: Rutuba nyingi sana. Lima Mahindi au Mbogamboga." : 
                 color === "red" ? "⚠️ Udongo Mwekundu: Ongeza samadi nyingi. Lima Kahawa au Viazi." : 
                 "⚠️ Udongo wa Mchanga: Unafaa kwa Tikiti Maji au Karanga.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. SEARCH MAZAO
async function generateData() {
    const query = document.getElementById("userCrop").value.trim();
    if (!query) return;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query.toUpperCase();
    
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        document.getElementById("infoArea").innerHTML = data.extract ? `<p>${data.extract}</p>` : `<p>Uliza maelezo zaidi kwa Bwana Shamba AI.</p>`;
    } catch (e) { document.getElementById("infoArea").innerHTML = "Hitilafu ya Wikipedia."; }
    
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}" target="_blank" class="btn btn-outline-danger w-100 fw-bold">TAZAMA VIDEO</a>`;
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// 5. 💬 GEMINI CHAT & WHATSAPP REDIRECT
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="mb-2 text-end"><span class="bg-primary text-white p-2 rounded-3 d-inline-block shadow-sm" style="max-width: 80%;">${msg}</span></div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="mb-2" id="${loadingId}"><span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> Inatafuta majibu...</span></div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili: ${msg}` }] }] })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            // Ongeza button ya WhatsApp ndani ya jibu la AI
            const waButton = `<br><br><a href="https://wa.me/${nambaYaBwanaShamba}?text=Habari, nina swali kuhusu: ${msg}" class="btn btn-sm btn-success">Ongea na Bwana Shamba WhatsApp</a>`;
            document.getElementById(loadingId).innerHTML = `<span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> ${aiText} ${waButton}</span>`;
        } else {
            document.getElementById(loadingId).innerHTML = `<span class="text-danger">Kosa la Google: ${data.error ? data.error.message : "Jaribu tena."}</span>`;
        }
    } catch (err) {
        document.getElementById(loadingId).innerHTML = `<span class="text-danger">Hitilafu: Jaribu kufungua kwenye Chrome au Refresh ukurasa.</span>`;
        console.error("Fetch Error:", err);
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// 6. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadMarket();
    startAI();

    const imageInput = document.getElementById('imageUpload');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                document.getElementById('previewImg').src = ev.target.result;
                document.getElementById('imagePreviewContainer').style.display = 'block';
                setTimeout(analyzeLeaf, 1000);
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }
});
