/**
 * MKULIMA SMART AI - SCRIPT (STABLE & FAST VERSION)
 */

let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "maharage": "beans", "nyanya": "tomato",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "mkaratusi": "eucalyptus", "mti wa mbao": "teak", "mwanzi": "bamboo", "mmsunobari": "pine"
};

// 1. Pakia Database ya ndani (JSON) haraka
fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(() => console.error("Database ya ndani haijapatikana. Hakikisha crops.json ipo!"));

async function generateData() {
    const inputField = document.getElementById("userCrop");
    let userInput = inputField.value.trim().toLowerCase();
    
    if (!userInput) return alert("Andika jina la zao!");

    let searchName = cropAlias[userInput] || userInput;
    currentCrop = searchName;

    // Ficha matokeo ya zamani na onyesha loading
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";
    
    // Anza kuandaa picha
    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${searchName},agriculture`;

    document.getElementById("cropTitle").innerText = userInput;

    // --- HATUA YA KUPATA DATA (JSON + WEB) ---
    let localContent = "";
    const local = cropsDataDB[searchName] ? cropsDataDB[searchName][language] : null;
    
    if (local) {
        localContent = `
            <div class="alert alert-success">
                <h6>📍 Ushauri wa Kitaalamu (Database):</h6>
                <p><b>🌱 Upandaji:</b> ${local.planting}</p>
                <p><b>🧪 Mbolea:</b> ${local.fertilizer}</p>
                <p><b>🌾 Kuvuna:</b> ${local.harvest}</p>
            </div><hr>`;
    }

    // Jaribu kuvuta data Wikipedia kwa "Promise.race" ili kuzuia kukwama (Timeout 5 seconds)
    const fetchWiki = fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${userInput}`).then(res => res.json());
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));

    try {
        const wikiData = await Promise.race([fetchWiki, timeout]);
        let wikiExtract = wikiData.extract ? `<h5>📖 Maelezo ya Kina:</h5><p>${wikiData.extract}</p>` : "<p>Maelezo ya ziada hayakuonekana mtandaoni.</p>";
        document.getElementById("wikiInfo").innerHTML = localContent + wikiExtract;
    } catch (error) {
        // Ikitokea mtandao ni mbaya, onyesha tu data ya JSON
        document.getElementById("wikiInfo").innerHTML = localContent + "<p class='text-danger'>⚠️ Imeshindwa kupata maelezo ya ziada mtandaoni (Network Slow), lakini tumia mwongozo huo wa juu.</p>";
    }

    // Tayarisha link ya Video
    const youtubeSearch = `https://www.youtube.com/results?search_query=jinsi+ya+kulima+${userInput}+tanzania`;
    document.getElementById("videoArea").innerHTML = `
        <div class="mt-3">
            <h6 class="fw-bold text-danger">📺 Mafunzo ya Video:</h6>
            <a href="${youtubeSearch}" target="_blank" class="btn btn-danger btn-sm w-100 fw-bold">ANGALIA VIDEO ZA ${userInput.toUpperCase()}</a>
        </div>`;

    // Maliza Loading
    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "block";
}

// AI Chatbot Logic
async function askAI() {
    const question = document.getElementById("aiQuestion").value.trim();
    const aiText = document.getElementById("aiText");
    const aiBox = document.getElementById("aiAnswer");

    if (!question || !currentCrop) return;

    aiBox.style.display = "block";
    aiText.innerHTML = "<em>🤖 AI inatafuta majibu...</em>";

    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${currentCrop}+${question}+kilimo&format=json&no_html=1`);
        const data = await res.json();
        aiText.innerHTML = `<b>🤖 Jibu:</b> ${data.AbstractText || "Samahani, sijaweza kupata jibu la ziada mtandaoni kwa sasa."}`;
    } catch (e) {
        aiText.innerHTML = "Hitilafu ya mtandao.";
    }
}
