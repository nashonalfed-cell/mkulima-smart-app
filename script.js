/**
 * MKULIMA SMART AI - FULL FINAL VERSION
 * Bwana Shamba: +255797818582
 */

const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO (IMERUDISHWA)
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

// 2. 📸 AI VISUAL SCANNER (HARAKA + MAJIBU MATATU)
let net;
async function startAI() { 
    if (!net) net = await mobilenet.load(); 
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    const topResult = predictions[0].className.toLowerCase();

    const plantKeys = ["leaf", "plant", "tree", "flower", "fruit", "vegetable", "corn", "maize", "grass", "branch", "nature", "crop", "potted"];
    const diseaseKeys = ["spot", "rust", "mildew", "rot", "pest", "worm", "fungus", "blight", "damage", "wilt", "aphid", "bug"];

    const isPlant = plantKeys.some(word => topResult.includes(word));
    const hasDisease = diseaseKeys.some(word => topResult.includes(word));

    if (!isPlant) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2 fw-bold">🛑 Huu sio mmea / This is not a plant.</div>`;
    } else if (!hasDisease) {
        resultDiv.innerHTML = `<div class="alert alert-success mt-2 fw-bold">✅ Hamna tatizo / No problem.</div>`;
    } else {
        resultDiv.innerHTML = `<div class="alert alert-warning mt-2 fw-bold">⚠️ Lina shida / It has a problem: <span class="text-danger">${topResult}</span></div>`;
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

// 3. 🧪 SOIL TEST (HAIJAGUSWA)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = color === "black" ? "✅ Udongo Bora! Rutuba ipo juu." : "⚠️ Udongo unahitaji marekebisho ya mbolea na chokaa.";
    res.innerHTML = `<strong>Ushauri:</strong> ${msg}`;
}

// 4. 🔍 SEARCH MAZAO (MAELEZO MAREFU + VIDEO YOUTUBE)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},farming`;
    document.getElementById("cropTitle").innerText = query;

    let detailedGuide = `
        <div class="mt-3">
            <h5 class="fw-bold text-success border-bottom pb-2">🌱 MWONGOZO WA KILIMO: ${query.toUpperCase()}</h5>
            <div class="mb-3 mt-3"><h6><b>1. Maandalizi ya Shamba:</b></h6><p>Lima shamba mapema na uandae udongo uwe na mchanganyiko mzuri wa hewa na unyevu.</p></div>
            <div class="mb-3"><h6><b>2. Mbegu:</b></h6><p>Tumia mbegu bora zilizoidhinishwa kwa ajili ya hali ya hewa ya eneo lako.</p></div>
            <div class="mb-3"><h6><b>3. Mbolea:</b></h6><p>Weka mbolea ya msingi (DAP/Minjingu) wakati wa kupanda na ya kukuzia (UREA/CAN) wiki chache baada ya kuota.</p></div>
            <div class="mb-3"><h6><b>4. Udhibiti wa Wadudu:</b></h6><p>Kagua shamba mara kwa mara ili kubaini wadudu na magonjwa mapema.</p></div>
        </div>`;

    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            detailedGuide += `<div class="p-3 border-start border-4 border-primary mt-3 bg-white shadow-sm rounded">
                <h6 class="fw-bold text-primary">📖 Elimu Zaidi:</h6><p class="small">${data.extract}</p></div>`;
        }
    } catch (e) { }

    // WhatsApp Button
    const waMsg = encodeURIComponent(`Habari Bwana Shamba, nahitaji msaada wa ziada kuhusu ${query.toUpperCase()}`);
    detailedGuide += `<div class="mt-4"><a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold">💬 CHAT NA BWANA SHAMBA</a></div>`;

    document.getElementById("infoArea").innerHTML = detailedGuide;

    // 📺 SEHEMU YA VIDEO (IMERUDISHWA)
    const ytUrl = `https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania`;
    document.getElementById("videoArea").innerHTML = `
        <div class="mt-4">
            <h6 class="fw-bold text-danger">📺 Mafunzo ya Video:</h6>
            <a href="${ytUrl}" target="_blank" class="btn btn-danger w-100 fw-bold shadow-sm">TAZAMA VIDEO ZA ${query.toUpperCase()}</a>
        </div>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// Start kila kitu wakati app inafunguka
window.onload = () => { 
    loadMarket(); 
    startAI(); 
};
