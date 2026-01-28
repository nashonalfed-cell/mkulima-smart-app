/**
 * MKULIMA SMART AI - THE MASTER ENGINE
 * Bwana Shamba: +255797818582
 * FEATURES: AI Scanner, Soil Test, Detailed Crop Guides, WhatsApp
 */

const nambaYaBwanaShamba = "255797818582";

// 1. BEI ZA MASOKO (Static Simulation)
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

// 2. 📸 AI SCANNER LOGIC
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
        const res = await net.classify(document.getElementById('previewImg'));
        document.getElementById('scanResult').innerHTML = `AI Imegundua: ${res[0].className} <br> <small>Tuma picha WhatsApp kwa ushauri zaidi.</small>`;
    };
    reader.readAsDataURL(file);
});

// 3. 🧪 SOIL TEST LOGIC
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let msg = "";
    if(color === "black") msg = "✅ Udongo Bora! Una rutuba nyingi ya asili. Inafaa kwa mazao mengi. Tumia mbolea kidogo ya kukuzia (UREA) na zingatia mzunguko wa mazao.";
    else if(color === "red") msg = "⚠️ Udongo una asidi kidogo. Inashauriwa kuongeza chokaa ya kilimo (Minjingu Lime) na mbolea nyingi ya samadi ili kuboresha hali ya hewa na maji udongoni.";
    else msg = "ℹ️ Udongo wa mchanga. Haushiki maji vizuri. Hakikisha unaongeza samadi nyingi iliyoiva na mbolea ya NPK ili kusaidia mizizi kupata chakula cha kutosha.";
    
    res.innerHTML = `<strong>Ushauri wa Kitaalamu:</strong> ${msg}`;
}

// 4. 🔍 MAZAO SEARCH (MAELEZO MAREFU NA YA KUELEWEKA)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},farming`;
    document.getElementById("cropTitle").innerText = query;

    // Maelezo marefu ya kueleweka
    let html = `
        <div class="p-3 bg-light rounded mb-4 border-start border-5 border-success shadow-sm">
            <h5 class="fw-bold text-success">📝 MWONGOZO WA MAFANIKIO (${query.toUpperCase()})</h5>
            <p>Ili kufanikiwa katika kilimo cha <strong>${query}</strong>, mkulima anapaswa kuzingatia hatua zifuatazo:</p>
            <ul>
                <li><strong>Utayarishaji wa Shamba:</strong> Safisha shamba mapema na ulima kwa kina cha kutosha (inchi 6-8).</li>
                <li><strong>Mbegu Bora:</strong> Hakikisha unatumia mbegu zilizothibitishwa na taasisi kama TOSCI kwa mavuno mengi.</li>
                <li><strong>Mbolea:</strong> Weka mbolea ya kupandia (DAP/Minjingu) wakati wa kupanda, na mbolea ya kukuzia (UREA/CAN) wiki 3-6 baada ya kuota.</li>
                <li><strong>Usimamizi:</strong> Palilia shamba lako mapema kabla magugu hayajaiba virutubisho vya zao lako.</li>
            </ul>
        </div>`;

    // Wikipedia Details (Kwa ajili ya maelezo ya ziada ya kitafiti)
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.extract) {
            html += `<div class="p-3 border-start border-4 border-primary mb-4 bg-white shadow-sm rounded-3">
                <h6 class="fw-bold text-primary">📖 MAELEZO YA KINA (RESEARCH)</h6>
                <p style="line-height: 1.6;">${data.extract}</p>
                <p class="small text-muted italic">Kumbuka: Mazingira na hali ya hewa (Mvua na Joto) ni sababu kubwa ya mafanikio ya zao hili.</p>
            </div>`;
        }
    } catch (e) { }

    // WhatsApp Button
    const waMsg = encodeURIComponent(`Habari Bwana Shamba, naomba msaada/ushauri zaidi kuhusu zao la ${query.toUpperCase()}`);
    html += `
        <div class="mt-4 p-4 text-center border-dashed border-2 border-success rounded-4 bg-light shadow-sm">
            <p class="fw-bold mb-3">Umekwama au unahitaji ushauri wa ana kwa ana?</p>
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${waMsg}" target="_blank" class="btn btn-success btn-lg w-100 fw-bold shadow">
                💬 ONGEA NA BWANA SHAMBA (WhatsApp)
            </a>
            <p class="small text-muted mt-2">Bonyeza hapa kunitumia picha au ujumbe WhatsApp sasa hivi.</p>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;
    document.getElementById("videoArea").innerHTML = `<a href="https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania" target="_blank" class="btn btn-danger w-100 fw-bold py-2 shadow-sm">📺 TAZAMA VIDEO ZA MAFUNZO</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

// Start Everything
window.onload = () => { loadMarket(); startAI(); };
