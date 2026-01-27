let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "maharage": "beans", "nyanya": "tomato",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "mkaratusi": "eucalyptus", "mti wa mbao": "teak", "mwanzi": "bamboo", "mmsunobari": "pine"
};

fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(() => console.log("Database ya ndani haipo, nitatumia mtandao tu."));

async function generateData() {
    let userInput = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!userInput) return alert("Tafadhali andika jina la zao!");

    let searchName = cropAlias[userInput] || userInput;
    currentCrop = searchName;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // 1. Picha
    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${searchName},agriculture`;

    document.getElementById("cropTitle").innerText = userInput;

    // 2. KUKUSANYA MAELEZO MENGI (JSON + Wikipedia Deep Search)
    let fullReport = "";
    const local = cropsDataDB[searchName] ? cropsDataDB[searchName][language] : null;
    
    if (local) {
        fullReport += `<h5>📍 Mwongozo wa Shambani (Kutoka kwetu):</h5>
            <p><b>🌱 Upandaji:</b> ${local.planting}</p>
            <p><b>🧪 Mbolea:</b> ${local.fertilizer}</p>
            <p><b>🌾 Uvunaji:</b> ${local.harvest}</p><hr>`;
    }

    try {
        const wikiRes = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${userInput}`);
        const wikiData = await wikiRes.json();
        if (wikiData.extract) {
            fullReport += `<h5>📖 Maelezo ya Kina (Wikipedia):</h5><p>${wikiData.extract}</p>`;
        }
    } catch (e) { console.log("Wiki search failed."); }

    document.getElementById("wikiInfo").innerHTML = fullReport || "Sikuweza kupata maelezo marefu, tafadhali uliza AI hapa chini.";

    // 3. SEHEMU YA VIDEO ZA YOUTUBE
    const youtubeSearch = `https://www.youtube.com/results?search_query=jinsi+ya+kulima+${userInput}+tanzania`;
    document.getElementById("videoArea").innerHTML = `
        <h6 class="fw-bold">📺 Jifunze kwa Vitendo:</h6>
        <p class="small text-muted">Tazama video za wataalamu jinsi ya kupanda ${userInput}.</p>
        <a href="${youtubeSearch}" target="_blank" class="video-btn">BONYEZA HAPA KUONA VIDEO</a>
    `;

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

// 4. AI CHATBOT (Database + Web Integration)
async function askAI() {
    const question = document.getElementById("aiQuestion").value.trim().toLowerCase();
    const aiText = document.getElementById("aiText");
    const aiBox = document.getElementById("aiAnswer");

    if (!question || !currentCrop) return;
    aiBox.style.display = "block";
    aiText.innerHTML = "<em>AI inatafuta majibu ya ziada...</em>";

    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${currentCrop}+${question}+kilimo&format=json&no_html=1`);
        const data = await res.json();
        let answer = data.AbstractText || "Sijaweza kupata jibu lingine mtandaoni, tafadhali rejea maelezo ya kina hapo juu.";
        aiText.innerHTML = `<b>🤖 Jibu:</b> ${answer}`;
    } catch {
        aiText.innerHTML = "Samahani, mtandao unaleta shida.";
    }
}
