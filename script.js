/**
 * MKULIMA SMART AI - THE MASTER ENGINE
 * Bwana Shamba: +255797818582
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

// 2. 📸 AI VISUAL SCANNER (INSTANT SPEED)
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

// 3. 🧪 SOIL TEST LOGIC (Haijaguswa)
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = color === "black" ? "✅ Udongo Bora! Rutuba ipo juu." : "⚠️ Udongo unahitaji marekebisho ya mbolea na chokaa.";
    res.innerHTML = `<strong>Ushauri:</strong> ${msg}`;
}

// 4. 🔍 SEARCH MAZAO (MAELEZO MENGI NA YA KUELEWEKA)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},farming`;
    document.getElementById("cropTitle").innerText = query;

    // Maelezo ya Kina kwa Kiswahili
    let detailedGuide = `
        <div class="mt-3">
            <h5 class="fw-bold text-success border-bottom pb-2">🌱 MWONGOZO KAMILI WA KILIMO: ${query.toUpperCase()}</h5>
            
            <div class="mb-3 mt-3">
                <h6 class="fw-bold"><i class="bi bi-check-circle"></i> 1. Maandalizi ya Shamba:</h6>
                <p>Anza kwa kusafisha shamba na kuondoa magugu yote. Lima shamba kwa kina cha inchi 15-20 ili kuruhusu mizizi kupenya kwa urahisi. Hakikisha udongo umepondeka vizuri (fine tilth).</p>
            </div>

            <div class="mb-3">
                <h6 class="fw-bold"><i class="bi bi-check-circle"></i> 2. Uchaguzi wa Mbegu:</h6>
                <p>Tumia mbegu zilizothibitishwa na TOSCI ambazo zinastahimili ukame na magonjwa ya eneo lako. Loweka mbegu kama inashauriwa ili kuharakisha uotaji.</p>
            </div>

            <div class="mb-3">
                <h6 class="fw-bold"><i class="bi bi-check-circle"></i> 3. Upandaji na Nafasi:</h6>
                <p>Zingatia nafasi iliyopendekezwa na wataalamu (mfano: 75cm kwa 25cm kwa mahindi). Kupanda kwa nafasi sahihi kusaidia mmea kupata mwanga, hewa na virutubisho bila ushindani.</p>
            </div>

            <div class="mb-3">
                <h6 class="fw-bold"><i class="bi bi-check-circle"></i> 4. Uwekaji wa Mbolea:</h6>
                <p>Tumia mbolea ya kupandia (DAP au Minjingu) wakati wa kupanda. Weka mbolea ya kukuzia (UREA au CAN) wiki ya nne hadi ya sita baada ya uotaji. Kumbuka kuweka mbolea pembeni ya mmea, siyo kwenye shina moja kwa moja.</p>
            </div>

            <div class="mb-3">
                <h6 class="fw-bold"><i class="bi bi-check-circle"></i> 5. Palizi na Udhibiti wa Wadudu:</h6>
                <p>Palilia shamba lako mapema ili kuzuia magugu yasiibe chakula cha mazao. Kagua shamba mara kwa mara; ukiona dalili za wadudu (kama viwavi), tumia viuatilifu vilivyopendekezwa na Bwana Shamba mara moja.</p>
            </div>

            <div class="mb-3">
                <h6 class="fw-bold"><i class="bi bi-check-circle"></i> 6. Kuvuna na Uhifadhi:</h6>
                <p>Vuna mazao yako yanapokomaa vizuri ili kuzuia upotevu wa shambani. Kausha mazao vizuri (unyevu chini ya 13%) kabla ya kuhifadhi kwenye mifuko maalum (PICS bags) kuzuia wadudu wa ghalani.</p>
            </div>
        </div>`;

    // Kuongeza data kutoka Wikipedia kwa elimu zaidi
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            detailedGuide += `
                <div class="p-3 border-start border-4 border-primary mt-4 bg-white shadow-sm rounded">
                    <h6 class="fw-bold text-primary italic">📖 Maelezo ya Ziada (Kitaalamu):</h6>
                    <p class="small text-muted">${data.extract}</p>
                </div>`;
        }
    } catch (e) { }

    const waMsg = encodeURIComponent(`Habari Bwana Shamba, nimesoma mwongozo wa ${query.toUpperCase()} lakini nahitaji msaada zaidi.`);
    detailedGuide += `
        <div class="mt-4 p-4 text-center border-dashed border-2 border-success rounded-4 bg-light">
            <h6 class="fw-bold mb-3">Je, una swali lingine kuhusu ${query}?</h6>
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success btn-lg w-100 fw-bold shadow">
                💬 CHAT NA BWANA SHAMBA SASA
            </a>
        </div>`;

    document.getElementById("infoArea").innerHTML = detailedGuide;
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

window.onload = () => { loadMarket(); startAI(); };
