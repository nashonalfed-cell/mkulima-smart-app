async function generateData() {
    const userInputField = document.getElementById('userCrop');
    const userInput = userInputField.value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    if (userInput === "") {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    spinner.style.display = 'block';
    card.style.display = 'none';

    try {
        // 1. Fetch kutoka crops.json (Inafanya kazi GitHub Pages)
        const response = await fetch('crops.json');
        
        if (!response.ok) {
            throw new Error("Imeshindwa kupata crops.json");
        }

        const localData = await response.json();

        // 2. Search Logic kwa mazao yote
        if (localData[userInput]) {
            const data = localData[userInput].sw;
            renderResults(userInput, data, "Database ya Mkulima Smart");
        } else {
            // 3. AI Mode: Kama halipo kwenye JSON, piga hodi Wikipedia
            const wikiUrl = `https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`;
            const wikiRes = await fetch(wikiUrl);
            
            if (wikiRes.ok) {
                const wikiData = await wikiRes.json();
                const aiData = {
                    planting: wikiData.extract || "Maelezo ya upandaji hayajapatikana.",
                    fertilizer: "Wasiliana na bwana shamba kwa ushauri wa mbolea.",
                    harvest: "Angalia maelezo ya Wikipedia hapo juu."
                };
                renderResults(userInput, aiData, "Maelezo kutoka AI (Wikipedia)");
            } else {
                alert("Zao hili halijapatikana. Jaribu: Maize, Tomato, au Beans.");
            }
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Kuna hitilafu ya kufungua data. Hakikisha crops.json ipo GitHub.");
    } finally {
        spinner.style.display = 'none';
    }
}

function renderResults(title, content, source) {
    const card = document.getElementById('cropCard');
    document.getElementById('cropTitle').innerText = `${title.toUpperCase()} (${source})`;
    document.getElementById('cropImage').src = `https://loremflickr.com/800/600/${title},agriculture`;
    
    document.getElementById('wikiInfo').innerHTML = `
        <div class="mt-3">
            <p><strong>🌱 Upandaji:</strong><br>${content.planting}</p>
            <p><strong>🧪 Mbolea:</strong><br>${content.fertilizer}</p>
            <p><strong>🌾 Uvunaji:</strong><br>${content.harvest}</p>
        </div>
    `;

    document.getElementById('videoArea').innerHTML = `
        <a href="https://www.youtube.com/results?search_query=kilimo+cha+${title}" target="_blank" class="video-btn">
            📺 Tazama Video za ${title}
        </a>`;

    card.style.display = 'flex';
}
