let language = "sw";
let cropsData = {};

// Load crops.json
fetch('crops.json')
    .then(response => response.json())
    .then(data => {
        cropsData = data;
    });

function generateData() {
    const cropName = document.getElementById("userCrop").value.trim().toLowerCase();
    if (cropName === "") {
        alert("Tafadhali andika jina la zao");
        return;
    }

    const crop = cropsData[cropName] || null;
    const card = document.getElementById("cropCard");
    card.style.display = "block";

    document.getElementById("cropTitle").innerText = `Zao: ${cropName.charAt(0).toUpperCase() + cropName.slice(1)}`;

    if (crop) {
        // Data from JSON
        const data = crop[language];
        document.getElementById("planting").innerText = data.planting;
        document.getElementById("fertilizer").innerText = data.fertilizer;
        document.getElementById("schedule").innerText = data.schedule;
        document.getElementById("harvest").innerText = data.harvest;
        document.getElementById("challenges").innerText = data.challenges;
        document.getElementById("benefits_food").innerText = data.benefits_food;
        document.getElementById("benefits_market").innerText = data.benefits_market;
        document.getElementById("cropImage").src = data.image;
    } else {
        // Generic default data
        const defaultData = {
            sw: {
                planting: "🌱 Msimu wa kupanda: Machi – Mei",
                fertilizer: "🧪 Mbolea: NPK / Compost",
                schedule: "📅 Umwagiliaji: Kila baada ya siku 7–10",
                harvest: "🌾 Kuvuna: Baada ya miezi 3–4",
                challenges: "⚠️ Changamoto: udongo, magonjwa",
                benefits_food: "🍽️ Lishe",
                benefits_market: "💰 Faida ya kuuza",
                image: "https://i.imgur.com/maize.jpg"
            },
            en: {
                planting: "🌱 Planting season: March – May",
                fertilizer: "🧪 Fertilizer: NPK / Compost",
                schedule: "📅 Irrigation: Every 7–10 days",
                harvest: "🌾 Harvest: After 3–4 months",
                challenges: "⚠️ Challenges: soil, diseases",
                benefits_food: "🍽️ Nutrition",
                benefits_market: "💰 Profit",
                image: "https://i.imgur.com/maize.jpg"
            }
        };

        const data = defaultData[language];
        document.getElementById("planting").innerText = data.planting;
        document.getElementById("fertilizer").innerText = data.fertilizer;
        document.getElementById("schedule").innerText = data.schedule;
        document.getElementById("harvest").innerText = data.harvest;
        document.getElementById("challenges").innerText = data.challenges;
        document.getElementById("benefits_food").innerText = data.benefits_food;
        document.getElementById("benefits_market").innerText = data.benefits_market;
        document.getElementById("cropImage").src = data.image;
    }
}

function switchLanguage() {
    language = (language === "sw") ? "en" : "sw";
    generateData();
}
