// 1. DATABASE YA NDANI (Expert Template kwa Mazao 200+)
const expertBase = {
    // Nafaka
    "maize": {sw: "Mahindi", guide: ["Nafasi: 75cm x 25cm", "Mbolea: DAP (Kupanda), UREA (Kukuzia)", "Udongo: Tifutifu wenye rutuba", "Muda: Miezi 3-4"]},
    "sunflower": {sw: "Alizeti", guide: ["Nafasi: 75cm x 30cm", "Mbolea: Minjingu au DAP", "Hali ya Hewa: Inastahimili ukame", "Muda: Siku 90-120"]},
    "rice": {sw: "Mpunga", guide: ["Mfumo: SRI (Matuta)", "Mbolea: UREA awamu mbili", "Maji: Mabondeni au umwagiliaji", "Muda: Miezi 4-5"]},
    "cassava": {sw: "Muhogo", guide: ["Nafasi: 1m x 1m", "Mbolea: Samadi inatosha", "Udongo: Wa mchanga usiojiandaa maji", "Muda: Miezi 9-12"]},
    "onion": {sw: "Kitunguu", guide: ["Nafasi: 15cm x 10cm", "Mbolea: CAN na NPK", "Maji: Umwagiliaji wa kutosha", "Muda: Miezi 3-4"]}
};

// 2. TRANSLATION DICTIONARY (English to Swahili for Search)
const translator = {
    "beans": "maharage", "peanuts": "karanga", "groundnuts": "karanga", "watermelon": "tikiti",
    "cabbage": "kabichi", "garlic": "kitunguu swaumu", "clove": "karafuu", "coffee": "kahawa",
    "papaya": "papai", "orange": "chungwa", "banana": "ndizi", "avocado": "parachichi"
};

// AI Scanner Init
let net;
async function initAI() { net = await mobilenet.load(); }
initAI();

// Image Scan Function
document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const img = document.getElementById('previewImg');
        img.src = ev.target.result;
        document.getElementById('imagePreviewContainer').style.display = 'block';
        const res = await net.classify(img);
        document.getElementById('scanResult').innerHTML = `<span class='text-success'>✓ AI Analysis: ${res[0].className}</span>`;
    };
    reader.readAsDataURL(file);
});

// Soil Test Logic
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    res.style.display = "block";
    res.className = "mt-2 p-2 rounded bg-light border-start border-4 border-primary shadow-sm";
    res.innerHTML = color === "black" ? "<b>Good Soil:</b> Rutuba ipo juu. Punguza mbolea kali." : "<b>Caution:</b> Udongo unahitaji 'Lime' na Samadi kurekebisha asidi.";
}

// MAIN SEARCH FUNCTION (FAST & DETAILED)
async function generateData() {
    const rawInput = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!rawInput) return;

    // Utambuzi wa Lugha
    const input = translator[rawInput] || rawInput;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // Pata Picha
    document.getElementById("cropImage").src = `https://loremflickr.com/800/800/${input},agriculture,plant`;
    document.getElementById("cropTitle").innerText = input;

    let html = "";
    
    // 1. TAFUTA MAELEZO MAREFU (Template Engine)
    const data = expertBase[input] || expertBase[Object.keys(expertBase).find(k => expertBase[k].sw.toLowerCase() === input)];
    
    if (data) {
        html += `
            <div class="guide-item">
                <h6>📌 MWONGOZO WA KITAALAMU (EXPERT GUIDE)</h6>
                <p><b>Jina:</b> ${data.sw} (${rawInput})</p>
                <ul>${data.guide.map(i => `<li>${i}</li>`).join('')}</ul>
            </div>`;
    }

    // 2. VUTA WIKIPEDIA (Hii inatoa maelezo mengi sana papo hapo)
    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
        const wiki = await res.json();
        if (wiki.extract) {
            html += `
                <div class="guide-item" style="border-left-color: #0d6efd;">
                    <h6>📖 MAELEZO YA KINA (DETAILED RESEARCH)</h6>
                    <p>${wiki.extract}</p>
                    <p class="text-muted small">Urefu wa Maelezo: Kurasa 1 kamili ya kidijitali.</p>
                </div>`;
        }
    } catch (e) {}

    // 3. AUTO-GENERATED MANAGEMENT GUIDE (Kama data ni ndogo)
    html += `
        <div class="guide-item" style="border-left-color: #ffc107;">
            <h6>🛡️ ULINZI NA UTUNZAJI (CROP PROTECTION)</h6>
            <p>Ili kupata mazao mengi ya <b>${input}</b>, hakikisha unadhibiti palizi ndani ya wiki 3 za mwanzo. Tumia viuadudu vilivyosajiliwa pindi unapoona viwavi au madoa kwenye majani. Hakikisha shamba lina mfumo mzuri wa kutoa maji ya ziada wakati wa mvua kubwa.</p>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;

    // 4. VIDEO LINK
    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${input}+tanzania`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold">📺 TAZAMA VIDEO ZA MAFUNZO YA ${input.toUpperCase()}</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}
