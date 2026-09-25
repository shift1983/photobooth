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
        photoCounts: [3, 4],

        backgroundColor: "#fff7e8",
        textColor: "#6b3200",
        frameColor: "#ffffff",
        frameBorderColor: "#f4c98b",

        accentColor: "#ff8a65",
        accentColor2: "#ffd54f",
        accentColor3: "#7e57c2",
        accentColor4: "#4db6ac",

        dateBgColor: "#ffffff",
        dateTextColor: "#6b3200"
    },

    birthdayParty: {
        name: "Party",
        theme: "birthday",
        photoCounts: [4],

        backgroundColor: "#34124d",
        textColor: "#ffffff",
        frameColor: "#ffffff",
        frameBorderColor: "#ff98d0",

        accentColor: "#ff4fa3",
        accentColor2: "#ffd84d",
        accentColor3: "#59d8ff",
        accentColor4: "#7df58a",

        dateBgColor: "#ffffff",
        dateTextColor: "#34124d"
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

const captureArea =
    document.getElementById("captureArea");

const resultArea =
    document.getElementById("resultArea");

const restoreFullscreenBtn =
    document.getElementById("restoreFullscreenBtn");

const printBtn =
    document.getElementById("printBtn");

const restartCameraBtn =
    document.getElementById("restartCameraBtn");

const resetBoothBtn =
    document.getElementById("resetBoothBtn");

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
    soundEnabled: settings.soundEnabled,
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
            ).style.display = "flex";

            captureBtn.style.display =
                "inline-block";

            captureBtn.disabled =
                false;

            // Aktionsbuttons zurücksetzen
            photoActions.style.display =
                "none";

            retakeBtn.style.display =
                "none";

            nextBtn.style.display =
                "none";

            saveBtn.style.display =
                "none";

            newSeriesBtn.style.display =
                "none";

            photoActions.style.display =
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

retakeBtn.addEventListener(
    "click",
    async () => {

        retakeBtn.disabled = true;

        currentPhoto = null;

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

saveBtn.addEventListener(
    "click",
    () => {

        if (!collageCanvas) {
            return;
        }

        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(now.getMonth() + 1).padStart(2, "0");

        const day =
            String(now.getDate()).padStart(2, "0");

        const hours =
            String(now.getHours()).padStart(2, "0");

        const minutes =
            String(now.getMinutes()).padStart(2, "0");

        const fileName =
            `Photobooth_${year}-${month}-${day}_${hours}-${minutes}.jpg`;

        const imageToSave =
            collageCanvas.toDataURL(
                "image/jpeg",
                0.95
            );

        const link =
            document.createElement("a");

        link.href =
            imageToSave;

        link.download =
            fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
);

restoreFullscreenBtn.addEventListener(
    "click",
    async () => {

        await enableFullscreen();

        await requestWakeLock();
    }
);

printBtn.addEventListener(
    "click",
    () => {

        window.print();
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

    preview.style.display = "none";

    captureArea.style.display = "none";

    eventTitleDisplay.style.display = "none";

    seriesProgress.style.display = "none";

    resultArea.style.display = "flex";

    photoActions.style.display = "flex";

    saveBtn.style.display = "inline-block";

    printBtn.style.display = "inline-block";
            
    newSeriesBtn.style.display = "inline-block";

}
    }
);

    // Neustart der Kamera

async function restartCamera() {

    try {

        if (video.srcObject) {

            const tracks =
                video.srcObject.getTracks();

            tracks.forEach(
                track => track.stop()
            );

            video.srcObject = null;
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

function updateSeriesDisplay() {

    seriesProgress.textContent =
        "Foto " +
        currentPhotoIndex +
        " von " +
        settings.photoCount;
}

function drawRoundedRect(
    ctx,
    x,
    y,
    width,
    height,
    radius
) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
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
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );
    ctx.lineTo(x, y + radius);
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
    ctx.fillStyle = color;
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
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
}

function drawConfettiDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {
    const confettiColors = [
        design.accentColor,
        design.accentColor2,
        design.accentColor3,
        design.accentColor4
    ];

    for (let i = 0; i < 90; i++) {

        const x =
            Math.random() * canvasWidth;

        const y =
            Math.random() * canvasHeight;

        const size =
            8 + Math.random() * 12;

        const color =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI);

        ctx.fillStyle = color;
        ctx.fillRect(
            -size / 2,
            -size / 4,
            size,
            size / 2
        );

        ctx.restore();
    }

    for (let i = 0; i < 20; i++) {

        const x =
            40 + Math.random() *
            (canvasWidth - 80);

        const y =
            110 + Math.random() * 70;

        ctx.beginPath();
        ctx.arc(
            x,
            y,
            6 + Math.random() * 8,
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
}

function drawPartyDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {
    const colors = [
        design.accentColor,
        design.accentColor2,
        design.accentColor3,
        design.accentColor4
    ];

    // Wimpelkette
    const startX = 80;
    const endX = canvasWidth - 80;
    const topY = 110;

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, topY);
    ctx.quadraticCurveTo(
        canvasWidth / 2,
        topY + 40,
        endX,
        topY
    );
    ctx.stroke();

    const pennantCount = 10;
    const spacing =
        (endX - startX) / pennantCount;

    for (let i = 0; i < pennantCount; i++) {

        const px =
            startX + i * spacing + spacing / 2;

        const py =
            topY + 8 + Math.sin(i) * 8;

        ctx.beginPath();
        ctx.moveTo(px - 18, py);
        ctx.lineTo(px + 18, py);
        ctx.lineTo(px, py + 35);
        ctx.closePath();

        ctx.fillStyle =
            colors[i % colors.length];
        ctx.fill();
    }

    ctx.restore();

    // Kreise / Party-Dots im Hintergrund
    for (let i = 0; i < 24; i++) {

        const r =
            16 + Math.random() * 26;

        const x =
            40 + Math.random() *
            (canvasWidth - 80);

        const y =
            180 + Math.random() *
            (canvasHeight - 260);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ] + "33";
        ctx.fill();
    }
}

function drawPhotoFrame(
    ctx,
    img,
    frame
) {
    const border = 14;
    const radius = 22;

    // Rahmen
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
        frame.x + border;
    const innerY =
        frame.y + border;
    const innerW =
        frame.w - border * 2;
    const innerH =
        frame.h - border * 2;

const containScale =
    Math.min(
        innerW / img.width,
        innerH / img.height
    );

const coverScale =
    Math.max(
        innerW / img.width,
        innerH / img.height
    );

/*
    cropStrength:
    0   = komplett sichtbar (contain)
    1   = voll gefüllt (cover)

    0.75 = leichtes bis mittleres Cropping
*/
const cropStrength = 0.85;

const finalScale =
    containScale +
    (coverScale - containScale) *
    cropStrength;

const drawWidth =
    img.width * finalScale;

const drawHeight =
    img.height * finalScale;

const offsetX =
    (innerW - drawWidth) / 2;

const offsetY =
    (innerH - drawHeight) / 2;

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
        innerX + offsetX,
        innerY + offsetY,
        drawWidth,
        drawHeight
    );

    ctx.restore();
}

async function generateCollage() {

    const ctx =
        collageCanvas.getContext("2d");

    collageCanvas.width = 1200;
    collageCanvas.height = 800;

    const design =
        cardDesigns[settings.cardDesign];

    ctx.clearRect(
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
    );

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

    // Hintergrund-Deko je nach Design
    if (settings.cardDesign === "birthdayConfetti") {

        drawConfettiDecoration(
            ctx,
            collageCanvas.width,
            collageCanvas.height,
            design
        );

    } else if (
        settings.cardDesign === "birthdayParty"
    ) {

        drawPartyDecoration(
            ctx,
            collageCanvas.width,
            collageCanvas.height,
            design
        );
    }

    // Titel-Banner
    fillRoundedRect(
        ctx,
        160,
        25,
        880,
        70,
        28,
        "rgba(255,255,255,0.85)"
    );

    ctx.fillStyle =
        design
            ? design.textColor
            : "#000000";

    ctx.font =
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

        positions = [
            {
                x: 50,
                y: 145,
                w: 530,
                h: 255
            },
            {
                x: 620,
                y: 145,
                w: 530,
                h: 255
            },
            {
                x: 180,
                y: 430,
                w: 840,
                h: 255
            }
        ];

    } else if (
        capturedPhotos.length === 4
    ) {

        positions = [
            {
                x: 50,
                y: 145,
                w: 530,
                h: 255
            },
            {
                x: 620,
                y: 145,
                w: 530,
                h: 255
            },
            {
                x: 50,
                y: 430,
                w: 530,
                h: 255
            },
            {
                x: 620,
                y: 430,
                w: 530,
                h: 255
            }
        ];
    }

    images.forEach((img, index) => {

        if (!positions[index]) {
            return;
        }

        const p = positions[index];

        drawPhotoFrame(
            ctx,
            img,
            {
                x: p.x,
                y: p.y,
                w: p.w,
                h: p.h,
                frameColor:
                    design.frameColor,
                frameBorderColor:
                    design.frameBorderColor
            }
        );
    });

    const today =
        new Date();

    const dateString =
        today.toLocaleDateString(
            "de-DE"
        );

    fillRoundedRect(
        ctx,
        455,
        722,
        290,
        46,
        22,
        design.dateBgColor
    );

    ctx.fillStyle =
        design.dateTextColor;

    ctx.font =
        "28px Arial";

    ctx.textAlign =
        "center";
    ctx.textBaseline =
        "middle";

    ctx.fillText(
        dateString,
        collageCanvas.width / 2,
        745
    );

    collagePreview.src =
        collageCanvas.toDataURL(
            "image/jpeg",
            0.95
        );

    collagePreview.style.display =
        "block";
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

            document.body.className =
                selectedTheme;

            preview.style.display =
                "none";

            photoActions.style.display =
                "none";

            captureBtn.disabled =
                false;

            captureBtn.style.display =
                "inline-block";

            retakeBtn.style.display =
                "none";

            nextBtn.style.display =
                "none";

            saveBtn.style.display =
                "none";

            photoActions.style.display =
                "none";

            collagePreview.style.display =
                "none";

            document.getElementById(
                "cameraContainer"
            ).style.display = "flex";

            captureBtn.style.display =
                "inline-block";

            newSeriesBtn.style.display =
                "none";  
        }
    );
});

// Neue Fotoserie
async function resetPhotoBooth() {

    capturedPhotos = [];
    currentPhoto = null;
    currentPhotoIndex = 1;

    updateSeriesDisplay();

    resultArea.style.display =
        "none";

    captureArea.style.display =
        "flex";

    eventTitleDisplay.style.display =
        "block";

    seriesProgress.style.display =
        "block";

    video.style.display =
        "block";

    preview.style.display =
        "none";

    collagePreview.style.display =
        "none";

    document.getElementById(
        "cameraContainer"
    ).style.display =
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
}


newSeriesBtn.addEventListener(
    "click",
    async () => {

        if (!document.fullscreenElement) {
            await enableFullscreen();
        }

        await requestWakeLock();

        resetPhotoBooth();
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
