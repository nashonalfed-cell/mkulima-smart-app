/**
 * MKULIMA SMART AI - IMPROVED VERSION
 * Bwana Shamba: +255797818582
 */

const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO (Dynamic UI)
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

// 2. 📸 AI VISUAL SCANNER (Enhanced Detection)
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

    // Maneno mapana zaidi ya utambuzi
    const plantKeys = ["leaf", "plant", "tree", "flower", "fruit", "vegetable", "corn", "maize", "grass", "branch", "nature", "crop", "potted", "soil", "garden"];
    const diseaseKeys = ["spot", "rust", "mildew", "rot", "pest", "worm", "fungus", "blight", "damage", "wilt", "aphid", "bug", "yellow", "dry"];

    const isPlant = plantKeys.some(word => topResult.includes(word));
    const hasDisease = diseaseKeys.some(word => topResult.includes(word));

    if (!isPlant) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2 fw-bold">🛑 Huu sio mmea. Jaribu kupiga picha jani vizuri.</div>`;
    } else if (!hasDisease) {
        resultDiv.innerHTML = `<div class="alert alert-success mt-2 fw-bold">✅ Mmea unaonekana una afya! (Detected: ${topResult})</div>`;
    } else {
        resultDiv.innerHTML = `<div class="alert alert-warning mt-2 fw-bold">⚠️ Inaonekana kuna changamoto: <span class="text-danger">${topResult}</span><br><small>Wasiliana na Bwana Shamba hapa chini kwa msaada zaidi.</small></div>`;
    }
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(ev) {
            document.getElementById('previewImg').src = ev.target.result;
            document.getElementById('imagePreviewContainer').style.display = 'block';
            if (net) {
                document.getElementById('scanResult').innerHTML = "Inachambua...";
                analyzeLeaf();
            }
        };
        reader.readAsDataURL(file);
    }
});

// 3. 🧪 SOIL TEST (Advanced Advice)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    
    let advice = "";
    if(color === "black") {
        advice = "✅ <b>Udongo Mweusi:</b> Una rutuba nyingi sana. Unafaa kwa Mahindi, Nyanya, na Mboga za majani.";
    } else if(color === "red") {
        advice = "⚠️ <b>Udongo Mwekundu:</b> Unashika maji vizuri. Unafaa kwa Kahawa na Viazi, lakini ongeza samadi kidogo.";
    } else {
        advice = "⚠️ <b>Udongo wa Mchanga:</b> Unapitisha maji haraka. Unafaa zaidi kwa Tikiti Maji na Muhogo.";
    }
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. 🔍 SEARCH MAZAO (With Error Handling)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    
    // Picha ya uhakika zaidi
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query.toUpperCase();

    let detailedGuide = `
        <div class="mt-3">
            <h5 class="fw-bold text-success border-bottom pb-2">🌱 MWONGOZO WA KILIMO: ${query.toUpperCase()}</h5>
            <p>Ufuatao ni mwongozo wa jumla wa kilimo cha ${query}:</p>
            <ul>
                <li><b>Maandalizi:</b> Hakikisha shamba lina mtelemko kidogo kuzuia maji kutuama.</li>
                <li><b>Mbolea:</b> Tumia mbolea za asili (samadi) kuongeza uhai wa udongo.</li>
                <li><b>Muda:</b> Zingatia kalenda ya mvua za Vuli au Masika kulingana na mkoa wako.</li>
            </ul>
        </div>`;

    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.extract) {
                detailedGuide += `<div class="p-3 border-start border-4 border-primary mt-3 bg-light rounded italic">
                    <h6 class="fw-bold text-primary">📖 Maelezo kutoka Wikipedia:</h6><p class="small text-muted">${data.extract}</p></div>`;
            }
        }
    } catch (e) { console.log("Wikipedia search failed"); }

    const waMsg = encodeURIComponent(`Habari Bwana Shamba, nahitaji msaada wa ziada kuhusu kilimo cha ${query.toUpperCase()}`);
    detailedGuide += `<div class="mt-4"><a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold shadow">💬 CHAT NA BWANA SHAMBA (WHATSAPP)</a></div>`;

    document.getElementById("infoArea").innerHTML = detailedGuide;

    const ytUrl = `https://www.youtube.com/results?search_query=jinsi+ya+kulima+${query}+tanzania`;
    document.getElementById("videoArea").innerHTML = `
        <div class="mt-4">
            <h6 class="fw-bold text-danger">📺 Jifunze kwa Video:</h6>
            <a href="${ytUrl}" target="_blank" class="btn btn-danger w-100 fw-bold shadow-sm">FUNGUA YOUTUBE: ${query.toUpperCase()}</a>
        </div>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

window.onload = () => { 
    loadMarket(); 
    startAI(); 
};
