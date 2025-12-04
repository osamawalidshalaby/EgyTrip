import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BookingsChart = () => {
  const data = [
    { name: 'Week 1', bookings: 40 },
    { name: 'Week 1.5', bookings: 65 },
    { name: 'Week 2', bookings: 50 },
    { name: 'Week 2.5', bookings: 90 },
    { name: 'Week 3', bookings: 75 },
    { name: 'Week 3.5', bookings: 110 },
    { name: 'Week 4', bookings: 95 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        
        <defs>
          <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0dcaf0" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#0dcaf0" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#adb5bd'}} 
            interval={1} 
        />

        <Tooltip 
            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />

        <Area 
            type="monotone" 
            dataKey="bookings" 
            stroke="#0dcaf0" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBookings)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BookingsChart;