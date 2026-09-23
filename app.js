const settings = {

    theme: null,
    photoCount: 4,
    cardDesign: "birthdayConfetti",
    countdown: 3,
    flashEnabled: true,
    soundEnabled: true
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
        photoCounts: [3, 4],
        backgroundColor: "#fff4d6",
        textColor: "#6b3200"
    },

    birthdayParty: {
        name: "Party",
        theme: "birthday",
        photoCounts: [4],
        backgroundColor: "#ffe8f2",
        textColor: "#7a1748"
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

if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("service-worker.js")
        .then(() => {

            console.log("Service Worker aktiv");
        });
}

const startBoothBtn =
    document.getElementById("startBoothBtn");

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

const newSeriesBtn =
    document.getElementById("newSeriesBtn");

const eventTitleDisplay =
    document.getElementById("eventTitleDisplay");

const eventTitleInput =
    document.getElementById("eventTitleInput");

const themeButtons =
    document.querySelectorAll(".themeBtn");

const designButtons =
    document.querySelectorAll(".designBtn");

const photoCountButtons =
    document.querySelectorAll(".photoCountBtn");

const photoCountInfo =
    document.getElementById("photoCountInfo");

const seriesProgress =
    document.getElementById("seriesProgress");

const appLogo =
    document.getElementById("appLogo");

const adminOverlay =
    document.getElementById("adminOverlay");

const closeAdminBtn =
    document.getElementById("closeAdminBtn");

const pinOverlay =
    document.getElementById("pinOverlay");

const adminPinInput =
    document.getElementById("adminPinInput");

const pinError =
    document.getElementById("pinError");

const pinCancelBtn =
    document.getElementById("pinCancelBtn");

const pinOkBtn =
    document.getElementById("pinOkBtn");

const countdownSelect =
    document.getElementById("countdownSelect");

const flashEnabledCheckbox =
    document.getElementById("flashEnabled");

const soundEnabledCheckbox =
    document.getElementById("soundEnabled");

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

function updateDesignSelection() {

    let firstCompatibleDesign = null;

    designButtons.forEach(button => {

        const designName =
            button.dataset.design;

        const design =
            cardDesigns[designName];

        if (!design) {
            button.style.display = "none";
            return;
        }

        const isCompatible =
            design.theme === settings.theme &&
            design.photoCounts.includes(
                settings.photoCount
            );

        if (isCompatible) {

            button.style.display =
                "inline-block";

            if (!firstCompatibleDesign) {
                firstCompatibleDesign =
                    designName;
            }

        } else {

            button.style.display =
                "none";

        }
    });

    const currentDesign =
        cardDesigns[settings.cardDesign];

    const currentIsCompatible =
        currentDesign &&
        currentDesign.theme === settings.theme &&
        currentDesign.photoCounts.includes(
            settings.photoCount
        );

    if (!currentIsCompatible) {

        settings.cardDesign =
            firstCompatibleDesign;

    }

    updateActiveDesignButton();
}

function updateActiveDesignButton() {

    designButtons.forEach(button => {

        if (
            button.dataset.design ===
            settings.cardDesign
        ) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");
        }
    });
}

function updateActivePhotoCountButton() {

    photoCountButtons.forEach(button => {

        const count =
            Number(button.dataset.count);

        if (
            count ===
            settings.photoCount
        ) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");
        }
    });
}

function updateActiveThemeButton() {

    themeButtons.forEach(button => {

        if (
            button.dataset.theme ===
            settings.theme
        ) {

            button.classList.add("active");

        } else {

            button.classList.remove("active");
        }
    });
}

function saveSettings() {

const savedSettings = {
    theme: settings.theme,
    photoCount: settings.photoCount,
    cardDesign: settings.cardDesign,
    countdown: settings.countdown,
    flashEnabled: settings.flashEnabled,
    soundEnabled: settings.soundEnabled
    eventTitle: settings.eventTitle
};

    localStorage.setItem(
        "photoboothSettings",
        JSON.stringify(savedSettings)
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
            JSON.parse(storedSettings);

        if (
            savedSettings.theme &&
            themes[savedSettings.theme]
        ) {
            settings.theme =
                savedSettings.theme;
        }

        if (
            savedSettings.photoCount === 3 ||
            savedSettings.photoCount === 4
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
    typeof savedSettings.flashEnabled ===
    "boolean"
) {
    settings.flashEnabled =
        savedSettings.flashEnabled;
}

if (
    typeof savedSettings.soundEnabled ===
    "boolean"
) {
    settings.soundEnabled =
        savedSettings.soundEnabled;
}

if (
    typeof savedSettings.eventTitle === "string" &&
    savedSettings.eventTitle.trim() !== ""
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



photoCountButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const newPhotoCount =
                Number(
                    button.dataset.count
                );

            if (
                newPhotoCount !== 3 &&
                newPhotoCount !== 4
            ) {
                return;
            }

            settings.photoCount =
                newPhotoCount;

            // Neue Serie vorbereiten
            capturedPhotos = [];
            currentPhoto = null;
            currentPhotoIndex = 1;

            // Anzeigen aktualisieren
            photoCountInfo.textContent =
                "Fotos pro Serie: " +
                settings.photoCount;

            updateSeriesDisplay();

            updateActivePhotoCountButton();

            // Passende Designs neu filtern
            updateDesignSelection();

            // Alte Vorschauen entfernen
            preview.style.display =
                "none";

            collagePreview.style.display =
                "none";

            // Kamera wieder anzeigen
            document.getElementById(
                "cameraContainer"
            ).style.display = "block";

            captureBtn.style.display =
                "inline-block";

            captureBtn.disabled =
                false;

            // Aktionsbuttons zurücksetzen
            photoActions.style.display =
                "none";

            retakeBtn.style.display =
                "inline-block";

            nextBtn.style.display =
                "inline-block";

            saveBtn.style.display =
                "inline-block";

            saveBtn.textContent =
                "💾 Speichern";

            newSeriesBtn.style.display =
                "none";
        }
    );
});

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

startBoothBtn.addEventListener(
    "click",
    async () => {

        await enableFullscreen();

        await requestWakeLock();

        await startCamera();

        startBoothBtn.style.display =
            "none";

        captureBtn.style.display =
            "inline-block";
    }
);

async function capturePhoto() {

    countdownOverlay.style.display = "flex";

    for (
        let i = settings.countdown;
        i > 0;
        i--
    ) {
        countdownOverlay.textContent = i;

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );
    }

    countdownOverlay.style.display = "none";


    if (settings.flashEnabled) {

        flashOverlay.style.opacity = "1";

        await new Promise(resolve =>
            setTimeout(resolve, 500)
        );

        flashOverlay.style.opacity = "0";
    }


    if (settings.soundEnabled) {

        shutterSound.currentTime = 0;

        shutterSound
            .play()
            .catch(error => {
                console.log(
                    "Auslöseton konnte nicht abgespielt werden.",
                    error
                );
            });
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

      newSeriesBtn.style.display =
        "inline-block";
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

    const design =
    cardDesigns[settings.cardDesign];

    ctx.fillStyle =
        design
            ? design.backgroundColor
            : "#ffffff";

    ctx.fillRect(
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
);
    
    ctx.fillStyle =
        design
            ? design.textColor
            : "#000000";

    ctx.font =
        "bold 50px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
    settings.eventTitle,
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

    let positions = [];

    if (capturedPhotos.length === 3) {

    // Layout für 3 Fotos:
    // zwei Fotos oben, ein großes Foto unten

    positions = [
        { x: 20,  y: 110, w: 560,  h: 300 },
        { x: 620, y: 110, w: 560,  h: 300 },

        { x: 20,  y: 450, w: 1160, h: 300 }
    ];

    } else if (capturedPhotos.length === 4) {

    // Layout für 4 Fotos:
    // klassisches 2x2-Raster

    positions = [
        { x: 20,  y: 110, w: 560, h: 300 },
        { x: 620, y: 110, w: 560, h: 300 },

        { x: 20,  y: 450, w: 560, h: 300 },
        { x: 620, y: 450, w: 560, h: 300 }
    ];
}

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
            updateActiveThemeButton();

            settings.photoCount =
                themes[selectedTheme]
                    .defaultPhotoCount;
            
            updateActivePhotoCountButton();
            updateDesignSelection();

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

            newSeriesBtn.style.display =
                "none";  
        }
    );
});

// Neue Fotoserie
newSeriesBtn.addEventListener(
    "click",
    async () => {

        capturedPhotos = [];
        currentPhoto = null;
        currentPhotoIndex = 1;

        updateSeriesDisplay();

        preview.style.display = "none";
        collagePreview.style.display = "none";

        document.getElementById(
            "cameraContainer"
        ).style.display = "block";

        captureBtn.style.display = "inline-block";
        captureBtn.disabled = false;

        retakeBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";

        saveBtn.style.display = "inline-block";
        saveBtn.textContent = "💾 Speichern";

        newSeriesBtn.style.display = "none";

        photoActions.style.display = "none";

    }
);

// Design-Auswahl

designButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const selectedDesign =
                button.dataset.design;

            const design =
                cardDesigns[selectedDesign];

            if (!design) {
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
                !design.photoCounts.includes(
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
});

appLogo.addEventListener(
    "mousedown",
    startAdminPress
);

appLogo.addEventListener(
    "mouseup",
    cancelAdminPress
);

appLogo.addEventListener(
    "mouseleave",
    cancelAdminPress
);

appLogo.addEventListener(
    "touchstart",
    startAdminPress,
    { passive: true }
);

appLogo.addEventListener(
    "touchend",
    cancelAdminPress
);

appLogo.addEventListener(
    "touchcancel",
    cancelAdminPress
);

closeAdminBtn.addEventListener(
    "click",
    () => {

        saveSettings();

        adminOverlay.style.display =
            "none";
    }
);

countdownSelect.addEventListener(
    "change",
    () => {

        settings.countdown =
            Number(countdownSelect.value);
    }
);

flashEnabledCheckbox.addEventListener(
    "change",
    () => {

        settings.flashEnabled =
            flashEnabledCheckbox.checked;
    }
);

soundEnabledCheckbox.addEventListener(
    "change",
    () => {

        settings.soundEnabled =
            soundEnabledCheckbox.checked;
    }
);

eventTitleInput.addEventListener(
    "input",
    () => {

        settings.eventTitle =
            eventTitleInput.value;

        eventTitleDisplay.textContent =
            settings.eventTitle;
    }
);

function checkAdminPin() {

    if (
        adminPinInput.value === "0714"
    ) {

        pinOverlay.style.display =
            "none";

        adminOverlay.style.display =
            "flex";

        adminPinInput.value =
            "";

        pinError.style.display =
            "none";

    } else {

        adminPinInput.value =
            "";

        pinError.style.display =
            "block";

        adminPinInput.focus();
    }
}


pinOkBtn.addEventListener(
    "click",
    checkAdminPin
);


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

adminPinInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            checkAdminPin();
        }
    }
);

function initializeApp() {

    loadSettings();

    eventTitleInput.value =
        settings.eventTitle;

    eventTitleDisplay.textContent =
        settings.eventTitle;

    countdownSelect.value =
        String(settings.countdown);

    flashEnabledCheckbox.checked =
        settings.flashEnabled;

    soundEnabledCheckbox.checked =
        settings.soundEnabled;

    if (
        settings.theme &&
        themes[settings.theme]
    ) {

        document.body.className =
            settings.theme;
    }

    photoCountInfo.textContent =
        "Fotos pro Serie: " +
        settings.photoCount;

    currentPhotoIndex = 1;

    updateSeriesDisplay();

    updateActiveThemeButton();

    updateActivePhotoCountButton();

    updateDesignSelection();
}


initializeApp();
