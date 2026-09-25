const settings = {

    theme: null,
    photoCount: 4,
    cardDesign: "birthdayConfetti",
    countdown: 3,
    flashEnabled: true,
    soundEnabled: true,
    eventTitle: "Photobooth",
};

const themes = {

    birthday: {
        title: "Geburtstag",
        defaultPhotoCount: 3
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

const cardDesigns = {

    birthdayConfetti: {
        name: "Konfetti",
        theme: "birthday",
        photoCounts: [2, 3, 4],

        backgroundColor: "#fff7e8",
        textColor: "#6b3200",
        frameColor: "#ffffff",
        frameBorderColor: "#f4c98b",

        accentColors: [
            "#ff8a65",
            "#ffd54f",
            "#7e57c2",
            "#4db6ac",
            "#ff6b6b",
            "#4dabf7",
            "#a9e34b",
            "#f783ac"
        ],

        dateBgColor: "rgba(255,255,255,0.85)",
        dateTextColor: "#6b3200",

        titleFont:
            "bold 52px 'Comic Sans MS', 'Marker Felt', cursive"
    },

    birthdayParty: {
        name: "Party",
        theme: "birthday",
        photoCounts: [2, 3, 4],

        backgroundColor: "#34124d",
        textColor: "#ffffff",

        frameColor: "#ffffff",
        frameBorderColor: "#ff98d0",

        accentColors: [
            "#ff4fa3",
            "#ffd84d",
            "#59d8ff",
            "#7df58a",
            "#b388ff",
            "#ff7b54",
            "#00e5ff",
            "#ff80ab"
        ],

        dateBgColor: "rgba(255,255,255,0.9)",
        dateTextColor: "#34124d",

        titleBgColor: "rgba(35, 10, 55, 0.78)",

        titleFont:
            "bold 50px 'Comic Sans MS', 'Marker Felt', cursive"
    },

    weddingElegant: {
        name: "Elegant",
        theme: "wedding",
        photoCounts: [2, 3, 4],

        backgroundColor: "#f8f4f1",
        textColor: "#6b5964",

        frameColor: "#ffffff",
        frameBorderColor: "#d8c6d3",

        accentColors: [
            "#d8b4c6",
            "#ead7df",
            "#c9b6cf",
            "#f1e6df",
            "#b8c8bd",
            "#e7d6c9"
        ],

        dateBgColor: "rgba(255,255,255,0.88)",
        dateTextColor: "#6b5964",

        titleBgColor: "rgba(255,255,255,0.72)",

        titleFont:
            "italic 52px Georgia, 'Times New Roman', serif"
    },

    weddingFloral: {
        name: "Blüten",
        theme: "wedding",
        photoCounts: [2, 3, 4],

        backgroundColor: "#fffaf7",
        textColor: "#745a63",

        frameColor: "#ffffff",
        frameBorderColor: "#d9b6bd",

        accentColors: [
            "#d9a6b0",
            "#e8c7c5",
            "#c8b7a6",
            "#b8c8b0",
            "#efd9c8",
            "#cfae78"
        ],

        dateBgColor: "rgba(255,255,255,0.72)",
        dateTextColor: "#7a646c",

        titleBgColor: "rgba(255,252,249,0.72)",

        titleFont:
            "italic 52px Georgia, 'Times New Roman', serif"
    },
    
    businessClean: {
        name: "Clean",
        theme: "business",
        photoCounts: [2, 3, 4],

        backgroundColor: "#172331",
        textColor: "#ffffff",

        frameColor: "#ffffff",
        frameBorderColor: "#86a5bd",

        accentColors: [
            "#4f88b5",
            "#79a6c7",
            "#8dc6c3",
            "#a8bdd0",
            "#d4e2ec",
            "#5f7f99"
        ],

        dateBgColor: "rgba(255,255,255,0.92)",
        dateTextColor: "#172331",

        titleBgColor: "rgba(11,25,39,0.82)",

        titleFont:
            "bold 46px Arial, sans-serif"
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
                await navigator.wakeLock.request(
                    "screen"
                );

            console.log(
                "Wake Lock aktiv"
            );
        }

    } catch (err) {

        console.error(err);
    }
}


async function enableFullscreen() {

    try {

        await document.documentElement
            .requestFullscreen();

    } catch (err) {

        console.error(err);
    }
}


if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register(
            "service-worker.js"
        )
        .then(() => {

            console.log(
                "Service Worker aktiv"
            );
        });
}


/* =========================
   DOM-ELEMENTE
========================= */

const startScreen =
    document.getElementById(
        "startScreen"
    );

const boothScreen =
    document.getElementById(
        "boothScreen"
    );

const startLogo =
    document.getElementById(
        "startLogo"
    );

const startBoothBtn =
    document.getElementById(
        "startBoothBtn"
    );

const video =
    document.getElementById(
        "video"
    );

const captureBtn =
    document.getElementById(
        "captureBtn"
    );

const canvas =
    document.getElementById(
        "photoCanvas"
    );

const collageCanvas =
    document.getElementById(
        "collageCanvas"
    );

const collagePreview =
    document.getElementById(
        "collagePreview"
    );

const preview =
    document.getElementById(
        "photoPreview"
    );

const countdownOverlay =
    document.getElementById(
        "countdownOverlay"
    );

const flashOverlay =
    document.getElementById(
        "flashOverlay"
    );

const shutterSound =
    new Audio(
        "sounds/shutter.mp3"
    );

const photoActions =
    document.getElementById(
        "photoActions"
    );

const saveBtn =
    document.getElementById(
        "saveBtn"
    );

const retakeBtn =
    document.getElementById(
        "retakeBtn"
    );

const nextBtn =
    document.getElementById(
        "nextBtn"
    );

const newSeriesBtn =
    document.getElementById(
        "newSeriesBtn"
    );

const eventTitleDisplay =
    document.getElementById(
        "eventTitleDisplay"
    );

const eventTitleInput =
    document.getElementById(
        "eventTitleInput"
    );

const themeButtons =
    document.querySelectorAll(
        ".themeBtn"
    );

const designButtons =
    document.querySelectorAll(
        ".designBtn"
    );

const photoCountButtons =
    document.querySelectorAll(
        ".photoCountBtn"
    );

const photoCountInfo =
    document.getElementById(
        "photoCountInfo"
    );

const seriesProgress =
    document.getElementById(
        "seriesProgress"
    );

const appLogo =
    document.getElementById(
        "appLogo"
    );

const adminOverlay =
    document.getElementById(
        "adminOverlay"
    );

const closeAdminBtn =
    document.getElementById(
        "closeAdminBtn"
    );

const pinOverlay =
    document.getElementById(
        "pinOverlay"
    );

const adminPinInput =
    document.getElementById(
        "adminPinInput"
    );

const pinError =
    document.getElementById(
        "pinError"
    );

const pinCancelBtn =
    document.getElementById(
        "pinCancelBtn"
    );

const pinOkBtn =
    document.getElementById(
        "pinOkBtn"
    );

const countdownSelect =
    document.getElementById(
        "countdownSelect"
    );

const flashEnabledCheckbox =
    document.getElementById(
        "flashEnabled"
    );

const soundEnabledCheckbox =
    document.getElementById(
        "soundEnabled"
    );

const captureArea =
    document.getElementById(
        "captureArea"
    );

const resultArea =
    document.getElementById(
        "resultArea"
    );

const restoreFullscreenBtn =
    document.getElementById(
        "restoreFullscreenBtn"
    );

const printBtn =
    document.getElementById(
        "printBtn"
    );

const restartCameraBtn =
    document.getElementById(
        "restartCameraBtn"
    );

const resetBoothBtn =
    document.getElementById(
        "resetBoothBtn"
    );

const guestPhotoCountSelection =
    document.getElementById(
        "guestPhotoCountSelection"
    );

const guestPhotoCountButtons =
    document.querySelectorAll(
        ".guestPhotoCountBtn"
    );


/* =========================
   ADMIN
========================= */

let adminPressTimer = null;


function startAdminPress() {

    adminPressTimer =
        setTimeout(() => {

            requestAdminAccess();

        }, 5000);
}


function cancelAdminPress() {

    if (adminPressTimer) {

        clearTimeout(
            adminPressTimer
        );

        adminPressTimer = null;
    }
}


function requestAdminAccess() {

    adminPinInput.value = "";

    pinError.style.display =
        "none";

    pinOverlay.style.display =
        "flex";

    adminPinInput.focus();
}


/* =========================
   DESIGN-AUSWAHL
========================= */

function updateDesignSelection() {

    const compatibleDesigns =
        Object.entries(
            cardDesigns
        ).filter(
            ([designName, design]) => {

                return (
                    design.theme ===
                        settings.theme &&
                    design.photoCounts
                        .includes(
                            settings.photoCount
                        )
                );
            }
        );

    const currentDesign =
        cardDesigns[
            settings.cardDesign
        ];

    const currentIsCompatible =
        currentDesign &&
        currentDesign.theme ===
            settings.theme &&
        currentDesign.photoCounts
            .includes(
                settings.photoCount
            );

    if (!currentIsCompatible) {

        settings.cardDesign =
            compatibleDesigns.length > 0
                ? compatibleDesigns[0][0]
                : null;
    }

    designButtons.forEach(
        button => {

            const designName =
                button.dataset.design;

            const design =
                cardDesigns[
                    designName
                ];

            const isCompatible =
                design &&
                design.theme ===
                    settings.theme &&
                design.photoCounts
                    .includes(
                        settings.photoCount
                    );

            button.style.display =
                isCompatible
                    ? "inline-block"
                    : "none";
        }
    );

    updateActiveDesignButton();
}


function updateActiveDesignButton() {

    designButtons.forEach(
        button => {

            if (
                button.dataset.design ===
                settings.cardDesign
            ) {

                button.classList.add(
                    "active"
                );

            } else {

                button.classList.remove(
                    "active"
                );
            }
        }
    );
}


function updateActivePhotoCountButton() {

    photoCountButtons.forEach(
        button => {

            const count =
                Number(
                    button.dataset.count
                );

            if (
                count ===
                settings.photoCount
            ) {

                button.classList.add(
                    "active"
                );

            } else {

                button.classList.remove(
                    "active"
                );
            }
        }
    );
}


function updateActiveThemeButton() {

    themeButtons.forEach(
        button => {

            if (
                button.dataset.theme ===
                settings.theme
            ) {

                button.classList.add(
                    "active"
                );

            } else {

                button.classList.remove(
                    "active"
                );
            }
        }
    );
}


function updateGuestPhotoCountButtons() {

    guestPhotoCountButtons.forEach(
        button => {

            const count =
                Number(
                    button.dataset.count
                );

            if (
                count ===
                settings.photoCount
            ) {

                button.classList.add(
                    "active"
                );

            } else {

                button.classList.remove(
                    "active"
                );
            }
        }
    );
}


/* =========================
   EINSTELLUNGEN SPEICHERN
========================= */

function saveSettings() {

    const savedSettings = {

        theme:
            settings.theme,

        photoCount:
            settings.photoCount,

        cardDesign:
            settings.cardDesign,

        countdown:
            settings.countdown,

        flashEnabled:
            settings.flashEnabled,

        soundEnabled:
            settings.soundEnabled,

        eventTitle:
            settings.eventTitle
    };

    localStorage.setItem(
        "photoboothSettings",
        JSON.stringify(
            savedSettings
        )
    );

    console.log(
        "Einstellungen gespeichert",
        savedSettings
    );
}


function loadSettings() {

    const storedSettings =
        localStorage.getItem(
            "photoboothSettings"
        );

    if (!storedSettings) {
        return;
    }

    try {

        const savedSettings =
            JSON.parse(
                storedSettings
            );

        if (
            savedSettings.theme &&
            themes[
                savedSettings.theme
            ]
        ) {

            settings.theme =
                savedSettings.theme;
        }


        if (
            [2, 3, 4].includes(
                savedSettings.photoCount
            )
        ) {

            settings.photoCount =
                savedSettings.photoCount;
        }


        if (
            savedSettings.cardDesign &&
            cardDesigns[
                savedSettings.cardDesign
            ]
        ) {

            settings.cardDesign =
                savedSettings.cardDesign;
        }


        if (
            savedSettings.countdown === 3 ||
            savedSettings.countdown === 5 ||
            savedSettings.countdown === 10
        ) {

            settings.countdown =
                savedSettings.countdown;
        }


        if (
            typeof savedSettings
                .flashEnabled ===
            "boolean"
        ) {

            settings.flashEnabled =
                savedSettings.flashEnabled;
        }


        if (
            typeof savedSettings
                .soundEnabled ===
            "boolean"
        ) {

            settings.soundEnabled =
                savedSettings.soundEnabled;
        }


        if (
            typeof savedSettings
                .eventTitle ===
                "string" &&
            savedSettings
                .eventTitle
                .trim() !== ""
        ) {

            settings.eventTitle =
                savedSettings.eventTitle;
        }

    } catch (error) {

        console.error(
            "Gespeicherte Einstellungen konnten nicht geladen werden.",
            error
        );
    }
}


/* =========================
   ADMIN FOTOANZAHL
========================= */

photoCountButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const newPhotoCount =
                    Number(
                        button.dataset.count
                    );

                if (
                    ![2, 3, 4]
                        .includes(
                            newPhotoCount
                        )
                ) {
                    return;
                }

                settings.photoCount =
                    newPhotoCount;

                capturedPhotos = [];
                currentPhoto = null;
                currentPhotoIndex = 1;

                photoCountInfo
                    .textContent =
                    "Fotos pro Serie: " +
                    settings.photoCount;

                updateSeriesDisplay();

                updateActivePhotoCountButton();

                updateGuestPhotoCountButtons();

                updateDesignSelection();

                preview.style.display =
                    "none";

                collagePreview
                    .style.display =
                    "none";

                document
                    .getElementById(
                        "cameraContainer"
                    )
                    .style.display =
                    "flex";

                video.style.display =
                    "block";

                captureArea.style.display =
                    "flex";

                resultArea.style.display =
                    "none";

                captureBtn.style.display =
                    "inline-block";

                captureBtn.disabled =
                    false;

                photoActions.style.display =
                    "none";

                retakeBtn.style.display =
                    "none";

                nextBtn.style.display =
                    "none";

                saveBtn.style.display =
                    "none";

                printBtn.style.display =
                    "none";

                newSeriesBtn.style.display =
                    "none";
            }
        );
    }
);


/* =========================
   KAMERA
========================= */

async function startCamera() {

    try {

        const stream =
            await navigator
                .mediaDevices
                .getUserMedia({

                    video: {
                        facingMode:
                            "user"
                    },

                    audio: false
                });

        video.srcObject =
            stream;

        video.style.display =
            "block";

        document
            .getElementById(
                "cameraContainer"
            )
            .style.display =
            "flex";

    } catch (error) {

        alert(
            "Fehler: " +
            error.name +
            "\n" +
            error.message
        );

        console.error(
            error
        );
    }
}


startBoothBtn.addEventListener(
    "click",
    async () => {

        await enableFullscreen();

        await requestWakeLock();

        await startCamera();


        startScreen.style.display =
            "none";


        boothScreen.style.display =
            "block";


        video.style.display =
            "block";


        captureArea.style.display =
            "flex";


        captureBtn.style.display =
            "inline-block";


        guestPhotoCountSelection
            .style.display =
            "flex";


        eventTitleDisplay
            .style.display =
            "block";


        seriesProgress
            .style.display =
            "block";
    }
);


/* =========================
   FOTO AUFNEHMEN
========================= */

async function capturePhoto() {

    guestPhotoCountSelection
        .style.display =
        "none";

    countdownOverlay
        .style.display =
        "flex";

    for (
        let i =
            settings.countdown;
        i > 0;
        i--
    ) {

        countdownOverlay
            .textContent =
            i;

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1000
                )
        );
    }

    countdownOverlay
        .style.display =
        "none";


    if (
        settings.flashEnabled
    ) {

        flashOverlay
            .style.opacity =
            "1";

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    500
                )
        );

        flashOverlay
            .style.opacity =
            "0";
    }


    if (
        settings.soundEnabled
    ) {

        shutterSound.currentTime =
            0;

        shutterSound
            .play()
            .catch(
                error => {

                    console.log(
                        "Auslöseton konnte nicht abgespielt werden.",
                        error
                    );
                }
            );
    }


    const context =
        canvas.getContext(
            "2d"
        );

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;

    context.save();

    context.scale(
        -1,
        1
    );

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

    currentPhoto =
        imageData;

    preview.src =
        imageData;

    video.style.display =
        "none";

    preview.style.display =
        "block";

    captureBtn.style.display =
        "none";

    retakeBtn.style.display =
        "inline-block";

    nextBtn.style.display =
        "inline-block";
}


captureBtn.addEventListener(
    "click",
    capturePhoto
);


/* =========================
   KAMERA NEUSTART
========================= */

restartCameraBtn.addEventListener(
    "click",
    async () => {

        await restartCamera();
    }
);


resetBoothBtn.addEventListener(
    "click",
    () => {

        resetPhotoBooth();
    }
);


/* =========================
   NOCHMAL
========================= */

retakeBtn.addEventListener(
    "click",
    async () => {

        retakeBtn.disabled =
            true;

        currentPhoto =
            null;

        preview.style.display =
            "none";

        video.style.display =
            "block";

        retakeBtn.style.display =
            "none";

        nextBtn.style.display =
            "none";

        captureBtn.style.display =
            "inline-block";

        captureBtn.disabled =
            false;

        await capturePhoto();

        retakeBtn.disabled =
            false;
    }
);


/* =========================
   SPEICHERN
========================= */

saveBtn.addEventListener(
    "click",
    () => {

        if (!collageCanvas) {
            return;
        }

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );

        const hours =
            String(
                now.getHours()
            ).padStart(
                2,
                "0"
            );

        const minutes =
            String(
                now.getMinutes()
            ).padStart(
                2,
                "0"
            );

        const fileName =
            `Photobooth_${year}-${month}-${day}_${hours}-${minutes}.jpg`;

        const imageToSave =
            collageCanvas.toDataURL(
                "image/jpeg",
                0.95
            );

        const link =
            document.createElement(
                "a"
            );

        link.href =
            imageToSave;

        link.download =
            fileName;

        document.body
            .appendChild(
                link
            );

        link.click();

        document.body
            .removeChild(
                link
            );
    }
);


/* =========================
   FULLSCREEN
========================= */

restoreFullscreenBtn
    .addEventListener(
        "click",
        async () => {

            await enableFullscreen();

            await requestWakeLock();
        }
    );


/* =========================
   DRUCKEN
========================= */

printBtn.addEventListener(
    "click",
    () => {

        window.print();
    }
);

/* =========================
   WEITER / NÄCHSTES FOTO
========================= */

nextBtn.addEventListener(
    "click",
    async () => {

        if (!currentPhoto) {
            return;
        }

        capturedPhotos.push(
            currentPhoto
        );

        currentPhoto =
            null;

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

            video.style.display =
                "block";

            retakeBtn.style.display =
                "none";

            nextBtn.style.display =
                "none";

            captureBtn.style.display =
                "inline-block";

            captureBtn.disabled =
                false;

            await capturePhoto();

        } else {

            await generateCollage();

            preview.style.display =
                "none";

            captureArea.style.display =
                "none";

            eventTitleDisplay
                .style.display =
                "none";

            seriesProgress
                .style.display =
                "none";

            resultArea.style.display =
                "flex";

            photoActions.style.display =
                "flex";

            saveBtn.style.display =
                "inline-block";

            printBtn.style.display =
                "inline-block";

            newSeriesBtn.style.display =
                "inline-block";
        }
    }
);


/* =========================
   GAST FOTOANZAHL
========================= */

guestPhotoCountButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const newPhotoCount =
                    Number(
                        button.dataset.count
                    );

                if (
                    ![2, 3, 4]
                        .includes(
                            newPhotoCount
                        )
                ) {
                    return;
                }

                settings.photoCount =
                    newPhotoCount;

                capturedPhotos = [];
                currentPhoto = null;
                currentPhotoIndex = 1;

                updateSeriesDisplay();

                updateGuestPhotoCountButtons();

                updateActivePhotoCountButton();

                updateDesignSelection();

                photoCountInfo
                    .textContent =
                    "Fotos pro Serie: " +
                    settings.photoCount;
            }
        );
    }
);


/* =========================
   KAMERA NEUSTARTEN
========================= */

async function restartCamera() {

    try {

        if (
            video.srcObject
        ) {

            const tracks =
                video.srcObject
                    .getTracks();

            tracks.forEach(
                track =>
                    track.stop()
            );

            video.srcObject =
                null;
        }

        await startCamera();

    } catch (error) {

        console.error(
            "Kamera konnte nicht neu gestartet werden:",
            error
        );

        alert(
            "Die Kamera konnte nicht neu gestartet werden."
        );
    }
}


/* =========================
   FORTSCHRITT
========================= */

function updateSeriesDisplay() {

    seriesProgress.textContent =
        "Foto " +
        currentPhotoIndex +
        " von " +
        settings.photoCount;
}


/* =========================
   ROUNDED RECT
========================= */

function drawRoundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {

    ctx.beginPath();

    ctx.moveTo(
        x + radius,
        y
    );

    ctx.lineTo(
        x + width - radius,
        y
    );

    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );

    ctx.lineTo(
        x + width,
        y + height - radius
    );

    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );

    ctx.lineTo(
        x + radius,
        y + height
    );

    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );

    ctx.lineTo(
        x,
        y + radius
    );

    ctx.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );

    ctx.closePath();
}


function fillRoundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius,
    color
) {

    ctx.save();

    drawRoundedRect(
        ctx,
        x,
        y,
        width,
        height,
        radius
    );

    ctx.fillStyle =
        color;

    ctx.fill();

    ctx.restore();
}


function strokeRoundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius,
    color,
    lineWidth = 4
) {

    ctx.save();

    drawRoundedRect(
        ctx,
        x,
        y,
        width,
        height,
        radius
    );

    ctx.strokeStyle =
        color;

    ctx.lineWidth =
        lineWidth;

    ctx.stroke();

    ctx.restore();
}


/* =========================
   KONFETTI DESIGN
========================= */

function drawConfettiDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {

    const confettiColors =
        design.accentColors;


    for (
        let i = 0;
        i < 160;
        i++
    ) {

        const x =
            Math.random() *
            canvasWidth;

        const y =
            Math.random() *
            canvasHeight;

        const size =
            6 +
            Math.random() *
            12;

        const color =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];

        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.rotate(
            Math.random() *
            Math.PI
        );

        ctx.fillStyle =
            color;

        ctx.fillRect(
            -size / 2,
            -size / 4,
            size,
            size / 2
        );

        ctx.restore();
    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const x =
            30 +
            Math.random() *
            (
                canvasWidth -
                60
            );

        const y =
            100 +
            Math.random() *
            (
                canvasHeight -
                180
            );

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5 +
            Math.random() *
            7,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];

        ctx.fill();
    }


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const startX =
            60 +
            Math.random() *
            (
                canvasWidth -
                120
            );

        const startY =
            90 +
            Math.random() *
            (
                canvasHeight -
                180
            );

        const color =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];

        ctx.save();

        ctx.strokeStyle =
            color;

        ctx.lineWidth =
            4;

        ctx.beginPath();

        ctx.moveTo(
            startX,
            startY
        );

        for (
            let j = 1;
            j <= 4;
            j++
        ) {

            ctx.quadraticCurveTo(
                startX +
                    j * 12,

                startY +
                    (
                        j % 2 === 0
                            ? 18
                            : -18
                    ),

                startX +
                    j * 20,

                startY +
                    j * 14
            );
        }

        ctx.stroke();

        ctx.restore();
    }


    const balloons = [

        {
            x: 90,
            y: 80,
            color:
                design.accentColors[0]
        },

        {
            x: 600,
            y: 375,
            color:
                design.accentColors[4]
        },

        {
            x: 1110,
            y: 95,
            color:
                design.accentColors[1]
        },

        {
            x: 145,
            y: 550,
            color:
                design.accentColors[2]
        },

        {
            x: 1055,
            y: 590,
            color:
                design.accentColors[5]
        }
    ];


    balloons.forEach(
        balloon => {

            ctx.save();

            ctx.strokeStyle =
                "rgba(120,120,120,0.7)";

            ctx.lineWidth =
                2;

            ctx.beginPath();

            ctx.moveTo(
                balloon.x,
                balloon.y +
                    34
            );

            ctx.quadraticCurveTo(
                balloon.x -
                    8,

                balloon.y +
                    58,

                balloon.x +
                    6,

                balloon.y +
                    92
            );

            ctx.stroke();

            ctx.restore();


            ctx.save();

            ctx.beginPath();

            ctx.ellipse(
                balloon.x,
                balloon.y,
                24,
                30,
                0,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                balloon.color;

            ctx.fill();


            ctx.beginPath();

            ctx.moveTo(
                balloon.x -
                    6,

                balloon.y +
                    28
            );

            ctx.lineTo(
                balloon.x +
                    6,

                balloon.y +
                    28
            );

            ctx.lineTo(
                balloon.x,

                balloon.y +
                    38
            );

            ctx.closePath();

            ctx.fillStyle =
                balloon.color;

            ctx.fill();


            ctx.beginPath();

            ctx.ellipse(
                balloon.x -
                    8,

                balloon.y -
                    10,

                5,
                8,
                0.3,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,0.45)";

            ctx.fill();

            ctx.restore();
        }
    );
}


/* =========================
   PARTY DESIGN
========================= */

function drawPartyDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {

    const colors =
        design.accentColors;


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const x =
            Math.random() *
            canvasWidth;

        const y =
            Math.random() *
            canvasHeight;

        const radius =
            25 +
            Math.random() *
            55;

        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        ctx.save();

        ctx.globalAlpha =
            0.12;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            color;

        ctx.fill();

        ctx.restore();
    }


    const startX =
        60;

    const endX =
        canvasWidth -
        60;

    const topY =
        105;

    ctx.save();

    ctx.strokeStyle =
        "rgba(255,255,255,0.65)";

    ctx.lineWidth =
        3;

    ctx.beginPath();

    ctx.moveTo(
        startX,
        topY
    );

    ctx.quadraticCurveTo(
        canvasWidth / 2,
        topY + 35,
        endX,
        topY
    );

    ctx.stroke();


    const pennantCount =
        11;

    const spacing =
        (
            endX -
            startX
        ) /
        pennantCount;


    for (
        let i = 0;
        i < pennantCount;
        i++
    ) {

        const px =
            startX +
            i *
            spacing +
            spacing / 2;

        const py =
            topY +
            8 +
            Math.sin(i) *
            5;

        ctx.beginPath();

        ctx.moveTo(
            px - 16,
            py
        );

        ctx.lineTo(
            px + 16,
            py
        );

        ctx.lineTo(
            px,
            py + 30
        );

        ctx.closePath();

        ctx.fillStyle =
            colors[
                i %
                colors.length
            ];

        ctx.fill();
    }

    ctx.restore();


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const x =
            40 +
            Math.random() *
            (
                canvasWidth -
                80
            );

        const y =
            120 +
            Math.random() *
            (
                canvasHeight -
                180
            );

        const size =
            4 +
            Math.random() *
            8;

        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.strokeStyle =
            color;

        ctx.lineWidth =
            3;

        ctx.beginPath();

        ctx.moveTo(
            -size,
            0
        );

        ctx.lineTo(
            size,
            0
        );

        ctx.moveTo(
            0,
            -size
        );

        ctx.lineTo(
            0,
            size
        );

        ctx.stroke();

        ctx.restore();
    }


    const streamers = [

        {
            x: 70,
            y: 210,
            color:
                colors[0]
        },

        {
            x: 1120,
            y: 230,
            color:
                colors[2]
        },

        {
            x: 90,
            y: 620,
            color:
                colors[4]
        },

        {
            x: 1090,
            y: 610,
            color:
                colors[1]
        }
    ];


    streamers.forEach(
        streamer => {

            ctx.save();

            ctx.strokeStyle =
                streamer.color;

            ctx.lineWidth =
                5;

            ctx.beginPath();

            ctx.moveTo(
                streamer.x,
                streamer.y
            );

            for (
                let i = 1;
                i <= 5;
                i++
            ) {

                ctx.quadraticCurveTo(

                    streamer.x +
                        i * 10,

                    streamer.y +
                        (
                            i % 2 === 0
                                ? 22
                                : -22
                        ),

                    streamer.x +
                        i * 20,

                    streamer.y +
                        i * 16
                );
            }

            ctx.stroke();

            ctx.restore();
        }
    );
}


/* =========================
   HOCHZEIT DESIGN
========================= */

function drawWeddingDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {

    const colors =
        design.accentColors;


    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const x =
            Math.random() *
            canvasWidth;

        const y =
            Math.random() *
            canvasHeight;

        const radius =
            20 +
            Math.random() *
            45;

        ctx.save();

        ctx.globalAlpha =
            0.10;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        ctx.fill();

        ctx.restore();
    }


    const flowers = [

        {
            x: 75,
            y: 90
        },

        {
            x: 110,
            y: 115
        },

        {
            x: 90,
            y: 145
        },

        {
            x: 1125,
            y: 90
        },

        {
            x: 1090,
            y: 115
        },

        {
            x: 1110,
            y: 145
        }
    ];


    flowers.forEach(
        (
            flower,
            index
        ) => {

            ctx.save();

            ctx.fillStyle =
                colors[
                    index %
                    colors.length
                ];

            for (
                let petal = 0;
                petal < 5;
                petal++
            ) {

                const angle =
                    petal *
                    (
                        Math.PI *
                        2 /
                        5
                    );

                const px =
                    flower.x +
                    Math.cos(
                        angle
                    ) *
                    11;

                const py =
                    flower.y +
                    Math.sin(
                        angle
                    ) *
                    11;

                ctx.beginPath();

                ctx.arc(
                    px,
                    py,
                    7,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

            ctx.fillStyle =
                "#ffffff";

            ctx.beginPath();

            ctx.arc(
                flower.x,
                flower.y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();
        }
    );

    ctx.save();

    ctx.strokeStyle =
        "rgba(180,150,170,0.35)";

    ctx.lineWidth =
        3;

    ctx.beginPath();

    ctx.moveTo(
        40,
        700
    );

    ctx.quadraticCurveTo(
        200,
        640,
        330,
        730
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        canvasWidth -
        40,
        700
    );

    ctx.quadraticCurveTo(
        canvasWidth -
        200,
        640,
        canvasWidth -
        330,
        730
    );

    ctx.stroke();

    ctx.restore();
}

function drawWeddingFloralDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {

    const colors =
        design.accentColors;


    function drawLeaf(
        x,
        y,
        angle,
        size,
        color
    ) {

        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.rotate(
            angle
        );

        ctx.fillStyle =
            color;

        ctx.globalAlpha =
            0.55;

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            size,
            size * 0.42,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }


    function drawFlower(
        x,
        y,
        size,
        color
    ) {

        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.fillStyle =
            color;

        ctx.globalAlpha =
            0.9;

        for (
            let i = 0;
            i < 6;
            i++
        ) {

            const angle =
                i *
                Math.PI /
                3;

            const px =
                Math.cos(angle) *
                size;

            const py =
                Math.sin(angle) *
                size;

            ctx.beginPath();

            ctx.arc(
                px,
                py,
                size * 0.52,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        ctx.fillStyle =
            "#fff7e8";

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            size * 0.34,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }


    function drawBranch(
        startX,
        startY,
        cpX,
        cpY,
        endX,
        endY
    ) {

        ctx.save();

        ctx.strokeStyle =
            "rgba(190, 165, 150, 0.42)";

        ctx.lineWidth =
            2;

        ctx.beginPath();

        ctx.moveTo(
            startX,
            startY
        );

        ctx.quadraticCurveTo(
            cpX,
            cpY,
            endX,
            endY
        );

        ctx.stroke();

        ctx.restore();
    }


    function drawPetals(
        count
    ) {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const x =
                70 +
                Math.random() *
                (canvasWidth - 140);

            const y =
                110 +
                Math.random() *
                (canvasHeight - 220);

            const w =
                7 +
                Math.random() * 8;

            const h =
                4 +
                Math.random() * 5;

            const color =
                colors[
                    Math.floor(
                        Math.random() *
                        3
                    )
                ];

            ctx.save();

            ctx.translate(
                x,
                y
            );

            ctx.rotate(
                Math.random() *
                Math.PI
            );

            ctx.globalAlpha =
                0.18;

            ctx.fillStyle =
                color;

            ctx.beginPath();

            ctx.ellipse(
                0,
                0,
                w,
                h,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();
        }
    }


    // dezente Blütenblätter im Hintergrund
    drawPetals(26);


    // geschwungene Zweige
    drawBranch(
        52, 182,
        150, 118,
        270, 190
    );

    drawBranch(
        canvasWidth - 52, 182,
        canvasWidth - 150, 118,
        canvasWidth - 270, 190
    );

    drawBranch(
        70, canvasHeight - 120,
        120, canvasHeight - 150,
        175, canvasHeight - 110
    );

    drawBranch(
        canvasWidth - 70, canvasHeight - 120,
        canvasWidth - 120, canvasHeight - 150,
        canvasWidth - 175, canvasHeight - 110
    );


    // links oben
    drawLeaf(
        72,
        126,
        -0.7,
        28,
        colors[3]
    );

    drawLeaf(
        106,
        98,
        -0.15,
        22,
        colors[3]
    );

    drawLeaf(
        138,
        142,
        0.35,
        18,
        colors[4]
    );

    drawFlower(
        92,
        118,
        11,
        colors[0]
    );

    drawFlower(
        126,
        146,
        8,
        colors[1]
    );


    // rechts oben
    drawLeaf(
        canvasWidth - 72,
        126,
        0.7,
        28,
        colors[3]
    );

    drawLeaf(
        canvasWidth - 106,
        98,
        0.15,
        22,
        colors[3]
    );

    drawLeaf(
        canvasWidth - 138,
        142,
        -0.35,
        18,
        colors[4]
    );

    drawFlower(
        canvasWidth - 92,
        118,
        11,
        colors[0]
    );

    drawFlower(
        canvasWidth - 126,
        146,
        8,
        colors[1]
    );


    // links unten
    drawLeaf(
        88,
        canvasHeight - 96,
        0.55,
        28,
        colors[3]
    );

    drawLeaf(
        126,
        canvasHeight - 120,
        0.1,
        20,
        colors[4]
    );

    drawFlower(
        116,
        canvasHeight - 88,
        10,
        colors[0]
    );


    // rechts unten
    drawLeaf(
        canvasWidth - 88,
        canvasHeight - 96,
        -0.55,
        28,
        colors[3]
    );

    drawLeaf(
        canvasWidth - 126,
        canvasHeight - 120,
        -0.1,
        20,
        colors[4]
    );

    drawFlower(
        canvasWidth - 116,
        canvasHeight - 88,
        10,
        colors[0]
    );


    // feine goldene Akzente
    ctx.save();

    ctx.strokeStyle =
        "rgba(207,174,120,0.34)";

    ctx.lineWidth =
        1.8;

    ctx.beginPath();

    ctx.moveTo(
        62,
        202
    );

    ctx.quadraticCurveTo(
        190,
        145,
        285,
        198
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        canvasWidth - 62,
        202
    );

    ctx.quadraticCurveTo(
        canvasWidth - 190,
        145,
        canvasWidth - 285,
        198
    );

    ctx.stroke();

    ctx.restore();
}

/* =========================
   BUSINESS DESIGN
========================= */

function drawBusinessDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {

    const colors =
        design.accentColors;


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const x =
            Math.random() *
            canvasWidth;

        const y =
            Math.random() *
            canvasHeight;

        const size =
            30 +
            Math.random() *
            70;

        ctx.save();

        ctx.globalAlpha =
            0.10;

        ctx.translate(
            x,
            y
        );

        ctx.rotate(
            Math.random() *
            Math.PI
        );

        ctx.fillStyle =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        ctx.fillRect(
            -size / 2,
            -size / 2,
            size,
            size
        );

        ctx.restore();
    }


    ctx.save();

    ctx.strokeStyle =
        colors[1];

    ctx.globalAlpha =
        0.55;

    ctx.lineWidth =
        4;

    ctx.beginPath();

    ctx.moveTo(
        50,
        115
    );

    ctx.lineTo(
        1150,
        115
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        50,
        700
    );

    ctx.lineTo(
        1150,
        700
    );

    ctx.stroke();

    ctx.restore();


    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const x =
            50 +
            Math.random() *
            (
                canvasWidth -
                100
            );

        const y =
            130 +
            Math.random() *
            (
                canvasHeight -
                260
            );

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            colors[
                i %
                colors.length
            ];

        ctx.fill();
    }
}


/* =========================
   FOTO-RAHMEN
========================= */

function drawPhotoFrame(
    ctx,
    img,
    frame
) {

    const border =
        9;

    const radius =
        22;


    fillRoundedRect(
        ctx,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        radius,
        frame.frameColor
    );


    strokeRoundedRect(
        ctx,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        radius,
        frame.frameBorderColor,
        4
    );


    const innerX =
        frame.x +
        border;

    const innerY =
        frame.y +
        border;

    const innerW =
        frame.w -
        border * 2;

    const innerH =
        frame.h -
        border * 2;


    const imageRatio =
        img.width /
        img.height;

    const frameRatio =
        innerW /
        innerH;


    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;


    if (
        imageRatio >
        frameRatio
    ) {

        drawHeight =
            innerH;

        drawWidth =
            innerH *
            imageRatio;

        offsetX =
            (
                drawWidth -
                innerW
            ) /
            2;

        offsetY =
            0;

    } else {

        drawWidth =
            innerW;

        drawHeight =
            innerW /
            imageRatio;

        offsetX =
            0;

        offsetY =
            (
                drawHeight -
                innerH
            ) /
            2;
    }


    ctx.save();


    drawRoundedRect(
        ctx,
        innerX,
        innerY,
        innerW,
        innerH,
        16
    );

    ctx.clip();


    ctx.drawImage(
        img,
        innerX -
            offsetX,
        innerY -
            offsetY,
        drawWidth,
        drawHeight
    );


    ctx.restore();
}

/* =========================
   COLLAGE ERSTELLEN
========================= */

async function generateCollage() {

    const ctx =
        collageCanvas.getContext(
            "2d"
        );

    collageCanvas.width =
        1200;

    collageCanvas.height =
        800;


    const design =
        cardDesigns[
            settings.cardDesign
        ];


    if (!design) {

        console.error(
            "Kein Kartendesign gefunden.",
            {
                theme:
                    settings.theme,

                photoCount:
                    settings.photoCount,

                cardDesign:
                    settings.cardDesign
            }
        );

        alert(
            "Für diese Kombination wurde kein Kartendesign gefunden."
        );

        return;
    }


    ctx.clearRect(
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
    );


    /* =========================
       HINTERGRUND
    ========================= */

    if (
        settings.cardDesign ===
        "birthdayParty"
    ) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                collageCanvas.width,
                collageCanvas.height
            );

        gradient.addColorStop(
            0,
            "#241038"
        );

        gradient.addColorStop(
            0.5,
            "#552060"
        );

        gradient.addColorStop(
            1,
            "#18102f"
        );

        ctx.fillStyle =
            gradient;


    } else if (
        settings.cardDesign ===
        "weddingElegant"
    ) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                collageCanvas.width,
                collageCanvas.height
            );

        gradient.addColorStop(
            0,
            "#fffaf7"
        );

        gradient.addColorStop(
            0.5,
            "#f4e8ee"
        );

        gradient.addColorStop(
            1,
            "#eee6f2"
        );

        ctx.fillStyle =
            gradient;

} else if (
    settings.cardDesign ===
    "weddingFloral"
) {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            collageCanvas.width,
            collageCanvas.height
        );

    gradient.addColorStop(
        0,
        "#fffdfb"
    );

    gradient.addColorStop(
        0.5,
        "#f9ece8"
    );

    gradient.addColorStop(
        1,
        "#f2e5de"
    );

    ctx.fillStyle =
        gradient;    

    } else if (
        settings.cardDesign ===
        "businessClean"
    ) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                collageCanvas.width,
                collageCanvas.height
            );

        gradient.addColorStop(
            0,
            "#12202e"
        );

        gradient.addColorStop(
            0.55,
            "#243b50"
        );

        gradient.addColorStop(
            1,
            "#111d29"
        );

        ctx.fillStyle =
            gradient;


    } else {

        ctx.fillStyle =
            design.backgroundColor ||
            "#ffffff";
    }


    ctx.fillRect(
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
    );


    /* =========================
       DEKORATION
    ========================= */

    if (
        settings.cardDesign ===
        "birthdayConfetti"
    ) {

        drawConfettiDecoration(
            ctx,
            collageCanvas.width,
            collageCanvas.height,
            design
        );


    } else if (
        settings.cardDesign ===
        "birthdayParty"
    ) {

        drawPartyDecoration(
            ctx,
            collageCanvas.width,
            collageCanvas.height,
            design
        );


    } else if (
        settings.cardDesign ===
        "weddingElegant"
    ) {

        drawWeddingDecoration(
            ctx,
            collageCanvas.width,
            collageCanvas.height,
            design
        );

        } else if (
    settings.cardDesign ===
    "weddingFloral"
) {

    drawWeddingFloralDecoration(
        ctx,
        collageCanvas.width,
        collageCanvas.height,
        design
    );

    } else if (
        settings.cardDesign ===
        "businessClean"
    ) {

        drawBusinessDecoration(
            ctx,
            collageCanvas.width,
            collageCanvas.height,
            design
        );
    }


    /* =========================
       TITEL-BANNER
    ========================= */

    const titleBackground =
        design.titleBgColor
            ? design.titleBgColor
            : "rgba(255,255,255,0.88)";


    fillRoundedRect(
        ctx,
        150,
        20,
        900,
        78,
        32,
        titleBackground
    );


    strokeRoundedRect(
        ctx,
        150,
        20,
        900,
        78,
        32,
        "rgba(255,255,255,0.95)",
        2
    );


    ctx.fillStyle =
        design.textColor ||
        "#000000";


    ctx.font =
        design.titleFont ||
        "bold 46px Arial";


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        settings.eventTitle,
        collageCanvas.width / 2,
        60
    );


    /* =========================
       FOTOS LADEN
    ========================= */

    const images = [];


    for (
        const photo of
        capturedPhotos
    ) {

        const img =
            new Image();

        img.src =
            photo;


        await new Promise(
            (
                resolve,
                reject
            ) => {

                img.onload =
                    resolve;

                img.onerror =
                    reject;
            }
        );


        images.push(
            img
        );
    }


    /* =========================
       FOTO-POSITIONEN
    ========================= */

    let positions = [];


    if (
        capturedPhotos.length ===
        2
    ) {

        positions = [

            {
                x: 40,
                y: 250,
                w: 555,
                h: 430
            },

            {
                x: 620,
                y: 185,
                w: 555,
                h: 430
            }

        ];


    } else if (
        capturedPhotos.length ===
        3
    ) {

        positions = [

            {
                x: 70,
                y: 145,
                w: 500,
                h: 275
            },

            {
                x: 630,
                y: 145,
                w: 500,
                h: 275
            },

            {
                x: 170,
                y: 450,
                w: 700,
                h: 310
            }

        ];


    } else if (
        capturedPhotos.length ===
        4
    ) {

        positions = [

            {
                x: 70,
                y: 145,
                w: 500,
                h: 275
            },

            {
                x: 630,
                y: 145,
                w: 500,
                h: 275
            },

            {
                x: 70,
                y: 440,
                w: 500,
                h: 275
            },

            {
                x: 630,
                y: 440,
                w: 500,
                h: 275
            }

        ];
    }


    /* =========================
       FOTOS ZEICHNEN
    ========================= */

    images.forEach(
        (
            img,
            index
        ) => {

            if (
                !positions[index]
            ) {
                return;
            }


            const p =
                positions[index];


            drawPhotoFrame(
                ctx,
                img,
                {
                    x:
                        p.x,

                    y:
                        p.y,

                    w:
                        p.w,

                    h:
                        p.h,

                    frameColor:
                        design.frameColor,

                    frameBorderColor:
                        design.frameBorderColor
                }
            );
        }
    );


    /* =========================
       DATUM
    ========================= */

    const today =
        new Date();


    const dateString =
        today.toLocaleDateString(
            "de-DE"
        );


    fillRoundedRect(
        ctx,
        920,
        730,
        210,
        38,
        18,
        design.dateBgColor
    );


    ctx.fillStyle =
        design.dateTextColor;


    ctx.font =
        "22px Arial";


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        dateString,
        1025,
        749
    );


    /* =========================
       VORSCHAU
    ========================= */

    collagePreview.src =
        collageCanvas.toDataURL(
            "image/jpeg",
            0.95
        );


    collagePreview.style.display =
        "block";
}


/* =========================
   THEMEN-AUSWAHL
========================= */

themeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const selectedTheme =
                    button.dataset.theme;


                if (
                    !themes[
                        selectedTheme
                    ]
                ) {
                    return;
                }


                settings.theme =
                    selectedTheme;


                document.body.className =
                    selectedTheme;


                updateActiveThemeButton();


                /*
                    WICHTIG:
                    Fotoanzahl bleibt erhalten.

                    Wir setzen hier NICHT mehr
                    defaultPhotoCount.
                */

                updateActivePhotoCountButton();

                updateGuestPhotoCountButtons();


                /*
                    Passendes Kartendesign
                    für das neue Thema bestimmen
                */

                updateDesignSelection();


                /*
                    Serie / Oberfläche
                    zurücksetzen
                */

                resetPhotoBooth();


                photoCountInfo.textContent =
                    "Fotos pro Serie: " +
                    settings.photoCount;


                console.log(
                    "Thema:",
                    settings.theme,
                    "Fotos:",
                    settings.photoCount,
                    "Design:",
                    settings.cardDesign
                );
            }
        );
    }
);


/* =========================
   NEUE FOTOSERIE / RESET
========================= */

async function resetPhotoBooth() {

    capturedPhotos = [];

    currentPhoto =
        null;

    currentPhotoIndex =
        1;


    updateSeriesDisplay();


    resultArea.style.display =
        "none";


    captureArea.style.display =
        "flex";


    eventTitleDisplay
        .style.display =
        "block";


    seriesProgress
        .style.display =
        "block";


    video.style.display =
        "block";


    preview.style.display =
        "none";


    collagePreview
        .style.display =
        "none";


    document
        .getElementById(
            "cameraContainer"
        )
        .style.display =
        "flex";


    captureBtn.style.display =
        "inline-block";

    captureBtn.disabled =
        false;


    retakeBtn.style.display =
        "none";


    nextBtn.style.display =
        "none";


    saveBtn.style.display =
        "none";


    printBtn.style.display =
        "none";


    newSeriesBtn.style.display =
        "none";


    photoActions.style.display =
        "none";


    guestPhotoCountSelection
        .style.display =
        "flex";


    updateGuestPhotoCountButtons();

    updateActivePhotoCountButton();
}


/* =========================
   BUTTON: NEUE SERIE
========================= */

newSeriesBtn.addEventListener(
    "click",
    async () => {

        if (
            !document.fullscreenElement
        ) {

            await enableFullscreen();
        }


        await requestWakeLock();


        resetPhotoBooth();
    }
);


/* =========================
   DESIGN BUTTONS
========================= */

designButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const selectedDesign =
                    button.dataset.design;


                const design =
                    cardDesigns[
                        selectedDesign
                    ];


                if (!design) {

                    console.error(
                        "Unbekanntes Design:",
                        selectedDesign
                    );

                    return;
                }


                if (
                    design.theme !==
                    settings.theme
                ) {

                    alert(
                        "Dieses Design gehört zu einem anderen Event."
                    );

                    return;
                }


                if (
                    !design.photoCounts
                        .includes(
                            settings.photoCount
                        )
                ) {

                    alert(
                        "Dieses Design unterstützt diese Fotoanzahl nicht."
                    );

                    return;
                }


                settings.cardDesign =
                    selectedDesign;


                updateActiveDesignButton();


                console.log(
                    "Kartendesign:",
                    design.name
                );
            }
        );
    }
);


/* =========================
   ADMIN LOGO LANGDRUCK
========================= */

[
    startLogo,
    appLogo
].forEach(
    logo => {

        if (!logo) {
            return;
        }

        logo.addEventListener(
            "mousedown",
            startAdminPress
        );

        logo.addEventListener(
            "mouseup",
            cancelAdminPress
        );

        logo.addEventListener(
            "mouseleave",
            cancelAdminPress
        );

        logo.addEventListener(
            "touchstart",
            startAdminPress,
            {
                passive: true
            }
        );

        logo.addEventListener(
            "touchend",
            cancelAdminPress
        );

        logo.addEventListener(
            "touchcancel",
            cancelAdminPress
        );
    }
);

[
    startLogo,
    appLogo
].forEach(
    logo => {

        if (!logo) {
            return;
        }

        logo.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();
            }
        );

        logo.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();
            }
        );
    }
);

/* =========================
   ADMIN SCHLIESSEN
========================= */

closeAdminBtn.addEventListener(
    "click",
    () => {

        saveSettings();


        adminOverlay.style.display =
            "none";


        /*
            Anzeigen nochmal
            synchronisieren
        */

        updateActiveThemeButton();

        updateActivePhotoCountButton();

        updateGuestPhotoCountButtons();

        updateDesignSelection();


        photoCountInfo.textContent =
            "Fotos pro Serie: " +
            settings.photoCount;
    }
);


/* =========================
   COUNTDOWN
========================= */

countdownSelect.addEventListener(
    "change",
    () => {

        settings.countdown =
            Number(
                countdownSelect.value
            );
    }
);


/* =========================
   BLITZ
========================= */

flashEnabledCheckbox
    .addEventListener(
        "change",
        () => {

            settings.flashEnabled =
                flashEnabledCheckbox
                    .checked;
        }
    );


/* =========================
   SOUND
========================= */

soundEnabledCheckbox
    .addEventListener(
        "change",
        () => {

            settings.soundEnabled =
                soundEnabledCheckbox
                    .checked;
        }
    );


/* =========================
   EVENT-TITEL
========================= */

eventTitleInput.addEventListener(
    "input",
    () => {

        settings.eventTitle =
            eventTitleInput.value;


        eventTitleDisplay.textContent =
            settings.eventTitle;
    }
);


/* =========================
   ADMIN PIN
========================= */

function checkAdminPin() {

    if (
        adminPinInput.value ===
        "0714"
    ) {

        pinOverlay.style.display =
            "none";


        adminOverlay.style.display =
            "flex";


        adminPinInput.value =
            "";


        pinError.style.display =
            "none";


        /*
            Admin-Anzeige immer
            auf aktuellen Zustand bringen
        */

        updateActiveThemeButton();

        updateActivePhotoCountButton();

        updateActiveDesignButton();


        countdownSelect.value =
            String(
                settings.countdown
            );


        flashEnabledCheckbox.checked =
            settings.flashEnabled;


        soundEnabledCheckbox.checked =
            settings.soundEnabled;


        eventTitleInput.value =
            settings.eventTitle;


    } else {

        adminPinInput.value =
            "";


        pinError.style.display =
            "block";


        adminPinInput.focus();
    }
}


/* =========================
   PIN OK
========================= */

pinOkBtn.addEventListener(
    "click",
    checkAdminPin
);


/* =========================
   PIN ABBRECHEN
========================= */

pinCancelBtn.addEventListener(
    "click",
    () => {

        pinOverlay.style.display =
            "none";


        adminPinInput.value =
            "";


        pinError.style.display =
            "none";
    }
);


/* =========================
   ENTER BEI PIN
========================= */

adminPinInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Enter"
        ) {

            checkAdminPin();
        }
    }
);


/* =========================
   APP INITIALISIEREN
========================= */

function initializeApp() {

    loadSettings();


    /*
        Falls noch kein Thema
        gespeichert wurde:
        Geburtstag als Startwert
    */

    if (
        !settings.theme ||
        !themes[
            settings.theme
        ]
    ) {

        settings.theme =
            "birthday";
    }


    document.body.className =
        settings.theme;


    eventTitleInput.value =
        settings.eventTitle;


    eventTitleDisplay.textContent =
        settings.eventTitle;


    countdownSelect.value =
        String(
            settings.countdown
        );


    flashEnabledCheckbox.checked =
        settings.flashEnabled;


    soundEnabledCheckbox.checked =
        settings.soundEnabled;


    photoCountInfo.textContent =
        "Fotos pro Serie: " +
        settings.photoCount;


    currentPhotoIndex =
        1;


    /*
        Ganz wichtig:
        zuerst passendes Design
        bestimmen.
    */

    updateDesignSelection();


    updateSeriesDisplay();

    updateActiveThemeButton();

    updateActivePhotoCountButton();

    updateGuestPhotoCountButtons();

    updateActiveDesignButton();


    console.log(
        "Photobooth initialisiert:",
        {
            theme:
                settings.theme,

            photoCount:
                settings.photoCount,

            cardDesign:
                settings.cardDesign
        }
    );

    startScreen.style.display =
        "flex";

    boothScreen.style.display =
        "none";
}


/* =========================
   START
========================= */

initializeApp();
