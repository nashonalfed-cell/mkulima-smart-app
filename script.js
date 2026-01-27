let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Pakia Data ya JSON
fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(e => console.error("Database haijapatikana"));

async function generateData() {
    const input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return alert("Andika jina la zao!");

    currentCrop = input;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // 1. Picha ya Moja kwa Moja (Dynamic Image)
    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${input},agriculture,plant/all`;

    // 2. Maelezo (JSON kwanza, kisha Wikipedia)
    const local = cropsDataDB[input] ? cropsDataDB[input][language] : null;
    const titleText = document.getElementById("cropTitle");
    const infoText = document.getElementById("wikiInfo");

    titleText.innerText = input;

    if (local) {
        infoText.innerText = `${local.planting}. ${local.fertilizer}. ${local.harvest}.`;
    } else {
        try {
            const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${input}`);
            const data = await res.json();
            infoText.innerText = data.extract || "Maelezo hayajapatikana kwenye database yetu wala Wikipedia.";
        } catch {
            infoText.innerText = "Zao hili limefichwa! Jaribu kuandika kwa Kiingereza au jina lingine.";
        }
    }

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

function askAI() {
    const q = document.getElementById("aiQuestion").value.toLowerCase();
    const info = cropsDataDB[currentCrop] ? cropsDataDB[currentCrop][language] : null;
    let answer = "Sina jibu la kina kwa sasa, lakini fanya utafiti wa udongo.";

    if (info) {
        if (q.includes("mbolea")) answer = info.fertilizer;
        else if (q.includes("panda")) answer = info.planting;
        else if (q.includes("vuna")) answer = info.harvest;
    }

    const aiBox = document.getElementById("aiAnswer");
    aiBox.style.display = "block";
    document.getElementById("aiText").innerText = answer;
}

function startVoice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'sw-TZ';
    recognition.onresult = (event) => {
        document.getElementById("aiQuestion").value = event.results[0][0].transcript;
        askAI();
    };
    recognition.start();
}
