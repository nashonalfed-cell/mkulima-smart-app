// 1. DATABASE KUBWA (Baadhi ya mazao muhimu yenye maelezo mengi)
const cropsDataDB = {
    "maize": {
        "sw": {
            "summary": "Mahindi ni zao muhimu la chakula. Hustawi katika maeneo mengi ya Tanzania.",
            "details": [
                "🌱 <b>Upandaji:</b> Nafasi: 75cm x 25cm. Tumia mbegu bora kama SC403 au nyingine kulingana na eneo.",
                "🧪 <b>Mbolea:</b> DAP wakati wa kupanda (mfuko 1/ekari). UREA wakati mahindi yana urefu wa goti.",
                "🐛 <b>Wadudu:</b> Funza wa mahindi ni hatari. Tumia dawa kama Belt, Vantex au Ema-Mectin.",
                "🌾 <b>Uvunaji:</b> Vuna yakikauka vizuri. Hakikisha unyevu uko chini ya 13% kuzuia sumu kuvu."
            ]
        }
    },
    "tomato": {
        "sw": {
            "summary": "Nyanya ni zao la biashara lenye faida kubwa.",
            "details": [
                "🌱 <b>Upandaji:</b> Kitalu wiki 4. Shambani nafasi 60cm x 45cm. Hakikisha unatumia kigingi (staking).",
                "🧪 <b>Mbolea:</b> Samadi iliyoiva vizuri na NPK (17:17:17) wakati wa maua na matunda.",
                "🦟 <b>Changamoto:</b> Kanitangaze (Tuta Absoluta) na Mnyauko. Nyunyizia dawa za ukungu kila wiki msimu wa mvua.",
                "🍅 <b>Uvunaji:</b> Vuna matunda yanapoanza kugeuka rangi kuwa pinki/nyekundu."
            ]
        }
    }
    // Unaweza kuongeza mazao mengine hapa kwa kufuata mfumo huu huu
};

const cropAlias = { "mahindi": "maize", "nyanya": "tomato", "mpunga": "rice", "maharage": "beans", "alizeti": "sunflower" };

// 2. AI IMAGE SCANNER LOGIC
let net;
async function loadAI() {
    console.log("AI inajiandaa...");
    net = await mobilenet.load();
    console.log("AI ipo tayari!");
}
loadAI();

document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        const img = document.getElementById('previewImg');
        img.src = event.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        document.getElementById('scanResult').innerHTML = "<span class='text-muted'>AI inasoma picha...</span>";

        img.onload = async () => {
            const result = await net.classify(img);
            processScanResult(result);
        };
    };
    reader.readAsDataURL(file);
});

function processScanResult(data) {
    const top = data[0]; // Jibu la kwanza
    let name = top.className.toLowerCase();
    let prob = Math.round(top.probability * 100);
    
    let diagnosis = "Zao linaonekana kuwa na afya.";
    if(name.includes('spot') || name.includes('brown') || name.includes('yellow')) {
        diagnosis = "Tahadhari: Dalili za ugonjwa wa madoa au ukungu zimeonekana.";
    }

    document.getElementById('scanResult').innerHTML = `
        <div class="alert alert-success mt-2">
            Zao: <b>${name}</b> (${prob}%)<br>
            Hali: <b>${diagnosis}</b>
        </div>
    `;
}

// 3. SEARCH LOGIC
async function generateData() {
    let userInput = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!userInput) return alert("Andika jina la zao!");

    let searchKey = cropAlias[userInput] || userInput;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${searchKey},agriculture,plant`;
    document.getElementById("cropTitle").innerText = userInput;

    let html = "";
    const local = cropsDataDB[searchKey] ? cropsDataDB[searchKey]["sw"] : null;
    
    if (local) {
        html += `<p class="lead"><em>${local.summary}</em></p>`;
        local.details.forEach(d => {
            html += `<div class="detail-item">${d}</div>`;
        });
    }

    // Wiki Nyongeza
    const infoArea = document.getElementById("infoArea");
    infoArea.innerHTML = html;

    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`);
        const wiki = await res.json();
        if (wiki.extract) {
            infoArea.innerHTML += `<div class="mt-4"><h6>📖 Maelezo ya Ziada (Wikipedia):</h6><p class="small">${wiki.extract}</p></div>`;
        }
    } catch (e) {}

    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${userInput}+tanzania`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 TAZAMA VIDEO ZA MAFUNZO</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

async function askAI() {
    const q = document.getElementById("aiQuestion").value;
    if(!q) return;
    document.getElementById("aiAnswer").style.display = "block";
    document.getElementById("aiText").innerText = "AI inatafuta jibu la kitaalamu...";
    
    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}+agriculture&format=json&no_html=1`);
        const data = await res.json();
        document.getElementById("aiText").innerText = data.AbstractText || "Samahani, jaribu kuuliza kwa maneno mepesi zaidi kuhusu kilimo.";
    } catch (e) { document.getElementById("aiText").innerText = "Hitilafu ya mtandao."; }
}
