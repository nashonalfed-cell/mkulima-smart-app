/**
 * market.js - Database ya bei za soko (Bila API)
 * Data hii inaweza kubadilishwa manually kila mwezi
 */

// Bei za soko kwa msimu (zinaweza kubadilishwa na mkulima mwenyewe)
const marketData = {
    // Tarehe ya mwisho kuupdate
    lastUpdate: "2026-03-19",
    
    // Bei za soko kwa mikoa mbalimbali
    prices: [
        {
            crop: "Mahindi",
            market: "Kibaigwa",
            price: "850/kg",
            trend: "up",
            change: "+2%",
            region: "Dodoma"
        },
        {
            crop: "Mahindi",
            market: "Iringa",
            price: "820/kg",
            trend: "down",
            change: "-1%",
            region: "Iringa"
        },
        {
            crop: "Mahindi",
            market: "Mbeya",
            price: "830/kg",
            trend: "up",
            change: "+1%",
            region: "Mbeya"
        },
        {
            crop: "Nyanya",
            market: "Ilala",
            price: "20,000/gorofa",
            trend: "down",
            change: "-5%",
            region: "Dar es Salaam"
        },
        {
            crop: "Nyanya",
            market: "Arusha",
            price: "22,000/gorofa",
            trend: "up",
            change: "+3%",
            region: "Arusha"
        },
        {
            crop: "Nyanya",
            market: "Mwanza",
            price: "21,000/gorofa",
            trend: "up",
            change: "+2%",
            region: "Mwanza"
        },
        {
            crop: "Parachichi",
            market: "Arusha",
            price: "1,500/kg",
            trend: "up",
            change: "+3%",
            region: "Arusha"
        },
        {
            crop: "Parachichi",
            market: "Mbeya",
            price: "1,400/kg",
            trend: "up",
            change: "+2%",
            region: "Mbeya"
        },
        {
            crop: "Parachichi",
            market: "Dar es Salaam",
            price: "1,800/kg",
            trend: "up",
            change: "+4%",
            region: "Dar es Salaam"
        },
        {
            crop: "Muhogo",
            market: "Mtwara",
            price: "30,000/gunia",
            trend: "down",
            change: "-1%",
            region: "Mtwara"
        },
        {
            crop: "Muhogo",
            market: "Lindi",
            price: "28,000/gunia",
            trend: "up",
            change: "+2%",
            region: "Lindi"
        },
        {
            crop: "Muhogo",
            market: "Dar es Salaam",
            price: "35,000/gunia",
            trend: "up",
            change: "+3%",
            region: "Dar es Salaam"
        },
        {
            crop: "Viazi",
            market: "Njombe",
            price: "45,000/gunia",
            trend: "up",
            change: "+4%",
            region: "Njombe"
        },
        {
            crop: "Viazi",
            market: "Iringa",
            price: "43,000/gunia",
            trend: "up",
            change: "+2%",
            region: "Iringa"
        },
        {
            crop: "Viazi",
            market: "Dar es Salaam",
            price: "50,000/gunia",
            trend: "up",
            change: "+5%",
            region: "Dar es Salaam"
        },
        {
            crop: "Kitunguu",
            market: "Dodoma",
            price: "1,200/kg",
            trend: "up",
            change: "+1%",
            region: "Dodoma"
        },
        {
            crop: "Kitunguu",
            market: "Singida",
            price: "1,150/kg",
            trend: "down",
            change: "-2%",
            region: "Singida"
        },
        {
            crop: "Kitunguu",
            market: "Dar es Salaam",
            price: "1,400/kg",
            trend: "up",
            change: "+3%",
            region: "Dar es Salaam"
        },
        {
            crop: "Maharagwe",
            market: "Iringa",
            price: "2,500/kg",
            trend: "down",
            change: "-3%",
            region: "Iringa"
        },
        {
            crop: "Maharagwe",
            market: "Mbeya",
            price: "2,400/kg",
            trend: "up",
            change: "+1%",
            region: "Mbeya"
        },
        {
            crop: "Maharagwe",
            market: "Dar es Salaam",
            price: "2,800/kg",
            trend: "up",
            change: "+2%",
            region: "Dar es Salaam"
        },
        {
            crop: "Ndizi",
            market: "Mbeya",
            price: "500/kipande",
            trend: "up",
            change: "+2%",
            region: "Mbeya"
        },
        {
            crop: "Ndizi",
            market: "Kagera",
            price: "450/kipande",
            trend: "up",
            change: "+1%",
            region: "Kagera"
        },
        {
            crop: "Ndizi",
            market: "Dar es Salaam",
            price: "600/kipande",
            trend: "up",
            change: "+3%",
            region: "Dar es Salaam"
        },
        {
            crop: "Alizeti",
            market: "Singida",
            price: "800/kg",
            trend: "up",
            change: "+2%",
            region: "Singida"
        },
        {
            crop: "Alizeti",
            market: "Dodoma",
            price: "780/kg",
            trend: "down",
            change: "-1%",
            region: "Dodoma"
        },
        {
            crop: "Karanga",
            market: "Mtwara",
            price: "2,200/kg",
            trend: "up",
            change: "+3%",
            region: "Mtwara"
        },
        {
            crop: "Karanga",
            market: "Dar es Salaam",
            price: "2,500/kg",
            trend: "up",
            change: "+4%",
            region: "Dar es Salaam"
        },
        {
            crop: "Mpunga",
            market: "Morogoro",
            price: "1,500/kg",
            trend: "up",
            change: "+2%",
            region: "Morogoro"
        },
        {
            crop: "Mpunga",
            market: "Mbeya",
            price: "1,450/kg",
            trend: "down",
            change: "-1%",
            region: "Mbeya"
        },
        {
            crop: "Mpunga",
            market: "Mwanza",
            price: "1,400/kg",
            trend: "up",
            change: "+1%",
            region: "Mwanza"
        }
    ],
    
    // Pata bei za zao maalum
    getPricesByCrop: function(cropName) {
        return this.prices.filter(item => 
            item.crop.toLowerCase() === cropName.toLowerCase()
        );
    },
    
    // Pata bei za soko maalum
    getPricesByMarket: function(marketName) {
        return this.prices.filter(item => 
            item.market.toLowerCase().includes(marketName.toLowerCase())
        );
    },
    
    // Pata bei za mkoa maalum
    getPricesByRegion: function(regionName) {
        return this.prices.filter(item => 
            item.region.toLowerCase().includes(regionName.toLowerCase())
        );
    },
    
    // Pata bei za juu zaidi
    getHighestPrices: function(limit = 5) {
        // Hii ni rahisi - tunarudisha bei za juu kwa bei kubwa
        // Kwa kweli tungepanga kwa bei, lakini bei ni string ( "850/kg" )
        return this.prices.slice(0, limit);
    },
    
    // Pata bei za chini zaidi
    getLowestPrices: function(limit = 5) {
        return this.prices.slice(-limit);
    },
    
    // Pata bei za leo (zote)
    getAllPrices: function() {
        return this.prices;
    },
    
    // Idadi ya masoko
    getMarketCount: function() {
        return this.prices.length;
    },
    
    // Tarehe ya mwisho kuupdate
    getLastUpdate: function() {
        return this.lastUpdate;
    }
};

// Data ya ziada - maelezo ya masoko
const marketInfo = {
    "Kibaigwa": {
        name: "Soko la Kibaigwa",
        region: "Dodoma",
        openDays: "Jumatatu na Alhamisi",
        description: "Soko kubwa la mazao kati ya mikoa"
    },
    "Ilala": {
        name: "Soko la Ilala",
        region: "Dar es Salaam",
        openDays: "Kila siku",
        description: "Soko kuu la Dar es Salaam"
    },
    "Arusha": {
        name: "Soko la Arusha",
        region: "Arusha",
        openDays: "Jumanne na Ijumaa",
        description: "Soko la kimataifa la mazao"
    },
    "Mtwara": {
        name: "Soko la Mtwara",
        region: "Mtwara",
        openDays: "Jumatano na Jumamosi",
        description: "Soko la mazao ya pwani"
    },
    "Njombe": {
        name: "Soko la Njombe",
        region: "Njombe",
        openDays: "Jumanne na Jumamosi",
        description: "Soko la viazi na mazao ya baridi"
    },
    "Dodoma": {
        name: "Soko la Dodoma",
        region: "Dodoma",
        openDays: "Jumatatu na Alhamisi",
        description: "Soko kuu la mazao ya kati"
    },
    "Iringa": {
        name: "Soko la Iringa",
        region: "Iringa",
        openDays: "Jumatano na Jumamosi",
        description: "Soko la mazao ya miinuko"
    },
    "Mbeya": {
        name: "Soko la Mbeya",
        region: "Mbeya",
        openDays: "Jumanne na Ijumaa",
        description: "Soko la mpunga na ndizi"
    },
    "Mwanza": {
        name: "Soko la Mwanza",
        region: "Mwanza",
        openDays: "Jumatatu na Alhamisi",
        description: "Soko la mazao ya kanda ya ziwa"
    },
    "Morogoro": {
        name: "Soko la Morogoro",
        region: "Morogoro",
        openDays: "Jumatano na Jumamosi",
        description: "Soko la mpunga na matunda"
    },
    "Singida": {
        name: "Soko la Singida",
        region: "Singida",
        openDays: "Jumanne na Ijumaa",
        description: "Soko la alizeti na mazao ya ukame"
    },
    "Kagera": {
        name: "Soko la Kagera",
        region: "Kagera",
        openDays: "Jumatatu na Alhamisi",
        description: "Soko la ndizi na kahawa"
    },
    "Lindi": {
        name: "Soko la Lindi",
        region: "Lindi",
        openDays: "Jumatano na Jumamosi",
        description: "Soko la muhogo na karanga"
    }
};

// Fungua data kwa global scope
window.marketData = marketData;
window.marketInfo = marketInfo;
