async function generateData() {
    const userInput = document.getElementById('userCrop').value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    if (userInput === "") return alert("Tafadhali andika jina la zao!");

    spinner.style.display = 'block';
    card.style.display = 'none';

    try {
        // 1. Jaribu kutafuta kwenye JSON yako kwanza
        const response = await fetch('data.json');
        const localData = await response.json();

        // Ramani ya Kiswahili kwenda Kiingereza
        const swMap = { "mahindi": "maize", "nyanya": "tomato", "mkaratusi": "eucalyptus", "mpunga": "rice" }; // Ongeza hapa
        let key = localData[userInput] ? userInput : swMap[userInput];

        if (key && localData[key]) {
            showResult(userInput, localData[key].sw, "Data kutoka Mkulima Smart DB");
        } else {
            // 2. KAMA HALIPO: Tumia Wikipedia API (AI Search)
            const wikiUrl = `https://sw.wikipedia.org/api/rest_v1/page/summary/${userInput}`;
            const wikiRes = await fetch(wikiUrl);
            
            if (wikiRes.ok) {
                const wikiData = await wikiRes.json();
                const aiData = {
                    planting: wikiData.extract,
                    fertilizer: "Wasiliana na bwana shamba kwa mbolea mahususi ya eneo lako.",
                    harvest: "Angalia maelezo ya Wikipedia hapo juu."
                };
                showResult(userInput, aiData, "Maelezo ya AI (Wikipedia)");
            } else {
                alert("Zao halijapatikana popote. Jaribu jina lingine.");
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        spinner.style.display = 'none';
    }
}

function showResult(title, data, source) {
    const card = document.getElementById('cropCard');
    card.style.display = 'flex';
    document.getElementById('cropTitle').innerText = title + " (" + source + ")";
    document.getElementById('cropImage').src = `https://loremflickr.com/600/400/${title},agriculture`;
    
    document.getElementById('wikiInfo').innerHTML = `
        <p><strong>Maelezo:</strong><br>${data.planting}</p>
        <p><strong>Mbolea:</strong><br>${data.fertilizer}</p>
        <p><strong>Uvunaji/Ziada:</strong><br>${data.harvest}</p>
    `;
    
    document.getElementById('videoArea').innerHTML = `
        <a href="https://www.youtube.com/results?search_query=kilimo+cha+${title}" target="_blank" class="video-btn">
            📺 Tazama Video za ${title}
        </a>`;
}

