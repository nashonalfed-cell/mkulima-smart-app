let language = "sw";
let voiceAnswerEnabled = false;
let currentCrop = "";

/* =========================
   SEARCH + DATA FETCH
========================= */
async function generateData() {
    const crop = document.getElementById("userCrop").value.trim();
    if (!crop) {
        alert("Andika jina la zao");
        return;
    }

    currentCrop = crop.toLowerCase();

    document.getElementById("cropCard").style.display = "block";
    document.getElementById("cropTitle").innerText =
        crop.charAt(0).toUpperCase() + crop.slice(1);

    document.getElementById("loadingSpinner").style.display = "inline-block";
    document.getElementById("cropImage").style.display = "none";
    document.getElementById("wikiInfo").innerText = "";

    /* Wikipedia */
    try {
        const wikiURL = `https://en.wikipedia.org/api/rest_v1/page/summary/${currentCrop}`;
        const res = await fetch(wikiURL);
        const data = await res.json();
        document.getElementById("wikiInfo").innerText =
            data.extract || "Hakuna maelezo ya kutosha kutoka Wikipedia.";
    } catch {
        document.getElementById("wikiInfo").innerText =
            "Imeshindikana kupata taarifa mtandaoni.";
    }

    /* Image */
    const img = document.getElementById("cropImage");
    img.src = `https://source.unsplash.com/800x500/?${currentCrop},crop,agriculture`;
    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        img.style.display = "block";
    };
}

/* =========================
   AI QUESTION LOGIC
========================= */
function askAI() {
    const q = document.getElementById("aiQuestion").value.toLowerCase();
    if (!q) return;

    let answer = "";

    if (q.includes("kupanda") || q.includes("msimu")) {
        answer = `Zao la ${currentCrop} hupandwa mwanzoni mwa mvua. Hakikisha ardhi imeandaliwa vizuri.`;
    } else if (q.includes("mbolea")) {
        answer = `Kwa ${currentCrop}, tumia DAP wakati wa kupanda na UREA wakati wa ukuaji.`;
    } else if (q.includes("magonjwa") || q.includes("wadudu")) {
        answer = `${currentCrop} huathiriwa na magonjwa na wadudu. Tumia mbegu bora na dawa zinazofaa.`;
    } else if (q.includes("kuvuna")) {
        answer = `${currentCrop} huvunwa baada ya miezi 3–6 kulingana na aina na mazingira.`;
    } else if (q.includes("faida") || q.includes("soko")) {
        answer = `${currentCrop} lina soko zuri na linaweza kuleta faida ikiwa utatumia mbinu sahihi.`;
    } else {
        answer = `Kwa ${currentCrop}, zingatia maandalizi ya shamba, mbegu bora, umwagiliaji na usimamizi mzuri.`;
    }

    document.getElementById("aiAnswer").style.display = "block";
    typeEffect(document.getElementById("aiText"), answer);

    if (voiceAnswerEnabled) speak(answer);
}

/* =========================
   TYPE EFFECT
========================= */
function typeEffect(el, text) {
    el.innerText = "";
    let i = 0;
    const t = setInterval(() => {
        el.innerText += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(t);
    }, 20);
}

/* =========================
   VOICE INPUT
========================= */
function startVoice() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Browser yako hai-support sauti");
        return;
    }

    const rec = new webkitSpeechRecognition();
    rec.lang = language === "sw" ? "sw-TZ" : "en-US";

    rec.onresult = e => {
        document.getElementById("aiQuestion").value =
            e.results[0][0].transcript;
        askAI();
    };

    rec.start();
}

/* =========================
   VOICE OUTPUT
========================= */
function speak(text) {
    const s = new SpeechSynthesisUtterance(text);
    s.lang = language === "sw" ? "sw-TZ" : "en-US";
    window.speechSynthesis.speak(s);
}

function toggleVoiceAnswer() {
    voiceAnswerEnabled = !voiceAnswerEnabled;
    document.getElementById("voiceStatus").innerText =
        voiceAnswerEnabled ? "ON" : "OFF";
}

/* =========================
   LANGUAGE
========================= */
function switchLanguage() {
    language = language === "sw" ? "en" : "sw";
    alert(language === "sw" ? "Kiswahili kimewashwa" : "English enabled");
}


