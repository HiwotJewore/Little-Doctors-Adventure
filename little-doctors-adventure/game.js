// Common Diseases (10)
const commonDiseases = [
    { name: "Common Cold", symptoms: "Runny nose, sneezing, mild fever", treatment: "thermometer", cure: "Rest and fluids", severity: "mild" },
    { name: "Flu", symptoms: "High fever, body aches, fatigue", treatment: "thermometer", cure: "Antiviral medication", severity: "moderate" },
    { name: "Headache", symptoms: "Head pain, sensitivity to light", treatment: "medicine", cure: "Pain relievers", severity: "mild" },
    { name: "Stomach Bug", symptoms: "Nausea, vomiting, diarrhea", treatment: "medicine", cure: "Anti-nausea medication", severity: "moderate" },
    { name: "Sore Throat", symptoms: "Throat pain, difficulty swallowing", treatment: "stethoscope", cure: "Throat lozenges", severity: "mild" },
    { name: "Ear Infection", symptoms: "Ear pain, hearing difficulty", treatment: "otoscope", cure: "Antibiotic drops", severity: "moderate" },
    { name: "Allergies", symptoms: "Itchy eyes, sneezing, rash", treatment: "medicine", cure: "Antihistamines", severity: "mild" },
    { name: "Bronchitis", symptoms: "Persistent cough, chest congestion", treatment: "stethoscope", cure: "Cough suppressant", severity: "moderate" },
    { name: "Migraine", symptoms: "Severe headache, nausea, light sensitivity", treatment: "medicine", cure: "Migraine medication", severity: "severe" },
    { name: "Food Poisoning", symptoms: "Severe stomach pain, vomiting", treatment: "medicine", cure: "IV fluids and rest", severity: "severe" }
];

// Rare Diseases (5)
const rareDiseases = [
    { name: "Fibromyalgia", symptoms: "Widespread muscle pain, fatigue", treatment: "xray", cure: "Physical therapy", severity: "chronic" },
    { name: "Lupus", symptoms: "Joint pain, butterfly rash, fatigue", treatment: "bloodtest", cure: "Immunosuppressants", severity: "chronic" },
    { name: "Celiac Disease", symptoms: "Digestive issues, weight loss", treatment: "bloodtest", cure: "Gluten-free diet", severity: "chronic" },
    { name: "Narcolepsy", symptoms: "Excessive daytime sleepiness", treatment: "neurological", cure: "Sleep medication", severity: "chronic" },
    { name: "Hemophilia", symptoms: "Easy bruising, prolonged bleeding", treatment: "bloodtest", cure: "Clotting factor therapy", severity: "chronic" }
];

const patientNames = ["Emma", "Jake", "Lily", "Alex", "Maya", "Sam", "Zoe", "Ben", "Aria", "Leo", "Mia", "Noah", "Eva", "Max", "Ivy"];
const patientImages = ["patient1.svg", "patient2.svg", "patient3.svg"];

let currentPatient = 0;
let patientsHelped = 0;
let doctorScore = 0;
let doctorLevel = 1;
let gamePatients = [];

// Doctor Rewards System
const rewards = {
    1: { title: "Medical Student", badge: "🩺", requirement: 0 },
    2: { title: "Junior Doctor", badge: "👨⚕️", requirement: 3 },
    3: { title: "Experienced Doctor", badge: "🏥", requirement: 7 },
    4: { title: "Specialist", badge: "🔬", requirement: 12 },
    5: { title: "Chief of Medicine", badge: "👑", requirement: 20 }
};

// Initialize game with random patients
function initializeGame() {
    gamePatients = [];
    for (let i = 0; i < 15; i++) {
        const isRare = Math.random() < 0.2;
        const disease = isRare ? 
            rareDiseases[Math.floor(Math.random() * rareDiseases.length)] :
            commonDiseases[Math.floor(Math.random() * commonDiseases.length)];
        
        gamePatients.push({
            name: patientNames[Math.floor(Math.random() * patientNames.length)],
            image: patientImages[Math.floor(Math.random() * patientImages.length)],
            disease: disease.name,
            symptoms: disease.symptoms,
            treatment: disease.treatment,
            cure: disease.cure,
            severity: disease.severity,
            isRare: isRare
        });
    }
}

initializeGame();
updateDisplay();

function updateDisplay() {
    document.getElementById('doctor-level').textContent = `Level ${doctorLevel}: ${rewards[doctorLevel].title} ${rewards[doctorLevel].badge}`;
    document.getElementById('patients-helped').textContent = `Patients Helped: ${patientsHelped}`;
    document.getElementById('doctor-score').textContent = `Score: ${doctorScore}`;
    
    if (currentPatient < gamePatients.length) {
        const patient = gamePatients[currentPatient];
        document.getElementById('patient-name').textContent = patient.name;
        document.getElementById('patient-symptoms').textContent = `Symptoms: ${patient.symptoms}`;
        document.getElementById('patient-severity').textContent = `Severity: ${patient.severity.toUpperCase()}`;
        document.getElementById('patient-severity').className = `severity ${patient.severity}`;
        document.getElementById('patient-image').src = `images/patients/${patient.image}`;
        document.getElementById('patient-image').alt = `Patient ${patient.name}`;
    }
}

function useTool(tool) {
    const patient = gamePatients[currentPatient];
    const diagnosisText = document.getElementById('diagnosis-text');
    
    if (tool === patient.treatment) {
        const points = patient.isRare ? 10 : 5;
        doctorScore += points;
        patientsHelped++;
        
        diagnosisText.innerHTML = `✅ Great job! You used the ${tool} correctly!<br>Treatment: ${patient.cure}<br>+${points} points ${patient.isRare ? '(Rare Disease!)' : ''}`;
        diagnosisText.style.color = '#4caf50';
        document.getElementById('next-patient').style.display = 'block';
        
        checkLevelUp();
        updateDisplay();
    } else {
        diagnosisText.innerHTML = `❌ Try a different tool. The ${tool} didn't help this time.`;
        diagnosisText.style.color = '#f44336';
    }
}

function checkLevelUp() {
    for (let level = 5; level >= 1; level--) {
        if (patientsHelped >= rewards[level].requirement && doctorLevel < level) {
            doctorLevel = level;
            showLevelUpMessage();
            break;
        }
    }
}

function showLevelUpMessage() {
    const message = document.createElement('div');
    message.innerHTML = `🎉 Level Up! You're now a ${rewards[doctorLevel].title} ${rewards[doctorLevel].badge}`;
    message.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#4caf50;color:white;padding:20px;border-radius:10px;z-index:1000;font-size:18px;text-align:center';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

function nextPatient() {
    currentPatient++;
    
    if (currentPatient >= gamePatients.length) {
        document.getElementById('game-screen').innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>🎉 Congratulations!</h2>
                <p>You've helped all ${patientsHelped} patients!</p>
                <p>Final Score: ${doctorScore} points</p>
                <p>Final Rank: ${rewards[doctorLevel].title} ${rewards[doctorLevel].badge}</p>
                <button onclick="restartGame()">Play Again</button>
            </div>
        `;
        return;
    }
    
    document.getElementById('diagnosis-text').innerHTML = 'Use your tools to help the patient!';
    document.getElementById('diagnosis-text').style.color = '#333';
    document.getElementById('next-patient').style.display = 'none';
    updateDisplay();
}

function restartGame() {
    currentPatient = 0;
    patientsHelped = 0;
    doctorScore = 0;
    doctorLevel = 1;
    initializeGame();
    updateDisplay();
    document.getElementById('diagnosis-text').innerHTML = 'Use your tools to help the patient!';
    document.getElementById('next-patient').style.display = 'none';
}