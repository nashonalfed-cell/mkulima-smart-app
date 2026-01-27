// Hapa tunaweka data zako za JSON kwenye variable
const data = {
  "maize": { "sw": { "title": "Mahindi", "planting": "🌱 Panda mwanzoni mwa mvua, nafasi ya 75cm x 25cm.", "fertilizer": "🧪 Tumia DAP kupanda na UREA mahindi yakiwa urefu wa goti.", "harvest": "🌾 Hukomaa baada ya miezi 3-4.", "img": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500" } },
  "tomato": { "sw": { "title": "Nyanya", "planting": "🌱 Panda kwenye kitalu kwa wiki 4 kisha hamishia shambani.", "fertilizer": "🧪 Tumia NPK na mbolea ya samadi iliyoiva.", "harvest": "🍅 Huanza kuvunwa baada ya siku 75-90.", "img": "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500" } },
  "beans": { "sw": { "title": "Maharage", "planting": "🌱 Panda kwa nafasi ya 50cm x 10cm.", "fertilizer": "🧪 Inahitaji mbolea kidogo ya DAP, hujitengenezea naitrojeni.", "harvest": "🌾 Hukuvunwa baada ya siku 60-90.", "img": "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500" } }
  // Ongeza mengine yaliyobaki hapa ndani ya mabano haya...
};

function generateData() {
    const input = document.getElementById('userCrop').value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    // Onyesha spinner kwa sekunde 1 (kuleta hisia ya AI)
    spinner.style.display = 'block';
    card.style.display = 'none';

    setTimeout(() => {
        spinner.style.display = 'none';
        
        // Tafuta kama zao lipo kwenye JSON
        // Tunakagua jina la key (maize) au jina la Kiswahili
        let foundCrop = null;
        for (let key in data) {
            if (key === input || data[key].sw.title?.toLowerCase() === input) {
                foundCrop = data[key].sw;
                break;
            }
        }

        if (foundCrop) {
            card.style.display = 'flex';
            document.getElementById('cropTitle').innerText = input;
            document.getElementById('cropImage').src = foundCrop.img || 'https://via.placeholder.com/350x350?text=Mkulima+Smart';
            
            document.getElementById('wikiInfo').innerHTML = `
                <p><strong>Upandaji:</strong> ${foundCrop.planting}</p>
                <p><strong>Mbolea:</strong> ${foundCrop.fertilizer}</p>
                <p><strong>Uvunaji:</strong> ${foundCrop.harvest}</p>
            `;
            
            // Video Area (Mfano wa Youtube search link)
            document.getElementById('videoArea').innerHTML = `
                <a href="https://www.youtube.com/results?search_query=jinsi+ya+kulima+${input}" target="_blank" class="video-btn">
                    📺 Angalia Video za ${input}
                </a>
            `;
        } else {
            alert("Samahani, zao hilo halijapatikana. Jaribu: Maize, Tomato, au Beans.");
        }
    }, 1200);
}

// Function ya kuuliza swali la ziada (AI Dummy Response)
function askAI() {
    const question = document.getElementById('aiQuestion').value;
    const answerBox = document.getElementById('aiAnswer');
    const answerText = document.getElementById('aiText');
    
    if (question.length < 5) return;

    answerBox.style.display = 'block';
    answerText.innerText = "AI inafikiria...";

    setTimeout(() => {
        answerText.innerText = "Kulingana na wataalamu, " + question + " inahitaji uangalizi wa hali ya hewa na udongo wenye rutuba. Hakikisha unatumia mbolea ya asili kuongeza mazao.";
    }, 1500);
}
