import React from 'react';

const NutritionalTable = ({ register, productsData }) => {
    return (
        <div className="md:col-span-3">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Wartość odżywcza (100g produktu)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ilość
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Wartość energetyczna (KJ/KCAL)
                        </th>
                        <td className="px-6 py-1">
                            <div className="grid grid-cols-3 items-center w-auto">
                                <input {...register("kj")} defaultValue={productsData.kj} type="number" id="kj" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-20 p-2" placeholder="kJ" required/>
                                <div className="text-center mx-0">/</div>
                                <input {...register("kcal")} defaultValue={productsData.kcal} type="number" id="kcal" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-20 p-2" placeholder="Kcal" required/>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Tłuszcz (G)
                        </th>
                        <td className="px-6 py-1">
                            <input {...register("fat")} defaultValue={productsData.fat} type="number" id="fat" step="0.01" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="tłuszcz" required/>
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Kwasy tłuszczowe nasycone (G)
                        </th>
                        <td className="px-6 py-1">
                            <input {...register("saturatedFat")} defaultValue={productsData.saturatedFat} type="number" id="saturatedFat" step="0.01" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="tłuszcze nasycone" required/>
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Węglowodany (G)
                        </th>
                        <td className="px-6 py-1">
                            <input {...register("carbohydrates")} defaultValue={productsData.carbohydrates} type="number" id="carbohydrates" step="0.01" name="carbohydrates" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="węglowodany" required/>
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Cukry (G)
                        </th>
                        <td className="px-6 py-1">
                            <input {...register("sugars")} defaultValue={productsData.sugars} type="number" id="sugars" step="0.01" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="cukry" required/>
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Białka (G)
                        </th>
                        <td className="px-6 py-1">
                            <input {...register("proteins")} defaultValue={productsData.proteins} type="number" id="proteins" step="0.01" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="białko" required/>
                        </td>
                    </tr>
                    <tr className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Sól (G)
                        </th>
                        <td className="px-6 py-1">
                            <input {...register("salt")} defaultValue={productsData.salt} type="number" id="salt" step="0.01" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#fda329] focus:border-[#fda329] block w-auto p-2" placeholder="sól" required/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NutritionalTable;
