import { memo, useMemo } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import CustomChartDot from './components/chart-dot';
import { generateGradientStops, prepareData } from './utils';
import { DataPoint, DataPointChartColorEnum, DataPointChartKeyEnum } from './types';

import './App.css';

const rawData: DataPoint[] = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

function App() {
  const data = useMemo(() => prepareData(rawData), []);

  const gradientStops = useMemo(() => ({
    [DataPointChartKeyEnum.PV]: generateGradientStops(
      data,
      DataPointChartKeyEnum.PV,
      DataPointChartColorEnum.PV,
      DataPointChartColorEnum.Z_SCORE,
    ),
    [DataPointChartKeyEnum.UV]: generateGradientStops(
      data,
      DataPointChartKeyEnum.UV,
      DataPointChartColorEnum.UV,
      DataPointChartColorEnum.Z_SCORE
    ),
  }), [data])

  return (
    <div className='app'>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="pvGradient">
              {gradientStops[DataPointChartKeyEnum.PV].map((stop, index) => (
                <stop key={index} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>

            <linearGradient id="uvGradient">
              {gradientStops[DataPointChartKeyEnum.UV].map((stop, index) => (
                <stop key={index} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  />

          <Line
            type="monotone"
            stroke="url(#pvGradient)"
            dataKey={DataPointChartKeyEnum.PV}
            dot={<CustomChartDot dataKey={DataPointChartKeyEnum.PV} />}
            activeDot={<CustomChartDot dataKey={DataPointChartKeyEnum.PV} isActive />}
          />

          <Line
            type="monotone"
            stroke="url(#uvGradient)"
            dataKey={DataPointChartKeyEnum.UV}
            dot={<CustomChartDot dataKey={DataPointChartKeyEnum.UV} />}
            activeDot={<CustomChartDot dataKey={DataPointChartKeyEnum.UV} isActive />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(App);
