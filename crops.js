/**
 * crops.js - Database ya mazao yote (Bila API)
 * Data hii inatosha kwa app nzima - hakuna API inayohitajika!
 */

const cropsDatabase = {
    // MAHINDI
    "mahindi": {
        title: "MAHINDI",
        image: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🌽 Maelezo ya Mahindi</h5>
            <p><strong>Mahindi</strong> ni zao kikuu cha chakula Tanzania. Hustawi vizuri kwenye udongo wenye rutuba na mvua za kutosha.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi ya kupanda:</strong> 75cm kati ya mistari, 25cm kati ya mihogo</li>
                <li><strong>Mbolea:</strong> DAP wakati wa kupanda, UREA baada ya wiki 3-4</li>
                <li><strong>Msimu:</strong> Machi - Mei (masika), Oktoba - Desemba (vuli)</li>
                <li><strong>Umwagiliaji:</strong> Mara 2 kwa wiki kama hakuna mvua</li>
                <li><strong>Wadudu:</strong> Angalia stem borers - tumia dawa za kuzuia</li>
                <li><strong>Mavuno:</strong> Siku 90-120 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Staha, TMV1, Pioneer, SC719</p>
        `
    },
    
    // NYANYA
    "nyanya": {
        title: "NYANYA",
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🍅 Maelezo ya Nyanya</h5>
            <p><strong>Nyanya</strong> ni zao la biashara lenye faida kubwa. Hustawi vizuri kwenye hali ya hewa ya joto kiasi.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi ya kupanda:</strong> 60cm kati ya mistari, 40cm kati ya mimea</li>
                <li><strong>Mbolea:</strong> Samadi wakati wa kuandaa shamba, NPK baada ya wiki 2</li>
                <li><strong>Msimu:</strong> Mwaka mzima kwa umwagiliaji</li>
                <li><strong>Umwagiliaji:</strong> Mara 3 kwa wiki (epuka kumwagilia majani)</li>
                <li><strong>Magomjwa:</strong> Ukungu (blight) - piga dawa kila baada ya wiki 2</li>
                <li><strong>Mavuno:</strong> Siku 75-90 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Tanya, Cal J, Rio Grande, Assila F1</p>
        `
    },
    
    // PARACHICHI
    "parachichi": {
        title: "PARACHICHI",
        image: "https://images.unsplash.com/photo-1523038793306-2c212563454b?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🥑 Maelezo ya Parachichi</h5>
            <p><strong>Parachichi</strong> lina soko kubwa ndani na nje ya Tanzania. Hustawi maeneo ya miinuko (Arusha, Mbeya, Iringa).</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi ya kupanda:</strong> 5m x 5m (miti 160 kwa heka)</li>
                <li><strong>Mbolea:</strong> Samadi mara 2 kwa mwaka</li>
                <li><strong>Umwagiliaji:</strong> Mara 1 kwa wiki kiangazi</li>
                <li><strong>Kupogoa:</strong> Pogoa matawi yaliyokufa na yanayopandana</li>
                <li><strong>Mavuno:</strong> Huanza mwaka wa 3-4 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Hass, Fuerte, Pinkerton (zote za kuuza nje)</p>
        `
    },
    
    // MPUNGA
    "mpunga": {
        title: "MPUNGA",
        image: "https://images.unsplash.com/photo-1536331153400-02985479ec71?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🌾 Maelezo ya Mpunga</h5>
            <p><strong>Mpunga</strong> hustawi maeneo ya mabonde na kando ya mito (Morogoro, Mbeya, Mwanza).</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Maandalizi:</strong> Loweka mbegu kwa siku 1 kabla ya kupanda</li>
                <li><strong>Nafasi:</strong> 20cm x 20cm (kwa kupandikiza)</li>
                <li><strong>Mbolea:</strong> UREA mara 2 (wiki 3 na 6 baada ya kupandikiza)</li>
                <li><strong>Maji:</strong> Hifadhi maji kwa kina cha 5-10cm</li>
                <li><strong>Palizi:</strong> Palilia wiki 3 na 6 baada ya kupanda</li>
                <li><strong>Mavuno:</strong> Siku 120-150 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> SARO 5, TXD 306, Supa India</p>
        `
    },
    
    // MUHOGO
    "muhogo": {
        title: "MUHOGO",
        image: "https://images.unsplash.com/photo-1594315611252-7824174c83e2?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🌱 Maelezo ya Muhogo</h5>
            <p><strong>Muhogo</strong> hustahimili ukame na hustawi kwenye udongo duni. Zao muhimu kwa usalama wa chakula.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Vipandikizi:</strong> Tumia mashina yenye ncha 5-7 (urefu 20-30cm)</li>
                <li><strong>Nafasi:</strong> 1m x 1m (miti 10,000 kwa heka)</li>
                <li><strong>Msimu:</strong> Mwanzoni mwa mvua</li>
                <li><strong>Palizi:</strong> Mara 2 (wiki 4 na 8 baada ya kupanda)</li>
                <li><strong>Mavuno:</strong> Miezi 8-12 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Kiroba, Kalulu, Mreteta, Mahonda</p>
        `
    },
    
    // KITUNGUU
    "kitunguu": {
        title: "KITUNGUU",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🧅 Maelezo ya Kitunguu</h5>
            <p><strong>Kitunguu</strong> kina soko kubwa Tanzania. Hustawi vizuri kwenye udongo wa kichanga tifutifu.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Kitalu:</strong> Panda mbegu kwenye kitalu, hamisha baada ya wiki 6-8</li>
                <li><strong>Nafasi:</strong> 20cm x 10cm</li>
                <li><strong>Mbolea:</strong> DAP wakati wa kupanda, CAN baada ya wiki 4</li>
                <li><strong>Umwagiliaji:</strong> Mara 2 kwa wiki, acha kumwagilia wiki 2 kabla ya kuvuna</li>
                <li><strong>Mavuno:</strong> Siku 90-120 baada ya kupandikiza</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Red Creole, Bombay Red, Texas Grano</p>
        `
    },
    
    // KARANGA
    "karanga": {
        title: "KARANGA",
        image: "https://images.unsplash.com/photo-1567333160937-c558739b8f62?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🥜 Maelezo ya Karanga</h5>
            <p><strong>Karanga</strong> hustawi kwenye udongo wa kichanga unaopitisha maji vizuri.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi:</strong> 45cm x 15cm</li>
                <li><strong>Mbolea:</strong> Gypsum wakati wa maua kuongeza wingi wa karanga</li>
                <li><strong>Palizi:</strong> Mara 2 (wiki 3 na 6 baada ya kupanda)</li>
                <li><strong>Mavuno:</strong> Siku 90-120 baada ya kupanda</li>
                <li><strong>Kukausha:</strong> Kausha vizuri jua kwa siku 3-5 kabla ya kuhifadhi</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Johari, Mnanje, Red Valencia</p>
        `
    },
    
    // MAHARAGWE
    "maharagwe": {
        title: "MAHARAGWE",
        image: "https://images.unsplash.com/photo-1551462147-ff29053fad31?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🫘 Maelezo ya Maharagwe</h5>
            <p><strong>Maharagwe</strong> ni chanzo kizuri cha protini na huboresha udongo (nitrogen fixation).</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi:</strong> 50cm x 10cm (aina za mfupi), 75cm x 20cm (aina za kutambaa)</li>
                <li><strong>Mbolea:</strong> DAP wakati wa kupanda tu</li>
                <li><strong>Msimu:</strong> Masika na vuli</li>
                <li><strong>Wadudu:</strong> Angalia aphids na nondo wa maharagwe</li>
                <li><strong>Mavuno:</strong> Siku 60-90 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Uyole 94, Lyamungu 90, Jesca</p>
        `
    },
    
    // NDIZI
    "ndizi": {
        title: "NDIZI",
        image: "https://images.unsplash.com/photo-1571771894821-ad9902412746?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🍌 Maelezo ya Ndizi</h5>
            <p><strong>Ndizi</strong> hustawi maenea yenye mvua nyingi au umwagiliaji wa kutosha (Mbeya, Kagera, Kilimanjaro).</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi:</strong> 3m x 3m (miti 1,100 kwa heka)</li>
                <li><strong>Mbolea:</strong> Samadi mara 2 kwa mwaka, mbolea ya potasiamu</li>
                <li><strong>Matandazo:</strong> Weka majani makavu kuzuia unyevu kupotea</li>
                <li><strong>Kupogoa:</strong> Acha chipukizi 3-4 kwa kila kishina</li>
                <li><strong>Mavuno:</strong> Miezi 12-15 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Mchare, Mtwike, Gross Michel, Kibuzi</p>
        `
    },
    
    // ALIZETI
    "alizeti": {
        title: "ALIZETI",
        image: "https://images.unsplash.com/photo-1470137237906-d8a4f71e1966?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🌻 Maelezo ya Alizeti</h5>
            <p><strong>Alizeti</strong> hustahimili ukame na hustawi maeneo kama Dodoma, Singida, na Shinyanga.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Nafasi:</strong> 75cm x 30cm</li>
                <li><strong>Mbolea:</strong> DAP wakati wa kupanda</li>
                <li><strong>Palizi:</strong> Mara 2 (wiki 3 na 6 baada ya kupanda)</li>
                <li><strong>Mavuno:</strong> Siku 90-120 baada ya kupanda</li>
                <li><strong>Kukausha:</strong> Kausha vichwa jua kwa siku 3-5</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Record, Kenya Fedha, Hysun 33</p>
        `
    },
    
    // KIAZI MVIKINGO
    "viazi": {
        title: "VIAZI MVIRINGO",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02bad67b?auto=format&fit=crop&w=800",
        description: `
            <h5 class="text-success">🥔 Maelezo ya Viazi Mviringo</h5>
            <p><strong>Viazi mviringo</strong> hustawi maeneo ya miinuko yenye baridi kama Njombe, Iringa, na Mbeya.</p>
            
            <h6 class="mt-3">📋 Mwongozo wa Kilimo:</h6>
            <ul>
                <li><strong>Vipandikizi:</strong> Tumia viazi vidogo vyenye macho au kata viazi kubwa vipande 4</li>
                <li><strong>Nafasi:</strong> 75cm x 30cm</li>
                <li><strong>Mbolea:</strong> DAP wakati wa kupanda, CAN baada ya wiki 4</li>
                <li><strong>Kututua:</strong> Ongeza udongo kwenye mizizi wiki 4-6 baada ya kupanda</li>
                <li><strong>Mavuno:</strong> Siku 90-120 baada ya kupanda</li>
            </ul>
            
            <p class="mt-2"><strong>🏆 Aina bora Tanzania:</strong> Arnova, Tigoni, Desiree, Ukiguru</p>
        `
    }
};

/**
 * Tafuta zao kwenye database
 * @param {string} cropName - Jina la zao kwa Kiswahili au Kiingereza
 * @returns {object|null} Data ya zao au null
 */
function findCrop(cropName) {
    const searchTerm = cropName.toLowerCase().trim();
    
    // Tafuta moja kwa moja
    if (cropsDatabase[searchTerm]) {
        return cropsDatabase[searchTerm];
    }
    
    // Ramani ya majina yanayofanana
    const cropMapping = {
        "maize": "mahindi",
        "corn": "mahindi",
        "tomato": "nyanya",
        "tomatoes": "nyanya",
        "avocado": "parachichi",
        "rice": "mpunga",
        "paddy": "mpunga",
        "cassava": "muhogo",
        "onion": "kitunguu",
        "onions": "kitunguu",
        "groundnuts": "karanga",
        "peanuts": "karanga",
        "beans": "maharagwe",
        "banana": "ndizi",
        "bananas": "ndizi",
        "sunflower": "alizeti",
        "potato": "viazi",
        "potatoes": "viazi"
    };
    
    if (cropMapping[searchTerm]) {
        return cropsDatabase[cropMapping[searchTerm]];
    }
    
    return null;
}
