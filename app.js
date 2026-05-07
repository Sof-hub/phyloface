const video = document.getElementById("video");
const analyzeBtn = document.getElementById("analyzeBtn");

const resultDiv = document.getElementById("result");

const animalName = document.getElementById("animalName");
const animalImage = document.getElementById("animalImage");
const animalDescription = document.getElementById("animalDescription");
const scoreText = document.getElementById("score");

const loading = document.getElementById("loading");


// CAMERA

navigator.mediaDevices.getUserMedia({
  video: true
})
.then(stream => {
  video.srcObject = stream;
});


// ANALYSIS BUTTON

analyzeBtn.addEventListener("click", () => {

  if (!latestLandmarks) {

    alert("No face detected.");

    return;

  }

  startFakeAnalysis(latestLandmarks);

});

function startFakeAnalysis(landmarks) {

  const loading =
    document.getElementById("loading");

  const loadingText =
    document.getElementById("loadingText");

  const progressBar =
    document.getElementById("progressBar");

  const progressText =
    document.getElementById("progressText");

  const metricsLive =
    document.getElementById("metricsLive");



  loading.classList.remove("hidden");



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

    "Subject displays strong shoebill energy..."

  ];



  let progress = 0;



  const interval = setInterval(() => {

    progress += Math.random() * 12;



    if (progress > 100) {

      progress = 100;

    }



    progressBar.style.width =
      `${progress}%`;



    progressText.innerText =
      `${Math.floor(progress)}%`;



    const message =

      messages[
        Math.floor(
          Math.random() * messages.length
        )
      ];



    loadingText.innerText =
      message;



    // Fake live metrics

    const fakeEye =
      (Math.random() * 0.2 + 0.2)
      .toFixed(2);

    const fakeNose =
      (Math.random() * 0.3 + 0.2)
      .toFixed(2);

    const fakeChaos =
      (Math.random() * 100)
      .toFixed(0);



    metricsLive.innerHTML = `

      Eye Ratio ........ ${fakeEye}<br>
      Nose Width ....... ${fakeNose}<br>
      Chaos Index ...... ${fakeChaos}<br>
      Sleep Debt ....... HIGH<br>
      Conference Stress  CRITICAL<br>

    `;



    if (progress >= 100) {

      clearInterval(interval);



      loadingText.innerText =
        "MATCH FOUND";



      setTimeout(() => {

        loading.classList.add("hidden");

        analyzeFace(landmarks);

      }, 1200);

    }

  }, 350);

}


// FAKE AI LOADING

function fakeLoading() {

  const messages = [

    "Analyzing craniofacial topology...",
    "Comparing evolutionary pathways...",
    "Calculating weirdness score...",
    "Estimating phylogenetic instability...",
    "Scanning for sleep deprivation...",
    "Detecting conference survival traits..."

  ];

  let i = 0;

  const interval = setInterval(() => {

    document.getElementById("loadingText").innerText =
      messages[i % messages.length];

    i++;

  }, 1200);

  setTimeout(() => {

    clearInterval(interval);

    loading.classList.add("hidden");

    generateAnimal();

  }, 6000);

}


// GENERATE RESULT

function generateAnimal() {

  const animal =
    animals[Math.floor(Math.random() * animals.length)];

  const score =
    Math.floor(Math.random() * 20) + 80;

  animalName.innerText =
    `You Are: ${animal.name}`;

  animalImage.src =
    animal.image;

  animalDescription.innerText =
    animal.description;

  scoreText.innerText =
    `${score}% morphological similarity`;

  resultDiv.classList.remove("hidden");

  const rare = Math.random();

  if (rare < 0.01) {

  animalName.innerText =
    "UNCLASSIFIED ENTITY";

  animalDescription.innerText =
    "Evolution refuses responsibility.";
  }
  
}

function drawLandmarks(landmarks) {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );



  // DRAW CONNECTIONS

  ctx.strokeStyle = "#b6ff00";
  ctx.lineWidth = 1;



  for (let i = 0; i < landmarks.length - 1; i++) {

    const p1 = landmarks[i];
    const p2 = landmarks[i + 1];

    ctx.beginPath();

    ctx.moveTo(
      p1.x * canvas.width,
      p1.y * canvas.height
    );

    ctx.lineTo(
      p2.x * canvas.width,
      p2.y * canvas.height
    );

    ctx.stroke();

  }



  // DRAW POINTS

  ctx.fillStyle = "#00ff99";

  for (const point of landmarks) {

    ctx.beginPath();

    ctx.arc(
      point.x * canvas.width,
      point.y * canvas.height,
      1.5,
      0,
      2 * Math.PI
    );

    ctx.fill();

  }

}

