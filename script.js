<!DOCTYPE html>
<html lang="sw">
<head>
    <meta charset="UTF-8">
    <title>Mkulima Smart AI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container my-4">

    <h1 class="text-center mb-3">🌾 Mkulima Smart AI</h1>
    <p class="text-center text-muted">
        Msaidizi wa kilimo kwa sauti na maandishi (AI-style)
    </p>

    <!-- Language -->
    <div class="text-end mb-3">
        <button class="btn btn-outline-success btn-sm" onclick="switchLanguage()">
            SW / EN
        </button>
    </div>

    <!-- Search -->
    <div class="text-center mb-4">
        <input type="text" id="userCrop" class="form-control w-50 d-inline"
               placeholder="Andika jina la zao (mf: maize, rice, tomato)">
        <button class="btn btn-success ms-2" onclick="generateData()">Tafuta</button>
    </div>

    <!-- Crop Card -->
    <div class="card p-4" id="cropCard" style="display:none;">
        <h3 id="cropTitle" class="text-center mb-3"></h3>

        <div class="text-center mb-3">
            <div id="loadingSpinner" class="spinner-border text-success" role="status"></div>
            <img id="cropImage" class="img-fluid rounded mt-3" style="display:none;">
        </div>

        <p id="wikiInfo"></p>

        <hr>

        <!-- AI Assistant -->
        <h4>🤖 Mkulima AI – Uliza Swali</h4>
        <input type="text" id="aiQuestion" class="form-control mb-2"
               placeholder="Mf: Nitapanda lini? Ni mbolea gani?">

        <div class="d-flex gap-2 mb-2">
            <button class="btn btn-success" onclick="askAI()">Uliza AI</button>
            <button class="btn btn-outline-success" onclick="startVoice()">🎤 Sauti</button>
            <button class="btn btn-outline-secondary" onclick="toggleVoiceAnswer()">
                🔊 Jibu kwa sauti: <span id="voiceStatus">OFF</span>
            </button>
        </div>

        <div class="bg-light p-3 rounded" id="aiAnswer" style="display:none;">
            <strong>Jibu la AI:</strong>
            <p id="aiText" class="mb-0"></p>
        </div>
    </div>

</div>

<script src="script.js"></script>
</body>
</html>


