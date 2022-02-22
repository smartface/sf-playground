import PgWebViewDesign from "generated/pages/pgWebView";
import active from "@smartface/extension-utils/lib/router/active";
import Menu from "@smartface/native/ui/menu";
import MenuItem from "@smartface/native/ui/menuitem";
import pdf from "@smartface/extension-utils/lib/pdf";
import WebViewBridge from "@smartface/extension-utils/lib/webviewbridge";
import Chart from "@smartface/extension-utils/lib/chart";
import Table from "@smartface/extension-utils/lib/table";
import { withDismissAndBackButton } from "@smartface/mixins";
import { Router, Route } from "@smartface/router";


export default class PgWebView extends withDismissAndBackButton(PgWebViewDesign) {
  myMenu: Menu;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.lblMenu.onTouch = () => {
      this.myMenu.show(this);
    };
  }

  renderChartData() {
    const wvb = new WebViewBridge({
      webView: this.webView1,
    });

    wvb.on("markerClick", function (event) {
      console.log("Clicked to a marker on Smartface");
    });

    const chart = new Chart({
      webViewBridge: wvb,
      apexOptions: {
        barOptions: {
          percent: 0.75,
        },
        series: [
          {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          events: {
            markerClick: () => {
              //@ts-ignore
              window.boubleEvent("EVENT_CHART_EVENTS_markerClick");
            },
          },
        },
        dataLabels: {
          enabled: false,
          formatter: function (val, opt) {
            return 100 / opt?.w?.config?.percent;
          },
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        },
      },
    });
    chart.render();
  }

  renderPdfData() {
    pdf.render({
      webView: this.webView1,
      base64pdf:
        "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog" +
        "IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv" +
        "TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K" +
        "Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg" +
        "L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+" +
        "PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u" +
        "dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq" +
        "Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU" +
        "CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu" +
        "ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g" +
        "CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw" +
        "MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v" +
        "dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G",
      zoomEnabled: true,
    });
  }

  renderTableData() {
    const headerColumns = ["First name", "Last name"];
    const bodyColumns = [
      { first: "Shmi", last: "Skywalker" },
      { first: "Anakin", last: "Skywalker" },
      { first: "Luke", last: "Skywalker" },
      { first: "Leia", last: "Organa" },
      { first: "Han", last: "Solo" },
    ];

    const table = new Table({
      webView: this.webView1,
      tableOptions: {
        rows: [
          {
            rowStyles: {
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "#000",
            },
            columns: headerColumns.map((key) => ({ key })),
          },
          ...bodyColumns.map((column) => ({
            rowStyles: {
              padding: "10px 0",
              borderBottom: "1px solid #000",
            },
            columns: [{ key: column.first }, { key: column.last }],
          })),
        ],
      },
    });
    table.render();
  }

  handleDataRender(item: string) {
    switch (item) {
      case "Chart":
        this.renderChartData();
        break;
      case "Pdf":
        this.renderPdfData();
        break;
      case "Table":
        this.renderTableData();
        break;
    }
  }

  onShow() {
    super.onShow();
    this.initBackButton(this.router);
    this.headerBar.title = active.page.pageName;
  }

  onLoad() {
    super.onLoad();
    this.myMenu = new Menu();
    ["Chart", "Pdf", "Table"].forEach((item) => {
      //@ts-ignore
      const menuItem = new MenuItem({
        title: item,
        onSelected: () => {
          this.handleDataRender(item);
        },
      });
      this.myMenu.items.push(menuItem);
    });
  }
}
