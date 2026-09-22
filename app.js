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

    }, 120);
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

    flashEffect();

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

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

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
    () => {

        currentPhoto = null;

        preview.style.display =
            "none";

        photoActions.style.display =
            "none";

        captureBtn.disabled = false;
    }
);

saveBtn.addEventListener(
    "click",
    () => {

        const link =
            document.createElement("a");

        link.href =
            preview.src;

        link.download =
            "photobooth-" +
            Date.now() +
            ".jpg";

        link.click();
    }
);

nextBtn.addEventListener(
    "click",
    () => {

        if (!currentPhoto) {

            return;
        }

        capturedPhotos.push(
            currentPhoto
        );

        currentPhoto = null;

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

        } else {

            alert(
                "Fotoserie abgeschlossen!"
            );

            console.log(
                capturedPhotos
            );
        }
    }
);

function updateSeriesDisplay() {

    const seriesProgress =
        document.getElementById(
            "seriesProgress"
        );

    seriesProgress.textContent =
        "Foto " +
        currentPhotoIndex +
        " von " +
        settings.photoCount;
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
        }
    );
});
