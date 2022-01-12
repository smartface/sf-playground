import PgChartDesign from "generated/pages/pgChart";
import { Route } from "@smartface/router";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router } from "@smartface/router";
import { backButtonImage } from "lib/constants/style";

export default class PgChart extends withDismissAndBackButton(PgChartDesign) {
  constructor(private router?: Router, private route?: Route) {
    super({});
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
      this.webView1.evaluateJS(script, () => {});
    };
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
      this.webView1.evaluateJS(script, () => {});
    };
    this.btnRemoveDataset.onPress = () => {
      const script = `
            config.data.datasets.splice(0, 1);
            window.myLine.update();`;
      this.webView1.evaluateJS(script, () => {});
    };
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
      this.webView1.evaluateJS(script, () => {});
    };
    this.btnRemoveData.onPress = () => {
      const script = `
            config.data.labels.splice(-1, 1); // remove the label first

            config.data.datasets.forEach(function(dataset, datasetIndex) {
                dataset.data.pop();
            });

            window.myLine.update();`;
      this.webView1.evaluateJS(script, () => {});
    };
  }
  onShow() {
    super.onShow();
    this.initBackButton(this.router, {
      image: backButtonImage,
    });
    this.webView1.loadURL("https://az793023.vo.msecnd.net/examples/sf-core/webview/chart.html");
  }
  onLoad() {
    super.onLoad();
    this.initComponents();
  }
}
