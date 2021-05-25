import PgChartDesign from 'generated/pages/pgChart';

export default class PgChart extends PgChartDesign {
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initComponents() {
        this.btnRandomizeData.onPress = () => {
            const script = `
                config.data.datasets.forEach(function(dataset) {
                    dataset.data = dataset.data.map(function() {
                        return randomScalingFactor();
                    });

                });
            window.myLine.update();`;
            this.webView1.evaluateJS(script, () => { });
        }
        this.btnAddDataSet.onPress = () => {
            const script = `
                const colorName = colorNames[config.data.datasets.length % colorNames.length];
                const newColor = window.chartColors[colorName];
                const newDataset = {
                    label: 'Dataset ' + config.data.datasets.length,
                    backgroundColor: newColor,
                    borderColor: newColor,
                    data: [],
                    fill: false
                };

                for (let index = 0; index < config.data.labels.length; ++index) {
                    newDataset.data.push(randomScalingFactor());
                } 

                config.data.datasets.push(newDataset);
                window.myLine.update();`;
            this.webView1.evaluateJS(script, () => { });
        }
        this.btnRemoveDataset.onPress = () => {
            const script = `
            config.data.datasets.splice(0, 1);
            window.myLine.update();`;
            this.webView1.evaluateJS(script, () => { });
        }
        this.btnAddData.onPress = () => {
            const script = `
            if (config.data.datasets.length > 0) {
                const month = MONTHS[config.data.labels.length % MONTHS.length];
                config.data.labels.push(month);

                config.data.datasets.forEach(function(dataset) {
                    dataset.data.push(randomScalingFactor());
                });

                window.myLine.update();
            }`;
            this.webView1.evaluateJS(script, () => { });
        }
        this.btnRemoveData.onPress = () => {
            const script = `
            config.data.labels.splice(-1, 1); // remove the label first

            config.data.datasets.forEach(function(dataset, datasetIndex) {
                dataset.data.pop();
            });

            window.myLine.update();`;
            this.webView1.evaluateJS(script, () => { });
        }
    }
}


function onShow(superOnShow: () => void) {
    superOnShow();
    this.webView1.loadURL("https://az793023.vo.msecnd.net/examples/sf-core/webview/chart.html");
}

function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initComponents();
}