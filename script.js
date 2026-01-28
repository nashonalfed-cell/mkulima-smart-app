// Database ya Kitaalamu
const expertBase = {
    "maize": {sw: "Mahindi", guide: ["Nafasi: 75cm x 25cm", "Mbolea: DAP & UREA", "Muda: Miezi 3-4"]},
    "coffee": {sw: "Kahawa", guide: ["Aina: Arabica & Robusta", "Nafasi: 3m x 3m", "Mbolea: NPK 20-10-10", "Kuvuna: Baada ya miaka 2-3"]},
    "ginger": {sw: "Tangawizi", guide: ["Udongo: Tifutifu wenye mifereji", "Mbolea: Samadi nyingi", "Muda: Miezi 9"]},
    "sunflower": {sw: "Alizeti", guide: ["Nafasi: 75cm x 30cm", "Mbolea: DAP", "Sifa: Inavumilia ukame"]}
};

const translator = { "ginger": "tangawizi", "garlic": "kitunguu swaumu", "pepper": "pilipili", "coffee": "kahawa" };

// AI Scanner
let net;
async function initAI() { net = await mobilenet.load(); }
initAI();

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const img = document.getElementById('previewImg');
        img.src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        const res = await net.classify(img);
        document.getElementById('scanResult').innerText = `Matokeo: ${res[0].className}`;
    };
    reader.readAsDataURL(file);
});

// Market Price Logic
function showMarket() {
    const market = [
        {z: "Mahindi", s: "Dar / Kibaigwa", b: "750 - 900", h: "Inapanda ↑"},
        {z: "Mpunga", s: "Mbeya / Kahama", b: "1,200 - 1,500", h: "Imetulia -"},
        {z: "Nyanya", s: "Ilala / Arusha", b: "25,000 (Sado)", h: "Inashuka ↓"},
        {z: "Kitunguu", s: "Singida / Karatu", b: "120,000 (Gunia)", h: "Inapanda ↑"}
    ];
    let rows = "";
    market.forEach(m => {
        rows += `<tr><td>${m.z}</td><td>${m.s}</td><td>${m.b}</td><td>${m.h}</td></tr>`;
    });
    document.getElementById('marketTable').innerHTML = rows;
    document.getElementById('marketSection').style.display = 'block';
    window.scrollTo(0, 300);
}

// Soil Test
function testSoil() {
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    res.innerHTML = "<b>Ushauri:</b> Tumia mbolea ya Minjingu (RP) na samadi kurekebisha pH.";
    res.className = "small p-2 rounded bg-warning text-dark border-start border-4 border-dark";
}

// Expert Search Engine
async function generateData() {
    const raw = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!raw) return;
    const input = translator[raw] || raw;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    document.getElementById("marketSection").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/800/${input},agriculture,plant`;
    document.getElementById("cropTitle").innerText = input;

    let html = "";
    const data = expertBase[input] || expertBase[Object.keys(expertBase).find(k => expertBase[k].sw.toLowerCase() === input)];

    if (data) {
        html += `<div class="guide-card"><h6>✅ MWONGOZO WA KITAALAMU</h6><ul>${data.guide.map(i => `<li>${i}</li>`).join('')}</ul></div>`;
    }

    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
        const wiki = await res.json();
        if (wiki.extract) {
            html += `<div class="guide-card" style="border-left-color: #0d6efd;"><h6>📖 MAELEZO YA KINA (RESEARCH)</h6><p>${wiki.extract}</p></div>`;
        }
    } catch (e) {}

    html += `<div class="guide-card" style="border-left-color: #ffc107;"><h6>🛡️ USHAURI WA JUMLA</h6><p>Hakikisha unatumia mbegu zilizothibitishwa na TOSCI. Palilia shamba lako mapema ili kuzuia ushindani wa virutubisho kati ya zao na magugu.</p></div>`;

    document.getElementById("infoArea").innerHTML = html;
    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${input}+tanzania`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 TAZAMA VIDEO ZA MAFUNZO</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}
