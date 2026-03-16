/**
 * MKULIMA SMART AI - FULL STABLE SCRIPT
 * Developer: Nashon Alfred
 * Powered by: Gemini 1.5 Flash
 */

const GEMINI_API_KEY = "AIzaSyB3R_geIR-seSQ0eQZ65DCVpGxeUHJkT5I";
const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO (Tanzania Context)
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

// 2. AI SCANNER (TensorFlow MobileNet)
let net;
async function startAI() { 
    try { 
        if (!net) net = await mobilenet.load(); 
        console.log("AI Model Loaded Successfully");
    } catch (e) { 
        console.error("AI Load Fail:", e); 
    }
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    resultDiv.innerHTML = `<div class="alert alert-info mt-2">Nimeona: <span class="text-primary">${predictions[0].className}</span></div>`;
}

// Sikiliza picha inapopakiwa
const imageInput = document.getElementById('imageUpload');
if (imageInput) {
    imageInput.addEventListener('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('previewImg').src = ev.target.result;
            document.getElementById('imagePreviewContainer').style.display = 'block';
            if (net) analyzeLeaf();
        };
        reader.readAsDataURL(e.target.files[0]);
    });
}

// 3. TEST UDONGO (Soil Analysis)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "✅ Udongo Mweusi: Rutuba nyingi. Lima Mahindi au Mbogamboga." : 
                 color === "red" ? "⚠️ Udongo Mwekundu: Lima Kahawa au Viazi. Ongeza samadi nyingi." : 
                 "⚠️ Udongo wa Mchanga: Unafaa kwa Tikiti Maji na Muhogo. Ongeza mbolea za chumvichumvi.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. TAFUTA MAZAO (Wikipedia Integration)
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
        document.getElementById("infoArea").innerHTML = data.extract ? `<p>${data.extract}</p>` : `<p>Maelezo ya ${query} yatatolewa na Bwana Shamba AI kwenye chat hapa chini.</p>`;
    } catch (e) { 
        document.getElementById("infoArea").innerHTML = "Hitilafu ya mtandao katika kutafuta data."; 
    }
    
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania" target="_blank" class="btn btn-outline-danger w-100 fw-bold">TAZAMA VIDEO ZA MAFUNZO</a>`;
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// 5. SAUTI (Voice to Text)
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sw-TZ';
    recognition.onresult = (e) => {
        document.getElementById("userCrop").value = e.results[0][0].transcript;
        generateData();
    };
    recognition.start();
}

// 6. 💬 BWANA SHAMBA AI (GEMINI CHATBOT)
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    // Onyesha ujumbe wa mkulima
    windowChat.innerHTML += `<div class="user-msg">${msg}</div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="ai-msg" id="${loadingId}">Bwana Shamba anafikiria...</div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        // Toleo la v1 (Stable) na gemini-1.5-flash
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni mtaalamu wa kilimo (Bwana Shamba) nchini Tanzania. Jibu swali hili kwa Kiswahili fasaha na kutoa ushauri wa kitaalamu: ${msg}` }] }]
            })
        });

        const data = await response.json();

        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            document.getElementById(loadingId).innerText = aiText;
        } else if (data.error) {
            document.getElementById(loadingId).innerText = "Google Error: " + data.error.message;
        } else {
            document.getElementById(loadingId).innerText = "Samahani, jaribu tena baadaye.";
        }
    } catch (err) {
        // Hapa ndipo inapokwama kama kuna Network Policy au CORS
        document.getElementById(loadingId).innerText = "Hitilafu: " + err.message + ". Hakikisha una internet!";
        console.error("Fetch Error:", err);
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// Inapakia kila kitu ukurasa unapofunguka
window.onload = () => { 
    loadMarket(); 
    startAI(); 
};
