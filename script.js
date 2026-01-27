// 1. DATA ZOTE ZIPO HAPA (Hazihitaji faili la nje)
const mazaoData = {
    "maize": { "p": "Panda mwanzoni mwa mvua, nafasi ya 75cm x 25cm.", "f": "Tumia DAP kupanda na UREA mahindi yakiwa urefu wa goti.", "h": "Hukomaa baada ya miezi 3-4." },
    "tomato": { "p": "Panda kwenye kitalu kwa wiki 4 kisha hamishia shambani.", "f": "Tumia NPK na mbolea ya samadi iliyoiva.", "h": "Huanza kuvunwa baada ya siku 75-90." },
    "beans": { "p": "Panda kwa nafasi ya 50cm x 10cm.", "f": "Inahitaji mbolea kidogo ya DAP, hujitengenezea naitrojeni.", "h": "Hukuvunwa baada ya siku 60-90." },
    "onion": { "p": "Panda mbegu kwenye kitalu, kisha hamishia kwa nafasi ya 10cm.", "f": "Inahitaji mbolea ya CAN na NPK.", "h": "Hukomaa baada ya miezi 3-4." },
    "rice": { "p": "Panda kwenye vitalu kwanza kisha hamishia shambani kwenye maji.", "f": "Tumia mbolea ya kukuzia (UREA) mara mbili.", "h": "Hukomaa baada ya miezi 4-5." },
    "mkaratusi": { "p": "Panda miche kwenye mashimo yenye kina cha kutosha.", "f": "Inastahimili udongo duni, samadi inatosha.", "h": "Huvunwa kwa nguzo baada ya miaka 5-8." },
    "watermelon": { "p": "Panda mbegu moja kwa moja shambani, nafasi mita 2.", "f": "Inahitaji mbolea ya samadi na NPK.", "h": "Hukomaa baada ya siku 80-100." }
};

// Ramani ya kutafsiri Kiswahili kwenda kwenye Key za juu
const kamusi = {
    "mahindi": "maize", "nyanya": "tomato", "maharage": "beans", 
    "kitunguu": "onion", "mpunga": "rice", "tikiti": "watermelon"
};

function generateData() {
    // 1. Pata kile mkulima alichoandika
    const inputField = document.getElementById('userCrop');
    if (!inputField) return console.error("Huwezi kupata ID 'userCrop'");
    
    const input = inputField.value.toLowerCase().trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');

    if (input === "") {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    // Onyesha loading
    spinner.style.display = 'block';
    card.style.display = 'none';

    // Chelewesha kidogo kuleta hisia ya AI
    setTimeout(() => {
        spinner.style.display = 'none';

        // Tafuta zao
        let key = mazaoData[input] ? input : kamusi[input];

        if (key && mazaoData[key]) {
            const zao = mazaoData[key];
            
            // Jaza taarifa kwenye HTML
            document.getElementById('cropTitle').innerText = input.toUpperCase();
            document.getElementById('cropImage').src = `https://loremflickr.com/600/400/${key},agriculture`;
            
            document.getElementById('wikiInfo').innerHTML = `
                <p><strong>🌱 Upandaji:</strong><br> ${zao.p}</p>
                <p><strong>🧪 Mbolea:</strong><br> ${zao.f}</p>
                <p><strong>🌾 Uvunaji:</strong><br> ${zao.h}</p>
            `;
            
            document.getElementById('videoArea').innerHTML = `
                <a href="https://www.youtube.com/results?search_query=kilimo+cha+${input}" target="_blank" class="video-btn">
                    📺 Tazama Video za ${input}
                </a>`;
            
            card.style.display = 'block'; // Tumia 'block' badala ya 'flex' kama inazingua
        } else {
            alert("Samahani, zao hili halipo kwenye orodha yetu. Jaribu: Mahindi, Nyanya, au Tikiti.");
        }
    }, 800);
}
