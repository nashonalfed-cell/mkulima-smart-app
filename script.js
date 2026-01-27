// 1. GHALA LA DATA (Hapa tumeweka kila kitu ndani ya kodi)
const mazaoData = {
    "maize": { "planting": "🌱 Panda mwanzoni mwa mvua, nafasi ya 75cm x 25cm.", "fertilizer": "🧪 Tumia DAP kupanda na UREA mahindi yakiwa urefu wa goti.", "harvest": "🌾 Hukomaa baada ya miezi 3-4." },
    "tomato": { "planting": "🌱 Panda kwenye kitalu kwa wiki 4 kisha hamishia shambani.", "fertilizer": "🧪 Tumia NPK na mbolea ya samadi iliyoiva.", "harvest": "🍅 Huanza kuvunwa baada ya siku 75-90." },
    "beans": { "planting": "🌱 Panda kwa nafasi ya 50cm x 10cm.", "fertilizer": "🧪 Inahitaji mbolea kidogo ya DAP, hujitengenezea naitrojeni.", "harvest": "🌾 Hukuvunwa baada ya siku 60-90." },
    "onion": { "planting": "🌱 Panda mbegu kwenye kitalu, kisha hamishia kwa nafasi ya 10cm.", "fertilizer": "🧪 Inahitaji mbolea ya CAN na NPK.", "harvest": "🧅 Hukomaa baada ya miezi 3-4." },
    "mkaratusi": { "planting": "🌱 Panda miche kwenye mashimo yenye kina cha kutosha, mbali na vyanzo vya maji.", "fertilizer": "🧪 Inastahimili udongo duni lakini samadi husaidia kukua haraka.", "harvest": "🪵 Huvunwa kwa nguzo baada ya miaka 5-8." }
    // Unaweza kuendelea kuongeza mazao mengine hapa kwa muundo huu huu...
};

// 2. RAMANI YA KISWAHILI (Mkulima akiandika Kiswahili, mfumo unajua ni zao gani)
const dictionary = {
    "mahindi": "maize", "nyanya": "tomato", "maharage": "beans", "kitunguu": "onion", "mpunga": "rice"
};

async function generateData() {
    const input = document.getElementById('userCrop').value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    if (input === "") return alert("Andika jina la zao!");

    spinner.style.display = 'block';
    card.style.display = 'none';

    // Simulation ya AI kufikiria
    setTimeout(async () => {
        spinner.style.display = 'none';

        // A. Tafuta kwenye orodha yetu ya ndani (Local Search)
        let key = mazaoData[input] ? input : dictionary[input];

        if (key && mazaoData[key]) {
            displayResults(input, mazaoData[key], "Data ya Mkulima Smart");
        } 
        else {
            // B. KAMA HALIPO (AI Mode): Tafuta Wikipedia moja kwa moja
            try {
                const wikiRes = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
                if (wikiRes.ok) {
                    const wikiData = await wikiRes.json();
                    const aiData = {
                        planting: wikiData.extract,
                        fertilizer: "Ushauri wa mbolea unategemea vipimo vya udongo wako.",
                        harvest: "Rejea maelezo ya kitaalamu hapo juu."
                    };
                    displayResults(input, aiData, "Mkulima Smart AI (Wikipedia)");
                } else {
                    alert("Zao hili halijapatikana. Jaribu zao lingine.");
                }
            } catch (err) {
                alert("Hitilafu ya mtandao! Jaribu tena.");
            }
        }
    }, 1000);
}

function displayResults(title, data, source) {
    const card = document.getElementById('cropCard');
    document.getElementById('cropTitle').innerText = `${title.toUpperCase()} (${source})`;
    document.getElementById('cropImage').src = `https://loremflickr.com/800/600/${title},farm/all`;
    
    document.getElementById('wikiInfo').innerHTML = `
        <div class="p-2">
            <p><strong>🌱 Maelezo ya Upandaji:</strong><br>${data.planting}</p>
            <p><strong>🧪 Mbolea:</strong><br>${data.fertilizer}</p>
            <p><strong>🌾 Uvunaji:</strong><br>${data.harvest}</p>
        </div>
    `;
    
    document.getElementById('videoArea').innerHTML = `
        <a href="https://www.youtube.com/results?search_query=kilimo+cha+${title}" target="_blank" class="video-btn">
            📺 Tazama Video za ${title}
        </a>`;
    
    card.style.display = 'flex';
}
