// Database ya Ndani (Mazao yenye maelezo marefu)
const cropsDataDB = {
    "maize": {
        "sw": {
            "summary": "Mahindi ni zao muhimu la chakula. Hustawi katika maeneo yenye mvua ya kutosha na joto la wastani.",
            "details": [
                "🌱 <b>Upandaji:</b> Tumia nafasi ya 75cm x 25cm kwa mbegu moja kwa kila shimo. Kina cha shimo kiwe 5cm hivi.",
                "🌦️ <b>Hali ya Hewa:</b> Inahitaji joto la 18°C - 30°C. Udongo uwe na rutuba na usiojiandaa maji.",
                "🧪 <b>Mbolea:</b> Weka mbolea ya DAP (mfuko 1 kwa ekari) wakati wa kupanda. Weka UREA mahindi yakiwa urefu wa goti.",
                "🐛 <b>Wadudu:</b> Shambuliaji mkuu ni Funza wa Mahindi. Tumia viuadudu kama 'Belt' au 'Vantex' mapema.",
                "🌾 <b>Uvunaji:</b> Vuna mahindi yakikauka vizuri (unyevu chini ya 13%) kuzuia sumu kuvu."
            ]
        }
    },
    "tomato": {
        "sw": {
            "summary": "Nyanya ni zao la mbogamboga lenye faida kubwa lakini linahitaji uangalizi wa hali ya juu.",
            "details": [
                "🌱 <b>Upandaji:</b> Anza kitaluni kwa wiki 4. Hamishia shambani kwa nafasi ya 60cm x 45cm.",
                "🧪 <b>Mbolea:</b> Tumia samadi iliyoiva vizuri na mbolea ya NPK (17:17:17) wakati wa maua.",
                "🦟 <b>Magonjwa:</b> Kanitangaze na Mnyauko Bakteria ni hatari sana. Badilisha mazao kila msimu.",
                "🍅 <b>Uvunaji:</b> Vuna kulingana na umbali wa soko; nyekundu kabisa kwa soko la jirani."
            ]
        }
    },
    "rice": {
        "sw": {
            "summary": "Mpunga ni zao la biashara na chakula linalostawi maeneo ya mabondeni yenye maji.",
            "details": [
                "🌱 <b>Upandaji:</b> Tumia mfumo wa SRI kwa matokeo bora. Nafasi ni 20cm x 20cm.",
                "🧪 <b>Mbolea:</b> Tumia mbolea ya kukuzia (UREA) katika awamu mbili; siku 21 na siku 45 baada ya kupanda.",
                "🌾 <b>Uvunaji:</b> Vuna asilimia 80 ya mashuke yakiwa yamegeuka rangi kuwa manjano."
            ]
        }
    }
    // Unaweza kuongeza mazao mengine hapa kwa kufuata muundo huu...
};

const cropAlias = {
    "mahindi": "maize", "nyanya": "tomato", "mpunga": "rice", "maharage": "beans",
    "kitunguu": "onion", "tikiti": "watermelon", "parachichi": "avocado"
};

async function generateData() {
    let userInput = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!userInput) return alert("Andika zao!");

    let searchKey = cropAlias[userInput] || userInput;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // Picha ya Automatic
    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${searchKey},agriculture,plant`;
    document.getElementById("cropTitle").innerText = userInput;

    let contentHtml = "";
    const local = cropsDataDB[searchKey] ? cropsDataDB[searchKey]["sw"] : null;

    if (local) {
        contentHtml += `<p class="lead"><em>${local.summary}</em></p>`;
        local.details.forEach(item => {
            contentHtml += `<div class="detail-box">${item}</div>`;
        });
    }

    const infoDiv = document.getElementById("wikiInfo");
    infoDiv.innerHTML = contentHtml || "<em>Inapakia maelezo zaidi kutoka mtandaoni...</em>";

    // Vuta Wikipedia kama nyongeza
    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`);
        const data = await res.json();
        if (data.extract) {
            infoDiv.innerHTML += `<div class="mt-4"><h6>📖 Maelezo ya Ziada:</h6><p class="small">${data.extract}</p></div>`;
        }
    } catch (e) { console.log("Wiki error"); }

    // Video Area
    const ytLink = `https://www.youtube.com/results?search_query=jinsi+ya+kulima+${userInput}`;
    document.getElementById("videoArea").innerHTML = `<a href="${ytLink}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 TAZAMA VIDEO ZA MAFUNZO YA ${userInput.toUpperCase()}</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}

async function askAI() {
    const q = document.getElementById("aiQuestion").value;
    if (!q) return;
    const aiBox = document.getElementById("aiAnswer");
    const aiText = document.getElementById("aiText");

    aiBox.style.display = "block";
    aiText.innerHTML = "<em>🤖 AI inafikiria...</em>";

    try {
        const res = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}+farming&format=json&no_html=1`);
        const data = await res.json();
        aiText.innerText = data.AbstractText || "Samahani, sijaweza kupata jibu la ziada. Jaribu kuuliza tofauti.";
    } catch (e) {
        aiText.innerText = "Hitilafu ya mtandao.";
    }
}
