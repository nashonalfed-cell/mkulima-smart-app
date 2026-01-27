let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Pakia Data ya JSON (Database yako ya mazao)
fetch('crops.json')
    .then(res => res.json())
    .then(data => { 
        cropsDataDB = data; 
        console.log("Database imepakiwa!");
    })
    .catch(e => console.error("Database haijapatikana"));

async function generateData() {
    const input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return alert("Tafadhali andika jina la zao!");

    currentCrop = input;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // --- SEHEMU YA PICHA ---
    // Inachukua picha moja kwa moja kulingana na jina la zao (mfano: "maize" au "pineapple")
    const img = document.getElementById("cropImage");
    // Tunatumia maneno "agriculture" na "plant" kusaidia AI kupata picha sahihi ya shambani
    img.src = `https://loremflickr.com/800/500/${input},agriculture,crop`;

    const titleText = document.getElementById("cropTitle");
    const infoText = document.getElementById("wikiInfo");

    titleText.innerText = input;

    // Angalia kama zao lipo kwenye crops.json yako
    const local = cropsDataDB[input] ? cropsDataDB[input][language] : null;

    if (local) {
        infoText.innerText = `${local.planting}. ${local.fertilizer}. ${local.harvest}.`;
    } else {
        // Kama halipo kwenye JSON, tafuta Wikipedia ya Kiswahili
        try {
            const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${input}`);
            const data = await res.json();
            infoText.innerText = data.extract || "Maelezo ya ziada hayajapatikana, lakini picha imepakiwa.";
        } catch {
            infoText.innerText = "Maelezo hayajapatikana. Hakikisha umeandika jina sahihi.";
        }
    }

    // Onyesha kadi baada ya picha kumaliza kupakia
    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
    
    // Ikitokea picha imegoma kupakia
    img.onerror = () => {
        img.src = "https://via.placeholder.com/800x500?text=Picha+ya+Zao";
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

// Kazi ya AI (Majibu ya haraka)
function askAI() {
    const q = document.getElementById("aiQuestion").value.toLowerCase();
    const info = cropsDataDB[currentCrop] ? cropsDataDB[currentCrop][language] : null;
    let answer = "Samahani, sina jibu la kitaalamu kuhusu hilo kwa zao hili. Wasiliana na bwana shamba wa karibu.";

    if (info) {
        if (q.includes("mbolea")) answer = info.fertilizer;
        else if (q.includes("panda") || q.includes("msimu")) answer = info.planting;
        else if (q.includes("vuna")) answer = info.harvest;
    }

    document.getElementById("aiAnswer").style.display = "block";
    document.getElementById("aiText").innerText = answer;
}

