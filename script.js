// CONFIG
const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO
const marketData = [
    {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑"},
    {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Imetulia"},
    {z: "Nyanya", s: "Ilala", b: "25k/Sado", h: "Shuka ↓"},
    {z: "Ufuta", s: "Lindi", b: "3,300/kg", h: "Panda ↑"}
];

function loadMarket() {
    let html = "";
    marketData.forEach(m => {
        html += `<tr><td>${m.z}</td><td>${m.s}</td><td class="fw-bold text-success">${m.b}</td><td>${m.h}</td></tr>`;
    });
    document.getElementById('marketTable').innerHTML = html;
}

// 2. AI SCANNER
let net;
async function startAI() { net = await mobilenet.load(); }

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (ev) => {
        document.getElementById('previewImg').src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        const res = await net.classify(document.getElementById('previewImg'));
        document.getElementById('scanResult').innerHTML = `AI Imegundua: <span class="text-primary">${res[0].className}</span>`;
    };
    reader.readAsDataURL(file);
});

// 3. SOIL TEST
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = color === "black" ? "Udongo bora! Punguza mbolea ya chumvichumvi." : "Udongo unahitaji chokaa (Lime) na samadi kurekebisha asidi.";
    res.innerHTML = `<div class="p-2 bg-light border-start border-4 border-primary">${msg}</div>`;
}

// 4. GENERATE DATA (Mazao 200+)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},farming`;
    document.getElementById("cropTitle").innerText = query;

    let html = `
        <div class="p-3 bg-light rounded-3 mb-3">
            <h6>✅ MWONGOZO WA HARAKA</h6>
            <p class="small">Zao la ${query} linahitaji maandalizi mazuri ya shamba na mbegu bora. Tumia mbolea kulingana na mahitaji ya udongo wako.</p>
        </div>`;

    // Fetch Wikipedia for long details
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            html += `<div class="p-3 border-start border-4 border-primary mb-3 shadow-sm">
                <h6 class="fw-bold">📖 MAELEZO YA KINA</h6>
                <p class="small">${data.extract}</p>
            </div>`;
        }
    } catch (e) { }

    // WhatsApp Button
    const waMsg = encodeURIComponent(`Habari Bwana Shamba, naomba msaada kuhusu zao la ${query}`);
    html += `
        <div class="mt-4 p-4 text-center border-dashed border-2 border-success rounded-4 bg-light">
            <p class="fw-bold mb-2">Unahitaji msaada zaidi?</p>
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success w-100 fw-bold shadow">
                💬 ONGEA NA BWANA SHAMBA
            </a>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 TAZAMA VIDEO ZA MAFUNZO</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// Init
window.onload = () => { loadMarket(); startAI(); };
