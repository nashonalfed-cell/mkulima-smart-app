let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Kamusi ya kutambua majina ya Kiswahili
const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "maharage": "beans", "nyanya": "tomato",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "mkaratusi": "eucalyptus", "mti wa mbao": "teak", "mwanzi": "bamboo", "mmsunobari": "pine"
};

// Pakia JSON yako
fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(e => console.log("Database ya JSON haijapatikana."));

async function generateData() {
    let input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return;

    if (cropAlias[input]) input = cropAlias[input];
    currentCrop = input;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${input},agriculture,crop`;

    document.getElementById("cropTitle").innerText = input;
    
    // Pata maelezo mafupi ya awali kutoka Wikipedia
    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${input}`);
        const data = await res.json();
        document.getElementById("wikiInfo").innerText = data.extract || "Zao limepatikana. Uliza AI maelezo ya kitaalamu.";
    } catch {
        document.getElementById("wikiInfo").innerText = "Tayari kutoa ushauri. Uliza swali hapa chini.";
    }

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

async function askAI() {
    const question = document.getElementById("aiQuestion").value.trim().toLowerCase();
    const aiText = document.getElementById("aiText");
    const aiAnswerBox = document.getElementById("aiAnswer");

    if (!question || !currentCrop) return;

    aiAnswerBox.style.display = "block";
    aiText.innerHTML = "<em>AI inatafuta majibu ya uhakika...</em>";

    // 1. DATA KUTOKA KWENYE JSON YAKO (MAARIFA YAKO)
    const local = cropsDataDB[currentCrop] ? cropsDataDB[currentCrop][language] : null;
    let localResponse = "";
    if (local) {
        if (question.includes("mbolea")) localResponse = local.fertilizer;
        else if (question.includes("panda")) localResponse = local.planting;
        else if (question.includes("vuna")) localResponse = local.harvest;
    }

    // 2. DATA KUTOKA MTANDAONI (MAARIFA YA DUNIA)
    let webResponse = "";
    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${currentCrop}+${question}+farming+tips&format=json&no_html=1`);
        const data = await res.json();
        webResponse = data.AbstractText || "";
    } catch (e) { console.log("Web search failed"); }

    // 3. KUUNGANISHA (HYBRID)
    let combined = "";
    if (localResponse) {
        combined += `<b>📍 Ushauri wa Database:</b> ${localResponse}<br><br>`;
    }
    if (webResponse) {
        combined += `<b>🌍 Maelezo ya Ziada (Mtandao):</b> ${webResponse}`;
    } else if (!localResponse) {
        combined = "Samahani, sijaweza kupata maelezo ya kina kwa sasa. Jaribu kuuliza kwa neno lingine.";
    }

    aiText.innerHTML = combined;
    speak(localResponse || webResponse);
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'sw-TZ';
        window.speechSynthesis.speak(msg);
    }
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
