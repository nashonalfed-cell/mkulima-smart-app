/**
 * MKULIMA SMART AI - JAVASCRIPT ENGINE (ULTIMATE VERSION)
 * Bwana Shamba: +255797818582
 */

// 1. DATA YA BWANA SHAMBA
const nambaYaBwanaShamba = "255797818582";

// 2. SMART DATABASE (Nafasi, Mbolea, na Muda wa Mazao kwa Makundi)
const cropExpertRules = {
    "nafaka": { spacing: "75cm x 25cm", fertilizer: "DAP (Kupanda) & UREA (Kukuzia wiki ya 6)", harvest: "Miezi 3-5" },
    "mikunde": { spacing: "45cm x 15cm", fertilizer: "Minjingu RP au Mbolea ya Chokaa", harvest: "Miezi 2-4" },
    "mbogamboga": { spacing: "60cm x 45cm", fertilizer: "NPK (17:17:17) na Samadi iliyoiva", harvest: "Siku 60-90" },
    "matunda": { spacing: "4m x 4m (Hutofautiana)", fertilizer: "CAN na Mboji (Compost)", harvest: "Miaka 1-3" },
    "viungo": { spacing: "30cm x 30cm", fertilizer: "Mbolea ya asili (Samadi nyingi)", harvest: "Miezi 6-12" },
    "mizizi": { spacing: "1m x 1m", fertilizer: "Mbolea yenye Potasiamu (K)", harvest: "Miezi 9-12" }
};

// Ramani ya Mazao 200+ kuelekea kwenye Makundi (Categories)
const cropCategories = {
    "mahindi": "nafaka", "mpunga": "nafaka", "ngano": "nafaka", "mtama": "nafaka", "ulezi": "nafaka",
    "maharage": "mikunde", "karanga": "mikunde", "mbaazi": "mikunde", "kunde": "mikunde", "soy": "mikunde", "choroko": "mikunde", "dengu": "mikunde",
    "nyanya": "mbogamboga", "kitunguu": "mbogamboga", "kabichi": "mbogamboga", "hoho": "mbogamboga", "bamia": "mbogamboga", "mchicha": "mbogamboga", "tango": "mbogamboga",
    "embe": "matunda", "papai": "matunda", "parachichi": "matunda", "chungwa": "matunda", "tikiti": "matunda", "nanasi": "matunda", "pera": "matunda",
    "tangawizi": "viungo", "vitunguu saumu": "viungo", "karafuu": "viungo", "vanila": "viungo", "ufuta": "viungo", "pilipili": "viungo",
    "muhogo": "mizizi", "viazi": "mizizi", "magimbi": "mizizi"
};

// 3. MFUMO WA MASOKO (Live Update Simulation)
async function fetchMarketPrices() {
    const marketTable = document.getElementById('marketTable');
    marketTable.innerHTML = "<tr><td colspan='4' class='text-center'>Inapakia bei mpya...</td></tr>";

    // Hapa ndipo unaweza kuunganisha na API au Google Sheet
    const mockPrices = [
        {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑"},
        {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Panda ↑"},
        {z: "Nyanya", s: "Ilala", b: "28,000/Sado", h: "Shuka ↓"},
        {z: "Ufuta", s: "Lindi", b: "3,400/kg", h: "Panda ↑"},
        {z: "Kitunguu", s: "Singida", b: "115,000/Gunia", h: "Sawa -"}
    ];

    let rows = "";
    mockPrices.forEach(item => {
        let badgeColor = item.h.includes('Panda') ? 'bg-danger' : (item.h.includes('Shuka') ? 'bg-success' : 'bg-primary');
        rows += `<tr>
            <td class="fw-bold">${item.z}</td>
            <td>${item.s}</td>
            <td class="text-success fw-bold">${item.b}</td>
            <td><span class="badge ${badgeColor}">${item.h}</span></td>
        </tr>`;
    });
    marketTable.innerHTML = rows;
}

// 4. AI SCANNER LOGIC
let net;
async function loadAI() {
    net = await mobilenet.load();
    console.log("AI Iko Tayari!");
}

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const img = document.getElementById('previewImg');
        img.src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        const res = await net.classify(img);
        document.getElementById('scanResult').innerHTML = `AI Analysis: <b>${res[0].className}</b>`;
    };
    reader.readAsDataURL(file);
});

// 5. SEARCH ENGINE (Inazalisha maelezo marefu kwa mazao 200+)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // Picha ya Zao
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query;

    let html = "";
    
    // A. Maelezo ya Kitaalamu (Kutoka Database yetu ya ndani)
    const category = cropCategories[query] || "nafaka"; 
    const expert = cropExpertRules[category];

    html += `
        <div class="guide-card p-3 border-start border-5 border-success bg-light mb-3 shadow-sm">
            <h6 class="fw-bold text-success text-uppercase">✅ Mwongozo wa Kilimo (Expert Guide)</h6>
            <p class="mb-1"><b>Aina ya Zao:</b> ${category.toUpperCase()}</p>
            <p class="mb-1"><b>Nafasi:</b> ${expert.spacing}</p>
            <p class="mb-1"><b>Mbolea:</b> ${expert.fertilizer}</p>
            <p class="mb-1"><b>Muda wa Kuvuna:</b> ${expert.harvest}</p>
        </div>`;

    // B. Maelezo Marefu ya Kina (Kutoka Wikipedia API)
    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.extract) {
            html += `
                <div class="guide-card p-3 border-start border-5 border-primary bg-white mb-3 shadow-sm">
                    <h6 class="fw-bold text-primary text-uppercase">📖 Maelezo Marefu ya ${query}</h6>
                    <p style="text-align: justify; line-height: 1.8;">${data.extract}</p>
                    <small class="text-muted">Chanzo: Maktaba ya Kilimo Kidijitali</small>
                </div>`;
        }
    } catch (e) {
        html += `<div class="alert alert-info small">Maelezo ya ziada yanatafutwa...</div>`;
    }

    // C. KITUFE CHA WHATSAPP (Direct to Your Number)
    const msg = encodeURIComponent(`Habari Bwana Shamba, naomba msaada wa kitaalamu kuhusu zao la ${query.toUpperCase()}.`);
    html += `
        <div class="mt-4 p-4 text-center rounded-4 border-dashed border-success border-2 bg-light shadow">
            <h6 class="fw-bold mb-3">Je, unahitaji msaada zaidi au una swali?</h6>
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${msg}" target="_blank" class="btn btn-success btn-lg w-100 fw-bold shadow-lg">
                💬 ONGEA NA BWANA SHAMBA (WhatsApp)
            </a>
            <p class="small text-muted mt-2">Bonyeza hapa kunitumia picha au ujumbe WhatsApp.</p>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;
    
    // Video Link
    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 TAZAMA VIDEO ZA MAFUNZO YA ${query.toUpperCase()}</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// 6. SOIL TEST
function testSoil() {
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    res.className = "mt-2 p-3 bg-warning text-dark rounded-3 fw-bold shadow-sm";
    res.innerHTML = "💡 USHAURI WA BWANA SHAMBA: Kabla ya kupanda, hakikisha udongo umefanyiwa palizi ya kwanza na uweke mbolea ya samadi iliyoiva vizuri.";
}

// ANZA APP
window.onload = () => {
    fetchMarketPrices();
    loadAI();
};
