import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import "../style.scss";

import React, { useLayoutEffect } from "react";
import { useRef } from "react";

const ChartBestSeller = (props) => {
  const { dataBestSeller, id } = props;
  const chartA = useRef(null);
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create(id, am4charts.XYChart);

    let data = dataBestSeller;

    chart.data = data;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.minGridDistance = 15;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
    categoryAxis.renderer.labels.template.rotation = -90;
    categoryAxis.renderer.labels.template.horizontalCenter = "left";
    categoryAxis.renderer.labels.template.location = 0.5;

    categoryAxis.renderer.labels.template.adapter.add(
      "dx",
      function (dx, target) {
        return -target.maxRight / 2;
      }
    );

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.renderer.axisFills.template.disabled = true;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "category";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0;
    series.strokeOpacity = 1;
    series.strokeDashArray = "1,3";
    series.columns.template.width = 0.01;
    series.tooltip.pointerOrientation = "horizontal";

    let bullet = series.bullets.create(am4charts.CircleBullet);

    chart.cursor = new am4charts.XYCursor();

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chartA.current = chart;
    return () => {
      chart.dispose();
    };
  }, []);
  return (
    <div className="best-seller">
      <div>
        <h2>Best Seller</h2>
      </div>
      <div style={{ marginBottom: "50px" }}>
        <div style={{ height: "375px" }} id={id}></div>
      </div>
    </div>
  );
};

ChartBestSeller.propTypes = {};

export default ChartBestSeller;
