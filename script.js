/**
 * MKULIMA SMART AI - VERSION 4.0 (Final Stable)
 * Kazi: Sauti, Picha, AI, na Video (Faster & Accurate)
 */

// 1. KUSIKILIZA SAUTI (Speech to Text)
function recordVoice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
        alert("Samahani, Browser yako hairuhusu sauti. Tafadhali tumia Chrome.");
        return;
    }

    const recognition = new Recognition();
    recognition.lang = 'sw-TZ'; // Lugha ya Kiswahili

    recognition.onstart = () => {
        const btn = document.querySelector('button[onclick="recordVoice()"]');
        if (btn) btn.innerHTML = "🎤 Inasikiliza...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('userCrop').value = transcript;
        generateData(); // Anza kutafuta papo hapo
    };

    recognition.onend = () => {
        const btn = document.querySelector('button[onclick="recordVoice()"]');
        if (btn) btn.innerHTML = "🎤 Ongea";
    };

    recognition.start();
}

// 2. AI KUONGEA (Text to Speech)
function speak(text) {
    // Zima sauti yoyote inayoongea kabla ya kuanza mpya
    window.speechSynthesis.cancel();
    
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sw-TZ';
    utterance.pitch = 1.0;
    utterance.rate = 1.0; // Kasi ya kawaida ya binadamu
    window.speechSynthesis.speak(utterance);
}

// 3. KAZI KUU (Picha, AI, na Video)
async function generateData() {
    const inputField = document.getElementById('userCrop');
    const input = inputField.value.trim();
    const card = document.getElementById('cropCard');
    const spinner = document.getElementById('loadingSpinner');
    
    if (!input) {
        alert("Tafadhali andika jina la zao au swali!");
        return;
    }

    // Maandalizi ya haraka (Instant UI)
    if (spinner) spinner.style.display = 'block';
    card.style.display = 'none';

    try {
        // A. PICHA: Inavuta picha papo hapo kwa kutumia jina la zao
        const imgElement = document.getElementById('cropImage');
        // Tunatumia cache-breaker ili kupata picha mpya kila wakati
        imgElement.src = `https://loremflickr.com/800/600/${encodeURIComponent(input)},agriculture/all?t=${new Date().getTime()}`;

        // B. AI DATA: Tunavuta kutoka Wikipedia ya Kiswahili (Parallel Fetch kwa Kasi)
        const wikiUrl = `https://sw.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`;
        
        // C. VIDEO: Tunatengeneza Embed ya YouTube kwa wakati mmoja
        const videoArea = document.getElementById('videoArea');
        videoArea.innerHTML = `
            <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:12px; background:#000;">
                <iframe 
                    style="position:absolute; top:0; left:0; width:100%; height:100%;" 
                    src="https://www.youtube.com/embed?listType=search&list=kilimo+cha+${encodeURIComponent(input)}" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
            <p class="text-center mt-2 small">📺 Video za Mafunzo: Kilimo cha ${input}</p>
        `;

        // D. KUKAMILISHA AI DATA
        const response = await fetch(wikiUrl);
        let jibuText = "";

        if (response.ok) {
            const data = await response.json();
            jibuText = data.extract;
            document.getElementById('cropTitle').innerText = input.toUpperCase();
            document.getElementById('wikiInfo').innerHTML = `<p>${jibuText}</p>`;
        } else {
            jibuText = `Nimepata video za kilimo kuhusu ${input}. Unaweza kutazama hapo chini kujifunza zaidi.`;
            document.getElementById('cropTitle').innerText = input.toUpperCase();
            document.getElementById('wikiInfo').innerHTML = `<p>${jibuText}</p>`;
        }

        // E. ONYESHA MATOKEO (FINAL OUTPUT)
        if (spinner) spinner.style.display = 'none';
        card.style.display = 'block';
        
        // AI Inaanza kuongea jibu
        speak(jibuText);

    } catch (error) {
        if (spinner) spinner.style.display = 'none';
        console.error("Kosa:", error);
        alert("Imeshindwa kupata data. Hakikisha una internet.");
    }
}
