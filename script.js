<!DOCTYPE html>
<html lang="sw">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mkulima Smart AI - Elimu na Ushauri</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; background-color: #f1f5f9; }
        .hero { background: linear-gradient(rgba(25, 135, 84, 0.8), rgba(25, 135, 84, 0.8)), url('https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&w=1350&q=80'); 
                background-size: cover; color: white; padding: 50px 0; border-bottom-left-radius: 40px; border-bottom-right-radius: 40px; }
        .search-box { margin-top: -40px; }
        .crop-card { border: none; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); background: white; overflow: hidden; }
        #cropImage { width: 100%; height: 350px; object-fit: cover; }
        .ai-chat-box { background-color: #e9f7ef; border-radius: 15px; padding: 20px; border-left: 5px solid #198754; }
        .video-btn { background-color: #ff0000; color: white; border-radius: 10px; text-decoration: none; padding: 10px 20px; display: inline-block; font-weight: bold; }
        .video-btn:hover { background-color: #cc0000; color: white; }
    </style>
</head>
<body>

    <header class="hero text-center">
        <div class="container">
            <h1 class="fw-bold">🚜 Mkulima Smart AI</h1>
            <p>Pata Elimu, Video, na Majibu ya AI kuhusu Kilimo</p>
        </div>
    </header>

    <main class="container mb-5">
        <div class="row justify-content-center search-box">
            <div class="col-md-8">
                <div class="card p-4 shadow-lg border-0 rounded-4">
                    <div class="input-group">
                        <input type="text" id="userCrop" class="form-control form-control-lg" placeholder="Tafuta zao (mfano: Nyanya, Mahindi, Mkaratusi)...">
                        <button onclick="generateData()" class="btn btn-success px-4 fw-bold">TAFUTA</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="loadingSpinner" class="text-center my-5" style="display:none;">
            <div class="spinner-border text-success" role="status"></div>
            <p class="mt-2 fw-bold">AI inakusanya taarifa kutoka kila sehemu...</p>
        </div>

        <div id="cropCard" class="row justify-content-center mt-5" style="display:none;">
            <div class="col-md-10">
                <div class="crop-card">
                    <div class="row g-0">
                        <div class="col-lg-6">
                            <img id="cropImage" src="" alt="Picha ya Zao">
                        </div>
                        <div class="col-lg-6 p-4">
                            <h2 id="cropTitle" class="text-success fw-bold text-capitalize"></h2>
                            <hr>
                            <div id="wikiInfo" style="max-height: 400px; overflow-y: auto; line-height: 1.8;"></div>
                            
                            <div id="videoArea" class="mt-4"></div>

                            <hr>
                            <div class="chat-section">
                                <h6 class="fw-bold mb-3 text-secondary">🤖 Swali la ziada? Uliza AI hapa:</h6>
                                <div class="input-group mb-3">
                                    <input type="text" id="aiQuestion" class="form-control" placeholder="Uliza mbolea, soko, dawa...">
                                    <button onclick="askAI()" class="btn btn-dark">TUMA</button>
                                </div>
                                <div id="aiAnswer" class="ai-chat-box" style="display:none;">
                                    <p id="aiText" class="mb-0"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="text-center py-4 bg-white border-top">
        <p class="text-muted">© 2026 Mkulima Smart AI | Elimu ya Kilimo kwa Wote</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
