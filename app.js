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

  loading.classList.remove("hidden");

  fakeLoading();

});


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