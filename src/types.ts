export enum DataPointChartKeyEnum {
  PV = 'pv',
  UV = 'uv',
}

export enum DataPointChartColorEnum {
  PV = '#8884d8',
  UV = '#82ca9d',
  Z_SCORE = '#ff0000',
}

export interface DataPoint {
  name: string;
  [DataPointChartKeyEnum.PV]: number;
  [DataPointChartKeyEnum.UV]: number;
  amt: number;
  pvZ?: number;
  uvZ?: number;
}
