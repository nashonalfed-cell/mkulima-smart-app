let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Pakia Database
fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(e => console.error("Database haipatikani"));

async function generateData() {
    const input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return alert("Andika jina la zao!");

    currentCrop = input;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // Picha ya Zao
    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${input},agriculture,crop`;

    const titleText = document.getElementById("cropTitle");
    const infoText = document.getElementById("wikiInfo");
    titleText.innerText = input;

    const local = cropsDataDB[input] ? cropsDataDB[input][language] : null;

    if (local) {
        infoText.innerText = `${local.planting}. ${local.fertilizer}.`;
    } else {
        try {
            const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${input}`);
            const data = await res.json();
            infoText.innerText = data.extract || "Zao lipo lakini maelezo ya kina yanakuja hivi punde.";
        } catch {
            infoText.innerText = "Maelezo hayajapatikana. Hakikisha jina liko sahihi.";
        }
    }

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

// ========================= AI LOGIC (HAPA NDIPO AI INAPOJIBU) =========================
function askAI() {
    const question = document.getElementById("aiQuestion").value.toLowerCase();
    const info = cropsDataDB[currentCrop] ? cropsDataDB[currentCrop][language] : null;
    let answer = "";

    if (!currentCrop) {
        answer = "Tafadhali tafuta zao kwanza kabla ya kuuliza maswali.";
    } else if (!info) {
        answer = `Samahani, bado sina data ya kitaalamu kuhusu ${currentCrop}. Lakini kwa ujumla, hakikisha udongo una unyevu na mbolea ya kutosha.`;
    } else {
        // AI inachambua swali la mkulima hapa
        if (question.includes("mbolea") || question.includes("chakula cha mmea")) {
            answer = "Kuhusu mbolea: " + info.fertilizer;
        } else if (question.includes("panda") || question.includes("msimu") || question.includes("wakati gani")) {
            answer = "Kuhusu upandaji: " + info.planting;
        } else if (question.includes("vuna") || question.includes("muda gani") || question.includes("kukomaa")) {
            answer = "Kuhusu kuvuna: " + info.harvest;
        } else if (question.includes("maji") || question.includes("mwagilia")) {
            answer = "Zao la " + currentCrop + " linahitaji maji ya kutosha, hasa wakati wa kutoa maua.";
        } else if (question.includes("wadudu") || question.includes("ugonjwa") || question.includes("dawa")) {
            answer = "Inashauriwa kukagua majani kila siku. Ukiona wadudu, tumia viuadudu (pesticides) vinavyopendekezwa na bwana shamba.";
        } else {
            answer = `Kwa zao la ${currentCrop}, ninaweza kukupa maelezo kuhusu mbolea, upandaji, na uvunaji. Unaweza kuuliza mfano: 'Nitumie mbolea gani?'`;
        }
    }

    const aiBox = document.getElementById("aiAnswer");
    aiBox.style.display = "block";
    document.getElementById("aiText").innerText = answer;
}

