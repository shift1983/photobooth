const settings = {

    theme: null,

    photoCount: 4,

    countdown: 3,

    flashEnabled: true,

    soundEnabled: true
};

const themes = {

    birthday: {

        title: "Geburtstag",

        defaultPhotoCount: 4
    },

    wedding: {

        title: "Hochzeit",

        defaultPhotoCount: 3
    },

    business: {

        title: "Firmenfeier",

        defaultPhotoCount: 4
    }
};

let capturedPhotos = [];

let currentPhotoIndex = 1;

let currentPhoto = null;

let wakeLock = null;

async function requestWakeLock() {

    try {

        if ("wakeLock" in navigator) {

            wakeLock =
                await navigator.wakeLock.request("screen");

            console.log("Wake Lock aktiv");
        }

    } catch (err) {

        console.error(err);
    }
}

async function enableFullscreen() {

    try {

        await document.documentElement.requestFullscreen();

    } catch (err) {

        console.error(err);
    }
}

document
    .getElementById("fullscreenBtn")
    .addEventListener("click", async () => {

        await enableFullscreen();

        await requestWakeLock();
    });

if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("service-worker.js")
        .then(() => {

            console.log("Service Worker aktiv");
        });
}

const cameraBtn =
    document.getElementById("cameraBtn");

const video =
    document.getElementById("video");

const captureBtn =
    document.getElementById("captureBtn");

const canvas =
    document.getElementById("photoCanvas");

const collageCanvas =
    document.getElementById("collageCanvas");

const collagePreview =
    document.getElementById("collagePreview");

const preview =
    document.getElementById("photoPreview");

const countdownOverlay =
    document.getElementById("countdownOverlay");

const flashOverlay =
    document.getElementById("flashOverlay");

const shutterSound =
    new Audio("sounds/shutter.mp3");

const photoActions =
    document.getElementById("photoActions");

const saveBtn =
    document.getElementById("saveBtn");

const retakeBtn =
    document.getElementById("retakeBtn");

const nextBtn =
    document.getElementById("nextBtn");

const eventTitle =
    document.getElementById("eventTitle");

const themeButtons =
    document.querySelectorAll(".themeBtn");

const photoCountInfo =
    document.getElementById("photoCountInfo");

const seriesProgress =
    document.getElementById("seriesProgress");

async function startCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "user"
                },

                audio: false
            });

        video.srcObject = stream;

    } catch (error) {

        alert(
            "Fehler: " +
            error.name +
            "\n" +
            error.message
        );

        console.error(error);
    }
}

cameraBtn.addEventListener(
    "click",
    startCamera
);

function flashEffect() {

    flashOverlay.style.opacity = "1";

    setTimeout(() => {

        flashOverlay.style.opacity = "0";

    }, 500);
}

async function capturePhoto() {

    countdownOverlay.style.display = "flex";

    for (let i = 3; i > 0; i--) {

    countdownOverlay.textContent = i;

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );
    }

countdownOverlay.style.display = "none";

flashOverlay.style.opacity = "1";

await new Promise(resolve =>
    setTimeout(resolve, 500)
);

flashOverlay.style.opacity = "0";

try {

    shutterSound.currentTime = 0;

    await shutterSound.play();

    } catch (err) {

    console.log("Ton konnte nicht abgespielt werden");
}
    
    const context =
        canvas.getContext("2d");

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;

    context.save();

    context.scale(-1, 1);

    context.drawImage(
        video,
        -canvas.width,
        0,
        canvas.width,
        canvas.height
);

context.restore();

    const imageData =
    canvas.toDataURL(
        "image/jpeg",
        0.95
);

    currentPhoto = imageData;

    preview.src = imageData;

    preview.style.display =
        "block";

    photoActions.style.display =
        "flex";

    captureBtn.disabled = true;
}

    captureBtn.addEventListener(
        "click",
    capturePhoto
);

retakeBtn.addEventListener(
    "click",
    async () => {

        retakeBtn.disabled = true;

        currentPhoto = null;

        preview.style.display =
            "none";

        photoActions.style.display =
            "none";

        captureBtn.disabled = false;

        await capturePhoto();

        retakeBtn.disabled = false;
    }
);

saveBtn.addEventListener(
    "click",
    () => {

        let imageToSave;

        if (
            collagePreview.style.display === "block" &&
            collagePreview.src
        ) {

            imageToSave =
                collagePreview.src;

        } else {

            imageToSave =
                preview.src;
        }

        if (!imageToSave) {

            return;
        }

        const link =
            document.createElement("a");

        link.href =
            imageToSave;

        link.download =
            "photobooth-" +
            Date.now() +
            ".jpg";

        link.click();
    }
);

nextBtn.addEventListener(
    "click",
    async () => {

        if (!currentPhoto) {

            return;
        }

        capturedPhotos.push(
            currentPhoto
        );

        currentPhoto = null;


      console.log(
            "currentPhotoIndex:",
            currentPhotoIndex,
            "photoCount:",
            settings.photoCount
    );

        
        if (
            currentPhotoIndex <
            settings.photoCount
        ) {

            currentPhotoIndex++;

            updateSeriesDisplay();

            preview.style.display =
                "none";

            photoActions.style.display =
                "none";

            captureBtn.disabled =
                false;

            await capturePhoto();

        } else {

    await generateCollage();

    preview.style.display =
        "none";

    photoActions.style.display =
        "flex";

    retakeBtn.style.display =
        "none";

    nextBtn.style.display =
        "none";

    saveBtn.style.display =
        "inline-block";

    saveBtn.textContent =
        "💾 Fotokarte speichern";
}
    }
);

function updateSeriesDisplay() {

    seriesProgress.textContent =
        "Foto " +
        currentPhotoIndex +
        " von " +
        settings.photoCount;
}

async function generateCollage() {

    const ctx =
        collageCanvas.getContext("2d");

    collageCanvas.width = 1200;
    collageCanvas.height = 800;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
    );

    ctx.fillStyle = "#000000";

    ctx.font =
        "bold 50px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        eventTitle.value,
        collageCanvas.width / 2,
        70
);

    const images = [];

    for (const photo of capturedPhotos) {

        const img = new Image();

        img.src = photo;

        await new Promise(resolve => {

            img.onload = resolve;
        });

        images.push(img);
    }

    const positions = [

        { x: 20,  y: 110, w: 560, h: 300 },
        { x: 620, y: 110, w: 560, h: 300 },
    
        { x: 20,  y: 450, w: 560, h: 300 },
        { x: 620, y: 450, w: 560, h: 300 }
    ];

    images.forEach((img, index) => {

        if (positions[index]) {

            const p =
                positions[index];

    const imageRatio =
        img.width / img.height;

    const frameRatio =
        p.w / p.h;

    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;

    if (imageRatio > frameRatio) {

        drawHeight = p.h;
        drawWidth =
            p.h * imageRatio;

        offsetX =
            (drawWidth - p.w) / 2;

        offsetY = 0;

    } else {

        drawWidth = p.w;
        drawHeight =
            p.w / imageRatio;

        offsetX = 0;

        offsetY =
            (drawHeight - p.h) / 2;
    }

    ctx.save();

    ctx.beginPath();

    ctx.rect(
        p.x,
        p.y,
        p.w,
        p.h
    );

    ctx.clip();

    ctx.drawImage(
        img,
        p.x - offsetX,
        p.y - offsetY,
        drawWidth,
        drawHeight
    );

    ctx.restore();
            }
        });

        const today =
        new Date();

        const dateString =
            today.toLocaleDateString(
            "de-DE"
        );

        ctx.font =
            "32px Arial";

        ctx.fillStyle =
            "#000000";

        ctx.textAlign =
            "center";

        ctx.fillText(
            dateString,
            collageCanvas.width / 2,
            790
        );
    
        collagePreview.src =
            collageCanvas.toDataURL(
                "image/jpeg",
                0.95
            );

        collagePreview.style.display =
            "block";

        document.getElementById(
        "cameraContainer"
        ).style.display = "none";
    
    }

themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const selectedTheme =
                button.dataset.theme;

            settings.theme =
                selectedTheme;

            settings.photoCount =
                themes[selectedTheme]
                    .defaultPhotoCount;

            capturedPhotos = [];

            currentPhotoIndex = 1;

            currentPhoto = null;

            updateSeriesDisplay();

            photoCountInfo.textContent =
                "Fotos pro Serie: " +
                settings.photoCount;

            eventTitle.value =
                themes[selectedTheme]
                    .title;

            document.body.className =
                selectedTheme;

            preview.style.display =
                "none";

            photoActions.style.display =
                "none";

            captureBtn.disabled =
                false;

            retakeBtn.style.display =
                "inline-block";

            nextBtn.style.display =
                "inline-block";

            saveBtn.style.display =
                "inline-block";

            saveBtn.textContent =
                "💾 Speichern";

            collagePreview.style.display =
                "none";

            document.getElementById(
                "cameraContainer"
                ).style.display = "block";

            captureBtn.style.display =
                "inline-block";

            document.getElementById(
            "cameraContainer"
            ).style.display = "block";

            captureBtn.style.display =
            "inline-block";

            collagePreview.style.display =
            "none";
            
        }
    );
});
