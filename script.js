/**
 * MKULIMA SMART AI - FULL SCRIPT ILIYOBORESHA
 * Developer: Nashon Alfred
 */

const GEMINI_API_KEY = "AIzaSyA7qlc7I0IqfHFLA88wmsrxqNW5eMu_Vuc"; // Au key yako mpya 

// 🔍 TAFUTA ZAO LOLOTE (SASA INATUMIA JSON KWANZA)
async function generateData() {
    const input = document.getElementById('userCrop').value.trim().toLowerCase();
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

    try {
        // 1. TAFUTA KWENYE JSON DATABASE KWANZA
        const response = await fetch('crops.json');
        const crops = await response.json();
        
        // Tafuta moja kwa moja kwa jina lililoandikwa
        let cropData = crops[input];
        
        // Kama haipatikani, tafuta kwa ramani ya majina
        if (!cropData) {
            // Ramani ya majina ya Kiswahili hadi Kiingereza (kwenye JSON)
            const nameMapping = {
                'mahindi': 'maize',
                'nyanya': 'tomato',
                'parachichi': 'avocado',
                'mpunga': 'rice',
                'kitunguu': 'onion',
                'karanga': 'peanuts',
                'tikiti': 'watermelon',
                'kahawa': 'coffee',
                'nanasi': 'pineapple',
                'pilipili': 'bell pepper',
                'hoho': 'bell pepper',
                'muhogo': 'cassava',
                'viazi': 'sweet potatoes',
                'ndizi': 'banana',
                'embe': 'mango',
                'chungwa': 'orange',
                'ndimu': 'lemon',
                'tufaha': 'apple',
                'zabibu': 'grapes',
                'pamba': 'cotton',
                'alizeti': 'sunflower',
                'korosho': 'cashew nuts',
                'chai': 'tea',
                'maharagwe': 'beans',
                'dengu': 'lentils',
                'choroko': 'green grams',
                'njegere': 'peas',
                'kunde': 'cowpeas',
                'soya': 'soybeans',
                'mbaazi': 'pigeon peas',
                'maboga': 'pumpkin',
                'boga': 'pumpkin',
                'tango': 'cucumber',
                'biringanya': 'eggplant',
                'tangawizi': 'ginger',
                'manjano': 'turmeric',
                'ufuta': 'sesame'
            };
            
            const englishName = nameMapping[input];
            if (englishName && crops[englishName]) {
                cropData = crops[englishName];
            }
        }

        // 2. KAMA IPO KWENYE JSON, ONYESHA
        if (cropData) {
            cropTitle.innerText = input.toUpperCase();
            
            // Tumia picha kutoka JSON (image au picha)
            if (cropData.image) {
                cropImage.src = cropData.image;
            } else if (cropData.picha) {
                cropImage.src = cropData.picha;
            } else {
                cropImage.src = `https://source.unsplash.com/800x600/?${input}`;
            }
            
            // Tumia maelezo (description au maelezo)
            if (cropData.description) {
                infoArea.innerHTML = cropData.description;
            } else if (cropData.maelezo) {
                infoArea.innerHTML = cropData.maelezo;
            } else {
                infoArea.innerHTML = "Hakuna maelezo ya zao hili kwenye database.";
            }
            
            loading.style.display = "none";
            cropCard.style.display = "block";
            return; // Acha function hapa, usiende kwenye API
        }

        // 3. KAMA HAIKUPATIKANA KWENYE JSON, NDO TUMIA GEMINI API
        const prompt = `Nipe maelezo mafupi ya kitaalamu kuhusu kilimo cha zao la ${input} nchini Tanzania. Jibu kwa Kiswahili.`;

        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await apiResponse.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        cropTitle.innerText = input.toUpperCase();
        cropImage.src = `https://source.unsplash.com/800x600/?${input}`;
        infoArea.innerHTML = `<p>${aiResponse}</p>`;
        
        loading.style.display = "none";
        cropCard.style.display = "block";

    } catch (err) {
        loading.style.display = "none";
        alert("Kuna tatizo la mtandao, jaribu tena.");
        console.error(err);
    }
}

// 💬 AI CHAT NA BWANA SHAMBA
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="user-msg">${msg}</div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="ai-msg" id="${loadingId}">Bwana Shamba anajibu...</div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili kwa lugha rahisi: ${msg}` }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).innerHTML = aiText;
    } catch (err) {
        document.getElementById(loadingId).innerHTML = "Hitilafu ya mtandao. Tafadhali jaribu tena.";
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// 💰 MARKET DATA (BEI) - HII BADO NI STATIC, TUTAIBORESHA BAADAYE
document.addEventListener('DOMContentLoaded', () => {
    const marketTable = document.getElementById('marketTable');
    const items = [
        {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑"},
        {z: "Nyanya", s: "Ilala", b: "20,000/gorofa", h: "Shuka ↓"},
        {z: "Parachichi", s: "Arusha", b: "1,500/kg", h: "Panda ↑"},
        {z: "Muhogo", s: "Mtwara", b: "30,000/gunia", h: "Shuka ↓"},
        {z: "Viazi", s: "Njombe", b: "45,000/gunia", h: "Panda ↑"}
    ];
    marketTable.innerHTML = items.map(i => `<tr><td>${i.z}</td><td>${i.s}</td><td>${i.b}</td><td class="${i.h.includes('Panda') ? 'text-success' : 'text-danger'}">${i.h}</td></tr>`).join('');
});

// 🧪 SOIL TEST - BORESHAJI
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    
    const advice = {
        black: "✅ <b>Udongo Mweusi:</b> Una rutuba nyingi na humus. Unafaa kwa: <br>- Mahindi (maize)<br>- Nyanya (tomatoes)<br>- Mboga za majani (sukuma, spinach)<br>- Maharagwe<br><br><i>Ushauri:</i> Lima kwa kutumia matuta ili kuhifadhi unyevu.",
        
        red: "🟡 <b>Udongo Mwekundu:</b> Una madini ya chuma na alumini. Unafaa kwa: <br>- Karanga (groundnuts)<br>- Viazi vitamu (sweet potatoes)<br>- Alizeti (sunflower)<br>- Muhogo (cassava)<br><br><i>Ushauri:</i> Ongeza mbolea ya samadi na majani mabichi kuboresha rutuba.",
        
        sandy: "⚪ <b>Udongo wa Mchanga:</b> Unapita maji haraka na hauna rutuba nyingi. Unafaa kwa: <br>- Muhogo (cassava)<br>- Karanga (groundnuts)<br>- Viazi (potatoes)<br>- Tikiti maji (watermelon)<br><br><i>Ushauri:</i> Ongeza mbolea ya samadi kwa wingi na tumia matandazo (mulching) kuhifadhi unyevu.",
        
        clay: "🟤 <b>Udongo wa Mfinyanzi:</b> Unashikilia maji kwa muda mrefu. Unafaa kwa: <br>- Mpunga (rice)<br>- Nyanya (tomatoes)<br>- Kabichi (cabbage)<br>- Ndizi (bananas)<br><br><i>Ushauri:</i> Lima kwa matuta marefu ili kuzuia maji kutuama na kuharibu mizizi."
    };
    
    res.innerHTML = advice[color] || "Chagua rangi ya udongo kuona ushauri.";
}

// 🔄 Refresh market data (kwa ajili ya baadaye)
function refreshMarketData() {
    // Hii itaongezwa baadaye tunapounganisha API ya kweli
    console.log("Market data itaboreshwa baadaye");
}

// ✨ Ongeza auto-suggest kwenye search (optional)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('userCrop');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            // Auto-suggest itaongezwa baadaye
        });
    }
});
