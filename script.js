/**
 * MKULIMA SMART AI - FULL ENGINE
 * Bwana Shamba: +255797818582
 * MAREKEBISHO: Scanner sasa inatambua Mmea, Afya, na Sio Mmea.
 */

const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO (Vilevile kama mwanzo)
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

// 2. 📸 AI VISUAL SCANNER (MAREKEBISHO YAKO YAMEWEKWA HAPA)
let net;
async function startAI() { 
    net = await mobilenet.load(); 
    console.log("AI Scanner Ready");
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    
    resultDiv.innerHTML = "Inachambua... / Analyzing...";
    
    // AI inaanza uchambuzi
    const predictions = await net.classify(img);
    
    // Matokeo ya kwanza (Top prediction)
    const topResult = predictions[0].className.toLowerCase();
    const score = predictions[0].probability;

    // Maneno yanayoashiria Mmea/Majani
    const plantWords = ["leaf", "plant", "tree", "flower", "fruit", "vegetable", "corn", "maize", "grass", "branch", "root"];
    // Maneno yanayoashiria Ugonjwa
    const diseaseWords = ["spot", "rust", "mildew", "rot", "pest", "caterpillar", "worm", "fungus", "blight", "damage"];

    const isPlant = plantWords.some(word => topResult.includes(word));
    const hasDisease = diseaseWords.some(word => topResult.includes(word));

    // A. Angalia kama SIO MMEA
    if (!isPlant && score < 0.2) {
        resultDiv.innerHTML = `
            <div class="alert alert-danger mt-2">
                🛑 Huu sio mmea / This is not a plant.<br>
                <small>Tafadhali piga picha jani au sehemu ya mmea.</small>
            </div>`;
    } 
    // B. Angalia kama JANI HALINA TATIZO
    else if (!hasDisease) {
        resultDiv.innerHTML = `
            <div class="alert alert-success mt-2">
                ✅ Hamna tatizo / This leaf is healthy.<br>
                <small>AI haijaona ugonjwa wowote kwenye picha hii.</small>
            </div>`;
    } 
    // C. Angalia kama LINA SHIDA (Ugonjwa)
    else {
        resultDiv.innerHTML = `
            <div class="alert alert-warning mt-2">
                ⚠️ Changamoto Imetambulika: <b>${topResult}</b><br>
                <small>Kuna dalili za ugonjwa au wadudu. Tuma picha WhatsApp kwa Bwana Shamba kwa msaada.</small>
            </div>`;
    }
}

// Event Listener ya Image Upload
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('previewImg').src = ev.target.result;
            document.getElementById('imagePreviewContainer').style.display = 'block';
            
            // Subiri kidogo picha ipande kisha anza uchambuzi
            setTimeout(analyzeLeaf, 800);
        };
        reader.readAsDataURL(file);
    }
});

// 3. 🧪 SOIL TEST LOGIC (Vilevile - haijaguswa)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = "";
    if(color === "black") msg = "✅ Udongo Bora! Una rutuba ya kutosha kwa mazao mengi.";
    else if(color === "red") msg = "⚠️ Udongo una asidi. Ongeza samadi na chokaa (Lime).";
    else msg = "ℹ️ Udongo wa mchanga. Unahitaji mbolea ya samadi nyingi na umwagiliaji.";
    
    res.innerHTML = `<strong>Ushauri:</strong> ${msg}`;
}

// 4. 🔍 SEARCH MAZAO 200+ (Vilevile - haijaguswa)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query;

    let html = `
        <div class="p-3 bg-light rounded mb-3 border-start border-5 border-success">
            <h6>📝 MWONGOZO WA ${query.toUpperCase()}</h6>
            <p>Zingatia matumizi ya mbegu bora na mbolea sahihi kwa mavuno mengi.</p>
        </div>`;

    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            html += `<div class="p-3 border-start border-4 border-primary mb-3 bg-white shadow-sm">
                        <h6>📖 MAELEZO YA KINA</h6>
                        <p>${data.extract}</p>
                    </div>`;
        }
    } catch (e) { }

    const waMsg = encodeURIComponent(`Habari Bwana Shamba, naomba msaada kuhusu ${query}`);
    html += `
        <div class="mt-4 p-3 text-center border rounded bg-light">
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold shadow">
                💬 ONGEA NA MI MI WHATSAPP
            </a>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}" target="_blank" class="btn btn-danger w-100 fw-bold btn-sm shadow-sm">📺 VIDEO ZA MAFUNZO</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// Kuanzisha kila kitu
window.onload = () => { loadMarket(); startAI(); };
