/**
 * MKULIMA SMART AI - FULL ENGINE
 * Bwana Shamba: +255797818582
 * UPDATE: Strict Leaf Scanner Output (Plant/Healthy/Problem)
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

// 2. 📸 AI VISUAL SCANNER (MAREKEBISHO PEKEE YAMEFANYIKA HAPA)
let net;
async function startAI() { 
    net = await mobilenet.load(); 
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    
    resultDiv.innerHTML = "Inachambua... / Analyzing...";
    
    const predictions = await net.classify(img);
    const topResult = predictions[0].className.toLowerCase();
    const probability = predictions[0].probability;

    // Maneno ya mimea
    const plantKeys = ["leaf", "plant", "tree", "flower", "fruit", "vegetable", "corn", "maize", "grass", "branch", "nature", "crop", "potted"];
    // Maneno ya matatizo
    const diseaseKeys = ["spot", "rust", "mildew", "rot", "pest", "worm", "fungus", "blight", "damage", "wilt", "aphid", "bug"];

    const isPlant = plantKeys.some(word => topResult.includes(word));
    const hasDisease = diseaseKeys.some(word => topResult.includes(word));

    // A. Jibu kama sio mmea
    if (!isPlant && probability < 0.4) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2 fw-bold">Huu sio mmea / This is not a plant.</div>`;
    } 
    // B. Jibu kama jani ni zima (Hamna tatizo)
    else if (!hasDisease) {
        resultDiv.innerHTML = `<div class="alert alert-success mt-2 fw-bold">Hamna tatizo / No problem.</div>`;
    } 
    // C. Jibu kama lina shida (Lina ugonjwa)
    else {
        resultDiv.innerHTML = `
            <div class="alert alert-warning mt-2 fw-bold">
                Lina shida / It has a problem: <span class="text-danger">${topResult}</span>
                <br><small class="fw-normal">Tuma picha WhatsApp kwa msaada zaidi.</small>
            </div>`;
    }
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('previewImg').src = ev.target.result;
            document.getElementById('imagePreviewContainer').style.display = 'block';
            setTimeout(analyzeLeaf, 1000); 
        };
        reader.readAsDataURL(file);
    }
});

// 3. 🧪 SOIL TEST LOGIC (Vilevile kama mwanzo)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = color === "black" ? "✅ Udongo Bora! Rutuba ipo juu." : "⚠️ Udongo unahitaji marekebisho ya mbolea na chokaa.";
    res.innerHTML = `<strong>Ushauri:</strong> ${msg}`;
}

// 4. 🔍 SEARCH MAZAO 200+ (Vilevile kama mwanzo)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},farming`;
    document.getElementById("cropTitle").innerText = query;

    let html = `<div class="p-3 bg-light rounded mb-3"><h6>📝 MWONGOZO</h6><p>Zao la ${query} linahitaji mbinu bora za kilimo...</p></div>`;

    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            html += `<div class="p-3 border-start border-4 border-success mb-3 bg-white"><h6>📖 MAELEZO YA KINA</h6><p>${data.extract}</p></div>`;
        }
    } catch (e) { }

    const waMsg = encodeURIComponent(`Habari Bwana Shamba, naomba msaada kuhusu ${query}`);
    html += `<div class="mt-4 p-3 text-center border rounded bg-light">
                <a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold">💬 ONGEA NA MI MI WHATSAPP</a>
             </div>`;

    document.getElementById("infoArea").innerHTML = html;
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

window.onload = () => { loadMarket(); startAI(); };
