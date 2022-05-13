import * as echarts from "echarts";
import type { EChartsOption, EChartsType } from "echarts";
import chinaMap from "../map/china.json";

echarts.registerMap("china", chinaMap);

interface ElchartF {
  echartsInstance: EChartsType,
  setChartOption: (options: EChartsOption) => void,
  updateSize: () => void
}
export default function (el: HTMLElement): ElchartF {
  const echartsInstance = echarts.init(el);
  const setChartOption = function (options: EChartsOption) {
    echartsInstance.setOption(options);
  };
  window.addEventListener("resize", () => {
    echartsInstance.resize();
  });
  const updateSize = () => {
    echartsInstance.resize();
  };
  return {
    echartsInstance,
    setChartOption,
    updateSize
  };
}
