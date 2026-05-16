const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const analyzeBtn = document.getElementById("analyzeBtn");

const resultDiv = document.getElementById("result");
const animalName = document.getElementById("animalName");
const animalImage = document.getElementById("animalImage");
const animalDescription = document.getElementById("animalDescription");
const scoreText = document.getElementById("score");
const loading = document.getElementById("loading");

let latestLandmarks = null;

function resizeCanvas() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
}

video.addEventListener("loadedmetadata", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

const faceMesh = new FaceMesh({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

const camera = new Camera(video, {
  onFrame: async () => {
    await faceMesh.send({ image: video });
  },
  width: 640,
  height: 480,
});

faceMesh.onResults(onFaceResults);
camera.start();

function onFaceResults(results) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
    const landmarks = results.multiFaceLandmarks[0];
    latestLandmarks = landmarks;
    drawLandmarks(landmarks);
    updateScannerStatus(true);
  } else {
    latestLandmarks = null;
    updateScannerStatus(false);
  }
}

function updateScannerStatus(detected) {
  const statusPanel = document.getElementById("statusPanel");

  if (statusPanel) {
    statusPanel.innerHTML = detected
      ? `<p>FACE DETECTED ✓</p>
         <p>LANDMARKS: 468</p>
         <p>AI STATUS: ACTIVE</p>`
      : `<p>AWAITING FACE...</p>
         <p>LANDMARKS: 0</p>
         <p>AI STATUS: STANDBY</p>`;
  }
}

analyzeBtn.addEventListener("click", () => {
  if (!latestLandmarks) {
    alert("No face detected. Please ensure your face is visible to the camera.");
    return;
  }

  startFakeAnalysis(latestLandmarks);
});

function startFakeAnalysis(landmarks) {
  const loadingText = document.getElementById("loadingText");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const metricsLive = document.getElementById("metricsLive");

  resultDiv.classList.add("hidden");
  loading.classList.remove("hidden");

  loading.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  const messages = [
    "Initializing phylogenetic engine...",
    "Mapping craniofacial landmarks...",
    "Estimating evolutionary divergence...",
    "Calculating weirdness coefficient...",
    "Comparing phenotype clusters...",
    "Detecting nocturnal tendencies...",
    "Computing conference survivability...",
    "Scanning for caffeine dependency...",
    "Evaluating social camouflage...",
    "Finalizing species assignment...",
    "WARNING: excessive goblin phenotype detected...",
    "Rare cryptid morphology identified...",
    "Subject displays strong shoebill energy...",
  ];

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 12;

    if (progress > 100) {
      progress = 100;
    }

    progressBar.style.width = `${progress}%`;
    progressText.innerText = `${Math.floor(progress)}%`;

    const message = messages[Math.floor(Math.random() * messages.length)];
    loadingText.innerText = message;

    const fakeEye = (Math.random() * 0.2 + 0.2).toFixed(2);
    const fakeNose = (Math.random() * 0.3 + 0.2).toFixed(2);
    const fakeChaos = (Math.random() * 100).toFixed(0);

    metricsLive.innerHTML = `
      Eye Ratio ........ ${fakeEye}<br>
      Nose Width ....... ${fakeNose}<br>
      Chaos Index ...... ${fakeChaos}<br>
      Sleep Debt ....... HIGH<br>
      Conference Stress  CRITICAL<br>
    `;

    if (progress >= 100) {
      clearInterval(interval);
      loadingText.innerText = "MATCH FOUND";

      setTimeout(() => {
        loading.classList.add("hidden");
        generateAnimal();
      }, 1200);
    }
  }, 350);
}

function generateAnimal() {
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const score = Math.floor(Math.random() * 20) + 80;

  animalName.innerText = `You Are: ${animal.name}`;
  animalImage.src = animal.image;
  animalImage.alt = animal.name;
  animalDescription.innerText = animal.description;
  scoreText.innerText = `${score}% morphological similarity`;

  if (
    animal.name === "UNCLASSIFIED ENTITY" ||
    animal.name === "BIBLICALLY ACCURATE RESEARCHER" ||
    animal.name === "REVIEWER #2"
  ) {
    document.body.style.background = "radial-gradient(circle, #330000, #000000)";
  } else {
    document.body.style.background = "";
  }

  resultDiv.classList.remove("hidden");

  resultDiv.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function drawLandmarks(landmarks) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#b6ff00";
  ctx.lineWidth = 1;

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [5, 6], [6, 7], [7, 8],
    [9, 10], [10, 11], [11, 12],
    [13, 14], [14, 15], [15, 16],
    [17, 18], [18, 19], [19, 20],
    [21, 22], [22, 23], [23, 24],
    [25, 26], [26, 27], [27, 28],
    [29, 30], [30, 31], [31, 32],
    [33, 34], [34, 35], [35, 36],
    [37, 38], [38, 39], [39, 40],
    [41, 42], [42, 43], [43, 44],
    [45, 46], [46, 47], [47, 48],
  ];

  for (const [start, end] of connections) {
    if (landmarks[start] && landmarks[end]) {
      const p1 = landmarks[start];
      const p2 = landmarks[end];

      ctx.beginPath();
      ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
      ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "#00ff99";

  for (const point of landmarks) {
    ctx.beginPath();
    ctx.arc(
      point.x * canvas.width,
      point.y * canvas.height,
      2,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
