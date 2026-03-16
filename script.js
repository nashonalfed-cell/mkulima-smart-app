/**
 * MKULIMA SMART AI - FULL FINAL VERSION
 * Developer: Nashon Alfred
 * Bwana Shamba: +255797818582
 */

const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO (Data halisi za mfano)
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

// 2. 📸 AI VISUAL SCANNER (TensorFlow & MobileNet)
let net;
async function startAI() { 
    try {
        if (!net) net = await mobilenet.load(); 
        console.log("AI Model Loaded Successfully!");
    } catch (e) { console.error("AI Model failed to load", e); }
}

async function analyzeLeaf() {
    const resultDiv = document.getElementById('scanResult');
    const img = document.getElementById('previewImg');
    const predictions = await net.classify(img);
    const topResult = predictions[0].className.toLowerCase();

    const plantKeys = ["leaf", "plant", "tree", "flower", "fruit", "vegetable", "corn", "maize", "grass", "branch", "nature", "crop", "potted"];
    const diseaseKeys = ["spot", "rust", "mildew", "rot", "pest", "worm", "fungus", "blight", "damage", "wilt", "aphid", "bug", "yellow", "dry"];

    const isPlant = plantKeys.some(word => topResult.includes(word));
    const hasDisease = diseaseKeys.some(word => topResult.includes(word));

    if (!isPlant) {
        resultDiv.innerHTML = `<div class="alert alert-danger mt-2 fw-bold">🛑 Huu sio mmea. Tafadhali piga picha jani vizuri.</div>`;
    } else if (!hasDisease) {
        resultDiv.innerHTML = `<div class="alert alert-success mt-2 fw-bold">✅ Mmea unaonekana una afya bora!</div>`;
    } else {
        resultDiv.innerHTML = `<div class="alert alert-warning mt-2 fw-bold">⚠️ Tatizo limegundulika: <span class="text-danger">${topResult}</span></div>`;
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

// 3. 🧪 SOIL TEST (Ushauri wa Udongo)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    
    let advice = "";
    if(color === "black") {
        advice = "✅ <b>Udongo Mweusi:</b> Una rutuba sana. Unafaa kwa Mahindi, Nyanya, na Mboga za majani.";
    } else if(color === "red") {
        advice = "⚠️ <b>Udongo Mwekundu:</b> Unahitaji mbolea ya samadi kuongeza rutuba. Unafaa kwa Kahawa na Viazi.";
    } else {
        advice = "⚠️ <b>Udongo wa Mchanga:</b> Unapitisha maji haraka. Unafaa kwa Tikiti Maji, Muhogo, na Nazi.";
    }
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. 🔍 SEARCH MAZAO (Habari Binafsi + Picha Halisi)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return alert("Tafadhali andika jina la zao!");

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    
    // Picha halisi kulingana na zao (Inatafuta kwenye database ya picha)
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture,farming`;
    document.getElementById("cropTitle").innerText = query.toUpperCase();

    let detailedGuide = "";

    try {
        // Jaribu kutafuta Wikipedia ya Kiswahili kwanza
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.extract) {
            detailedGuide = `
                <div class="mt-3">
                    <h5 class="fw-bold text-success border-bottom pb-2">🌱 MWONGOZO WA KILIMO: ${query.toUpperCase()}</h5>
                    <p class="mt-2" style="font-size: 0.95rem; line-height: 1.6;">${data.extract}</p>
                </div>`;
        } else {
            detailedGuide = `
                <div class="mt-3">
                    <h5 class="fw-bold text-warning">Maelezo Yanatafutwa...</h5>
                    <p>Hatujapata maelezo mahususi ya <b>${query}</b> kwa Kiswahili. Tafadhali bonyeza kitufe cha WhatsApp hapo chini kupata mwongozo kutoka kwa Bwana Shamba.</p>
                </div>`;
        }
    } catch (e) {
        detailedGuide = `<p class="text-danger">Hitilafu ya mtandao. Shindwa kupata data.</p>`;
    }

    // WhatsApp Button ya kipekee
    const waMsg = encodeURIComponent(`Habari Bwana Shamba, nahitaji msaada zaidi kuhusu kilimo cha ${query.toUpperCase()}`);
    detailedGuide += `<div class="mt-4"><a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold">💬 ONGEA NA BWANA SHAMBA (WHATSAPP)</a></div>`;

    document.getElementById("infoArea").innerHTML = detailedGuide;

    // Sehemu ya Video ya YouTube
    const ytUrl = `https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania`;
    document.getElementById("videoArea").innerHTML = `
        <div class="mt-4">
            <h6 class="fw-bold text-danger">📺 Jifunze kwa Video:</h6>
            <a href="${ytUrl}" target="_blank" class="btn btn-outline-danger w-100 fw-bold shadow-sm">TAZAMA VIDEO ZA ${query.toUpperCase()}</a>
        </div>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// Anzisha App
window.onload = () => { 
    loadMarket(); 
    startAI(); 
};
