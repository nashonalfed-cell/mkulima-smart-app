// 1. LOCAL DATABASE (Hii inafanya majibu yaje fasta bila kusubiri internet)
const localDatabase = {
    "mahindi": "🌱 Panda kwa nafasi ya 75cm x 25cm. Tumia mbolea ya DAP wakati wa kupanda na UREA mahindi yakiwa urefu wa goti. Hukomaa miezi 3-4.",
    "nyanya": "🍅 Anzia kitaluni wiki 4. Hamishia shambani kwa nafasi ya 60cm x 45cm. Inahitaji maji mengi na mbolea ya NPK.",
    "maharage": "🌱 Panda kwa nafasi ya 50cm x 10cm. Inastahimili hali nyingi za hewa, lakini inahitaji udongo usio na maji yaliyotuama.",
    "kitunguu": "🧅 Panda kwa nafasi ya 10cm. Inahitaji mbolea ya samadi na CAN. Hukomaa baada ya miezi 3-4.",
    "mpunga": "🌾 Panda kwenye vitalu kwanza. Inahitaji maji mengi na mbolea ya kukuzia mara mbili.",
    "tikiti": "🍉 Panda mbegu moja kwa moja shambani, nafasi mita 2. Inahitaji jua kali na mbolea ya asili.",
    "mkaratusi": "🪵 Panda miche kwenye mashimo marefu. Inastahimili udongo wowote na hukua haraka sana."
};

// 2. KAZI YA KUTAFUTA (Faster Execution)
async function generateData() {
    const inputField = document.getElementById('userCrop');
    const input = inputField.value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    
    if (!input) return alert("Andika jina la zao!");

    // ONYESHA KADI PAPO HAPO (Hatusubiri)
    card.style.display = 'block';
    document.getElementById('cropTitle').innerText = "MAJIBU: " + input.toUpperCase();
    
    // 3. TAFUTA KWENYE DATABASE YA NDANI KWANZA (Instant Match)
    let jibu = localDatabase[input];

    if (jibu) {
        renderResults(input, jibu, "Mkulima Smart (Local)");
    } else {
        // 4. KAMA HALIPO NDANI, TAFUTA NJE (Wikipedia) - Hii inakuja kama Backup
        document.getElementById('wikiInfo').innerText = "AI Inatafuta maelezo zaidi mtandaoni...";
        try {
            const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
            const data = await res.json();
            jibu = data.extract || "Samahani, maelezo ya kina hayajapatikana. Jaribu zao lingine.";
            renderResults(input, jibu, "Mkulima Smart (Global AI)");
        } catch (e) {
            renderResults(input, "Tumia maelezo ya video hapo chini.", "Mkulima Smart");
        }
    }
}

function renderResults(input, text, source) {
    document.getElementById('wikiInfo').innerHTML = `<strong>Chanzo: ${source}</strong><br><p>${text}</p>`;
    
    // PICHA (Inapakia pembeni bila kuzuia maandishi)
    document.getElementById('cropImage').src = `https://loremflickr.com/800/600/${input},agriculture/all`;
    
    // VIDEO (YouTube Embed ya haraka)
    document.getElementById('videoArea').innerHTML = `
        <iframe width="100%" height="200" src="https://www.youtube.com/embed?listType=search&list=kilimo+cha+${input}" frameborder="0" allowfullscreen></iframe>
    `;
    
    // ONGEA MAJIBU
    speak(text);
}

// 5. SAUTI (Speech)
function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sw-TZ';
    window.speechSynthesis.speak(utterance);
}

function recordVoice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    const rec = new Recognition();
    rec.lang = 'sw-TZ';
    rec.onresult = (e) => {
        document.getElementById('userCrop').value = e.results[0][0].transcript;
        generateData();
    };
    rec.start();
}
// 1. LOCAL DATABASE (Hii inafanya majibu yaje fasta bila kusubiri internet)
const localDatabase = {
    "mahindi": "🌱 Panda kwa nafasi ya 75cm x 25cm. Tumia mbolea ya DAP wakati wa kupanda na UREA mahindi yakiwa urefu wa goti. Hukomaa miezi 3-4.",
    "nyanya": "🍅 Anzia kitaluni wiki 4. Hamishia shambani kwa nafasi ya 60cm x 45cm. Inahitaji maji mengi na mbolea ya NPK.",
    "maharage": "🌱 Panda kwa nafasi ya 50cm x 10cm. Inastahimili hali nyingi za hewa, lakini inahitaji udongo usio na maji yaliyotuama.",
    "kitunguu": "🧅 Panda kwa nafasi ya 10cm. Inahitaji mbolea ya samadi na CAN. Hukomaa baada ya miezi 3-4.",
    "mpunga": "🌾 Panda kwenye vitalu kwanza. Inahitaji maji mengi na mbolea ya kukuzia mara mbili.",
    "tikiti": "🍉 Panda mbegu moja kwa moja shambani, nafasi mita 2. Inahitaji jua kali na mbolea ya asili.",
    "mkaratusi": "🪵 Panda miche kwenye mashimo marefu. Inastahimili udongo wowote na hukua haraka sana."
};

// 2. KAZI YA KUTAFUTA (Faster Execution)
async function generateData() {
    const inputField = document.getElementById('userCrop');
    const input = inputField.value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    
    if (!input) return alert("Andika jina la zao!");

    // ONYESHA KADI PAPO HAPO (Hatusubiri)
    card.style.display = 'block';
    document.getElementById('cropTitle').innerText = "MAJIBU: " + input.toUpperCase();
    
    // 3. TAFUTA KWENYE DATABASE YA NDANI KWANZA (Instant Match)
    let jibu = localDatabase[input];

    if (jibu) {
        renderResults(input, jibu, "Mkulima Smart (Local)");
    } else {
        // 4. KAMA HALIPO NDANI, TAFUTA NJE (Wikipedia) - Hii inakuja kama Backup
        document.getElementById('wikiInfo').innerText = "AI Inatafuta maelezo zaidi mtandaoni...";
        try {
            const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
            const data = await res.json();
            jibu = data.extract || "Samahani, maelezo ya kina hayajapatikana. Jaribu zao lingine.";
            renderResults(input, jibu, "Mkulima Smart (Global AI)");
        } catch (e) {
            renderResults(input, "Tumia maelezo ya video hapo chini.", "Mkulima Smart");
        }
    }
}

function renderResults(input, text, source) {
    document.getElementById('wikiInfo').innerHTML = `<strong>Chanzo: ${source}</strong><br><p>${text}</p>`;
    
    // PICHA (Inapakia pembeni bila kuzuia maandishi)
    document.getElementById('cropImage').src = `https://loremflickr.com/800/600/${input},agriculture/all`;
    
    // VIDEO (YouTube Embed ya haraka)
    document.getElementById('videoArea').innerHTML = `
        <iframe width="100%" height="200" src="https://www.youtube.com/embed?listType=search&list=kilimo+cha+${input}" frameborder="0" allowfullscreen></iframe>
    `;
    
    // ONGEA MAJIBU
    speak(text);
}

// 5. SAUTI (Speech)
function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sw-TZ';
    window.speechSynthesis.speak(utterance);
}

function recordVoice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    const rec = new Recognition();
    rec.lang = 'sw-TZ';
    rec.onresult = (e) => {
        document.getElementById('userCrop').value = e.results[0][0].transcript;
        generateData();
    };
    rec.start();
}
