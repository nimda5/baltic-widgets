// LV-only research: a dated record is not a claim about the invention of a name.
export const historiesLatvianR10D={};
const langs=['lv','ru','en','lt','et'];
function add(name,extra,origin,story,year){historiesLatvianR10D[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Mareks',[],[
 'Mareks vārdnīcā minēts pie Markuss kā čehu un poļu forma. Saimes skaidrojumā ir saikne ar Marsu un piesardzīgs latīņu marcus — «āmurs» salīdzinājums. Tie ir dažādi cilmes priekšlikumi, nevis viens neapstrīdams vārda tulkojums.',
 'Mareks словарь приводит при Markuss как чешскую и польскую форму. Для семьи упомянуты связь с Марсом и предположительное сравнение с латинским marcus, «молот». Это разные этимологические версии, а не один бесспорный перевод имени.',
 'The dictionary lists Mareks under Markuss as a Czech and Polish form. Its family account mentions Mars and a tentative comparison with Latin marcus, hammer. These are different etymological proposals rather than one uncontested translation.',
 'Žodynas Mareks pateikia prie Markuss kaip čekų ir lenkų formą. Šeimos aiškinime minimas Marsas ir atsargus palyginimas su lotynų marcus „plaktukas“. Tai skirtingi kilmės siūlymai, o ne vienas neginčijamas vertimas.',
 'Sõnaraamat nimetab Mareksi Markussi juures tšehhi ja poola vormiks. Nimepere seletuses mainitakse Marsi ning oletuslikku võrdlust ladina marcus’ega, haamer. Need on eri päritoluoletused, mitte üks vaieldamatu tõlge.'
],[
 'Iespējamā Mareks personas vārda liecība katalogā datēta ar 20. gadsimta trešo ceturksni. Kalendāra ieraksts norādīts 1972. gadā. Šī vietējā hronoloģija apraksta Mareks formu, nepārvēršot seno romiešu saimes vēsturi par latviešu rakstības datējumu.',
 'Возможное свидетельство Mareks как личного имени каталог относит к третьей четверти XX века; календарную запись — к 1972 году. Эта местная хронология описывает форму Mareks, не превращая историю римской семьи в дату латышского написания.',
 'The catalogue places a possible Mareks personal-name attestation in the third quarter of the twentieth century and its calendar entry in 1972. This local chronology concerns Mareks, without turning Roman family history into a date for the Latvian spelling.',
 'Galimą Mareks asmenvardžio paliudijimą katalogas priskiria XX amžiaus trečiam ketvirčiui, kalendoriaus įrašą — 1972 metams. Vietinė chronologija aprašo Mareks formą, nepaversdama romėniškos šeimos istorijos latviškos rašybos data.',
 'Kataloog paigutab Mareksi võimaliku isikunimekirje 20. sajandi kolmandasse veerandisse ja kalendrikande 1972. aastasse. Kohalik ajalugu puudutab Mareksi vormi, muutmata Rooma nimepere lugu läti kirjapildi daatumiks.'
],1972);
add('Vita',[],[
 'Vita kopīgais vārdnīcas šķirklis dod latīņu vīta — «dzīve» un min vairākas pamazināmās formas. Šeit «dzīve» ir latīņu pamatvārda skaidrojums, kas palīdz saprast personvārda valodisko saikni; atsevišķs izvērsts vārda tulkojums nav dots.',
 'Общая статья Vita приводит латинское vīta, «жизнь», и несколько уменьшительных форм. «Жизнь» здесь — объяснение латинского слова, помогающее понять языковую связь личного имени; отдельного развёрнутого перевода имени не дано.',
 'The shared dictionary entry for Vita gives Latin vīta, life, and lists several diminutives. Life is the Latin word’s gloss, explaining the personal name’s linguistic connection; the entry does not supply a separate expanded translation of the name.',
 'Bendras Vita žodyno įrašas pateikia lotynų vīta „gyvenimas“ ir kelias mažybines formas. „Gyvenimas“ čia yra lotyniško žodžio paaiškinimas, rodantis asmenvardžio kalbinį ryšį; atskiro išplėsto vardo vertimo nepateikiama.',
 'Vita ühine sõnaraamatukirje annab ladina vīta, elu, ja mitu hellitusvormi. Elu on ladina sõna seletus, mis näitab isikunime keelelist seost; eraldi laiendatud nime tõlget kirje ei paku.'
],[
 'Katalogs kalendāra ierakstu datē ar 1864. gadu, bet personas vārda liecību ar 20. gadsimta pirmo ceturksni. Kalendāra datējums šeit ir agrāks par norādīto personvārda pierakstu. Tie ir divi avotu veidi, nevis savstarpēji aizvietojami pirmās lietošanas datumi.',
 'Календарную запись каталог датирует 1864 годом, свидетельство личного имени — первой четвертью XX века. Здесь календарная дата раньше приведённой личной записи. Это два вида источников, а не взаимозаменяемые даты первого употребления.',
 'The catalogue dates the calendar entry to 1864 and a personal-name attestation to the first quarter of the twentieth century. The calendar date is earlier than the listed personal record. They are different source types, not interchangeable first-use dates.',
 'Kalendoriaus įrašą katalogas datuoja 1864 metais, asmenvardžio paliudijimą — XX amžiaus pirmuoju ketvirčiu. Kalendoriaus data ankstesnė už pateiktą asmens įrašą. Tai skirtingi šaltinių tipai, o ne sukeičiamieji pirmo vartojimo metai.',
 'Kataloog dateerib kalendrikande 1864. aastasse ja isikunimekirje 20. sajandi esimesse veerandisse. Kalendridaatum eelneb siin antud isikukirjele. Need on eri allikaliigid, mitte vahetatavad esmakasutuse kuupäevad.'
],1864);
add('Kristers',['https://www.izpetnieks.lv/en/name/Kristi%C4%81ns'],[
 'Kristers vārdnīcā tieši norādīts kā Kristiāns forma un saistīts ar latīņu christiānus — «kristietis». Tas nav tas pats cilmes skaidrojums, ko dod Kristaps: līdzīgais vārdu sākums pats par sevi nepadara abas saimes vienādas.',
 'Kristers в словаре прямо указан как форма Kristiāns и связан с латинским christiānus, «христианин». Это не та этимология, что у Kristaps: сходное начало имён само по себе не делает две семьи одинаковыми.',
 'The dictionary explicitly lists Kristers as a form of Kristiāns and connects it with Latin christiānus, Christian. This differs from the origin account of Kristaps: a similar opening does not make the two name families identical.',
 'Žodynas Kristers tiesiogiai nurodo kaip Kristiāns formą ir sieja su lotynų christiānus „krikščionis“. Tai skiriasi nuo Kristaps kilmės: panaši pradžia savaime nesutapatina dviejų vardų šeimų.',
 'Sõnaraamat nimetab Kristersi sõnaselgelt Kristiānsi vormiks ja seob ladina christiānus’ega, kristlane. See erineb Kristapsi päritoluseletusest: sarnane algus ei tee kahest nimeperest ühte.'
],[
 'Kristers formai katalogs dod 1638. gada liecību Vecpiebalgā. Atsevišķajā Kristiāns šķirklī ir 1582. gada liecība un 1767. gada kalendāra ieraksts. Šīs garākās formas datumi paliek pie Kristiāns, nevis kļūst par agrākiem Kristers pierakstiem.',
 'Для формы Kristers каталог даёт свидетельство 1638 года в Вецпиебалге. В отдельной статье Kristiāns указаны 1582 год и календарная запись 1767 года. Даты полной формы остаются при Kristiāns и не становятся ранними записями Kristers.',
 'For Kristers the catalogue gives a 1638 attestation in Vecpiebalga. The separate Kristiāns entry records 1582 and a calendar entry in 1767. Those longer-form dates remain attached to Kristiāns instead of becoming earlier records of Kristers.',
 'Kristers formai katalogas pateikia 1638 metų paliudijimą Vecpiebalgoje. Atskiras Kristiāns įrašas nurodo 1582 metus ir 1767 metų kalendorių. Ilgesnės formos datos lieka prie Kristiāns ir netampa ankstesniais Kristers įrašais.',
 'Kristersi vormile annab kataloog kasutusnäite Vecpiebalgas 1638. aastast. Eraldi Kristiānsi kirjes on 1582 ja kalendriaasta 1767. Pikema vormi daatumid jäävad Kristiānsi juurde ega muutu Kristersi varasemateks kirjeteks.'
]);
add('Vjačeslavs',['https://www.saeima.lv/lv/sasaukumi/12-saeima/deputati/12-vjaceslavs-dombrovskis/'],[
 'Vjačeslavs skaidrots ar senkrievu daļām vjače — «vairāk» un slava — «slava». Vārdnīca dod šo daļu nozīmes, nevis atsevišķu izvērstu personvārda tulkojumu. Tās kopā raksturo salikta slāvu vārda vēsturisko uzbūvi.',
 'Vjačeslavs объясняется через древнерусские элементы вяче, «больше», и слава. Словарь даёт значения частей, а не отдельный развёрнутый перевод личного имени. Вместе они описывают историческое строение сложного славянского имени.',
 'Vjačeslavs is explained through Old Russian vjače, more, and slava, glory. The dictionary supplies these element meanings rather than a separate expanded translation of the whole personal name. They describe a historical Slavic compound.',
 'Vjačeslavs aiškinamas senosios rusų kalbos dėmenimis vjače „daugiau“ ir slava „šlovė“. Žodynas pateikia dalių reikšmes, o ne atskirą išplėstą viso asmenvardžio vertimą. Jos apibūdina istorinį slavišką dūrinį.',
 'Vjačeslavsi seletatakse vanavene osadega vjače, rohkem, ja slava, kuulsus. Sõnaraamat annab osade tähendused, mitte eraldi laiendatud terviknime tõlke. Need kirjeldavad ajaloolist slaavi liitnime.'
],[
 'Saeimas arhīvs dokumentē Vjačeslava Dombrovska darbu 12. Saeimā no 2014. gada 5. novembra līdz 2015. gada 30. aprīlim. Tajā pašā laikā viņš darbojās Budžeta un finanšu komisijā, bet no decembra vadīja Nodokļu politikas apakškomisiju.',
 'Архив Сейма документирует работу Вячеслава Домбровского в XII Сейме с 5 ноября 2014 года по 30 апреля 2015 года. Он входил в Бюджетно-финансовую комиссию, а с декабря возглавлял подкомиссию налоговой политики.',
 'The parliamentary archive records Vjačeslavs Dombrovskis in the twelfth Saeima from 5 November 2014 to 30 April 2015. He served on its Budget and Finance Committee and chaired the Tax Policy Subcommittee from December.',
 'Parlamento archyvas dokumentuoja Vjačeslavo Dombrovskio darbą dvyliktoje Saeimoje nuo 2014 metų lapkričio 5 dienos iki 2015 metų balandžio 30 dienos. Jis dirbo Biudžeto ir finansų komisijoje, nuo gruodžio vadovavo Mokesčių politikos pakomisei.',
 'Parlamendiarhiiv dokumenteerib Vjačeslavs Dombrovskise tööd 12. Saeimas 5. novembrist 2014 kuni 30. aprillini 2015. Ta kuulus eelarve- ja rahanduskomisjoni ning juhtis detsembrist maksupoliitika alamkomisjoni.'
]);
add('Raivis',[],[
 'Raivis vārdnīcā ievietots pie Raivo, kas raksturots kā igauņu personvārds vai neskaidras cilmes vārds. Saikne ar šo formu ir norādīta, bet tā neatrisina saknes nozīmi. Tādēļ noteikts latviešu vai igauņu vārda tulkojums netiek piedāvāts.',
 'Raivis словарь помещает при Raivo, описанном как эстонское имя либо имя неясного происхождения. Связь с формой указана, но она не решает значение корня. Поэтому определённый перевод с латышского или эстонского не предлагается.',
 'The dictionary places Raivis under Raivo, described as an Estonian personal name or a name of unclear origin. The recorded relationship does not settle the root’s meaning, so no definite Latvian or Estonian translation is supplied.',
 'Žodynas Raivis pateikia prie Raivo, apibūdinto kaip estiškas arba neaiškios kilmės asmenvardis. Nurodytas ryšys šaknies reikšmės nenustato, todėl tikslus latviškas ar estiškas vertimas nesiūlomas.',
 'Sõnaraamat paigutab Raivise Raivo alla, mida kirjeldatakse eesti isikunimena või ebaselge päritoluga nimena. Märgitud seos ei lahenda juure tähendust, seega kindlat läti- ega eestikeelset tõlget ei anta.'
],[
 'Raivis personas vārda liecība katalogā ir no 1966. gada; kalendāra ieraksts datēts ar 1972. gadu. Šie divi vietējie datējumi attiecas tieši uz Raivis, nevis tiek aizgūti no igauņu Raivo kalendāra vai tā senākiem nesējiem.',
 'Свидетельство Raivis как личного имени в каталоге относится к 1966 году, календарная запись — к 1972 году. Эти две местные даты относятся именно к Raivis и не заимствуются из эстонского календаря Raivo или истории его носителей.',
 'The catalogue gives a Raivis personal-name record in 1966 and a calendar entry in 1972. These two local dates concern Raivis itself; they are not borrowed from an Estonian Raivo calendar or from its earlier bearers.',
 'Raivis asmenvardžio paliudijimas kataloge yra iš 1966 metų, kalendoriaus įrašas datuojamas 1972 metais. Šios vietinės datos priklauso būtent Raivis, o ne perimtos iš estiško Raivo kalendoriaus ar jo ankstesnių turėtojų.',
 'Kataloog annab Raivise isikunimekirje 1966. ja kalendrikande 1972. aastast. Need kohalikud daatumid puudutavad Raivist ennast ega ole laenatud Eesti Raivo kalendrist või varasematelt nimekandjatelt.'
],1972);
add('Elza',[],[
 'Elza vārdnīcā saistīta ar Elizabete. Ebreju ēlīšeba skaidrojumam Elizabete šķirklī dotas vairākas iespējas, viena no tām — «Dievs ir mans zvērests». Tādēļ šis ir saimes tradicionāls skaidrojums līdzās citām avotā minētajām versijām.',
 'Elza словарь связывает с Elizabete. Для еврейского ēlīšeba в статье Elizabete даны разные объяснения, одно из них — «Бог — моя клятва». Это традиционное толкование семьи наряду с другими версиями источника.',
 'The dictionary connects Elza with Elizabete. The latter entry offers several explanations of Hebrew ēlīšeba, including God is my oath. This is a traditional account of the family alongside other interpretations retained by the source.',
 'Žodynas Elza sieja su Elizabete. Pastarosios įraše hebrajų ēlīšeba aiškinamas keliomis versijomis, tarp jų „Dievas yra mano priesaika“. Tai tradicinis šeimos aiškinimas greta kitų šaltinio išlaikytų interpretacijų.',
 'Sõnaraamat seob Elza Elizabetega. Selle kirjes antakse heebrea ēlīšeba seletuseks mitu võimalust, sealhulgas Jumal on mu vanne. See on nimepere traditsiooniline seletus teiste allikas säilitatud tõlgenduste kõrval.'
],[
 'Katalogs Elza pierakstu datē ar 1506. gadu, bet kalendāra ierakstu — ar 1892. gadu. Šī atšķirība atgādina, ka personvārda dokumentēšana un tā vieta kalendārā nav viens notikums. Tieši Elza datējumi paliek nodalīti no garākās Elizabete formas.',
 'Запись Elza каталог датирует 1506 годом, календарное включение — 1892 годом. Документирование личного имени и его место в календаре — разные события. Даты Elza сохраняются отдельно от истории полной формы Elizabete.',
 'The catalogue dates an Elza record to 1506 and a calendar entry to 1892. Recording a personal name and giving it a calendar place are different events. The dates for Elza remain distinct from the history of the longer Elizabete form.',
 'Elza įrašą katalogas datuoja 1506 metais, kalendoriaus įrašą — 1892 metais. Asmenvardžio dokumentavimas ir jo vieta kalendoriuje yra skirtingi įvykiai. Elza datos atskiriamos nuo ilgesnės Elizabete formos istorijos.',
 'Kataloog dateerib Elza kirje 1506. ja kalendrikande 1892. aastasse. Isikunime dokumenteerimine ja selle kalendrikoht on eri sündmused. Elza daatumid jäävad pikema Elizabete vormi ajaloost eraldi.'
],1892);
add('Amanda',['https://www.behindthename.com/name/amanda'],[
 'Amanda saistīta ar latīņu amanda — «mīlama, mīlestības cienīga» un Amandus sieviešu formu. Vārdu ceļvedis norāda, ka 17. gadsimta autori to radīja no jauna, tieši balstoties latīņu vārdā. Tas nošķir vārda valodisko pamatu no vēlākas literārās lietošanas.',
 'Amanda связано с латинским amanda, «достойная любви», и женской формой Amandus. Справочник отмечает, что авторы XVII века создали имя заново непосредственно от латинского слова. Языковая основа отделяется от позднего литературного употребления.',
 'Amanda is linked with Latin amanda, lovable or worthy of love, and the feminine of Amandus. The name guide says seventeenth-century writers recreated it directly from the Latin word, distinguishing its linguistic basis from its later literary use.',
 'Amanda siejama su lotynų amanda „mylėtina, verta meilės“ ir moteriška Amandus forma. Vardų vadovas nurodo, kad XVII amžiaus autoriai vardą atkūrė tiesiogiai iš lotyniško žodžio, skirdamas kalbinį pagrindą ir vėlesnę literatūrinę vartoseną.',
 'Amanda seostub ladina amanda’ga, armastusväärne, ning Amanduse naissoost vastega. Nimejuhendi järgi lõid 17. sajandi autorid selle uuesti otse ladina sõnast, eristades keelelist alust hilisemast kirjanduskasutusest.'
],[
 'Dramaturgs Kolijs Sibers Amanda vārdā nosauca tēlu lugā «Love’s Last Shift» (1696). Latvijas katalogā savukārt norādīta 1893. gada personas vārda liecība un 1767. gada kalendāra ieraksts. Angļu skatuves piemērs nav šo Latvijas datējumu aizstājējs.',
 'Драматург Колли Сиббер дал имя Amanda героине «Love’s Last Shift» (1696). Латвийский каталог отдельно указывает личную запись 1893 года и календарную запись 1767 года. Английский сценический пример не заменяет эти местные даты.',
 'Playwright Colley Cibber named a character Amanda in Love’s Last Shift (1696). Separately, the Latvian catalogue gives a personal-name record in 1893 and a calendar entry in 1767. The English stage example does not replace those Latvian dates.',
 'Dramaturgas Colley Cibber pavadino veikėją Amanda pjesėje „Love’s Last Shift“ (1696). Atskirai Latvijos katalogas pateikia asmenvardžio įrašą 1893 metais ir kalendoriaus įrašą 1767 metais. Angliškas scenos pavyzdys nepakeičia vietinių datų.',
 'Näitekirjanik Colley Cibber nimetas tegelase Amandaks teoses „Love’s Last Shift“ (1696). Eraldi annab Läti kataloog isikunimekirje 1893. ja kalendrikande 1767. aastast. Inglise lavanäide ei asenda neid kohalikke daatumeid.'
],1767);
add('Lauris',[],[
 'Lauris ir Laurentijs forma. Latīņu Laurentius sākotnēji skaidrots kā «vīrs no Laurentumas»; saikne ar lauru vainagu ir vēlāka. Šīs abas nozīmes kārtas vārdnīca nošķir, tādēļ vietvārda cilme nepazūd aiz pazīstamā auga tēla.',
 'Lauris — форма Laurentijs. Латинское Laurentius первоначально объясняется как «человек из Лаврента», а связь с лавровым венком возникла позднее. Словарь различает два смысловых слоя, сохраняя топонимическое происхождение рядом с образом растения.',
 'Lauris is a form of Laurentijs. Latin Laurentius originally meant a man from Laurentum; association with the laurel wreath came later. The dictionary distinguishes these layers, preserving the place-name origin beside the familiar plant image.',
 'Lauris yra Laurentijs forma. Lotynų Laurentius pradžioje reiškė „vyrą iš Laurentumo“, o ryšys su laurų vainiku atsirado vėliau. Žodynas skiria šiuos sluoksnius ir išlaiko vietovardinę kilmę greta pažįstamo augalo vaizdinio.',
 'Lauris on Laurentijsi vorm. Ladina Laurentius tähendas algselt meest Laurentumist; seos loorberipärjaga tuli hiljem. Sõnaraamat eristab neid kihte, säilitades kohanimelise päritolu tuttava taimekujundi kõrval.'
],[
 'Latvijas lietojuma katalogā Lauris personas vārda liecība norādīta Smiltenē 1638. gadā; kalendāra ieraksts — 1884. gadā. Tas dod konkrētu vietu un gadu vienai liecībai, neapgalvojot, ka tur vai tad vārds ticis radīts.',
 'В каталоге латвийского употребления Lauris отмечено как личное имя в Смилтене в 1638 году; календарная запись датирована 1884 годом. Место и год описывают конкретное свидетельство, а не создание имени именно там или тогда.',
 'The Latvian usage catalogue records Lauris as a personal name in Smiltene in 1638 and gives a calendar entry in 1884. This supplies a place and year for one attestation without claiming the name was created there or then.',
 'Latvijos vartosenos katalogas Lauris asmenvardį nurodo Smiltenėje 1638 metais, kalendoriaus įrašą — 1884 metais. Vieta ir metai aprašo vieną konkretų paliudijimą, neteigdami, kad vardas būtent ten ar tada sukurtas.',
 'Läti kasutuskataloog annab Laurise isikunimekirje Smiltenes 1638. aastast ja kalendrikande 1884. aastast. Koht ja aasta dateerivad üht konkreetset tõendit, väitmata, et nimi loodi just seal või siis.'
],1884);
add('Evita',['https://www.literatura.lv/personas/evita-hofmane'],[
 'Evita vārdnīcā tieši ievietota pie Eva. Šī norāde dokumentē vārdu saimi, taču pati nedod atsevišķu Evita pirmās lietošanas datumu. Ar Eva saistītus datējumus tāpēc nedrīkst bez papildu liecības pārdēvēt par Evita datumiem.',
 'Evita в словаре прямо помещено при Eva. Отсылка документирует семью имён, но сама не даёт отдельной даты первого употребления Evita. Даты, связанные с Eva, нельзя без дополнительного свидетельства объявлять датами Evita.',
 'The dictionary explicitly places Evita under Eva. This documents a name-family relationship but supplies no separate first-use date for Evita. Dates attached to Eva cannot therefore be relabelled as Evita dates without further evidence.',
 'Žodynas Evita tiesiogiai pateikia prie Eva. Nuoroda dokumentuoja vardų šeimą, bet neduoda atskiros pirmojo Evita vartojimo datos. Todėl Eva datų be papildomo liudijimo negalima pervadinti Evita datomis.',
 'Sõnaraamat paigutab Evita otseselt Eva alla. See dokumenteerib nimepere seose, andmata Evitale eraldi esmakasutuse daatumit. Eva külge kuuluvaid daatumeid ei saa lisatõendita Evita omaks nimetada.'
],[
 'Evita Hofmane 2024. gadā ar stāstu «Paslēpes» bija pirmo «Vidzemes Prozas lasījumu» laureāte. Literatūras datubāze viņu dokumentē kā literāti un žurnālisti, arī Iļģuciema filiālbibliotēkas vadītāju — konkrētu šī vārda nesēju Latvijas kultūras darbā.',
 'Эвита Хофмане в 2024 году с рассказом «Paslēpes» стала лауреатом первых «Vidzemes Prozas lasījumu». Литературная база описывает её как автора и журналиста, также руководителя библиотеки Ильгюциемса — конкретную носительницу имени в культуре Латвии.',
 'Evita Hofmane won recognition at the first Vidzemes Prozas lasījumi in 2024 with her story Paslēpes. The literary database documents her as a writer and journalist and as head of the Iļģuciems branch library, a specific bearer in Latvian cultural work.',
 'Evita Hofmane 2024 metais su apsakymu „Paslēpes“ tapo pirmųjų „Vidzemes Prozas lasījumu“ laureate. Literatūros bazė ją dokumentuoja kaip rašytoją, žurnalistę ir Iļģuciemso bibliotekos vadovę — konkrečią vardo turėtoją Latvijos kultūroje.',
 'Evita Hofmane pälvis 2024. aastal esimese Vidzemes Prozas lasījumi tunnustuse jutuga „Paslēpes“. Kirjandusandmebaas dokumenteerib teda kirjaniku, ajakirjaniku ja Iļģuciemsi haruraamatukogu juhina, konkreetse nimekandjana Läti kultuuritöös.'
]);
add('Gunārs',['https://www.literatura.lv/personas/gunars-priede'],[
 'Gunārs vārdnīcā saistīts ar Ginter un Guntrams, kuru cilmes skaidrojumi atšķiras. Vienā saimē ir kara un spēka jēdzieni, otrā senaugšvācu gunt — «kauja» un hraban — «krauklis». Viena droši izvēlēta Gunārs sakņu kombinācija nav noteikta.',
 'Gunārs словарь связывает с Ginter и Guntrams, чьи этимологии различаются. В одной семье — понятия войны и силы, в другой древневерхненемецкие gunt, «битва», и hraban, «ворон». Единственное достоверное сочетание корней для Gunārs не установлено.',
 'The dictionary connects Gunārs with Ginter and Guntrams, whose origin accounts differ. One family involves war and strength, the other Old High German gunt, battle, and hraban, raven. It selects no single secure root combination for Gunārs.',
 'Žodynas Gunārs sieja su Ginter ir Guntrams, kurių etimologijos skiriasi. Vienoje šeimoje yra karo ir jėgos sąvokos, kitoje senosios vokiečių aukštaičių gunt „mūšis“ ir hraban „varnas“. Vienas patikimas Gunārs šaknų derinys nenustatytas.',
 'Sõnaraamat seob Gunārsi Ginteri ja Guntramsiga, mille päritoluseletused erinevad. Ühes on sõja ja jõu mõisted, teises vanakõrgsaksa gunt, lahing, ja hraban, ronk. Üht kindlat Gunārsi juurekombinatsiooni ei valita.'
],[
 'Gunāra Priedes pirmā publicētā luga «Jaunākā brāļa vasara» parādījās žurnālā «Karogs» 1955. gadā un tajā pašā gadā tika iestudēta Dailes teātrī. Viņš rakstīja arī 1967. gada filmas «Elpojiet dziļi...» scenāriju; filma publiski izrādīta 1986. gadā.',
 'Первая опубликованная пьеса Гунара Приеде «Jaunākā brāļa vasara» появилась в «Karogs» в 1955 году и тогда же была поставлена в Дайлес. Он написал и сценарий фильма «Elpojiet dziļi...» 1967 года, публично показанного в 1986 году.',
 'Gunārs Priede’s first published play, Jaunākā brāļa vasara, appeared in Karogs in 1955 and was staged at the Dailes Theatre that year. He also wrote the screenplay for Elpojiet dziļi... (1967), publicly screened in 1986.',
 'Pirmoji paskelbta Gunāro Priedes pjesė „Jaunākā brāļa vasara“ pasirodė „Karogs“ 1955 metais ir tais pačiais metais pastatyta Dailės teatre. Jis parašė ir 1967 metų filmo „Elpojiet dziļi...“, viešai parodyto 1986 metais, scenarijų.',
 'Gunārs Priede esimene avaldatud näidend „Jaunākā brāļa vasara“ ilmus Karogsis 1955 ning lavastati samal aastal Dailesi teatris. Ta kirjutas ka filmi „Elpojiet dziļi...“ (1967) stsenaariumi; avalik linastus tuli 1986.'
]);
