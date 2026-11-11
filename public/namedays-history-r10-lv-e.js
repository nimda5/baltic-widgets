// LV-only research. International episodes are distinguished from Latvian attestations.
export const historiesLatvianR10E={};
const langs=['lv','ru','en','lt','et'];
function add(name,extra,origin,story,year){historiesLatvianR10E[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Renārs',[],[
 'Renārs vārdnīcā minēts kā franču forma pie Reinhards. Pamatvārds skaidrots ar ragin — «likteņa vai dievu padoms» un hart — «stiprs, drosmīgs». Šī ir avotā norādīta saimes saikne, nevis vienīgi līdzīgi skanošu vārdu salīdzinājums.',
 'Renārs словарь называет французской формой при Reinhards. Основа объясняется через ragin, «совет судьбы или богов», и hart, «сильный, храбрый». Это указанная источником связь семьи, а не просто сравнение созвучных слов.',
 'The dictionary lists Renārs as a French form under Reinhards. The base is explained through ragin, counsel of fate or the gods, and hart, strong or brave. This is a recorded family relationship rather than mere similarity between words.',
 'Žodynas Renārs nurodo kaip prancūzišką formą prie Reinhards. Pagrindas aiškinamas ragin „likimo ar dievų patarimas“ ir hart „stiprus, drąsus“. Tai šaltinio nurodytas šeimos ryšys, o ne vien panašiai skambančių žodžių palyginimas.',
 'Sõnaraamat nimetab Renārsi Reinhardsi prantsuse vormiks. Aluseks antakse ragin, saatuse või jumalate nõuanne, ja hart, tugev või vapper. See on kirja pandud nimepere seos, mitte ainult sarnane sõnakõla.'
],[
 'Renārs personas vārda liecība katalogā saistīta ar Vaiņodi 1941. gadā. Kalendāra ierakstam dots 1974. gads. Šīs vietējās liecības ir nodalītas no Reinhards saimes senākās vēstures: saistīto formu kopīga cilme nepadara visus datumus savstarpēji aizvietojamus.',
 'Свидетельство Renārs как личного имени каталог относит к Вайнёде в 1941 году. Календарной записи дан 1974 год. Местные документы отделены от более древней истории Reinhards: родство форм не делает их даты взаимозаменяемыми.',
 'The catalogue places a Renārs personal-name attestation in Vaiņode in 1941 and its calendar entry in 1974. These local records remain distinct from the older history of Reinhards; related forms do not have interchangeable historical dates.',
 'Renārs asmenvardžio paliudijimą katalogas sieja su Vainiuode 1941 metais, kalendoriaus įrašą — su 1974 metais. Vietiniai liudijimai atskiriami nuo senesnės Reinhards istorijos: formų giminystė neleidžia sukeisti jų datų.',
 'Kataloog paigutab Renārsi isikunimekirje Vaiņodesse 1941. aastal ja kalendrikande 1974. aastasse. Kohalikud tõendid on Reinhardsi vanemast ajaloost eraldi: seotud vormide ajaloolised daatumid pole vahetatavad.'
],1974);
add('Evija',['https://www.literatura.lv/en/persons/evija-gulbe'],[
 'Evija vārdnīcā tieši norādīta pie Eva. Tādējādi dokumentēta saimes saikne, bet ne atsevišķa Evija agrākā liecība. Abu formu līdzība nedod pamatu Eva vēsturisko datējumu automātiski izmantot kā tieši Evija pieraksta gadu.',
 'Evija в словаре прямо помещено при Eva. Это документирует семейную связь, но не отдельное раннее свидетельство Evija. Сходство форм не позволяет автоматически использовать историческую дату Eva как год записи именно Evija.',
 'The dictionary explicitly places Evija under Eva. This records a family relationship, not a separate early attestation of Evija. Similarity of forms does not make an Eva historical date a date for this exact Evija spelling.',
 'Žodynas Evija tiesiogiai pateikia prie Eva. Tai dokumentuoja šeimos ryšį, o ne atskirą ankstyvą Evija paliudijimą. Formų panašumas neleidžia Eva istorinės datos automatiškai laikyti būtent Evija rašybos metais.',
 'Sõnaraamat paigutab Evija otseselt Eva alla. See dokumenteerib nimepere seost, mitte Evija eraldi varast kasutusnäidet. Vormide sarnasus ei muuda Eva ajaloolist daatumit selle täpse Evija kirjapildi aastaks.'
],[
 'Evijas Gulbes grāmata «Koko un Riko» iznāca 2011. gadā. Abu varoņu piedzīvojumi turpinājās citās grāmatās, bet 2017. gada 10. septembrī Latvijas Leļļu teātrī pirmizrādi piedzīvoja Ģirta Šoļa iestudējums «Koko un Riko».',
 'Книга Эвии Гулбе «Koko un Riko» вышла в 2011 году. Приключения героев продолжились в других книгах, а 10 сентября 2017 года в Латвийском театре кукол состоялась премьера постановки Гиртса Шолиса «Koko un Riko».',
 'Evija Gulbe published Koko un Riko in 2011. The characters’ adventures continued in further books, and Ģirts Šolis’s stage adaptation Koko un Riko premiered at the Latvian Puppet Theatre on 10 September 2017.',
 'Evijos Gulbes knyga „Koko un Riko“ išėjo 2011 metais. Veikėjų nuotykiai tęsėsi kitose knygose, o 2017 metų rugsėjo 10 dieną Latvijos lėlių teatre įvyko Ģirtso Šolio spektaklio „Koko un Riko“ premjera.',
 'Evija Gulbe avaldas „Koko un Riko“ 2011. aastal. Tegelaste seiklused jätkusid uutes raamatutes ning 10. septembril 2017 esietendus Läti Nukuteatris Ģirts Šolise lavastus „Koko un Riko“.'
]);
add('Andis',['https://www.literatura.lv/personas/andis-surgunts'],[
 'Andis vārdnīcā ir Andrejs forma. Saimes grieķu pamats andreios skaidrots kā «vīrišķīgs, drosmīgs». Tā ir vēsturiska cilmes nozīme, kas nonāk līdz īsajai formai pa dokumentēto Andrejs saikni, nevis spriedums par katra cilvēka raksturu.',
 'Andis в словаре — форма Andrejs. Греческая основа andreios объясняется как «мужественный, храбрый». Это историческое значение, связанное с краткой формой через документированное Andrejs, а не суждение о характере каждого человека.',
 'The dictionary lists Andis as a form of Andrejs. Greek andreios is explained as manly or brave. This historical meaning reaches the short form through its documented Andrejs relationship; it is not a judgement of an individual’s character.',
 'Žodynas Andis pateikia kaip Andrejs formą. Graikiškas pagrindas andreios aiškinamas „vyriškas, drąsus“. Tai istorinė reikšmė, trumpąją formą pasiekianti per dokumentuotą Andrejs ryšį, o ne konkretaus žmogaus būdo vertinimas.',
 'Sõnaraamat nimetab Andist Andrejsi vormiks. Kreeka andreios tähendab seletuses mehist või vaprat. See ajalooline tähendus jõuab lühivormini dokumenteeritud Andrejsi seose kaudu ega ole hinnang inimese iseloomule.'
],[
 'Dzejnieka Anda Surgunta izlase «Skaistākā no aizmiršanās hipotēzēm» iznāca «Orbītā» 2019. gadā, jau pēc viņa nāves. 2021. gadā Valtera Dakšas izdevniecība laida klajā vēl vienu izlasi. Viņa dzeja tā turpināja sasniegt lasītājus arī vēlākos izdevumos.',
 'Избранное поэта Андиса Сургунтса «Skaistākā no aizmiršanās hipotēzēm» вышло в Orbīta в 2019 году, после его смерти. В 2021 году издательство Валтерса Дакши выпустило ещё одну подборку, продолжив знакомить читателей с его стихами.',
 'Poet Andis Surgunts’s selection Skaistākā no aizmiršanās hipotēzēm appeared with Orbīta in 2019, after his death. Valters Dakša’s publishing house issued another selection in 2021, continuing to bring his poetry to readers.',
 'Poeto Andiso Surguntso rinktinė „Skaistākā no aizmiršanās hipotēzēm“ išėjo leidykloje „Orbīta“ 2019 metais, po jo mirties. 2021 metais Valterso Dakšos leidykla paskelbė dar vieną rinktinę, pratęsdama poezijos kelią pas skaitytojus.',
 'Luuletaja Andis Surguntsi valikkogu „Skaistākā no aizmiršanās hipotēzēm“ ilmus Orbītas 2019. aastal, pärast tema surma. Valters Dakša kirjastus andis 2021 välja veel ühe valiku, tuues tema luulet jätkuvalt lugejateni.'
]);
add('Žanna',[],[
 'Žanna vārdnīcā ir franču sieviešu forma Johanna saimē. Johannes šķirklī ebreju Jəhānān un Jehohānān skaidroti kā «Jahve parādījis labvēlību». Franču formas norāde tā sasaista Žanna ar plašāku, dažādās valodās lietotu saimi.',
 'Žanna словарь называет французской женской формой семьи Johanna. В статье Johannes еврейские Jəhānān и Jehohānān объясняются как «Яхве проявил благоволение». Французская форма связывает Žanna с более широкой международной семьёй.',
 'The dictionary identifies Žanna as a French feminine form in the Johanna family. Its Johannes entry explains Hebrew Jəhānān and Jehohānān as Yahweh has shown favour. The French-form reference links Žanna with a wider international family.',
 'Žodynas Žanna nurodo kaip prancūzišką moterišką Johanna šeimos formą. Johannes įraše hebrajų Jəhānān ir Jehohānān aiškinami „Jahvė parodė palankumą“. Prancūziškos formos nuoroda sieja Žanna su platesne tarptautine šeima.',
 'Sõnaraamat määratleb Žanna Johanna nimepere prantsuse naisevormina. Johannese kirjes seletatakse heebrea Jəhānāni ja Jehohānāni kui Jahve on osutanud soosingut. Prantsuse vorm seob Žanna laiema rahvusvahelise perega.'
],[
 'Žanna personas vārda liecība katalogā minēta Neretā 1891. gadā. Avots šo gadu nedod kā kalendāra ierakstu. Tā ir vietai piesaistīta personvārda liecība, kura saglabā savu avota veidu arī tad, ja vārdam šodien ir vieta kalendārā.',
 'Свидетельство Žanna как личного имени каталог указывает в Нерете в 1891 году. Источник не даёт этот год как календарную запись. Это местный документ употребления имени, который сохраняет свой тип независимо от современного календаря.',
 'The catalogue records Žanna as a personal name in Nereta in 1891. It does not give that year as a calendar entry. This is a place-specific personal-name attestation whose source type remains distinct from modern calendar membership.',
 'Katalogas Žanna asmenvardį nurodo Neretoje 1891 metais. Šaltinis šių metų nepateikia kaip kalendoriaus įrašo. Tai su vieta susietas vardo paliudijimas, kurio šaltinio tipas lieka atskiras nuo dabartinės kalendoriaus tradicijos.',
 'Kataloog annab Žanna isikunimekirje Neretas 1891. aastast. Seda ei esitata kalendrikande aastana. See on kohaga seotud isikunimetõend, mille allikaliik jääb tänapäevasest kalendrikuuluvusest eraldi.'
]);
add('Ernests',['https://www.behindthename.com/name/ernest'],[
 'Ernests pieder Ernest un Ernst saimei, kuras pamatā ir senaugšvācu ernust — «nopietns». Starptautiskais vārdu ceļvedis tieši uzskaita Ernests kā latviešu formu. Tas ļauj saimes skaidrojumu piesaistīt šai konkrētajai rakstībai.',
 'Ernests относится к семье Ernest и Ernst, основанной на древневерхненемецком ernust, «серьёзный». Международный справочник прямо перечисляет Ernests как латышскую форму. Это связывает объяснение семьи с конкретным написанием.',
 'Ernests belongs to the Ernest and Ernst family, from Old High German ernust, serious or earnest. The international name guide explicitly lists Ernests as the Latvian form, connecting the family account with this exact spelling.',
 'Ernests priklauso Ernest ir Ernst šeimai, kilusiai iš senosios vokiečių aukštaičių ernust „rimtas“. Tarptautinis vardų vadovas tiesiogiai pateikia Ernests kaip latvišką formą ir sieja šeimos aiškinimą su konkrečia rašyba.',
 'Ernests kuulub Ernesti ja Ernsti perre, mis lähtub vanakõrgsaksa ernust’ist, tõsine. Rahvusvaheline nimejuhend loetleb Ernesti kõrval sõnaselgelt läti vormi Ernests, sidudes pere seletuse selle täpse kirjapildiga.'
],[
 'Latvijas katalogs norāda Ernests liecību Liepājā 1687. gadā un kalendāra ierakstu 1767. gadā. Starptautiskajā literatūrā radniecīgā Ernest forma parādās Oskara Vailda komēdijā «The Importance of Being Earnest» (1895); tas ir atsevišķs angļu skatuves piemērs.',
 'Латвийский каталог отмечает Ernests в Лиепае в 1687 году и в календаре в 1767 году. В литературе родственная форма Ernest появляется в комедии Оскара Уайльда «The Importance of Being Earnest» (1895) — отдельный пример английской сцены.',
 'The Latvian catalogue records Ernests in Liepāja in 1687 and in a calendar in 1767. The related English form Ernest appears in Oscar Wilde’s comedy The Importance of Being Earnest (1895), a separate example from the English stage.',
 'Latvijos katalogas Ernests nurodo Liepojoje 1687 metais ir kalendoriuje 1767 metais. Gimininga angliška Ernest forma pasirodo Oscaro Wilde’o komedijoje „The Importance of Being Earnest“ (1895) — atskirame anglų scenos pavyzdyje.',
 'Läti kataloog annab Ernesti kirjapildile Ernests kasutusnäite Liepājas 1687. ning kalendrikande 1767. aastast. Seotud inglise Ernest esineb Oscar Wilde’i komöödias „The Importance of Being Earnest“ (1895), eraldi inglise lavanäitena.'
],1767);
add('Iļja',[],[
 'Iļja vārdnīcā ir viena no Eliass slāvu valodu formām; avots min baltkrievu, krievu un ukraiņu valodu. Saimes ebreju pamats Ēlīyyāhū skaidrots kā «Jahve ir mans Dievs». Valodu uzskaitījums nav apgalvojums par katras Latvijas ģimenes aizguvuma ceļu.',
 'Iļja в словаре — одна из славянских форм Eliass; упомянуты белорусский, русский и украинский языки. Еврейская основа Ēlīyyāhū объясняется как «Яхве — мой Бог». Перечень языков не определяет путь заимствования в каждой латвийской семье.',
 'The dictionary lists Iļja among Slavic forms of Eliass, mentioning Belarusian, Russian and Ukrainian. Hebrew Ēlīyyāhū is explained as Yahweh is my God. The language list does not establish every Latvian family’s borrowing route.',
 'Žodyne Iļja yra viena slaviškų Eliass formų; minimos baltarusių, rusų ir ukrainiečių kalbos. Hebrajų Ēlīyyāhū aiškinamas „Jahvė yra mano Dievas“. Kalbų sąrašas nenustato kiekvienos Latvijos šeimos skolinimosi kelio.',
 'Sõnaraamat paigutab Iļja Eliassi slaavi vormide hulka, nimetades valgevene, vene ja ukraina keelt. Heebrea Ēlīyyāhū seletatakse kui Jahve on mu Jumal. Keelte loend ei määra iga Läti pere laenamisteed.'
],[
 'Latvijas personas vārda liecība katalogā norādīta Vecslobodā 20. gadsimta pirmajā ceturksnī. Avots dod vietu un periodu, nevis vienu precīzu gadu. Šis datējums attiecas uz vietējo pierakstu, nevis uz daudz senākās ebreju saimes rašanos.',
 'Латвийское свидетельство личного имени каталог указывает в Вецслободе в первой четверти XX века. Даны место и период, а не один точный год. Дата относится к местной записи, а не к возникновению гораздо более древней еврейской семьи.',
 'The catalogue places the Latvian personal-name attestation in Vecsloboda in the first quarter of the twentieth century. It gives a place and period, not one exact year. This dates a local record rather than the much older Hebrew family’s origin.',
 'Latvijos asmenvardžio paliudijimas kataloge nurodytas Vecslobodoje XX amžiaus pirmame ketvirtyje. Pateikta vieta ir laikotarpis, ne vieni tikslūs metai. Data priklauso vietiniam įrašui, o ne gerokai senesnės hebrajiškos šeimos kilmei.',
 'Läti isikunimekirje paigutab kataloog Vecslobodasse 20. sajandi esimesel veerandil. Antakse koht ja ajavahemik, mitte üks täpne aasta. See dateerib kohalikku kirjet, mitte palju vanema heebrea nimepere tekkimist.'
]);
add('Estere',['https://www.behindthename.com/name/esther'],[
 'Estere ir Esther saimes latviešu forma. Cilmei saglabātas divas iespējas: persiešu «zvaigzne» vai saikne ar dievietes Ištaras vārdu. Tās ir alternatīvas, nevis droši pierādīta viena sakne; šī nenoteiktība saglabāta arī starptautiskajā vārdu ceļvedī.',
 'Estere — латышская форма семьи Esther. Для происхождения сохранены две возможности: персидское «звезда» или связь с именем богини Иштар. Это альтернативы, а не один доказанный корень; неопределённость сохраняет и международный справочник.',
 'Estere is the Latvian form in the Esther family. Two possibilities remain for its origin: Persian star or a connection with the goddess Ishtar. These are alternatives, not one proven root, a distinction retained by the international name guide.',
 'Estere yra latviška Esther šeimos forma. Kilmės galimybės dvi: persų „žvaigždė“ arba ryšys su deivės Ištarės vardu. Tai alternatyvos, o ne viena įrodyta šaknis; skirtį išlaiko ir tarptautinis vardų vadovas.',
 'Estere on Estheri nimepere läti vorm. Päritolule jääb kaks võimalust: pärsia täht või seos jumalanna Ištari nimega. Need on alternatiivid, mitte üks tõestatud juur; eristus säilib ka rahvusvahelises nimejuhendis.'
],[
 'Bībeles Esteres grāmatā karaliene Estere atklāj valdniekam savu ebreju izcelsmi un panāk savas tautas glābšanu no Hamana ieceres. Stāstā viņas sākotnējais vārds ir Hadasa. Tā ir konkrēta reliģiska vēstījuma saikne, nevis Latvijas vārda pirmās lietošanas datējums.',
 'В библейской Книге Есфирь царица раскрывает правителю своё еврейское происхождение и спасает свой народ от замысла Амана. Её первоначальное имя в повествовании — Гадасса. Это связь с религиозным сюжетом, а не дата первого латвийского употребления.',
 'In the biblical Book of Esther, the queen reveals her Jewish ancestry to the king and saves her people from Haman’s plan. Her original name in the narrative is Hadassah. This is a specific religious-story association, not a date for the first Latvian bearer.',
 'Biblinėje Esteros knygoje karalienė atskleidžia valdovui savo žydišką kilmę ir išgelbsti tautą nuo Hamano sumanymo. Pradinis jos vardas pasakojime yra Hadasa. Tai konkretaus religinio pasakojimo ryšys, o ne pirmo Latvijos vartojimo data.',
 'Piibli Estri raamatus avaldab kuninganna kuningale oma juudi päritolu ja päästab rahva Haamani plaanist. Tema algne nimi loos on Hadassa. See on konkreetne religioosse jutustuse seos, mitte esimese Läti nimekandja daatum.'
]);
add('Aina',[],[
 'Aina vārdnīcā saistīta ar latviešu aina — «skats». Atsevišķi salīdzināti somu un igauņu Aino un Aina, kas saistīti ar somu aino(a) — «vienīgais». Šie skaidrojumi pieder dažādām valodu tradīcijām un nav sapludināti vienā nozīmē.',
 'Aina словарь связывает с латышским aina, «вид». Отдельно сравниваются финские и эстонские Aino и Aina, связанные с финским aino(a), «единственный». Это разные языковые традиции, не объединённые в одно значение.',
 'The dictionary connects Aina with Latvian aina, view. Separately it compares Finnish and Estonian Aino and Aina, linked with Finnish aino(a), only one. These accounts belong to different language traditions and are not merged into one meaning.',
 'Žodynas Aina sieja su latvių aina „vaizdas“. Atskirai lyginami suomių ir estų Aino bei Aina, susiję su suomių aino(a) „vienintelis“. Aiškinimai priklauso skirtingoms kalbinėms tradicijoms ir nesujungiami į vieną reikšmę.',
 'Sõnaraamat seob Aina läti sõnaga aina, vaade. Eraldi võrreldakse soome ja eesti Aino ning Aina nimesid, mis seostuvad soome aino(a)’ga, ainus. Need seletused kuuluvad eri keeletraditsioonidesse ega sulandu üheks tähenduseks.'
],[
 'Iespējamā personas vārda liecība katalogā norādīta Rūjienā 1915. gadā. Kalendāram dots iespējamais 1896. gads, iekavās arī atsauce uz 1889. gadu. Abas kalendāra norādes saglabātas, neizvēloties vienu kā neatkarīgi pierādītu pirmo datumu.',
 'Возможное свидетельство личного имени каталог относит к Руиене в 1915 году. Для календаря дан возможный 1896 год и в скобках также 1889 год. Обе календарные ссылки сохранены без выбора одной как независимо доказанной первой даты.',
 'The catalogue gives a possible personal-name record in Rūjiena in 1915. For the calendar it offers a possible 1896 entry with an additional 1889 reference in parentheses. Both calendar references remain, without selecting an independently proven first date.',
 'Galimą asmenvardžio paliudijimą katalogas pateikia Rūjienoje 1915 metais. Kalendoriui siūlomi galimi 1896 metai ir skliaustuose dar 1889 metai. Abi nuorodos paliekamos, nepasirenkant vienos kaip nepriklausomai įrodytos pirmosios datos.',
 'Kataloog annab võimaliku isikunimekirje Rūjienas 1915. aastast. Kalendrile pakutakse võimalikku 1896. aasta kannet ja sulgudes ka viidet 1889. aastale. Mõlemad viited jäävad alles, valimata üht sõltumatult tõestatud esmadaatumiks.'
],1896);
add('Silvija',[],[
 'Silvija skaidrojumā vārdnīca min latīņu silva — «mežs» un silvia — «mežā dzīvojoša». Tas sasaista personvārdu ar meža jēdzienu. Šīs ir avotā dotās valodiskās norādes, nevis apgalvojums, ka katra vārda nesēja dzimusi vai dzīvojusi mežā.',
 'В объяснении Silvija словарь приводит латинские silva, «лес», и silvia, «живущая в лесу». Это связывает личное имя с понятием леса. Языковые указания источника не означают, что каждая носительница родилась или жила в лесу.',
 'For Silvija the dictionary mentions Latin silva, forest, and silvia, forest dweller. This connects the personal name with the forest. These are linguistic indications from the source, not claims that every bearer was born or lived in woodland.',
 'Silvija aiškinime žodynas mini lotynų silva „miškas“ ir silvia „gyvenanti miške“. Taip asmenvardis siejamas su miško sąvoka. Tai kalbinės šaltinio nuorodos, o ne teiginys, kad kiekviena turėtoja gimė ar gyveno miške.',
 'Silvija seletuses mainib sõnaraamat ladina silva’t, mets, ja silvia’t, metsaelanik. See seob isikunime metsa mõistega. Need on allika keelelised viited, mitte väited iga nimekandja sünni- või elukoha kohta.'
],[
 'Katalogs norāda Silvija liecību Rūjienā 1884. gadā, kā arī vēlākus 1973. un 1975. gada pierakstus. Kalendāra ieraksts datēts ar 1880. gadu. Tādējādi vietējā vēsturē blakus ir vairāki lietojuma datējumi un atsevišķs kalendāra gads.',
 'Каталог указывает Silvija в Руиене в 1884 году, а также более поздние записи 1973 и 1975 годов. Календарная запись датирована 1880 годом. В местной истории соседствуют несколько дат употребления и отдельный календарный год.',
 'The catalogue records Silvija in Rūjiena in 1884, with later records in 1973 and 1975. The calendar entry is dated 1880. Its local history therefore contains several usage dates alongside a separate calendar year.',
 'Katalogas nurodo Silvija Rūjienoje 1884 metais ir vėlesnius 1973 bei 1975 metų įrašus. Kalendoriaus įrašas datuojamas 1880 metais. Vietinėje istorijoje taip išlieka keli vartosenos liudijimai ir atskiri kalendoriaus metai.',
 'Kataloog annab Silvija kirje Rūjienas 1884. aastast ning hilisemad näited 1973. ja 1975. aastast. Kalendrikande aastaks on 1880. Kohalik ajalugu sisaldab seega mitut kasutusdaatumit ning eraldi kalendriaastat.'
],1880);
add('Samanta',['https://www.behindthename.com/name/samantha'],[
 'Samanta ir angļu Samantha atveidojums. Samantha, iespējams, veidota kā Samuel sieviešu forma ar galotni -antha, ko varēja ietekmēt grieķu anthos — «zieds». Tas ir priekšlikums, nevis droši pierādīta salikta nozīme «Dieva zieds» vai līdzīgs tulkojums.',
 'Samanta передаёт английское Samantha. Возможно, Samantha создавалось как женская форма Samuel с окончанием -antha под влиянием греческого anthos, «цветок». Это гипотеза, а не доказанное сложное значение вроде «цветок Бога».',
 'Samanta renders English Samantha. Samantha may have been formed as a feminine of Samuel with -antha, perhaps influenced by Greek anthos, flower. This is a proposal, not a demonstrated compound meaning such as God’s flower.',
 'Samanta perteikia anglų Samantha. Galbūt Samantha sudaryta kaip moteriška Samuel forma su -antha, gal paveikta graikų anthos „gėlė“. Tai hipotezė, o ne įrodyta sudėtinė reikšmė, pavyzdžiui, „Dievo gėlė“.',
 'Samanta annab edasi inglise Samantha nime. Samantha võidi moodustada Samueli naisevormina lõpuga -antha, ehk kreeka anthos’e, lill, mõjul. See on oletus, mitte tõestatud liittähendus nagu Jumala lill.'
],[
 'Starptautiskais vārdu ceļvedis Samantha sākumu saista ar 18. gadsimta Ameriku. Plašāku popularitāti angļu forma ieguva pēc seriāla «Bewitched» sākuma 1964. gadā, pateicoties galvenās varones vārdam. Tas apraksta angļu formas izplatību, nevis Latvijas pirmo Samanta.',
 'Международный справочник связывает начало Samantha с Америкой XVIII века. Английская форма стала популярнее после начала сериала «Bewitched» в 1964 году благодаря имени главной героини. Это история английской формы, а не первой латвийской Samanta.',
 'The international name guide places Samantha’s beginnings in eighteenth-century America. The English form became more popular after Bewitched began in 1964, through its main character’s name. This describes English-language diffusion, not the first Latvian Samanta.',
 'Tarptautinis vardų vadovas Samantha pradžią sieja su XVIII amžiaus Amerika. Angliška forma išpopuliarėjo nuo 1964 metų serialo „Bewitched“, per pagrindinės veikėjos vardą. Tai angliškos formos sklaida, o ne pirmoji Latvijos Samanta.',
 'Rahvusvaheline nimejuhend paigutab Samantha alguse 18. sajandi Ameerikasse. Inglise vorm muutus populaarsemaks 1964 alanud sarja „Bewitched“ peategelase nime kaudu. See kirjeldab ingliskeelset levikut, mitte esimest Läti Samantat.'
]);
