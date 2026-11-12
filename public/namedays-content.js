import {formatAttestation} from './namedays-attestation.js';
import {reviewedHistory} from './namedays-history.js';
import {unverifiedHistory,HYPOTHESIS_LABELS} from './namedays-hypotheses.js';
import {rootHistory,reviewedRoot} from './namedays-roots.js';
export const WRITER_VERSION='namedays-1.9.29';
export function nameIdentity(name){return name.normalize('NFD').replace(/(\p{Script=Latin})\p{M}+/gu,'$1').normalize('NFC').replace(/\.$/,'').toLowerCase();}
export const LANGUAGES=['lv','ru','en','lt','et'];
const bundles={
 "ru": {
  "recordedLabel": "Имя в старых записях",
  "recordedNote": "В найденной записи — {form}. Это дата записи, а не появления имени.",
  "title": "Именины",
  "yesterday": "Вчера",
  "today": "Сегодня",
  "tomorrow": "Завтра",
  "history": "История",
  "people": "Тёзки",
  "wish": "Поздравить",
  "serious": "От души",
  "humor": "С юмором",
  "close": "Закрыть",
  "all": "Все имена",
  "more": "Ещё {n}",
  "loading": "Загружаем имена…",
  "error": "Не удалось загрузить именины.",
  "retry": "Попробовать снова",
  "empty": "В календаре нет имён на эту дату.",
  "country": "Календарь",
  "lv": "Латвия",
  "lt": "Литва",
  "ee": "Эстония",
  "author": "Исторический контекст",
  "documented": "История имени",
  "origin": "У имени {name} {origins} корни.",
  "related": "Это имя также связывают с именами {names}.",
  "local": "Тёзка из вашего календаря",
  "international": "Международный тёзка",
  "variant": "Родственная форма имени",
  "noPeople": "Известных тёзок мы пока не нашли.",
  "copy": "Скопировать",
  "copied": "Скопировано",
  "copyError": "Выдели и скопируй текст поздравления.",
  "another": "Ещё вариант",
  "calendarDate": "Дата",
  "inYear": "{year} год",
  "century": "{n} век",
  "countryNote": "Имена соответствуют выбранной стране; язык текста меняется отдельно.",
  "namesake": "Среди известных тёзок — {role} {person}.",
  "relatedNamesake": "Родственную форму имени носили, например, {person}.",
  "wordRoots": "В его основе — {words}.",
  "possibleRelated": "Имя может быть связано с {names}.",
  "archivalVariant": "В одном архивном описании один и тот же человек назван {name} и {names}."
 },
 "en": {
  "recordedLabel": "The name in earlier records",
  "recordedNote": "In the record, the name is written {form}. This dates the record, not the creation of the name.",
  "title": "Name day",
  "yesterday": "Yesterday",
  "today": "Today",
  "tomorrow": "Tomorrow",
  "history": "History",
  "people": "Namesakes",
  "wish": "Celebrate",
  "serious": "Heartfelt",
  "humor": "Funny",
  "close": "Close",
  "all": "All names",
  "more": "{n} more",
  "loading": "Loading names…",
  "error": "Could not load name days.",
  "retry": "Try again",
  "empty": "No names are listed for this date.",
  "country": "Calendar",
  "lv": "Latvia",
  "lt": "Lithuania",
  "ee": "Estonia",
  "author": "Historical context",
  "documented": "The name’s history",
  "origin": "{name} has {origins} roots.",
  "related": "The name is also linked with {names}.",
  "local": "A namesake from this country",
  "international": "International namesake",
  "variant": "A related form of the name",
  "noPeople": "We haven’t found any famous namesakes yet.",
  "copy": "Copy",
  "copied": "Copied",
  "copyError": "Select and copy the greeting text.",
  "another": "Another version",
  "calendarDate": "Date",
  "inYear": "{year}",
  "century": "{n}th century",
  "countryNote": "Names follow the selected country; text language is independent.",
  "namesake": "Famous namesakes include the {role} {person}.",
  "relatedNamesake": "A related form of the name was borne by {person}.",
  "wordRoots": "Its roots include {words}.",
  "possibleRelated": "The name may be connected with {names}.",
  "archivalVariant": "One archive description uses both {name} and {names} for the same person."
 },
 "lv": {
  "recordedLabel": "Vārds senākos pierakstos",
  "recordedNote": "Atrastajā pierakstā vārds rakstīts kā {form}. Tas ir ieraksta, nevis vārda rašanās datējums.",
  "title": "Vārda diena",
  "yesterday": "Vakar",
  "today": "Šodien",
  "tomorrow": "Rīt",
  "history": "Vēsture",
  "people": "Vārdabrāļi",
  "wish": "Apsveikt",
  "serious": "No sirds",
  "humor": "Ar humoru",
  "close": "Aizvērt",
  "all": "Visi vārdi",
  "more": "Vēl {n}",
  "loading": "Ielādē vārdus…",
  "error": "Neizdevās ielādēt vārdadienas.",
  "retry": "Mēģināt vēlreiz",
  "empty": "Šim datumam kalendārā nav vārdu.",
  "country": "Kalendārs",
  "lv": "Latvija",
  "lt": "Lietuva",
  "ee": "Igaunija",
  "author": "Vēsturiskais konteksts",
  "documented": "Vārda vēsture",
  "origin": "Vārdam {name} ir {origins} saknes.",
  "related": "Šo vārdu saista arī ar vārdiem {names}.",
  "local": "Vārdabrālis no šīs valsts",
  "international": "Starptautisks vārdabrālis",
  "variant": "Radniecīga vārda forma",
  "noPeople": "Slavenus vārdabrāļus vēl neesam atraduši.",
  "copy": "Kopēt",
  "copied": "Nokopēts",
  "copyError": "Iezīmē un nokopē apsveikuma tekstu.",
  "another": "Cits variants",
  "calendarDate": "Datums",
  "inYear": "{year}. gads",
  "century": "{n}. gadsimts",
  "countryNote": "Vārdi atbilst izvēlētajai valstij; teksta valoda ir neatkarīga.",
  "namesake": "Starp pazīstamiem vārdabrāļiem ir {role} {person}.",
  "relatedNamesake": "Radniecīgu vārda formu nesa, piemēram, {person}.",
  "wordRoots": "Tā pamatā ir {words}.",
  "possibleRelated": "Vārds var būt saistīts ar {names}.",
  "archivalVariant": "Vienā arhīva aprakstā viens un tas pats cilvēks minēts kā {name} un {names}."
 },
 "lt": {
  "recordedLabel": "Vardas senuose užrašuose",
  "recordedNote": "Rastame užraše vardas parašytas {form}. Tai įrašo, o ne vardo atsiradimo data.",
  "title": "Vardadienis",
  "yesterday": "Vakar",
  "today": "Šiandien",
  "tomorrow": "Rytoj",
  "history": "Istorija",
  "people": "Bendravardžiai",
  "wish": "Pasveikinti",
  "serious": "Nuoširdžiai",
  "humor": "Su humoru",
  "close": "Uždaryti",
  "all": "Visi vardai",
  "more": "Dar {n}",
  "loading": "Įkeliami vardai…",
  "error": "Nepavyko įkelti vardadienių.",
  "retry": "Bandyti dar kartą",
  "empty": "Šiai datai kalendoriuje vardų nėra.",
  "country": "Kalendorius",
  "lv": "Latvija",
  "lt": "Lietuva",
  "ee": "Estija",
  "author": "Istorinis kontekstas",
  "documented": "Vardo istorija",
  "origin": "Vardas {name} turi {origins} šaknis.",
  "related": "Šis vardas taip pat siejamas su vardais {names}.",
  "local": "Šios šalies bendravardis",
  "international": "Tarptautinis bendravardis",
  "variant": "Gimininga vardo forma",
  "noPeople": "Garsių bendravardžių dar neradome.",
  "copy": "Kopijuoti",
  "copied": "Nukopijuota",
  "copyError": "Pažymėk ir nukopijuok sveikinimo tekstą.",
  "another": "Kitas variantas",
  "calendarDate": "Data",
  "inYear": "{year} m.",
  "century": "{n} a.",
  "countryNote": "Vardai priklauso pasirinktai šaliai, o teksto kalba pasirenkama atskirai.",
  "namesake": "Tarp žinomų bendravardžių yra {role} {person}.",
  "relatedNamesake": "Giminingą vardo formą turėjo, pavyzdžiui, {person}.",
  "wordRoots": "Vardo šaknys — {words}.",
  "possibleRelated": "Vardas gali sietis su {names}.",
  "archivalVariant": "Viename archyvo apraše tas pats žmogus įvardytas kaip {name} ir {names}."
 },
 "et": {
  "recordedLabel": "Nimi vanades kirjapanekutes",
  "recordedNote": "Leitud kirjapanekus on nimekujuks {form}. See on ülestähenduse, mitte nime tekkimise aeg.",
  "title": "Nimepäev",
  "yesterday": "Eile",
  "today": "Täna",
  "tomorrow": "Homme",
  "history": "Lugu",
  "people": "Nimekaimud",
  "wish": "Õnnitle",
  "serious": "Südamest",
  "humor": "Huumoriga",
  "close": "Sulge",
  "all": "Kõik nimed",
  "more": "Veel {n}",
  "loading": "Nimede laadimine…",
  "error": "Nimepäevade laadimine ebaõnnestus.",
  "retry": "Proovi uuesti",
  "empty": "Selle kuupäeva kohta kalendris nimesid pole.",
  "country": "Kalender",
  "lv": "Läti",
  "lt": "Leedu",
  "ee": "Eesti",
  "author": "Ajalooline taust",
  "documented": "Nime ajalugu",
  "origin": "Nimel {name} on {origins} juured.",
  "related": "Seda nime seostatakse ka nimedega {names}.",
  "local": "Selle riigi nimekaim",
  "international": "Rahvusvaheline nimekaim",
  "variant": "Nime sugulasvorm",
  "noPeople": "Me pole veel kuulsaid nimekaime leidnud.",
  "copy": "Kopeeri",
  "copied": "Kopeeritud",
  "copyError": "Vali õnnitluse tekst ja kopeeri see.",
  "another": "Teine variant",
  "calendarDate": "Kuupäev",
  "inYear": "{year}. aasta",
  "century": "{n}. sajand",
  "countryNote": "Nimed vastavad valitud riigile, teksti keel on eraldi valik.",
  "namesake": "Tuntud nimekaimude seas on {role} {person}.",
  "relatedNamesake": "Sugulasvormi kandis näiteks {person}.",
  "wordRoots": "Selle taga on {words}.",
  "possibleRelated": "Nimi võib olla seotud nimedega {names}.",
  "archivalVariant": "Ühes arhiivikirjelduses kasutatakse sama inimese kohta kujusid {name} ja {names}."
 }
};
export function text(lang,key,values={}){return(bundles[lang]?.[key]??bundles.en[key]??key).replace(/\{(\w+)\}/g,(m,k)=>values[k]??m);}
export function hash(value){let h=2166136261;for(const c of value)h=Math.imul(h^c.codePointAt(0),16777619);return h>>>0;}
const traditions={
 "French": [
  "franču",
  "французские",
  "French",
  "prancūzų",
  "prantsuse"
 ],
 "German": [
  "vācu",
  "немецкие",
  "German",
  "vokiečių",
  "saksa"
 ],
 "Old High German": [
  "senaugšvācu",
  "древневерхненемецкие",
  "Old High German",
  "senosios vokiečių aukštaičių",
  "vanaülemsaksa"
 ],
 "Middle High German": [
  "vidusaugšvācu",
  "средневерхненемецкие",
  "Middle High German",
  "vidurinės vokiečių aukštaičių",
  "keskülemsaksa"
 ],
 "English": [
  "angļu",
  "английские",
  "English",
  "anglų",
  "inglise"
 ],
 "Latin": [
  "latīņu",
  "латинские",
  "Latin",
  "lotynų",
  "ladina"
 ],
 "Ancient Greek": [
  "sengrieķu",
  "древнегреческие",
  "Ancient Greek",
  "senovės graikų",
  "vanakreeka"
 ],
 "Greek": [
  "grieķu",
  "греческие",
  "Greek",
  "graikų",
  "kreeka"
 ],
 "Hebrew": [
  "ivrita",
  "древнееврейские",
  "Hebrew",
  "hebrajų",
  "heebrea"
 ],
 "Russian": [
  "krievu",
  "русские",
  "Russian",
  "rusų",
  "vene"
 ],
 "Germanic languages": [
  "ģermāņu",
  "германские",
  "Germanic",
  "germanų",
  "germaani"
 ],
 "Proto-Germanic": [
  "pirmģermāņu",
  "прагерманские",
  "Proto-Germanic",
  "germanų prokalbės",
  "alggermaani"
 ],
 "Swedish": [
  "zviedru",
  "шведские",
  "Swedish",
  "švedų",
  "rootsi"
 ],
 "Danish": [
  "dāņu",
  "датские",
  "Danish",
  "danų",
  "taani"
 ],
 "Finnish": [
  "somu",
  "финские",
  "Finnish",
  "suomių",
  "soome"
 ],
 "Estonian": [
  "igauņu",
  "эстонские",
  "Estonian",
  "estų",
  "eesti"
 ],
 "Latvian": [
  "latviešu",
  "латышские",
  "Latvian",
  "latvių",
  "läti"
 ],
 "Lithuanian": [
  "lietuviešu",
  "литовские",
  "Lithuanian",
  "lietuvių",
  "leedu"
 ],
 "Polish": [
  "poļu",
  "польские",
  "Polish",
  "lenkų",
  "poola"
 ],
 "Arabic": [
  "arābu",
  "арабские",
  "Arabic",
  "arabų",
  "araabia"
 ],
 "Italian": [
  "itāļu",
  "итальянские",
  "Italian",
  "italų",
  "itaalia"
 ],
 "Spanish": [
  "spāņu",
  "испанские",
  "Spanish",
  "ispanų",
  "hispaania"
 ],
 "Persian": [
  "persiešu",
  "персидские",
  "Persian",
  "persų",
  "pärsia"
 ],
 "Sanskrit": [
  "sanskrita",
  "санскритские",
  "Sanskrit",
  "sanskrito",
  "sanskriti"
 ],
 "Old Norse": [
  "senskandināvu",
  "древнескандинавские",
  "Old Norse",
  "senovės skandinavų",
  "vanapõhja"
 ],
 "Slavic": [
  "slāvu",
  "славянские",
  "Slavic",
  "slavų",
  "slaavi"
 ],
 "Celtic": [
  "ķeltu",
  "кельтские",
  "Celtic",
  "keltų",
  "keldi"
 ],
 "Hungarian": [
  "ungāru",
  "венгерские",
  "Hungarian",
  "vengrų",
  "ungari"
 ],
 "Aramaic": [
  "aramiešu",
  "арамейские",
  "Aramaic",
  "aramėjų",
  "aramea"
 ],
 "Assyrian": [
  "asīriešu",
  "ассирийские",
  "Assyrian",
  "asirų",
  "assüüria"
 ],
 "Iranian": [
  "irāņu",
  "иранские",
  "Iranian",
  "iranėnų",
  "iraani"
 ],
 "Czech": [
  "čehu",
  "чешские",
  "Czech",
  "čekų",
  "tšehhi"
 ],
 "Scandinavian": [
  "skandināvu",
  "скандинавские",
  "Scandinavian",
  "skandinavų",
  "skandinaavia"
 ],
 "Anglo-Saxon": [
  "anglosakšu",
  "англосаксонские",
  "Anglo-Saxon",
  "anglosaksų",
  "anglosaksi"
 ],
 "Occitan": [
  "oksitāņu",
  "окситанские",
  "Occitan",
  "oksitanų",
  "oksitaani"
 ]
};
const registryKinds={
 "compound": [
  "Vārds {name} veidots, savienojot divus vārda celmus.",
  "Имя {name} сложили из двух основ.",
  "The name {name} was made by joining two name stems.",
  "Vardas {name} sudėtas iš dviejų kamienų.",
  "Nimi {name} on kokku pandud kahest nimetüvest."
 ],
 "word": [
  "Vārds {name} radies no ikdienā lietota vārda.",
  "Имя {name} выросло из обычного слова.",
  "The name {name} grew out of an everyday word.",
  "Vardas {name} kilo iš kasdienio žodžio.",
  "Nimi {name} kasvas välja tavalisest sõnast."
 ],
 "short": [
  "Vārds {name} radies kā garāka vārda īsā forma.",
  "Имя {name} появилось как короткая форма более длинного имени.",
  "The name {name} began as a shorter form of a longer name.",
  "Vardas {name} atsirado kaip trumpesnė ilgesnio vardo forma.",
  "Nimi {name} sai alguse pikema nime lühivormina."
 ],
 "place": [
  "Vārda {name} sākums meklējams kādas vietas nosaukumā.",
  "За именем {name} стоит название места.",
  "The name {name} began with the name of a place.",
  "Vardo {name} pradžia slypi vietovės pavadinime.",
  "Nime {name} taga on ühe paiga nimi."
 ],
 "created": [
  "Vārds {name} ir jaunradīts personvārds.",
  "Имя {name} когда-то придумали заново.",
  "The name {name} was coined as a new personal name.",
  "Vardas {name} buvo sukurtas kaip naujas asmenvardis.",
  "Nimi {name} mõeldi välja uue isikunimena."
 ]
};
const wishes={
 "ru": {
  "serious": [
   "{name}, с именинами! Пусть будет кому позвонить с хорошей новостью, с кем посмеяться и к кому прийти просто так. Желаю тёплого дома и людей, рядом с которыми легко.",
   "{name}, желаю времени на всё, что любишь: на долгий завтрак, прогулку без маршрута и разговор, который не хочется заканчивать. Пусть таких дней будет больше. С именинами!",
   "{name}, с именинами! Пусть задуманное получается, а рядом будут люди, которые поддержат и порадуются вместе с тобой. И пусть сегодня обязательно случится что-нибудь приятное.",
   "{name}, желаю просыпаться с хорошими планами и возвращаться туда, где тебя ждут. Пусть хватает сил на любимое дело, а после него остаётся время на жизнь. С праздником!",
   "{name}, пусть впереди будет поездка, которую давно хотелось устроить, встреча, которой ждёшь, и хорошая новость без особого повода. С именинами!",
   "{name}, с именинами! Желаю здоровья, спокойных вечеров и побольше поводов собираться за одним столом. Пусть близкие чаще говорят вслух, как ты им дорог."
  ],
  "humor": [
   "{name}, с именинами! Сегодня все срочные дела получают новое имя — «Завтра». А тебе достаются торт, поздравления и право первым выбрать самый большой кусок.",
   "{name}, у твоего имени сегодня праздник. Предлагаю отметить это так, чтобы завтра холодильник мог рассказать: «Да, было весело. Нет, торта не осталось».",
   "{name}, пусть деньги находят дорогу к тебе так же уверенно, как гости — к запаху пирога. А проблемы пусть хотя бы раз перепутают адрес. С именинами!",
   "{name}, с именинами! Пусть будильник проспит, кофе сварится сам, а человек с вопросом «можно на минутку?» принесёт с собой подарок.",
   "{name}, желаю столько хороших новостей, чтобы телефон уставал раньше тебя. И столько свободного времени, чтобы наконец прочитать их не на бегу. С праздником!",
   "{name}, сегодня можно брать добавку и говорить: «Это в честь имени». Если кто-то спросит, при чём здесь третья порция, отвечай: имя красивое, повод серьёзный. С именинами!"
  ]
 },
 "en": {
  "serious": [
   "{name}, happy name day! May there always be someone to call with good news, someone to laugh with and a door you can knock on just because. Here’s to a warm home and people who make you feel at ease.",
   "{name}, I wish you time for what you love: a long breakfast, a walk with no route and a conversation you never want to end. May there be more days like that. Happy name day!",
   "{name}, happy name day! May your plans work out, with people beside you who help along the way and celebrate with you. And may something lovely happen today.",
   "{name}, may you wake up with plans to look forward to and come home to people glad to see you. May your favourite work leave you energy for the rest of life. Happy name day!",
   "{name}, here’s to the trip you’ve been meaning to take, a reunion you’re looking forward to and good news on an ordinary day. Happy name day!",
   "{name}, happy name day! I wish you good health, peaceful evenings and plenty of reasons to gather around one table. May the people you love tell you often how much you mean to them."
  ],
  "humor": [
   "{name}, happy name day! Every urgent task has a new name today: Tomorrow. You get the cake, the greetings and first choice of the biggest slice.",
   "{name}, your name has its own holiday. Let’s celebrate until the fridge can report tomorrow: “Yes, it was fun. No, there’s no cake left.”",
   "{name}, may money find you as easily as guests find a freshly baked pie. May problems get the address wrong for once. Happy name day!",
   "{name}, happy name day! May your alarm oversleep, your coffee make itself and anyone asking for a quick minute bring a present.",
   "{name}, may you get so much good news that your phone gets tired before you do. And enough free time to read it sitting down. Happy name day!",
   "{name}, today you can ask for seconds and say it’s in honour of your name. If anyone questions the third helping, explain that a lovely name deserves a proper celebration. Happy name day!"
  ]
 },
 "lv": {
  "serious": [
   "{name}, sveicu vārda dienā! Lai vienmēr ir kam piezvanīt ar labām ziņām, ar ko pasmieties un pie kā iegriezties tāpat vien. Vēlu siltas mājas un cilvēkus, kuru tuvumā ir viegli būt.",
   "{name}, vēlu laiku visam mīļajam: garām brokastīm, pastaigai bez maršruta un sarunai, kuru negribas beigt. Lai šādu dienu ir vairāk. Priecīgu vārda dienu!",
   "{name}, sveicu vārda dienā! Lai iecerētais izdodas un blakus ir cilvēki, kuri palīdz un priecājas kopā ar tevi. Lai šodien noteikti notiek kas patīkams.",
   "{name}, lai no rīta gaida labi plāni un vakarā — mājas, kur tevi priecājas redzēt. Lai pietiek spēka mīļajam darbam un pēc tā paliek laiks arī dzīvei. Priecīgus svētkus!",
   "{name}, lai priekšā ir sen iecerēts ceļojums, gaidīta tikšanās un laba ziņa pavisam parastā dienā. Priecīgu vārda dienu!",
   "{name}, sveicu vārda dienā! Vēlu veselību, mierīgus vakarus un vairāk iemeslu sanākt pie viena galda. Lai tuvie biežāk pasaka, cik daudz tu viņiem nozīmē."
  ],
  "humor": [
   "{name}, sveicu vārda dienā! Visi steidzamie darbi šodien iegūst jaunu vārdu — «Rīt». Tev pienākas torte, sveicieni un tiesības pirmajam izvēlēties lielāko gabalu.",
   "{name}, tavam vārdam šodien ir svētki. Nosvinēsim tā, lai ledusskapis rīt varētu ziņot: «Jā, bija jautri. Nē, tortes vairs nav.»",
   "{name}, lai nauda atrod ceļu pie tevis tikpat droši kā viesi pie svaigi cepta pīrāga. Bet problēmas lai kaut reizi sajauc adresi. Priecīgu vārda dienu!",
   "{name}, sveicu vārda dienā! Lai modinātājs aizguļas, kafija uzvārās pati un cilvēks ar jautājumu «var uz minūtīti?» atnes dāvanu.",
   "{name}, vēlu tik daudz labu ziņu, lai tālrunis nogurst ātrāk par tevi. Un tik daudz brīva laika, lai tās beidzot var izlasīt nesteidzoties. Priecīgus svētkus!",
   "{name}, šodien drīkst prasīt papildporciju un teikt: «Tas par godu vārdam.» Ja kāds jautā par trešo porciju, atbilde vienkārša: skaists vārds pelna kārtīgus svētkus. Priecīgu vārda dienu!"
  ]
 },
 "lt": {
  "serious": [
   "{name}, su vardadieniu! Tegul visada yra kam paskambinti su gera naujiena, su kuo pasijuokti ir pas ką užsukti šiaip sau. Linkiu šiltų namų ir žmonių, šalia kurių lengva būti.",
   "{name}, linkiu laiko viskam, ką mėgsti: ilgiems pusryčiams, pasivaikščiojimui be maršruto ir pokalbiui, kurio nesinori baigti. Tegul tokių dienų būna daugiau. Su vardadieniu!",
   "{name}, su vardadieniu! Tegul sumanymai pavyksta, o šalia būna žmonės, kurie padės ir pasidžiaugs kartu. Ir tegul šiandien būtinai nutinka kas nors malonaus.",
   "{name}, linkiu pabusti su gerais planais ir grįžti ten, kur tavęs laukia. Tegul užtenka jėgų mėgstamam darbui, o po jo lieka laiko gyvenimui. Su švente!",
   "{name}, tegul laukia seniai planuota kelionė, išsiilgtas susitikimas ir gera naujiena visai paprastą dieną. Su vardadieniu!",
   "{name}, su vardadieniu! Linkiu sveikatos, ramių vakarų ir daugiau progų susėsti prie vieno stalo. Tegul artimieji dažniau pasako, kiek daug jiems reiški."
  ],
  "humor": [
   "{name}, su vardadieniu! Visi skubūs darbai šiandien gauna naują vardą — «Rytoj». Tau tenka tortas, sveikinimai ir teisė pirmiausia išsirinkti didžiausią gabalą.",
   "{name}, tavo vardas šiandien švenčia. Atšvęskime taip, kad šaldytuvas rytoj galėtų pranešti: «Taip, buvo linksma. Ne, torto nebeliko.»",
   "{name}, tegul pinigai randa kelią pas tave taip užtikrintai, kaip svečiai randa ką tik iškeptą pyragą. O problemos tegul bent kartą supainioja adresą. Su vardadieniu!",
   "{name}, su vardadieniu! Tegul žadintuvas pramiega, kava išsiverda pati, o žmogus su klausimu «galima minutėlei?» atsineša dovaną.",
   "{name}, linkiu tiek gerų naujienų, kad telefonas pavargtų anksčiau už tave. Ir tiek laisvo laiko, kad jas pagaliau perskaitytum neskubant. Su švente!",
   "{name}, šiandien galima prašyti pakartoti ir sakyti: «Čia vardo garbei.» Jei kas paklaustų apie trečią porciją, paaiškink: gražus vardas vertas rimtos šventės. Su vardadieniu!"
  ]
 },
 "et": {
  "serious": [
   "{name}, head nimepäeva! Olgu alati keegi, kellele hea uudisega helistada, kellega naerda ja kelle juurde niisama sisse astuda. Soovin sooja kodu ja inimesi, kelle kõrval on kerge olla.",
   "{name}, soovin aega kõigele, mida armastad: pikale hommikusöögile, sihita jalutuskäigule ja vestlusele, mida ei taha lõpetada. Olgu selliseid päevi rohkem. Head nimepäeva!",
   "{name}, head nimepäeva! Mingu plaanid korda ja olgu kõrval inimesed, kes aitavad ning rõõmustavad koos sinuga. Ja juhtugu täna kindlasti midagi toredat.",
   "{name}, soovin hommikuid heade plaanidega ja õhtuid kodus, kus sind oodatakse. Jätkugu jõudu lemmiktööks ning pärast seda aega ka muuks eluks. Ilusat pidupäeva!",
   "{name}, olgu ees ammu plaanitud reis, oodatud kohtumine ja hea uudis täiesti tavalisel päeval. Head nimepäeva!",
   "{name}, head nimepäeva! Soovin tervist, rahulikke õhtuid ja rohkem põhjusi ühe laua ümber koguneda. Öelgu lähedased sagedamini, kui palju sa neile tähendad."
  ],
  "humor": [
   "{name}, head nimepäeva! Kõik kiired tööd saavad täna uue nime — «Homme». Sulle jäävad tort, õnnesoovid ja õigus valida esimesena kõige suurem tükk.",
   "{name}, su nimel on täna pidupäev. Tähistame nii, et külmik saaks homme teatada: «Jah, lõbus oli. Ei, torti enam pole.»",
   "{name}, leidku raha tee sinuni sama kindlalt kui külalised värske piruka lõhnani. Probleemid võiksid vähemalt kord aadressiga eksida. Head nimepäeva!",
   "{name}, head nimepäeva! Magagu äratuskell sisse, valmigu kohv ise ja toogu inimene küsimusega «kas tohib korraks?» kaasa kingituse.",
   "{name}, soovin nii palju häid uudiseid, et telefon väsiks enne sind. Ja nii palju vaba aega, et saaksid neid lõpuks rahulikult lugeda. Ilusat pidupäeva!",
   "{name}, täna võib lisa küsida ja öelda: «See on mu nime auks.» Kui keegi kolmanda portsjoni kohta küsib, selgita: ilus nimi väärib korralikku pidu. Head nimepäeva!"
  ]
 }
};
const special={
 "leo": {
  "ru": "Греческое Leon и латинское Leo означают «лев». Эти родственные формы распространились в европейских языках. Имя носили раннехристианские святые и римские папы.",
  "en": "Greek Leon and Latin Leo mean “lion”. These related forms spread through European languages. Early Christian saints and popes bore the name.",
  "lv": "Grieķu Leon un latīņu Leo nozīmē «lauva». Šīs radniecīgās formas izplatījās Eiropas valodās. Vārdu nesa agrīnās kristietības svētie un pāvesti.",
  "lt": "Graikiškas Leon ir lotyniškas Leo reiškia «liūtas». Šios giminingos formos paplito Europos kalbose. Vardą turėjo ankstyvosios krikščionybės šventieji ir popiežiai.",
  "et": "Kreeka Leon ja ladina Leo tähendavad «lõvi». Need sugulasvormid levisid Euroopa keeltes. Nime kandsid varakristlikud pühakud ja paavstid."
 },
 "charlotte": {
  "ru": "Путь имени {name} ведёт во Францию, к Charlotte — женской уменьшительной форме Charles. В XVII веке имя добралось до Британии. Позднее его носили королева Шарлотта и писательница Шарлотта Бронте: одна оставила след в истории двора, другая — на книжных полках.",
  "en": "The story of {name} leads to France and Charlotte, a feminine diminutive of Charles. The name reached Britain in the seventeenth century. Later came Queen Charlotte and the writer Charlotte Brontë: one left her mark at court, the other on bookshelves.",
  "lv": "Vārda {name} ceļš ved uz Franciju, pie Charlotte — vārda Charles sieviešu pamazināmās formas. Britānijā tas nonāca 17. gadsimtā. Vēlāk to nesa karaliene Šarlote un rakstniece Šarlote Brontē: viena atstāja pēdas galma vēsturē, otra — grāmatu plauktos.",
  "lt": "Vardo {name} kelias veda į Prancūziją, prie Charlotte — moteriškos mažybinės Charles formos. Britaniją vardas pasiekė XVII amžiuje. Vėliau jį turėjo karalienė Šarlotė ir rašytoja Charlotte Brontë: viena paliko pėdsaką rūmų istorijoje, kita — knygų lentynose.",
  "et": "Nime {name} tee viib Prantsusmaale ja Charlotte’ini, Charlesi naissoost hellitusvormini. Briti saartele jõudis nimi 17. sajandil. Hiljem kandsid seda kuninganna Charlotte ja kirjanik Charlotte Brontë: üks jättis jälje õukonnalukku, teine raamaturiiulitele."
 },
 "leonard": {
  "ru": "В имени {name} встретились лев и храбрость. Его старые германские корни обычно читают как «храбрый лев». Имя знали в Европе ещё в Средние века, а его итальянскую форму Leonardo прославил Леонардо да Винчи.",
  "en": "A lion and bravery meet in the name {name}. Its old German roots are usually read as “brave lion”. The name was known in medieval Europe; Leonardo da Vinci made its Italian form, Leonardo, famous.",
  "lv": "Vārdā {name} satiekas lauva un drosme. Tā senās ģermāņu saknes parasti skaidro kā «drosmīgs lauva». Eiropā vārdu pazina jau viduslaikos, bet itāļu formu Leonardo slavenu darīja Leonardo da Vinči.",
  "lt": "Varde {name} susitinka liūtas ir drąsa. Jo senosios germanų šaknys paprastai aiškinamos kaip «drąsus liūtas». Europoje vardą žinojo dar viduramžiais, o itališką formą Leonardo išgarsino Leonardo da Vinci.",
  "et": "Nimes {name} kohtuvad lõvi ja vaprus. Selle vanu germaani juuri tõlgendatakse tavaliselt kui «vapper lõvi». Nime tunti Euroopas juba keskajal ning selle itaalia kuju Leonardo tegi kuulsaks Leonardo da Vinci."
 },
 "alexandra": {
  "ru": "История имени {name} начинается в Древней Греции. Его греческая форма — Alexandra, женская пара к Alexander, а смысл обычно передают как «защитница людей». Позднее имя носила британская королева Александра, жена Эдуарда VII. Она любила фотографировать близких и в 1908 году выпустила альбом своих снимков в помощь благотворительности.",
  "en": "The story of {name} begins in Ancient Greece. Its Greek form, Alexandra, is the feminine counterpart of Alexander, usually understood as “defender of people”. A later bearer was Queen Alexandra, wife of Edward VII. She enjoyed photographing family and friends and published an album of her pictures for charity in 1908.",
  "lv": "Vārda {name} stāsts sākas Senajā Grieķijā. Grieķu Alexandra ir vārda Alexander sieviešu forma, kuras nozīmi parasti skaidro kā «cilvēku aizstāve». Vēlāk šo vārdu nesa britu karaliene Aleksandra, Edvarda VII sieva. Viņa labprāt fotografēja tuviniekus un 1908. gadā izdeva savu fotogrāfiju albumu labdarībai.",
  "lt": "Vardo {name} istorija prasideda Senovės Graikijoje. Graikiškas Alexandra yra moteriška Alexander forma, kurios reikšmė paprastai aiškinama kaip «žmonių gynėja». Vėliau šį vardą turėjo britų karalienė Aleksandra, Edvardo VII žmona. Ji mėgo fotografuoti artimuosius ir 1908 metais išleido savo nuotraukų albumą labdarai.",
  "et": "Nime {name} lugu algab Vana-Kreekast. Kreeka Alexandra on Alexanderi naissoost vaste ja selle tähendust selgitatakse tavaliselt kui «inimeste kaitsja». Hiljem kandis nime Briti kuninganna Alexandra, Edward VII abikaasa. Ta armastas lähedasi pildistada ning avaldas 1908. aastal oma fotodest heategevusliku albumi."
 }
};
function fill(value,name){return value.replaceAll('{name}',name);}
const familyHumor={
 charlotte:{ru:'{name}, у твоего имени за плечами дворцы и романы. Сегодня предлагаю королевский указ: торт подать немедленно, тревоги выслать из королевства, а все срочные дела выпустить под псевдонимом «Завтра». С именинами!',en:'{name}, your name has palaces and novels behind it. Today’s royal decree: serve cake immediately, banish worries from the kingdom and publish every urgent task under the pen name Tomorrow. Happy name day!',lv:'{name}, aiz tava vārda stāv pilis un romāni. Šodienas karaļa dekrēts: torti pasniegt nekavējoties, raizes izraidīt no karaļvalsts un visus steidzamos darbus izdot ar pseidonīmu «Rīt». Priecīgu vārda dienu!',lt:'{name}, už tavo vardo stovi rūmai ir romanai. Šiandienos karališkas įsakas: tortą patiekti nedelsiant, rūpesčius ištremti iš karalystės, o visus skubius darbus išleisti slapyvardžiu «Rytoj». Su vardadieniu!',et:'{name}, su nime taga on lossid ja romaanid. Tänane kuninglik määrus: tort kohe lauale, mured kuningriigist välja ja kõik kiired ülesanded ilmugu kirjanikunime «Homme» all. Head nimepäeva!'},
 leonard:{ru:'{name}, твоему имени достался «храбрый лев». Желаю, чтобы львиная доля зарплаты оставалась тебе, а не коммунальным службам, и чтобы слово «прайд» означало круг друзей, а не совещание в понедельник. С именинами!',en:'{name}, your name inherited a brave lion. May the lion’s share of your income stay with you rather than the utility companies, and may your pride mean friends around a table, never a Monday meeting. Happy name day!',lv:'{name}, tavam vārdam ticis «drosmīgs lauva». Lai algas lauvas tiesa paliek tev, nevis komunālajiem pakalpojumiem, un lauvu bars lai nozīmē draugus pie galda, nevis pirmdienas sapulci. Priecīgu vārda dienu!',lt:'{name}, tavo vardui teko «drąsus liūtas». Linkiu, kad liūto dalis atlyginimo liktų tau, o ne komunalinėms įmonėms, ir liūtų būrys reikštų draugus prie stalo, o ne pirmadienio susirinkimą. Su vardadieniu!',et:'{name}, su nimi päris vapra lõvi. Jäägu lõviosa palgast sulle, mitte kommunaalfirmadele, ja tähendagu lõvikari sõpru laua ümber, mitte esmaspäevast koosolekut. Head nimepäeva!'}
};
const listFormats=new Map(),dayFormats=new Map();
const listFormat=lang=>{if(!listFormats.has(lang))listFormats.set(lang,new Intl.ListFormat(lang,{style:"long",type:"conjunction"}));return listFormats.get(lang);};
const localeForName=lang=>({lv:'lv-LV',ru:'ru-RU',en:'en-GB',lt:'lt-LT',et:'et-EE'}[lang]);
export function describeName(profile,requested='en',variant=0,profiles=null){
 const lang=LANGUAGES.includes(requested)?requested:'en',i=LANGUAGES.indexOf(lang),seed=hash(nameIdentity(profile.name)),name=profile.name;
 const facts=profile.facts||{},paragraphs=[];
 const reviewed=reviewedHistory(name,profile.country);
 const hypothesis=reviewed?null:unverifiedHistory(name,profile.country);
 const root=rootHistory(facts.root_key,name,lang);
 if(special[profile.family])paragraphs.push(fill(special[profile.family][lang],name));
 else if(root)paragraphs.push(root);
 else{
  if(facts.origins?.length)paragraphs.push(text(lang,'origin',{name,origins:listFormat(lang).format(facts.origins.map(o=>traditions[o]?.[i]||o))}));
  if(facts.etymons?.length){const words=facts.etymons.slice(0,3).map(w=>'«'+w.term+'» («'+w.gloss[lang]+'»)');paragraphs.push(text(lang,'wordRoots',{words:listFormat(lang).format(words)}));}
  if(facts.formation==='phonetic'){const note={lv:'Vārdnīcā {name} raksturots kā fonētisks darinājums: tā izveidē galvenais ir skanējums, un konkrēts pamatvārds nav norādīts.',ru:'В словаре {name} отмечено как фонетическое образование: имя создано по звучанию, а конкретное слово-основа не указано.',en:'The dictionary classifies {name} as a phonetic formation: it was formed for its sound, without a specified underlying word.',lt:'Žodyne {name} apibūdinamas kaip fonetinis darinys: vardas sudarytas pagal skambesį, nenurodant konkretaus pamatinio žodžio.',et:'Sõnastik liigitab nime {name} häälikulise moodustisena: nimi on loodud kõla järgi, konkreetset alussõna nimetamata.'};paragraphs.push(fill(note[lang],name));}
  if(facts.registry_kind&&registryKinds[facts.registry_kind])paragraphs.push(fill(registryKinds[facts.registry_kind][i],name));
 }
 const person=profile.people?.[0];
 if(person?.match==='exact'&&!special[profile.family])paragraphs.push(text(lang,'namesake',{person:person.labels?.[lang]||person.name,role:roleLabel(person.role,lang)}));
 let attestation=null;
 if(facts.first_recorded){const date=formatAttestation(facts.first_recorded,lang);if(date)attestation={date,form:facts.first_recorded_form||name};}
 const related=[...new Set([...(facts.related||[]),...(facts.source_forms||[]).map(f=>f.form)])].filter(n=>nameIdentity(n)!==nameIdentity(name)&&!paragraphs.join(' ').includes(n)).slice(0,3);
 if(related.length)paragraphs.push(text(lang,'related',{names:listFormat(lang).format(related)}));
 if(facts.possible_related?.length)paragraphs.push(text(lang,'possibleRelated',{names:listFormat(lang).format(facts.possible_related.slice(0,3))}));
 if(facts.archival_variants?.length)paragraphs.push(text(lang,'archivalVariant',{name:facts.archival_form||name,names:listFormat(lang).format(facts.archival_variants)}));
 const wishIndex=(seed+variant)>>>0;
 const greetings=Object.fromEntries(['serious','humor'].map(mood=>[mood,Array.from({length:3},(_,n)=>fill(wishes[lang][mood][(wishIndex+n)%wishes[lang][mood].length],name))]));
 if(familyHumor[profile.family])greetings.humor[0]=fill(familyHumor[profile.family][lang],name);
 const history=reviewed?reviewed.text[lang].map(p=>fill(p,name)):paragraphs.length?[paragraphs.join(' ')]:[];
 if(facts.calendar_entry&&reviewed?.calendar_entry_year!==facts.calendar_entry.year){
  const calendarNote={lv:'Personvārdu vārdnīcā norādīts, ka {name} kalendārā iekļauts {year}. gadā.',ru:'В словаре личных имён отмечено, что {name} включено в календарь в {year} году.',en:'The given-name dictionary records {name} as entering the calendar in {year}.',lt:'Asmenvardžių žodyne nurodyta, kad {name} į kalendorių įtrauktas {year} metais.',et:'Isikunimesõnastiku järgi lisati {name} kalendrisse {year}. aastal.'};
  const entry=facts.calendar_entry;const entryNote={lv:'Saistītajā vārdnīcas šķirklī {name} norādīts kalendāra gads {year}; atsevišķo formu datējums nav precizēts.',ru:'В общей словарной статье {name} указана календарная дата {year}; раздельная датировка написаний не уточнена.',en:'The shared dictionary entry {name} gives the calendar year {year}; it does not date each spelling separately.',lt:'Bendrame žodyno straipsnyje {name} nurodyti kalendoriaus metai {year}; atskirų rašybos formų datos nepatikslintos.',et:'Ühine sõnastikuartikkel {name} annab kalendriaastaks {year}; eri kirjapilte pole eraldi dateeritud.'};history.push((entry.scope==='reference_entry'?entryNote[lang]:calendarNote[lang]).replaceAll('{name}',entry.scope==='reference_entry'?entry.form:name).replaceAll('{year}',String(entry.year)));
 }
 if(hypothesis)history.splice(0,history.length,...hypothesis.text[lang].map(p=>fill(p,name)));
 const kind=hypothesis?'unresearched':history.length||attestation?'documented':'unresearched',calendar_only=!history.length;
 if(!history.length&&facts.calendar_dates?.length){if(!dayFormats.has(lang))dayFormats.set(lang,new Intl.DateTimeFormat(localeForName(lang),{month:'long',day:'numeric',timeZone:'UTC'}));const df=dayFormats.get(lang),dates=facts.calendar_dates.map(day=>df.format(new Date('2000-'+day+'T12:00:00Z'))).join(', '),country=text(lang,profile.country);const line={lv:'Vārds {name} šajā {country} vārda dienu kalendārā ierakstīts datumā: {dates}.',ru:'Имя {name} указано в календаре именин страны {country} на даты: {dates}.',en:'The name {name} is listed in the {country} name-day calendar on: {dates}.',lt:'Vardas {name} šalies {country} vardadienių kalendoriuje įrašytas šiomis datomis: {dates}.',et:'Nimi {name} on riigi {country} nimepäevakalendris kuupäevadel: {dates}.'};history.push(line[lang].replaceAll('{name}',name).replaceAll('{country}',country).replaceAll('{dates}',dates));}
 const notice={lv:'Pārbaudītu vēsturisku ziņu par šo vārdu mums vēl nav.',ru:'Подтверждённой истории этого имени у нас пока нет.',en:'We do not yet have a verified history of this name.',lt:'Patvirtintos šio vardo istorijos kol kas neturime.',et:'Selle nime kohta ei ole meil veel kontrollitud ajaloolisi andmeid.'};
 const related_context=[];
 if(profiles){
  const seen=new Set([profile.key]),candidates=[...(facts.related||[]).map(name=>({name,possible:false})),...(facts.possible_related||[]).map(name=>({name,possible:true}))];
  const titles={lv:['Par saistīto vārdu {name}','Iespējama saikne: {name}'],ru:['О связанном имени {name}','Возможная связь: {name}'],en:['About the related name {name}','Possible connection: {name}'],lt:['Apie susijusį vardą {name}','Galimas ryšys: {name}'],et:['Seotud nimest {name}','Võimalik seos: {name}']};
  for(const candidate of candidates){
   const other=profiles[profile.country+':'+candidate.name.normalize('NFC')];
   const root=reviewedRoot(candidate.name),review=reviewedHistory(candidate.name,profile.country);
   if((reviewed&&review?.text===reviewed.text)||(facts.root_key&&root?.key===facts.root_key))continue;
   const target=other||(root||review?{key:profile.country+':'+candidate.name,name:candidate.name,country:profile.country,facts:root?{root_key:root.key}:{},people:[]}:null);
   if(!target||seen.has(target.key))continue;seen.add(target.key);
   const copy=describeName(target,lang,0,null);
   if(copy.unverified_hypothesis||!copy.history.length||(!review&&!root&&!target.family&&!target.facts?.origins?.length&&!target.facts?.etymons?.length))continue;
   related_context.push({name:target.name,possible:candidate.possible,title:titles[lang][Number(candidate.possible)].replaceAll('{name}',target.name),history:copy.history});
   if(related_context.length===2)break;
  }
 }
 return{kind,history,calendar_only,attestation,story:'',notice:kind==='unresearched'?notice[lang]:'',reviewed_narrative:!hypothesis&&(!!reviewed||!!special[profile.family]),unverified_hypothesis:!!hypothesis,hypothesis_label:hypothesis?HYPOTHESIS_LABELS[lang]:'',related_context,wishes:greetings};
}
export const ROLE_LABELS={
 writer:['rakstnieks','писатель','writer','rašytojas','kirjanik'],poet:['dzejnieks','поэт','poet','poetas','luuletaja'],actor:['kino un teātra mākslinieks','актёр','actor','aktorius','näitleja'],musician:['mūziķis','музыкант','musician','muzikantas','muusik'],composer:['komponists','композитор','composer','kompozitorius','helilooja'],athlete:['sportists','спортсмен','athlete','sportininkas','sportlane'],scientist:['zinātnieks','учёный','scientist','mokslininkas','teadlane'],artist:['mākslinieks','художник','artist','menininkas','kunstnik'],director:['kinorežisors','кинорежиссёр','film director','kino režisierius','filmirežissöör'],astronaut:['astronauts','астронавт','astronaut','astronautas','astronaut'],public_figure:['sabiedriska personība','общественный деятель','public figure','visuomenės veikėjas','avaliku elu tegelane']
};
export function roleLabel(role,lang){return ROLE_LABELS[role]?.[LANGUAGES.indexOf(lang)]||ROLE_LABELS.public_figure[LANGUAGES.indexOf(lang)]||role;}
