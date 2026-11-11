// LV-only research: dictionary histories and documented cultural episodes.
export const historiesLatvianR10A={};
const langs=['lv','ru','en','lt','et'];
function add(name,extra,origin,story,year){historiesLatvianR10A[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Veronika',[],[
 'Veronika cilmei vārdnīcas atstāstā piedāvāti divi atšķirīgi skaidrojumi: grieķu pherō — «nest» un nikē — «uzvara», vai latīņu verus — «patiess» un iconicus — «attēls». Avots neizvēlas vienu drošu izcelsmi.',
 'Для Veronika пересказ словаря предлагает два разных объяснения: греческие pherō, «нести», и nikē, «победа», либо латинские verus, «истинный», и iconicus, «изображение». Единственное достоверное происхождение не выбрано.',
 'The dictionary catalogue offers two distinct accounts of Veronika: Greek pherō, bring, with nikē, victory, or Latin verus, true, with iconicus, image. It does not establish one certain origin for the name.',
 'Veronika kilmei žodyno atpasakojime siūlomi du skirtingi aiškinimai: graikų pherō „nešti“ ir nikē „pergalė“ arba lotynų verus „tikras“ ir iconicus „atvaizdas“. Viena patikima kilmė nepasirenkama.',
 'Veronika päritolule pakub sõnaraamatukataloog kaht eri seletust: kreeka pherō, tooma, koos nikēga, võit, või ladina verus, tõeline, koos iconicus’ega, kujutis. Üht kindlat algupära allikas ei vali.'
],[
 'Latvijas lietojuma vēsturē katalogs norāda Veronika pierakstu Rēzeknē 1877. gadā un kalendāra ierakstu 1892. gadā. Šie divi datējumi atspoguļo personas vārda un kalendāra avotus; tie nenozīmē, ka vārds radies tieši šajos gados.',
 'В истории употребления в Латвии каталог указывает запись Veronika в Резекне в 1877 году и включение в календарь в 1892 году. Это даты личного имени и календарного источника, а не годы создания имени.',
 'For Latvian usage the catalogue records Veronika in Rēzekne in 1877 and in a calendar in 1892. These dates belong to a personal-name record and a calendar source respectively; neither is a date when the name was invented.',
 'Latvijos vartosenos istorijoje katalogas pateikia Veronika įrašą Rėzeknėje 1877 metais ir kalendoriaus įrašą 1892 metais. Tai asmenvardžio ir kalendoriaus šaltinių datos, o ne vardo sukūrimo metai.',
 'Läti kasutusloos annab kataloog Veronika kirje Rēzeknes 1877. aastast ja kalendrikande 1892. aastast. Need dateerivad vastavalt isikunimekirjet ja kalendrivalikut, mitte nime väljamõtlemist.'
],1892);
add('Armands',['https://www.literatura.lv/personas/armands-melnalksnis'],[
 'Armands vārdnīcā saistīts ar Hermanis. Saimes skaidrojumā dotas senaugšvācu daļas heri — «karaspēks, ļaudis» un man — «vīrs». Tās raksturo vārda vēsturisko uzbūvi, nevis tā nesēja raksturu vai nodarbošanos.',
 'Armands в словаре связан с Hermanis. Для семьи приведены древневерхненемецкие элементы heri, «войско, люди», и man, «мужчина». Они объясняют историческое строение имени, а не характер или профессию его носителя.',
 'The dictionary links Armands with Hermanis and the Old High German elements heri, army or people, and man, man. These explain the historical name family rather than the character or occupation of an individual bearer.',
 'Žodynas Armands sieja su Hermanis ir senosios vokiečių aukštaičių kalbos dėmenimis heri „kariuomenė, žmonės“ bei man „vyras“. Jie aiškina istorinę vardų šeimą, o ne konkretaus žmogaus būdą ar profesiją.',
 'Sõnaraamat seob Armandsi Hermanise ja vanakõrgsaksa osadega heri, sõjavägi või rahvas, ning man, mees. Need seletavad ajaloolist nimeperet, mitte nimekandja iseloomu ega elukutset.'
],[
 'Dzejnieks Armands Melnalksnis pirmo dzejoli publicēja žurnālā «Zvaigzne» 1967. gadā. Viņa pirmais krājums «Mainība» iznāca «Liesmā» 1973. gadā, bet 1978. gadā tam sekoja «Karsts sudrabs vēja dūdās».',
 'Поэт Арманд Мелналкснис опубликовал первое стихотворение в журнале «Zvaigzne» в 1967 году. Первый сборник «Mainība» вышел в Liesma в 1973 году, а в 1978 году за ним последовал «Karsts sudrabs vēja dūdās».',
 'Poet Armands Melnalksnis published his first poem in Zvaigzne magazine in 1967. His first collection, Mainība, appeared with Liesma in 1973, followed by Karsts sudrabs vēja dūdās in 1978.',
 'Poetas Armands Melnalksnis pirmą eilėraštį paskelbė žurnale „Zvaigzne“ 1967 metais. Pirmąjį rinkinį „Mainība“ leidykla „Liesma“ išleido 1973 metais, o 1978 metais pasirodė „Karsts sudrabs vēja dūdās“.',
 'Luuletaja Armands Melnalksnis avaldas esimese luuletuse ajakirjas Zvaigzne 1967. aastal. Esikkogu „Mainība“ ilmus kirjastuses Liesma 1973. aastal ning 1978 järgnes „Karsts sudrabs vēja dūdās“.'
]);
add('Dainis',['https://www.literatura.lv/en/persons/dainis-ivans'],[
 'Dainis ir Daina vīriešu forma. Vārdnīca saista šo saimi ar latviešu vārdu daina — «tautasdziesma». Tādējādi personvārda pamatā ir vietējs valodas un dziesmu kultūras jēdziens, kas saglabājas arī sieviešu formā Daina.',
 'Dainis — мужская форма Daina. Словарь связывает семью с латышским словом daina, «народная песня». В основе имени лежит местное понятие языка и песенной культуры, сохраняющееся и в женской форме Daina.',
 'Dainis is the masculine form of Daina. The dictionary derives the family from Latvian daina, folk song. A local word from the language and its song culture therefore underlies both the masculine and feminine personal names.',
 'Dainis yra vyriška Daina forma. Žodynas šeimą kildina iš latvių daina „liaudies daina“. Taigi abiejų lyčių asmenvardžių pagrindas yra vietinis kalbos ir dainuojamosios kultūros žodis.',
 'Dainis on Daina meessoost vaste. Sõnaraamat lähtub läti sõnast daina, rahvalaul. Nii mees- kui ka naisenime aluseks on seega kohalik keele ja laulukultuuri mõiste.'
],[
 'Dainis Īvāns rakstījis arī kino scenārijus: dokumentālajām filmām «Astoņas zvaigznes» (2017) un «Dziesmuvara» (2018), vēlāk vēsturiskajai drāmai «Zeme, kas dzied» (2024). Tā vārda nesēja darbs savieno publicistiku ar Latvijas vēstures atainojumu kino.',
 'Дайнис Иванс писал и киносценарии: документальных фильмов «Astoņas zvaigznes» (2017), «Dziesmuvara» (2018), затем исторической драмы «Zeme, kas dzied» (2024). Его работа соединяет публицистику с изображением истории Латвии в кино.',
 'Dainis Īvāns also wrote screenplays, including the documentaries Astoņas zvaigznes (2017) and Dziesmuvara (2018), and the historical drama Zeme, kas dzied (2024). His work connects public writing with Latvian history on screen.',
 'Dainis Īvāns rašė ir scenarijus: dokumentiniams filmams „Astoņas zvaigznes“ (2017), „Dziesmuvara“ (2018), vėliau istorinei dramai „Zeme, kas dzied“ (2024). Jo darbas jungia publicistiką ir Latvijos istorijos vaizdavimą kine.',
 'Dainis Īvāns on kirjutanud ka filmistsenaariume: dokumentaalidele „Astoņas zvaigznes“ (2017) ja „Dziesmuvara“ (2018) ning ajaloodraamale „Zeme, kas dzied“ (2024). Tema töö seob publitsistikat Läti ajaloo kujutamisega filmis.'
]);
add('Pāvels',[],[
 'Pāvels vārdnīcā saistīts ar Pauls saimi un latīņu paulus — «mazs». Tas ir saimes etimoloģiskais pamats; latviešu Pāvels un Pauls ir atšķirīgas pieraksta formas, kuru vēsturiskos datumus nevar automātiski aizstāt vienu ar otru.',
 'Pāvels в словаре связан с семьёй Pauls и латинским paulus, «малый». Это этимологическая основа семьи. Латышские Pāvels и Pauls — разные написания, и исторические даты одного нельзя автоматически приписывать другому.',
 'The dictionary connects Pāvels with the Pauls family and Latin paulus, small. That is the family’s etymological basis. Pāvels and Pauls remain distinct spellings whose historical dates cannot simply be exchanged.',
 'Žodynas Pāvels sieja su Pauls šeima ir lotynų paulus „mažas“. Tai šeimos etimologinis pagrindas. Pāvels ir Pauls lieka skirtingos rašybos formos, kurių istorinių datų negalima tiesiog sukeisti.',
 'Sõnaraamat seob Pāvelsi Paulsi pere ja ladina sõnaga paulus, väike. See on nimepere etümoloogiline alus. Pāvels ja Pauls on siiski eri kirjapildid, mille ajaloolisi daatumeid ei saa lihtsalt vahetada.'
],[
 'Katalogs Pāvels iespējamo agrīno personas vārda liecību datē ar 1515. gadu, bet iespējamo kalendāra ierakstu — ar 1889. gadu. Abiem datējumiem avotā ir piesardzības norāde; tie nav apgalvojums par vārda radīšanu šajos gados.',
 'Каталог датирует возможное раннее свидетельство Pāvels 1515 годом, а возможную календарную запись — 1889 годом. Обе даты в источнике предположительны и не означают создание имени именно тогда.',
 'The catalogue dates a possible early personal-name attestation of Pāvels to 1515 and a possible calendar entry to 1889. Both dates retain the source’s qualification; neither establishes when the name was created.',
 'Katalogas galimą ankstyvą Pāvels asmenvardžio paliudijimą datuoja 1515 metais, o galimą kalendoriaus įrašą — 1889 metais. Abiem datoms išlaikoma šaltinio abejonė; jos neįrodo vardo sukūrimo laiko.',
 'Kataloog dateerib Pāvelsi võimaliku varase isikunimekirje 1515. aastasse ning võimaliku kalendrikande 1889. aastasse. Mõlemal säilib allika ettevaatus: need pole nime loomise kuupäevad.'
],1889);
add('Gatis',['https://www.filmas.lv/person/92/'],[
 'Gatis vārdnīcā ir norāde uz Gothards. Tieši Gothards šķirklī dotas senaugšvācu daļas got — «dievs» un hart — «stiprs, drosmīgs». Šis cilmes skaidrojums sasniedz Gatis caur dokumentēto saikni ar garāko formu.',
 'Для Gatis словарь отсылает к Gothards. Именно там приведены древневерхненемецкие got, «бог», и hart, «сильный, храбрый». Этимология относится к Gatis через документированную связь с полной формой.',
 'For Gatis the dictionary points to Gothards. The latter entry gives Old High German got, god, and hart, strong or brave. This origin account reaches Gatis through a documented relationship with the longer form.',
 'Prie Gatis žodynas nukreipia į Gothards. Būtent ten pateikti senosios vokiečių aukštaičių got „dievas“ ir hart „stiprus, drąsus“. Kilmės aiškinimas Gatis pasiekia per dokumentuotą ryšį su ilgesne forma.',
 'Gatise juurest suunab sõnaraamat Gothardsi juurde. Selle kirje osad on vanakõrgsaksa got, jumal, ja hart, tugev või vapper. Seletus seostub Gatisega dokumenteeritud pikema nimekuju kaudu.'
],[
 'Režisors Gatis Šmits 2010. gadā pabeidza pilnmetrāžas spēlfilmu «Seržanta Lapiņa atgriešanās». Kino arhīvs viņu norāda arī kā vienu no četriem filmas «Vogelfrei» (2007) režisoriem un vēsturiskās spēlfilmas «1906» (2019) režisoru.',
 'Режиссёр Гатис Шмитс в 2010 году завершил полнометражную картину «Seržanta Lapiņa atgriešanās». Киноархив также указывает его одним из четырёх режиссёров «Vogelfrei» (2007) и режиссёром исторического фильма «1906» (2019).',
 'Director Gatis Šmits completed the feature Seržanta Lapiņa atgriešanās in 2010. The film archive also credits him as one of four directors of Vogelfrei (2007) and as director of the historical feature 1906 (2019).',
 'Režisierius Gatis Šmits 2010 metais baigė pilnametražį filmą „Seržanta Lapiņa atgriešanās“. Kino archyvas jį taip pat nurodo kaip vieną iš keturių „Vogelfrei“ (2007) režisierių ir istorinio filmo „1906“ (2019) režisierių.',
 'Režissöör Gatis Šmits lõpetas 2010. aastal täispika filmi „Seržanta Lapiņa atgriešanās“. Filmiarhiiv nimetab teda ka üheks „Vogelfrei“ (2007) neljast režissöörist ning ajaloolise filmi „1906“ (2019) lavastajaks.'
]);
add('Sanita',['https://www.literatura.lv/personas/sanita-reinsone'],[
 'Sanita vārdnīcā ievietota pie Sane. Avots piesardzīgi salīdzina arī latīņu sanitas — «veselība», taču šo saikni atzīmē kā iespējamu. Tādēļ «veselība» ir piedāvātais cilmes skaidrojums, nevis vienīgā droši pierādītā nozīme.',
 'Sanita в словаре помещено при Sane. Источник осторожно сравнивает его и с латинским sanitas, «здоровье», отмечая предположительность связи. Поэтому это предложенное объяснение происхождения, а не единственное доказанное значение.',
 'The dictionary places Sanita under Sane. It also tentatively compares Latin sanitas, health, marking the connection as uncertain. Health is therefore a proposed origin account rather than the one securely demonstrated meaning.',
 'Žodyne Sanita pateikiama prie Sane. Šaltinis atsargiai lygina ir lotynų sanitas „sveikata“, ryšį pažymėdamas kaip galimą. Tai siūlomas kilmės aiškinimas, o ne vienintelė patikimai įrodyta reikšmė.',
 'Sõnaraamat paigutab Sanita Sane alla. Võrreldakse ka ladina sanitas’t, tervis, kuid seost märgitakse oletuslikuks. Tervis on seega pakutud päritoluseletus, mitte ainus kindlalt tõestatud tähendus.'
],[
 'Folkloras pētnieces Sanitas Reinsones grāmata «Meža meitas» iznāca 2015. gadā, apkopojot divpadsmit sieviešu dzīvesstāstus. 2018. gadā pēc tās tapa Mārtiņa Eihes izrāde Valmieras drāmas teātrī — dokumentālie stāsti turpināja dzīvi uz skatuves.',
 'Книга исследователя фольклора Саниты Рейнсоне «Meža meitas» вышла в 2015 году и собрала истории жизни двенадцати женщин. В 2018 году Мартиньш Эйхе поставил по ней спектакль в Валмиерском драматическом театре.',
 'Folklore researcher Sanita Reinsone published Meža meitas in 2015, collecting twelve women’s life accounts. In 2018 Mārtiņš Eihe adapted the book for Valmiera Drama Theatre, carrying those documentary voices onto the stage.',
 'Folkloro tyrėjos Sanitos Reinsones knyga „Meža meitas“ pasirodė 2015 metais ir surinko dvylikos moterų gyvenimo pasakojimus. 2018 metais Mārtiņš Eihe pagal ją pastatė spektaklį Valmieros dramos teatre.',
 'Rahvaluuleuurija Sanita Reinsone avaldas 2015. aastal raamatu „Meža meitas“, kuhu kogus kaheteistkümne naise elulood. Mārtiņš Eihe tõi raamatu 2018. aastal Valmiera Draamateatri lavale.'
]);
add('Vera',[],[
 'Vera kopīgais vārdnīcas šķirklis piedāvā vairākas atšķirīgas saiknes: latīņu veras — «patiess», krievu вера — «ticība», vai atsauci uz Veronika. Avots tās neapvieno vienā droši noteiktā izcelsmē.',
 'Общая словарная статья Vera предлагает несколько разных связей: латинское veras, «истинный», русское вера либо отсылку к Veronika. Источник не объединяет их в одно достоверно установленное происхождение.',
 'The shared dictionary entry for Vera offers several distinct connections: Latin veras, true, Russian вера, faith, or a reference to Veronika. It does not combine them into one securely established origin.',
 'Bendras Vera žodyno įrašas siūlo kelis skirtingus ryšius: lotynų veras „tikras“, rusų вера „tikėjimas“ arba nuorodą į Veronika. Šaltinis jų nesujungia į vieną patikimai nustatytą kilmę.',
 'Vera ühine sõnaraamatukirje pakub eri seoseid: ladina veras, tõeline, vene вера, usk, või viide Veronikale. Allikas ei ühenda neid üheks kindlalt määratud algupäraks.'
],[
 'Šī šķirkļa atstāstā norādīta liecība Rēzeknē 1876. gadā un kalendāra ieraksts 1883. gadā. Datējumi raksturo vārda dokumentēšanu Latvijā; tie neizšķir starp iespējamām valodu tradīcijām un nepierāda katras ģimenes vārda izvēles ceļu.',
 'В пересказе этой статьи указаны свидетельство в Резекне в 1876 году и календарная запись 1883 года. Даты описывают документирование имени в Латвии, но не выбирают одну языковую традицию и не объясняют решение каждой семьи.',
 'The entry’s catalogue gives an attestation in Rēzekne in 1876 and a calendar entry in 1883. These document the name’s Latvian history without choosing between the proposed language traditions or explaining every family’s naming decision.',
 'Įrašo atpasakojime pateiktas paliudijimas Rėzeknėje 1876 metais ir kalendoriaus įrašas 1883 metais. Datos apibūdina vardo dokumentavimą Latvijoje, bet nepasirenka vienos kalbinės tradicijos ir nepaaiškina kiekvienos šeimos pasirinkimo.',
 'Kirje kokkuvõte annab kasutusnäite Rēzeknes 1876. aastal ja kalendrikande 1883. aastal. Need kirjeldavad nime dokumenteerimist Lätis, valimata üht keeletraditsiooni ega seletamata iga pere nimevalikut.'
],1883);
add('Alla',[],[
 'Alla nozīme vārdnīcas atstāstā atstāta nezināma. Avots to raksturo kā senu sievietes vārdu, kas lietots kopš 4. gadsimta, un piemin arī iespējamu Aleksandra saikni. Šī norāde pati par sevi nenosaka vienu drošu cilmi.',
 'Значение Alla в пересказе словаря оставлено неизвестным. Источник описывает его как древнее женское имя, употреблявшееся с IV века, и упоминает возможную связь с Aleksandra. Она сама по себе не устанавливает достоверную этимологию.',
 'Alla’s meaning remains unknown in the dictionary catalogue. The source describes an old feminine name used since the fourth century and also mentions a possible connection with Aleksandra. That comparison alone establishes no certain root.',
 'Alla reikšmė žodyno atpasakojime palikta nežinoma. Šaltinis ją apibūdina kaip seną moterišką vardą, vartotą nuo IV amžiaus, ir mini galimą ryšį su Aleksandra. Vien ši nuoroda patikimos etimologijos nenustato.',
 'Alla tähendus jääb sõnaraamatukataloogis teadmata. Allikas kirjeldab vana naisenime, mida kasutati alates 4. sajandist, ning mainib võimalikku seost Aleksandraga. Võrdlus üksi ei tõesta kindlat algupära.'
],[
 'Latvijas kalendāra vēsturei katalogs dod iespējamu 1899. gada ierakstu. Tas ir konkrēts vietējās kalendāra tradīcijas datējums, kas saglabājams ar avota piesardzību. To nevar attiecināt uz vārda rašanos vai senākā nesēja dzimšanas gadu.',
 'Для истории латвийского календаря каталог даёт возможную запись 1899 года. Это конкретная дата местной календарной традиции с сохранённой осторожностью источника. Она не датирует возникновение имени или рождение его первого носителя.',
 'For Latvian calendar history the catalogue suggests an entry in 1899. This is a specific local calendar date with the source’s uncertainty retained. It does not date the origin of the name or the birth of its earliest bearer.',
 'Latvijos kalendoriaus istorijai katalogas siūlo galimą 1899 metų įrašą. Tai konkreti vietinės kalendoriaus tradicijos data su išlaikyta šaltinio abejone. Ji nedatuoja vardo atsiradimo ar pirmosios jo turėtojos gimimo.',
 'Läti kalendriloos pakub kataloog võimalikku kannet 1899. aastast. See on konkreetne kohalik kalendridaatum, mille juures säilib allika ettevaatus. See ei dateeri nime tekkimist ega esimese nimekandja sündi.'
],1899);
add('Vija',['https://www.literatura.lv/personas/vija-beinerte'],[
 'Vija šķirklī minēts latviešu sugasvārds vija — vijums, vīšanās — un vairākas pamazināmās formas. Tas ir vārda leksiskais salīdzinājums. Katalogs personas vārda liecību datē ar 20. gadsimta pirmo ceturksni un kalendāra ierakstu ar 1910. gadu.',
 'Статья Vija приводит латышское нарицательное vija, «виток, извивание», и уменьшительные формы. Это лексическое сравнение. Каталог датирует свидетельство личного имени первой четвертью XX века, календарную запись — 1910 годом.',
 'Vija’s entry compares the Latvian common noun vija, twist or winding, and lists diminutives. This is a lexical comparison. The catalogue dates a personal-name record to the first quarter of the twentieth century and a calendar entry to 1910.',
 'Vija įraše minimas latvių bendrinis žodis vija „vija, vingis“ ir mažybinės formos. Tai leksinis palyginimas. Katalogas asmenvardžio paliudijimą datuoja XX amžiaus pirmuoju ketvirčiu, kalendoriaus įrašą — 1910 metais.',
 'Vija kirje võrdleb läti üldnime vija, keerd või looklemine, ning loetleb hellitusvorme. See on sõnavaraline võrdlus. Isikunimekirje dateeritakse 20. sajandi esimesse veerandisse ja kalendrikande aastaks antakse 1910.'
],[
 'Kinorežisore un esejiste Vija Beinerte 2005. gadā izdeva «Tās dullās Paulīnes dēļ», 2010. gadā — «Klusumā sadzirdēt». Grāmatu virknē 2011. gadā sekoja «Elejas Veronika. Mūžs, kas nepieder sev», parādot arī autores pievēršanos biogrāfiskam stāstam.',
 'Кинорежиссёр и эссеист Вия Бейнерте в 2005 году выпустила «Tās dullās Paulīnes dēļ», в 2010 году — «Klusumā sadzirdēt». В 2011 году последовала книга «Elejas Veronika. Mūžs, kas nepieder sev», обращённая к биографическому повествованию.',
 'Filmmaker and essayist Vija Beinerte published Tās dullās Paulīnes dēļ in 2005 and Klusumā sadzirdēt in 2010. Her books also include Elejas Veronika. Mūžs, kas nepieder sev (2011), extending her writing into a biographical account.',
 'Kino režisierė ir eseistė Vija Beinerte 2005 metais išleido „Tās dullās Paulīnes dēļ“, 2010 metais — „Klusumā sadzirdēt“. 2011 metais pasirodė „Elejas Veronika. Mūžs, kas nepieder sev“, atskleidžianti ir biografinio pasakojimo kryptį.',
 'Filmirežissöör ja esseist Vija Beinerte avaldas „Tās dullās Paulīnes dēļ“ 2005. ja „Klusumā sadzirdēt“ 2010. aastal. 2011 järgnes „Elejas Veronika. Mūžs, kas nepieder sev“, mis lisab tema loomingusse eluloolise jutustuse.'
],1910);
add('Ričards',['https://www.filmas.lv/person/92/'],[
 'Ričards vārdnīcā minēts kā angļu forma pie Rihards. Saimes senaugšvācu daļas ir rīchi — «varens» un hart — «stiprs, drosmīgs». Blakus minētais 1962. gada datējums attiecas uz Ričarda, tāpēc to nedrīkst pārcelt uz šo vīriešu vārdu.',
 'Ričards словарь называет английской формой при Rihards. Древневерхненемецкие элементы семьи — rīchi, «могущественный», и hart, «сильный, храбрый». Соседняя дата 1962 относится к Ričarda и не переносится на это мужское имя.',
 'The dictionary lists Ričards as an English form under Rihards, with Old High German rīchi, powerful, and hart, strong or brave. The nearby 1962 record concerns Ričarda and must not be reassigned to this masculine name.',
 'Žodynas Ričards nurodo kaip anglišką formą prie Rihards, su senosios vokiečių aukštaičių rīchi „galingas“ ir hart „stiprus, drąsus“. Greta pateikta 1962 metų data priklauso Ričarda ir šiam vyriškam vardui neperkeliama.',
 'Sõnaraamat nimetab Ričardsi Rihardsi inglise vormiks, osadega vanakõrgsaksa rīchi, võimas, ning hart, tugev või vapper. Kõrval olev 1962. aasta kirje puudutab Ričardat ega kandu üle sellele mehenimele.'
],[
 'Ričards ir arī Latvijas teātra afišās pazīstams tēla vārds. Gatis Šmits, 1996. gadā absolvējot Kultūras akadēmiju, Dailes teātra Mazajā zālē iestudēja diplomdarbu «Ričards III. Jorku ģimenes pēdējā ziema». Šeit vārds pieder skatuves tēlam.',
 'Ričards — также имя персонажа на латвийской сцене. Заканчивая Академию культуры в 1996 году, Гатис Шмитс поставил дипломную работу «Ričards III. Jorku ģimenes pēdējā ziema» в Малом зале театра Дайлес. Здесь речь о сценическом герое.',
 'Ričards also appears as a Latvian stage character’s name. On graduating from the Academy of Culture in 1996, Gatis Šmits staged his diploma production Ričards III. Jorku ģimenes pēdējā ziema in the Dailes Theatre’s Small Hall.',
 'Ričards žinomas ir kaip Latvijos scenos veikėjo vardas. Baigdamas Kultūros akademiją 1996 metais Gatis Šmits Dailės teatro Mažojoje salėje pastatė diplominį spektaklį „Ričards III. Jorku ģimenes pēdējā ziema“. Čia kalbama apie scenos personažą.',
 'Ričards esineb ka Läti lavategelase nimena. Kultuuriakadeemiat 1996. aastal lõpetades lavastas Gatis Šmits Dailesi teatri väikeses saalis diplomitöö „Ričards III. Jorku ģimenes pēdējā ziema“. Siin kuulub nimi lavakujule.'
]);
