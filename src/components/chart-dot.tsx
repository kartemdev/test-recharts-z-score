import { DotProps } from "recharts";

import { DataPoint, DataPointChartColorEnum, DataPointChartKeyEnum } from "../types";

interface Props extends DotProps {
  dataKey: DataPointChartKeyEnum;
  payload?: DataPoint;
  isActive?: boolean;
}

const CustomChartDot = ({ cx, cy, payload, dataKey, isActive }: Props) => {
  const zScore = payload?.[`${dataKey}Z`];
  const isAnomaly = Math.abs(zScore ?? 0) > 1;
  let color =
    dataKey === DataPointChartKeyEnum.PV
    ? DataPointChartColorEnum.PV
    : DataPointChartColorEnum.UV;

  if (isAnomaly) {
    color = DataPointChartColorEnum.Z_SCORE;
  }

  return <circle cx={cx} cy={cy} r={isActive ? 8 : 5} fill={color} stroke="white" />;
};

export default CustomChartDot;
