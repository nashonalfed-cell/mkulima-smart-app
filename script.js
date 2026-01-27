async function generateData() {
    const userInputField = document.getElementById('userCrop');
    const userInput = userInputField.value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    if (userInput === "") {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    // Onyesha Loading na ficha matokeo ya zamani
    spinner.style.display = 'block';
    card.style.display = 'none';

    try {
        // 1. Jaribu kusoma crops.json
        const response = await fetch('crops.json');
        
        if (!response.ok) {
            throw new Error("Imeshindwa kupata faili la crops.json");
        }

        const localData = await response.json();

        // 2. Angalia kama zao lipo kwenye JSON
        if (localData[userInput]) {
            const data = localData[userInput].sw;
            renderResults(userInput, data, "Database ya Mkulima Smart");
        } else {
            // 3. Kama halipo kwenye JSON, tafuta Wikipedia (AI Mode)
            const wikiUrl = `https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`;
            const wikiRes = await fetch(wikiUrl);
            
            if (wikiRes.ok) {
                const wikiData = await wikiRes.json();
                const aiData = {
                    planting: wikiData.extract,
                    fertilizer: "Maelezo ya mbolea hayajapatikana moja kwa moja. Tafadhali wasiliana na bwana shamba.",
                    harvest: "Angalia maelezo ya Wikipedia hapo juu kwa ukomavu."
                };
                renderResults(userInput, aiData, "Maelezo kutoka AI (Wikipedia)");
            } else {
                alert("Zao halijapatikana. Jaribu: maize, tomato, au beans.");
            }
        }
    } catch (error) {
        console.error("Error detail:", error);
        alert("Hitilafu: Hakikisha unatumia 'Live Server' kufungua app yako na faili linaitwa crops.json.");
    } finally {
        // Zima spinner mwisho wa kila kitu
        spinner.style.display = 'none';
    }
}

// Function ya kuonyesha data kwenye Screen
function renderResults(title, content, source) {
    const card = document.getElementById('cropCard');
    const titleEl = document.getElementById('cropTitle');
    const infoEl = document.getElementById('wikiInfo');
    const imgEl = document.getElementById('cropImage');
    const videoArea = document.getElementById('videoArea');

    // Jaza data
    titleEl.innerText = `${title.toUpperCase()} - (${source})`;
    imgEl.src = `https://loremflickr.com/800/600/${title},agriculture/all`;
    
    infoEl.innerHTML = `
        <div class="mt-3">
            <p><strong>🌱 Upandaji:</strong><br>${content.planting}</p>
            <p><strong>🧪 Mbolea:</strong><br>${content.fertilizer}</p>
            <p><strong>🌾 Uvunaji:</strong><br>${content.harvest}</p>
        </div>
    `;

    videoArea.innerHTML = `
        <a href="https://www.youtube.com/results?search_query=kilimo+cha+${title}" target="_blank" class="video-btn">
            📺 Tazama Video za ${title}
        </a>`;

    // Onyesha kadi ya matokeo
    card.style.display = 'flex';
}
