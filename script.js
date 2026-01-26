let language = "sw";

// Default generic data kwa zao lolote
const defaultData = {
    sw: {
        planting: "🌱 Msimu wa kupanda: Machi – Mei",
        fertilizer: "🧪 Mbolea: NPK / Compost",
        schedule: "📅 Umwagiliaji: Kila baada ya siku 7–10",
        harvest: "🌾 Kuvuna: Baada ya miezi 3–4"
    },
    en: {
        planting: "🌱 Planting season: March – May",
        fertilizer: "🧪 Fertilizer: NPK / Compost",
        schedule: "📅 Irrigation: Every 7–10 days",
        harvest: "🌾 Harvest: After 3–4 months"
    }
};

// Function ya ku-display data ya zao la mtumiaji
function generateData() {
    const cropName = document.getElementById("userCrop").value.trim();
    if (cropName === "") {
        alert("Tafadhali andika jina la zao");
        return;
    }

    // Badilisha title
    document.getElementById("cropTitle").innerText = `Zao: ${cropName}`;

    // Weka default data (baadaye unaweza add logic maalumu kwa crops)
    if (language === "sw") {
        document.getElementById("planting").innerText = defaultData.sw.planting;
        document.getElementById("fertilizer").innerText = defaultData.sw.fertilizer;
        document.getElementById("schedule").innerText = defaultData.sw.schedule;
        document.getElementById("harvest").innerText = defaultData.sw.harvest;
    } else {
        document.getElementById("planting").innerText = defaultData.en.planting;
        document.getElementById("fertilizer").innerText = defaultData.en.fertilizer;
        document.getElementById("schedule").innerText = defaultData.en.schedule;
        document.getElementById("harvest").innerText = defaultData.en.harvest;
    }
}

// Kubadilisha lugha
function switchLanguage() {
    language = (language === "sw") ? "en" : "sw";
    generateData(); // Refresh data
}
