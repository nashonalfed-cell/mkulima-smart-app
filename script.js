// 1. DATABASE YA NDANI (Hii inatoa majibu papo hapo hata kama internet ni dhaifu)
const dataYaMazao = {
    "mahindi": "🌱 Panda kwa nafasi ya 75cm x 25cm. Tumia mbolea ya DAP wakati wa kupanda na UREA mahindi yakiwa urefu wa goti. Hukomaa miezi 3-4.",
    "nyanya": "🍅 Anzia kitaluni wiki 4. Hamishia shambani kwa nafasi ya 60cm x 45cm. Inahitaji mbolea ya NPK na maji mengi.",
    "maharage": "🌱 Panda kwa nafasi ya 50cm x 10cm. Inahitaji udongo usiotuama maji. Hukomaa siku 60-90.",
    "kitunguu": "🧅 Panda kwa nafasi ya 10cm. Inahitaji mbolea ya CAN na samadi. Hukomaa miezi 3-4.",
    "mpunga": "🌾 Panda kitaluni kwanza. Inahitaji maji mengi na mbolea ya kukuzia (UREA) mara mbili.",
    "tikiti": "🍉 Panda mbegu moja kwa moja, nafasi mita 2. Inahitaji jua kali na mbolea ya asili."
};

// 2. Kazi ya Kutafuta (Imeboreshwa kwa ajili ya Simu)
async function generateData() {
    const inputField = document.getElementById('userCrop');
    const input = inputField.value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    
    if (!input) {
        alert("Andika jina la zao!");
        return;
    }

    // Onyesha kadi mara moja
    card.style.display = 'block';
    document.getElementById('cropTitle').innerText = input.toUpperCase();
    
    // Picha inaanza kupakia
    document.getElementById('cropImage').src = `https://loremflickr.com/800/600/${input},agriculture/all`;

    // Tafuta maelezo
    let maelezo = dataYaMazao[input];

    if (maelezo) {
        // Kama lipo kwenye database yetu, lilete fasta
        shushaMajibu(maelezo);
    } else {
        // Kama halipo, uliza Wikipedia kwa haraka
        document.getElementById('wikiInfo').innerText = "AI inatafuta maelezo...";
        try {
            const response = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
            const data = await response.json();
            maelezo = data.extract || "Samahani, sijapata maelezo ya zao hili. Tazama video hapo chini.";
            shushaMajibu(maelezo);
        } catch (e) {
            shushaMajibu("Shida ya mtandao. Angalia video za mafunzo hapo chini.");
        }
    }

    // Weka Video ya YouTube
    document.getElementById('videoArea').innerHTML = `
        <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:10px;">
            <iframe style="position:absolute; top:0; left:0; width:100%; height:100%;" 
                src="https://www.youtube.com/embed?listType=search&list=kilimo+cha+${input}" 
                frameborder="0" allowfullscreen>
            </iframe>
        </div>`;
}

function shushaMajibu(maelezo) {
    document.getElementById('wikiInfo').innerHTML = `<p>${maelezo}</p>`;
    // AI Inasoma jibu kwa sauti
    speak(maelezo);
}

// 3. SAUTI (Inafanya kazi vizuri kwenye Chrome ya Simu)
function recordVoice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
        alert("Browser yako haina uwezo wa sauti.");
        return;
    }
    const rec = new Recognition();
    rec.lang = 'sw-TZ';
    rec.onresult = (e) => {
        document.getElementById('userCrop').value = e.results[0][0].transcript;
        generateData();
    };
    rec.start();
}

function speak(text) {
    window.speechSynthesis.cancel();
    const talk = new SpeechSynthesisUtterance(text);
    talk.lang = 'sw-TZ';
    window.speechSynthesis.speak(talk);
}
