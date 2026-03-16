/**
 * MKULIMA SMART AI - FULL VERSION (FIXED SEARCH)
 * Developer: Nashon Alfred
 */

const GEMINI_API_KEY = "AIzaSyDnnwU81GTQpGxPECI5UEI7FrNL1MIaIPw"; 
const nambaYaBwanaShamba = "255797818582";

// 1. DATA YA MAZAO (Kwa ajili ya Search Button)
const cropData = {
    "mahindi": {
        picha: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=400",
        maelezo: "Mahindi yanastawi vizuri kwenye udongo wenye rutuba na mahitaji ya maji ya wastani."
    },
    "mpunga": {
        picha: "https://images.unsplash.com/photo-1536331153400-02985479ec71?auto=format&fit=crop&w=400",
        maelezo: "Mpunga unahitaji maji mengi na udongo wa kichanga au mfinyanzi unaohifadhi unyevu."
    },
    "nyanya": {
        picha: "https://images.unsplash.com/photo-1546473530-9a275ca7f15d?auto=format&fit=crop&w=400",
        maelezo: "Nyanya zinahitaji uangalizi wa karibu dhidi ya wadudu na magonjwa ya ukungu."
    }
};

// 🔍 TAFUTA ZAO (Crop Search Function)
function searchCrop() {
    const searchInput = document.querySelector('input[type="text"]').value.toLowerCase().trim();
    const displayArea = document.getElementById('chatWindow'); // Unaweza kubadilisha iende sehemu unayotaka

    if (cropData[searchInput]) {
        const crop = cropData[searchInput];
        displayArea.innerHTML = `
            <div class="card mb-3 shadow-sm border-0 animate__animated animate__fadeIn">
                <img src="${crop.picha}" class="card-img-top rounded" alt="${searchInput}">
                <div class="card-body">
                    <h5 class="card-title text-success text-uppercase">${searchInput}</h5>
                    <p class="card-text">${crop.maelezo}</p>
                </div>
            </div>
        ` + displayArea.innerHTML;
    } else {
        alert("Samahani, zao hilo halijapatikana. Jaribu: Mahindi, Mpunga, au Nyanya.");
    }
}

// 2. BEI ZA MASOKO
const marketData = [
    {z: "Mahindi", s: "Kibaigwa", b: "850/kg", h: "Panda ↑", c: "text-success"},
    {z: "Mpunga", s: "Mbeya", b: "1,550/kg", h: "Sawa -", c: "text-secondary"},
    {z: "Nyanya", s: "Kilombero", b: "25k/Sado", h: "Shuka ↓", c: "text-danger"}
];

function loadMarket() {
    let rows = "";
    marketData.forEach(m => {
        rows += `<tr><td>${m.z}</td><td>${m.s}</td><td class="fw-bold">${m.b}</td><td class="${m.c} fw-bold">${m.h}</td></tr>`;
    });
    const table = document.getElementById('marketTable');
    if (table) table.innerHTML = rows;
}

// 3. 💬 AI CHAT
async function askAI() {
    const input = document.getElementById("chatInput");
    const windowChat = document.getElementById("chatWindow");
    const msg = input.value.trim();
    if (!msg) return;

    windowChat.innerHTML += `<div class="mb-2 text-end"><span class="bg-primary text-white p-2 rounded-3 d-inline-block shadow-sm">${msg}</span></div>`;
    input.value = "";
    
    const loadingId = "load-" + Date.now();
    windowChat.innerHTML += `<div class="mb-2" id="${loadingId}"><span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> Inatafuta majibu...</span></div>`;
    windowChat.scrollTop = windowChat.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Wewe ni Bwana Shamba mtaalamu Tanzania. Jibu kwa Kiswahili: ${msg}` }] }]
            })
        });

        const data = await response.json();
        if (data.candidates) {
            const aiText = data.candidates[0].content.parts[0].text;
            const waButton = `<br><br><a href="https://wa.me/${nambaYaBwanaShamba}?text=Habari, swali langu: ${msg}" target="_blank" class="btn btn-sm btn-success fw-bold">WhatsApp Bwana Shamba</a>`;
            document.getElementById(loadingId).innerHTML = `<span class="bg-white p-2 rounded-3 d-inline-block shadow-sm border"><b>AI:</b> ${aiText} ${waButton}</span>`;
        }
    } catch (err) {
        document.getElementById(loadingId).innerHTML = `<span class="text-danger small">Jaribu tena baadae.</span>`;
    }
    windowChat.scrollTop = windowChat.scrollHeight;
}

// 4. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadMarket();
    
    // Unganisha kitufe cha TAFUTA na function ya searchCrop
    const searchBtn = document.querySelector('.btn-success.ms-2'); // Inatafuta button ya kijani juu
    if (searchBtn) {
        searchBtn.onclick = searchCrop;
    }
});
