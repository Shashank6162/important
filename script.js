/* =========================================
   🧠 CONFIGURATION
   ========================================= */
const CONFIG = {
    name: "Duggu",

    stickers: {
        start: "assets/stickers/excited.gif",
        buildUp: "assets/stickers/thinking.gif",
        question: "assets/stickers/question.gif",
        no: [
            "assets/stickers/no_1.gif",
            "assets/stickers/no_2.gif",
            "assets/stickers/no_3.gif",
            "assets/stickers/no_4.gif",
            "assets/stickers/no_5.gif",
            "assets/stickers/no_6.gif"
        ],
        finalYes: "assets/stickers/last_yes.gif", 
        kissing: "assets/stickers/kissing.gif"
    },

    texts: {
        start: "I made this for you, ",
        buildUp: "So I wanted to ask you something...",
        question: "Anukriti, will you be my Valentine?",
        startBtn: "Click here to start",
        sayNowBtn: "Say now 🫢",
        yesBtn: "YES ❤️", 
        noSequence: [
            "Are you sure? 🥺",
            "Please don't do this 💔",
            "I'm going to cry 😢",
            "See I'm crying 😭",
            "Please say YES 🥹",
            "My heart is breaking 💖"
        ],
        takeoverText: "Just say YES baby 💖",
        flowerHint: "Click anywhere to get flowers 🌸",
        curtainText: "Click to reveal 💖"
    },

    photos: [
        "assets/photos/img1.jpg",
        "assets/photos/img2.jpg",
        "assets/photos/img3.jpg",
        "assets/photos/img4.jpg",
        "assets/photos/img5.jpg",
        "assets/photos/img6.jpg"
    ]
};

/* =========================================
   CORE LOGIC
   ========================================= */
let step = 0; 
let noCount = 0;
const MAX_NO_CLICKS = 6; 

const stickerImg = document.getElementById('sticker-img');
const stickerWrapper = document.querySelector('.sticker-wrapper');
const mainText = document.getElementById('main-text');
const primaryBtn = document.getElementById('primary-btn');
const f11Hint = document.getElementById('f11-hint');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const choiceButtons = document.getElementById('choice-buttons');
const bgGradient = document.getElementById('gradient-bg');
const roseContainer = document.getElementById('rose-container');
const resetFlowersBtn = document.getElementById('reset-flowers');
const photoGrid = document.getElementById('photo-grid');
const countdownEl = document.getElementById('countdown');

const music1 = document.getElementById('bg-music-1');
const music2 = document.getElementById('bg-music-2');

function init() {
    mainText.innerText = CONFIG.texts.start + CONFIG.name + " ❤️";
    stickerImg.src = CONFIG.stickers.start;
    primaryBtn.innerText = CONFIG.texts.startBtn;
    f11Hint.classList.remove('hidden');
    createFloatingHearts();
}

primaryBtn.addEventListener('click', () => {
    music1.volume = 0.5;
    music1.play().catch(e => console.log("Audio requires interaction"));
    f11Hint.classList.add('hidden');
    if (step === 0) startCountdown();
    else if (step === 1) loadQuestionPage();
});

function startCountdown() {
    step = 1; 
    primaryBtn.classList.add('hidden'); 
    countdownEl.classList.remove('hidden'); 
    let count = 5;
    countdownEl.innerText = count;
    const timer = setInterval(() => {
        count--;
        if (count > 0) countdownEl.innerText = count;
        else {
            clearInterval(timer);
            countdownEl.classList.add('hidden');
            loadBuildUpPage();
        }
    }, 1000);
}

function loadBuildUpPage() {
    bgGradient.classList.add('bg-warm');
    stickerImg.src = CONFIG.stickers.buildUp;
    mainText.innerText = CONFIG.texts.buildUp;
    primaryBtn.innerText = CONFIG.texts.sayNowBtn;
    primaryBtn.classList.remove('hidden');
}

function loadQuestionPage() {
    step = 2;
    bgGradient.classList.remove('bg-warm');
    bgGradient.classList.add('bg-romantic');
    stickerImg.src = CONFIG.stickers.question;
    mainText.innerText = CONFIG.texts.question;
    mainText.style.marginTop = "100px";
    primaryBtn.classList.add('hidden');
    choiceButtons.classList.remove('hidden');
    yesBtn.innerText = CONFIG.texts.yesBtn;
    noBtn.innerText = "No"; 
}

/* =========================================
   YES / NO LOGIC
   ========================================= */
noBtn.addEventListener('click', () => {
    if (noCount < MAX_NO_CLICKS) {
        stickerImg.src = CONFIG.stickers.no[noCount];
        noBtn.innerText = "No (" + CONFIG.texts.noSequence[noCount] + ")";
        const randomX = (Math.random() - 0.5) * 200; 
        const randomY = (Math.random() - 0.5) * 100; 
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        const scale = 1 + ((noCount + 1) * 0.2); 
        yesBtn.style.transform = `scale(${scale})`;
        noCount++;
    } else {
        activateTakeover();
    }
});

function activateTakeover() {
    noBtn.classList.add('hidden');
    const rect = yesBtn.getBoundingClientRect();
    yesBtn.style.position = 'fixed';
    yesBtn.style.left = rect.left + 'px';
    yesBtn.style.top = rect.top + 'px';
    yesBtn.style.width = rect.width + 'px';
    yesBtn.style.height = rect.height + 'px';
    yesBtn.style.zIndex = '100';
    yesBtn.style.transform = 'none'; 
    void yesBtn.offsetWidth; 
    yesBtn.style.transition = 'all 1s ease-in-out';
    yesBtn.style.top = '0';
    yesBtn.style.left = '0';
    yesBtn.style.width = '100vw';
    yesBtn.style.height = '100vh';
    yesBtn.style.borderRadius = '0';
    yesBtn.style.backgroundColor = '#ff0050'; 
    yesBtn.style.backgroundImage = 'linear-gradient(135deg, #ff0050 0%, #ff4b8b 100%)';
    yesBtn.style.display = 'flex';
    yesBtn.style.alignItems = 'flex-end'; 
    yesBtn.style.justifyContent = 'center';
    yesBtn.style.paddingBottom = '25vh';
    yesBtn.style.fontSize = '4rem'; 
    yesBtn.style.boxShadow = 'none';
    yesBtn.innerText = CONFIG.texts.takeoverText; 
    stickerWrapper.style.position = 'fixed';
    stickerWrapper.style.top = '35%'; 
    stickerWrapper.style.left = '50%';
    stickerWrapper.style.transform = 'translate(-50%, -50%)';
    stickerWrapper.style.zIndex = '102'; 
    stickerImg.src = CONFIG.stickers.finalYes;
    createSparkles();
}

yesBtn.addEventListener('click', () => {
    loadSuccessPage();
});

function loadSuccessPage() {
    step = 3;
    music1.pause();
    music2.volume = 0.6;
    music2.play().catch(e => console.log("Music error"));
    choiceButtons.classList.add('hidden'); 
    yesBtn.style.display = 'none'; 
    stickerWrapper.style.position = 'relative';
    stickerWrapper.style.top = 'auto';
    stickerWrapper.style.left = 'auto';
    stickerWrapper.style.transform = 'none';
    bgGradient.classList.add('bg-dark-love');
    
    stickerImg.src = CONFIG.stickers.kissing;
    
    // UPDATED TEXT
    mainText.innerText = "YAY! baby, I like you a lot! ❤️";
    mainText.style.fontSize = "3rem";
    mainText.style.color = "#ffffff"; 
    mainText.style.whiteSpace = "nowrap";
    mainText.style.marginTop = "-20px";

    initPhotoGrid();
    roseContainer.classList.add('active');
    resetFlowersBtn.classList.remove('hidden');
    
    const hint = document.createElement('p');
    hint.innerText = CONFIG.texts.flowerHint;
    hint.style.fontSize = "1.2rem";
    hint.style.marginTop = "15px";
    hint.style.color = "white"; 
    hint.style.position = 'relative';
    hint.style.zIndex = '105';
    document.querySelector('.text-wrapper').appendChild(hint);

    // CONTINUOUS FIREWORKS
    startContinuousFireworks();
}

function initPhotoGrid() {
    photoGrid.classList.remove('hidden');
    CONFIG.photos.forEach((src) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        const img = document.createElement('img');
        img.src = src; img.className = 'photo-img';
        const curtain = document.createElement('div');
        curtain.className = 'photo-curtain';
        curtain.innerText = CONFIG.texts.curtainText;
        item.onclick = (e) => { e.stopPropagation(); item.classList.add('revealed'); };
        item.appendChild(img); item.appendChild(curtain);
        photoGrid.appendChild(item);
    });
}

roseContainer.addEventListener('click', (e) => {
    if (!roseContainer.classList.contains('active')) return;
    if (e.target !== roseContainer) return;
    const rect = roseContainer.getBoundingClientRect();
    createFlower(e.clientX - rect.left, e.clientY - rect.top);
});

function createFlower(x, y) {
    const stem = document.createElement('div');
    stem.className = 'rose-stem';
    stem.style.left = x + 'px';
    stem.style.height = '0px'; 
    roseContainer.appendChild(stem);
    setTimeout(() => { stem.style.height = (roseContainer.offsetHeight - y) + 'px'; }, 50);

    setTimeout(() => {
        const bloom = document.createElement('div');
        bloom.className = 'rose-bloom';
        bloom.style.left = x + 'px';
        bloom.style.top = y + 'px';
        
        for(let i=0; i<5; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const rotation = i * 72;
            petal.style.transform = `rotate(${rotation}deg) translateY(-12px)`;
            bloom.appendChild(petal);
        }
        
        const center = document.createElement('div');
        center.style.position = 'absolute';
        center.style.width = '10px'; center.style.height = '10px';
        center.style.background = '#ffd700'; center.style.borderRadius = '50%';
        center.style.transform = 'translate(-50%, -50%)';
        center.style.zIndex = '10';
        bloom.appendChild(center);

        roseContainer.appendChild(bloom);
        
        const randomRot = Math.random() * 90 - 45;
        setTimeout(() => {
             bloom.style.transform = `translate(-50%, -50%) scale(1) rotate(${randomRot}deg)`;
        }, 50);

    }, 1000); 
}

resetFlowersBtn.addEventListener('click', (e) => {
    e.stopPropagation(); roseContainer.innerHTML = '';
});

function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerText = "❤️";
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; 
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

function createSparkles() {
    const body = document.body;
    for(let i=0; i<50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        body.appendChild(sparkle);
    }
}

function startContinuousFireworks() {
    setInterval(() => {
        createFirework();
    }, 800); 
}

function createFirework() {
    const firework = document.createElement('div');
    firework.style.position = 'fixed';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 60 + 'vh';
    firework.style.width = '8px'; firework.style.height = '8px';
    firework.style.borderRadius = '50%';
    
    // Colorful crackers
    const colors = ['#ff0040', '#ffeb3b', '#2ecc71', '#3498db', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    firework.style.backgroundColor = color;
    firework.style.boxShadow = `0 0 20px 10px ${color}`;
    firework.style.opacity = '0'; 
    firework.style.transition = 'opacity 1s, transform 1s';
    
    document.body.appendChild(firework);
    
    setTimeout(() => {
        firework.style.opacity = '1';
        firework.style.transform = 'scale(3)'; 
    }, 50);
    
    setTimeout(() => firework.remove(), 1000);
}

init();