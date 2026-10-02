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
        frameBorderWidth: 4,
        frameRadius: 24,
        innerBorderWidth: 1.5,
        innerBorderColor: "rgba(255,255,255,0.72)",
        framePadding: 11,

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
        frameBorderWidth: 5,
        frameRadius: 28,
        innerBorderWidth: 1.8,
        innerBorderColor: "rgba(255,255,255,0.78)",
        framePadding: 12,

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
        frameBorderWidth: 2,
        frameRadius: 20,
        innerBorderWidth: 1.2,
        innerBorderColor: "rgba(255,255,255,0.68)",
        framePadding: 9,

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
        frameBorderWidth: 3,
        frameRadius: 26,
        innerBorderWidth: 1.4,
        innerBorderColor: "rgba(255,255,255,0.72)",
        framePadding: 10,

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
        frameBorderWidth: 3,
        frameRadius: 12,
        innerBorderWidth: 1.1,
        innerBorderColor: "rgba(255,255,255,0.60)",
        framePadding: 8,

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
    },

        businessPremium: {
        name: "Premium",
        theme: "business",
        photoCounts: [2, 3, 4],

        backgroundColor: "#2a2d32",
        textColor: "#f4f4f4",

        frameColor: "#ffffff",
        frameBorderColor: "#b89a72",
        frameBorderWidth: 3,
        frameRadius: 10,
        innerBorderWidth: 1.2,
        innerBorderColor: "rgba(255,255,255,0.58)",
        framePadding: 7,

        accentColors: [
            "#c6a36b",
            "#9b7b55",
            "#6f747a",
            "#858b91",
            "#d8d8d8",
            "#40454b"
    ],

    dateBgColor: "rgba(255,255,255,0.90)",
    dateTextColor: "#2a2d32",

    titleBgColor: "rgba(28,31,35,0.84)",

    titleFont:
        "bold 46px Arial, sans-serif"
}

};

let capturedPhotos = [];

let currentPhotoIndex = 1;

let currentPhoto = null;

let wakeLock = null;

let photoCardStickers = [];

let selectedStickerId = null;

let nextStickerId = 1;

let activeStickerPointers =
    new Map();

let stickerGesture =
    null;

let baseCollageDataUrl =
    null;

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

const printArea =
    document.getElementById(
        "printArea"
    );

const printPhoto =
    document.getElementById(
        "printPhoto"
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

const cameraSafeArea =
    document.getElementById(
        "cameraSafeArea"
    );

const emailBtn =
    document.getElementById(
        "emailBtn"
    );

const emailOverlay =
    document.getElementById(
        "emailOverlay"
    );

const guestEmailInput =
    document.getElementById(
        "guestEmailInput"
    );

const emailError =
    document.getElementById(
        "emailError"
    );

const emailCancelBtn =
    document.getElementById(
        "emailCancelBtn"
    );

const emailSaveBtn =
    document.getElementById(
        "emailSaveBtn"
    );

const emailRequestCount =
    document.getElementById(
        "emailRequestCount"
    );

const storageStatus =
    document.getElementById(
        "storageStatus"
    );

const showEmailRequestsBtn =
    document.getElementById(
        "showEmailRequestsBtn"
    );

const exportEmailRequestsBtn =
    document.getElementById(
        "exportEmailRequestsBtn"
    );

const exportAllEmailRequestsBtn =
    document.getElementById(
        "exportAllEmailRequestsBtn"
    );

const deleteAllEmailRequestsBtn =
    document.getElementById(
        "deleteAllEmailRequestsBtn"
    );

const emailRequestList =
    document.getElementById(
        "emailRequestList"
    );

const stickerBtn =
    document.getElementById(
        "stickerBtn"
    );

const stickerEditorOverlay =
    document.getElementById(
        "stickerEditorOverlay"
    );

const stickerEditorImage =
    document.getElementById(
        "stickerEditorImage"
    );

const stickerLayer =
    document.getElementById(
        "stickerLayer"
    );

const stickerChoices =
    document.querySelectorAll(
        ".stickerChoice"
    );

const deleteSelectedStickerBtn =
    document.getElementById(
        "deleteSelectedStickerBtn"
    );

const finishStickerEditorBtn =
    document.getElementById(
        "finishStickerEditorBtn"
    );

/* =========================
   INDEXEDDB
========================= */

const PHOTOBOOTH_DB_NAME =
    "photoboothDB";

const PHOTOBOOTH_DB_VERSION =
    1;

const EMAIL_STORE_NAME =
    "emailRequests";


function openPhotoBoothDatabase() {

    return new Promise(
        (resolve, reject) => {

            const request =
                indexedDB.open(
                    PHOTOBOOTH_DB_NAME,
                    PHOTOBOOTH_DB_VERSION
                );


            request.onupgradeneeded =
                event => {

                    const database =
                        event.target.result;

                    if (
                        !database.objectStoreNames
                            .contains(
                                EMAIL_STORE_NAME
                            )
                    ) {

                        const store =
                            database.createObjectStore(
                                EMAIL_STORE_NAME,
                                {
                                    keyPath: "id",
                                    autoIncrement: true
                                }
                            );

                        store.createIndex(
                            "email",
                            "email",
                            {
                                unique: false
                            }
                        );

                        store.createIndex(
                            "timestamp",
                            "timestamp",
                            {
                                unique: false
                            }
                        );
                    }
                };


            request.onsuccess =
                event => {

                    resolve(
                        event.target.result
                    );
                };


            request.onerror =
                event => {

                    reject(
                        event.target.error
                    );
                };
        }
    );
}


function canvasToJpegBlob() {

    return new Promise(
        (resolve, reject) => {

            collageCanvas.toBlob(
                blob => {

                    if (!blob) {

                        reject(
                            new Error(
                                "Fotokarte konnte nicht erstellt werden."
                            )
                        );

                        return;
                    }

                    resolve(blob);
                },
                "image/jpeg",
                0.95
            );
        }
    );
}


async function saveEmailRequest(
    email
) {

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

    const seconds =
        String(
            now.getSeconds()
        ).padStart(
            2,
            "0"
        );

    const fileName =
        `Photobooth_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.jpg`;


    const imageBlob =
        await canvasToJpegBlob();


    const database =
        await openPhotoBoothDatabase();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                database.transaction(
                    EMAIL_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    EMAIL_STORE_NAME
                );


            const request =
                store.add(
                    {
                        email:
                            email,

                        filename:
                            fileName,

                        timestamp:
                            now.toISOString(),

                        imageBlob:
                            imageBlob
                    }
                );


            request.onsuccess =
                () => {

                    resolve(
                        request.result
                    );
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };


            transaction.oncomplete =
                () => {

                    database.close();
                };
        }
    );
}

/* =========================
   E-MAIL-ANFRAGEN LESEN
========================= */

async function getEmailRequests() {

    const database =
        await openPhotoBoothDatabase();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                database.transaction(
                    EMAIL_STORE_NAME,
                    "readonly"
                );

            const store =
                transaction.objectStore(
                    EMAIL_STORE_NAME
                );

            const request =
                store.getAll();


            request.onsuccess =
                () => {

                    resolve(
                        request.result
                    );
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };


            transaction.oncomplete =
                () => {

                    database.close();
                };
        }
    );
}

/* =========================
   E-MAIL-ANFRAGE LÖSCHEN
========================= */

async function deleteEmailRequest(
    id
) {

    const database =
        await openPhotoBoothDatabase();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                database.transaction(
                    EMAIL_STORE_NAME,
                    "readwrite"
                );

            const store =
                transaction.objectStore(
                    EMAIL_STORE_NAME
                );


            const request =
                store.delete(
                    id
                );


            request.onsuccess =
                () => {

                    resolve();
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };


            transaction.oncomplete =
                () => {

                    database.close();
                };
        }
    );
}

/* =========================
   ALLE E-MAIL-ANFRAGEN LÖSCHEN
========================= */

async function deleteAllEmailRequests() {

    const database =
        await openPhotoBoothDatabase();


    return new Promise(
        (resolve, reject) => {

            const transaction =
                database.transaction(
                    EMAIL_STORE_NAME,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    EMAIL_STORE_NAME
                );


            const request =
                store.clear();


            request.onsuccess =
                () => {

                    resolve();
                };


            request.onerror =
                () => {

                    reject(
                        request.error
                    );
                };


            transaction.oncomplete =
                () => {

                    database.close();
                };
        }
    );
}

/* =========================
   ADMIN E-MAIL-ANZEIGE
========================= */

function downloadEmailPhoto(
    request
) {

    if (
        !request.imageBlob
    ) {

        alert(
            "Für diese Anfrage ist keine Fotokarte gespeichert."
        );

        return;
    }


    const url =
        URL.createObjectURL(
            request.imageBlob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;

    link.download =
        request.filename;


    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );
        },
        1000
    );
}

async function refreshEmailRequestCount() {

    try {

        const requests =
            await getEmailRequests();

        const count =
            requests.length;


        emailRequestCount.textContent =
            count === 1
                ? "1 gespeicherte Anfrage"
                : `${count} gespeicherte Anfragen`;

    } catch (error) {

        console.error(
            "E-Mail-Anfragen konnten nicht gelesen werden:",
            error
        );

        emailRequestCount.textContent =
            "E-Mail-Anfragen konnten nicht geladen werden.";
    }
}

function formatStorageSize(
    bytes
) {

    if (
        bytes < 1024 * 1024
    ) {

        return (
            bytes / 1024
        ).toFixed(1) + " KB";
    }


    if (
        bytes < 1024 * 1024 * 1024
    ) {

        return (
            bytes /
            (1024 * 1024)
        ).toFixed(1) + " MB";
    }


    return (
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(2) + " GB";
}

async function refreshStorageStatus() {

    try {

        const requests =
            await getEmailRequests();


        /*
            Größe aller gespeicherten
            Fotokarten berechnen
        */

        let photoStorage =
            0;


        requests.forEach(
            request => {

                if (
                    request.imageBlob
                ) {

                    photoStorage +=
                        request.imageBlob.size;
                }
            }
        );


        const photoCount =
            requests.length;


        /*
            Alte Warnklassen entfernen
        */

        storageStatus.classList.remove(
            "storageWarning",
            "storageDanger",
            "storageCritical"
        );


        /*
            Falls Browser keine
            Speicher-Schätzung unterstützt
        */

        if (
            !navigator.storage ||
            !navigator.storage.estimate
        ) {

            storageStatus.textContent =
                photoCount +
                " Fotokarten · " +
                formatStorageSize(
                    photoStorage
                ) +
                " gespeichert";

            return;
        }


        const estimate =
            await navigator.storage
                .estimate();


        const usage =
            estimate.usage || 0;

        const quota =
            estimate.quota || 0;


        let percent =
            0;


        if (
            quota > 0
        ) {

            percent =
                usage /
                quota *
                100;
        }


        /*
            Grundanzeige
        */

        let text =
            photoCount +
            " Fotokarten · " +
            formatStorageSize(
                photoStorage
            ) +
            " Fotokarten-Speicher";


        if (
            quota > 0
        ) {

            text +=
                "\nApp-Speicher: " +
                formatStorageSize(
                    usage
                ) +
                " von " +
                formatStorageSize(
                    quota
                ) +
                " (" +
                percent.toFixed(0) +
                " %)";
        }


        /*
            Warnstufen
        */

        if (
            percent >= 90
        ) {

            storageStatus.classList.add(
                "storageCritical"
            );

            text +=
                "\n⚠️ Speicher fast voll. Exportieren und alte Anfragen löschen.";

        } else if (
            percent >= 80
        ) {

            storageStatus.classList.add(
                "storageDanger"
            );

            text +=
                "\n⚠️ Speicher wird knapp.";

        } else if (
            percent >= 60
        ) {

            storageStatus.classList.add(
                "storageWarning"
            );

            text +=
                "\nSpeicher wird voller.";
        }


        storageStatus.textContent =
            text;


        /*
            Zeilenumbrüche anzeigen
        */

        storageStatus.style.whiteSpace =
            "pre-line";


    } catch (error) {

        console.error(
            "Speicherstatus konnte nicht gelesen werden:",
            error
        );

        storageStatus.textContent =
            "Speicherstatus konnte nicht ermittelt werden.";
    }
}

async function showEmailRequestList() {

    try {

        const requests =
            await getEmailRequests();


        emailRequestList.innerHTML =
            "";


        if (
            requests.length === 0
        ) {

            emailRequestList.innerHTML =
                "<div>Keine Anfragen gespeichert.</div>";

            emailRequestList.style.display =
                "block";

            return;
        }


        requests
            .sort(
                (a, b) =>
                    new Date(
                        b.timestamp
                    ) -
                    new Date(
                        a.timestamp
                    )
            )
            .forEach(
                request => {

                    const item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "emailRequestItem";


                    const address =
                        document.createElement(
                            "div"
                        );

                    address.className =
                        "emailRequestAddress";

                    address.textContent =
                        request.email;


                    const meta =
                        document.createElement(
                            "div"
                        );

                    meta.className =
                        "emailRequestMeta";


                    const date =
                        new Date(
                            request.timestamp
                        );


                    meta.textContent =
                        date.toLocaleString(
                            "de-DE"
                        ) +
                        " · " +
                        request.filename;


                    const downloadBtn =
                        document.createElement(
                            "button"
                        );

                    downloadBtn.className =
                        "emailPhotoDownloadBtn";

                    downloadBtn.textContent =
                        "📥 Fotokarte";


                    downloadBtn.addEventListener(
                        "click",
                        () => {

                            downloadEmailPhoto(
                                request
                            );
                        }
                    );


                    const deleteBtn =
                        document.createElement(
                            "button"
                        );

                    deleteBtn.className =
                        "emailRequestDeleteBtn";

                    deleteBtn.textContent =
                        "🗑️ Löschen";


                    deleteBtn.addEventListener(
                        "click",
                        async () => {

                            const confirmed =
                                confirm(
                                    "Diese E-Mail-Anfrage wirklich löschen?\n\n" +
                                    request.email +
                                    "\n" +
                                    request.filename
                                );


                            if (!confirmed) {
                                return;
                            }


                            try {

                                await deleteEmailRequest(
                                    request.id
                                );


                                await refreshEmailRequestCount();
                                await refreshStorageStatus();
                                await showEmailRequestList();

                            } catch (error) {

                                console.error(
                                    "E-Mail-Anfrage konnte nicht gelöscht werden:",
                                    error
                                );

                                alert(
                                    "Die Anfrage konnte nicht gelöscht werden."
                                );
                            }
                        }
                    );


                    item.appendChild(
                        address
                    );

                    item.appendChild(
                        meta
                    );

                    item.appendChild(
                        downloadBtn
                    );

                    item.appendChild(
                        deleteBtn
                    );


                    emailRequestList.appendChild(
                        item
                    );
                }
            );


        emailRequestList.style.display =
            "block";

    } catch (error) {

        console.error(
            "E-Mail-Liste konnte nicht angezeigt werden:",
            error
        );
    }
}


/* =========================
   E-MAIL CSV EXPORT
========================= */

function createEmailRequestsCsv(
    requests
) {

    const csvRows = [
        [
            "E-Mail",
            "Dateiname",
            "Zeitpunkt"
        ]
    ];


    requests.forEach(
        request => {

            csvRows.push(
                [
                    request.email,
                    request.filename,
                    request.timestamp
                ]
            );
        }
    );


    return csvRows
        .map(
            row =>
                row
                    .map(
                        value =>
                            `"${String(value)
                                .replace(
                                    /"/g,
                                    '""'
                                )}"`
                    )
                    .join(";")
        )
        .join("\n");
}

async function exportEmailRequestsCsv() {

    try {

        const requests =
            await getEmailRequests();


        if (
            requests.length === 0
        ) {

            alert(
                "Es sind keine E-Mail-Anfragen gespeichert."
            );

            return;
        }

const csvContent =
    createEmailRequestsCsv(
        requests
    );

        const blob =
            new Blob(
                [
                    "\uFEFF",
                    csvContent
                ],
                {
                    type:
                        "text/csv;charset=utf-8"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        const now =
            new Date();

        const date =
            now
                .toISOString()
                .slice(
                    0,
                    10
                );


        link.href =
            url;

        link.download =
            `Photobooth_E-Mail-Anfragen_${date}.csv`;


        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );


        URL.revokeObjectURL(
            url
        );

    } catch (error) {

        console.error(
            "CSV-Export fehlgeschlagen:",
            error
        );

        alert(
            "Die E-Mail-Liste konnte nicht exportiert werden."
        );
    }
}

showEmailRequestsBtn.addEventListener(
    "click",
    async () => {

        if (
            emailRequestList.style.display ===
            "block"
        ) {

            emailRequestList.style.display =
                "none";

            showEmailRequestsBtn.textContent =
                "📋 Liste anzeigen";

            return;
        }


        await showEmailRequestList();

        showEmailRequestsBtn.textContent =
            "📋 Liste ausblenden";
    }
);


exportEmailRequestsBtn.addEventListener(
    "click",
    exportEmailRequestsCsv
);

exportAllEmailRequestsBtn.addEventListener(
    "click",
    exportAllEmailRequests
);

deleteAllEmailRequestsBtn.addEventListener(
    "click",
    async () => {

        try {

            const requests =
                await getEmailRequests();


            if (
                requests.length === 0
            ) {

                alert(
                    "Es sind keine E-Mail-Anfragen gespeichert."
                );

                return;
            }


            const confirmed =
                confirm(
                    "ACHTUNG!\n\n" +
                    "Wirklich ALLE " +
                    requests.length +
                    " gespeicherten E-Mail-Anfragen löschen?\n\n" +
                    "Dabei werden auch alle zugehörigen Fotokarten gelöscht.\n\n" +
                    "Dieser Vorgang kann nicht rückgängig gemacht werden."
                );


            if (!confirmed) {
                return;
            }


            await deleteAllEmailRequests();
            await refreshEmailRequestCount();
            await refreshStorageStatus();


            emailRequestList.innerHTML =
                "<div>Keine Anfragen gespeichert.</div>";

            alert(
                "Alle E-Mail-Anfragen wurden gelöscht."
            );


        } catch (error) {

            console.error(
                "Alle E-Mail-Anfragen konnten nicht gelöscht werden:",
                error
            );


            alert(
                "Die E-Mail-Anfragen konnten nicht gelöscht werden."
            );
        }
    }
);

/* =========================
   KOMPLETTER E-MAIL-EXPORT
========================= */

async function exportAllEmailRequests() {

    try {

        const requests =
            await getEmailRequests();


        if (
            requests.length === 0
        ) {

            alert(
                "Es sind keine E-Mail-Anfragen gespeichert."
            );

            return;
        }


        if (
            typeof JSZip ===
            "undefined"
        ) {

            alert(
                "ZIP-Export ist momentan nicht verfügbar."
            );

            console.error(
                "JSZip wurde nicht geladen."
            );

            return;
        }


        exportAllEmailRequestsBtn.disabled =
            true;

        exportAllEmailRequestsBtn.textContent =
            "⏳ Export wird erstellt...";


        const zip =
            new JSZip();


        /*
            CSV erzeugen
        */

        const csvRows = [
            [
                "E-Mail",
                "Dateiname",
                "Zeitpunkt"
            ]
        ];


        requests.forEach(
            request => {

                csvRows.push(
                    [
                        request.email,
                        request.filename,
                        request.timestamp
                    ]
                );
            }
        );


        const csvContent =
            csvRows
                .map(
                    row =>
                        row
                            .map(
                                value =>
                                    `"${String(value)
                                        .replace(
                                            /"/g,
                                            '""'
                                        )}"`
                            )
                            .join(";")
                )
                .join("\n");


        zip.file(
            "E-Mail-Anfragen.csv",
            "\uFEFF" + csvContent
        );


        /*
            Ordner für Fotokarten
        */

        const photoFolder =
            zip.folder(
                "Fotokarten"
            );


        /*
            Bilder hinzufügen
        */

        requests.forEach(
            request => {

                if (
                    request.imageBlob
                ) {

                    photoFolder.file(
                        request.filename,
                        request.imageBlob
                    );
                }
            }
        );


        /*
            ZIP erzeugen
        */

        const zipBlob =
            await zip.generateAsync(
                {
                    type: "blob"
                }
            );


        const url =
            URL.createObjectURL(
                zipBlob
            );


        const link =
            document.createElement(
                "a"
            );


        const now =
            new Date();

        const date =
            now
                .toISOString()
                .slice(
                    0,
                    10
                );


        link.href =
            url;

        link.download =
            `Photobooth_E-Mail-Export_${date}.zip`;


        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );


        setTimeout(
            () => {

                URL.revokeObjectURL(
                    url
                );
            },
            1000
        );


    } catch (error) {

        console.error(
            "Kompletter E-Mail-Export fehlgeschlagen:",
            error
        );


        alert(
            "Der komplette Export konnte nicht erstellt werden."
        );

    } finally {

        exportAllEmailRequestsBtn.disabled =
            false;

        exportAllEmailRequestsBtn.textContent =
            "📦 Alles exportieren";
    }
}

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


        video.onloadedmetadata =
            () => {

                updateCameraSafeArea();
            };

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

function updateCameraSafeArea() {

    if (
        !video ||
        !cameraSafeArea
    ) {
        return;
    }


    const videoWidth =
        video.clientWidth;

    const videoHeight =
        video.clientHeight;


    if (
        videoWidth === 0 ||
        videoHeight === 0
    ) {
        return;
    }


    let targetRatio =
        500 / 275;


    // 2er-Layout
    if (
        settings.photoCount === 2
    ) {

        targetRatio =
            555 / 430;
    }


    // 3er-Layout:
    // Foto 1 + 2 = 500 x 275
    // Foto 3 = 700 x 325
    if (
        settings.photoCount === 3 &&
        currentPhotoIndex === 3
    ) {

        targetRatio =
            700 / 325;
    }


    const videoRatio =
        videoWidth /
        videoHeight;


    let safeWidth;
    let safeHeight;


    if (
        videoRatio >
        targetRatio
    ) {

        // Video ist breiter als das spätere Foto.
        // Links und rechts wird später abgeschnitten.

        safeHeight =
            videoHeight;

        safeWidth =
            safeHeight *
            targetRatio;

    } else {

        // Video ist höher als das spätere Foto.
        // Oben und unten wird später abgeschnitten.

        safeWidth =
            videoWidth;

        safeHeight =
            safeWidth /
            targetRatio;
    }


    cameraSafeArea.style.width =
        safeWidth + "px";

    cameraSafeArea.style.height =
        safeHeight + "px";
}

/* =========================
   FOTO AUFNEHMEN
========================= */

async function capturePhoto() {

    captureArea.classList.add(
        "shooting"
    );

    updateCameraSafeArea();

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

    captureArea.classList.remove(
        "shooting"
    );
    
    video.style.display =
        "none";

    cameraSafeArea.style.display =
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

        cameraSafeArea.style.display =
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
   FOTOKARTE SPEICHERN
========================= */

function savePhotoCard() {

    if (!collageCanvas) {
        return null;
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

    return fileName;
}


/* =========================
   BUTTON: SPEICHERN
========================= */

saveBtn.addEventListener(
    "click",
    () => {

        savePhotoCard();
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

        if (!collageCanvas) {
            return;
        }


        printPhoto.src =
            collageCanvas.toDataURL(
                "image/jpeg",
                0.95
            );


        window.print();
    }
);

/* =========================
   STICKER EDITOR
========================= */

function clampStickerValue(
    value,
    min,
    max
) {

    return Math.min(
        max,
        Math.max(
            min,
            value
        )
    );
}


function getPointerDistance(
    pointerA,
    pointerB
) {

    const dx =
        pointerB.x -
        pointerA.x;

    const dy =
        pointerB.y -
        pointerA.y;


    return Math.hypot(
        dx,
        dy
    );
}


function getPointerAngle(
    pointerA,
    pointerB
) {

    return Math.atan2(
        pointerB.y -
            pointerA.y,

        pointerB.x -
            pointerA.x
    );
}


function getPointerCenter(
    pointerA,
    pointerB
) {

    return {

        x:
            (
                pointerA.x +
                pointerB.x
            ) / 2,

        y:
            (
                pointerA.y +
                pointerB.y
            ) / 2
    };
}

function selectEditorSticker(
    stickerId
) {

    selectedStickerId =
        stickerId;


    document
        .querySelectorAll(
            ".editorSticker"
        )
        .forEach(
            element => {

                const elementId =
                    Number(
                        element.dataset
                            .stickerId
                    );


                element.classList.toggle(
                    "selected",
                    elementId ===
                        stickerId
                );
            }
        );
}

function startStickerPointer(
    event,
    sticker,
    element
) {

    event.preventDefault();
    event.stopPropagation();


    selectEditorSticker(
        sticker.id
    );


    try {

        element.setPointerCapture(
            event.pointerId
        );

    } catch (error) {

        console.log(
            "Pointer Capture nicht möglich:",
            error
        );
    }


activeStickerPointers.set(
    event.pointerId,
    {
        x:
            event.clientX,

        y:
            event.clientY
    }
);


const pointers =
    Array.from(
        activeStickerPointers
            .values()
    );


    const stageRect =
        stickerEditorImage
            .getBoundingClientRect();


    /*
        EIN FINGER
    */

    if (
        pointers.length === 1
    ) {

        const pointer =
            pointers[0];


        stickerGesture = {

            stickerId:
                sticker.id,

            mode:
                "move",

            startPointerX:
                pointer.x,

            startPointerY:
                pointer.y,

            startX:
                sticker.x,

            startY:
                sticker.y,

            stageWidth:
                stageRect.width,

            stageHeight:
                stageRect.height
        };


        return;
    }


    /*
        ZWEI FINGER
    */

    if (
        pointers.length === 2
    ) {

        const pointerA =
            pointers[0];

        const pointerB =
            pointers[1];


        const center =
            getPointerCenter(
                pointerA,
                pointerB
            );


        stickerGesture = {

            stickerId:
                sticker.id,

            mode:
                "transform",

            startDistance:
                getPointerDistance(
                    pointerA,
                    pointerB
                ),

            startAngle:
                getPointerAngle(
                    pointerA,
                    pointerB
                ),

            startCenterX:
                center.x,

            startCenterY:
                center.y,

            startX:
                sticker.x,

            startY:
                sticker.y,

            startSize:
                sticker.size,

            startRotation:
                sticker.rotation,

            stageWidth:
                stageRect.width,

            stageHeight:
                stageRect.height
        };
    }
}

function moveStickerPointer(
    event,
    sticker,
    element
) {

    if (
        !activeStickerPointers
            .has(
                event.pointerId
            )
    ) {

        return;
    }


    event.preventDefault();


activeStickerPointers.set(
    event.pointerId,
    {
        x:
            event.clientX,

        y:
            event.clientY
    }
);


    if (
        !stickerGesture ||
        stickerGesture.stickerId !==
            sticker.id
    ) {

        return;
    }


const pointers =
    Array.from(
        activeStickerPointers
            .values()
    );


    /*
        EIN FINGER:
        VERSCHIEBEN
    */

    if (
        pointers.length === 1 &&
        stickerGesture.mode ===
            "move"
    ) {

        const pointer =
            pointers[0];


        const deltaX =
            pointer.x -
            stickerGesture
                .startPointerX;

        const deltaY =
            pointer.y -
            stickerGesture
                .startPointerY;


        sticker.x =
            clampStickerValue(
                stickerGesture.startX +
                    deltaX /
                    stickerGesture
                        .stageWidth,
                0.02,
                0.98
            );


        sticker.y =
            clampStickerValue(
                stickerGesture.startY +
                    deltaY /
                    stickerGesture
                        .stageHeight,
                0.02,
                0.98
            );
    }


    /*
        ZWEI FINGER:
        BEWEGEN + SKALIEREN + DREHEN
    */

    if (
        pointers.length === 2 &&
        stickerGesture.mode ===
            "transform"
    ) {

        const pointerA =
            pointers[0];

        const pointerB =
            pointers[1];


        const currentDistance =
            getPointerDistance(
                pointerA,
                pointerB
            );


        const currentAngle =
            getPointerAngle(
                pointerA,
                pointerB
            );


        const currentCenter =
            getPointerCenter(
                pointerA,
                pointerB
            );


        /*
            SKALIERUNG
        */

        if (
            stickerGesture
                .startDistance > 0
        ) {

            const scale =
                currentDistance /
                stickerGesture
                    .startDistance;


            sticker.size =
                clampStickerValue(
                    stickerGesture
                        .startSize *
                        scale,
                    0.04,
                    0.22
                );
        }


        /*
            DREHUNG
        */

        let angleDifference =
            currentAngle -
            stickerGesture
                .startAngle;


        /*
            Winkelsprung bei +/- PI
            verhindern
        */

        if (
            angleDifference >
            Math.PI
        ) {

            angleDifference -=
                Math.PI * 2;
        }


        if (
            angleDifference <
            -Math.PI
        ) {

            angleDifference +=
                Math.PI * 2;
        }


        sticker.rotation =
            stickerGesture
                .startRotation +
            angleDifference *
                180 /
                Math.PI;


        /*
            ZWEI-FINGER-BEWEGUNG
        */

        const centerDeltaX =
            currentCenter.x -
            stickerGesture
                .startCenterX;

        const centerDeltaY =
            currentCenter.y -
            stickerGesture
                .startCenterY;


        sticker.x =
            clampStickerValue(
                stickerGesture.startX +
                    centerDeltaX /
                    stickerGesture
                        .stageWidth,
                0.02,
                0.98
            );


        sticker.y =
            clampStickerValue(
                stickerGesture.startY +
                    centerDeltaY /
                    stickerGesture
                        .stageHeight,
                0.02,
                0.98
            );
    }


    /*
        Nur diesen Sticker
        visuell aktualisieren
    */

element.style.left =
    sticker.x * 100 + "%";


element.style.top =
    sticker.y * 100 + "%";


const stickerPixelSize =
    sticker.size *
    stickerEditorImage
        .clientWidth;


element.style.width =
    stickerPixelSize + "px";


element.style.height =
    stickerPixelSize + "px";


element.style.transform =
    `translate(-50%, -50%) rotate(${sticker.rotation}deg)`;

}
    
function endStickerPointer(
    event,
    sticker
) {

    activeStickerPointers.delete(
        event.pointerId
    );


    const pointers =
        Array.from(
            activeStickerPointers
                .values()
        );


    /*
        Kein Finger mehr:
        Geste beendet
    */

    if (
        pointers.length === 0
    ) {

        stickerGesture =
            null;

        return;
    }


    /*
        Nach Zwei-Finger-Geste
        bleibt noch ein Finger liegen.

        Dann direkt eine neue
        Ein-Finger-Bewegung starten.
    */

    if (
        pointers.length === 1
    ) {

        const pointer =
            pointers[0];


        const stageRect =
            stickerEditorImage
                .getBoundingClientRect();


        stickerGesture = {

            stickerId:
                sticker.id,

            mode:
                "move",

            startPointerX:
                pointer.x,

            startPointerY:
                pointer.y,

            startX:
                sticker.x,

            startY:
                sticker.y,

            stageWidth:
                stageRect.width,

            stageHeight:
                stageRect.height
        };
    }
}

function renderStickerEditor() {

    stickerLayer.innerHTML =
        "";


    photoCardStickers.forEach(
        sticker => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "editorSticker";


            if (
                sticker.id ===
                selectedStickerId
            ) {

                element.classList.add(
                    "selected"
                );
            }


const stickerPixelSize =
    sticker.size *
    stickerEditorImage.clientWidth;


element.style.left =
    sticker.x * 100 + "%";


element.style.top =
    sticker.y * 100 + "%";


element.style.width =
    stickerPixelSize + "px";


element.style.height =
    stickerPixelSize + "px";


element.style.transform =
    `translate(-50%, -50%) rotate(${sticker.rotation}deg)`;


element.dataset.stickerId =
    sticker.id;


const image =
    document.createElement(
        "img"
    );


image.src =
    sticker.src;


image.alt =
    "Sticker";


element.appendChild(
    image
);


element.addEventListener(
    "pointerdown",
    event => {

        startStickerPointer(
            event,
            sticker,
            element
        );
    }
);


element.addEventListener(
    "pointermove",
    event => {

        moveStickerPointer(
            event,
            sticker,
            element
        );
    }
);


element.addEventListener(
    "pointerup",
    event => {

        endStickerPointer(
            event,
            sticker
        );
    }
);


element.addEventListener(
    "pointercancel",
    event => {

        endStickerPointer(
            event,
            sticker
        );
    }
);


            stickerLayer.appendChild(
                element
            );
        }
    );
}

stickerEditorImage.addEventListener(
    "pointerdown",
    event => {

        /*
            Nur als zweiter Finger
            einer bereits laufenden
            Sticker-Geste verwenden.
        */

        if (
            selectedStickerId === null ||
            activeStickerPointers.size !== 1
        ) {

            return;
        }


        const sticker =
            photoCardStickers.find(
                item =>
                    item.id ===
                    selectedStickerId
            );


        if (!sticker) {
            return;
        }


        const element =
            document.querySelector(
                `.editorSticker[data-sticker-id="${sticker.id}"]`
            );


        if (!element) {
            return;
        }


        event.preventDefault();


        try {

            stickerEditorImage
                .setPointerCapture(
                    event.pointerId
                );

        } catch (error) {

            console.log(
                "Zweiter Pointer konnte nicht übernommen werden:",
                error
            );
        }


        activeStickerPointers.set(
            event.pointerId,
            {
                x:
                    event.clientX,

                y:
                    event.clientY
            }
        );


        const pointers =
            Array.from(
                activeStickerPointers
                    .values()
            );


        if (
            pointers.length !== 2
        ) {

            return;
        }


        const pointerA =
            pointers[0];

        const pointerB =
            pointers[1];


        const center =
            getPointerCenter(
                pointerA,
                pointerB
            );


        const stageRect =
            stickerEditorImage
                .getBoundingClientRect();


        stickerGesture = {

            stickerId:
                sticker.id,

            mode:
                "transform",

            startDistance:
                getPointerDistance(
                    pointerA,
                    pointerB
                ),

            startAngle:
                getPointerAngle(
                    pointerA,
                    pointerB
                ),

            startCenterX:
                center.x,

            startCenterY:
                center.y,

            startX:
                sticker.x,

            startY:
                sticker.y,

            startSize:
                sticker.size,

            startRotation:
                sticker.rotation,

            stageWidth:
                stageRect.width,

            stageHeight:
                stageRect.height
        };
    }
);


stickerEditorImage.addEventListener(
    "pointermove",
    event => {

        if (
            !activeStickerPointers.has(
                event.pointerId
            )
        ) {

            return;
        }


        if (
            !stickerGesture ||
            stickerGesture.mode !==
                "transform"
        ) {

            return;
        }


        const sticker =
            photoCardStickers.find(
                item =>
                    item.id ===
                    stickerGesture.stickerId
            );


        if (!sticker) {
            return;
        }


        const element =
            document.querySelector(
                `.editorSticker[data-sticker-id="${sticker.id}"]`
            );


        if (!element) {
            return;
        }


        moveStickerPointer(
            event,
            sticker,
            element
        );
    }
);


function endStickerImagePointer(
    event
) {

    if (
        !activeStickerPointers.has(
            event.pointerId
        )
    ) {

        return;
    }


    const sticker =
        photoCardStickers.find(
            item =>
                item.id ===
                selectedStickerId
        );


    if (!sticker) {

        activeStickerPointers.delete(
            event.pointerId
        );

        return;
    }


    endStickerPointer(
        event,
        sticker
    );
}


stickerEditorImage.addEventListener(
    "pointerup",
    endStickerImagePointer
);


stickerEditorImage.addEventListener(
    "pointercancel",
    endStickerImagePointer
);

stickerBtn.addEventListener(
    "click",
    () => {

stickerEditorImage.src =
    baseCollageDataUrl ||
    collagePreview.src;


        stickerEditorOverlay
            .style.display =
            "flex";


        selectedStickerId =
            null;

        activeStickerPointers.clear();

        stickerGesture =
            null;

        requestAnimationFrame(
            () => {

                renderStickerEditor();
            }
        );
    }
);

stickerChoices.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const stickerSrc =
                    button.dataset.stickerSrc;


                const sticker = {

                    id:
                        nextStickerId++,

                    src:
                        stickerSrc,

                    x:
                        0.5,

                    y:
                        0.5,

                    size:
                        0.11,

                    rotation:
                        0
                };


                photoCardStickers.push(
                    sticker
                );


                selectedStickerId =
                    sticker.id;


                renderStickerEditor();
            }
        );
    }
);

deleteSelectedStickerBtn.addEventListener(
    "click",
    () => {

        if (
            selectedStickerId ===
            null
        ) {

            return;
        }


        photoCardStickers =
            photoCardStickers.filter(
                sticker =>
                    sticker.id !==
                    selectedStickerId
            );


        selectedStickerId =
            null;


        renderStickerEditor();
    }
);

function loadStickerImage(
    src
) {

    return new Promise(
        (resolve, reject) => {

            const image =
                new Image();


            image.onload =
                () => {
                    resolve(image);
                };


            image.onerror =
                () => {
                    reject(
                        new Error(
                            "Sticker konnte nicht geladen werden: " +
                            src
                        )
                    );
                };


            image.src =
                src;
        }
    );
}


async function renderCollageWithStickers() {

    if (!baseCollageDataUrl) {
        return;
    }


    const ctx =
        collageCanvas.getContext(
            "2d"
        );


    /*
        Zuerst immer wieder
        die saubere Basis laden
    */

    const baseImage =
        await loadStickerImage(
            baseCollageDataUrl
        );


    ctx.clearRect(
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
    );


    ctx.drawImage(
        baseImage,
        0,
        0,
        collageCanvas.width,
        collageCanvas.height
    );


    /*
        Danach alle Sticker
        neu darüberzeichnen
    */

    for (
        const sticker of
        photoCardStickers
    ) {

        try {

            const image =
                await loadStickerImage(
                    sticker.src
                );


            const centerX =
                sticker.x *
                collageCanvas.width;


            const centerY =
                sticker.y *
                collageCanvas.height;


            /*
                sticker.size bezieht sich
                auf die Breite der Fotokarte.
            */

            const boxSize =
                sticker.size *
                collageCanvas.width;


            /*
                Seitenverhältnis des PNG
                erhalten
            */

            const imageRatio =
                image.naturalWidth /
                image.naturalHeight;


            let drawWidth;
            let drawHeight;


            if (
                imageRatio >= 1
            ) {

                drawWidth =
                    boxSize;

                drawHeight =
                    boxSize /
                    imageRatio;

            } else {

                drawHeight =
                    boxSize;

                drawWidth =
                    boxSize *
                    imageRatio;
            }


            ctx.save();


            ctx.translate(
                centerX,
                centerY
            );


            ctx.rotate(
                sticker.rotation *
                Math.PI /
                180
            );


            ctx.drawImage(
                image,

                -drawWidth / 2,
                -drawHeight / 2,

                drawWidth,
                drawHeight
            );


            ctx.restore();

        } catch (error) {

            console.error(
                "Sticker konnte nicht gezeichnet werden:",
                sticker.src,
                error
            );
        }
    }


    /*
        Fertige Fotokarte
        als Vorschau anzeigen
    */

    collagePreview.src =
        collageCanvas.toDataURL(
            "image/jpeg",
            0.95
        );
}

finishStickerEditorBtn.addEventListener(
    "click",
    async () => {

        finishStickerEditorBtn.disabled =
            true;


        try {

            await renderCollageWithStickers();


            selectedStickerId =
                null;


            activeStickerPointers.clear();


            stickerGesture =
                null;


            stickerEditorOverlay
                .style.display =
                "none";


        } catch (error) {

            console.error(
                "Sticker konnten nicht übernommen werden:",
                error
            );


        } finally {

            finishStickerEditorBtn.disabled =
                false;
        }
    }
);

/* =========================
   E-MAIL OVERLAY
========================= */

emailBtn.addEventListener(
    "click",
    () => {

        guestEmailInput.value =
            "";

        emailError.style.display =
            "none";

        emailOverlay.style.display =
            "flex";

        guestEmailInput.focus();
    }
);


emailCancelBtn.addEventListener(
    "click",
    () => {

        emailOverlay.style.display =
            "none";
    }
);

emailSaveBtn.addEventListener(
    "click",
    async () => {

        const email =
            guestEmailInput.value
                .trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (
            email === "" ||
            !emailPattern.test(email)
        ) {

            emailError.textContent =
                "Bitte eine gültige E-Mail-Adresse eingeben.";

            emailError.style.color =
                "#c00000";

            emailError.style.display =
                "block";

            guestEmailInput.focus();

            return;
        }


        emailError.style.display =
            "none";

        emailSaveBtn.disabled =
            true;


        try {

            await saveEmailRequest(
                email
            );

            await refreshStorageStatus();

            /*
                Kurze Bestätigung
                direkt im Overlay
            */

            emailError.textContent =
                "✓ Fotokarte wurde gespeichert.";

            emailError.style.color =
                "#16803a";

            emailError.style.display =
                "block";


            guestEmailInput.value =
                "";


            setTimeout(
                () => {

                    emailOverlay.style.display =
                        "none";

                    emailError.style.display =
                        "none";

                    emailError.style.color =
                        "#c00000";

                    emailError.textContent =
                        "Bitte eine gültige E-Mail-Adresse eingeben.";

                    emailSaveBtn.disabled =
                        false;
                },
                1200
            );


        } catch (error) {

            console.error(
                "E-Mail-Anfrage konnte nicht gespeichert werden:",
                error
            );


            emailError.textContent =
                "Speichern fehlgeschlagen. Bitte erneut versuchen.";

            emailError.style.color =
                "#c00000";

            emailError.style.display =
                "block";

            emailSaveBtn.disabled =
                false;
        }
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

            cameraSafeArea.style.display =
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

    ctx.save();


    // sehr dezente Hintergrundpunkte
    ctx.fillStyle =
        "rgba(210,195,205,0.16)";

    const dots = [
        [90, 120, 16],
        [160, 95, 11],
        [canvasWidth - 90, 120, 16],
        [canvasWidth - 160, 95, 11],
        [110, canvasHeight - 95, 13],
        [canvasWidth - 110, canvasHeight - 95, 13]
    ];

    dots.forEach(
        ([x, y, r]) => {

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                r,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );


    // feine Bögen oben links
    ctx.strokeStyle =
        "rgba(185,160,175,0.42)";

    ctx.lineWidth =
        2;

    ctx.beginPath();

    ctx.arc(
        130,
        145,
        90,
        Math.PI * 1.08,
        Math.PI * 1.85
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
        130,
        145,
        66,
        Math.PI * 1.12,
        Math.PI * 1.8
    );

    ctx.stroke();


    // feine Bögen oben rechts
    ctx.beginPath();

    ctx.arc(
        canvasWidth - 130,
        145,
        90,
        Math.PI * 1.15,
        Math.PI * 1.92
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
        canvasWidth - 130,
        145,
        66,
        Math.PI * 1.2,
        Math.PI * 1.88
    );

    ctx.stroke();


 // kleine Akzentpunkte
ctx.fillStyle =
    "rgba(205,175,120,0.55)";

[
    [325, canvasHeight - 85],
    [canvasWidth - 325, canvasHeight - 85]
].forEach(
    ([x, y]) => {

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
);


// HIER DIE BLASEN EINFÜGEN

const bubbles = [
    {
        x: 150,
        y: canvasHeight - 110,
        r: 42,
        color: "rgba(216,180,198,0.12)"
    },
    {
        x: 235,
        y: canvasHeight - 70,
        r: 28,
        color: "rgba(201,182,207,0.12)"
    },
    {
        x: canvasWidth - 155,
        y: canvasHeight - 105,
        r: 44,
        color: "rgba(216,180,198,0.12)"
    },
    {
        x: canvasWidth - 245,
        y: canvasHeight - 65,
        r: 30,
        color: "rgba(201,182,207,0.12)"
    }
];

bubbles.forEach(
    bubble => {

        ctx.beginPath();

        ctx.fillStyle =
            bubble.color;

        ctx.arc(
            bubble.x,
            bubble.y,
            bubble.r,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
);


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
   RING- & HERZ-MOTIV HOCHZEIT
========================= */

function drawWeddingRingMotif(
    ctx,
    centerX,
    centerY,
    scale = 1
) {

    ctx.save();

    ctx.lineWidth =
        3 * scale;

    ctx.strokeStyle =
        "rgba(207,174,120,0.9)";

    ctx.beginPath();

    ctx.arc(
        centerX - 16 * scale,
        centerY + 4 * scale,
        18 * scale,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
        centerX + 10 * scale,
        centerY - 4 * scale,
        18 * scale,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.fillStyle =
        "rgba(255,255,255,0.95)";

    ctx.beginPath();

    ctx.arc(
        centerX + 22 * scale,
        centerY - 16 * scale,
        4 * scale,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();
}

function drawWeddingHeartMotif(
    ctx,
    centerX,
    centerY,
    scale = 1
) {

    function drawHeart(
        x,
        y,
        size,
        fillColor,
        strokeColor
    ) {

        ctx.save();

        ctx.beginPath();

        ctx.moveTo(
            x,
            y + size * 0.3
        );

        ctx.bezierCurveTo(
            x,
            y,
            x - size * 0.5,
            y,
            x - size * 0.5,
            y + size * 0.3
        );

        ctx.bezierCurveTo(
            x - size * 0.5,
            y + size * 0.6,
            x,
            y + size * 0.8,
            x,
            y + size
        );

        ctx.bezierCurveTo(
            x,
            y + size * 0.8,
            x + size * 0.5,
            y + size * 0.6,
            x + size * 0.5,
            y + size * 0.3
        );

        ctx.bezierCurveTo(
            x + size * 0.5,
            y,
            x,
            y,
            x,
            y + size * 0.3
        );

        ctx.closePath();

        ctx.fillStyle =
            fillColor;

        ctx.fill();

        ctx.strokeStyle =
            strokeColor;

        ctx.lineWidth =
            1.8 * scale;

        ctx.stroke();

        ctx.restore();
    }


    ctx.save();

    drawHeart(
        centerX - 12 * scale,
        centerY - 16 * scale,
        24 * scale,
        "rgba(217,166,176,0.90)",
        "rgba(190,135,150,0.70)"
    );

    drawHeart(
        centerX + 10 * scale,
        centerY - 22 * scale,
        24 * scale,
        "rgba(232,199,197,0.95)",
        "rgba(190,150,160,0.65)"
    );

    // kleine Glanzpunkte
    ctx.fillStyle =
        "rgba(255,255,255,0.8)";

    ctx.beginPath();
    ctx.arc(
        centerX - 18 * scale,
        centerY - 7 * scale,
        2.5 * scale,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        centerX + 5 * scale,
        centerY - 12 * scale,
        2.5 * scale,
        0,
        Math.PI * 2
    );
    ctx.fill();

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

const topLineY =
    126;

const bottomLineY =
    749;

const bottomLineStartX =
    80;

const bottomLineEndX =
    875;


// obere Linie
ctx.strokeStyle =
    colors[1];

ctx.globalAlpha =
    0.55;

ctx.lineWidth =
    4;

ctx.beginPath();

ctx.moveTo(
    60,
    topLineY
);

ctx.lineTo(
    canvasWidth - 60,
    topLineY
);

ctx.stroke();


// untere Linie nur bei 2 oder 4 Fotos
if (
    settings.photoCount !== 3
) {

    ctx.beginPath();

    ctx.moveTo(
        bottomLineStartX,
        bottomLineY
    );

    ctx.lineTo(
        bottomLineEndX,
        bottomLineY
    );

    ctx.stroke();
}
    
ctx.restore();

}

/* =========================
   BUSINESS PREMIUM DESIGN
========================= */

function drawBusinessPremiumDecoration(
    ctx,
    canvasWidth,
    canvasHeight,
    design
) {

    const colors =
        design.accentColors;


    ctx.save();

    // feine diagonale Linien im Hintergrund
    ctx.strokeStyle =
        "rgba(255,255,255,0.05)";

    ctx.lineWidth =
        2;

    for (
        let i = -200;
        i < canvasWidth + 200;
        i += 80
    ) {

        ctx.beginPath();

        ctx.moveTo(
            i,
            0
        );

        ctx.lineTo(
            i + 220,
            canvasHeight
        );

        ctx.stroke();
    }


    // große transparente Flächen
    const panels = [
        {
            x: 55,
            y: 120,
            w: 160,
            h: 90,
            color: "rgba(255,255,255,0.04)"
        },
        {
            x: canvasWidth - 240,
            y: 135,
            w: 170,
            h: 100,
            color: "rgba(255,255,255,0.045)"
        },
        {
            x: 80,
            y: canvasHeight - 180,
            w: 210,
            h: 95,
            color: "rgba(255,255,255,0.035)"
        },
        {
            x: canvasWidth - 285,
            y: canvasHeight - 195,
            w: 220,
            h: 110,
            color: "rgba(255,255,255,0.04)"
        }
    ];

    panels.forEach(
        panel => {

            ctx.fillStyle =
                panel.color;

            ctx.fillRect(
                panel.x,
                panel.y,
                panel.w,
                panel.h
            );
        }
    );


    // Positionen für die Linien
    const topLineY =
        126;

    const bottomLineY =
        749;

    const bottomLineStartX =
        80;

    const bottomLineEndX =
        875;


    // feine Rahmenlinien oben und unten
    ctx.strokeStyle =
        "rgba(198,163,107,0.30)";
    
    ctx.lineWidth =
        2;


    // obere Linie
    ctx.beginPath();

    ctx.moveTo(
        60,
        topLineY
    );

    ctx.lineTo(
        canvasWidth - 60,
        topLineY
    );

    ctx.stroke();


// untere Linie nur bei 2 oder 4 Fotos
if (
    settings.photoCount !== 3
) {

    ctx.beginPath();

    ctx.moveTo(
        bottomLineStartX,
        bottomLineY
    );

    ctx.lineTo(
        bottomLineEndX,
        bottomLineY
    );

    ctx.stroke();
}

        
    // kurze goldene Akzentlinien
    ctx.strokeStyle =
        "rgba(198,163,107,0.65)";

    ctx.lineWidth =
        4;


    // kurzer Goldakzent oben links
    ctx.beginPath();

    ctx.moveTo(
        95,
        topLineY
    );

    ctx.lineTo(
        205,
        topLineY
    );

    ctx.stroke();


    // kurzer Goldakzent unten kurz vor dem Datum
    ctx.beginPath();

    ctx.moveTo(
        735,
        bottomLineY
    );

    ctx.lineTo(
        855,
        bottomLineY
    );

    ctx.stroke();


    // kleine Akzentpunkte
    ctx.fillStyle =
        "rgba(198,163,107,0.75)";

    const dots = [
        [230, topLineY],
        [canvasWidth - 95, topLineY],
        [95, bottomLineY],
        [bottomLineEndX, bottomLineY]
    ];

    dots.forEach(
        ([x, y]) => {

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                4,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    );


    // dezente kleine Rechteckgruppen
    const blocks = [
        {
            x: canvasWidth - 170,
            y: 78
        },
        {
            x: 85,
            y: canvasHeight - 155
        }
    ];

    blocks.forEach(
        block => {

            for (
                let i = 0;
                i < 3;
                i++
            ) {

                ctx.fillStyle =
                    i === 1
                        ? "rgba(198,163,107,0.18)"
                        : "rgba(255,255,255,0.06)";

                ctx.fillRect(
                    block.x + i * 18,
                    block.y + i * 10,
                    12,
                    12
                );
            }
        }
    );


    ctx.restore();
}


/* =========================
   FOTO-RAHMEN
========================= */

function roundedRectPath(
    ctx,
    x,
    y,
    w,
    h,
    r
) {

    const radius = Math.min(
        r,
        w / 2,
        h / 2
    );

    ctx.beginPath();

    ctx.moveTo(
        x + radius,
        y
    );

    ctx.lineTo(
        x + w - radius,
        y
    );

    ctx.quadraticCurveTo(
        x + w,
        y,
        x + w,
        y + radius
    );

    ctx.lineTo(
        x + w,
        y + h - radius
    );

    ctx.quadraticCurveTo(
        x + w,
        y + h,
        x + w - radius,
        y + h
    );

    ctx.lineTo(
        x + radius,
        y + h
    );

    ctx.quadraticCurveTo(
        x,
        y + h,
        x,
        y + h - radius
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


function drawPhotoFrame(
    ctx,
    img,
    frame
) {

    const outerRadius =
        frame.frameRadius || 22;

    const borderWidth =
        frame.frameBorderWidth || 4;

    const padding =
        frame.framePadding || 14;

    const innerBorderWidth =
        frame.innerBorderWidth || 1.5;

    const innerBorderColor =
        frame.innerBorderColor ||
        "rgba(255,255,255,0.72)";


    const innerX =
        frame.x + padding;

    const innerY =
        frame.y + padding;

    const innerW =
        frame.w - padding * 2;

    const innerH =
        frame.h - padding * 2;


    const innerRadius =
        Math.max(
            6,
            outerRadius - padding * 0.55
        );


    // äußerer Rahmen mit Schatten
    ctx.save();

    ctx.shadowColor =
        "rgba(0, 0, 0, 0.22)";

    ctx.shadowBlur =
        14;

    ctx.shadowOffsetX =
        0;

    ctx.shadowOffsetY =
        6;

    fillRoundedRect(
        ctx,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        outerRadius,
        frame.frameColor
    );

    ctx.restore();


    // äußerer Rahmenrand
    strokeRoundedRect(
        ctx,
        frame.x,
        frame.y,
        frame.w,
        frame.h,
        outerRadius,
        frame.frameBorderColor,
        borderWidth
    );


    const imageRatio =
        img.width / img.height;

    const frameRatio =
        innerW / innerH;

    let drawWidth;
    let drawHeight;
    let offsetX = 0;
    let offsetY = 0;


    if (imageRatio > frameRatio) {

        drawHeight = innerH;

        drawWidth =
            innerH * imageRatio;

        offsetX =
            (drawWidth - innerW) / 2;

    } else {

        drawWidth = innerW;

        drawHeight =
            innerW / imageRatio;

        const verticalOverflow =
            drawHeight - innerH;

        offsetY =
            verticalOverflow * 0.40;
    }


    // Foto innerhalb eines passenden, abgerundeten Innenbereichs
    ctx.save();

    roundedRectPath(
        ctx,
        innerX,
        innerY,
        innerW,
        innerH,
        innerRadius
    );

    ctx.clip();

    ctx.drawImage(
        img,
        innerX - offsetX,
        innerY - offsetY,
        drawWidth,
        drawHeight
    );

    ctx.restore();


    // feiner Innenrahmen
    strokeRoundedRect(
        ctx,
        innerX,
        innerY,
        innerW,
        innerH,
        innerRadius,
        innerBorderColor,
        innerBorderWidth
    );
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
   } else if (
        settings.cardDesign ===
        "businessPremium"
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
            "#23262b"
        );

        gradient.addColorStop(
            0.55,
            "#353940"
        );

        gradient.addColorStop(
            1,
            "#1f2227"
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
    

    } else if (
        settings.cardDesign ===
        "businessPremium"
    ) {

    drawBusinessPremiumDecoration(
        ctx,
        collageCanvas.width,
        collageCanvas.height,
        design
    );
}


    /* =========================
       TITEL-BANNER
    ========================= */

let titleX = 150;
let titleY = 20;
let titleW = 900;
let titleH = 78;
let titleRadius = 32;

const titleBackground =
    design.titleBgColor
        ? design.titleBgColor
        : "rgba(255,255,255,0.88)";

let titleBorderColor =
    "rgba(255,255,255,0.95)";

let titleBorderWidth =
    2;


// Elegant bekommt einen ruhigeren,
// schmaleren Titelbereich
if (
    settings.cardDesign ===
    "weddingElegant"
) {

    titleX = 245;
    titleY = 24;
    titleW = 710;
    titleH = 68;
    titleRadius = 28;

    titleBorderColor =
        "rgba(170,150,165,0.32)";

    titleBorderWidth =
        1;
}


// Floral bleibt romantischer
if (
    settings.cardDesign ===
    "weddingFloral"
) {

    titleX = 190;
    titleY = 22;
    titleW = 820;
    titleH = 74;
    titleRadius = 34;

    titleBorderColor =
        "rgba(207,174,120,0.55)";

    titleBorderWidth =
        1.5;
}

// Premium bekommt einen edleren,
// etwas kantigeren Titelbereich
if (
    settings.cardDesign ===
    "businessPremium"
) {

    titleX = 180;
    titleY = 22;
    titleW = 840;
    titleH = 72;
    titleRadius = 14;

    titleBorderColor =
        "rgba(198,163,107,0.78)";

    titleBorderWidth =
        2;
}    

fillRoundedRect(
    ctx,
    titleX,
    titleY,
    titleW,
    titleH,
    titleRadius,
    titleBackground
);


strokeRoundedRect(
    ctx,
    titleX,
    titleY,
    titleW,
    titleH,
    titleRadius,
    titleBorderColor,
    titleBorderWidth
);

if (
    settings.cardDesign ===
    "businessPremium"
) {

    ctx.save();

    ctx.fillStyle =
        "rgba(198,163,107,0.85)";

    // links
    ctx.fillRect(
        titleX + 24,
        titleY + titleH / 2 - 3,
        46,
        6
    );

    ctx.fillRect(
        titleX + 78,
        titleY + titleH / 2 - 3,
        8,
        6
    );


    // rechts
    ctx.fillRect(
        titleX + titleW - 70,
        titleY + titleH / 2 - 3,
        46,
        6
    );

    ctx.fillRect(
        titleX + titleW - 86,
        titleY + titleH / 2 - 3,
        8,
        6
    );

    ctx.restore();
}
    
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
    titleY + titleH / 2
);


// Floral bekommt Herzen & Elegant Ringe
    
if (
    settings.cardDesign ===
    "weddingElegant"
) {

    drawWeddingRingMotif(
        ctx,
        titleX + titleW - 88,
        titleY + titleH / 2 + 1,
        0.82
    );
}


if (
    settings.cardDesign ===
    "weddingFloral"
) {

    drawWeddingHeartMotif(
        ctx,
        titleX + titleW - 88,
        titleY + titleH / 2 + 4,
        0.98
    );
}


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
    x: 150,
    y: 450,
    w: 700,
    h: 325
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
                        design.frameBorderColor,

                    frameBorderWidth:
                        design.frameBorderWidth,

                    frameRadius:
                        design.frameRadius,

                    framePadding:
                        design.framePadding,

                    innerBorderWidth:
                        design.innerBorderWidth,

                    innerBorderColor:
                        design.innerBorderColor
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

baseCollageDataUrl =
    collageCanvas.toDataURL(
        "image/jpeg",
        0.95
    );


collagePreview.src =
    baseCollageDataUrl;


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

    photoCardStickers =
        [];

    selectedStickerId =
        null;

    nextStickerId =
        1;

    baseCollageDataUrl =
    null;
    
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

    cameraSafeArea.style.display =
        "block";

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

    updateCameraSafeArea();
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

        refreshEmailRequestCount();
        refreshStorageStatus();

        emailRequestList.style.display =
            "none";

        showEmailRequestsBtn.textContent =
            "📋 Liste anzeigen";


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
