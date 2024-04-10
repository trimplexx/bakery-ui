const StatutePage = () => {
    return (
        <div className="bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-2 px-2 sm:p-10 sm:px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">
            <div className="w-full xl:w-3/4">
                <div className="text-center text-3xl font-bold ">REGULAMIN</div>
                <div className="text-center text-2xl font-bold ">STRONY INTERNETOWEJ</div>
                <div className="text-center text-2xl font-bold mb-6">WWW.TRZEBACHLEBA.PL</div>
                <div className="mb-4">
                    <p className="font-bold">I. Postanowienia ogólne</p>
                    <p className="py-1">1. Niniejszy Regulamin określa zasady korzystania ze strony internetowej www.trzebachleba.pl.</p>
                    <p className="py-1">2. Każdy Użytkownik zobowiązany jest do zapoznania się z niniejszym Regulaminem.</p>
                    <p className="py-1">3. Przystąpienie do korzystania ze strony internetowej jest równoznaczne z akceptacją postanowień niniejszego Regulaminu.</p>
                </div>
                <div className="mb-4">
                    <p className="font-bold">II. Rejestracja na stronie</p>
                    <p className="py-1">1. Aby skorzystać z pełnej funkcjonalności strony, Użytkownik musi zarejestrować się, podając swoje imię i nazwisko, adres e-mail oraz numer telefonu.</p>
                    <p className="py-1">2. Rejestracja na stronie jest dobrowolna i bezpłatna.</p>
                </div>
                <div className="mb-4">
                    <p className="font-bold">III. Zamawianie na stronie</p>
                    <p className="py-1">1. Zamówienia można składać przez całą dobę. Użytkownik wybiera produkty, które chce zamówić, oraz datę swojego zamówienia. Płatność za zamówione produkty następuje na miejscu.</p>
                    <p className="py-1">2. Użytkownik ma prawo anulować swoje zamówienie na 2 godziny przed zamknięciem lokalu w dniu odbioru zamówienia. W celu anulowania zamówienia, użytkownik może skontaktować się bezpośrednio z lokalem telefonicznie, bąźd ma prawo wykonać to poprzez stronę, dla zalogowanego numeru telefonu.</p>
                    <p className="py-1">3. Składanie zamówienia przez użytkownika zoobowiązuje go do odbioru oraz zapłaty za zamówione produkty w lokalu fizycznym, w dniu wybranym przez użytkownika.</p>
                    <p className="py-1">4. Nadmierne skłdanie oraz nieodbieranie swoich zamówień wiąże się z blokadą na składanie zamówień na podany przez użytkownika numer telefonu.</p>
                </div>
                <div className="mb-4">
                    <p className="font-bold">IV. Postanowienia końcowe</p>
                    <p className="py-1">1. Właściciel strony zastrzega sobie prawo do wprowadzania zmian w Regulaminie.</p>
                    <p className="py-1">2. Wszelkie zmiany Regulaminu wchodzą w życie z dniem publikacji na stronie internetowej.</p>
                </div>
            </div>
        </div>
    );
};

export default StatutePage;