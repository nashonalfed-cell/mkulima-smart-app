/**
 * MKULIMA SMART AI - THE MASTER ENGINE
 * Bwana Shamba: +255797818582
 */

const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO
const marketData = [
    {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑"},
    {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Sawa -"},
    {z: "Nyanya", s: "Ilala", b: "25k/Sado", h: "Shuka ↓"},
    {z: "Ufuta", s: "Lindi", b: "3,350/kg", h: "Panda ↑"}
];

function loadMarket() {
    let rows = "";
    marketData.forEach(m => {
        rows += `<tr><td>${m.z}</td><td>${m.s}</td><td class="fw-bold text-success">${m.b}</td><td>${m.h}</td></tr>`;
    });
    document.getElementById('marketTable').innerHTML = rows;
}

// 2. 📸 AI SCANNER LOGIC (RUDISHWA)
let net;
async function startAI() { 
    net = await mobilenet.load(); 
    console.log("AI Scanner Ready");
}

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (ev) => {
        document.getElementById('previewImg').src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        
        // AI Analysis
        const res = await net.classify(document.getElementById('previewImg'));
        document.getElementById('scanResult').innerHTML = `AI Imegundua: ${res[0].className} <br> <small>Tuma picha WhatsApp kwa ushauri zaidi.</small>`;
    };
    reader.readAsDataURL(file);
});

// 3. 🧪 SOIL TEST LOGIC (RUDISHWA)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = "";
    if(color === "black") msg = "✅ Udongo Bora! Tumia mbolea kidogo ya kukuzia (UREA).";
    else if(color === "red") msg = "⚠️ Udongo una asidi. Weka chokaa ya kilimo (Lime) na samadi.";
    else msg = "ℹ️ Udongo wa mchanga. Ongeza samadi nyingi na mbolea ya NPK.";
    
    res.innerHTML = `<strong>Ushauri:</strong> ${msg}`;
}

// 4. 🔍 MAZAO 200+ SEARCH
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},farming`;
    document.getElementById("cropTitle").innerText = query;

    let html = `<div class="p-3 bg-light rounded mb-3"><h6>✅ MWONGOZO</h6><p>Zao la ${query} linahitaji uangalizi wa wadudu na mbolea sahihi.</p></div>`;

    // Wikipedia Details
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            html += `<div class="p-3 border-start border-4 border-success mb-3 bg-white shadow-sm">
                <h6>📖 MAELEZO YA KINA</h6>
                <p class="small">${data.extract}</p>
            </div>`;
        }
    } catch (e) { }

    // WhatsApp Button
    const waMsg = encodeURIComponent(`Habari Bwana Shamba, nimekwama kwenye kilimo cha ${query}`);
    html += `
        <div class="mt-4 p-3 text-center border rounded bg-light">
            <p class="fw-bold mb-2">Unahitaji msaada wa Bwana Shamba?</p>
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold">
                💬 ONGEA NA MI MI WHATSAPP
            </a>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}" target="_blank" class="btn btn-danger w-100 btn-sm">📺 TAZAMA VIDEO ZA KILIMO HIKI</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// Start Everything
window.onload = () => { loadMarket(); startAI(); };
