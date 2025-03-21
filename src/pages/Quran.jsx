import { useState } from "react";
import { Link } from "react-router-dom";

const QuranPage = () => {
    const paraList = [
        "الفاتحة", "سيقول", "تلك الرسل", "لن تنالوا", "والمحصنات", "لا يحب الله", "وإذا سمعوا", "ولو أننا", "قد أفلح",
        "يعتذرون", "يعلمون", "وما من دابة", "وما أبرئ", "ربما", "سبحان الذي", "قال ألم", "اقتربت الساعة", "قد أفلح",
        "وقال الذين", "أمن خلق", "اتل ما أوحي", "ومن يقنت", "ومالي", "فمن أظلم", "إليه يرد", "حم السجدة", "قال فما خطبكم",
        "قد سمع الله", "تبارك الذي", "عم يتساءلون"
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-6">قرآن - پارے منتخب کریں</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {paraList.map((para, index) => (
                    <Link
                        key={index}
                        to={`/para/${index + 1}`}
                        className="bg-green-500 text-white py-4 px-6 rounded-lg shadow-lg text-xl font-semibold text-center hover:bg-green-600 transition w-full block text-center"
                    >
                        {index + 1}. {para}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuranPage;
