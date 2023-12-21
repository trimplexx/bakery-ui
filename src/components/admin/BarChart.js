import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartRenderer = ({ chartData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const resizeChart = () => {
            if (chartInstance.current) {
                chartInstance.current.resize();
            }
        };

        if (chartRef.current && chartData && chartData.labels.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            window.addEventListener('resize', resizeChart);
        }

        return () => {
            window.removeEventListener('resize', resizeChart);
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    return <canvas ref={chartRef} className="w-full"></canvas>;
};

export default ChartRenderer;
