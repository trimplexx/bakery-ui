import BarChart from "../../components/admin/BarChart";
import DoughnutChart from "../../components/admin/DoughnutChart";
import React, {useEffect, useState} from "react";
import {errorNotify} from "../../helpers/ToastNotifications";
import apiAdmin from "../../utils/apiAdmin";
import LoadingComponent from "../../components/common/LoadingComponent";

const AdminHome = () => {
    const [lastDaysSalary, setLastDaysSalary] = useState([]);
    const [productsLeft, setProductsLeft] = useState([]);
    const [unfulfilledOrders, setUnfulfilledOrders] = useState([]);
    const [numberOfOrders, setNumberOfOrders] = useState({});
    const [triggerFetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await apiAdmin.fetchLastDaysSalary(setLastDaysSalary, errorNotify);
            await apiAdmin.fetchProductsLeft(setProductsLeft, errorNotify);
            await apiAdmin.fetchUnfulfilledOrders(setUnfulfilledOrders, errorNotify);
            await apiAdmin.fetchNumberOfOrders(setNumberOfOrders, errorNotify);
        };
        Promise.all([fetchData()]).then(() => {
            setIsLoading(false);
        });
    }, [triggerFetch]);


    const chartData = {
        labels: [], datasets: [{
            label: 'Suma zarobków ostatnie 7 dni (PLN)',
            data: [],
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgb(180,29,210,0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(231, 233, 237, 1)'],
            borderWidth: 1
        }]
    };

    if (lastDaysSalary.length > 0) {
        chartData.labels = lastDaysSalary.map(day => day.date);
        chartData.datasets[0].data = lastDaysSalary.map(day => day.earnings);
    }


    const data = {
        labels: ['Zrealizowane', 'Pozostałe'], datasets: [{
            data: [numberOfOrders.fulfilledOrders, numberOfOrders.unfulfilledOrders],
            backgroundColor: ['#68D391', '#FC8181'],
            hoverBackgroundColor: ['#4CAF50', '#E53E3E'],
        },],
    };

    const options = {
        maintainAspectRatio: false, responsive: true, legend: {
            display: true, position: 'bottom', labels: {
                fontColor: 'black',
            },
        },
    };


    return (<div>
            {isLoading ? <LoadingComponent/> :
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 gap-x-10 xl:h-adminCustom pb-10">
                    <div className="border-2 border-gray-400 rounded-md bg-gray-100 h-full shadow-lg">
                        <BarChart chartData={chartData}/>
                    </div>
                    <div className="border-2 border-gray-400 rounded-md px-2 sm:p-6 bg-gray-100 shadow-lg h-full overflow-y-auto hover:shadow-xl transition duration-300">
                        <div className="flex justify-center mb-4">
                            <h3 className="text-2xl font-bold">Pozostałe produkty na dziś</h3>
                        </div>
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">Nazwa produktu</th>
                                <th className="py-2 px-4">Pozostała ilość</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productsLeft.map((product, index) => (<tr key={index} className="border-b border-gray-300">
                                <td className="py-2 px-4">
                                    <div className="flex justify-center">{product.productName}</div>
                                </td>
                                <td className="py-2 px-4">
                                    <div className="flex justify-center">{product.quantityLeft}</div>
                                </td>
                            </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-2 border-gray-400 rounded-md py-4 px-2 sm:p-6 bg-gray-100 shadow-lg  h-full overflow-y-auto hover:shadow-xl transition duration-300">
                        <div className="flex justify-center items-center mb-4">
                            <h3 className="text-xl sm:text-2xl flex items-center font-bold">Niezrealizowane zamówienia dziś</h3>
                        </div>
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">Numer telefonu</th>
                                <th className="py-2 px-4">Produkty</th>
                                <th className="py-2 px-4">Suma</th>
                            </tr>
                            </thead>
                            <tbody>
                            {unfulfilledOrders.map((order, index) => (
                                <tr key={index} className="border-b border-gray-300">
                                    <td className="py-2 px-4">
                                        <div className="flex justify-center">{order.phoneNumber || 'Brak danych'}</div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex flex-col justify-center">
                                            {order.orderedProducts.map((product, i) => (<div key={i}>
                                                <span>{product.productName}</span> x<span>{product.quantity}</span>
                                            </div>))}
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex justify-center">{order.totalOrderPrice}</div>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="border-2 border-gray-400 rounded-md p-6 bg-gray-100 shadow-lg  h-[400px] overflow-y-auto">
                        <DoughnutChart data={data} options={options}/>
                    </div>
                </div>}
        </div>
    );
};

export default AdminHome;
