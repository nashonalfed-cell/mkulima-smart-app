let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Kamusi ya kutafsiri majina ya Kiswahili kwenda Kiingereza
const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "maharage": "beans", "nyanya": "tomato",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "mkaratusi": "eucalyptus", "mti wa mbao": "teak", "mwanzi": "bamboo", "mmsunobari": "pine"
};

fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(e => console.error("Database haipatikani"));

async function generateData() {
    let input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return alert("Andika jina la zao!");

    if (cropAlias[input]) input = cropAlias[input];
    currentCrop = input;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${input},agriculture,crop`;

    const titleText = document.getElementById("cropTitle");
    const infoText = document.getElementById("wikiInfo");
    titleText.innerText = input;

    const local = cropsDataDB[input] ? cropsDataDB[input][language] : null;
    if (local) {
        infoText.innerText = `${local.planting}. ${local.fertilizer}.`;
    } else {
        infoText.innerText = "Zao limepatikana! Unaweza kuanza kuuliza maswali hapa chini.";
    }

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

// ========================= SEHEMU YA KUCHATI NA AI =========================
function askAI() {
    const question = document.getElementById("aiQuestion").value.trim().toLowerCase();
    const aiAnswerBox = document.getElementById("aiAnswer");
    const aiText = document.getElementById("aiText");
    
    if (!question) return;
    if (!currentCrop) {
        aiAnswerBox.style.display = "block";
        aiText.innerText = "Tafadhali chagua zao kwanza ili nikupe ushauri sahihi.";
        return;
    }

    const info = cropsDataDB[currentCrop] ? cropsDataDB[currentCrop][language] : null;
    let response = "";

    // Mfumo wa AI kuchambua swali (Chatbot Logic)
    if (question.includes("habari") || question.includes("mambo")) {
        response = "Habari mkulima! Mimi ni AI yako. Unauliza nini kuhusu " + currentCrop + "?";
    } else if (question.includes("mbolea") || question.includes("chakula")) {
        response = info ? info.fertilizer : "Kwa ujumla, " + currentCrop + " inahitaji mbolea ya asili au NPK kulingana na udongo.";
    } else if (question.includes("panda") || question.includes("wakati")) {
        response = info ? info.planting : "Upandaji unategemea msimu wa mvua katika eneo lako.";
    } else if (question.includes("vuna") || question.includes("muda gani")) {
        response = info ? info.harvest : "Zao hili huchukua muda kulingana na mbegu uliyotumia.";
    } else if (question.includes("soko") || question.includes("bei")) {
        response = "Soko la " + currentCrop + " ni zuri kwa sasa. Nakushauri uwasiliane na vyama vya ushirika.";
    } else if (question.includes("wadudu") || question.includes("ugonjwa")) {
        response = "Inabidi uwe makini na mabadiliko ya majani. Ukiona madoa, tumia dawa inayopendekezwa na wataalamu.";
    } else {
        response = "Swali zuri! Kuhusu " + currentCrop + ", mimi ninaweza kukusaidia kuhusu mbolea, upandaji, na uvunaji. Unaweza kuuliza kwa sauti pia!";
    }

    // Onyesha Jibu kwa staili ya kuchati
    aiAnswerBox.style.display = "block";
    aiText.innerText = "🤖 AI: " + response;
    
    // AI kusema kwa sauti
    speak(response);
    
    // Safisha sanduku la swali
    document.getElementById("aiQuestion").value = "";
}

// Uwezo wa AI Kusema kwa Sauti
function speak(text) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'sw-TZ'; // Lugha ya Kiswahili
        synth.speak(utterance);
    }
}

// Uwezo wa Mkulima kuongea na App
function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sw-TZ';
    
    recognition.onstart = () => {
        document.getElementById("aiQuestion").placeholder = "Ninasikiliza...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("aiQuestion").value = transcript;
        document.getElementById("aiQuestion").placeholder = "Uliza kuhusu mbolea...";
        askAI(); // Inatuma swali moja kwa moja baada ya kuongea
    };
    
    recognition.start();
}

