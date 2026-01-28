/**
 * MKULIMA SMART AI - SCRIPT (OPTIMIZED FOR SPEED)
 */

let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Kamusi ya kutafsiri majina ya haraka
const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "maharage": "beans", "nyanya": "tomato",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "mkaratusi": "eucalyptus", "mti wa mbao": "teak", "mwanzi": "bamboo", "mmsunobari": "pine",
    "parachichi": "avocado", "tikiti": "watermelon", "nanasi": "pineapple"
};

// 1. Pakia Database ya ndani (JSON) haraka iwezekanavyo
fetch('crops.json')
    .then(res => res.json())
    .then(data => { 
        cropsDataDB = data; 
        console.log("Database ya ndani imepakiwa.");
    })
    .catch(() => console.log("Database ya ndani haijapatikana."));

// 2. Kazi kuu ya kutafuta zao
async function generateData() {
    const userInputField = document.getElementById("userCrop");
    let userInput = userInputField.value.trim().toLowerCase();
    
    if (!userInput) {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    let searchName = cropAlias[userInput] || userInput;
    currentCrop = searchName;

    // Onyesha sehemu za matokeo mara moja ili kupunguza 'delay'
    document.getElementById("loadingSpinner").style.display = "block";
    const cropCard = document.getElementById("cropCard");
    const wikiInfo = document.getElementById("wikiInfo");
    const videoArea = document.getElementById("videoArea");
    
    cropCard.style.display = "block"; 
    document.getElementById("cropTitle").innerText = userInput;
    wikiInfo.innerHTML = "<em>Inatafuta maelezo ya kina...</em>";

    // A. WEKA PICHA (Hii inajipakia yenyewe bila kuzuia kodi nyingine)
    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${searchName},agriculture,plant`;

    // B. ONYESHA DATA YA NDANI (FASTEST) - Hii ndio inafanya app iwe ya haraka
    let localReport = "";
    const local = cropsDataDB[searchName] ? cropsDataDB[searchName][language] : null;
    
    if (local) {
        localReport = `
            <div class="alert alert-success p-2">
                <h6 class="fw-bold mb-1">📍 Mwongozo wa Shambani:</h6>
                <p class="small mb-1"><b>🌱 Kupanda:</b> ${local.planting}</p>
                <p class="small mb-1"><b>🧪 Mbolea:</b> ${local.fertilizer}</p>
                <p class="small mb-0"><b>🌾 Kuvuna:</b> ${local.harvest}</p>
            </div><hr>`;
        wikiInfo.innerHTML = localReport; // Onyesha hii kwanza kabisa!
    }

    // C. TAFUTA MAELEZO YA MTANDAONI (BACKGROUND TASK)
    // Hatua hii haizuii (non-blocking) maelezo ya juu kuonekana
    fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${userInput}`)
        .then(res => res.json())
        .then(data => {
            if (data.extract) {
                wikiInfo.innerHTML = localReport + `<h5>📖 Maelezo ya Kina:</h5><p>${data.extract}</p>`;
            }
            document.getElementById("loadingSpinner").style.display = "none";
        })
        .catch(() => {
            document.getElementById("loadingSpinner").style.display = "none";
        });

    // D. WEKA SEHEMU YA VIDEO
    const youtubeSearch = `https://www.youtube.com/results?search_query=jinsi+ya+kulima+${userInput}+tanzania`;
    videoArea.innerHTML = `
        <div class="mt-3">
            <h6 class="fw-bold text-danger">📺 Mafunzo ya Video:</h6>
            <a href="${youtubeSearch}" target="_blank" class="video-btn btn btn-danger btn-sm w-100 fw-bold">
                TAZAMA VIDEO ZA UPANDAJI YOUTUBE
            </a>
        </div>
    `;
}

// 3. AI CHATBOT (Searching the Web)
async function askAI() {
    const questionInput = document.getElementById("aiQuestion");
    const question = questionInput.value.trim();
    const aiText = document.getElementById("aiText");
    const aiBox = document.getElementById("aiAnswer");

    if (!question || !currentCrop) return;

    aiBox.style.display = "block";
    aiText.innerHTML = "<em>🤖 AI inafikiria na kutafuta mtandaoni...</em>";

    try {
        // Kutumia DuckDuckGo API kwa majibu ya haraka ya mtandaoni
        const res = await fetch(`https://api.duckduckgo.com/?q=${currentCrop}+${question}+kilimo+tanzania&format=json&no_html=1`);
        const data = await res.json();
        
        let finalAnswer = data.AbstractText || "Sijaweza kupata jibu lingine mahususi mtandaoni, lakini nakushauri uzingatie kanuni bora za kilimo kulingana na maelezo hapo juu.";
        aiText.innerHTML = `<b>🤖 Jibu:</b> ${finalAnswer}`;
        
        // Safisha kisanduku cha swali
        questionInput.value = "";
    } catch (e) {
        aiText.innerHTML = "Samahani, kuna tatizo la muunganisho wa mtandao.";
    }
}

// 4. USADIZI WA SAUTI (Voice Recognition)
function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Vivinjari vingine haviingilii sauti. Tumia Google Chrome.");
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'sw-TZ';
    recognition.onresult = (event) => {
        document.getElementById("aiQuestion").value = event.results[0][0].transcript;
        askAI();
    };
    recognition.start();
}
