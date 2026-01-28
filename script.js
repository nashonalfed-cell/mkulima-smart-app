// 1. DATABASE YA MAELEZO YA NDANI (Expert Data)
const cropsDataDB = {
    "mahindi": {
        "sw": {
            "summary": "Mahindi ni zao muhimu la chakula. Hustawi maeneo mengi Tanzania.",
            "details": [
                "🌱 <b>Upandaji:</b> Nafasi 75cm kwa 25cm. Kina cha shimo: 5cm.",
                "🧪 <b>Mbolea:</b> Tumia DAP wakati wa kupanda na UREA mahindi yakiwa urefu wa goti.",
                "🐛 <b>Wadudu:</b> Kuwa makini na Funza wa Mahindi. Tumia dawa kama Belt mapema.",
                "🌾 <b>Uvunaji:</b> Vuna unyevu ukishuka chini ya 13% kuzuia sumu kuvu."
            ]
        }
    },
    "nyanya": {
        "sw": {
            "summary": "Nyanya ni zao la mbogamboga lenye thamani kubwa sokoni.",
            "details": [
                "🌱 <b>Upandaji:</b> Anza kitaluni wiki 4. Shambani nafasi 60cm kwa 45cm.",
                "🧪 <b>Mbolea:</b> Tumia mbolea ya NPK (17:17:17) wakati wa kutoa maua.",
                "🦟 <b>Magonjwa:</b> Nyanya hushambuliwa sana na Tuta Absoluta na ukungu.",
                "🍅 <b>Uvunaji:</b> Vuna zikiwa na rangi ya pinki kwa ajili ya usafirishaji."
            ]
        }
    }
};

const cropAlias = { "mahindi": "maize", "nyanya": "tomato", "papai": "papaya", "tikiti": "watermelon" };

// 2. AI SCANNER LOGIC (TensorFlow)
let net;
async function loadAI() {
    console.log("AI inajiandaa...");
    net = await mobilenet.load();
    console.log("AI iko tayari!");
}
loadAI();

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const img = document.getElementById('previewImg');
        img.src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        document.getElementById('scanResult').innerHTML = "AI inachambua picha...";
        
        img.onload = async () => {
            const results = await net.classify(img);
            const top = results[0];
            let msg = top.className.includes('leaf') || top.className.includes('plant') ? 
                      "Mmea umetambuliwa." : "Zao limetambuliwa.";
            document.getElementById('scanResult').innerHTML = `<b>${msg}</b><br>AI Confidence: ${Math.round(top.probability*100)}%`;
        };
    };
    reader.readAsDataURL(file);
});

// 3. KIPIMO CHA UDONGO LOGIC
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const resDiv = document.getElementById('soilResult');
    resDiv.style.display = "block";
    resDiv.className = "mt-3 p-3 rounded text-white bg-success";
    
    if (color === "red") {
        resDiv.innerHTML = "<b>Ushauri:</b> Udongo huu una asidi (Acidic). Ongeza chokaa ya kilimo (Lime) na samadi kurekebisha.";
        resDiv.className = "mt-3 p-3 rounded text-dark bg-warning";
    } else if (color === "sandy") {
        resDiv.innerHTML = "<b>Ushauri:</b> Udongo wa mchanga. Ongeza mbolea ya mboji nyingi ili kuhifadhi maji na rutuba.";
        resDiv.className = "mt-3 p-3 rounded text-dark bg-info";
    } else {
        resDiv.innerHTML = "<b>Ushauri:</b> Udongo huu una rutuba nzuri. Endelea na mbolea za kukuzia kulingana na zao.";
    }
}

// 4. SEARCH LOGIC (KUPATA MAELEZO MAREFU)
async function generateData() {
    const input = document.getElementById("userCrop").value.trim();
    if (!input) return alert("Andika zao!");

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // Picha Automatic
    const searchKey = cropAlias[input.toLowerCase()] || input;
    document.getElementById("cropImage").src = `https://loremflickr.com/800/800/${searchKey},agriculture,plant`;
    document.getElementById("cropTitle").innerText = input;

    let htmlContent = "";

    // A. Angalia Database ya ndani kwanza
    const local = cropsDataDB[input.toLowerCase()];
    if (local) {
        htmlContent += `<p class='lead fw-bold'>${local.sw.summary}</p>`;
        local.sw.details.forEach(d => htmlContent += `<div class='detail-box'>${d}</div>`);
    }

    // B. Vuta Wikipedia kwa Maelezo Marefu (Lolote lile atakayouliza)
    try {
        const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
        const data = await response.json();
        if (data.extract) {
            htmlContent += `<div class='mt-4'><h5>📖 Maelezo ya Kina (Utafiti):</h5><p>${data.extract}</p></div>`;
        }
    } catch (e) { console.error("Wiki error"); }

    // C. Video Link
    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${input}+tanzania`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 ANGALIA VIDEO ZA MAFUNZO YA ${input.toUpperCase()}</a>`;

    document.getElementById("infoArea").innerHTML = htmlContent || "<p class='alert alert-warning'>Maelezo ya kitaalamu yanatafutwa. Jaribu kutumia jina lingine.</p>";
    
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}
