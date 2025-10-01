import * as Plotly from "plotly.js";

export interface BlackBoxFigure {
  data: Array<Plotly.PlotData>;
  layout: Partial<Plotly.Layout>;
}
