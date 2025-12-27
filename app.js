const config = {
    "1G3": {
        freqs: {
            RUSH_A: ['1080', '1120', '1160', '1200', '1240', '1280', '1320', '1360'],
            RUSH_B: ['1200', '1220', '1240', '1258', '1280', '1300', '1320', '1340'],
            FT1200_A: ['1920', '1960', '2000', '2040', '2080', '2120', '2160', '2200'],
            FT1200_B: ['1900', '1940', '1980', '2020', '2060', '2100', '2140', '2180'],
            FT1200_E: ['1740', '1760', '1780', '1800', '1820', '1840', '1860', '1880'],
            FT1200_F: ['1720', '1740', '1760', '1780', '1800', '1820', '1840', '1860'],
            FT1200_R: ['1420', '1460', '1500', '1540', '1580', '1620', '1660', '1700'],
            FT1200_L: ['1400', '1440', '1480', '1520', '1560', '1600', '1640', '1680'],
            FT1200_X: ['1100', '1140', '1180', '1220', '1260', '1300', '1340', '1380'],
            FT1200_S: ['1080', '1120', '1160', '1200', '1240', '1280', '1320', '1360'],
        },
        bandTitles: {
            RUSH_A: ["A", "RUSH A"],
            RUSH_B: ["B", "RUSH B"],
            FT1200_A: ["A", "FT1200 A"],
            FT1200_B: ["B", "FT1200 B"],
            FT1200_E: ["E", "FT1200 E"],
            FT1200_F: ["F", "FT1200 F"],
            FT1200_R: ["R", "FT1200 R"],
            FT1200_L: ["L", "FT1200 L"],
            FT1200_X: ["X", "FT1200 X"],
            FT1200_S: ["S", "FT1200 S"],
        },
        bandwidth:  20, /*MHz*/
        minGridFreq: 900,
        maxGridFreq: 2300,
    },
    "3G3": {
        freqs: {
            RUSH_A: ['3330', '3350', '3370', '3390', '3410', '3430', '3450', '3470'],
            RUSH_B: ['3170', '3190', '3210', '3230', '3250', '3270', '3290', '3310'],
            FT3500_A: ['3360', '3380', '3400', '3420', '3440', '3460', '3480', '3500'],
            FT3500_B: ['3200', '3220', '3240', '3260', '3280', '3300', '3320', '3340'],
            FT3500_E: ['3330', '3350', '3370', '3390', '3410', '3430', '3450', '3470'],
            FT3500_F: ['3170', '3190', '3210', '3230', '3250', '3270', '3290', '3310'],
            FT3500_R: ['3320', '3345', '3370', '3395', '3420', '3445', '3470', '3495'],
            FT3500_L: ['3310', '3330', '3355', '3380', '3405', '3430', '3455', '3480'],
            FT3500_X: ['3220', '3240', '3260', '3280', '3300', '3320', '3340', '3360'],
            FT3500_S: ['3060', '3080', '3100', '3120', '3140', '3160', '3180', '3200'],
        },
        bandTitles: {
            RUSH_A: ["A", "RUSH A"],
            RUSH_B: ["B", "RUSH B"],
            FT3500_A: ["A", "FT3500 A"],
            FT3500_B: ["B", "FT3500 B"],
            FT3500_E: ["E", "FT3500 E"],
            FT3500_F: ["F", "FT3500 F"],
            FT3500_R: ["R", "FT3500 R"],
            FT3500_L: ["L", "FT3500 L"],
            FT3500_X: ["X", "FT3500 X"],
            FT3500_S: ["S", "FT3500 S"],
        },
        bandwidth:  20, /*MHz*/
        minGridFreq: 3040,
        maxGridFreq: 3600,
    },
    "R35": {
        freqs: {
            'A': [3000, 3030, 3060, 3090, 3120, 3150, 3180, 3210], // A-A
            'B': [3240, 3270, 3300, 3330, 3370, 3400, 3430, 3470], // B-B
            'E': [3500, 3530, 3560, 3590, 3620, 3650, 3680, 3710], // E-E
            'F': [3740, 3770, 3800, 3830, 3860, 3890, 3920, 3950], // F-F
            'R': [3980, 4010, 4040, 4070, 4100, 4130, 4160, 4190], // R-R
            'L': [4220, 4250, 4280, 4310, 4340, 4370, 4400, 4430], // L-P
            'X': [4470, 4500, 4530, 4560, 4590, 4620, 4650, 4680], // X-H
            'Y': [4710, 4740, 4770, 4812, 4839, 4872, 4911, 4938], // Y-U
            'H': [2700, 2720, 2740, 2760, 2780, 2800, 2820, 2840], // H
            'M': [2860, 2880, 2900, 2920, 2940, 2960, 2980, 3000], // M
            'U': [3220, 3300, 3360, 3440, 3520, 3600, 3680, 3720], // U
            'O': [3760, 3800, 3840, 3880, 3920, 3960, 4000, 4050], // O
        },
        bandTitles: {
            'A': ['A', 'PEAK A'],
            'B': ['B', 'PEAK B'],
            'E': ['E', 'PEAK E'],
            'F': ['F', 'PEAK F'],
            'R': ['R', 'PEAK R'],
            'L': ['L', 'PEAK P'],
            'X': ['X', 'PEAK H'],
            'Y': ['Y', 'PEAK U'],
            'H': ['H', 'FlashTech A'],
            'M': ['M', 'FlashTech B'],
            'U': ['U', 'AMPF3 A'],
            'O': ['O', 'AMPF3 B'],
        },
        bandwidth:  15,
        minGridFreq: 2480,
        maxGridFreq: 5000,
    },
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
        bandTitles: {
            A: ["A", "A"],
            B: ["B", "B"],
            E: ["E", "E"],
            F: ["F", "F"],
            R: ["R", "R"],
            L: ["L", "L"],
            X: ["X", "X"],
            Y: ["Y", "Y (MILELRS)"],
            H: ["H", "H (FOXEER)"],
            M: ["M", "M (FOXEER L)"],
            U: ["U", "U (FOXEER)"],
            O: ["O", "0 (FOXEER)"],
            S: ["S", "S (Z)"],
            T: ["T", "T( MILELRS)"],
        },
        bandwidth:  30, /*MHz*/
        minGridFreq: 4800,
        maxGridFreq: 6200,
    },
    "R67": {
        freqs: {
            'A': [6110, 6130, 6150, 6170, 6190, 6210, 6230, 6250],
            'B': [6270, 6290, 6310, 6330, 6350, 6370, 6390, 6410],
            'E': [6430, 6450, 6470, 6490, 6510, 6530, 6550, 6570],
            'F': [6590, 6610, 6630, 6650, 6670, 6690, 6710, 6730],
            'R': [6750, 6770, 6790, 6810, 6830, 6850, 6870, 6890],
            'L': [6910, 6930, 6950, 6970, 6990, 7010, 7030, 7050],
            'X': [7070, 7090, 7110, 7130, 7150, 7170, 7190, 7210],
            'Y': [6115, 6265, 6425, 6585, 6745, 6905, 7065, 7185],
        },
        bandTitles: {
            A: ["A", "PEAK A"],
            B: ["B", "PEAK  B"],
            E: ["E", "PEAK  E"],
            F: ["F", "PEAK  F"],
            R: ["R", "PEAK  R"],
            L: ["L", "PEAK  P"],
            X: ["X", "PEAK  H"],
            Y: ["Y", "PEAK  U"],
        },
        bandwidth:  15,
        minGridFreq: 5900,
        maxGridFreq: 7300,
    },
    "DIGITAL": {
        freqs: {
            'DJI_O3_10_CH': [5669, 5705, 5768, 5804, 5839, 5876, 5912],
            'DJI_O3_20_CH': [5669, 5705, 5768, 5804, 5839, 5876, 5912],
            'DJI_O3_10_CE': [5768, 5804, 5839],
            'DJI_O3_20_CE': [5768, 5804, 5839],
            'DJI_O3_40_CH': [5677, 5794, 5902],
            'DJI_O3_40_CE': [5794],
            'HDZero_R': [5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917],
            'HDZero_CE': [5732, 5769, 5806, 5843],
            'HDZero_F': [null, 5760, null, 5800],
            'Walksnail_Race': [5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917], // 20m
            'Walksnail_25': [5660, 5695, 5735, 5770, 5805, 5839, 5878, 5914], // 20m
            'Walksnail_50': [5695, 5770, 5878], // 40m
        },
        bandTitles: {
            DJI_O3_10_CH: ["CH", "DJI O3 10 CH"],
            DJI_O3_20_CH: ["CH", "DJI O3 20 CH"],
            DJI_O3_10_CE: ["CE", "DJI O3 10 CE"],
            DJI_O3_20_CE: ["CE", "DJI O3 20 CE"],
            DJI_O3_40_CH: ["CH", "DJI O3 40 CH"],
            DJI_O3_40_CE: ["CH", "DJI O3 40 CE"],
            HDZero_R: ["R", "HDZero R"],
            HDZero_CE: ["CE", "HDZero CE"],
            HDZero_F: ["F", "HDZero F"],
            Walksnail_Race: ["R", "Walksnail Race"],
            Walksnail_25: ["CH", "Walksnail 25"],
            Walksnail_50: ["CH", "Walksnail 50"],
        },
        bandwidth:  {
            DJI_O3_10_CH: 10,
            DJI_O3_20_CH: 20,
            DJI_O3_10_CE: 10,
            DJI_O3_20_CE: 20,
            DJI_O3_40_CH: 40,
            DJI_O3_40_CE: 40,
            HDZero_R: 30,
            HDZero_CE: 30,
            HDZero_F: 30,
            Walksnail_Race: 20,
            Walksnail_25: 20,
            Walksnail_50: 40,
        },
        minGridFreq: 5608,
        maxGridFreq: 6000,
    }
};

const harmonicsWrap = document.getElementById('harmonics-wrap');
const freqLabelsContainerBlock = document.getElementById('freq-labels');
const freqBandLabelsContainerBlock = document.getElementById('freq-bands-labels');
const freqsBlock = document.getElementById('freqs');
const freqGroupsBlock = document.getElementById('freq-groups');

const freq1MinBlock = document.getElementById('freq1min');
const freq1MaxBlock = document.getElementById('freq1max');
const freq2MinBlock = document.getElementById('freq2min');
const freq2MaxBlock = document.getElementById('freq2max');

const Page = function (config) {
    this.config = config;

    this.initFreqRangeSelector(freq1MinBlock, freq1MaxBlock, 1);
    this.initFreqRangeSelector(freq2MinBlock, freq2MaxBlock, 2);

    this.initGroupSelector();

    this.render("5G8");
};

Page.prototype = {
    maxRCFreq: 2800,

    selectGroup: function(group) {
        this.render(group);
    },

    render: function (selectedGroup) {
        const {freqs, bandTitles, bandwidth, minGridFreq, maxGridFreq} = this.config[selectedGroup];

        this.maxGridFreq = this.config[selectedGroup].maxGridFreq;
        this.minGridFreq = this.config[selectedGroup].minGridFreq;

        this.cellCount = 14 * 4;
        this.cellHeightPx = 15;

        this.cellHeightMHz = (this.maxGridFreq - this.minGridFreq) / this.cellCount;

        // freq labels
        let freqsLabelBlocks = '';
        for (let freq = maxGridFreq; freq >= minGridFreq; freq = freq - (this.cellHeightMHz * 4)) {
            freqsLabelBlocks += '<div class="label">' + freq + '</div>';
        }
        freqLabelsContainerBlock.innerHTML = freqsLabelBlocks;

        // band labels
        let bandLabelBlocks = '';
        for (let band in freqs) {
            bandLabelBlocks += `<div class="label">${bandTitles[band][1]}</div>`;
        }
        freqBandLabelsContainerBlock.innerHTML = bandLabelBlocks;

        // remove channels
        freqsBlock.querySelectorAll('.channel').forEach((e => e.remove()));

        // remove harmonics
        freqsBlock.querySelectorAll('.harmonic').forEach((e => e.remove()));

        // remove imd
        freqsBlock.querySelectorAll('.imd').forEach((e => e.remove()));

        // add freq channels
        let posX = 20;
        let posY = 0;
        for (let band in freqs) {
            const bandBandwidth = typeof bandwidth === 'number' ? bandwidth : bandwidth[band];
            let channelHeightPx = (this.cellHeightPx / this.cellHeightMHz) * bandBandwidth;

            let channelNum = 0;
            let freqDirection = freqs[band][0] > freqs[band][1];
            for (let freq of freqs[band]) {
                if (!freq) {
                    continue;
                }

                channelNum++;

                posY = this.cellHeightPx * (maxGridFreq - freq) / this.cellHeightMHz - (channelHeightPx / 2);
                let channelBlock = document.createElement('div');
                channelBlock.classList.add('channel');
                channelBlock.classList.add('channel-' + channelNum);

                channelBlock.style.top = parseInt(posY) + "px";
                channelBlock.style.left = parseInt(posX) + "px";

                const channelBlockMinHeight = 10;
                channelBlock.style.height = Math.max(channelHeightPx, channelBlockMinHeight) + "px";
                channelBlock.style.lineHeight = Math.max(channelHeightPx, channelBlockMinHeight) + "px";

                channelBlock.style.zIndex = "" + (freqDirection ? (200 - channelNum) : (200 + channelNum));

                channelBlock.innerHTML = bandTitles[band][0] + channelNum;

                channelBlock.title = freq;

                channelBlock.dataset.freq = freq;
                channelBlock.dataset.channelTitle = bandTitles[band][0] + channelNum;
                channelBlock.dataset.bandwidth = bandBandwidth;
                channelBlock.dataset.channelHeightPx = channelHeightPx;

                freqsBlock.appendChild(channelBlock);

                channelBlock.addEventListener("click", (e) => {
                    channelBlock.classList.toggle('selected');
                    this.calculateInterModulationDistortion();
                });
            }

            posX = posX + 80;
        }

        //render harmonics
        this.renderHarmonics(
            parseInt(freq1MinBlock.value),
            parseInt(freq1MaxBlock.value),
            1,
        );

        this.renderHarmonics(
            parseInt(freq2MinBlock.value),
            parseInt(freq2MaxBlock.value),
            2,
        );

    },

    calculateInterModulationDistortion: function () {
        // get channels freqs
        let videoFreqs = [];
        for (let channel of document.querySelectorAll('.channel.selected')) {
            videoFreqs.push({
                freq: channel.dataset.freq,
                channelTitle: channel.dataset.channelTitle,
                bandwidth: channel.dataset.bandwidth,
            });
        }

        if (videoFreqs.length === 0) {
            return;
        }

        // build imd freqs
        let imdFreqs = [];

        // render freqs
        for(let videoFreq1 of videoFreqs) {
            for(let videoFreq2 of videoFreqs) {
                if (videoFreq1 === videoFreq2) {
                    continue;
                }

                imdFreqs.push({
                    title: videoFreq1.channelTitle + "-" + videoFreq2.channelTitle,
                    freq: 2 * videoFreq1.freq - videoFreq2.freq,
                    bandwidth: Math.max(videoFreq1.bandwidth, videoFreq2.bandwidth)
                });

                imdFreqs.push({
                    title: videoFreq2.channelTitle + "-" + videoFreq1.channelTitle,
                    freq: 2 * videoFreq2.freq - videoFreq1.freq,
                    bandwidth: Math.max(videoFreq1.bandwidth, videoFreq2.bandwidth)
                });
            }
        }

        // remove imd
        harmonicsWrap.querySelectorAll('.imd').forEach((e) => e.remove());

        // remove imd crossing
        // clear crossing marks
        freqsBlock.querySelectorAll('.channel').forEach((e) => e.classList.remove('crossing-imd'));

        // render imd
        for (let imd of imdFreqs) {
            const imdTitle = imd.title;
            let imdFreq = imd.freq;
            let imdBand = imd.bandwidth;

            let imdBlock = document.createElement('div');
            imdBlock.classList.add('imd');
            harmonicsWrap.appendChild(imdBlock);

            const imdTopPx = ((this.maxGridFreq - imdFreq - (imdBand / 2)) / this.cellHeightMHz * this.cellHeightPx);
            const imdHeightPx = (imdBand / this.cellHeightMHz * this.cellHeightPx);
            const imdCenterPx = imdTopPx + (imdHeightPx / 2);

            imdBlock.style.top = imdTopPx + "px";
            imdBlock.style.height = imdHeightPx + "px";

            imdBlock.title = `Інтермодуляція ${imdTitle}, Центр: ${imdFreq} МГц`;

            // highlight intersection
            for (let channelBlock of freqsBlock.querySelectorAll('.channel')) {
                const channelHeightPx = parseInt(channelBlock.dataset.channelHeightPx);
                const channelCenterPx = parseInt(channelBlock.style.top) + (channelHeightPx / 2);

                if (Math.abs(channelCenterPx - imdCenterPx) < (imdHeightPx + channelHeightPx) / 2) {
                    channelBlock.classList.add('crossing-imd');
                }
            }
        }
    },

    // render harmonics
    renderHarmonics: function (
        freqLeft,
        freqRight,
        freqRangeNum,
    ) {
        const maxHarmonics = 15;

        // clear crossing marks
        freqsBlock.querySelectorAll('.channel').forEach((e) => e.classList.remove('crossing-' + freqRangeNum));

        if (
            freqLeft < 0
            || freqRight > this.maxRCFreq
            || freqLeft >= this.maxRCFreq
            || freqLeft >= freqRight
            || (freqRight - freqLeft) > 500
        ) {
            harmonicsWrap.classList.add('invalid-' + freqRangeNum);
            return;
        } else {
            harmonicsWrap.classList.remove('invalid-' + freqRangeNum);
        }

        const freqBand = (freqRight - freqLeft);

        const freqCenter = freqLeft + (freqBand / 2);

        // build harmonics meta
        const freqHarmonics = [];
        for (let harmonicNum = 1; harmonicNum < maxHarmonics; harmonicNum++) {
            freqHarmonics.push({
                num: harmonicNum,
                center: freqCenter * harmonicNum,
                band: freqBand * harmonicNum,
            });
        }

        // render harmonics
        for (let harmonic of freqHarmonics) {
            let harmonicBlock = document.querySelector('.harmonic-freq-' + freqRangeNum + '-' + harmonic.num);
            if (!harmonicBlock) {
                harmonicBlock = document.createElement('div');
                harmonicBlock.classList.add('harmonic');
                harmonicBlock.classList.add('harmonic-freq-' + freqRangeNum);
                harmonicBlock.classList.add('harmonic-freq-' + freqRangeNum + '-' + harmonic.num);
                harmonicsWrap.appendChild(harmonicBlock);
            }

            const harmonicTopPx = ((this.maxGridFreq - harmonic.center - (harmonic.band / 2) - 2) / this.cellHeightMHz * this.cellHeightPx);
            const harmonicHeightPx = (harmonic.band / this.cellHeightMHz * this.cellHeightPx);
            const harmonicCenterPx = harmonicTopPx + (harmonicHeightPx / 2);

            harmonicBlock.style.top = harmonicTopPx + "px";
            harmonicBlock.style.height = harmonicHeightPx + "px";

            harmonicBlock.title = `Радіо ${freqRangeNum}. Гармоніка ${harmonic.num} (${harmonic.center - harmonic.band / 2} МГц - ${harmonic.center + harmonic.band / 2} МГц), Центр: ${harmonic.center} МГц, Смуга: ${harmonic.band} МГц`;
            console.log(harmonicBlock.title);

            // highlight intersection
            for (let channelBlock of freqsBlock.querySelectorAll('.channel')) {
                const channelHeightPx = parseInt(channelBlock.dataset.channelHeightPx);
                const channelCenterPx = parseInt(channelBlock.style.top) + (channelHeightPx / 2);

                if (Math.abs(channelCenterPx - harmonicCenterPx) < (harmonicHeightPx + channelHeightPx) / 2) {
                    channelBlock.classList.add('crossing-' + freqRangeNum);
                }
            }
        }
    },

    debounce: function (func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    },

    initGroupSelector: function () {
        freqGroupsBlock.querySelectorAll('LI').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                freqGroupsBlock.querySelectorAll('LI').forEach(
                    (elem) => {elem.classList.remove('active');}
                );

                e.target.classList.add('active');
                const group = e.target.dataset.group;
                this.selectGroup(group);
            });
        });
    },

    initFreqRangeSelector: function (
        freqMinBlock,
        freqMaxBlock,
        freqRangeNum,
    ) {
        freqMinBlock.addEventListener('input', this.debounce((e) => {
            if (parseInt(freqMinBlock.value) >= this.maxRCFreq) {
                freqMinBlock.value = this.maxRCFreq - 1;
            }

            if (parseInt(freqMinBlock.value) >= parseInt(freqMaxBlock.value)) {
                freqMaxBlock.value = parseInt(freqMinBlock.value) + 1;
            } else if (parseInt(freqMinBlock.value) < 0) {
                freqMaxBlock.value = 0;
            }

            this.renderHarmonics(
                parseInt(freqMinBlock.value),
                parseInt(freqMaxBlock.value),
                freqRangeNum,
            );
        }, 800));

        freqMaxBlock.addEventListener('input', this.debounce((e) => {
            if (parseInt(freqMaxBlock.value) <= parseInt(freqMinBlock.value)) {
                freqMinBlock.value = freqMaxBlock.value === "0" ? 0 : parseInt(freqMaxBlock.value) - 1;
            } else if (parseInt(freqMaxBlock.value) > this.maxRCFreq) {
                freqMinBlock.value = this.maxRCFreq;
            }

            this.renderHarmonics(
                parseInt(freqMinBlock.value),
                parseInt(freqMaxBlock.value),
                freqRangeNum,
            );
        }, 800));


    }
};

[freq1MinBlock, freq1MaxBlock, freq2MinBlock, freq2MaxBlock].map((e) => {
    e.addEventListener("keypress", function (e) {
        if (!"0123456789".includes(e.key)) {
            e.preventDefault();
        }
    });
});

document.querySelectorAll('.freq-select-arrow').forEach((arrowElement) => {
    arrowElement.addEventListener("click", (e) => {
        const direction = arrowElement.dataset.dir;
        const freqSelectBlock = document.getElementById(arrowElement.dataset.for);

        if (direction === 'down') {
            freqSelectBlock.value = parseInt(freqSelectBlock.value) - 5;
        } else {
            freqSelectBlock.value = parseInt(freqSelectBlock.value) + 5;
        }

        freqSelectBlock.dispatchEvent(new Event("input", { bubbles: true }));
    });
});

const page = new Page(config);
