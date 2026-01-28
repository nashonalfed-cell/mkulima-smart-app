let cropsDataDB = {};
// Kamusi ya kutafsiri majina ya Kiswahili kwenda Kiingereza ili picha zipatikane kirahisi
const cropAlias = {
    "mahindi": "maize", "nyanya": "tomato", "mpunga": "rice", "maharage": "beans",
    "kitunguu": "onion", "kabichi": "cabbage", "muhogo": "cassava", "viazi": "potato",
    "tikiti": "watermelon", "parachichi": "avocado", "nanasi": "pineapple", "chungwa": "orange",
    "mwembe": "mango", "ndizi": "banana", "alizeti": "sunflower", "karanga": "groundnuts",
    "karoti": "carrot", "kitunguu swaumu": "garlic", "hoho": "pepper", "tangawizi": "ginger",
    "kahawa": "coffee", "chai": "tea", "pamba": "cotton", "mkonge": "sisal", "karafuu": "cloves",
    "mkaratusi": "eucalyptus", "msunobari": "pine", "mti wa mbao": "teak", "mwanzi": "bamboo",
    "ufuta": "sesame", "maharage ya soya": "soybeans", "mbaazi": "pigeonpeas", "kunde": "cowpeas",
    "tango": "cucumber", "biringanya": "eggplant", "bamia": "okra", "mchicha": "spinach",
    "vanila": "vanilla", "kakao": "cocoa", "korosho": "cashew", "zabibu": "grapes",
    "limao": "lemon", "strowberi": "strawberry", "papai": "papaya", "ngano": "wheat",
    "shayiri": "barley", "mtama": "sorghum", "ulezi": "millet", "mnazi": "coconut", "epo": "apple"
};

fetch('crops.json')
    .then(res => res.json())
    .then(data => { cropsDataDB = data; })
    .catch(() => console.log("Database ya JSON haipo."));

async function generateData() {
    let userInput = document.getElementById("userCrop").value.trim().toLowerCase();
    if (!userInput) return alert("Andika zao!");

    let searchKey = cropAlias[userInput] || userInput; // Kama lipo kwenye alias chukua Kiingereza, vinginevyo chukua hivyohivyo

    document.getElementById("loadingSpinner").style.display = "block";
    document.getElementById("cropCard").style.display = "none";

    // 1. PICHA YA AUTOMATIC: Inatafuta picha kulingana na jina la zao
    document.getElementById("cropImage").src = `https://loremflickr.com/800/500/${searchKey},agriculture,farm`;
    document.getElementById("cropTitle").innerText = userInput;

    let localHtml = "";
    const local = cropsDataDB[searchKey] ? cropsDataDB[searchKey]["sw"] : null;
    if (local) {
        localHtml = `<div class="alert alert-success"><strong>📍 Mwongozo:</strong><br>🌱 ${local.planting}<br>🧪 ${local.fertilizer}<br>🌾 ${local.harvest}</div>`;
    }

    const infoDiv = document.getElementById("wikiInfo");
    infoDiv.innerHTML = localHtml + "<em>Inapakia maelezo ya kina...</em>";

    try {
        const res = await fetch(`https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userInput)}`);
        const data = await res.json();
        if (data.extract) {
            infoDiv.innerHTML = localHtml + `<h6>📖 Kuhusu:</h6><p>${data.extract}</p>`;
        }
    } catch (e) {
        infoDiv.innerHTML = localHtml + "<p class='small'>Tumia mwongozo wa hapo juu.</p>";
    }

    const ytLink = `https://www.youtube.com/results?search_query=kilimo+cha+${userInput}`;
    document.getElementById("videoArea").innerHTML = `<a href="${ytLink}" target="_blank" class="btn btn-danger btn-sm w-100">📺 TAZAMA VIDEO ZA ${userInput.toUpperCase()}</a>`;

    document.getElementById("loadingSpinner").style.display = "none";
    document.getElementById("cropCard").style.display = "flex";
}
