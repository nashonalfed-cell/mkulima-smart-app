// 1. DATA YA BWANA SHAMBA
const nambaYaBwanaShamba = "255797818582";

// 2. SMART DATABASE (Nafasi & Mbolea kwa Makundi ya Mazao 200+)
const cropExpertRules = {
    "nafaka": { spacing: "75cm x 25cm", fertilizer: "DAP & UREA", harvest: "Miezi 3-5" },
    "mikunde": { spacing: "45cm x 15cm", fertilizer: "Minjingu (Lime)", harvest: "Miezi 2-3" },
    "mbogamboga": { spacing: "60cm x 45cm", fertilizer: "NPK & Samadi", harvest: "Siku 60-90" },
    "matunda": { spacing: "4m x 4m", fertilizer: "Mboji na CAN", harvest: "Miaka 1-3" },
    "viungo": { spacing: "30cm x 30cm", fertilizer: "Samadi nyingi", harvest: "Miezi 6-12" }
};

// Orodha ya Mazao (Mifano ya jinsi yanavyopangwa)
const cropCategories = {
    "mahindi": "nafaka", "mpunga": "nafaka", "ngano": "nafaka", "mtama": "nafaka",
    "maharage": "mikunde", "karanga": "mikunde", "mbaazi": "mikunde", "kunde": "mikunde", "soy": "mikunde",
    "nyanya": "mbogamboga", "kitunguu": "mbogamboga", "kabichi": "mbogamboga", "hoho": "mbogamboga", "bamia": "mbogamboga",
    "embe": "matunda", "papai": "matunda", "parachichi": "matunda", "chungwa": "matunda", "tikiti": "matunda",
    "tangawizi": "viungo", "vitunguu saumu": "viungo", "karafuu": "viungo", "vanila": "viungo", "ufuta": "viungo"
};

// 3. DATA YA MASOKO
const marketPrices = [
    {z: "Mahindi", s: "Kibaigwa", b: "800/kg", h: "Sawa"},
    {z: "Ufuta", s: "Lindi", b: "3,200/kg", h: "Panda ↑"},
    {z: "Mpunga", s: "Mbeya", b: "1,400/kg", h: "Panda ↑"}
];

// Pakia Masoko
(function() {
    let rows = "";
    marketPrices.forEach(m => rows += `<tr><td>${m.z}</td><td>${m.s}</td><td class='fw-bold text-success'>${m.b}</td><td>${m.h}</td></tr>`);
    document.getElementById('marketTable').innerHTML = rows;
})();

// 4. SEARCH ENGINE (Inazalisha maelezo ya kina ya kila zao)
async function generateData() {
    const query = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!query) return;

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    document.getElementById("cropImage").src = `https://loremflickr.com/800/600/${query},agriculture`;
    document.getElementById("cropTitle").innerText = query;

    let html = "";
    
    // A. Maelezo ya Kitaalamu (Spacing/Fertilizer)
    const category = cropCategories[query] || "nafaka"; // Default kwenda nafaka kama halipo
    const expert = cropExpertRules[category];

    html += `
        <div class="guide-card">
            <h6>✅ MWONGOZO WA KILIMO BORA (${query.toUpperCase()})</h6>
            <p><b>Nafasi:</b> ${expert.spacing}</p>
            <p><b>Mbolea:</b> ${expert.fertilizer}</p>
            <p><b>Muda wa Kuvuna:</b> ${expert.harvest}</p>
        </div>`;

    // B. Wikipedia Fetch (Inatoa maelezo marefu ya kila zao kati ya 200+)
    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.extract) {
            html += `<div class="guide-card" style="border-left-color: #0d6efd;"><h6>📖 HISTORIA NA MAELEZO MAREFU</h6><p>${data.extract}</p></div>`;
        }
    } catch (e) {}

    // C. KITUFE CHA WHATSAPP (Direct to You)
    const msg = encodeURIComponent(`Habari Bwana Shamba, nimekwama kidogo kwenye kilimo cha ${query}. Naomba msaada.`);
    html += `
        <div class="mt-4 p-4 text-center rounded-4 border-dashed border-success border-2 bg-light">
            <h6 class="fw-bold">Je, unahitaji msaada zaidi wa ${query}?</h6>
            <a href="https://wa.me/${nambaYaBwanaShamba}?text=${msg}" target="_blank" class="btn btn-success btn-lg w-100 fw-bold shadow">
                💬 CHAT NA BWANA SHAMBA (WhatsApp)
            </a>
        </div>`;

    document.getElementById("infoArea").innerHTML = html;
    
    const yt = `https://www.youtube.com/results?search_query=kilimo+cha+${query}+tanzania`;
    document.getElementById("videoArea").innerHTML = `<a href="${yt}" target="_blank" class="btn btn-danger w-100 fw-bold py-2">📺 TAZAMA VIDEO ZA MAFUNZO</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}
