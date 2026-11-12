// Exact Latvian forms: dates belong only to the entry that supplies them.
export const historiesLatvianR18={};
const langs=['lv','ru','en','lt','et'],catalog=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
function add(name,origin,story,year,extra=[]){historiesLatvianR18[name]={sources:[catalog(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Doloresa',[
 'Doloresa saistīta ar latīņu dolor, «sāpes, bēdas». Starptautiskajā vārdu saimē spāņu Dolores ir daudzskaitlis ar nozīmi «bēdas» un saistās ar Marijas apzīmējumu Nuestra Señora de los Dolores. Tas izskaidro reliģisko vārda tradīciju, nenosakot vienīgo ceļu uz Latviju.',
 'Doloresa связано с латинским dolor, «боль, скорбь». В международной семье имён испанское Dolores означает «скорби» во множественном числе и связано с обращением к Марии Nuestra Señora de los Dolores. Это объясняет религиозную традицию имени, не устанавливая единственного пути в Латвию.',
 'Doloresa is connected with Latin dolor, pain or sorrow. In the international name family, Spanish Dolores is the plural meaning sorrows and belongs to the Marian title Nuestra Señora de los Dolores. This explains the religious naming tradition without establishing a single route into Latvia.',
 'Doloresa siejama su lotynų dolor „skausmas, sielvartas“. Tarptautinėje vardų šeimoje ispanų Dolores yra daugiskaita „sielvartai“, susijusi su Marijos titulu Nuestra Señora de los Dolores. Tai paaiškina religinę vardų tradiciją, nenustatant vienintelio kelio į Latviją.',
 'Doloresa on seotud ladina sõnaga dolor, valu või kurbus. Rahvusvahelises nimeperes tähendab hispaania mitmusevorm Dolores kurbusi ning kuulub Maarja tiitlisse Nuestra Señora de los Dolores. See selgitab usulist nimetraditsiooni, määramata ühtainsat teed Lätti.'
],[
 'Klāva Siliņa vārdnīcā Doloresa personvārda liecība datēta ar 1930. gadu, bet iekļaušana kalendārā — ar 1964. gadu. Tās ir divas atsevišķas ziņas: dokumentēts lietojums un vēlākā vieta kalendārā, nevis vārda radīšanas datums.',
 'В словаре Клава Силиньша свидетельство личного имени Doloresa датировано 1930 годом, а включение в календарь — 1964 годом. Это две отдельные записи: документированное употребление и более позднее место в календаре, а не дата создания имени.',
 'Klāvs Siliņš’s dictionary dates a personal-name record of Doloresa to 1930 and calendar inclusion to 1964. These are separate records of use and later calendar membership, rather than a date when the name was invented.',
 'Klāvo Siliņšo žodyne Doloresa asmenvardžio liudijimas datuojamas 1930 metais, įtraukimas į kalendorių — 1964 metais. Tai atskiros vartojimo ir vėlesnės kalendoriaus vietos žinios, o ne vardo sukūrimo data.',
 'Klāvs Siliņši sõnaraamat dateerib Doloresa isikunimekirje 1930. aastasse ja kalendrisse võtmise 1964. aastasse. Need on eri andmed kasutuse ja hilisema kalendrikoha kohta, mitte nime loomise kuupäev.'
],1964,['https://www.behindthename.com/name/dolores']);
add('Brīva',[
 'Brīva ir latviešu vārds, kura veidojumu Siliņa vārdnīca saista ar brīvs un brīvība. Tā pamats ir brīvības jēdziens latviešu valodā. Šis skaidrojums attiecas tieši uz Brīva; līdzīgi rakstītām formām sava vēsture vēl jāpārbauda.',
 'Brīva — латышское имя, образование которого словарь Силиньша связывает с brīvs «свободный» и brīvība «свобода». Его основа — понятие свободы в латышском языке. Объяснение относится именно к Brīva; историю похожих написаний ещё нужно проверять отдельно.',
 'Brīva is a Latvian name that Siliņš’s dictionary connects with brīvs, free, and brīvība, freedom. Its basis is the Latvian concept of freedom. This explanation applies specifically to Brīva; similar spellings still require their own historical evidence.',
 'Brīva yra latviškas vardas, kurio darybą Siliņšo žodynas sieja su brīvs „laisvas“ ir brīvība „laisvė“. Jo pagrindas — laisvės sąvoka latvių kalboje. Šis aiškinimas skirtas būtent Brīva; panašių rašybų istoriją dar reikia patikrinti atskirai.',
 'Brīva on läti nimi, mille Siliņši sõnaraamat seob sõnadega brīvs, vaba, ja brīvība, vabadus. Aluseks on läti keele vabaduse mõiste. See seletus käib täpselt Brīva kohta; sarnased kirjapildid vajavad eraldi ajaloolisi tõendeid.'
],[
 'Vārdnīca Brīva kalendāra ierakstu datē ar 1908. gadu, bet personvārda liecību — ar 1931. gadu. Kalendāra piedāvājums tātad šajā avotā ir agrāks par norādīto lietojuma piemēru. Tas nenozīmē, ka pirms 1931. gada vārdu neviens nav lietojis.',
 'Словарь датирует календарную запись Brīva 1908 годом, а свидетельство личного имени — 1931 годом. Календарное предложение в этом источнике предшествует указанному примеру употребления. Это не означает, что до 1931 года имя никто не носил.',
 'The dictionary dates Brīva’s calendar entry to 1908 and its personal-name record to 1931. The calendar proposal therefore precedes the cited example of use in this source. That does not mean nobody used the name before 1931.',
 'Žodynas Brīva kalendoriaus įrašą datuoja 1908 metais, asmenvardžio liudijimą — 1931 metais. Taigi šiame šaltinyje kalendoriaus pasiūlymas ankstesnis už nurodytą vartojimo pavyzdį. Tai nereiškia, kad iki 1931 metų vardo niekas neturėjo.',
 'Sõnaraamat dateerib Brīva kalendrikirje 1908. aastasse ja isikunimekirje 1931. aastasse. Selles allikas eelneb kalendrisse pakkumine toodud kasutusnäitele. Sellest ei järeldu, et enne 1931. aastat nime keegi ei kasutanud.'
],1908);
const gift=[
 'Vārdu {name} Siliņa vārdnīca ievieto angļu Dolly un Doroteja saimē. Šīs saimes pamatā ir grieķu dōron, «dāvana», un theos, «dievs». Tādēļ īsās formas nozīmi skaidro pilnā vārda vēsture; līdzība ar Doloresa pati par sevi nenosaka citu cilmi.',
 'Имя {name} словарь Силиньша помещает в английскую семью Dolly и Doroteja. Её основа — греческие dōron «дар» и theos «бог». Значение краткой формы объясняется историей полного имени; сходство с Doloresa само по себе не устанавливает другое происхождение.',
 'Siliņš’s dictionary places {name} in the English Dolly and Doroteja family. Its basis is Greek dōron, gift, and theos, god. The short form is thus explained through the history of the full name; resemblance to Doloresa alone does not establish another origin.',
 'Siliņšo žodynas {name} pateikia anglų Dolly ir Doroteja šeimoje. Jos pagrindas — graikų dōron „dovana“ ir theos „dievas“. Trumposios formos reikšmę paaiškina pilnojo vardo istorija; panašumas į Doloresa savaime nenustato kitos kilmės.',
 'Siliņši sõnaraamat paigutab {name} inglise Dolly ja Doroteja nimeperre. Aluseks on kreeka dōron, kingitus, ja theos, jumal. Lühivormi seletab seega pika nime ajalugu; sarnasus Doloresaga ei tõesta iseenesest teistsugust päritolu.'
];
add('Dolita',gift.map(s=>s.replaceAll('{name}','Dolita')),[
 'Dolita lietojuma piemēru vārdnīca attiecina uz 20. gadsimta trešo ceturksni Alūksnē. Tā ir vietai un laikposmam piesaistīta liecība, kas parāda šīs formas dzīvi Latvijā. Avots nenorāda precīzu rašanās gadu vai atsevišķu iekļaušanas gadu kalendārā.',
 'Пример употребления Dolita словарь относит к третьей четверти XX века в Алуксне. Это свидетельство с конкретным местом и периодом, показывающее жизнь формы в Латвии. Точного года возникновения или отдельного года включения в календарь источник не указывает.',
 'The dictionary places an example of Dolita in Alūksne in the third quarter of the twentieth century. This geographically and chronologically located record shows the form in Latvian use. The source does not give a precise creation year or a separate year of calendar inclusion.',
 'Dolita vartojimo pavyzdį žodynas priskiria trečiajam XX amžiaus ketvirčiui Alūksnėje. Tai vieta ir laikotarpiu apibrėžtas liudijimas apie šios formos vartojimą Latvijoje. Tikslių atsiradimo ar atskiro įtraukimo į kalendorių metų šaltinis nenurodo.',
 'Sõnaraamat paigutab Dolita kasutusnäite Alūksnesse 20. sajandi kolmandasse veerandisse. Koha ja ajavahemikuga seotud kirje näitab selle kuju kasutamist Lätis. Allikas ei anna täpset loomisaastat ega eraldi kalendrisse võtmise aastat.'
],null,['https://www.behindthename.com/name/dolly']);
add('Dollija',gift.map(s=>s.replaceAll('{name}','Dollija')),[
 'Dollija precīzās formas liecība Siliņa vārdnīcā datēta ar 1923. gadu. Angļu Dolly vēsture rāda īsformas tradīciju, bet 1923. gada ieraksts attiecas uz latvisko Dollija. Vārdnīcas norādītais gads nav ne angļu īsformas radīšanas, ne kalendāra ieraksta datums.',
 'Свидетельство точной формы Dollija в словаре Силиньша датировано 1923 годом. История английского Dolly показывает традицию краткой формы, а запись 1923 года относится к латышскому Dollija. Это не дата создания английской формы и не дата включения в календарь.',
 'Siliņš’s dictionary dates a record of the exact form Dollija to 1923. English Dolly supplies the short-form tradition, while the 1923 record belongs to Latvian Dollija. The cited year dates neither the creation of the English form nor entry into a name-day calendar.',
 'Tikslioji Dollija forma Siliņšo žodyne paliudyta 1923 metais. Anglų Dolly istorija rodo trumpinio tradiciją, o 1923 metų įrašas skirtas latviškajai Dollija. Nurodyti metai nėra nei angliškosios formos sukūrimo, nei įtraukimo į kalendorių data.',
 'Siliņši sõnaraamat dateerib täpse kuju Dollija kirje 1923. aastasse. Inglise Dolly näitab lühivormitraditsiooni, kuid 1923. aasta kirje käib läti Dollija kohta. See ei ole inglise kuju loomise ega nimekalendrisse võtmise aasta.'
],null,['https://www.behindthename.com/name/dolly']);
add('Laisve',[
 'Laisve Siliņa vārdnīcā saistīts ar lietuviešu laisvė, «brīvība». Vārda pamatā tādējādi ir kaimiņu valodas abstrakts jēdziens. Latviešu personvārda rakstībā ir Laisve; lietuviešu vārda galotnes ė nevajag automātiski pārcelt uz šo formu.',
 'Laisve в словаре Силиньша связано с литовским laisvė «свобода». Основой имени служит абстрактное понятие соседнего языка. Латышское личное имя записано как Laisve; окончание ė литовского слова не следует автоматически переносить в эту форму.',
 'Siliņš’s dictionary connects Laisve with Lithuanian laisvė, freedom. The name thus draws on an abstract concept in a neighbouring language. The Latvian personal-name spelling is Laisve; the Lithuanian word’s final ė should not automatically be substituted into this form.',
 'Siliņšo žodynas Laisve sieja su lietuvių laisvė. Vardo pagrindas — abstrakti kaimynų kalbos sąvoka. Latviškasis asmenvardis užrašytas Laisve; lietuviško bendrinio žodžio galūnės ė nereikia automatiškai perkelti į šią formą.',
 'Siliņši sõnaraamat seob Laisve leedu sõnaga laisvė, vabadus. Nime aluseks on seega naaberkeele abstraktne mõiste. Läti isikunime kirjapilt on Laisve; leedu sõna lõpu ė-d ei tule sellesse kujusse automaatselt üle kanda.'
],[
 'Vārdnīca Laisve personvārda liecību ievieto 20. gadsimta otrajā ceturksnī un kalendāra ierakstu datē ar 1931. gadu. Plašākais lietojuma laikposms nav precīza pirmā nesēja dzimšanas diena. Abas ziņas palīdz nošķirt vārda lietošanu no tā kalendārās vēstures.',
 'Словарь относит свидетельство имени Laisve ко второй четверти XX века и датирует календарную запись 1931 годом. Широкий период употребления не является точной датой рождения первого носителя. Эти сведения различают историю употребления и календарную историю имени.',
 'The dictionary places a personal-name record of Laisve in the second quarter of the twentieth century and dates its calendar entry to 1931. The broader period is not an exact birth date for a first bearer. These details distinguish usage history from calendar history.',
 'Žodynas Laisve asmenvardžio liudijimą priskiria antrajam XX amžiaus ketvirčiui, o kalendoriaus įrašą datuoja 1931 metais. Platesnis laikotarpis nėra tiksli pirmojo vardo turėtojo gimimo data. Šios žinios skiria vartojimo ir kalendoriaus istoriją.',
 'Sõnaraamat paigutab Laisve isikunimekirje 20. sajandi teise veerandisse ja kalendrikirje 1931. aastasse. Laiem ajavahemik ei ole esimese nimekandja täpne sünnikuupäev. Need andmed eristavad nime kasutuslugu kalendriloost.'
],1931);
add('Latvis',[
 'Latvis ir no latviešu valodas vārda latvis veidots personvārds. Siliņa skaidrojumā tā pamats ir tautības apzīmējums, latvietis. Tādēļ vārda nozīme saistīta ar latviešu pašnosaukumu, nevis ar līdzīgi skanošu citas valodas personvārdu.',
 'Latvis — личное имя от латышского слова latvis. У Силиньша его основа — обозначение национальности, «латыш». Значение связано с латышским самоназванием, а не с похожим по звучанию личным именем другого языка.',
 'Latvis is a personal name formed from Latvian latvis. Siliņš explains its basis as the nationality word meaning a Latvian. The meaning therefore belongs to the Latvian self-designation rather than to a similar-sounding personal name in another language.',
 'Latvis yra asmenvardis iš latvių kalbos žodžio latvis. Siliņšas jo pagrindu nurodo tautybės pavadinimą „latvis“. Taigi reikšmė susijusi su latvių savivardžiu, o ne su panašiai skambančiu kitos kalbos asmenvardžiu.',
 'Latvis on isikunimi läti sõnast latvis. Siliņš seletab selle aluseks rahvusenimetuse lätlane. Tähendus on seega seotud lätlaste omanimetusega, mitte mõne teise keele sarnase kõlaga isikunimega.'
],[
 'Latvis kalendārā vārdnīca atzīmē jau 1902. gadā, savukārt personvārda liecību datē ar 1942. gadu. Šajā avotā kalendāra piedāvājums ir agrāks par minēto nesēja ierakstu. 1942. gads nav pierādījums, ka vārds radīts tikai tad.',
 'Словарь отмечает Latvis в календаре уже в 1902 году, а свидетельство личного имени датирует 1942 годом. В этом источнике календарное предложение предшествует упомянутой записи носителя. 1942 год не доказывает, что имя создано только тогда.',
 'The dictionary records Latvis in a calendar as early as 1902, while dating a personal-name record to 1942. In this source the calendar proposal precedes the cited bearer record. The year 1942 does not prove that the name was created only then.',
 'Žodynas Latvis kalendoriuje pažymi jau 1902 metais, asmenvardžio liudijimą datuoja 1942 metais. Šiame šaltinyje kalendoriaus pasiūlymas ankstesnis už minimą vardo turėtojo įrašą. 1942 metai neįrodo, kad vardas tik tada sukurtas.',
 'Sõnaraamat märgib Latvise kalendrisse juba 1902. aastal, kuid dateerib isikunimekirje 1942. aastasse. Selles allikas eelneb kalendrisse pakkumine viidatud nimekandja kirjele. Aasta 1942 ei tõesta, et nimi loodi alles siis.'
],1902);
add('Latvīte',[
 'Latvīte Siliņa vārdnīcā tieši norādīts uz Latvis. Šīs saimes pamatā ir latviešu tautības apzīmējums, nevis aizgūts svešvalodas vārds. Sieviešu forma Latvīte saglabā šo pašu latviskās piederības pamatu, bet tai ir sava lietojuma vēsture.',
 'Статья Latvīte у Силиньша прямо отсылает к Latvis. Основой семьи служит обозначение латышской национальности, а не заимствованное иностранное имя. Женская форма Latvīte сохраняет эту основу принадлежности к латышам, имея собственную историю употребления.',
 'Siliņš’s Latvīte entry directly refers to Latvis. The family is based on the Latvian nationality word rather than a borrowed foreign personal name. The feminine form Latvīte retains this basis of Latvian identity while having its own usage history.',
 'Siliņšo Latvīte straipsnis tiesiogiai nukreipia į Latvis. Šeimos pagrindas yra latvių tautybės pavadinimas, o ne skolintas užsienietiškas asmenvardis. Moteriškoji Latvīte forma išlaiko šį latviškos tapatybės pagrindą, bet turi atskirą vartojimo istoriją.',
 'Siliņši Latvīte kirje viitab otse Latvisele. Nimepere põhineb läti rahvusenimetusel, mitte laenatud võõrkeelsel isikunimel. Naisvorm Latvīte säilitab sama läti identiteedi aluse, kuid sellel on oma kasutuslugu.'
],[
 'Precīzās formas Latvīte liecību vārdnīca attiecina uz 20. gadsimta otro ceturksni. Tas ir plašāks laikposms, nevis viens zināms rašanās gads. Latvis 1942. gada liecība un 1902. gada kalendāra ieraksts nav automātiski arī Latvīte datējumi.',
 'Свидетельство точной формы Latvīte словарь относит ко второй четверти XX века. Это широкий период, а не один известный год возникновения. Запись Latvis 1942 года и его календарный 1902 год не становятся автоматически датировками Latvīte.',
 'The dictionary places a record of the exact form Latvīte in the second quarter of the twentieth century. This is a broad period rather than a single known creation year. Latvis’s 1942 personal record and 1902 calendar entry are not automatically dates for Latvīte.',
 'Tikslios Latvīte formos liudijimą žodynas priskiria antrajam XX amžiaus ketvirčiui. Tai platesnis laikotarpis, o ne vieni žinomi atsiradimo metai. Latvis 1942 metų liudijimas ir 1902 metų kalendoriaus įrašas automatiškai nedatuoja Latvīte.',
 'Sõnaraamat paigutab täpse kuju Latvīte kirje 20. sajandi teise veerandisse. See on laiem ajavahemik, mitte üks teadaolev loomisaasta. Latvise 1942. aasta isikunimekirje ja 1902. aasta kalendrikirje ei ole automaatselt Latvīte daatumid.'
],null,[catalog('Latvis')]);
add('Zanders',[
 'Zanders Siliņa vārdnīcā caur Sanderss saistīts ar Aleksandrs. Grieķu Alexandros saimes pamatā ir alexō, «aizstāvēt, palīdzēt», un anēr, ģenitīvā andros, «vīrietis». Šī norāžu ķēde izskaidro Zanders vietu vārdu saimē, nevis tikai rakstības līdzību.',
 'Zanders в словаре Силиньша через Sanderss связано с Aleksandrs. Основа греческой семьи Alexandros — alexō «защищать, помогать» и anēr, в родительном andros, «мужчина». Эта цепочка отсылок объясняет место Zanders в семье имён, выходя за пределы одного сходства написаний.',
 'Siliņš’s dictionary connects Zanders through Sanderss with Aleksandrs. The Greek Alexandros family rests on alexō, to defend or help, and anēr, genitive andros, man. This chain of references establishes Zanders’s place in the family beyond spelling resemblance alone.',
 'Siliņšo žodynas Zanders per Sanderss sieja su Aleksandrs. Graikų Alexandros šeimos pagrindas yra alexō „ginti, padėti“ ir anēr, kilmininkas andros, „vyras“. Ši nuorodų grandinė paaiškina Zanders vietą vardų šeimoje, neapsiribodama rašybos panašumu.',
 'Siliņši sõnaraamat seob Zandersi Sanderssi kaudu Aleksandrsiga. Kreeka Alexandrose nimepere põhineb sõnadel alexō, kaitsma või aitama, ja anēr, omastavas andros, mees. See viiteahel kinnitab Zandersi kohta nimeperes enama kui kirjapildi sarnasuse alusel.'
],[
 'Vārdnīca Zanders personvārda liecību ievieto 19. gadsimta pēdējā ceturksnī, bet kalendāra ierakstu datē ar 1783. gadu. Šie dati pieder tieši Zanders. Līdzīgi rakstītais Zandars nav tas pats šķirklis, un tā cilme vēl jāpārbauda atsevišķi.',
 'Словарь относит свидетельство личного имени Zanders к последней четверти XIX века, а календарную запись датирует 1783 годом. Эти данные принадлежат именно Zanders. Похожее Zandars не является той же статьёй и требует отдельной проверки происхождения.',
 'The dictionary places a Zanders personal-name record in the last quarter of the nineteenth century and dates its calendar entry to 1783. These data belong specifically to Zanders. Similar-looking Zandars is a separate spelling whose origin still needs independent checking.',
 'Žodynas Zanders asmenvardžio liudijimą priskiria paskutiniam XIX amžiaus ketvirčiui, kalendoriaus įrašą datuoja 1783 metais. Šie duomenys skirti būtent Zanders. Panaši Zandars rašyba nėra tas pats straipsnis, jos kilmę dar reikia tikrinti atskirai.',
 'Sõnaraamat paigutab Zandersi isikunimekirje 19. sajandi viimasesse veerandisse ja kalendrikirje 1783. aastasse. Need andmed käivad täpselt Zandersi kohta. Sarnane Zandars on eri kirjapilt, mille päritolu vajab veel iseseisvat kontrolli.'
],1783,['https://www.behindthename.com/name/alexander']);
