// LV-only research: preserve exact spellings and the precision of attestations.
export const historiesLatvianR10C={};
const langs=['lv','ru','en','lt','et'];
function add(name,extra,origin,story,year){historiesLatvianR10C[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Reinis',[],[
 'Reinis vārdnīcā saistīts gan ar Reinhards, gan Reinholds. Abās saimēs ir ragin — «padoms», bet otrā daļa atšķiras: hart — «stiprs, drosmīgs» vai waltan — «valdīt». Avots neizvēlas vienu vienīgu saīsinājuma ceļu.',
 'Reinis словарь связывает и с Reinhards, и с Reinholds. В обеих семьях есть ragin, «совет», но второй элемент различается: hart, «сильный, храбрый», либо waltan, «править». Единственный путь сокращения не выбран.',
 'The dictionary connects Reinis with both Reinhards and Reinholds. Both families contain ragin, counsel, but differ in the second element: hart, strong or brave, or waltan, rule. The source selects no single shortening route.',
 'Žodynas Reinis sieja ir su Reinhards, ir su Reinholds. Abiejose šeimose yra ragin „patarimas“, bet skiriasi antras dėmuo: hart „stiprus, drąsus“ arba waltan „valdyti“. Vienas trumpinimo kelias nepasirenkamas.',
 'Sõnaraamat seob Reinist nii Reinhardsi kui Reinholdsiga. Mõlemas on ragin, nõuanne, ent teine osa erineb: hart, tugev või vapper, või waltan, valitsema. Üht ainsat lühenemisteed allikas ei vali.'
],[
 'Reinis personas vārda liecība katalogā datēta ar 1601. gadu, kalendāra ieraksts — ar 1767. gadu. Šīs atšķirīgās liecības ļauj sekot formas vietējai vēsturei, taču pašas neizšķir, kura no abām garākajām formām bijusi pamatā konkrētā ģimenē.',
 'Свидетельство Reinis как личного имени каталог датирует 1601 годом, календарную запись — 1767 годом. Эти разные документы позволяют проследить местную историю формы, но не определяют, какая полная форма лежала в основе выбора конкретной семьи.',
 'The catalogue dates a personal-name attestation of Reinis to 1601 and a calendar entry to 1767. These different records trace the form’s local history without deciding which longer name lay behind a particular family’s choice.',
 'Reinis asmenvardžio paliudijimą katalogas datuoja 1601 metais, kalendoriaus įrašą — 1767 metais. Skirtingi liudijimai padeda sekti vietinę formos istoriją, bet nenusprendžia, kuris ilgesnis vardas lėmė konkrečios šeimos pasirinkimą.',
 'Reinisi isikunimekirje dateerib kataloog 1601. ja kalendrikande 1767. aastasse. Need eri tõendid jälgivad vormi kohalikku lugu, otsustamata, kumb pikem nimi oli konkreetse pere valiku taga.'
],1767);
add('Rolands',[],[
 'Rolands balstīts senaugšvācu hrōd jeb hruod — «slava» un lant — «zeme». Vārdnīca min vairākas vietējās īsās formas, tostarp Rola, Rols un Roliks. Tās parāda, kā viens pilnais personvārds sarunvalodā iegūst dažādus atvasinājumus.',
 'Rolands основано на древневерхненемецких hrōd, или hruod, «слава», и lant, «земля». Словарь приводит местные краткие формы, в том числе Rola, Rols и Roliks: одно полное имя получает разные разговорные производные.',
 'Rolands is based on Old High German hrōd or hruod, glory, and lant, land. The dictionary lists local short forms including Rola, Rols and Roliks, showing how one full personal name develops several conversational derivatives.',
 'Rolands remiasi senosios vokiečių aukštaičių hrōd arba hruod „šlovė“ ir lant „žemė“. Žodynas pateikia vietines trumpąsias formas Rola, Rols ir Roliks, rodančias, kaip vienas pilnas vardas įgyja kelis šnekamosios kalbos vedinius.',
 'Rolandsi aluseks on vanakõrgsaksa hrōd ehk hruod, kuulsus, ja lant, maa. Sõnaraamat loetleb kohalikke lühivorme, näiteks Rola, Rols ja Roliks, näidates ühe täisnime mitut kõnekeelset tuletist.'
],[
 'Katalogā norādīta Rolands liecība 1545. gadā un kalendāra ieraksts 1892. gadā. Šie datējumi pieder dažādiem vārda vēstures slāņiem: personas vārda pierakstam un vēlākam kalendāram. Neviens no tiem netiek saukts par vārda izdomāšanas gadu.',
 'Каталог указывает свидетельство Rolands 1545 года и календарную запись 1892 года. Это разные пласты истории: запись личного имени и более поздний календарь. Ни одна дата не называется годом изобретения имени.',
 'The catalogue records Rolands in 1545 and gives a calendar entry in 1892. These belong to different layers of its history: a personal-name record and a later calendar. Neither is presented as the year the name was invented.',
 'Katalogas nurodo Rolands paliudijimą 1545 metais ir kalendoriaus įrašą 1892 metais. Tai skirtingi istorijos sluoksniai: asmenvardžio įrašas ir vėlesnis kalendorius. Nė vieni metai nevadinami vardo sukūrimo data.',
 'Kataloog annab Rolandsi kasutusnäite 1545. ning kalendrikande 1892. aastast. Need kuuluvad nime ajaloo eri kihtidesse: isikunimekirje ja hilisem kalender. Kumbagi ei nimetata nime väljamõtlemise aastaks.'
],1892);
add('Arnis',['https://www.literatura.lv/personas/arnis-korosevskis'],[
 'Arnis vārdnīcā ir Arnolds forma. Garākā vārda pamatā ir senaugšvācu arn — «ērglis» un waltan — «valdīt». Šī ir avotā tieši norādīta vārdu saime, nevis saikne, kas secināta tikai no līdzīgām pirmajām skaņām.',
 'Arnis в словаре — форма Arnolds. В основе полного имени древневерхненемецкие arn, «орёл», и waltan, «править». Это прямо указанная источником семья имён, а не связь, выведенная лишь из сходства первых звуков.',
 'The dictionary lists Arnis as a form of Arnolds, based on Old High German arn, eagle, and waltan, rule. This is an explicitly documented name-family link, rather than a relationship inferred solely from similar opening sounds.',
 'Žodynas Arnis pateikia kaip Arnolds formą, paremtą senosios vokiečių aukštaičių arn „erelis“ ir waltan „valdyti“. Tai tiesiogiai dokumentuotas vardų šeimos ryšys, o ne vien panašių pirmųjų garsų spėjimas.',
 'Sõnaraamat nimetab Arnist Arnoldsi vormiks, mille aluseks on vanakõrgsaksa arn, kotkas, ja waltan, valitsema. See on otseselt dokumenteeritud nimepere seos, mitte ainult sarnastest algushäälikutest tuletatud oletus.'
],[
 'Literatūrzinātnieks Arnis Koroševskis 2022. gadā publicēja monogrāfiju «Lielais noliedzējs» par Andreju Upīti. Pētījums iznāca «Dienas Grāmatā», turpinot viņa darbu ar Upīša literāro mantojumu un rakstnieka memoriālo muzeju.',
 'Литературовед Арнис Корошевскис в 2022 году опубликовал монографию «Lielais noliedzējs» об Андрее Упите. Книга вышла в Dienas Grāmata и продолжила его работу с литературным наследием Упита и мемориальным музеем писателя.',
 'Literary scholar Arnis Koroševskis published Lielais noliedzējs, a monograph on Andrejs Upīts, in 2022. Issued by Dienas Grāmata, it continued his work with Upīts’s literary legacy and the writer’s memorial museum.',
 'Literatūrologas Arnis Koroševskis 2022 metais paskelbė monografiją „Lielais noliedzējs“ apie Andrejų Upītį. Leidykloje „Dienas Grāmata“ išėjusi knyga pratęsė jo darbą su rašytojo literatūriniu palikimu ir memorialiniu muziejumi.',
 'Kirjandusteadlane Arnis Koroševskis avaldas 2022. aastal monograafia „Lielais noliedzējs“ Andrejs Upītsist. Dienas Grāmata välja antud raamat jätkas tema tööd Upītsi kirjanduspärandi ja kirjaniku memoriaalmuuseumiga.'
]);
add('Dāvis',['https://www.nkc.gov.lv/lv/tevs-nakts'],[
 'Dāvis ir Dāvids forma. Vārdnīca saimi saista ar ebreju Dāwīd un nozīmi «mīlētais». Īsā forma tā saglabā saikni ar plaši izplatītu starptautisku vārdu, bet ir patstāvīgi lietota latviešu rakstība.',
 'Dāvis — форма Dāvids. Словарь связывает семью с еврейским Dāwīd и значением «любимый». Краткая форма сохраняет связь с широко распространённым международным именем, оставаясь самостоятельным латышским написанием.',
 'Dāvis is a form of Dāvids. The dictionary connects the family with Hebrew Dāwīd and the meaning beloved. The short form retains its relationship with a widespread international name while remaining a separately used Latvian spelling.',
 'Dāvis yra Dāvids forma. Žodynas šeimą sieja su hebrajų Dāwīd ir reikšme „mylimas“. Trumpoji forma išlaiko ryšį su paplitusiu tarptautiniu vardu, bet yra savarankiškai vartojama latviška rašyba.',
 'Dāvis on Dāvidsi vorm. Sõnaraamat seob pere heebrea Dāwīdi ja tähendusega armastatu. Lühivorm säilitab seose laialt levinud rahvusvahelise nimega, olles samal ajal eraldi kasutatav läti kirjapilt.'
],[
 'Dāvja Sīmaņa spēlfilma «Tēvs Nakts» iznāca 2018. gadā Latvijas simtgades filmu programmā. Tā stāsta par Žani Lipki un viņa ģimeni, kas Otrā pasaules kara laikā glāba ebrejus. Žaņa lomā filmējās Artūrs Skrastiņš.',
 'Фильм Дависа Симаниса «Tēvs Nakts» вышел в 2018 году в программе столетия Латвии. Он рассказывает о Жанисе Липке и его семье, спасавших евреев во время Второй мировой войны. Жаниса сыграл Артурс Скрастиньш.',
 'Dāvis Sīmanis’s feature Tēvs Nakts appeared in 2018 in Latvia’s centenary film programme. It tells of Žanis Lipke and his family rescuing Jews during the Second World War, with Artūrs Skrastiņš playing Žanis.',
 'Dāvio Sīmanio filmas „Tēvs Nakts“ pasirodė 2018 metais Latvijos šimtmečio kino programoje. Jis pasakoja apie Žanį Lipkę ir jo šeimą, gelbėjusius žydus per Antrąjį pasaulinį karą. Žanį vaidino Artūrs Skrastiņš.',
 'Dāvis Sīmanise mängufilm „Tēvs Nakts“ valmis 2018. aastal Läti sajanda aastapäeva filmiprogrammis. See jutustab Žanis Lipkest ja tema perest, kes päästsid Teise maailmasõja ajal juute. Žanist mängis Artūrs Skrastiņš.'
]);
add('Karīna',['https://www.literatura.lv/personas/karina-racko'],[
 'Karīna cilme tieši šajā rakstībā izmantotajā vārdnīcas materiālā nav noteikta. Katalogs norāda, ka forma attiecīgajā skenējumā nav minēta, un atsevišķi atsaucas uz Karina. Šī norāde nav pierādījums abu rakstību pilnīgi vienādai vēsturei.',
 'Происхождение точного написания Karīna использованный словарный материал не устанавливает. Каталог отмечает отсутствие формы в соответствующем скане и отдельно отсылает к Karina. Это не доказывает полностью одинаковую историю двух написаний.',
 'The consulted dictionary material does not establish an origin for the exact spelling Karīna. The catalogue reports its absence from the relevant scan and separately refers to Karina. That reference does not prove identical histories for the two spellings.',
 'Naudota žodyno medžiaga nenustato būtent Karīna rašybos kilmės. Katalogas pažymi, kad formos atitinkamame skene nėra, ir atskirai nurodo Karina. Tai neįrodo visiškai vienodos abiejų rašybų istorijos.',
 'Kasutatud sõnaraamatumaterjal ei määra täpse kirjapildi Karīna päritolu. Kataloog märgib selle puudumist vastavast skannist ning viitab eraldi Karinale. Viide ei tõesta kahe kirjapildi täiesti ühist ajalugu.'
],[
 'Rakstniece Karīna Gleitnere, pazīstama arī kā Karīna Račko, 2017. gadā publicēja romānu «Saplēstās mežģīnes» izdevniecībā «Zvaigzne ABC». 2018. gadā tam sekoja «Debesis pelnos». Institucionālā biogrāfija dokumentē tieši Karīna rakstību.',
 'Писательница Карина Глейтнере, известная также как Карина Рачко, в 2017 году выпустила роман «Saplēstās mežģīnes» в Zvaigzne ABC. В 2018 году последовал «Debesis pelnos». Институциональная биография документирует именно написание Karīna.',
 'Writer Karīna Gleitnere, also known as Karīna Račko, published Saplēstās mežģīnes with Zvaigzne ABC in 2017, followed by Debesis pelnos in 2018. Her institutional biography documents the exact spelling Karīna.',
 'Rašytoja Karīna Gleitnere, žinoma ir kaip Karīna Račko, 2017 metais leidykloje „Zvaigzne ABC“ išleido romaną „Saplēstās mežģīnes“. 2018 metais pasirodė „Debesis pelnos“. Institucinė biografija dokumentuoja būtent Karīna rašybą.',
 'Kirjanik Karīna Gleitnere, tuntud ka Karīna Račkona, avaldas „Saplēstās mežģīnes“ kirjastuses Zvaigzne ABC 2017. aastal; 2018 järgnes „Debesis pelnos“. Institutsionaalne elulugu dokumenteerib täpselt kirjapildi Karīna.'
]);
add('Ļubova',[],[
 'Ļubova skaidrojumā vārdnīca dod krievu ljubov’ — «mīlestība». Tā ir tieša saikne ar attiecīgās valodas vārdu, nevis no cilvēka rakstura izsecināta nozīme. Latviešu rakstība saglabā šī personvārda atpazīstamo skanisko pamatu.',
 'В объяснении Ļubova словарь даёт русское любовь. Это прямая связь со словом соответствующего языка, а не значение, выведенное из характера человека. Латышское написание сохраняет узнаваемую звуковую основу личного имени.',
 'For Ļubova the dictionary gives Russian ljubov’, love. This is a direct connection with a word in that language, rather than a meaning inferred from someone’s character. The Latvian spelling retains the personal name’s recognisable sound pattern.',
 'Aiškindamas Ļubova žodynas pateikia rusų ljubov’ „meilė“. Tai tiesioginis ryšys su tos kalbos žodžiu, o ne iš žmogaus būdo išvesta reikšmė. Latviška rašyba išlaiko atpažįstamą asmenvardžio garsinį pagrindą.',
 'Ļubova seletuses annab sõnaraamat vene ljubov’, armastus. See on otsene seos vastava keele sõnaga, mitte inimese iseloomust järeldatud tähendus. Läti kirjapilt säilitab isikunime äratuntava häälikulise aluse.'
],[
 'Katalogs personas vārda liecību datē ar 19. gadsimta pēdējo ceturksni, bet kalendāra ierakstu — ar 1899. gadu. Agrīnā liecība paliek norādīta kā periods. Precīzais kalendāra gads nav izmantots, lai izdomātu tikpat precīzu personas vārda pirmo datumu.',
 'Каталог относит свидетельство личного имени к последней четверти XIX века, календарную запись — к 1899 году. Ранний документ остаётся датирован периодом. Точный календарный год не превращается в вымышленную точную дату первого употребления имени.',
 'The catalogue dates a personal-name attestation to the last quarter of the nineteenth century and a calendar entry to 1899. The earlier record remains a period; the exact calendar year is not reused to invent an exact first personal-name date.',
 'Katalogas asmenvardžio paliudijimą priskiria XIX amžiaus paskutiniam ketvirčiui, kalendoriaus įrašą — 1899 metams. Ankstyvo liudijimo laikotarpis išlaikomas; tikslūs kalendoriaus metai netampa išgalvota pirmojo asmenvardžio data.',
 'Kataloog dateerib isikunimekirje 19. sajandi viimasesse veerandisse ning kalendrikande 1899. aastasse. Varane kirje jääb ajavahemikuks: täpset kalendriaastat ei kasutata väljamõeldud esimese kasutusaasta loomiseks.'
],1899);
add('Ņikita',[],[
 'Ņikita vārdnīcā saistīts ar grieķu darbības vārdu nikaō — «uzvarēt». Tas izskaidro saknes nozīmi. Avots atsevišķi nedod gatavu personvārda tulkojumu «uzvarētājs», tāpēc saknes skaidrojums šeit saglabāts savā faktiskajā apjomā.',
 'Ņikita словарь связывает с греческим глаголом nikaō, «побеждать». Это объяснение корня. Источник отдельно не даёт готового перевода имени «победитель», поэтому толкование сохраняет фактический объём исходного свидетельства.',
 'The dictionary connects Ņikita with Greek nikaō, win. This explains the root. The source does not separately supply a complete personal-name translation victor, so the account retains the actual scope of its linguistic evidence.',
 'Žodynas Ņikita sieja su graikų veiksmažodžiu nikaō „nugalėti“. Tai šaknies aiškinimas. Šaltinis atskirai nepateikia viso vardo vertimo „nugalėtojas“, todėl išlaikoma tikroji kalbinio liudijimo apimtis.',
 'Sõnaraamat seob Ņikita kreeka tegusõnaga nikaō, võitma. See seletab juurt. Allikas ei anna eraldi terviknime tõlget võitja, seega jääb seletus keeletõendi tegeliku ulatuse juurde.'
],[
 'Iespējamā personas vārda liecība datēta ar 19. gadsimta trešo ceturksni; kalendāra ieraksts — ar 1889. gadu. Avota piesardzība un perioda precizitāte saglabāta. Kalendāra datējums ir atsevišķs no iespējami agrākās liecības.',
 'Возможное свидетельство личного имени датировано третьей четвертью XIX века, календарная запись — 1889 годом. Осторожность источника и точность периода сохранены. Календарная дата отделена от возможного раннего документа.',
 'A possible personal-name attestation is dated to the third quarter of the nineteenth century; the calendar entry is dated 1889. The source’s caution and period precision are retained, and the calendar date remains separate from the earlier possible record.',
 'Galimas asmenvardžio paliudijimas datuojamas XIX amžiaus trečiuoju ketvirčiu, kalendoriaus įrašas — 1889 metais. Išlaikoma šaltinio abejonė ir laikotarpio tikslumas; kalendoriaus data atskiriama nuo galimo ankstesnio liudijimo.',
 'Võimalik isikunimekirje dateeritakse 19. sajandi kolmandasse veerandisse, kalendrikande aastaks antakse 1889. Säilivad allika ettevaatus ja ajavahemiku täpsus. Kalendridaatum on varasemast võimalikust kirjest eraldi.'
],1889);
add('Daiga',['https://www.literatura.lv/personas/daiga-lapane'],[
 'Daiga cilmei vārdnīca piesardzīgi piedāvā saikni ar lietuviešu daigas — «asns». Tas ir iespējams salīdzinājums, nevis viennozīmīgi pierādīts katras vārda nesējas izcelsmes ceļš. Tādēļ auga tēls paliek nosaukts kā cilmes priekšlikums.',
 'Для Daiga словарь осторожно предлагает связь с литовским daigas, «росток». Это возможное сравнение, а не доказанный путь происхождения имени каждой носительницы. Растительный образ сохраняется именно как этимологическое предположение.',
 'The dictionary tentatively proposes a connection between Daiga and Lithuanian daigas, sprout. This is a possible comparison rather than a demonstrated naming route for every bearer. The plant image remains an origin proposal.',
 'Daiga kilmei žodynas atsargiai siūlo ryšį su lietuvių daigas. Tai galimas palyginimas, o ne įrodytas kiekvienos vardo turėtojos įvardijimo kelias. Augalo vaizdinys paliekamas kaip etimologinis siūlymas.',
 'Sõnaraamat pakub Daigale ettevaatlikult seost leedu sõnaga daigas, idu. See on võimalik võrdlus, mitte iga nimekandja tõestatud nimevaliku tee. Taimekujund jääb päritoluoletuseks.'
],[
 'Dzejniece un tulkotāja Daiga Lapāne izdeva «Meditācija smilšu pulkstenī» 2000. gadā un «Mirklis virs valodas» 2012. gadā. Pirmā krājuma vāka akvareli viņa radīja pati. Viņas darbā dzeja tā sastopas arī ar vizuālu pašizpausmi.',
 'Поэт и переводчик Дайга Лапане выпустила «Meditācija smilšu pulkstenī» в 2000 году и «Mirklis virs valodas» в 2012 году. Акварель на обложке первого сборника она создала сама: поэзия соединилась с визуальным творчеством.',
 'Poet and translator Daiga Lapāne published Meditācija smilšu pulkstenī in 2000 and Mirklis virs valodas in 2012. She painted the watercolour used on her first collection’s cover, bringing visual art into her poetic work.',
 'Poetė ir vertėja Daiga Lapāne išleido „Meditācija smilšu pulkstenī“ 2000 metais ir „Mirklis virs valodas“ 2012 metais. Pirmojo rinkinio viršelio akvarelę nutapė pati, sujungdama poeziją su vaizduojamąja kūryba.',
 'Luuletaja ja tõlkija Daiga Lapāne avaldas „Meditācija smilšu pulkstenī“ 2000. ning „Mirklis virs valodas“ 2012. aastal. Esikkogu kaane akvarelli maalis ta ise, sidudes luule visuaalse loominguga.'
]);
add('Mārīte',['https://www.literatura.lv/personas/marite-romane'],[
 'Mārīte vārdnīcā norādīta pie Māra. Savukārt Māra skaidrojumā ir vairākas iespējas — Marija, Tamāra, ebreju «rūgtā» un latviešu folkloras interpretācijas. Šī atsauce neizvēlas vienu neapstrīdamu sakni arī Mārīte formai.',
 'Mārīte словарь помещает при Māra. Для Māra приведены разные возможности: Marija, Tamāra, еврейское «горькая» и латышские фольклорные толкования. Такая отсылка не выбирает единственный бесспорный корень и для Mārīte.',
 'The dictionary refers Mārīte to Māra, whose entry offers several possibilities: Marija, Tamāra, a Hebrew bitter account and Latvian folklore interpretations. This reference does not select one uncontested root for Mārīte either.',
 'Žodynas Mārīte nukreipia į Māra, kurios įraše yra kelios galimybės: Marija, Tamāra, hebrajiškas „karti“ aiškinimas ir latvių folkloro interpretacijos. Ši nuoroda nepasirenka vienos neginčijamos Mārīte šaknies.',
 'Sõnaraamat suunab Mārīte Māra juurde, mille kirjes on mitu võimalust: Marija, Tamāra, heebrea mõru-seletus ja läti rahvaluule tõlgendused. Ka Mārītele ei määra see üht vaieldamatut juurt.'
],[
 'Mārīte Romāne, īstajā vārdā Marija Romāne, 1984. gadā izdeva dokumentālu miniatūru krājumu «Desmitvīru spēks». Viņa rakstīja arī stāstus un raidlugas un strādāja Latvijas Radio Bērnu un jaunatnes redakcijā. Šeit Mārīte ir dokumentēts literārais vārds.',
 'Марите Романе, настоящее имя Мария Романе, в 1984 году выпустила документальные миниатюры «Desmitvīru spēks». Она писала также рассказы и радиопьесы, работала в детской и молодёжной редакции Латвийского радио. Здесь Mārīte — литературное имя.',
 'Mārīte Romāne, whose actual name was Marija Romāne, published the documentary miniatures Desmitvīru spēks in 1984. She also wrote stories and radio plays and worked in Latvian Radio’s children’s and youth department. Here Mārīte is a literary name.',
 'Mārīte Romāne, tikruoju vardu Marija Romāne, 1984 metais išleido dokumentinių miniatiūrų rinkinį „Desmitvīru spēks“. Ji rašė apsakymus ir radijo pjeses, dirbo Latvijos radijo vaikų ir jaunimo redakcijoje. Čia Mārīte yra literatūrinis vardas.',
 'Mārīte Romāne, tegeliku nimega Marija Romāne, avaldas 1984. aastal dokumentaalminiatuurid „Desmitvīru spēks“. Ta kirjutas ka jutte ja kuuldemänge ning töötas Läti Raadio laste- ja noortetoimetuses. Siin on Mārīte kirjanikunimi.'
]);
add('Adrians',['https://www.behindthename.com/name/adrians','https://www.english-heritage.org.uk/visit/places/hadrians-wall/hadrians-wall-history-and-stories/history/'],[
 'Adrians ir latviešu Adrian forma. Saime nāk no romiešu Hadrianus — «no Hadrijas», vietvārda Itālijā. Tā ir ģeogrāfiska vārda cilme: sākotnēji norāde uz vietu, nevis īpašību, ko piedēvēt visiem vārda nesējiem.',
 'Adrians — латышская форма Adrian. Семья восходит к римскому Hadrianus, «из Гадрии», итальянскому топониму. Это географическое происхождение: первоначально указание на место, а не черта, приписываемая всем носителям имени.',
 'Adrians is the Latvian form of Adrian, from Roman Hadrianus, from Hadria, a place in Italy. Its origin is geographical: a connection with a place rather than a quality assigned to everyone who bears the name.',
 'Adrians yra latviška Adrian forma, kilusi iš romėnų Hadrianus „iš Hadrijos“, Italijos vietovardžio. Kilmė geografinė: pradžioje ryšys su vieta, o ne visiems vardo turėtojams priskiriama savybė.',
 'Adrians on Adriani läti vorm, mis lähtub Rooma Hadrianusest: Hadriast, Itaalia kohanimest. Algupära on geograafiline, tähistades seost paigaga, mitte kõigile nimekandjatele omistatavat omadust.'
],[
 'Ar romiešu saimi saistīts imperators Hadriāns. Pēc viņa vizītes Britānijā mūsu ēras 122. gadā romiešu armija pēc viņa pavēles sāka celt Hadriāna valni. English Heritage šo robežbūvi aplūko kā atsevišķu, konkrēti datētu vārda saimes vēstures liecību.',
 'К римской семье относится имя императора Адриана. После его посещения Британии в 122 году н. э. римская армия по его приказу начала строить Адрианов вал. English Heritage описывает этот конкретный памятник истории императорского имени.',
 'Emperor Hadrian belongs to the Roman name family. Following his visit to Britain in AD 122, the Roman army began building Hadrian’s Wall on his orders. English Heritage documents this specific monument connected with the imperial name.',
 'Romėniškai vardų šeimai priklauso imperatorius Hadrianas. Po jo apsilankymo Britanijoje 122 metais romėnų kariuomenė jo įsakymu pradėjo statyti Hadriano sieną. „English Heritage“ dokumentuoja šį konkretų su imperatoriaus vardu susijusį paminklą.',
 'Rooma nimeperre kuulub keiser Hadrianus. Pärast tema külaskäiku Britanniasse aastal 122 alustas Rooma sõjavägi tema käsul Hadrianuse valli ehitamist. English Heritage dokumenteerib seda konkreetset keisri nimega seotud rajatist.'
]);
