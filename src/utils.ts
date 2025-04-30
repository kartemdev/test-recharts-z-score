import { DataPoint, DataPointChartKeyEnum } from "./types";

export const calculateZScores = (arr: number[]) => {
  const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
  const stdDev = Math.sqrt(arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length);

  return arr.map(val => (val - mean) / stdDev);
};

export const prepareData = (data: DataPoint[]) => {
  const pvValues = data.map(d => d.pv);
  const uvValues = data.map(d => d.uv);

  const pvZScores = calculateZScores(pvValues);
  const uvZScores = calculateZScores(uvValues);

  return data.map((d, index) => ({
    ...d,
    pvZ: pvZScores[index],
    uvZ: uvZScores[index],
  }));
};

export const generateGradientStops = (
  data: DataPoint[],
  key: DataPointChartKeyEnum,
  colorNormal: string,
  colorAnomaly: string,
) => {
  const stops = [];
  const count = data.length;
  
  for (let i = 0; i < count; i++) {
    const d = data[i];
    const offset = (i / (count - 1)) * 100;
    const isAnomaly = Math.abs(d[`${key}Z`] ?? 0) > 1;
    const color = isAnomaly ? colorAnomaly : colorNormal;

    stops.push({ offset: `${offset}%`, color });
  }

  return stops;
};
