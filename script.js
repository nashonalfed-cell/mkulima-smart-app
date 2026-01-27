// Hii function itafanya kazi mkulima akibonyeza TAFUTA
async function generateData() {
    const input = document.getElementById('userCrop').value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    // 1. Onyesha spinner
    spinner.style.display = 'block';
    card.style.display = 'none';

    try {
        // 2. Vuta data kutoka kwenye faili lako la jayson (la jayson -> data.json)
        // Hakikisha faili lako linaitwa 'data.json'
        const response = await fetch('data.json');
        const data = await response.json();

        // 3. Tafuta zao (Search Logic)
        let foundKey = Object.keys(data).find(key => key === input);
        
        if (foundKey) {
            const crop = data[foundKey].sw;
            
            // Chelewesha kidogo ili spinner ionekane (User Experience)
            setTimeout(() => {
                spinner.style.display = 'none';
                card.style.display = 'flex';
                
                // Jaza taarifa kwenye HTML
                document.getElementById('cropTitle').innerText = input;
                // Picha inajidhalisha kutokana na jina la zao (Unsplash API)
                document.getElementById('cropImage').src = `https://source.unsplash.com/800x600/?${foundKey},agriculture`;
                
                document.getElementById('wikiInfo').innerHTML = `
                    <div class="mb-3"><strong>🌱 Upandaji:</strong><br> ${crop.planting}</div>
                    <div class="mb-3"><strong>🧪 Mbolea:</strong><br> ${crop.fertilizer}</div>
                    <div class="mb-3"><strong>🌾 Uvunaji:</strong><br> ${crop.harvest}</div>
                `;
                
                // Weka link ya video ya YouTube
                document.getElementById('videoArea').innerHTML = `
                    <a href="https://www.youtube.com/results?search_query=kilimo+cha+${input}" target="_blank" class="video-btn">
                        📺 Tazama Video za ${input}
                    </a>
                `;
            }, 800);

        } else {
            spinner.style.display = 'none';
            alert("Zao halijapatikana. Hakikisha umeandika jina kama: maize, tomato, au cassava.");
        }

    } catch (error) {
        spinner.style.display = 'none';
        console.error("Hitilafu ya kupata data:", error);
        alert("Imeshindwa kufungua data za mazao. Hakikisha faili la 'data.json' lipo.");
    }
}

// Function ya AI kuuliza swali
function askAI() {
    const swali = document.getElementById('aiQuestion').value;
    const jibuBox = document.getElementById('aiAnswer');
    const jibuText = document.getElementById('aiText');

    if (swali.trim() === "") return;

    jibuBox.style.display = 'block';
    jibuText.innerText = "Mkulima Smart AI inachakata jibu...";

    setTimeout(() => {
        jibuText.innerText = `Kuhusu "${swali}": Hakikisha unazingatia msimu wa mvua na kupima udongo wako kabla ya kuweka mbolea ili kupata matokeo bora zaidi.`;
    }, 2000);
}
