/**
 * faq.js - Maswali na Majibu ya Kilimo (Bila AI)
 * Hii inachukua nafasi ya Gemini AI - Inajibu kwa kutumia database ya maswali
 */

const faqDatabase = {
    // Maswali kuhusu MAZAO
    "crops": [
        {
            keywords: ["mahindi", "maize", "panda mahindi", "mbolea ya mahindi"],
            question: "Namna ya kupanda mahindi?",
            answer: `
                <h6>🌽 KUPANDA MAHINDI</h6>
                <p><strong>Hatua kwa hatua:</strong></p>
                <ol>
                    <li><strong>Maandalizi ya shamba:</strong> Lima kwa kina cha 20-30cm, toa magugu yote</li>
                    <li><strong>Nafasi:</strong> Panda kwa nafasi 75cm kati ya mistari na 25cm kati ya mihogo</li>
                    <li><strong>Mbolea:</strong> Weka DAP (kiganja 1) kwenye kila shimo kabla ya kupanda</li>
                    <li><strong>Kupanda:</strong> Weka mbegu 2-3 kwa shimo, funika kwa udongo mwembamba</li>
                    <li><strong>Kupallia:</strong> Palilia wiki 3 na 6 baada ya kupanda</li>
                    <li><strong>Kuweka mbolea ya pili:</strong> Weka UREA (kiganja 1) baada ya wiki 4</li>
                </ol>
                <p class="mt-2"><strong>Msimu bora:</strong> Masika (Machi-Mei) na Vuli (Oktoba-Desemba)</p>
            `
        },
        {
            keywords: ["nyanya", "tomato", "panda nyanya", "mbolea ya nyanya"],
            question: "Namna ya kupanda nyanya?",
            answer: `
                <h6>🍅 KUPANDA NYANYA</h6>
                <p><strong>Hatua kwa hatua:</strong></p>
                <ol>
                    <li><strong>Kitalu:</strong> Panda mbegu kwenye kitalu kilichotayarishwa vizuri (siku 30-45)</li>
                    <li><strong>Kuhamisha:</strong> Hamisha miche kwenye shamba ikiwa na urefu wa 15-20cm</li>
                    <li><strong>Nafasi:</strong> Panda kwa nafasi 60cm kati ya mistari na 40cm kati ya mimea</li>
                    <li><strong>Mbolea:</strong> Weka samadi wakati wa kuandaa shamba, NPK baada ya wiki 2</li>
                    <li><strong>Kuweka vigingi:</strong> Weka vigingi kuzuia nyanya kuanguka chini</li>
                    <li><strong>Kupallia:</strong> Palilia wiki 3 na 6 baada ya kupanda</li>
                </ol>
                <p class="mt-2"><strong>Magonjwa:</strong> Angalia ukungu (blight) - piga dawa kila baada ya wiki 2</p>
            `
        },
        {
            keywords: ["muhogo", "cassava", "panda muhogo"],
            question: "Namna ya kupanda muhogo?",
            answer: `
                <h6>🌱 KUPANDA MUHOGO</h6>
                <p><strong>Hatua kwa hatua:</strong></p>
                <ol>
                    <li><strong>Kuchagua vipandikizi:</strong> Tumia mashina yenye ncha 5-7 (urefu 20-30cm) kutoka muhogo wenye afya</li>
                    <li><strong>Maandalizi:</strong> Loweka vipandikizi kwenye maji kwa muda wa saa 1 kabla ya kupanda</li>
                    <li><strong>Nafasi:</strong> Panda kwa nafasi 1m x 1m (miti 10,000 kwa heka)</li>
                    <li><strong>Kupanda:</strong> Chimba shimo la kina 10cm, weka vipandikizi kwa pembe 45°</li>
                    <li><strong>Kupallia:</strong> Palilia wiki 4 na 8 baada ya kupanda</li>
                </ol>
                <p class="mt-2"><strong>Mavuno:</strong> Miezi 8-12 baada ya kupanda</p>
            `
        }
    ],
    
    // Maswali kuhusu WADUDU NA MAGONJWA
    "pests": [
        {
            keywords: ["mdudu", "wadudu", "dawa", "nyonyo", "kunguni"],
            question: "Namna ya kudhibiti wadudu?",
            answer: `
                <h6>🐛 KUDHIBITI WADUDU</h6>
                <p><strong>Wadudu wa kawaida na tiba zao:</strong></p>
                <table class="table table-sm">
                    <tr><th>Mdudu</th><th>Dawa</th><th>Mazao yanayoshambuliwa</th></tr>
                    <tr><td>Nondo wa mahindi</td><td>Cypermethrin</td><td>Mahindi, mtama</td></tr>
                    <tr><td>Afidi (nyonyo)</td><td>Confidor, Omethoate</td><td>Nyanya, maharagwe, mboga</td></tr>
                    <tr><td>Nondo wa nyanya</td><td>Ranger, Ampligo</td><td>Nyanya, pilipili</td></tr>
                    <tr><td>Kunguni</td><td>Karate, Duduthrin</td><td>Maharage, mbaazi</td></tr>
                </table>
                <p class="mt-2"><strong>Dawa za asili:</strong> Changanya pilipili kali, kitunguu saumu na maji, nyunyiza kwenye mimea</p>
            `
        },
        {
            keywords: ["ukungu", "fungus", "blight", "madoa", "kuoza"],
            question: "Namna ya kudhibiti ukungu?",
            answer: `
                <h6>🍄 KUDHIBITI UKUNGU</h6>
                <p><strong>Magonjwa ya ukungu na tiba:</strong></p>
                <ul>
                    <li><strong>Blight (ukungu wa nyanya):</strong> Piga dawa ya Ridomil au Copper oxychloride kila baada ya wiki 2</li>
                    <li><strong>Powdery mildew (unga wa majani):</strong> Tumia Sulphur au Cobox</li>
                    <li><strong>Maua kuoza:</strong> Weka mbolea ya Calcium (gypsum) na maji ya kutosha</li>
                </ul>
                <p><strong>Kinga:</strong> Panda mbegu zilizothibitishwa, epuka kumwagilia majani, hakikisha mzunguko wa hewa</p>
            `
        }
    ],
    
    // Maswali kuhusu MB OLEA
    "fertilizer": [
        {
            keywords: ["mbolea", "dap", "urea", "samadi", "fertilizer"],
            question: "Namna ya kutumia mbolea?",
            answer: `
                <h6>🧪 MATUMIZI YA MBOLEA</h6>
                <p><strong>Aina za mbolea na matumizi yake:</strong></p>
                <table class="table table-sm">
                    <tr><th>Mbolea</th><th>Matumizi</th><th>Mazao</th></tr>
                    <tr><td><strong>DAP</strong></td><td>Wakati wa kupanda (kiganja 1 kwa shimo)</td><td>Mahindi, maharagwe, alizeti</td></tr>
                    <tr><td><strong>UREA</strong></td><td>Baada ya wiki 3-4 (mbolea ya pili)</td><td>Mahindi, mpunga, nyasi</td></tr>
                    <tr><td><strong>NPK</strong></td><td>Wakati wa kupanda au baada ya wiki 2</td><td>Nyanya, pilipili, mboga</td></tr>
                    <tr><td><strong>CAN</strong></td><td>Baada ya wiki 4-6</td><td>Viazi, nyanya, mahindi</td></tr>
                    <tr><td><strong>Samadi</strong></td><td>Wakati wa kuandaa shamba</td><td>Mazao yote</td></tr>
                </table>
                <p class="mt-2"><strong>Kumbuka:</strong> Usiweke mbolea nyingi sana - inaweza kuharibu mazao</p>
            `
        }
    ],
    
    // Maswali kuhusu MIFUGO
    "livestock": [
        {
            keywords: ["ng'ombe", "cow", "mifugo", "fugo"],
            question: "Namna ya kutunza ng'ombe?",
            answer: `
                <h6>🐄 UTUNZAJI WA NG'OMBE</h6>
                <p><strong>Mambo muhimu:</strong></p>
                <ul>
                    <li><strong>Chakula:</strong> Malisho bora (nyasi, majani ya mahindi, pumba) + maji safi kila siku</li>
                    <li><strong>Zahanati:</strong> Chanjo mara kwa mara (kuharisha, ndui, kimeta)</li>
                    <li><strong>Makazi:</strong> Zizi safi, kavu na lenye hewa ya kutosha</li>
                    <li><strong>Madawa ya minyoo:</strong> Piga dawa ya minyoo kila baada ya miezi 3</li>
                    <li><strong>Kuzalisha:</strong> Tenganisha maxino na majike kwa wakati unaofaa</li>
                </ul>
                <p><strong>Ishara za ng'ombe mgonjwa:</strong> Hana hamu ya kula, homa, kuharisha, maziwa hupungua</p>
            `
        },
        {
            keywords: ["kuku", "chicken", "nguku"],
            question: "Namna ya kutunza kuku?",
            answer: `
                <h6>🐔 UTUNZAJI WA KUKU</h6>
                <p><strong>Mambo muhimu:</strong></p>
                <ul>
                    <li><strong>Chakula:</strong> Dandali, pumba, mahindi, maji safi kila siku</li>
                    <li><strong>Makazi:</strong> Banda safi lenye mchanga, vifaranga wanahitaji joto</li>
                    <li><strong>Chanjo:</strong> Chanjo ya mdondo (Newcastle) kila baada ya miezi 3</li>
                    <li><strong>Madawa:</strong> Dawa ya kukinga kuharisha kwenye maji</li>
                    <li><strong>Kutaga mayai:</strong> Weza taa kwenye banda ili kuku wage mayai zaidi</li>
                </ul>
                <p><strong>Kuku wanaougua:</strong> Huwa wamekunjamana, manyoya yamesimama, hawataki kula</p>
            `
        }
    ],
    
    // Maswali kuhusu UMWAGILIAJI
    "irrigation": [
        {
            keywords: ["maji", "umwagiliaji", "irrigation", "kumwagilia"],
            question: "Namna bora ya kumwagilia mazao?",
            answer: `
                <h6>💧 UMWAGILIAJI BORA</h6>
                <p><strong>Njia za kumwagilia:</strong></p>
                <ul>
                    <li><strong>Matone (drip):</strong> Bora zaidi, huokoa maji, gharama kidogo ya uendeshaji</li>
                    <li><strong>Kunyunyizia (sprinkler):</strong> Inafaa kwa mboga na mazao yote</li>
                    <li><strong>Kwa mtaro:</strong> Inafaa kwa mpunga na mazao yanayohitaji maji mengi</li>
                    <li><strong>Kwa ndoo/trekta:</strong> Gharama nafuu lakini inachosha</li>
                </ul>
                <p><strong>Muda bora wa kumwagilia:</strong> Asubuhi na mapema (kabla ya 10am) au jioni (baada ya 4pm)</p>
                <p><strong>Kiasi cha maji:</strong> Mazao yanahitaji mm 25-50 za maji kwa wiki (kulingana na aina)</p>
            `
        }
    ],
    
    // Maswali kuhusu UHIFADHI
    "storage": [
        {
            keywords: ["kuhifadhi", "storage", "gunia", "pumba"],
            question: "Namna ya kuhifadhi mazao?",
            answer: `
                <h6>📦 KUHIFADHI MAZAO</h6>
                <p><strong>Njia bora za kuhifadhi:</strong></p>
                <ul>
                    <li><strong>Mahindi:</strong> Kausha vizuri (13-15% unyevu), weka kwenye gunia au kibuyu, tumia dawa ya kuzuia weevil (Actellic)</li>
                    <li><strong>Maharagwe:</strong> Kausha jua kwa siku 3-5, weka kwenye chombo kisichopitisha hewa</li>
                    <li><strong>Mpunga:</strong> Kausha hadi 14% unyevu, weka kwenye gunia safi</li>
                    <li><strong>Karanga:</strong> Kausha vizuri, weka kwenye gunia au vibuyu vya kufungwa</li>
                </ul>
                <p><strong>Dawa za kuhifadhi:</strong> Actellic Super, Skana, Shumba. Changanya na mazao kabla ya kuhifadhi</p>
            `
        }
    ],
    
    // Maswali ya jumla
    "general": [
        {
            keywords: ["hela", "pesa", "mikopo", "loan", "benki"],
            question: "Namna ya kupata mikopo ya kilimo?",
            answer: `
                <h6>💰 MIKOPO YA KILIMO</h6>
                <p><strong>Mikopo inapatikana:</strong></p>
                <ul>
                    <li><strong>AMCOS:</strong> Vyama vya ushirika - riba nafuu kwa wanachama</li>
                    <li><strong>SACCOS:</strong> Vyama vya mikopo - wanatoa mikopo ya kilimo</li>
                    <li><strong>TIB Bank:</strong> Benki ya kilimo - mikopo maalum kwa wakulima</li>
                    <li><strong>CRDB/NMB:</strong> Mikopo ya vikundi (group loans)</li>
                    <li><strong>VICOBA:</strong> Vikundi vya ndani - kukopeshana</li>
                </ul>
                <p><strong>Mahitaji:</strong> Kitambulisho, hati ya umiliki wa shamba, mpango wa biashara</p>
            `
        },
        {
            keywords: ["hali ya hewa", "mvua", "weather", "tabia nchi"],
            question: "Hali ya hewa kwa msimu huu?",
            answer: `
                <h6>⛅ HALI YA HEWA</h6>
                <p><strong>Msimu wa Masika 2026:</strong></p>
                <ul>
                    <li><strong>Machi:</strong> Mvua za wastani (100-150mm) - Panda mahindi, maharagwe</li>
                    <li><strong>Aprili:</strong> Mvua nyingi (150-200mm) - Panda mpunga, viazi</li>
                    <li><strong>Mei:</strong> Mvua zinapungua - Palilia na weka mbolea</li>
                </ul>
                <p><strong>Kanda ya Ziwa:</strong> Mvua nyingi mwaka mzima</p>
                <p><strong>Kanda ya Kati:</strong> Mvua chache, panda mazao yanayostahimili ukame (muhogo, alizeti, karanga)</p>
            `
        }
    ]
};

/**
 * Tafuta jibu kwenye FAQ database
 * @param {string} question - Swali la mtumiaji
 * @returns {string|null} Jibu au null
 */
function findAnswer(question) {
    const searchTerm = question.toLowerCase();
    
    // Tafuta kwenye makundi yote
    for (const category in faqDatabase) {
        const questions = faqDatabase[category];
        
        for (const item of questions) {
            // Angalia keywords
            for (const keyword of item.keywords) {
                if (searchTerm.includes(keyword.toLowerCase())) {
                    return {
                        question: item.question,
                        answer: item.answer
                    };
                }
            }
        }
    }
    
    // Hakuna jibu lililopatikana
    return null;
}

/**
 * Pata mapendekezo ya maswali (kwa ajili ya autocomplete)
 * @param {string} partial - Sehemu ya swali
 * @returns {Array} Maswali yanayofanana
 */
function suggestQuestions(partial) {
    const suggestions = [];
    const searchTerm = partial.toLowerCase();
    
    for (const category in faqDatabase) {
        for (const item of faqDatabase[category]) {
            for (const keyword of item.keywords) {
                if (keyword.includes(searchTerm) && !suggestions.includes(item.question)) {
                    suggestions.push(item.question);
                    break;
                }
            }
        }
    }
    
    return suggestions.slice(0, 5); // Rudisha 5 tu
}

// Fungua kwa global scope
window.faqDatabase = faqDatabase;
window.findAnswer = findAnswer;
window.suggestQuestions = suggestQuestions;
