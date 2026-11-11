// 12 November: verified Lithuanian and Estonian histories, each scoped to its own calendar.
export const historiesLithuanianR11={},historiesEstonianR11={};
const langs=['lv','ru','en','lt','et'];
function add(country,name,sources,origin,story){(country==='lt'?historiesLithuanianR11:historiesEstonianR11)[name]={sources,text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]]))};}
add('lt','Alvilė',['https://data.gov.lt/datasets/2664/','https://vardai.lt/','https://www.tauragesausra.lt/sveciuose-rasytoja-alvile-rimaite-nuo-knygos-iki-kurybiniu-dirbtuviu/'],[
 'Alvilė oficiālajos vārdu datos ir lietuviešu divcelmu vārds. Populārais vārdu ceļvedis piedāvā al- saikni ar «katrs» un vil- ar viltis — «cerība». Šis ir ceļveža cilmes priekšlikums, nevis vienīgā neatkarīgi pierādītā salikteņa nozīme.',
 'Alvilė в официальных данных — литовское двухосновное имя. Популярный справочник предлагает связь al- с «каждый», vil- с viltis, «надежда». Это этимологическое предложение справочника, а не единственное независимо доказанное значение сложения.',
 'Official name data classify Alvilė as a Lithuanian compound. A popular name guide proposes al- linked with each and vil- with viltis, hope. This is the guide’s origin proposal, not the one independently demonstrated meaning of the compound.',
 'Oficialiuose vardų duomenyse Alvilė yra lietuviškas dvikamienis vardas. Populiarus vardų žinynas siūlo al- sieti su „kiekvienas“, vil- su viltis. Tai žinyno etimologinis siūlymas, o ne vienintelė nepriklausomai įrodyta dūrinio reikšmė.',
 'Ametlikud nimeandmed liigitavad Alvilė leedu liitnimeks. Populaarne nimejuhend pakub al- seost sõnaga iga ja vil- seost sõnaga viltis, lootus. See on juhendi päritolupakkumine, mitte liitnime ainus sõltumatult tõestatud tähendus.'
],[
 'Bērnu rakstniece Alvilė Rimaitė 2025. gada 10.–11. novembrī viesojās Taurages «Aušros» skolā. Skolas pašu ziņojums apraksta lasījumu par Kliukliukas un darbnīcu, kurā bērni veidoja tēlu no dzijas. Tas ir dokumentēts īstas vārda nesējas literārs notikums.',
 'Детская писательница Алвиле Римайте 10–11 ноября 2025 года посетила школу «Aušros» в Таураге. Собственный отчёт школы описывает чтение о Kliukliukas и мастерскую, где дети делали персонажа из пряжи. Это документированное событие с реальной носительницей имени.',
 'Children’s writer Alvilė Rimaitė visited Tauragė’s Aušros school on 10–11 November 2025. The school’s own report describes a reading about Kliukliukas and a workshop making the character from yarn, a documented literary event involving a real bearer.',
 'Vaikų rašytoja Alvilė Rimaitė 2025 metų lapkričio 10–11 dienomis lankėsi Tauragės „Aušros“ progimnazijoje. Pačios mokyklos pranešime aprašytas skaitymas apie Kliukliuką ir dirbtuvės, kuriose vaikai kūrė veikėją iš siūlų. Tai dokumentuotas tikros vardo turėtojos literatūrinis įvykis.',
 'Lastekirjanik Alvilė Rimaitė külastas Tauragė Aušrose kooli 10.–11. novembril 2025. Kooli enda teade kirjeldab Kliukliukase-loo ettelugemist ja töötuba, kus lapsed tegid tegelase lõngast. See on tegeliku nimekandja dokumenteeritud kirjandussündmus.'
]);
add('lt','Ašmantas',['https://data.gov.lt/datasets/2664/','https://www.draugas.org/archive/1960_reg/1960-03-12-PRIEDAS-DRAUGAS.pdf#page=2'],[
 'Ašmantas oficiālajā vārdu klasifikācijā ir lietuviešu divcelmu personvārds. Tas ļauj droši norādīt vārda uzbūvi, neizvēloties nepierādītu pilnu tulkojumu. Līdzīgi rakstīts uzvārds pats par sevi nav pierādījums konkrēta cilvēka personvārdam.',
 'Ašmantas в официальной классификации — литовское двухосновное личное имя. Это позволяет указать строение, не выбирая недоказанный полный перевод. Похожая фамилия сама по себе не подтверждает личное имя конкретного человека.',
 'The official name classification identifies Ašmantas as a Lithuanian compound personal name. This establishes its structure without selecting an unproven complete translation. A similarly written surname alone is not evidence of someone bearing it as a given name.',
 'Oficiali klasifikacija Ašmantas priskiria lietuviškiems dvikamieniams asmenvardžiams. Tai leidžia nurodyti sandarą nepasirenkant neįrodyto viso vertimo. Panašiai rašoma pavardė savaime nepatvirtina konkretaus žmogaus vardo.',
 'Ametlik nimeliigitus määratleb Ašmantase leedu liitisikunimena. See tõendab ehitust, valimata tõestamata terviktõlget. Sarnase kirjapildiga perekonnanimi üksi ei tõenda selle kandmist eesnimena.'
],[
 'Juozas Kralikauskas 1960. gada 12. marta laikraksta «Draugas» rakstā par 13.–15. gadsimta personvārdiem iekļāva Ašmantas vīriešu vārdu sarakstā. Pats 1960. gada raksts ir pārbaudāma publikācija; tas netiek uzdots par atrastu viduslaiku oriģināldokumentu.',
 'Юозас Краликаускас включил Ašmantas в список мужских имён в статье «Draugas» от 12 марта 1960 года о личных именах XIII–XV веков. Статья 1960 года — проверяемая публикация; она не выдаётся за найденный средневековый оригинал.',
 'Juozas Kralikauskas included Ašmantas in a male-name list in his 12 March 1960 Draugas article on thirteenth- to fifteenth-century personal names. The 1960 article is a checked publication; it is not presented as a newly inspected medieval original document.',
 'Juozas Kralikauskas įtraukė Ašmantas į vyrų vardų sąrašą 1960 metų kovo 12 dienos „Draugo“ straipsnyje apie XIII–XV amžiaus asmenvardžius. Pats 1960 metų straipsnis yra patikrinta publikacija; jis nepateikiamas kaip naujai peržiūrėtas viduramžių originalas.',
 'Juozas Kralikauskas lisas Ašmantase mehenimede loendisse 12. märtsi 1960 Draugase artiklis 13.–15. sajandi isikunimedest. 1960. aasta artikkel on kontrollitud väljaanne; seda ei esitata äsja leitud keskaegse algdokumendina.'
]);
add('lt','Kristinas',['https://tautosmenta.lt/wp-content/uploads/lituanistika/Salys_1983_LT.pdf','https://www.vle.lt/straipsnis/kristinas-astikas/'],[
 'Kristinas skaidrojumā valodnieks Antans Salis latīņu Christinus raksturo kā Christianus variantu. Saime saistīta ar kristieša apzīmējumu. Tā ir konkrēta vārda formas attiecība, kas atšķirama no līdzīgi sākta Kristupas vārda.',
 'Лингвист Антанас Салис объясняет латинское Christinus как вариант Christianus. С этой семьёй связано Kristinas и обозначение христианина. Это конкретное отношение форм, отличающееся от имени Kristupas с похожим началом.',
 'Linguist Antanas Salys explains Latin Christinus as a variant of Christianus, linking the Kristinas family with the designation Christian. This is a specific relationship between forms, distinct from the similarly beginning name Kristupas.',
 'Kalbininkas Antanas Salys lotynišką Christinus aiškina kaip Christianus atmainą, siedamas Kristinas šeimą su krikščionio pavadinimu. Tai konkretus formų santykis, atskiras nuo panašiai prasidedančio Kristupas vardo.',
 'Keeleteadlane Antanas Salys seletab ladina Christinust Christianuse variandina, sidudes Kristinase nimepere kristlase nimetusega. See on konkreetne vormisuhe, mis erineb sarnase algusega Kristupase nimest.'
],[
 'Kristinas Astikas bija viens no lieciniekiem Salīnas līgumam 1398. gadā un vēlāk arī 1413. gada Horodlo vienošanās liecinieks. Lietuvas enciklopēdija viņu raksturo kā Astiku dzimtas aizsācēju; viņa dēls Radvila kļuva par Radvilu dzimtas aizsācēju.',
 'Кристинас Астикас был одним из свидетелей Салинского договора 1398 года, позднее — Городельского соглашения 1413 года. Литовская энциклопедия называет его основателем рода Астиков; его сын Радвила стал родоначальником Радзивиллов.',
 'Kristinas Astikas was a witness to the Treaty of Salynas in 1398 and the Union of Horodło in 1413. The Lithuanian encyclopaedia identifies him as founder of the Astikas family; his son Radvila founded the Radvila family.',
 'Kristinas Astikas buvo vienas Salyno sutarties 1398 metais ir Horodlės susitarimų 1413 metais liudytojų. Lietuvių enciklopedija jį nurodo kaip Astikų giminės pradininką; jo sūnus Radvila tapo Radvilų giminės pradininku.',
 'Kristinas Astikas oli 1398. aasta Salynase lepingu ja 1413. aasta Horodło kokkulepete tunnistaja. Leedu entsüklopeedia nimetab teda Astikase suguvõsa rajajaks; tema pojast Radvilast algas Radvilate suguvõsa.'
]);
add('lt','Renata',['https://www.behindthename.com/name/renata','https://www.behindthename.com/name/renatus','https://rasytojai.lt/rasytojai/serelyte-renata/'],[
 'Renata ir latīņu Renatus sieviešu forma; Renatus skaidrots kā «no jauna dzimis». Starptautiskais vārdu ceļvedis tieši norāda arī lietuviešu Renata lietojumu. Šī saimes nozīme nav apgalvojums par konkrētas personas dzīves notikumiem.',
 'Renata — женская форма латинского Renatus, «заново рождённый». Международный справочник прямо указывает и литовское употребление Renata. Значение семьи имён не является утверждением о событиях жизни конкретного человека.',
 'Renata is the feminine of Latin Renatus, explained as born again. The international name guide explicitly includes Lithuanian usage of Renata. This family meaning is not a claim about events in any particular person’s life.',
 'Renata yra moteriška lotyniško Renatus forma, aiškinama „iš naujo gimęs“. Tarptautinis vardų vadovas tiesiogiai nurodo ir lietuvišką Renata vartoseną. Šeimos reikšmė nėra teiginys apie konkretaus žmogaus gyvenimo įvykius.',
 'Renata on ladina Renatuse naissoost vaste; Renatust seletatakse kui uuesti sündinud. Rahvusvaheline nimejuhend nimetab sõnaselgelt ka Renata leedu kasutust. Nimepere tähendus ei väida midagi konkreetse inimese elusündmuste kohta.'
],[
 'Renatas Šerelytes pirmā noveļu grāmata «Žuvies darinėjimas» iznāca Viļņā 1995. gadā. Viņas romāns «Vardas tamsoje» vēlāk kļuva par Agnes Marcinkevičūtes 2013. gada filmas pamatu. Rakstnieku savienības biogrāfija dokumentē šo grāmatas ceļu uz ekrānu.',
 'Первая книга новелл Ренаты Шерелите «Žuvies darinėjimas» вышла в Вильнюсе в 1995 году. По её роману «Vardas tamsoje» Агне Марцинкявичюте сняла фильм в 2013 году. Этот путь книги на экран документирует биография Союза писателей.',
 'Renata Šerelytė’s first short-story book, Žuvies darinėjimas, appeared in Vilnius in 1995. Her novel Vardas tamsoje became the basis of Agnė Marcinkevičiūtė’s 2013 film. The Writers’ Union biography documents this passage from book to screen.',
 'Pirmoji Renatos Šerelytės novelių knyga „Žuvies darinėjimas“ išėjo Vilniuje 1995 metais. Pagal romaną „Vardas tamsoje“ Agnė Marcinkevičiūtė 2013 metais sukūrė filmą. Rašytojų sąjungos biografija dokumentuoja šį knygos kelią į ekraną.',
 'Renata Šerelytė esimene jutukogu „Žuvies darinėjimas“ ilmus Vilniuses 1995. aastal. Romaanist „Vardas tamsoje“ sai Agnė Marcinkevičiūtė 2013. aasta filmi alus. Kirjanike Liidu elulugu dokumenteerib seda teekonda raamatust ekraanile.'
]);
add('lt','Teodoras',['https://www.tevu-darzelis.lt/vaiku-vardai/teodoras/','https://www.behindthename.com/name/theodore','https://www.vle.lt/straipsnis/teodoras-narbutas/'],[
 'Teodoras ir grieķu Theodoros saimes lietuviešu forma. Saimes daļas ir theos — «dievs» un dōron — «dāvana», kopā tradicionāli «Dieva dāvana». Radniecīgā Dorothea veidota no tām pašām daļām pretējā secībā.',
 'Teodoras — литовская форма греческой семьи Theodoros. Её части theos, «бог», и dōron, «дар», традиционно передаются как «дар Бога». Родственное Dorothea содержит те же элементы в обратном порядке.',
 'Teodoras is a Lithuanian form in the Greek Theodoros family. Its elements are theos, god, and dōron, gift, traditionally gift of God. The related Dorothea uses the same elements in the reverse order.',
 'Teodoras yra lietuviška graikų Theodoros šeimos forma. Jos dėmenys theos „dievas“ ir dōron „dovana“ tradiciškai aiškinami „Dievo dovana“. Gimininga Dorothea sudaryta iš tų pačių dėmenų atvirkščia tvarka.',
 'Teodoras on kreeka Theodorose nimepere leedu vorm. Osad on theos, jumal, ja dōron, kingitus, traditsiooniliselt Jumala kingitus. Seotud Dorothea kasutab samu osi vastupidises järjekorras.'
],[
 'Vēsturnieks Teodoras Narbutas 1835.–1841. gadā publicēja savu apjomīgo Lietuvas vēsturi poļu valodā deviņos sējumos. Pirmais sējums bija veltīts senajai mitoloģijai. Šis ir dokumentēts autora darbs, nevis apstiprinājums visiem tajā paustajiem vēstures vai mitoloģijas skaidrojumiem.',
 'Историк Теодорас Нарбутас в 1835–1841 годах издал обширную историю Литвы на польском языке в девяти томах. Первый том посвящён древней мифологии. Это документированный труд автора, а не подтверждение всех его исторических и мифологических трактовок.',
 'Historian Teodoras Narbutas published his extensive history of Lithuania in Polish in nine volumes in 1835–1841. Its first volume concerned ancient mythology. This records his publication, rather than endorsing every historical or mythological interpretation in it.',
 'Istorikas Teodoras Narbutas 1835–1841 metais lenkiškai paskelbė didelę devynių tomų Lietuvos istoriją. Pirmasis tomas skirtas senajai mitologijai. Tai dokumentuotas autoriaus veikalas, o ne visų jo istorinių ar mitologinių aiškinimų patvirtinimas.',
 'Ajaloolane Teodoras Narbutas avaldas oma ulatusliku Leedu ajaloo poola keeles üheksas köites aastatel 1835–1841. Esimene köide käsitles vana mütoloogiat. See dokumenteerib avaldamist, kinnitamata kõiki teose ajaloo- või mütoloogiatõlgendusi.'
]);
add('ee','Kuno',['https://www.behindthename.com/name/kuno','https://eelk.ee/our-church/history/archbishops-and-bishops/kuno-pajula/'],[
 'Kuno vārdu ceļvedī saistīts ar ģermāņu kunni — «dzimta, ģimene» — vārdu īsajām formām; tas var būt arī Konrad saīsinājums. Abas norādītās attiecības saglabātas atsevišķi, neizvēloties vienu ceļu visiem igauņu vārda nesējiem.',
 'Kuno справочник связывает с краткими формами германских имён на kunni, «род, семья»; это может быть и сокращение Konrad. Обе связи сохранены отдельно, без выбора единственного пути для всех эстонских носителей.',
 'The name guide connects Kuno with short forms of Germanic names in kunni, clan or family; it can also shorten Konrad. Both relationships remain distinct, without choosing one route for every Estonian bearer.',
 'Vardų vadovas Kuno sieja su germanų vardų, prasidedančių kunni „giminė, šeima“, trumpiniais; tai gali būti ir Konrad trumpinys. Abu ryšiai paliekami atskiri, nepasirenkant vieno kelio visiems Estijos turėtojams.',
 'Nimejuhend seob Kuno germaani kunni, suguvõsa või pere, algusega nimede lühivormidega; see võib lühendada ka Konradit. Mõlemad seosed jäävad eraldi, valimata kõigile Eesti nimekandjatele üht teed.'
],[
 'Kuno Pajula 1987. gada 11. jūnijā tika ievēlēts par Igaunijas evaņģēliski luteriskās baznīcas arhibīskapu un 1994. gadā devās pensijā. Viņš bija arī viens no Igaunijas Baznīcu padomes dibinātājiem un tās prezidents 1989.–1993. gadā.',
 'Куно Паюла 11 июня 1987 года был избран архиепископом Эстонской евангелическо-лютеранской церкви и ушёл на покой в 1994 году. Он также был одним из основателей Эстонского совета церквей и его президентом в 1989–1993 годах.',
 'Kuno Pajula was elected archbishop of the Estonian Evangelical Lutheran Church on 11 June 1987 and retired in 1994. He was also a founder of the Estonian Council of Churches and its president in 1989–1993.',
 'Kuno Pajula 1987 metų birželio 11 dieną išrinktas Estijos evangelikų liuteronų bažnyčios arkivyskupu, o 1994 metais pasitraukė į pensiją. Jis taip pat buvo vienas Estijos bažnyčių tarybos steigėjų ir jos prezidentas 1989–1993 metais.',
 'Kuno Pajula valiti EELK peapiiskopiks 11. juunil 1987 ning ta jäi pensionile 1994. aastal. Ta oli ka üks Eesti Kirikute Nõukogu asutajaid ja selle president aastatel 1989–1993.'
]);
add('ee','Konrad',['https://www.behindthename.com/name/konrad','https://www.behindthename.com/name/conrad','https://kunstimuuseum.ekm.ee/syndmus/konrad-magi/'],[
 'Konrad ir Conrad saimes forma ar ģermāņu kuoni — «drosmīgs» un rat — «padoms». Vārdu ceļvedis to dokumentē vairākās Eiropas valodu tradīcijās. Šī saimes cilme ir atšķirama no konkrēta igauņu mākslinieka dzīvesstāsta.',
 'Konrad — форма семьи Conrad с германскими kuoni, «смелый», и rat, «совет». Справочник документирует её в нескольких европейских языковых традициях. Этимология семьи отделяется от биографии конкретного эстонского художника.',
 'Konrad is a Conrad-family form with Germanic kuoni, bold, and rat, counsel. The name guide documents it in several European language traditions. This family origin remains distinct from the life story of a particular Estonian painter.',
 'Konrad yra Conrad šeimos forma su germanų kuoni „drąsus“ ir rat „patarimas“. Vadovas ją dokumentuoja keliose Europos kalbinėse tradicijose. Šeimos kilmė atskiriama nuo konkretaus estų tapytojo gyvenimo istorijos.',
 'Konrad kuulub Conradi nimeperre, osadega germaani kuoni, julge, ja rat, nõuanne. Nimejuhend dokumenteerib seda mitmes Euroopa keeletraditsioonis. Nimepere päritolu on eraldi konkreetse Eesti maalikunstniku eluloost.'
],[
 'Konrada Megi izstāde Kumu mākslas muzejā notika no 2018. gada 24. augusta līdz 2019. gada 24. martam. Tajā parādīja vairāk nekā četrdesmit gleznas, galvenokārt ainavas, arī Itālijas perioda darbus. Kurators bija Ero Epners.',
 'Выставка Конрада Мяги в музее Kumu проходила с 24 августа 2018 года по 24 марта 2019 года. Она представила более сорока картин, преимущественно пейзажи, включая работы итальянского периода. Куратор — Ээро Эпнер.',
 'Kumu Art Museum’s Konrad Mägi exhibition ran from 24 August 2018 to 24 March 2019. It showed more than forty paintings, focusing on landscapes and including works from his Italian period. Eero Epner curated it.',
 'Konrado Mägi paroda Kumu dailės muziejuje vyko nuo 2018 metų rugpjūčio 24 dienos iki 2019 metų kovo 24 dienos. Parodyta daugiau nei keturiasdešimt paveikslų, daugiausia peizažai, ir Italijos laikotarpio darbai. Kuratorius — Eero Epner.',
 'Konrad Mägi näitus Kumu kunstimuuseumis kestis 24. augustist 2018 kuni 24. märtsini 2019. Näidati üle neljakümne maali, keskendudes maastikele ja kaasates Itaalia perioodi teoseid. Kuraator oli Eero Epner.'
]);
add('ee','Kuuno',['https://en.wiktionary.org/wiki/Kuuno#Estonian','https://muinsuskaitseamet.ee/sites/default/files/documents/2024-06/P%C3%A4rnu%20muinsuskaitseala%20inventeerimise%20l%C3%B5pparuanne%20%286.08.2021%29.pdf#page=89'],[
 'Kuuno igauņu vārdnīcas šķirklis to saista ar Konrad pamazināmo formu un blakus norāda Kuno. Tā ir tieša attiecīgās valodas norāde, nevis saikne tikai pēc dubultā patskaņa līdzības. Abu rakstību vēsturiskās liecības tomēr jānodala.',
 'Эстонская словарная статья Kuuno связывает его с уменьшительной формой Konrad и рядом указывает Kuno. Это прямая языковая отсылка, а не сходство по удвоенной гласной. Исторические свидетельства двух написаний при этом нужно различать.',
 'The Estonian dictionary entry connects Kuuno with a diminutive of Konrad and lists Kuno alongside it. This is a direct language-specific reference, not a relationship inferred from the doubled vowel alone. The two spellings’ historical records still remain distinct.',
 'Estų žodyno įrašas Kuuno sieja su mažybine Konrad forma ir greta nurodo Kuno. Tai tiesioginė tos kalbos nuoroda, o ne vien dvigubo balsio panašumas. Abiejų rašybų istorinius liudijimus vis tiek reikia skirti.',
 'Eesti sõnastikukirje seob Kuuno Konradi hellitusvormiga ja nimetab kõrval Kuno. See on otsene keelepõhine viide, mitte üksnes topeltvokaalist tuletatud seos. Kahe kirjapildi ajaloolised kirjed jäävad siiski eraldi.'
],[
 '2021. gada Pērnavas mantojuma inventarizācijas ziņojums dokumentē arhitekta Kuuno Raude 1993. gada ēku kā vietēju postmodernisma piemēru. Ziņojumā vērtēta tās patstāvīgā arhitektūras nozīme. Šeit Kuuno ir arhitekta personvārds, nevis vietas vai firmas nosaukums.',
 'Отчёт об инвентаризации наследия Пярну 2021 года документирует здание архитектора Кууно Рауде 1993 года как местный пример постмодернизма. Отмечена самостоятельная архитектурная ценность. Здесь Kuuno — личное имя архитектора, а не название места или фирмы.',
 'A 2021 Pärnu heritage inventory documents architect Kuuno Raude’s 1993 building as a local example of postmodernism, noting its independent architectural value. Here Kuuno is the architect’s personal name, not a place or company name.',
 '2021 metų Pernu paveldo inventorizacijos ataskaita dokumentuoja architekto Kuuno Raude 1993 metų pastatą kaip vietinį postmodernizmo pavyzdį ir pažymi savarankišką architektūrinę vertę. Čia Kuuno yra architekto vardas, o ne vietos ar įmonės pavadinimas.',
 'Pärnu muinsuskaitseala 2021. aasta inventuur dokumenteerib arhitekt Kuuno Raude 1993. aasta hoone kohaliku postmodernismi näitena, märkides selle iseseisvat arhitektuuriväärtust. Siin on Kuuno arhitekti eesnimi, mitte koha või ettevõtte nimi.'
]);
