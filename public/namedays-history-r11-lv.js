// 12 November: reviewed Latvian records. Provisional comparisons live separately.
export const historiesLatvianR11={};
const langs=['lv','ru','en','lt','et'];
function add(names,extra,origin,story,year){const text=Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]]));for(const name of names)historiesLatvianR11[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text,...(year?{calendar_entry_year:year}:{})};}
add(['Kaija'],[],[
 'Kaija vārdnīcā salīdzināta ar latviešu kaija un atsevišķi minēta kā somu Katarīna forma. Tās ir divas dažādas valodu saiknes. Katarīna šķirkļa «tīrā» skaidrojums nav automātiski vienīgā Kaija nozīme.',
 'Kaija словарь сравнивает с латышским kaija, «чайка», и отдельно называет финской формой Katarīna. Это две разные языковые связи. Толкование «чистая» при Katarīna не становится автоматически единственным значением Kaija.',
 'The dictionary compares Kaija with Latvian kaija, seagull, and separately lists it as a Finnish form of Katarīna. These are different linguistic connections. The pure interpretation under Katarīna is not automatically Kaija’s only meaning.',
 'Žodynas Kaija lygina su latvių kaija „žuvėdra“ ir atskirai pateikia kaip suomišką Katarīna formą. Tai du skirtingi kalbiniai ryšiai. Katarīna įrašo aiškinimas „tyra“ savaime netampa vienintele Kaija reikšme.',
 'Sõnaraamat võrdleb Kaijat läti sõnaga kaija, kajakas, ja nimetab seda eraldi Katarīna soome vormiks. Need on eri keelelised seosed. Katarīna juures antud puhas-tõlgendus pole automaatselt Kaija ainus tähendus.'
],[
 'Katalogs dod Kaija personas vārda liecību 1549. gadā un kalendāra ierakstu 1910. gadā. Šie datējumi rāda atšķirīgus vārda vēstures slāņus. Kalendāra gads nedatē formas rašanos, savukārt agrīnais pieraksts pats neizšķir abas cilmes versijas.',
 'Каталог указывает Kaija как личное имя в 1549 году и календарную запись 1910 года. Это разные слои истории: календарный год не датирует создание формы, а ранняя запись сама по себе не выбирает одну из двух этимологических версий.',
 'The catalogue gives a personal-name attestation of Kaija in 1549 and a calendar entry in 1910. These are different historical layers. Calendar inclusion does not date the form’s creation, and the early record alone does not choose between the two origin accounts.',
 'Katalogas pateikia Kaija asmenvardžio paliudijimą 1549 metais ir kalendoriaus įrašą 1910 metais. Tai skirtingi istorijos sluoksniai: kalendoriaus metai nedatuoja formos sukūrimo, o ankstyvas įrašas nepasirenka vienos iš dviejų kilmės versijų.',
 'Kataloog annab Kaija isikunimekirje 1549. ja kalendrikande 1910. aastast. Need on ajaloo eri kihid. Kalendrisse võtmine ei dateeri vormi loomist ning varane kirje üksi ei vali kahe päritoluseletuse vahel.'
],1910);
add(['Kaira'],[],[
 'Kaira vārdnīcā piesardzīgi saistīta ar latviešu kairs — patīkami satraucošs, valdzinošs — vai igauņu personvārdu Kaira. Latviešu vārda salīdzinājums avotā ir ar jautājuma zīmi; viens droši izvēlēts aizguvuma ceļš nav dots.',
 'Kaira словарь предположительно связывает с латышским kairs, «приятно волнующий, пленительный», либо эстонским именем Kaira. Латышское сравнение отмечено вопросительным знаком; единственный надёжный путь заимствования не указан.',
 'The dictionary tentatively connects Kaira with Latvian kairs, pleasantly exciting or captivating, or with the Estonian personal name Kaira. The Latvian comparison carries a question mark; no single secure borrowing route is given.',
 'Žodynas Kaira atsargiai sieja su latvių kairs „maloniai jaudinantis, žavintis“ arba estų asmenvardžiu Kaira. Latviškas palyginimas pažymėtas klaustuku; vienas patikimas skolinimosi kelias nenurodytas.',
 'Sõnaraamat seob Kaira oletuslikult läti sõnaga kairs, meeldivalt erutav või kütkestav, või eesti isikunimega Kaira. Läti sõna võrdlusel on küsimärk; üht kindlat laenamisteed ei anta.'
],[
 'Personas vārda liecība katalogā datēta ar 19. gadsimta pēdējo ceturksni, bet kalendāra ieraksts ar 1879. gadu. Plašākais periods saglabā avota precizitāti. Tas nav pārvērsts par vienu konkrētu gadu tikai tādēļ, ka kalendāra datējums ir precīzāks.',
 'Личную запись каталог относит к последней четверти XIX века, календарную — к 1879 году. Широкий период сохраняет точность источника. Он не сужается до одного вымышленного года лишь потому, что календарная дата точнее.',
 'The personal-name attestation is dated to the last quarter of the nineteenth century; the calendar entry is dated 1879. The broader period preserves the source’s precision and is not narrowed to an invented exact year simply because the calendar date is more precise.',
 'Asmenvardžio paliudijimas datuojamas XIX amžiaus paskutiniu ketvirčiu, kalendoriaus įrašas — 1879 metais. Platesnis laikotarpis išlaiko šaltinio tikslumą ir nesusiaurinamas iki išgalvotų metų vien dėl tikslesnės kalendoriaus datos.',
 'Isikunimekirje dateeritakse 19. sajandi viimasesse veerandisse, kalendrikande aastaks antakse 1879. Laiem ajavahemik säilitab allika täpsuse ega muutu väljamõeldud aastaarvuks üksnes seetõttu, et kalendridaatum on täpsem.'
],1879);
add(['Kornelijs','Kornēlijs'],['https://www.personvarduatveide.lv/uploads/sources/2/pdf/polu_ipasvardu_pareizrakstiba_1998.pdf#page=33','https://www.izpetnieks.lv/en/name/Korn%C4%93lijs'],[
 'Poļu īpašvārdu atveides rokasgrāmata vienā rindā dod Korneli atveidojumus Kornelijs un Kornēlijs. Tā ir tieši dokumentēta formu saikne. Kornēlijs katalogā saistīts ar romiešu Cornelius; tālākais cornu — «rags» vai cornus — koka nosaukuma salīdzinājums paliek iespējams.',
 'Руководство по передаче польских имён в одной строке даёт для Korneli формы Kornelijs и Kornēlijs. Это прямая документальная связь. Каталог связывает Kornēlijs с римским Cornelius; дальнейшие сравнения с cornu, «рог», или cornus, названием дерева, остаются предположениями.',
 'The Polish-name rendering manual gives Kornelijs and Kornēlijs together for Korneli, directly documenting their relationship. The catalogue links Kornēlijs to Roman Cornelius; further comparisons with cornu, horn, or the tree word cornus remain tentative.',
 'Lenkiškų vardų perteikimo vadovas vienoje eilutėje pateikia Korneli atitikmenis Kornelijs ir Kornēlijs, tiesiogiai dokumentuodamas ryšį. Katalogas Kornēlijs sieja su romėnų Cornelius; tolesni cornu „ragas“ ar medžio pavadinimo cornus palyginimai lieka galimi.',
 'Poola nimede käsiraamat annab Korneli vastetena ühel real Kornelijsi ja Kornēlijsi, dokumenteerides otseselt vormide seose. Kataloog seob Kornēlijsi Rooma Corneliusega; edasised võrdlused cornu, sarve, või puunimetuse cornus’ega jäävad oletuslikuks.'
],[
 'Tieši garumzīmes formai Kornēlijs katalogs norāda 1638. gada liecību Valmieras apkārtnē un kalendāra ierakstu 1767. gadā. Šie datējumi paliek piesaistīti Kornēlijs. Rokasgrāmatas abu formu pāris pats nepierāda Kornelijs rakstību tajos pašos agrīnajos gados.',
 'Именно для Kornēlijs с долготой каталог указывает 1638 год в окрестностях Валмиеры и календарную запись 1767 года. Эти даты остаются при Kornēlijs. Пара форм в руководстве сама по себе не доказывает написание Kornelijs в те же ранние годы.',
 'For the macron spelling Kornēlijs specifically, the catalogue gives a 1638 attestation near Valmiera and a calendar entry in 1767. These dates remain attached to Kornēlijs. The manual’s paired forms alone do not prove Kornelijs in those same early years.',
 'Būtent Kornēlijs su ilgumo ženklu katalogas nurodo 1638 metų paliudijimą Valmieros apylinkėse ir 1767 metų kalendorių. Datos lieka prie Kornēlijs. Vadovo formų pora savaime neįrodo Kornelijs rašybos tais pačiais ankstyvais metais.',
 'Just pikkusmärgiga Kornēlijsi puhul annab kataloog 1638. aasta kirje Valmiera ümbruses ja kalendrikande aastast 1767. Daatumid jäävad Kornēlijsi juurde. Käsiraamatu vormipaar üksi ei tõesta Kornelijsi kirjapilti samadel varastel aastatel.'
],1767);
add(['Vianita'],[],[
 'Vianita vārdnīcas atstāstā raksturota ar saīsinājumu fnd. — fonētisks darinājums. Vārds veidots pēc skanējuma, bet konkrēts pamatvārds un tā tulkojums nav norādīts. Tāpēc līdzīgi skanošs svešvalodas vārds automātiski nekļūst par tā pierādītu sakni.',
 'Vianita в пересказе словаря отмечено сокращением fnd. — фонетическое образование. Имя сформировано по звучанию, но конкретное слово-основа и его перевод не указаны. Созвучное иностранное слово поэтому не становится автоматически доказанным корнем.',
 'The dictionary catalogue marks Vianita fnd., a phonetic formation. It was formed for its sound, without identifying an underlying word or its translation. A similar-sounding foreign word therefore does not automatically become its established root.',
 'Žodyno atpasakojime Vianita pažymėta fnd. — fonetinis darinys. Vardas sudarytas pagal skambesį, nenurodant pamatinio žodžio ar jo vertimo. Panašiai skambantis svetimas žodis savaime netampa įrodyta šaknimi.',
 'Sõnaraamatukataloog märgib Vianita lühendiga fnd., foneetiline moodustis. Nimi on loodud kõla järgi, nimetamata alussõna ega selle tõlget. Sarnase kõlaga võõrsõna ei muutu seetõttu automaatselt tõestatud juureks.'
],[
 'Katalogā Vianita personas vārda liecība datēta ar 20. gadsimta trešo ceturksni. Avots nenosauc vienu precīzu gadu vai vietu. Šis perioda pieraksts ir konkrētā formas lietojuma liecība, nevis pamats izdomāt pirmo nesēju vai vārda radītāju.',
 'Каталог датирует личную запись Vianita третьей четвертью XX века, не называя точного года или места. Это свидетельство употребления конкретной формы в пределах периода, а не основание выдумывать первого носителя или автора имени.',
 'The catalogue dates a personal-name attestation of Vianita to the third quarter of the twentieth century, without specifying an exact year or place. This period records use of the form, rather than licensing an invented first bearer or creator.',
 'Katalogas Vianita asmenvardžio paliudijimą datuoja XX amžiaus trečiu ketvirčiu, nenurodydamas tikslių metų ar vietos. Tai formos vartojimo laikotarpio liudijimas, o ne pagrindas išgalvoti pirmą turėtoją ar vardo kūrėją.',
 'Kataloog dateerib Vianita isikunimekirje 20. sajandi kolmandasse veerandisse, täpset aastat või paika nimetamata. Ajavahemik tõendab vormi kasutust ega anna alust välja mõelda esimest nimekandjat või loojat.'
]);
add(['Vianta'],[],[
 'Vianta vārdnīcas atstāstā ir fonētisks darinājums: par pamatu izvēlēts skanējums, nevis nosaukts konkrēts leksisks vārds. Avots nedod atsevišķu sakni vai tās nozīmi. Šī klasifikācija attiecas tieši uz Vianta, nevis uz visiem līdzīgi rakstītiem vārdiem.',
 'Vianta в пересказе словаря — фонетическое образование: основой служит звучание, а не названное конкретное слово. Отдельный корень и его значение не даны. Классификация относится именно к Vianta, а не ко всем похожим написаниям.',
 'The dictionary catalogue describes Vianta as a phonetic formation, based on sound rather than a specified lexical word. It gives no separate root or meaning. This classification concerns Vianta itself, not every similarly written name.',
 'Žodyno atpasakojimas Vianta vadina fonetiniu dariniu, sudarytu pagal skambesį, o ne konkretų nurodytą žodį. Atskira šaknis ir jos reikšmė nepateiktos. Ši klasifikacija priklauso būtent Vianta, ne visoms panašioms rašyboms.',
 'Sõnaraamatukataloog kirjeldab Viantat foneetilise moodustisena, mis põhineb kõlal, mitte nimetatud alussõnal. Eraldi juurt ega tähendust ei anta. Liigitus puudutab Viantat ennast, mitte kõiki sarnase kirjapildiga nimesid.'
],[
 'Vianta personas vārda liecība katalogā saistīta ar Liepājas apkārtni 20. gadsimta trešajā ceturksnī. Tātad saglabāta gan vieta, gan perioda precizitāte. Tā ir dokumentēta lietojuma norāde, nevis apgalvojums, ka vārds tajā laikā vai vietā izgudrots.',
 'Свидетельство Vianta каталог относит к окрестностям Лиепаи в третьей четверти XX века. Сохранены и место, и точность периода. Это документированная запись употребления, а не утверждение об изобретении имени именно там или тогда.',
 'The catalogue places a Vianta personal-name attestation near Liepāja in the third quarter of the twentieth century. Both location and period precision are retained. This documents usage, not a claim that the name was invented at that place or time.',
 'Vianta asmenvardžio paliudijimą katalogas sieja su Liepojos apylinkėmis XX amžiaus trečiame ketvirtyje. Išlaikoma ir vieta, ir laikotarpio tikslumas. Tai dokumentuota vartosena, o ne teiginys apie vardo išradimą būtent ten ar tada.',
 'Kataloog paigutab Vianta isikunimekirje Liepāja ümbrusse 20. sajandi kolmandal veerandil. Säilivad nii koht kui ajavahemiku täpsus. See dokumenteerib kasutust, mitte nime väljamõtlemist just seal või siis.'
]);
add(['Vidars'],[],[
 'Vidars šķirklī dotas senskandināvu daļu nozīmes «koks, mežs» un «karotājs». Vārdnīcas atstāsts tās nesavieno vienā drošā pilnā personvārda tulkojumā. Šīs norādes attiecas uz Vidars; citu līdzīgu rakstību radniecība ar to ir atsevišķi pārbaudāma.',
 'Статья Vidars приводит древнескандинавские значения частей «дерево, лес» и «воин», не объединяя их в один достоверный полный перевод имени. Указания относятся к Vidars; родство других похожих написаний требует отдельной проверки.',
 'The Vidars entry gives Old Scandinavian element glosses tree or forest and warrior, without combining them into one secure full-name translation. These indications concern Vidars; relationships with other similar spellings require separate evidence.',
 'Vidars įrašas pateikia senosios skandinavų kalbos dalių reikšmes „medis, miškas“ ir „karys“, nesujungdamas jų į vieną patikimą viso vardo vertimą. Nuorodos priklauso Vidars; kitų panašių rašybų giminystę reikia tikrinti atskirai.',
 'Vidarsi kirje annab vanaskandinaavia osade seletused puu või mets ja sõdalane, ühendamata neid üheks kindlaks terviknime tõlkeks. Need viited puudutavad Vidarsit; sarnaste kirjapiltide sugulus vajab eraldi tõendeid.'
],[
 'Katalogs norāda Vidars personas vārda liecību Gulbenē 1931. gadā un kalendāra ierakstu 1966. gadā. Šie ir konkrēti vietējās vēstures datējumi. Tie nav automātiski pārnesami uz Vidards, Vidarts vai Vidavs tikai līdzīgā rakstījuma dēļ.',
 'Каталог указывает Vidars в Гулбене в 1931 году и календарную запись 1966 года. Это конкретные местные даты. Их нельзя автоматически переносить на Vidards, Vidarts или Vidavs лишь из-за похожего написания.',
 'The catalogue records Vidars in Gulbene in 1931 and gives a calendar entry in 1966. These are specific local historical dates. They cannot automatically be transferred to Vidards, Vidarts or Vidavs simply because the spellings look similar.',
 'Katalogas nurodo Vidars Gulbenėje 1931 metais ir kalendoriaus įrašą 1966 metais. Tai konkrečios vietinės istorijos datos. Jų negalima automatiškai perkelti Vidards, Vidarts ar Vidavs vien dėl panašios rašybos.',
 'Kataloog annab Vidarsi kasutusnäite Gulbenes 1931. ja kalendrikande 1966. aastast. Need on konkreetsed kohalikud daatumid. Neid ei saa sarnase kirjapildi tõttu automaatselt üle kanda Vidardsile, Vidartsile ega Vidavsile.'
],1966);
add(['Zinovija'],[],[
 'Zinovija vārdnīcā norādīta pie Zinovijs, kas tālāk atsaucas uz Zinobijs. Pēdējā šķirklī dotas grieķu Zeus ģenitīva Zēnos un bios — «dzīve» norādes. Avots nepiedāvā atsevišķu pilna salikteņa tulkojumu.',
 'Zinovija словарь помещает при Zinovijs, отсылающем к Zinobijs. Там указаны греческие Zeus, родительный Zēnos, и bios, «жизнь». Отдельного перевода всего сложного имени источник не предлагает.',
 'The dictionary places Zinovija under Zinovijs, which refers on to Zinobijs. That entry mentions Greek Zeus, genitive Zēnos, and bios, life. The source does not supply a separate translation of the complete compound.',
 'Žodynas Zinovija pateikia prie Zinovijs, o šį nukreipia į Zinobijs. Pastarajame minimi graikų Zeus kilmininkas Zēnos ir bios „gyvenimas“. Atskiro viso dūrinio vertimo šaltinis nesiūlo.',
 'Sõnaraamat paigutab Zinovija Zinovijsi alla, mis viitab edasi Zinobijsile. Seal mainitakse kreeka Zeusi omastavat Zēnos ja bios, elu. Terve liitnime eraldi tõlget allikas ei anna.'
],[
 'Zinovija personas vārda liecība datēta ar 20. gadsimta pirmo ceturksni, kalendāra ieraksts — ar 1889. gadu. Sieviešu formas datējumi ir atsevišķi no Zinovijs pierakstiem. Norāde uz vārdu saimi pati nepārvieto vienas formas agrīno gadu uz otru.',
 'Свидетельство Zinovija датировано первой четвертью XX века, календарная запись — 1889 годом. Даты женской формы отделены от записей Zinovijs. Семейная связь сама по себе не переносит ранний год одной формы на другую.',
 'The personal-name attestation of Zinovija is dated to the first quarter of the twentieth century and its calendar entry to 1889. The feminine dates remain distinct from Zinovijs records; a family reference alone does not transfer one form’s early year to another.',
 'Zinovija asmenvardžio paliudijimas datuojamas XX amžiaus pirmuoju ketvirčiu, kalendoriaus įrašas — 1889 metais. Moteriškos formos datos skiriamos nuo Zinovijs įrašų; šeimos nuoroda neperkelia vienos formos ankstyvų metų kitai.',
 'Zinovija isikunimekirje dateeritakse 20. sajandi esimesse veerandisse ning kalendrikande aastaks antakse 1889. Naisvormi daatumid jäävad Zinovijsi kirjetest eraldi: pereviide üksi ei kanna ühe vormi varast aastat teisele.'
],1889);
add(['Zinovijs'],[],[
 'Zinovijs vārdnīcā ir pie Zinobijs norādīta baltkrievu un krievu forma. Zinobijs skaidrojumā minēts grieķu Zeus, ģenitīvā Zēnos, un bios — «dzīve». Tie ir avotā doti sakņu skaidrojumi, nevis patstāvīgi pierādīts pilna personvārda tulkojums.',
 'Zinovijs указан в словаре при Zinobijs как белорусская и русская форма. Объяснение Zinobijs приводит греческие Zeus, родительный Zēnos, и bios, «жизнь». Это толкования корней, а не отдельный доказанный перевод всего личного имени.',
 'The dictionary lists Zinovijs under Zinobijs as a Belarusian and Russian form. The Zinobijs account mentions Greek Zeus, genitive Zēnos, and bios, life. These are supplied root glosses rather than a separately established translation of the full personal name.',
 'Žodynas Zinovijs pateikia prie Zinobijs kaip baltarusišką ir rusišką formą. Zinobijs aiškinime minimi graikų Zeus kilmininkas Zēnos ir bios „gyvenimas“. Tai šaknų aiškinimai, o ne atskirai įrodytas viso asmenvardžio vertimas.',
 'Sõnaraamat nimetab Zinovijsi Zinobijsi juures valgevene ja vene vormiks. Zinobijsi seletus mainib kreeka Zeusi omastavat Zēnos ja bios, elu. Need on antud juuretähendused, mitte eraldi tõestatud terviknime tõlge.'
],[
 'Katalogā Zinovijs personas vārda liecībai dots 1850. gads, kalendāra ierakstam — 1851. gads. Tie veido divus tuvu esošus, tomēr atšķirīgus datējumus. Tos nedrīkst aizstāt ar sieviešu formas Zinovija vēlākajām liecībām vai tās kalendāra gadu.',
 'Каталог датирует свидетельство Zinovijs 1850 годом, календарную запись — 1851 годом. Это две близкие, но разные даты. Их не заменяют более поздними свидетельствами женского Zinovija или его календарным годом.',
 'The catalogue dates a personal-name attestation of Zinovijs to 1850 and its calendar entry to 1851. These are close but distinct dates. They are not replaced with the later feminine Zinovija records or its calendar year.',
 'Katalogas Zinovijs asmenvardžio paliudijimą datuoja 1850 metais, kalendoriaus įrašą — 1851 metais. Tai artimos, bet skirtingos datos. Jos nepakeičiamos vėlesniais moteriškos Zinovija liudijimais ar jos kalendoriaus metais.',
 'Kataloog dateerib Zinovijsi isikunimekirje 1850. ja kalendrikande 1851. aastasse. Need on lähestikku, kuid eraldi daatumid. Neid ei asendata hilisemate naissoost Zinovija kirjetega ega selle kalendriaastaga.'
],1851);
