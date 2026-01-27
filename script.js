let language = "sw";
let currentCrop = "";
let cropsDataDB = {};

// Kamusi ya kutafsiri majina ya Kiswahili kwenda Kiingereza (ili app ielewe)
const cropAlias = {
    "mahindi": "maize", "mpunga": "rice", "mchele": "rice", "maharage": "beans",
    "nyanya": "tomato", "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava",
    "viazi vitamu": "sweet potato", "viazi mviringo": "potato", "alizeti": "sunflower",
    "karanga": "groundnut", "kahawa": "coffee", "chai": "tea", "pamba": "cotton",
    "korosho": "cashew", "ndizi": "banana", "nanasi": "pineapple", "embe": "mango",
    "chungwa": "orange", "tikiti": "watermelon", "tikiti maji": "watermelon",
    "tango": "cucumber", "pilipili": "pepper", "vitunguu saumu": "garlic",
    "tangawizi": "ginger", "karoti": "carrot", "mchicha": "spinach", "kunde": "pigeon pea",
    "soya": "soya", "ngano": "wheat", "ulezi": "millet", "mtama": "sorghum",
    "kakao": "cocoa", "karafuu": "cloves", "vanila": "vanilla", "parachichi": "avocado",
    "papai": "papaya", "passion": "passion fruit", "zabibu": "grape", "strowberi": "strawberry",
    "epo": "apple", "pera": "guava", "nazi": "coconut", "mchikichi": "oil palm",
    "mkonge": "sisal", "tumbaku": "tobacco", "miwa": "sugar cane", "mabamia": "okra",
    "biringanya": "eggplant", "dengu": "lentils"
};

fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(e => console.error("Database haipatikani"));

async function generateData() {
    let input = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!input) return alert("Andika jina la zao!");

    // ANGALIA KAMA NI KISWAHILI: Kama jina lipo kwenye cropAlias, badilisha kuwa Kiingereza
    if (cropAlias[input]) {
        input = cropAlias[input];
    }

    currentCrop = input;
    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // Picha inatafutwa kwa jina la Kiingereza (Inapata matokeo mengi zaidi)
    const img = document.getElementById("cropImage");
    img.src = `https://loremflickr.com/800/500/${input},agriculture,crop`;

    const titleText = document.getElementById("cropTitle");
    const infoText = document.getElementById("wikiInfo");
    titleText.innerText = input;

    const local = cropsDataDB[input] ? cropsDataDB[input][language] : null;

    if (local) {
        infoText.innerText = `${local.planting}. ${local.fertilizer}. ${local.harvest}`;
    } else {
        // Ikitafuta Wikipedia, inatumia neno asilia la mtumiaji
        try {
            const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${input}`);
            const data = await res.json();
            infoText.innerText = data.extract || "Maelezo yanakuja hivi punde.";
        } catch {
            infoText.innerText = "Zao halijapatikana.";
        }
    }

    img.onload = () => {
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById("cropCard").style.display = "block";
    };
}

function askAI() {
    const question = document.getElementById("aiQuestion").value.toLowerCase();
    const info = cropsDataDB[currentCrop] ? cropsDataDB[currentCrop][language] : null;
    let answer = "";

    if (!currentCrop) {
        answer = "Tafadhali tafuta zao kwanza.";
    } else if (!info) {
        answer = `Bado sina data ya kitaalamu ya ${currentCrop}.`;
    } else {
        if (question.includes("mbolea")) answer = info.fertilizer;
        else if (question.includes("panda") || question.includes("msimu")) answer = info.planting;
        else if (question.includes("vuna")) answer = info.harvest;
        else answer = `Kuhusu ${currentCrop}, naweza kukupa ushauri wa mbolea, upandaji na uvunaji.`;
    }

    document.getElementById("aiAnswer").style.display = "block";
    document.getElementById("aiText").innerText = answer;
}

