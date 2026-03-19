/**
 * app.js - Logic kuu ya Mkulima Smart AI (Bila API)
 * Inaunganisha crops.js, market.js, na faq.js
 */

// ============================================
// 1. CROP SEARCH - Kutafuta mazao kwenye database
// ============================================
async function searchCrop() {
    const input = document.getElementById('userCrop');
    const cropCard = document.getElementById('cropCard');
    const cropTitle = document.getElementById('cropTitle');
    const cropImage = document.getElementById('cropImage');
    const infoArea = document.getElementById('infoArea');
    const loading = document.getElementById('loadingSpinner');

    const cropName = input.value.trim();
    
    if (!cropName) {
        alert("Tafadhali andika jina la zao!");
        return;
    }

    // Onyesha loading
    loading.style.display = "block";
    cropCard.style.display = "none";

    try {
        // Tafuta zao kwenye database (kutoka crops.js)
        const cropData = findCrop(cropName);
        
        // Kama lipo, onyesha maelezo
        if (cropData) {
            cropTitle.innerText = cropData.title;
            cropImage.src = cropData.image;
            infoArea.innerHTML = cropData.description;
            
            loading.style.display = "none";
            cropCard.style.display = "block";
        } else {
            // Kama halipo, toa ujumbe
            loading.style.display = "none";
            
            // Onyesha card yenye ujumbe
            cropTitle.innerText = cropName.toUpperCase();
            cropImage.src = "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800";
            infoArea.innerHTML = `
                <div class="alert alert-warning">
                    <h6>⚠️ Zao "${cropName}" halijapatikana</h6>
                    <p>Jaribu majina haya: mahindi, nyanya, muhogo, viazi, maharagwe, ndizi, alizeti, kitunguu, karanga, mpunga, parachichi</p>
                </div>
            `;
            cropCard.style.display = "block";
        }
    } catch (error) {
        loading.style.display = "none";
        alert("Kuna tatizo. Tafadhali jaribu tena.");
        console.error(error);
    }
}

// ============================================
// 2. SOIL TEST - Ushauri wa udongo
// ============================================
function testSoil() {
    const color = document.getElementById('soilColor').value;
    const res = document.getElementById('soilResult');
    
    const advice = {
        black: `
            <div class="alert alert-success">
                <h6>✅ UDONGO MWEUSI</h6>
                <p><strong>Tabia:</strong> Una rutuba nyingi, humus nyingi, unashikilia maji vizuri.</p>
                <p><strong>Yanayofaa:</strong> Mahindi, nyanya, mboga za majani, maharagwe, ndizi.</p>
                <p><strong>Ushauri:</strong> Lima kwa matuta kuhifadhi unyevu. Ongeza mbolea ya samadi mara moja kwa msimu.</p>
            </div>
        `,
        red: `
            <div class="alert alert-warning">
                <h6>🟡 UDONGO MWekundu</h6>
                <p><strong>Tabia:</strong> Una madini ya chuma na alumini, tindikali kiasi, rutuba ya wastani.</p>
                <p><strong>Yanayofaa:</strong> Karanga, viazi vitamu, alizeti, muhogo, nanasi.</p>
                <p><strong>Ushauri:</strong> Ongeza mbolea ya samadi na majani mabichi. Panda mimea ya kunde kuboresha nitrojeni.</p>
            </div>
        `,
        sandy: `
            <div class="alert alert-info">
                <h6>⚪ UDONGO WA MCHANGA</h6>
                <p><strong>Tabia:</strong> Unapita maji haraka, hauna rutuba nyingi, hukauka upesi.</p>
                <p><strong>Yanayofaa:</strong> Muhogo, karanga, viazi, tikiti maji, alizeti.</p>
                <p><strong>Ushauri:</strong> Ongeza mbolea ya samadi kwa wingi. Tumia matandazo (mulching) kuhifadhi unyevu. Panda mimea inayostahimili ukame.</p>
            </div>
        `,
        clay: `
            <div class="alert alert-secondary">
                <h6>🟤 UDONGO WA MFINYANZI</h6>
                <p><strong>Tabia:</strong> Unashikilia maji kwa muda mrefu, una rutuba lakini ngumu kulima ukiwa mvua.</p>
                <p><strong>Yanayofaa:</strong> Mpunga, nyanya, kabichi, ndizi, viazi mviringo.</p>
                <p><strong>Ushauri:</strong> Lima kwa matuta marefu kuzuia maji kutuama. Ongeza mboji na majani kuboresha mwepesi wa udongo.</p>
            </div>
        `
    };
    
    res.style.display = "block";
    res.innerHTML = advice[color] || "Chagua rangi ya udongo kuona ushauri.";
}

// ============================================
// 3. MARKET DATA - Kuonyesha bei za soko
// ============================================
function loadMarketData() {
    const marketTable = document.getElementById('marketTable');
    
    if (!marketTable) return;
    
    try {
        // Pata data kutoka market.js
        const allPrices = marketData.getAllPrices();
        
        if (allPrices && allPrices.length > 0) {
            // Onyesha bei 12 za kwanza (au zote)
            const displayPrices = allPrices.slice(0, 12);
            
            marketTable.innerHTML = displayPrices.map(item => {
                const trendClass = item.trend === 'up' ? 'text-success' : 'text-danger';
                const trendIcon = item.trend === 'up' ? '↑' : '↓';
                const trendText = item.trend === 'up' ? 'Panda' : 'Shuka';
                
                return `
                    <tr>
                        <td><strong>${item.crop}</strong></td>
                        <td>${item.market}</td>
                        <td class="fw-bold">${item.price}</td>
                        <td class="${trendClass}">
                            ${trendIcon} ${trendText} ${item.change || ''}
                        </td>
                    </tr>
                `;
            }).join('');
        } else {
            marketTable.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Hakuna data ya soko kwa sasa</td></tr>';
        }
    } catch (error) {
        console.error('Error loading market data:', error);
        marketTable.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Kuna tatizo kupakia data</td></tr>';
    }
}

// ============================================
// 4. CHAT / FAQ - Kujibu maswali
// ============================================
function askQuestion() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const question = input.value.trim();
    
    if (!question) return;

    // Onyesha swali la mtumiaji
    windowChat.innerHTML += `<div class="user-msg">${question}</div>`;
    input.value = "";
    
    // Tafuta jibu kwenye FAQ database
    const result = findAnswer(question);
    
    if (result) {
        // Jibu lilipatikana
        windowChat.innerHTML += `
            <div class="ai-msg">
                <strong>${result.question}</strong><br>
                ${result.answer}
            </div>
        `;
    } else {
        // Hakuna jibu
        windowChat.innerHTML += `
            <div class="ai-msg">
                <p>Samahani, sijapata jibu la swali lako kwenye database yetu.</p>
                <p class="small text-muted">Jaribu kuuliza kuhusu: kupanda mahindi, wadudu, mbolea, ng'ombe, kuku, au kuhifadhi mazao.</p>
            </div>
        `;
    }
    
    // Tembeza chini
    windowChat.scrollTop = windowChat.scrollHeight;
}

// ============================================
// 5. ENTER KEY SUPPORT
// ============================================
function setupEnterKey() {
    const cropInput = document.getElementById('userCrop');
    const chatInput = document.getElementById('chatInput');
    
    if (cropInput) {
        cropInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCrop();
            }
        });
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                askQuestion();
            }
        });
    }
}

// ============================================
// 6. AUTO-SUGGEST (Hiari - inaweza kuongezwa)
// ============================================
function setupAutoSuggest() {
    // Hii ni feature ya ziada - inaweza kuongezwa baadaye
    // Kwa sasa tunaacha
}

// ============================================
// 7. INITIALIZE - Anzisha kila kitu
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load market data
    loadMarketData();
    
    // Setup enter key
    setupEnterKey();
    
    // Add welcome message to chat
    const windowChat = document.getElementById('chatWindow');
    if (windowChat && windowChat.children.length <= 1) {
        windowChat.innerHTML += `
            <div class="ai-msg">
                <strong>Karibu Bwana Shamba!</strong><br>
                <p>Unaweza kuniuliza maswali kuhusu:</p>
                <ul class="small">
                    <li>🌽 Kupanda mazao (mahindi, nyanya, muhogo...)</li>
                    <li>🐛 Wadudu na magonjwa</li>
                    <li>🧪 Mbolea na udongo</li>
                    <li>🐄 Mifugo (ng'ombe, kuku)</li>
                    <li>💧 Umwagiliaji</li>
                    <li>📦 Kuhifadhi mazao</li>
                </ul>
                <p class="text-muted small">⚡ Ninajibu kwa kutumia database ya ndani (hakuna internet inayohitajika)</p>
            </div>
        `;
    }
    
    console.log("Mkulima Smart AI imeanza - Hakuna API inayotumika!");
});

// ============================================
// 8. FUNCTIONS ZA ZIADA (Kwa ajili ya HTML)
// ============================================

// Refresh market data (kwa button ya future)
function refreshMarketData() {
    loadMarketData();
    
    // Onyesha notification
    const marketCard = document.querySelector('.card-header');
    if (marketCard) {
        const originalText = marketCard.innerHTML;
        marketCard.innerHTML = '💰 BEI ZA MASOKO LEO ✓ Imeburishwa';
        setTimeout(() => {
            marketCard.innerHTML = originalText;
        }, 2000);
    }
}

// Pata maelezo ya soko
function getMarketInfo(marketName) {
    if (marketInfo && marketInfo[marketName]) {
        return marketInfo[marketName];
    }
    return null;
}

// Tafuta bei za zao maalum
function searchMarketByCrop(cropName) {
    if (marketData && marketData.getPricesByCrop) {
        return marketData.getPricesByCrop(cropName);
    }
    return [];
}

// Tafuta bei za mkoa maalum
function searchMarketByRegion(regionName) {
    if (marketData && marketData.getPricesByRegion) {
        return marketData.getPricesByRegion(regionName);
    }
    return [];
}

// ============================================
// 9. OFFILE SUPPORT - Hakikisha inafanya kazi offline
// ============================================
if ('serviceWorker' in navigator) {
    // Hii inaweza kuongezwa baadaye kwa PWA
    console.log("Service Worker inaweza kuongezwa kwa offline mode");
}

// Fungua functions kwa global scope
window.searchCrop = searchCrop;
window.testSoil = testSoil;
window.askQuestion = askQuestion;
window.refreshMarketData = refreshMarketData;
window.loadMarketData = loadMarketData;
