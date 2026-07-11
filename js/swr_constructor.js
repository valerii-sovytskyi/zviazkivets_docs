const config = {
    "5G8": {
        freqs: {
            A: ['5865', '5845', '5825', '5805', '5785', '5765', '5745', '5725'],
            B: ['5733', '5752', '5771', '5790', '5809', '5828', '5847', '5866'],
            E: ['5705', '5685', '5665', '5645', '5885', '5905', '5925', '5945'],
            F: ['5740', '5760', '5780', '5800', '5820', '5840', '5860', '5880'],
            R: ['5658', '5695', '5732', '5769', '5806', '5843', '5880', '5917'],
            L: ['5362', '5399', '5436', '5473', '5510', '5547', '5584', '5621'],
            X: ['4990', '5020', '5050', '5080', '5110', '5140', '5170', '5200'],
            Y: ['4870', '4900', '4930', '4960', '5226', '5252', '5278', '5304'],
            H: ['5653', '5693', '5733', '5773', '5813', '5853', '5893', '5933'],
            M: ['5333', '5373', '5413', '5453', '5493', '5533', '5573', '5613'],
            U: ['5325', '5348', '5366', '5384', '5402', '5420', '5438', '5456'],
            O: ['5474', '5492', '5510', '5528', '5546', '5564', '5582', '5600'],
            S: ['6002', '6028', '6054', '6080', '6106', '6132', '6158', '6184'],
            T: ['5931', '5960', '5990', '6015', '6041', '6067', '6093', '6119'],
        },
        minGridFreq: 4870,
        maxGridFreq: 6184,
    }
};

let uniqueFreqs = new Set();
const bands = config["5G8"].freqs;
let totalChannelsExpected = 0;

for (let band in bands) {
    bands[band].forEach(freq => {
        uniqueFreqs.add(parseInt(freq));
        totalChannelsExpected++;
    });
}

let sortedFreqs = Array.from(uniqueFreqs).sort((a, b) => a - b);

let chartDataCombined = sortedFreqs.map(freq => ({ x: freq, y: 1.0 }));
let chartDataTx = sortedFreqs.map(freq => ({ x: freq, y: null })); 
let chartDataRx = sortedFreqs.map(freq => ({ x: freq, y: null }));

// Словники для зручного звернення до елементів UI
const TARGET_DATASET = { 'COMBINED': 0, 'TX': 1, 'RX': 2 };
const TARGET_TEXTAREA = { 'COMBINED': 'combinedRaw', 'TX': 'txRaw', 'RX': 'rxRaw' };

const ctx = document.getElementById('swrChart').getContext('2d');
const swrChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Результуючий КСХ',
                data: chartDataCombined,
                borderColor: '#ffd700',
                backgroundColor: 'rgba(255, 215, 0, 0.15)',
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 8,
                pointBackgroundColor: '#ffffff',
                fill: true,
                tension: 0,
                dragData: true // ДОЗВОЛЯЄМО РЕДАГУВАННЯ
            },
            {
                label: 'TX Антена',
                data: chartDataTx,
                borderColor: 'rgba(0, 210, 255, 0.5)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                spanGaps: true,
                dragData: false
            },
            {
                label: 'RX Антена',
                data: chartDataRx,
                borderColor: 'rgba(255, 68, 68, 0.5)',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                spanGaps: true,
                dragData: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                min: config["5G8"].minGridFreq,
                max: config["5G8"].maxGridFreq,
                title: { display: true, text: 'Частота (MHz)', color: '#aaa' },
                grid: { color: '#444' },
                ticks: { color: '#ddd' }
            },
            y: {
                min: 1, max: 3,
                title: { display: true, text: 'КСХ (SWR)', color: '#aaa' },
                grid: { color: '#444' },
                ticks: { stepSize: 0.1, color: '#ddd' }
            }
        },
        plugins: {
            legend: { display: true, labels: { color: '#ddd' } },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 16 },
                bodyFont: { size: 16 },
                padding: 15,
                displayColors: false,
                callbacks: {
                    title: function() { return ''; }, 
                    label: function(context) {
                        let datasetLabel = context.dataset.label;
                        let freq = context.parsed.x;
                        let swr = context.parsed.y.toFixed(2);
                        
                        let channelMatches = [];
                        for (let bandKey in bands) {
                            let index = bands[bandKey].indexOf(String(freq));
                            if (index !== -1) channelMatches.push(`${bandKey}${index + 1}`);
                        }
                        let channelsStr = channelMatches.length > 0 ? channelMatches.join(", ") : "Custom";

                        return [
                            `[${datasetLabel}]`,
                            `КСХ: ${swr}`,
                            `Частота: ${freq} MHz`,
                            `Канал: ${channelsStr}`
                        ];
                    }
                }
            },
            dragData: {
                round: 2,
                showTooltip: true,
                onDrag: function(e) { e.target.style.cursor = 'grabbing'; },
                onDragEnd: function(e) { 
                    e.target.style.cursor = 'default';
                    generateData(); // Оновлюємо текст після перетягування точки
                }
            },
            zoom: {
                limits: {
                    x: { min: config["5G8"].minGridFreq, max: config["5G8"].maxGridFreq, minRange: 50 },
                    y: { min: 1, max: 3 }
                },
                pan: { enabled: true, mode: 'x' },
                zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
            }
        }
    }
});

// Головна математика: вираховує Combined = MAX(TX, RX)
function recalculateCombined() {
    let combinedData = swrChart.data.datasets[0].data;
    let txData = swrChart.data.datasets[1].data;
    let rxData = swrChart.data.datasets[2].data;

    combinedData.forEach((point, i) => {
        let tx = txData[i].y !== null ? txData[i].y : 1.0;
        let rx = rxData[i].y !== null ? rxData[i].y : 1.0;
        point.y = Math.max(tx, rx);
    });

    swrChart.update();
    generateData();
}

// Генерує CSV стрічку для всіх 3х вікон на основі поточного стану графіків
function generateData() {
    function getCsvForDataset(datasetIndex) {
        let rawValuesArray = [];
        let freqMap = new Map();
        
        swrChart.data.datasets[datasetIndex].data.forEach(point => {
            freqMap.set(point.x, point.y !== null ? point.y : 1.0);
        });

        for (let bandKey in bands) {
            bands[bandKey].forEach(fStr => {
                let freq = parseInt(fStr);
                let swr = freqMap.get(freq) || 1.0;
                rawValuesArray.push(swr.toFixed(2));
            });
        }
        return rawValuesArray.join(",");
    }

    let combinedField = document.getElementById('combinedRaw');
    let txField = document.getElementById('txRaw');
    let rxField = document.getElementById('rxRaw');

    // Оновлюємо поля, тільки якщо користувач зараз не друкує в них
    if (document.activeElement !== combinedField) combinedField.value = getCsvForDataset(0);
    if (document.activeElement !== txField) txField.value = getCsvForDataset(1);
    if (document.activeElement !== rxField) rxField.value = getCsvForDataset(2);
}

// Парсить текст з поля введення і оновлює відповідний графік
function updateGraphFromCSV(type, silentMode = false) {
    let rawField = document.getElementById(TARGET_TEXTAREA[type]);
    let rawInput = rawField.value;

    const setError = (isError) => {
        if (isError) {
            rawField.classList.add('invalid');
            rawField.classList.remove('valid');
        } else {
            rawField.classList.add('valid');
            rawField.classList.remove('invalid');
        }
    };

    if (rawInput.includes(" ")) {
        setError(true);
        if (!silentMode) alert("ПОМИЛКА: Вхідний рядок містить пробіли! Видаліть їх.");
        return;
    }
    
    if (rawInput.trim() === "") { setError(false); return; }

    if (!/^[0-9.,]+$/.test(rawInput)) {
        setError(true);
        if (!silentMode) alert("ПОМИЛКА: Недопустимі символи.");
        return;
    }

    let values = rawInput.split(',').map(v => parseFloat(v));

    if (values.length !== totalChannelsExpected) {
        setError(true);
        if (!silentMode) alert(`ПОМИЛКА: Очікується значень: ${totalChannelsExpected}, Отримано: ${values.length}`);
        return;
    }
    
    if (values.some(isNaN)) { setError(true); return; }

    setError(false);
    let newFreqMap = new Map();
    let csvIndex = 0;
    
    for (let bandKey in bands) {
        bands[bandKey].forEach(fStr => {
            newFreqMap.set(parseInt(fStr), values[csvIndex]);
            csvIndex++;
        });
    }

    let datasetIndex = TARGET_DATASET[type];
    swrChart.data.datasets[datasetIndex].data.forEach(point => {
        if (newFreqMap.has(point.x)) point.y = newFreqMap.get(point.x);
    });

    // Якщо ми змінили TX або RX - перераховуємо Результуючу. 
    // Якщо змінили саму Результуючу - просто малюємо (не чіпаємо антени)
    if (type === 'TX' || type === 'RX') {
        recalculateCombined();
    } else {
        swrChart.update();
    }
}

// Глобальна змінна для збереження списку
let presetsList = []; 

// Асинхронна функція ініціалізації
async function initPresets() {
    try {
        // Запитуємо JSON список файлів (лише один раз при завантаженні сторінки)
        const response = await fetch('presets/5g8/presets.json');
        
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }

        // Парсимо отриманий JSON
        presetsList = await response.json();

        // Заповнюємо всі 3 селектори
        ['rxPreset', 'txPreset', 'combinedPreset'].forEach(selectorId => {
            const selector = document.getElementById(selectorId);
            presetsList.forEach(preset => {
                let option = document.createElement('option');
                option.value = preset.file;
                option.text = preset.name;
                selector.appendChild(option);
            });
        });

    } catch (err) {
        console.error("Не вдалося завантажити список пресетів:", err);
        // Тут можна додати alert, якщо список критично важливий
    }
}

async function loadPreset(selectObject, type) {
    const filename = selectObject.value;
    if (!filename) return;

    if (filename === "flat") {
        document.getElementById(TARGET_TEXTAREA[type]).value = new Array(totalChannelsExpected).fill("1.00").join(",");
        updateGraphFromCSV(type, false);
        selectObject.value = "";
        return;
    }

    const userConfirmed = confirm(`Завантажити пресет для ${type} антени?`);

    if (userConfirmed) {
        try {
            const response = await fetch(`presets/5g8/${filename}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const text = await response.text();
            document.getElementById(TARGET_TEXTAREA[type]).value = text.trim();
            updateGraphFromCSV(type, false);

        } catch (err) {
            alert(`Помилка при завантаженні файлу:\n${err.message}`);
        }
    }
    selectObject.value = "";
}

// --- NANOVNA LOGIC ---
function handleNanoVNAUpload(input, type) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const vnaData = parseTouchstone(e.target.result);
            const freqSwrMap = getInterpolatedMap(vnaData);
            applyVnaToChart(freqSwrMap, type);
            input.value = ''; 
        } catch (err) {
            alert("Помилка парсингу файлу:\n" + err.message);
        }
    };
    reader.readAsText(file);
}

function parseTouchstone(text) {
    const lines = text.split('\n');
    let dataPoints = [];
    let freqMultiplier = 1; 

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('!')) continue; 

        if (line.startsWith('#')) {
            const parts = line.toUpperCase().split(/\s+/);
            if (parts.includes('KHZ')) freqMultiplier = 1e-3;
            else if (parts.includes('MHZ')) freqMultiplier = 1;
            else if (parts.includes('GHZ')) freqMultiplier = 1e3;
            else freqMultiplier = 1e-6; 
            continue;
        }

        const parts = line.split(/\s+/);
        if (parts.length < 3) continue;

        let freq = parseFloat(parts[0]) * freqMultiplier; 
        let re = parseFloat(parts[1]);
        let im = parseFloat(parts[2]);

        let gamma = Math.sqrt(re * re + im * im);
        if (gamma >= 0.99) gamma = 0.99;
        
        let swr = (1 + gamma) / (1 - gamma);
        dataPoints.push({ freq: freq, swr: swr });
    }
    
    if (dataPoints.length === 0) throw new Error("Файл порожній");
    return dataPoints;
}

function getInterpolatedMap(vnaData) {
    vnaData.sort((a, b) => a.freq - b.freq);
    let newFreqMap = new Map();
    let ourFreqs = Array.from(uniqueFreqs).sort((a, b) => a - b);

    ourFreqs.forEach(targetFreq => {
        if (targetFreq < vnaData[0].freq || targetFreq > vnaData[vnaData.length - 1].freq) return; 

        let lower = vnaData[0];
        let upper = vnaData[vnaData.length - 1];

        for (let i = 0; i < vnaData.length - 1; i++) {
            if (targetFreq >= vnaData[i].freq && targetFreq <= vnaData[i+1].freq) {
                lower = vnaData[i];
                upper = vnaData[i+1];
                break;
            }
        }

        let ratio = (targetFreq - lower.freq) / (upper.freq - lower.freq);
        let interpolatedSwr = lower.swr + (upper.swr - lower.swr) * ratio;

        if (interpolatedSwr < 1) interpolatedSwr = 1;
        newFreqMap.set(targetFreq, interpolatedSwr);
    });

    return newFreqMap;
}

function applyVnaToChart(freqSwrMap, type) {
    let datasetIndex = TARGET_DATASET[type];
    let targetDataset = swrChart.data.datasets[datasetIndex].data;
    let matchCount = 0;

    targetDataset.forEach(point => {
        if (freqSwrMap.has(point.x)) {
            point.y = freqSwrMap.get(point.x);
            matchCount++;
        }
    });

    if (matchCount === 0) {
        alert("УВАГА: Частоти у файлі не перетинаються з нашою сіткою 5.8GHz.");
        return;
    }

    if (type === 'TX' || type === 'RX') {
        recalculateCombined();
    } else {
        swrChart.update();
        generateData();
    }
}

// Додаємо слухачів на ручне введення тексту у всі 3 поля
document.getElementById('combinedRaw').addEventListener('input', () => updateGraphFromCSV('COMBINED', true));
document.getElementById('txRaw').addEventListener('input', () => updateGraphFromCSV('TX', true));
document.getElementById('rxRaw').addEventListener('input', () => updateGraphFromCSV('RX', true));

initPresets();
generateData();