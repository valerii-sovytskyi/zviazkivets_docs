
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
let chartData = Array.from(uniqueFreqs)
    .sort((a, b) => a - b)
    .map(freq => { return { x: freq, y: 3.0 }; });
const ctx = document.getElementById('swrChart').getContext('2d');
const swrChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'КСХ Антени',
            data: chartData,
            borderColor: '#00d2ff',
            backgroundColor: 'rgba(0, 210, 255, 0.1)',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 8,
            pointBackgroundColor: '#ffffff',
            fill: true,
            tension: 0 
        }]
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
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // (Опціонально) Робимо фон темнішим
                titleFont: { size: 16 },
                bodyFont: { size: 16 },
                padding: 15,
                displayColors: false, // Прибираємо кольоровий квадратик зліва
                callbacks: {
                    // Ми прибираємо стандартний заголовок (частоту), бо виведемо її гарно знизу
                    title: function() { return ''; }, 

                    label: function(context) {
                        let freq = context.parsed.x;
                        let swr = context.parsed.y.toFixed(2);
                        
                        // --- ЛОГІКА ПОШУКУ КАНАЛУ ---
                        let channelMatches = [];
                        const bands = config["5G8"].freqs;
                        
                        // Проходимось по всіх бендах і шукаємо цю частоту
                        for (let bandKey in bands) {
                            // Перетворюємо freq на рядок, бо в конфігу вони рядки
                            let index = bands[bandKey].indexOf(String(freq));
                            
                            if (index !== -1) {
                                // index 0 -> канал 1
                                channelMatches.push(`${bandKey}${index + 1}`);
                            }
                        }
                        
                        let channelsStr = channelMatches.length > 0 ? channelMatches.join(", ") : "Custom";

                        // --- ФОРМУВАННЯ ВИВОДУ ---
                        // Повертаємо масив рядків (кожен рядок - це новий рядок у тултіпі)
                        return [
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
                // АВТОМАТИЧНЕ ОНОВЛЕННЯ ТЕКСТУ ПРИ ВІДПУСКАННІ
                onDragEnd: function(e) { 
                    e.target.style.cursor = 'default';
                    generateData(); 
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
function generateData() {
    let debugText = "// Generated SWR Profile\n";
    debugText += `// Format: { ${Object.keys(bands).join(', ')} }\n\n`;
    debugText += "float swrTable[] = {\n";
    let rawValuesArray = [];
    let freqMap = new Map();
    
    swrChart.data.datasets[0].data.forEach(point => {
        freqMap.set(point.x, point.y);
    });
    for (let bandKey in bands) {
        let bandFreqs = bands[bandKey];
        bandFreqs.forEach(fStr => {
            let freq = parseInt(fStr);
            let swr = freqMap.get(freq) || 1.0;
            let swrStr = swr.toFixed(2);
            rawValuesArray.push(swrStr);
        });
    }
    // Важливо: ми оновлюємо Raw поле тільки якщо воно НЕ у фокусі (щоб не збивати курсор користувачу)
    // Або якщо це виклик з Drag події.
    let rawField = document.getElementById('outputRaw');
    if (document.activeElement !== rawField) {
         rawField.value = rawValuesArray.join(",");
         // Скидаємо статус валідації на зелений
         rawField.classList.remove('invalid');
         rawField.classList.add('valid');
    }
}

// ФУНКЦІЯ: ЗВОРОТНЄ ЗАВАНТАЖЕННЯ (З "ТИХИМ" РЕЖИМОМ)
function updateGraphFromCSV(silentMode = false) {
    let rawField = document.getElementById('outputRaw');
    let rawInput = rawField.value;
    // Функція для показу помилки
    const setError = (isError) => {
        if (isError) {
            rawField.classList.add('invalid');
            rawField.classList.remove('valid');
        } else {
            rawField.classList.add('valid');
            rawField.classList.remove('invalid');
        }
    };
    // 1. Валідація на пробіли
    if (rawInput.includes(" ")) {
        setError(true);
        if (!silentMode) alert("ПОМИЛКА: Вхідний рядок містить пробіли! Видаліть їх.");
        return;
    }
    // 2. Валідація символів
    // Дозволяємо пустий рядок (просто нічого не робимо)
    if (rawInput.trim() === "") {
        setError(false); // Не вважаємо помилкою, просто пусто
        return;
    }
    if (!/^[0-9.,]+$/.test(rawInput)) {
        setError(true);
        if (!silentMode) alert("ПОМИЛКА: Недопустимі символи.");
        return;
    }
    let values = rawInput.split(',').map(v => parseFloat(v));
    // 3. Валідація кількості (Це найчастіша проблема при вводі)
    if (values.length !== totalChannelsExpected) {
        setError(true);
        // В тихому режимі ми мовчимо, бо користувач може ще дописувати рядок
        if (!silentMode) alert(`ПОМИЛКА: Очікується значень: ${totalChannelsExpected}, Отримано: ${values.length}`);
        return;
    }
    
    // 4. Перевірка на NaN (якщо ввели кому в кінці і ще немає цифри "1.2,")
    if (values.some(isNaN)) {
        setError(true);
        return;
    }
    // ЯКЩО МИ ТУТ - ВСЕ ОК
    setError(false);
    let newFreqMap = new Map();
    let csvIndex = 0;
    for (let bandKey in bands) {
        let bandFreqs = bands[bandKey];
        bandFreqs.forEach(fStr => {
            let freq = parseInt(fStr);
            let newSwr = values[csvIndex];
            newFreqMap.set(freq, newSwr);
            csvIndex++;
        });
    }
    swrChart.data.datasets[0].data.forEach(point => {
        if (newFreqMap.has(point.x)) {
            point.y = newFreqMap.get(point.x);
        }
    });
    swrChart.update();
}

// --- ПРЕСЕТИ ---
// Список файлів, які лежать у папці presets/5g8/
const presetsList = [
    { name: "RushFPV Cherry 5.8G Antenna RHCP SMA 160mm", file: "RushFPV Cherry 5.8G Antenna RHCP SMA 160mm.txt" },
    { name: "TrueRC CORE 5.8 GHz (RHCP)",   file: "TrueRC CORE 5.8 GHz (RHCP).txt" }
    // Додавай сюди нові файли за аналогією
];

// Функція для заповнення списку при завантаженні сторінки
function initPresets() {
    const selector = document.getElementById('presetSelector');
    presetsList.forEach(preset => {
        let option = document.createElement('option');
        option.value = preset.file;
        option.text = preset.name;
        selector.appendChild(option);
    });
}

async function loadPreset(selectObject) {
    const filename = selectObject.value;
    
    // Якщо обрано дефолтний пункт "Обрати пресет..." - нічого не робимо
    if (!filename) return;

    // 1. Питаємо підтвердження
    const userConfirmed = confirm(`Ви впевнені, що хочете завантажити пресет "${filename}"?\nПоточні дані в полі введення будуть замінені.`);

    if (userConfirmed) {
        try {
            // 2. Робимо запит до файлу
            // Важливо: шлях відносний до index.html
            const response = await fetch(`presets/5g8/${filename}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 3. Отримуємо текст
            const text = await response.text();

            // 4. Вставляємо в поле
            const outputRawField = document.getElementById('outputRaw');
            outputRawField.value = text.trim(); // trim прибирає зайві пробіли на початку/кінці

            // 5. Оновлюємо графік і C++ код
            // Викликаємо з silentMode = false, щоб якщо файл битий - користувач побачив помилку
            updateGraphFromCSV(false); 

        } catch (err) {
            alert(`Помилка при завантаженні файлу:\n${err.message}\nПеревірте, чи існує файл у папці presets/5g8/`);
        }
    }

    // Скидаємо вибір на дефолтний, щоб можна було обрати той самий пресет ще раз, якщо треба
    selectObject.value = "";
}

// --- NANOVNA LOGIC ---

function handleNanoVNAUpload(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const content = e.target.result;
        try {
            const vnaData = parseTouchstone(content);
            mapVnaToOurFreqs(vnaData);
            
            // Очищаємо інпут, щоб можна було завантажити той самий файл ще раз
            input.value = ''; 
        } catch (err) {
            alert("Помилка парсингу файлу:\n" + err.message);
        }
    };

    reader.readAsText(file);
}

// Парсер формату .s1p
function parseTouchstone(text) {
    const lines = text.split('\n');
    let dataPoints = [];
    let freqMultiplier = 1; // За дефолтом Hz

    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('!')) continue; // Пропуск коментарів

        // Читаємо заголовок (наприклад: # Hz S RI R 50)
        if (line.startsWith('#')) {
            const parts = line.toUpperCase().split(/\s+/);
            if (parts.includes('KHZ')) freqMultiplier = 1e-3;
            else if (parts.includes('MHZ')) freqMultiplier = 1;
            else if (parts.includes('GHZ')) freqMultiplier = 1e3;
            else freqMultiplier = 1e-6; // Якщо Hz, то переводимо в MHz
            continue;
        }

        // Парсинг даних
        // Формат зазвичай: Freq Re Im ...
        const parts = line.split(/\s+/);
        if (parts.length < 3) continue;

        let freq = parseFloat(parts[0]) * freqMultiplier; // Переводимо в MHz
        
        // NanoVNA зазвичай дає Real та Imaginary частини
        let re = parseFloat(parts[1]);
        let im = parseFloat(parts[2]);

        // Розрахунок КСХ (VSWR)
        // 1. Коефіцієнт відбиття (Gamma)
        let gamma = Math.sqrt(re * re + im * im);
        
        // 2. SWR formula: (1 + Gamma) / (1 - Gamma)
        // Захист, якщо gamma > 1 (активна антена або помилка калібровки)
        if (gamma >= 0.99) gamma = 0.99;
        
        let swr = (1 + gamma) / (1 - gamma);

        dataPoints.push({ freq: freq, swr: swr });
    }
    
    if (dataPoints.length === 0) throw new Error("Файл не містить даних або формат не підтримується");
    return dataPoints;
}

// Функція мапінгу (Інтерполяція)
function mapVnaToOurFreqs(vnaData) {
    // Сортуємо дані VNA по частоті (про всяк випадок)
    vnaData.sort((a, b) => a.freq - b.freq);

    let newFreqMap = new Map();
    let matchCount = 0;

    // Проходимо по наших точках з Config
    let ourFreqs = Array.from(uniqueFreqs).sort((a, b) => a - b);

    ourFreqs.forEach(targetFreq => {
        // Знаходимо найближчі точки в файлі VNA
        // targetFreq у нас в MHz (наприклад 5800)
        
        // 1. Перевірка меж
        if (targetFreq < vnaData[0].freq || targetFreq > vnaData[vnaData.length - 1].freq) {
            // Якщо частота виходить за межі сканування VNA, залишаємо як є (або ставимо 1.0)
            return; 
        }

        // 2. Бінарний або лінійний пошук сусідів
        let lower = vnaData[0];
        let upper = vnaData[vnaData.length - 1];

        for (let i = 0; i < vnaData.length - 1; i++) {
            if (targetFreq >= vnaData[i].freq && targetFreq <= vnaData[i+1].freq) {
                lower = vnaData[i];
                upper = vnaData[i+1];
                break;
            }
        }

        // 3. Лінійна інтерполяція
        // SWR = SWR1 + (SWR2 - SWR1) * ( (F - F1) / (F2 - F1) )
        let ratio = (targetFreq - lower.freq) / (upper.freq - lower.freq);
        let interpolatedSwr = lower.swr + (upper.swr - lower.swr) * ratio;

        // Обмеження 1.0 - 3.0 (або більше, якщо хочеш бачити жах)
        if (interpolatedSwr < 1) interpolatedSwr = 1;
        // if (interpolatedSwr > 3) interpolatedSwr = 3; // Можна не обмежувати, графік сам обріже візуально

        newFreqMap.set(targetFreq, interpolatedSwr);
        matchCount++;
    });

    if (matchCount === 0) {
        alert("УВАГА: Частоти у файлі не перетинаються з нашою сіткою 5.8GHz.\nПеревірте, чи ви сканували правильний діапазон (4800-6200 MHz).");
        return;
    }

    // 4. Оновлюємо графік
    swrChart.data.datasets[0].data.forEach(point => {
        if (newFreqMap.has(point.x)) {
            point.y = newFreqMap.get(point.x);
        }
    });

    swrChart.update();
    generateData(); // Оновлюємо текстові поля
    alert(`Успішно імпортовано! Оновлено точок: ${matchCount}`);
}

// --- ДОДАВАННЯ СЛУХАЧА ПОДІЙ ---
// Викликається при кожному натисканні клавіші або вставці (paste)
document.getElementById('outputRaw').addEventListener('input', function() {
    updateGraphFromCSV(true); // true = Тихий режим (без alert)
});

// Викликаємо ініціалізацію одразу
initPresets();

// Початкова генерація тексту при завантаженні сторінки
generateData();