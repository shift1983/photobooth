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

async function capturePhoto() {

    for (let i = 5; i >= 1; i--) {

        countdown.textContent = i;

        countdown.style.display = "block";

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );
    }

    countdown.style.display = "none";

    flash.style.opacity = "1";

    setTimeout(() => {

        flash.style.opacity = "0";

    }, 150);

    shutterSound.play();

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

    preview.src = imageData;

    preview.style.display = "block";
}

captureBtn.addEventListener(
    "click",
    capturePhoto
);

    const countdown =
    document.getElementById("countdown");

    const flash =
    document.getElementById("flash");

    const shutterSound =
    document.getElementById("shutterSound");
