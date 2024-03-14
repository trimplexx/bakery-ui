import { useState } from 'react';
import Faq from "../../components/user/Faq";

const FaqPage = () => {
    const [faqs, setFaqs] = useState([
        {
            question: 'Co daje rejestracja konta w naszej piekarni?',
            answer: 'Rejestracja konta pozwala przede wszystkim na wgląd do wykonanej historii zamówień w naszej piekarni, dzięki podaniu numeru telefonu. '+
                'Zamówienie zrealizowane z wyprzedzeniem maksymalnie do 2 godzin przed zamknięciem naszej piekarni w danym dniu możliwe jest do anulowania przez zarejestrowanego użytkownika. '+
                'Jeżeli więc wykonałeś zamówienie na określony numer telefonu bez konta, a następnie stworzyłeś konto, to zamówienie będzie dostępne do wglądu w zakładce, '+
                'po kliknięciu ikony użytkownika po zalogowaniu na konto.',
            open: false
        },
        {
            question: 'Brakuje dostępnych produktów na późniejsze daty.',
            answer: 'W naszej piekarni uzupełniamy na bieżąco każdy z naszych produktów oraz aktualizujemy wartości przedstawione na naszej stronie. '+
                'Stan produktów odzwierciedla realną ilość dostępną w naszym fizycznym lokalu.',
            open: false
        },
        {
            question: 'Jak wykonać zamówienie?',
            answer: 'Wykonywanie zamówień w naszej piekarni jest banalnie proste. Przejdź do zakładki "Produkty", dostępnej na pasku na górze ekranu. '+
                'Otworzy się strona z dostępnymi produktami, na stronie w pierwszej kolejności wybierz datę na którą chcesz złożyć swoje zamówienie. '+
                'Następnie poniżej znajduje się lista dostępnych w piekarni produktów, każdy z produktów posiada ikonę informującą o jego dostępności w danym dniu. '+
                'Jeżeli produkt jest dostępny, możesz dodać go do swojego koszyka klikając właśnie ikonę koszyka znajdującą się przy produkcie, '+
                'bądź przechodząc do strony danego produktu oraz wybierając porządaną wartość, którą chcesz zamówić. '+
                'Po dodaniu produktów do koszyka wysuń go za pomocą ikony, która znajduje się w prawym górnym rogu ekranu, wybierz w dostępnym polu swoje zamówienie, które sygnowane jest datą. '+
                'Następnie przejdź do realizacji. Wypełnij potrzebne informacje oraz kliknij "Zamów". Teraz pozostaje już tylko przyjść do naszego lokalu, zapłacić za swoje produkty oraz cieszyć się niesamowitą jakością.',
            open: false
        },
        {
            question: 'Nie mogę anulować swojego zamówienia.',
            answer: 'Jeżeli założyłeś konto w naszej piekarni, oraz wykonałeś zamówienie na telefon, który jest przypisany do twojego konta, masz możliwość anulowania zamówień. Zamówienia można anulować na 2 godziny przed zamknięciem naszego lokalu dla daty, na którą wykonane zostało zamówienie. Oczywiście zamówienia wykonane dla późniejszej daty możesz anulować o każdej porze w dni poprzedzające.',
            open: false
        },
        {
            question: 'Nie mogę wykonać zamówienia na dzień dzisiejszy.',
            answer: 'Nasza piekarnia przewiduje, że nie można wykonywać zamówień na 15 min przed zamknięciem naszego lokalu w dniu na który chcesz wykonać zamówienie. Śpiesz się oraz wykonuj zamówienia wcześniej.',
            open: false
        },
        {
            question: 'Nie mogę wpisać większej ilości produktu',
            answer: 'Każdy produkt uzupełniany jest na bieżąco przez naszych pracowników, jeżeli nie możesz wpisać większej wartości dla produktu, to znaczy, że widniejąca w polu do wpisywania wartości ilość jest maksymalną dostępną dla wybranego produktu.',
            open: false
        },
        {
            question: 'Posiadam inny problem.',
            answer: 'Jeżeli posiadasz inny problem niż te przedstawione powyżej, bądź znalazłeś jakiś błąd na naszej stronie koniecznie skontaktuj się z nami. Możesz to wykonać w prosty sposób przechodząc do strony "Kontakt" oraz wypełniając formularz opisując w nim swój problem, a my odpiszemy ci na niego jak tylko szybko bedzie to możliwe. ',
            open: false
        },
    ]);

    const toggleFAQ = index => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open;
            } else {
                faq.open = false;
            }
            return faq;
        }));
    }

    return (
        <div className="bg-gradient-to-b from-[#F5F5F5] h-full via-gray-300 to-[#F5F5F5] p-2 px-2 sm:p-10 sm:px-10 xl:px-24 2xl:px-40 justify-center flex flex-grow">
            <div className="w-full xl:w-3/4">
                <div className="grid w-full">
                    {faqs.map((faq, i) => (
                        <Faq faq={faq} key={i} index={i} toggleFAQ={toggleFAQ} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;