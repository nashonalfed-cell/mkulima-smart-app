async function generateData() {
    const userInput = document.getElementById('userCrop').value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    if (userInput === "") {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    spinner.style.display = 'block';
    card.style.display = 'none';

    try {
        // 1. Hapa sasa tunaita 'crops.json' badala ya 'data.json'
        const response = await fetch('crops.json');
        
        if (!response.ok) {
            throw new Error("Faili la crops.json halijapatikana!");
        }

        const localData = await response.json();

        // 2. Angalia kama zao lipo kwenye faili lako la JSON
        if (localData[userInput]) {
            displayResults(userInput, localData[userInput].sw, "Mkulima Smart Database");
        } else {
            // 3. KAMA HALIPO (AI Mode): Inatafuta Wikipedia ya Kiswahili
            const wikiUrl = `https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`;
            const wikiRes = await fetch(wikiUrl);
            
            if (wikiRes.ok) {
                const wikiData = await wikiRes.json();
                const aiResult = {
                    planting: wikiData.extract || "Maelezo ya kina hayajapatikana kwa sasa.",
                    fertilizer: "Wasiliana na mtaalamu wa kilimo kwa ushauri wa mbolea ya zao hili.",
                    harvest: "Vuna kulingana na maelezo ya ukomavu yaliyotolewa hapo juu."
                };
                displayResults(userInput, aiResult, "Mkulima Smart AI (Wikipedia)");
            } else {
                alert("Zao hili halipo kwenye orodha yetu wala mtandaoni. Jaribu zao lingine.");
            }
        }
    } catch (error) {
        console.error("Kosa:", error);
        alert("Hitilafu: " + error.message);
    } finally {
        spinner.style.display = 'none';
    }
}

function displayResults(title, content, source) {
    const card = document.getElementById('cropCard');
    card.style.display = 'flex';
    document.getElementById('cropTitle').innerText = `${title.toUpperCase()} (${source})`;
    
    // Picha inajidhalisha yenyewe kulingana na jina la zao
    document.getElementById('cropImage').src = `https://loremflickr.com/600/400/${title},agriculture`;
    
    document.getElementById('wikiInfo').innerHTML = `
        <div class="p-2">
            <p><strong>🌱 Maelezo ya Upandaji:</strong><br>${content.planting}</p>
            <p><strong>🧪 Mbolea:</strong><br>${content.fertilizer}</p>
            <p><strong>🌾 Uvunaji:</strong><br>${content.harvest}</p>
        </div>
    `;
    
    document.getElementById('videoArea').innerHTML = `
        <a href="https://www.youtube.com/results?search_query=kilimo+cha+${title}" target="_blank" class="video-btn">
            📺 Tazama Video za ${title}
        </a>`;
}
