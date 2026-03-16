/**
 * MKULIMA SMART AI - SCRIPT YA UHUSIANO NA INDEX.HTML
 * Dev: Nashon Alfred
 */

const GEMINI_API_KEY = "AIzaSyDnnwU81GTQpGxPECI5UEI7FrNL1MIaIPw"; 

// 1. DATA YA MAZAO (Picha na Maelezo)
const cropDatabase = {
    "mahindi": {
        picha: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=800",
        maelezo: "Mahindi yanahitaji udongo wenye rutuba na mbolea ya DAP wakati wa kupanda."
    },
    "mpunga": {
        picha: "https://images.unsplash.com/photo-1536331153400-02985479ec71?auto=format&fit=crop&w=800",
        maelezo: "Mpunga unastawi vizuri kwenye maeneo yenye maji mengi na udongo wa mfinyanzi."
    },
    "nyanya": {
        picha: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800",
        maelezo: "Nyanya zinahitaji mwanga wa jua wa kutosha na dawa za kuzuia ukungu (fungicides)."
    }
};

// 🔍 FUNCTION YA KUTAFUTA ZAO (Hii ndiyo generateData)
function generateData() {
    const input = document.getElementById('userCrop').value.toLowerCase().trim();
    const cropCard = document.getElementById('cropCard');
    const cropTitle = document.getElementById('cropTitle');
    const cropImage = document.getElementById('cropImage');
    const infoArea = document.getElementById('infoArea');
    const loading = document.getElementById('loadingSpinner');

    if (!input) {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    loading.style.display = "block";
    cropCard.style.display = "none";

    setTimeout(() => {
        loading.style.display = "none";
        if (cropDatabase[input]) {
            const data = cropDatabase[input];
            cropTitle.innerText = input.toUpperCase();
            cropImage.src = data.picha;
            infoArea.innerHTML = `<p class="mt-3">${data.maelezo}</p>`;
            cropCard.style.display = "block";
        } else {
            alert("Samahani, mwongozo wa zao hili bado haujaongezwa. Jaribu: mahindi, mpunga, au nyanya.");
        }
    }, 1000);
}

// 2. 💬 AI CHAT FUNCTION
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="user-msg">${msg}</div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="ai-msg" id="${loadingId}">Bwana Shamba anafikiria...</div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu wa Tanzania. Jibu kwa Kiswahili fasaha na kutoa ushauri wa kitaalamu: ${msg}` }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).innerHTML = `<b>AI:</b> ${aiText}`;
    } catch (err) {
        document.getElementById(loadingId).innerHTML = `<span class="text-danger">Samahani, kuna tatizo la mtandao.</span>`;
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// 3. 🧪 SOIL TEST FUNCTION
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    let advice = color === "black" ? "✅ Udongo Mweusi: Lima Mahindi au Mbogamboga." : 
                 color === "red" ? "⚠️ Udongo Mwekundu: Lima Viazi au Kahawa." : 
                 "⚠️ Udongo wa Mchanga: Unafaa kwa Karanga au Tikiti.";
    res.innerHTML = `<strong>Ushauri:</strong> ${advice}`;
}

// 4. BEI ZA MASOKO (Initial Data)
document.addEventListener('DOMContentLoaded', () => {
    const marketTable = document.getElementById('marketTable');
    const prices = [
        {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑"},
        {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Sawa -"}
    ];
    let rows = "";
    prices.forEach(p => {
        rows += `<tr><td>${p.z}</td><td>${p.s}</td><td>${p.b}</td><td>${p.h}</td></tr>`;
    });
    marketTable.innerHTML = rows;
});
