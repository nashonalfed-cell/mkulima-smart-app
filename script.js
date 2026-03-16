/**
 * MKULIMA SMART AI - FULL VERSION 4.0
 * Developer: Nashon Alfred
 * Features: AI Chat, Leaf Scanner, Soil Test, Market Prices
 */

const GEMINI_API_KEY = "AIzaSyDnnwU81GTQpGxPECI5UEI7FrNL1MIaIPw"; 
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

// 2. 💬 AI CHAT NA WHATSAPP BUTTON
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="mb-2 text-end"><span class="bg-primary text-white p-2 rounded-3 d-inline-block shadow-sm" style="max-width: 80%;">${msg}</span></div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="mb-2" id="${loadingId}"><span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> Bwana Shamba anajibu...</span></div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili fasaha: ${msg}` }] }]
            })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content) {
            const aiText = data.candidates[0].content.parts[0].text;
            const waButton = `<br><br><a href="https://wa.me/${nambaYaBwanaShamba}?text=Habari, nina swali kuhusu: ${msg}" target="_blank" class="btn btn-sm btn-success fw-bold">WhatsApp Bwana Shamba</a>`;
            document.getElementById(loadingId).innerHTML = `<span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> ${aiText} ${waButton}</span>`;
        } else {
            document.getElementById(loadingId).innerHTML = `<span class="text-danger small">Kosa: Jaribu tena baadae.</span>`;
        }
    } catch (err) {
        document.getElementById(loadingId).innerHTML = `<span class="text-danger small">Hitilafu ya mtandao.</span>`;
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// 3. 🔍 AI LEAF SCANNER (TensorFlow)
let net;
async function startScanner() { 
    try { 
        if (typeof mobilenet !== 'undefined') {
            net = await mobilenet.load(); 
        }
    } catch (e) { console.error("Scanner Load Error:", e); }
}

async function analyzeLeaf() {
    if (!net) return;
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    resultDiv.innerHTML = `<div class="alert alert-info mt-2">Nimegundua: <span class="text-primary fw-bold">${predictions[0].className}</span></div>`;
}

// 4. 🌱 SOIL TEST (Ushauri wa Udongo)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "✅ Udongo Mweusi: Una rutuba sana. Lima Mahindi au Mbogamboga." : 
                 color === "red" ? "⚠️ Udongo Mwekundu: Ongeza samadi au mbolea ya asili. Lima Viazi au Kahawa." : 
                 "⚠️ Udongo wa Mchanga: Unafaa zaidi kwa Tikiti Maji na Karanga.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 5. INITIALIZATION (Kuwasha kila kitu kianze kufanya kazi)
document.addEventListener('DOMContentLoaded', () => {
    loadMarket();
    startScanner();

    // Kuweka picha ya jani inapochaguliwa
    const imageInput = document.getElementById('imageUpload');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                document.getElementById('previewImg').src = ev.target.result;
                document.getElementById('imagePreviewContainer').style.display = 'block';
                setTimeout(analyzeLeaf, 1500); // Inasubiri sekunde 1.5 kuchanganua
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }
});
