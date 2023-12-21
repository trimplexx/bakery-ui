import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ data, options }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const resizeChart = () => {
            if (chartInstance.current) {
                chartInstance.current.resize(); // Aktualizacja rozmiaru wykresu
            }
        };

        // Tworzenie wykresu typu Doughnut
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options,
        });

        // Obsługa zmiany rozmiaru okna
        window.addEventListener('resize', resizeChart);

        return () => {
            // Czyszczenie obserwatora zdarzeń po usunięciu komponentu
            window.removeEventListener('resize', resizeChart);
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Usunięcie wykresu
            }
        };
    }, [data, options]);

    return (
        <canvas
            ref={chartRef}
        ></canvas>
    );
};

export default DoughnutChart;
