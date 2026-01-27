let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "maharage": "beans", "nyanya": "tomato",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "mkaratusi": "eucalyptus", "mti wa mbao": "teak", "mwanzi": "bamboo", "mmsunobari": "pine",
    "parachichi": "avocado", "tikiti": "watermelon"
};

fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(e => console.log("Database ya ndani haijapatikana."));

async function generateData() {
    let userInput = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!userInput) return alert("Andika jina la zao!");

    let searchName = cropAlias[userInput] || userInput;
    currentCrop = searchName;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${searchName},agriculture,plant`;

    const titleText = document.getElementById("cropTitle");
    const infoText = document.getElementById("wikiInfo");
    titleText.innerText = userInput;

    // --- HATUA YA KUCHUKUA MAELEZO MENGI ---
    let fullReport = "";

    // 1. Chukua data ya ndani (JSON)
    const local = cropsDataDB[searchName] ? cropsDataDB[searchName][language] : null;
    if (local) {
        fullReport += `<h5>📍 Mwongozo wa Haraka:</h5><ul>
            <li><b>Upandaji:</b> ${local.planting}</li>
            <li><b>Mbolea:</b> ${local.fertilizer}</li>
            <li><b>Uvunaji:</b> ${local.harvest}</li>
        </ul><hr>`;
    }

    // 2. Chukua maelezo marefu mtandaoni (Wikipedia Deep Search)
    try {
        // Tunatafuta Wikipedia ya Kiswahili
        const wikiUrl = `https://sw.wikipedia.org/api/rest_v1/page/summary/${userInput}`;
        const res = await fetch(wikiUrl);
        const data = await res.json();
        
        if (data.extract) {
            fullReport += `<h5>🌍 Maelezo ya Kina:</h5><p>${data.extract}</p>`;
        } else {
            // Ikiwa ya Kiswahili haipo, jaribu ya Kiingereza na utafsiri ndani ya app
            const engRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchName}`);
            const engData = await engRes.json();
            fullReport += `<h5>🌍 Maelezo ya Kina (Kiingereza):</h5><p>${engData.extract}</p>`;
        }
    } catch (e) {
        fullReport += "<p>Maelezo ya ziada yanatafutwa...</p>";
    }

    infoText.innerHTML = fullReport;

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

// SEHEMU YA CHAT (Inabaki kusaidia mkulima anapohitaji kuuliza zaidi)
async function askAI() {
    const question = document.getElementById("aiQuestion").value.trim().toLowerCase();
    const aiText = document.getElementById("aiText");
    const aiAnswerBox = document.getElementById("aiAnswer");

    if (!question || !currentCrop) return;

    aiAnswerBox.style.display = "block";
    aiText.innerHTML = "<em>AI inachambua swali lako...</em>";

    let response = "";
    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${currentCrop}+${question}+agriculture+tips&format=json&no_html=1`);
        const data = await res.json();
        response = data.AbstractText || "Sikuweza kupata jibu mahususi mtandaoni, lakini nakushauri uzingatie kanuni bora za kilimo kulingana na maelezo niliyokupa hapo juu.";
    } catch (e) {
        response = "Samahani, muunganisho wa mtandao umekwama.";
    }

    aiText.innerHTML = `<b>🤖 Jibu:</b> ${response}`;
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sw-TZ';
    recognition.onresult = (e) => {
        document.getElementById("aiQuestion").value = e.results[0][0].transcript;
        askAI();
    };
    recognition.start();
}
