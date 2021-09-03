import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
// import { useEffect } from "react";
import { useRef } from "react";

const ChartRevenue = (props) => {
  const { data, id } = props;
  console.log("render");
  const chartA = useRef(null);
  // let chart = am4core.create("chart", am4charts.PieChart);
  useLayoutEffect(() => {
    console.log("render chart");
    am4core.useTheme(am4themes_animated);
    // Create chart instance
    // let chart = am4core.create("chart", am4charts.PieChart);
    let chart = am4core.create(id, am4charts.PieChart);
    console.log(chart);
    // Add data
    chart.data = [
      {
        country: "Lithuania",
        litres: 501.9,
      },
      {
        country: "Czechia",
        litres: 301.9,
      },
      {
        country: "Ireland",
        litres: 201.1,
      },
      {
        country: "Germany",
        litres: 165.8,
      },
      {
        country: "Australia",
        litres: 139.9,
      },
      {
        country: "Austria",
        litres: 128.3,
      },
      {
        country: "UK",
        litres: 99,
      },
      {
        country: "Belgium",
        litres: 60,
      },
      {
        country: "The Netherlands",
        litres: 50,
      },
    ];

    // Set inner radius
    chart.innerRadius = am4core.percent(70);
    chart.radius = am4core.percent(85);
    // chart.legend = new am4charts.Legend();
    // chart.legend.valueLabels.template.text = "{category.category}";

    let label = chart.seriesContainer.createChild(am4core.Label);
    label.text = "200.000";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 30;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.stroke = am4core.color("#f0f2f5");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.text = "{category}";

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chartA.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);
  return (
    <div style={{ marginBottom: "50px" }}>
      <div style={{ height: "275px" }} id={id}></div>
    </div>
  );
};

ChartRevenue.propTypes = {};

export default ChartRevenue;
