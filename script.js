const cropsDataDB = {
    "maize": {
        "sw": {
            "summary": "Mahindi yanahitaji nitrojeni ya kutosha na unyevu wakati wa kutoa mbelewele.",
            "details": ["🌱 Nafasi: 75cm x 25cm", "🧪 Mbolea: DAP na UREA", "🌾 Muda: Miezi 3-4"]
        }
    }
    // Unaweza kuongeza mengine hapa
};

const cropAlias = { "mahindi": "maize", "nyanya": "tomato" };

// --- 1. SOIL TEST LOGIC ---
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const texture = document.getElementById('soilTexture').value;
    const resDiv = document.getElementById('soilResult');
    resDiv.style.display = 'block';

    let message = "";
    if (color === "black" && texture === "loam") {
        message = "✅ <b>Udongo Bora:</b> Una rutuba ya kutosha. Unafaa kwa mazao mengi bila mbolea nyingi ya viwandani.";
        resDiv.className = "mt-3 p-3 rounded bg-success text-white";
    } else if (color === "red") {
        message = "⚠️ <b>Udongo mwekundu:</b> Una madini ya chuma. Ongeza samadi na mbolea ya chokaa (Lime) kupunguza ukali (acidity).";
        resDiv.className = "mt-3 p-3 rounded bg-warning text-dark";
    } else {
        message = "ℹ️ <b>Udongo wa Mchanga:</b> Hauhifadhi maji. Tumia mbolea ya mboji (compost) nyingi na umwagiliaji wa mara kwa mara.";
        resDiv.className = "mt-3 p-3 rounded bg-info text-dark";
    }
    resDiv.innerHTML = message;
}

// --- 2. AI SCANNER LOGIC ---
let net;
async function initAI() {
    net = await mobilenet.load();
}
initAI();

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const img = document.getElementById('previewImg');
        img.src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        const res = await net.classify(img);
        document.getElementById('scanResult').innerHTML = `<div class='alert alert-dark mt-2'>Zao limetambuliwa kama: <b>${res[0].className}</b></div>`;
    };
    reader.readAsDataURL(file);
});

// --- 3. SEARCH LOGIC ---
async function generateData() {
    const input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return;

    const searchKey = cropAlias[input] || input;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${searchKey},agriculture`;
    document.getElementById("cropTitle").innerText = input;

    let html = "";
    const local = cropsDataDB[searchKey] ? cropsDataDB[searchKey]["sw"] : null;
    if (local) {
        html += `<p>${local.summary}</p>`;
        local.details.forEach(d => html += `<div class="detail-box">${d}</div>`);
    }

    const infoArea = document.getElementById("infoArea");
    infoArea.innerHTML = html;

    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
        const data = await res.json();
        if (data.extract) infoArea.innerHTML += `<hr><p class='small'>${data.extract}</p>`;
    } catch (e) {}

    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${input}`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 ANGALIA VIDEO ZA ${input.toUpperCase()}</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}
