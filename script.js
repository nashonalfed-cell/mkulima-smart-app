let language = "sw";
let tips = [];

// Sample core JSON for basic info
const coreData = {
    "maize": {
        sw: {
            planting: "🌱 Msimu: Machi – Mei",
            fertilizer: "🧪 Mbolea: DAP / UREA",
            schedule: "📅 Umwagiliaji: Kila baada ya siku 7–10",
            harvest: "🌾 Kuvuna: Baada ya miezi 3–4",
            challenges: "⚠️ Magonjwa, udongo mbovu",
            benefits_food: "🍽 Lishe, protini",
            benefits_market: "💰 Faida ya kuuza"
        },
        en: {
            planting: "🌱 Season: March – May",
            fertilizer: "🧪 Fertilizer: DAP / UREA",
            schedule: "📅 Irrigation: Every 7–10 days",
            harvest: "🌾 Harvest: After 3–4 months",
            challenges: "⚠️ Diseases, poor soil",
            benefits_food: "🍽 Nutrition, protein",
            benefits_market: "💰 Profit from selling"
        }
    }
};

// Load home page carousel images
const homeImages = [
    "https://images.unsplash.com/photo-1592928309940-1e0a8f4f38d3",
    "https://images.unsplash.com/photo-1576832001194-d23e2f32438a",
    "https://images.unsplash.com/photo-1587304659952-90171f545b77"
];

function initCarousel() {
    const inner = document.getElementById("carouselInner");
    homeImages.forEach((url, idx) => {
        const div = document.createElement("div");
        div.className = "carousel-item" + (idx===0?" active":"");
        div.innerHTML = `<img src="${url}" class="d-block w-100" alt="Crop">`;
        inner.appendChild(div);
    });
}

window.onload = function(){
    initCarousel();
}

// Generate Crop Info
async function generateData(){
    const cropName = document.getElementById("userCrop").value.trim().toLowerCase();
    if(!cropName){ alert("Tafadhali andika jina la zao"); return;}

    const card = document.getElementById("cropCard");
    card.style.display = "block";

    document.getElementById("cropTitle").innerText = cropName.charAt(0).toUpperCase() + cropName.slice(1);

    const spinner = document.getElementById("loadingSpinner");
    const img = document.getElementById("cropImage");
    spinner.style.display = "block";
    img.style.display = "none";

    // Fetch Wikipedia summary
    let wikiInfo = "";
    try {
        const wikiRes = await fetch(`https://${language==='sw'?'sw':'en'}.wikipedia.org/api/rest_v1/page/summary/${cropName}`);
        const wikiData = await wikiRes.json();
        wikiInfo = wikiData.extract || "Hakuna maelezo kutoka Wikipedia";
    } catch(err){
        wikiInfo = "Info haikuweza kupatikana mtandaoni";
    }

    // Fetch Unsplash image
    let imageUrl = `https://images.unsplash.com/photo-1592928309940-1e0a8f4f38d3`; // default
    try {
        const unsplashRes = await fetch(`https://source.unsplash.com/600x400/?${cropName}`);
        imageUrl = unsplashRes.url;
    } catch(err){
        imageUrl = imageUrl;
    }

    // Update card with coreData if exists
    const cropData = coreData[cropName] ? coreData[cropName][language] : {
        planting: "🌱 Season info not available",
        fertilizer: "🧪 Fertilizer info not available",
        schedule: "📅 Irrigation info not available",
        harvest: "🌾 Harvest info not available",
        challenges: "⚠️ Challenges info not available",
        benefits_food: "🍽 Nutrition info not available",
        benefits_market: "💰 Market info not available"
    };

    document.getElementById("planting").innerText = cropData.planting;
    document.getElementById("fertilizer").innerText = cropData.fertilizer;
    document.getElementById("schedule").innerText = cropData.schedule;
    document.getElementById("harvest").innerText = cropData.harvest;
    document.getElementById("challenges").innerText = cropData.challenges;
    document.getElementById("benefits_food").innerText = cropData.benefits_food + "\nWikipedia info: " + wikiInfo;
    document.getElementById("benefits_market").innerText = cropData.benefits_market;

    img.src = imageUrl;
    spinner.style.display = "none";
    img.style.display = "block";

    loadTips();
}

// User tips
function saveUserTip(){
    const tip = document.getElementById("userTip").value.trim();
    if(!tip) return;
    tips.push(tip);
    document.getElementById("userTip").value = "";
    loadTips();
}

function loadTips(){
    const list = document.getElementById("tipsList");
    list.innerHTML = "";
    tips.forEach(t => {
        const li = document.createElement("li");
        li.innerText = t;
        list.appendChild(li);
    });
}

// Language switch
function switchLanguage(){
    language = (language==='sw'?'en':'sw');
    generateData();
}


