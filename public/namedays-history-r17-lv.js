// 17 November: dates remain attached to the exact Latvian spelling.
export const historiesLatvianR17={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
const origin=[
 '{name} vārdnīcā saistīts ar Hugo vārdu saimi. Tās pamatu skaidro ar ģermāņu hugu, «prāts, doma, gars»; senajos vācu personvārdos sastopams elements Hug-. Šī ir vārda vēsturiskā uzbūve, nevis spriedums par katra tā nesēja spējām vai raksturu.',
 'Словарь связывает {name} с семьёй Hugo. Её основа объясняется германским hugu, «ум, мысль, дух»; в старых немецких личных именах встречается элемент Hug-. Это историческое строение имени, а не суждение о способностях или характере каждого носителя.',
 'The dictionary connects {name} with the Hugo family, based on Germanic hugu, mind, thought or spirit. The element Hug- appears in old German personal names. These elements explain the name’s historical structure rather than assess the abilities or character of every bearer.',
 'Žodynas {name} sieja su Hugo vardų šeima. Jos pagrindas aiškinamas germanų hugu „protas, mintis, dvasia“; senuose vokiečių asmenvardžiuose pasitaiko dėmuo Hug-. Tai istorinė vardo sandara, o ne kiekvieno turėtojo gebėjimų ar būdo vertinimas.',
 'Sõnaraamat seob nime {name} Hugo nimeperega, mille aluseks on germaani hugu, mõistus, mõte või vaim. Vanades saksa isikunimedes leidub osa Hug-. Need seletavad nime ajaloolist ehitust, mitte ei hinda iga nimekandja võimeid või iseloomu.'
];
function add(name,story,year){historiesLatvianR17[name]={sources:[cat(name),cat('Hugo'),'https://www.behindthename.com/name/hugh'],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i].replaceAll('{name}',name),story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Hugo',[
 'Siliņa vārdnīcas katalogs Hugo kalendāra ierakstu datē ar 1767. gadu, bet personvārda liecību — ar 1871. gadu. Kalendāra publicējums un personvārda pieraksts ir divu veidu vēsturiski dati. Agrākais kalendāra gads nepadara vēlāko liecību par kļūdu un pats par sevi nenosaka vārda radīšanas laiku.',
 'Каталог словаря Силиньша датирует календарную запись Hugo 1767 годом, а личное употребление — 1871 годом. Публикация в календаре и запись личного имени относятся к разным видам свидетельств. Ранний календарный год не опровергает более позднюю запись и сам по себе не датирует создание имени.',
 'The Siliņš dictionary catalogue dates Hugo’s calendar entry to 1767 and a personal-name record to 1871. Calendar publication and a record of personal use are different kinds of historical evidence. The earlier calendar year neither invalidates the later record nor establishes when the name was invented.',
 'Siliņšo žodyno katalogas Hugo kalendoriaus įrašą datuoja 1767 metais, o asmenvardžio liudijimą — 1871 metais. Paskelbimas kalendoriuje ir asmeninio vartojimo įrašas yra skirtingi istoriniai duomenys. Ankstesni kalendoriaus metai nepaneigia vėlesnio įrašo ir savaime nenusako vardo sukūrimo laiko.',
 'Siliņši sõnaraamatu kataloog dateerib Hugo kalendrikirje aastasse 1767 ja isikunimekirje aastasse 1871. Kalendris avaldamine ja isikliku kasutuse kirje on eri liiki ajaloolised tõendid. Varasem kalendriaasta ei muuda hilisemat kirjet ekslikuks ega määra nime loomisaega.'
],1767);
add('Uga',[
 'Uga katalogā ir tieša norāde uz Hugo, bet vēsturiskā liecība saglabāta pašam Uga: Rīga, 1895. gads. Kalendāra ieraksts datēts ar 1925. gadu. Tādējādi īsā latviešu forma dokumentēta atsevišķi; tai nav jāpiešķir Hugo šķirkļa 1871. vai 1767. gads.',
 'Для Uga каталог даёт прямую отсылку к Hugo, но историческая запись относится к самому Uga: Рига, 1895 год. Календарный год — 1925. Таким образом, краткая латышская форма документирована отдельно; ей не нужно приписывать 1871 или 1767 год из статьи Hugo.',
 'The catalogue directly refers Uga to Hugo but keeps a personal-name record for Uga itself: Riga, 1895. Calendar inclusion is dated to 1925. This documents the short Latvian form separately, without assigning it the 1871 or 1767 dates from Hugo’s entry.',
 'Katalogas Uga tiesiogiai nukreipia į Hugo, tačiau istorinis įrašas priklauso pačiam Uga: Ryga, 1895 metai. Kalendoriaus metai — 1925. Taip trumpa latviška forma dokumentuota atskirai, jai nepriskiriant Hugo straipsnio 1871 ar 1767 metų.',
 'Kataloog suunab Uga otseselt Hugo juurde, kuid säilitab Uga enda isikunimekirje: Riia, 1895. Kalendrisse lisamine on dateeritud aastasse 1925. See dokumenteerib lühikese läti kuju eraldi, kandmata sellele Hugo kirje aastaid 1871 või 1767.'
],1925);
add('Uģis',[
 'Uģis Siliņa katalogā tieši norādīts pie Hugo, un starptautiskais vārdu ceļvedis šo latviešu atbilsmi apstiprina. Katalogā konkrēta Uģis personvārda liecība ir Rīgā 1937. gadā, bet kalendāra gads — 1925. Abi datumi attiecas uz šo rakstību ar ģ, nevis uz visām saimes formām.',
 'Uģis в каталоге Силиньша прямо отнесено к Hugo; международный справочник также подтверждает латышское соответствие. Конкретная личная запись Uģis дана для Риги 1937 года, а календарный год — 1925. Обе даты относятся к этому написанию с ģ, а не ко всем формам семьи.',
 'The Siliņš catalogue directly refers Uģis to Hugo, and the international name guide also confirms that Latvian equivalent. A specific Uģis record is placed in Riga in 1937, with calendar inclusion in 1925. Both dates concern this spelling with ģ rather than every form in the family.',
 'Siliņšo katalogas Uģis tiesiogiai priskiria Hugo, o tarptautinis žinynas taip pat patvirtina šią latvišką atitiktį. Konkretus Uģis asmenvardžio įrašas pateiktas Rygoje 1937 metais, kalendoriaus metai — 1925. Abi datos priklauso šiai rašybai su ģ, o ne visoms šeimos formoms.',
 'Siliņši kataloog suunab Uģise otseselt Hugo juurde ning rahvusvaheline nimejuhend kinnitab samuti läti vastet. Konkreetne Uģise kirje on Riiast aastast 1937, kalendrisse lisamine aastast 1925. Mõlemad käivad ģ-ga kirjapildi, mitte kogu nimepere kohta.'
],1925);
add('Ugo',[
 'Ugo katalogā ir tieša norāde uz Hugo, bet konkrētā personvārda liecība ir Rīgā 1940. gadā. Atsevišķs kalendārā iekļaušanas gads nav dots. Lai arī Ugo pazīstams arī citās valodās, šis ieraksts dokumentē tieši katalogā minēto Latvijas lietojumu, nevis pierāda vienu noteiktu aizgūšanas ceļu.',
 'Для Ugo каталог даёт прямую отсылку к Hugo и конкретную личную запись в Риге в 1940 году. Отдельного года включения в календарь нет. Хотя Ugo встречается и в других языках, эта запись документирует названное латвийское употребление, а не доказывает единственный путь заимствования.',
 'The catalogue directly refers Ugo to Hugo and records the personal name in Riga in 1940. It gives no separate calendar-inclusion year. Although Ugo also occurs in other languages, this record documents the cited Latvian use rather than proving one particular route of borrowing.',
 'Katalogas Ugo tiesiogiai nukreipia į Hugo ir pateikia asmenvardžio įrašą Rygoje 1940 metais. Atskirų įtraukimo į kalendorių metų nėra. Nors Ugo vartojamas ir kitose kalbose, šis įrašas dokumentuoja nurodytą Latvijos vartojimą, o ne įrodo vienintelį skolinimosi kelią.',
 'Kataloog suunab Ugo otseselt Hugo juurde ja dokumenteerib isikunime Riias 1940. aastal. Eraldi kalendrisse lisamise aastat ei anta. Kuigi Ugo leidub ka teistes keeltes, tõendab see kirje nimetatud läti kasutust, mitte üht kindlat laenamisteed.'
]);
const directHugo=[
 'Hugo ir ģermāniskas cilmes vārds, kura pamatu skaidro ar hugu, «prāts, doma, gars». Senajos vācu personvārdos sastopams elements Hug-. Šīs nozīmes raksturo vārda vēsturisko uzbūvi, nevis paredz katra tā nesēja spējas vai raksturu.',
 'Hugo — имя германского происхождения, основу которого объясняют через hugu, «ум, мысль, дух». В старых немецких личных именах встречается элемент Hug-. Эти значения описывают историческое строение имени, а не предсказывают способности или характер каждого носителя.',
 'Hugo is a Germanic name based on hugu, mind, thought or spirit. The element Hug- appears in old German personal names. These meanings describe the name’s historical structure rather than predict the abilities or character of every person who bears it.',
 'Hugo yra germaniškos kilmės vardas, kurio pagrindas aiškinamas per hugu „protas, mintis, dvasia“. Senuose vokiečių asmenvardžiuose pasitaiko dėmuo Hug-. Šios reikšmės nusako istorinę vardo sandarą, o ne numato kiekvieno turėtojo gebėjimus ar būdą.',
 'Hugo on germaani päritolu nimi, mille aluseks on hugu, mõistus, mõte või vaim. Vanades saksa isikunimedes leidub osa Hug-. Need tähendused kirjeldavad nime ajaloolist ehitust, mitte ei ennusta iga nimekandja võimeid või iseloomu.'
];
langs.forEach((lang,i)=>{historiesLatvianR17.Hugo.text[lang][0]=directHugo[i];});
