// Exact historical entries, checked against Julius Mägiste's 1929 name book.
// Dates here describe the book and its evidence, never the invention of a name.
export const historiesEstonianRecords={};
const book='https://www.emakeeleselts.ee/wp-content/uploads/2020/07/17-AEStoimetised-XVIII.pdf';
const languages=['lv','ru','en','lt','et'];
const lead={lv:'Jūlija Megistes 1929. gada grāmatā «Eestipäraseid isikunimesid» ',ru:'В книге Юлиуса Мягисте Eestipäraseid isikunimesid (1929) ',en:'In Julius Mägiste’s Eestipäraseid isikunimesid (1929), ',lt:'Juliuso Mägiste knygoje „Eestipäraseid isikunimesid“ (1929) ',et:'Julius Mägiste raamatus „Eestipäraseid isikunimesid“ (1929) '};
const end={lv:' Tas apliecina vēsturisku lietojumu vai ieteikumu, nevis vārda radīšanas datumu.',ru:' Это свидетельство исторического употребления или рекомендации, а не дата создания имени.',en:' This records historical use or recommendation, rather than the date the name was created.',lt:' Tai liudija istorinę vartoseną arba rekomendaciją, o ne vardo sukūrimo datą.',et:' See tõendab ajaloolist kasutust või soovitust, mitte nime loomise aega.'};
function record(name,origin,detail,page,extra=[]){historiesEstonianRecords[name]={sources:[book+'#page='+page,...extra],text:Object.fromEntries(languages.map((l,i)=>[l,[origin[i],lead[l]+detail[i]+end[l]]]))};}
record('Elle',[
 'Elle ir dokumentēta igauņu sieviešu vārda forma. Ziemeļvalstu vārdnīca to salīdzina ar Ella, bet ar šo norādi vien nepietiek, lai izvēlētos vienu no Ellas vairākām izcelsmes saimēm.',
 'Elle документировано как эстонская женская форма. Северный справочник сопоставляет её с Ella, но одной этой связи недостаточно, чтобы выбрать единственную из нескольких семей происхождения Ella.',
 'Elle is a documented Estonian feminine form. A Nordic name guide compares it with Ella, although that connection alone does not select one of Ella’s several origin families.',
 'Elle dokumentuota kaip estiška moteriška forma. Šiaurės vardų žinynas ją lygina su Ella, tačiau vien šio ryšio nepakanka išrinkti vienintelę iš kelių Ella kilmės šeimų.',
 'Elle on dokumenteeritud eesti naisenimevorm. Põhjamaade nimejuhend võrdleb seda Ellaga, kuid see seos üksi ei vali välja üht Ella mitmest päritoluperest.'
],[
 'Elle, Ella un Ellu apkopotas vienā sieviešu vārdu rindā; Ellei ir norādes uz Vīdemani, izloksnēm un Hurta salu materiālu.',
 'Elle, Ella и Ellu объединены в одной строке женских имён; для Elle приведены ссылки на Видемана, диалекты и островной материал Хурта.',
 'Elle, Ella and Ellu share a line in the women’s list; Elle carries references to Wiedemann, dialects and Hurt’s island material.',
 'Elle, Ella ir Ellu sujungtos vienoje moterų vardų eilutėje; prie Elle pateiktos nuorodos į Wiedemanną, tarmes ir Hurto salų medžiagą.',
 'Elle, Ella ja Ellu on naistenimede loendis ühel real; Elle juures viidatakse Wiedemannile, murretele ja Hurda saarte materjalile.'
],14,['https://www.nordicnames.de/wiki/Elle']);
record('Mai',[
 'Mai ir igauņu lietojumā dokumentēts sieviešu vārds. Ziemeļvalstu vārdnīca tādu pašu rakstījumu saista ar Maj. Šis salīdzinājums saglabā atšķirību starp personvārdu, mēneša nosaukumu un citās valodās sastopamiem tāda paša rakstījuma vārdiem.',
 'Mai документировано как женское имя в эстонском употреблении. Северный справочник связывает то же написание с Maj. Такое сравнение сохраняет различие между личным именем, названием месяца и словами такого же написания в других языках.',
 'Mai is documented as a woman’s name in Estonian use. A Nordic name guide links the same spelling with Maj. That comparison keeps the personal name distinct from a month name and from identically spelled words in other languages.',
 'Mai dokumentuota kaip moters vardas estų vartosenoje. Šiaurės vardų žinynas tą pačią rašybą sieja su Maj. Toks palyginimas išsaugo skirtumą tarp asmenvardžio, mėnesio pavadinimo ir vienodai rašomų kitų kalbų žodžių.',
 'Mai on eesti kasutuses dokumenteeritud naisenimi. Põhjamaade nimejuhend seob sama kirjapildi Majga. Võrdlus hoiab eesnime lahus kuunimetusest ja teistes keeltes samamoodi kirjutatavatest sõnadest.'
],[
 'Mai rindā citētas senākas formas May un Maije, bet Maie dots līdzās kā atsevišķs variants. Grāmata saglabā rakstījumu dažādību.',
 'в строке Mai процитированы более старые May и Maije, а Maie дано рядом как отдельный вариант. Книга сохраняет разнообразие написаний.',
 'the Mai entry cites older May and Maije forms, with Maie alongside as a separate variant. The book preserves variation in the spelling.',
 'Mai eilutėje cituojamos senesnės May ir Maije formos, o Maie šalia pateikta kaip atskiras variantas. Knyga išsaugo rašybos įvairovę.',
 'Mai kirjes tsiteeritakse vanemaid May ja Maije vorme ning Maie seisab kõrval eraldi variandina. Raamat säilitab kirjapiltide mitmekesisuse.'
],18,['https://www.nordicnames.de/wiki/Mai']);
function word(name,term,gloss,detail,page,extra=[],finnish=false){const origin=[
 `${name} saistīts ar ${finnish?'somu':'igauņu'} vārdu ${term} — «${gloss[0]}». Dabas vai īpašības vārds šeit skaidro vārda tēlu, nevis nosaka tā nesēja raksturu.`,
 `${name} связано с ${finnish?'финским':'эстонским'} словом ${term} — «${gloss[1]}». Образ природы или качества объясняет имя, но не определяет характер его носителя.`,
 `${name} is linked with ${finnish?'Finnish':'Estonian'} ${term}, “${gloss[2]}”. The word’s image explains an association of the name, rather than determining the character of its bearer.`,
 `${name} siejamas su ${finnish?'suomių':'estų'} žodžiu ${term} — „${gloss[3]}“. Gamtos ar savybės vaizdas paaiškina vardo sąsają, bet nenustato jo turėtojo būdo.`,
 `${name} seostub ${finnish?'soome':'eesti'} sõnaga ${term} — „${gloss[4]}“. Sõna kujund selgitab nime seost, mitte ei määra selle kandja iseloomu.`
 ];record(name,origin,detail,page,extra);}
word('Õie','õis',['zieds','цветок','blossom','žiedas','õis'],[
 'Õie ir sieviešu sarakstā ar norādēm uz Sõggel un Rnm. Autors to saglabā atsevišķi no blakus dotajām Õile un Õilme.',
 'Õie находится в женском списке со ссылками Sõggel и Rnm. Оно сохранено отдельно от соседних Õile и Õilme.',
 'Õie is in the women’s list with the references Sõggel and Rnm. It remains separate from the neighbouring Õile and Õilme.',
 'Õie yra moterų sąraše su nuorodomis Sõggel ir Rnm. Ji atskirta nuo greta pateiktų Õile ir Õilme.',
 'Õie on naisenimede loendis viidetega Sõggel ja Rnm. See on eraldi kõrval olevatest Õilest ja Õilmest.'
],22,['https://sonaveeb.ee/search/unif/dlall/dsall/%C3%B5is/1/est']);
record('Õilme',[
 'Õilme vēsturiskajā igauņu sarakstā ir savienota ar Õile, kam dots skaidrojums «zieds». Tā ir konkrēta vārdu saikne, nevis pierādījums, ka visi līdzīgi ziedu vārdi ir viena forma.',
 'Õilme в историческом эстонском списке связано с Õile, пояснённым как «цветок». Это конкретная связь имён, а не доказательство тождественности всех похожих цветочных форм.',
 'Õilme is linked in the historical Estonian list with Õile, glossed as “blossom”. This is a specific name connection, not proof that all similar flower names are interchangeable.',
 'Õilme istoriniame estų sąraše susieta su Õile, paaiškinta kaip „žiedas“. Tai konkreti vardų sąsaja, o ne visų panašių gėlinių formų tapatybė.',
 'Õilme on ajaloolises eesti loendis seotud Õilega, mille seletus on „õis“. See on konkreetne nimeseos, mitte kõigi sarnaste lillenimede samasus.'
],[
 'Õilme dots vienā grupā ar Õile un Öili. Šī agrīnā iespiestā grupa ļauj saikni aprakstīt, neizdomājot pirmo nosaukto bērnu.',
 'Õilme дано в одной группе с Õile и Öili. Ранняя печатная группа позволяет описать связь, не выдумывая первого названного ребёнка.',
 'Õilme shares a group with Õile and Öili. This early printed grouping documents the connection without inventing a first child given the name.',
 'Õilme pateikta vienoje grupėje su Õile ir Öili. Ankstyva spausdinta grupė dokumentuoja ryšį, neišgalvojant pirmojo taip pavadinto vaiko.',
 'Õilme on ühes rühmas Õile ja Öiliga. Varane trükitud rühm dokumenteerib seose, leiutamata esimest selle nime saanud last.'
],22);
word('Taimi','taimi',['stāds, dīgsts','саженец, росток','seedling','daigas','taim, istik'],[
 'Taimi ir sieviešu sarakstā ar vācu skaidrojumu par augu un dīgšanu. Somu vārda tēls tā ir ienācis arī igauņu ieteikumu grāmatā.',
 'Taimi находится в женском списке с немецким пояснением растения и прорастания. Образ финского слова вошёл и в эстонскую книгу рекомендаций.',
 'Taimi appears in the women’s list with German glosses about a plant and sprouting. The Finnish word image thus entered an Estonian recommendation book too.',
 'Taimi yra moterų sąraše su vokiškais augalo ir dygimo paaiškinimais. Suomiško žodžio vaizdas taip pateko ir į estų rekomendacijų knygą.',
 'Taimi on naisenimede loendis saksakeelsete taime ja tärkamise seletustega. Soome sõna kujund jõudis seega ka eesti soovitusraamatusse.'
],21,['https://www.nordicnames.de/wiki/Taimi'],true);
record('Tiina',[
 'Tiina ir Kristiina īsā forma. Šī saime turpina latīņu Christiana — Christianus sieviešu formu, kas saistīta ar vārdu «kristietis». Īsā forma ieguvusi patstāvīgu lietojumu.',
 'Tiina — краткая форма Kristiina. Семья продолжает латинское Christiana, женскую форму Christianus, связанную со словом «христианин». Краткая форма получила самостоятельное употребление.',
 'Tiina is a short form of Kristiina. The family continues Latin Christiana, the feminine form of Christianus, associated with “Christian”. The shortened name has developed independent use.',
 'Tiina yra Kristiina trumpinys. Šeima tęsia lotynišką Christiana, moterišką Christianus formą, susijusią su „krikščioniu“. Trumpinys įgijo savarankišką vartoseną.',
 'Tiina on Kristiina lühivorm. Nimepere jätkab ladina Christianat, Christianuse naissoovormi tähendusega „kristlane“. Lühivorm on saanud iseseisva kasutuse.'
],[
 'Tiina un Tiinu norādītas kopā ar saikni uz Kristiine. Autors min arī izloksnes un Hūrta vākumu salās.',
 'Tiina и Tiinu даны вместе со связью с Kristiine. Автор также ссылается на диалекты и островные записи Хурта.',
 'Tiina and Tiinu are grouped with a link to Kristiine. The entry also cites dialects and Hurt’s collections from the islands.',
 'Tiina ir Tiinu sugrupuotos su nuoroda į Kristiine. Straipsnyje minimos tarmės ir Hurto užrašymai salose.',
 'Tiina ja Tiinu on rühmitatud seosega Kristiinele. Kirje viitab ka murretele ja Hurda saartelt pärinevale ainestikule.'
],21,['https://www.behindthename.com/name/tiina','https://www.behindthename.com/name/christina']);
word('Urve','urb',['spurdze','серёжка растения','catkin','žirginys','urb'],[
 'Urve dots sieviešu sarakstā ar vācu skaidrojumu Knospe — «pumpurs». Vecais skaidrojums saglabā botānisko tēlu, nenosakot visu nesēju vārda izvēles motīvu.',
 'Urve дано в женском списке с немецким Knospe — «почка». Старое пояснение сохраняет растительный образ, не устанавливая мотив выбора имени у каждой носительницы.',
 'Urve is in the women’s list with the German gloss Knospe, “bud”. The older gloss preserves the botanical image without establishing every family’s naming motive.',
 'Urve pateikta moterų sąraše su vokišku Knospe — „pumpuras“. Senasis aiškinimas išsaugo augalinį vaizdą, nenustatydamas kiekvienos šeimos vardo pasirinkimo motyvo.',
 'Urve on naisenimede loendis saksa seletusega Knospe „pung“. Vanem seletus säilitab taimse kujundi, määramata iga pere nimevaliku motiivi.'
],21,['https://www.nordicnames.de/wiki/Urve']);
record('Viiu',[
 'Viiu ir igauņu Sofia saimes forma. Grieķu sophia nozīmē «gudrība», bet igauņu rakstība veidojusies vietējā valodas tradīcijā, nevis tieši pārņemot grieķu burtus.',
 'Viiu — эстонская форма семьи Sofia. Греческое sophia означает «мудрость», но эстонское написание сложилось в местной языковой традиции, а не прямым переносом греческих букв.',
 'Viiu is an Estonian form in the Sofia family. Greek sophia means “wisdom”, but the Estonian spelling developed within local language tradition rather than by copying Greek letters directly.',
 'Viiu yra estiška Sofia šeimos forma. Graikų sophia reiškia „išmintis“, tačiau estiška rašyba susiformavo vietinėje kalbinėje tradicijoje, o ne tiesiog perrašant graikų raides.',
 'Viiu on eesti vorm Sofia nimeperest. Kreeka sophia tähendab „tarkus“, kuid eesti kirjapilt kujunes kohalikus keeletraditsioonis, mitte kreeka tähtede otsese ümberkirjutusena.'
],[
 'Viio un Viiu ir skaidri savienotas ar Sofiie. Atsauces uz Vīdemani, Hūrta salu vākumu un izloksnēm rāda jau esošu lietojumu.',
 'Viio и Viiu прямо связаны с Sofiie. Ссылки на Видемана, островное собрание Хурта и диалекты указывают на уже существовавшее употребление.',
 'Viio and Viiu are explicitly linked to Sofiie. References to Wiedemann, Hurt’s island collections and dialects point to already existing usage.',
 'Viio ir Viiu tiesiogiai susietos su Sofiie. Nuorodos į Wiedemanną, Hurto salų rinkinius ir tarmes rodo jau egzistavusią vartoseną.',
 'Viio ja Viiu on otseselt seotud Sofiiega. Viited Wiedemannile, Hurda saartekogudele ja murretele osutavad juba olemas olnud kasutusele.'
],22,['https://et.wikipedia.org/wiki/Viiu','https://www.behindthename.com/name/sophia']);
record('Virve',[
 'Virve vēsturiskais igauņu skaidrojums saistīts ar zaru un dzinumu. Somu avotos minēti arī Virpi un Virva; tos nevar automātiski padarīt par vienu visu valodu izcelsmes ceļu.',
 'Историческое эстонское объяснение Virve связано с ветвью и побегом. Финские источники упоминают также Virpi и Virva; их нельзя автоматически превращать в единый путь для всех языков.',
 'Virve’s historical Estonian explanation concerns a branch or shoot. Finnish references also mention Virpi and Virva; those cannot automatically be made into one derivation for every language.',
 'Istorinis estiškas Virve aiškinimas susijęs su šaka ir ūgliu. Suomių šaltiniai mini ir Virpi bei Virva; jų negalima automatiškai paversti viena visų kalbų kilme.',
 'Virve ajalooline eesti seletus seostub oksa ja võrsega. Soome allikad nimetavad ka Virpit ja Virvat; neist ei saa automaatselt teha kõigi keelte üht päritoluteed.'
],[
 'Virve ir atsevišķs sieviešu ieraksts ar vācu skaidrojumiem Zweig un Sprössling. Tas nav tikai secinājums no mūsdienu ciema Virve nosaukuma.',
 'Virve — отдельная женская запись с немецкими пояснениями Zweig и Sprössling. Это не просто вывод из названия современной деревни Virve.',
 'Virve has its own women’s entry with the German glosses Zweig and Sprössling. This is more than an inference from the modern village name Virve.',
 'Virve turi atskirą moterų įrašą su vokiškais paaiškinimais Zweig ir Sprössling. Tai nėra vien išvada iš dabartinio Virve kaimo pavadinimo.',
 'Virvel on eraldi naisenimekirje saksa seletustega Zweig ja Sprössling. See ei ole pelgalt järeldus tänapäevase Virve küla nimest.'
],22,['https://www.nordicnames.de/wiki/Virve']);
record('Valdo',[
 'Valdo igauņu vēsturē sastopams līdzās Valdu un viduslaiku Valde. Šis salīdzinājums ir precīzāks par pieņēmumu, ka katra līdzīga skandināvu vai ģermāņu forma atnāca pa vienu ceļu.',
 'В эстонской истории Valdo встречается рядом с Valdu и средневековым Valde. Такое сопоставление точнее предположения, что все похожие скандинавские и германские формы пришли одним путём.',
 'In Estonian name history Valdo appears beside Valdu and medieval Valde. That comparison is more precise than assuming that every similar Scandinavian or Germanic form arrived by the same route.',
 'Estų vardų istorijoje Valdo pasirodo greta Valdu ir viduramžiško Valde. Toks palyginimas tikslesnis už prielaidą, kad visos panašios skandinaviškos ir germaniškos formos atėjo vienu keliu.',
 'Eesti nimeloos seisab Valdo Valdu ja keskaegse Valde kõrval. See võrdlus on täpsem kui oletus, et iga sarnane skandinaavia või germaani vorm jõudis siia sama teed.'
],[
 'Valdo un Valdu ierakstā minēta Valde liecība no 1255. gada. Gads pieder avota rakstībai Valde, nevis automātiski mūsdienu Valdo.',
 'В статье Valdo и Valdu приведено свидетельство Valde 1255 года. Год относится к исходному написанию Valde, а не автоматически к современному Valdo.',
 'the Valdo and Valdu entry cites a Valde record from 1255. The year belongs to the source spelling Valde, not automatically to modern Valdo.',
 'Valdo ir Valdu straipsnyje nurodytas 1255 metų Valde liudijimas. Metai priklauso šaltinio rašybai Valde, o ne automatiškai dabartiniam Valdo.',
 'Valdo ja Valdu kirje viitab Valde nimekujule aastast 1255. Aasta kuulub allikakujule Valde, mitte automaatselt tänapäevasele Valdole.'
],52,['https://www.nordicnames.de/wiki/Valdo']);
record('Valdur',[
 'Valdur vēsturiskā igauņu skaidrojumā saistīts ar varu un spēku. Cits vārdu avots to saista ar Waltheri; šos atšķirīgos skaidrojumus nedrīkst sapludināt vienā pierādītā izcelsmē.',
 'Valdur в историческом эстонском объяснении связано с властью и силой. Другой справочник связывает его с Waltheri; разные объяснения нельзя слить в одно доказанное происхождение.',
 'Valdur is associated in a historical Estonian explanation with power and strength. Another name reference links it to Waltheri; these differing accounts should not be fused into one proven derivation.',
 'Valdur istoriniame estiškame aiškinime siejamas su valdžia ir galia. Kitas vardų šaltinis jį sieja su Waltheri; skirtingų aiškinimų negalima sujungti į vieną įrodytą kilmę.',
 'Valdur seostub ajaloolises eesti seletuses võimu ja jõuga. Teine nimeallikas seob seda Waltheriga; eri seletusi ei saa sulatada üheks tõestatud päritoluks.'
],[
 'Valdur ir vīriešu sarakstā ar vācu skaidrojumu «varenais, tas, kam ir vara». Šis vecais ieteikums rāda arī vārda uztveri tālaika lasītājiem.',
 'Valdur включён в мужской список с немецким пояснением «могущественный, обладающий властью». Старая рекомендация показывает и восприятие имени тогдашними читателями.',
 'Valdur appears in the men’s list with German glosses meaning “powerful” and “holding authority”. The older recommendation also shows how readers were invited to understand it.',
 'Valdur pateiktas vyrų sąraše su vokiškais paaiškinimais „galingas“ ir „turintis valdžią“. Senoji rekomendacija rodo, kaip jį siūlyta suprasti skaitytojams.',
 'Valdur on mehenimede loendis saksa seletustega „võimas“ ja „võimu omav“. Vana soovitus näitab ka seda, kuidas lugejatel paluti nime mõista.'
],52,['https://www.nordicnames.de/wiki/Valdur']);
record('Valev',[
 'Valev pieder igauņu vārdu tradīcijai. Senajā ieteikumu grāmatā tam dots gaišuma tēls — balts, gaišs, mirdzošs; tas nav jāuztver kā cilvēka izskata vai rakstura apraksts.',
 'Valev относится к эстонской традиции имён. Старая книга рекомендаций даёт ему образ светлого — белого, яркого, сияющего; это не описание внешности или характера человека.',
 'Valev belongs to Estonian naming tradition. The old recommendation book gives it an image of brightness — white, light, shining — rather than a description of a person’s appearance or character.',
 'Valev priklauso estų vardų tradicijai. Senoji rekomendacijų knyga suteikia šviesumo vaizdą — baltas, šviesus, spindintis; tai nėra žmogaus išvaizdos ar būdo aprašymas.',
 'Valev kuulub eesti nimetraditsiooni. Vana soovitusraamat annab sellele heleduse kujundi — valge, hele, särav —, mitte inimese välimuse või iseloomu kirjelduse.'
],[
 'Valev ir atsevišķs ieraksts līdzās Valdur un Valit. Tādēļ līdzīgi vārdu sākumi vien nav pamats sapludināt to nozīmes.',
 'Valev дан отдельной статьёй рядом с Valdur и Valit. Поэтому сходство начал имён не даёт основания смешивать их значения.',
 'Valev has a separate entry beside Valdur and Valit. Similar beginnings therefore do not justify merging their meanings.',
 'Valev pateiktas atskirai šalia Valdur ir Valit. Tad panašios pradžios nepateisina reikšmių sujungimo.',
 'Valev on eraldi kirje Valduri ja Valiti kõrval. Sarnane algus ei anna seega alust nende tähendusi ühendada.'
],52);
record('Ülev',[
 'Ülev sastopams igauņu personvārdu tradīcijā. Mūsdienu īpašības vārds var atsaukt cildenuma tēlu, tomēr tas viens pats nepierāda vēsturiskā vārda izvēles motīvu.',
 'Ülev встречается в эстонской традиции личных имён. Современное прилагательное может вызывать образ возвышенного, но само по себе не доказывает историческую мотивацию выбора имени.',
 'Ülev occurs in Estonian personal-name tradition. The modern adjective can evoke the sublime, but that alone does not prove the historical motive for choosing the name.',
 'Ülev pasitaiko estų asmenvardžių tradicijoje. Dabartinis būdvardis gali priminti didingumą, bet pats savaime neįrodo istorinio vardo pasirinkimo motyvo.',
 'Ülev esineb eesti isikunimetraditsioonis. Tänapäevane omadussõna võib meenutada ülevust, kuid see üksi ei tõenda ajaloolist nimevaliku motiivi.'
],[
 'Ülev ir vīriešu sarakstā ar vācu skaidrojumu der Wache — «nomodā esošais». Atšķirīgais vecais skaidrojums saglabāts, nevis klusi aizstāts ar mūsdienu nozīmi.',
 'Ülev включено в мужской список с немецким der Wache — «бодрствующий». Отличающееся старое пояснение сохранено, а не незаметно заменено современным значением.',
 'Ülev appears in the men’s list with German der Wache, “the wakeful one”. That differing historical gloss is retained rather than silently replaced with the modern meaning.',
 'Ülev pateiktas vyrų sąraše su vokišku der Wache — „budintysis“. Skirtingas senasis aiškinimas išsaugomas, o ne tyliai pakeičiamas dabartine reikšme.',
 'Ülev on mehenimede loendis saksa seletusega der Wache „ärkvel olev“. See erinev vana seletus jääb alles, mitte ei asendu vaikimisi tänapäevase tähendusega.'
],55);
word('Uljas','uljas',['drosmīgs, cēls','смелый, благородный','valiant, noble','narsus, kilnus','vahva, südi'],[
 'Uljas ir vīriešu sarakstā kā somu almanaha vārds, skaidrots ar igauņu vahva un südi. Tā dokumentēta aizgūta forma, nevis tikai jauns līdzīga vārda minējums.',
 'Uljas дано в мужском списке как имя финского альманаха, пояснённое эстонскими vahva и südi. Это документированная заимствованная форма, а не новое предположение по сходству.',
 'Uljas is included as a Finnish almanac name, explained with Estonian vahva and südi. This documents a borrowed form, rather than a new guess based on resemblance.',
 'Uljas įtrauktas kaip suomių almanacho vardas, paaiškintas estų vahva ir südi. Tai dokumentuoja skolintą formą, o ne naują spėjimą pagal panašumą.',
 'Uljas on esitatud soome almanahhinimena ning seletatud sõnadega vahva ja südi. See dokumenteerib laenvormi, mitte uut sarnasusel põhinevat oletust.'
],52,['https://www.nordicnames.de/wiki/Uljas'],true);
record('Vootele',[
 'Vootele igauņu tradīcija salīdzina ar hronikas rakstību Wottele. Iespējamā saikne ar cīnītāju paliek salīdzinājums: arī vēsturiskais pētnieks to atzīmē ar jautājuma zīmi.',
 'Эстонская традиция сопоставляет Vootele с хроникальным Wottele. Возможная связь с «бойцом» остаётся сравнением: исторический исследователь тоже отмечает её вопросительным знаком.',
 'Estonian tradition compares Vootele with the chronicle spelling Wottele. A possible link with “fighter” remains a comparison: the historical researcher himself marked it with a question mark.',
 'Estų tradicija lygina Vootele su kronikos rašyba Wottele. Galimas ryšys su „kovotoju“ lieka palyginimas: istorinis tyrėjas pats jį pažymėjo klaustuku.',
 'Eesti traditsioon võrdleb Vootelet kroonika nimekujuga Wottele. Võimalik seos võitlejaga jääb võrdluseks: ajalooline uurija märkis selle ise küsimärgiga.'
],[
 'Wottele minēts kā Sakalas vecākais, bet Vootele — kā tolaik lietotā forma. Abas rakstības joprojām ir jānošķir, aprakstot viduslaiku liecību.',
 'Wottele назван сакаласким старейшиной, а Vootele — употреблявшейся тогда формой. При описании средневекового свидетельства эти написания по-прежнему следует различать.',
 'Wottele is identified as a Sakala elder, while Vootele is labelled a form then in use. The spellings remain distinct when describing the medieval evidence.',
 'Wottele įvardytas Sakalos seniūnu, o Vootele — tuo metu vartota forma. Aprašant viduramžių liudijimą šias rašybas reikia skirti.',
 'Wottele on nimetatud Sakala vanemaks, Vootele aga tollal kasutusel olnud kujuks. Keskaegset tõendit kirjeldades tuleb kirjapildid lahus hoida.'
],55);
record('Eha',[
 'Eha ir igauņu vārds ar saikni ar eha — vakara krēslu. Tas nepārvērš vārdu par pašas Krēslas tēla vārdu teikā par Rītausmu un Krēslu.',
 'Eha — эстонское имя, связанное с eha, вечерними сумерками. Это не делает его именем самой героини предания о Рассвете и Сумерках.',
 'Eha is an Estonian name connected with eha, evening twilight. That does not make it the name of the character Hämarik in the Dawn and Dusk legend.',
 'Eha yra estiškas vardas, susijęs su eha — vakaro prieblanda. Tai nepaverčia jo pačios Prieblandos veikėjos vardu padavime apie Aušrą ir Sutemas.',
 'Eha on eesti nimi, mis seostub õhtuse ehaga. See ei tee sellest „Koidu ja Hämariku“ loo Hämariku nime.'
],[
 'Eha ir sieviešu sarakstā; ievadā autors to atsevišķi min starp mākslīgi veidotiem igauņu vārdiem.',
 'Eha включено в женский список; во введении автор отдельно называет его среди искусственно образованных эстонских имён.',
 'Eha appears in the women’s list; the introduction also explicitly includes it among newly formed Estonian names.',
 'Eha įtraukta į moterų sąrašą; įvade autorius ją atskirai mini tarp naujai sukurtų estiškų vardų.',
 'Eha on naisenimede loendis; sissejuhatus nimetab seda eraldi kunstlikult loodud eesti nimede seas.'
],14,['https://www.nordicnames.de/wiki/Eha']);
record('Helme',[
 'Helme vēsture ir skaidrāka nekā tā sākotnējā motivācija. Šajā gadījumā vietvārds Helme un līdzīgi vārdi paši par sevi nepierāda personvārda izcelsmi.',
 'История Helme яснее его исходной мотивации. Топоним Helme и похожие имена сами по себе не доказывают происхождение личного имени.',
 'Helme’s history is clearer than its original motivation. The place-name Helme and similar personal names do not by themselves establish its derivation.',
 'Helme istorija aiškesnė už pradinę motyvaciją. Vietovardis Helme ir panašūs asmenvardžiai savaime neįrodo šio vardo kilmės.',
 'Helme kasutuslugu on selgem kui selle algne motiiv. Kohanimi Helme ega sarnased isikunimed ei tõenda iseenesest nime tuletuskäiku.'
],[
 'Helme dots kā sievietes vārds ar norādi uz Sõggel vākumu. Tas ir konkrēts iespiests piemērs, nevis secinājums no kādas vietas nosaukuma.',
 'Helme дано в женском списке со ссылкой на собрание Sõggel. Это конкретный печатный пример, а не вывод из названия местности.',
 'Helme is a women’s entry credited to the Sõggel collection. This is a specific printed example, independent of an inference from a place-name.',
 'Helme pateikta moterų sąraše su nuoroda į Sõggelio rinkinį. Tai konkretus spausdintas pavyzdys, nepriklausantis nuo vietovardžio aiškinimo.',
 'Helme on naisenimede kirje viitega Sõggeli kogule. See on konkreetne trükitud näide, mitte kohanimest tehtud järeldus.'
],14);
record('Hando',[
 'Hando ir igauņu vārds, kura senāks variants ir Handu. Vēsturiskā saikne ar Hant ir dokumentēta, bet tā viena pati nedod drošu burtisku tulkojumu.',
 'Hando — эстонское имя с историческим вариантом Handu. Связь с Hant документирована, но сама по себе не даёт достоверного буквального перевода.',
 'Hando is an Estonian name with the historical variant Handu. Its connection with Hant is documented, but that alone does not supply a secure literal translation.',
 'Hando yra estiškas vardas su istoriniu variantu Handu. Ryšys su Hant dokumentuotas, tačiau vien jo nepakanka patikimai pažodinei reikšmei.',
 'Hando on eesti nimi ajaloolise variandiga Handu. Seos Hantiga on dokumenteeritud, kuid sellest üksi ei tulene kindlat sõnasõnalist tähendust.'
],[
 'Hando un Handu norādīti kopā ar atsauci uz Hant. Tālākajā šķirklī minētas vecās rakstības Hante un Hanto.',
 'Hando и Handu объединены отсылкой к Hant. В соответствующей статье приведены старые написания Hante и Hanto.',
 'Hando and Handu share a cross-reference to Hant, whose entry cites the older spellings Hante and Hanto.',
 'Hando ir Handu susieti nuoroda į Hant; jo straipsnyje pateiktos senos rašybos Hante ir Hanto.',
 'Hando ja Handu on ühise viitega Hantile, mille kirjes on vanemad kujud Hante ja Hanto.'
],26);
record('Henrik',[
 'Henrik ir Heinrich lejasvācu forma. Ģermāņu saimē savienoti heim — «mājas» un rih — «valdnieks»; skandināvu un Baltijas rakstības attīstījušās dažādās valodās.',
 'Henrik — нижненемецкая форма Heinrich. Германская семья соединяет heim, «дом», и rih, «правитель»; скандинавские и балтийские написания развивались в разных языках.',
 'Henrik is a Low German form of Heinrich. The Germanic family combines heim, “home”, and rih, “ruler”; Scandinavian and Baltic spellings developed in different languages.',
 'Henrik yra žemaičių vokiečių Heinrich forma. Germanų šeimoje susijungia heim — „namai“ ir rih — „valdovas“; skandinaviškos ir baltiškos rašybos plėtojosi skirtingose kalbose.',
 'Henrik on Heinrichi alamsaksa vorm. Germaani nimeperes ühinevad heim „kodu“ ja rih „valitseja“; skandinaavia ja balti kirjapildid kujunesid eri keeltes.'
],[
 'Henrik ir vīriešu sarakstā ar norādi uz Vīdemaņa vārdnīcu un izloksnēm. Tajā pašā lapā atsevišķi dots Hendrik.',
 'Henrik включён в мужской список со ссылкой на словарь Видемана и диалекты. На той же странице отдельно дан Hendrik.',
 'Henrik appears in the men’s list with references to Wiedemann’s dictionary and dialect use. Hendrik is a separate entry on the same page.',
 'Henrik įtrauktas į vyrų sąrašą su nuorodomis į Wiedemanno žodyną ir tarmes. Tame pačiame puslapyje Hendrik pateiktas atskirai.',
 'Henrik on mehenimede loendis viidetega Wiedemanni sõnaraamatule ja murdekasutusele. Hendrik on samal lehel eraldi kirje.'
],27,['https://www.nordicnames.de/wiki/Henrik']);
record('Leela',[
 'Leela ir vēsturiski saistīta ar Leelo, igauņu vārdu dziesmai un dzejai. Šī pārbaudītā igauņu saikne jānošķir no līdzīgi rakstītiem vārdiem citās valodās.',
 'Leela исторически связано с Leelo, эстонским словом песни и поэзии. Проверенную эстонскую связь следует отличать от похожих написаний в других языках.',
 'Leela is historically linked with Leelo, an Estonian word associated with song and poetry. That documented Estonian connection is distinct from similarly spelled names in other languages.',
 'Leela istoriškai siejama su Leelo, estišku žodžiu, susijusiu su daina ir poezija. Šį patikrintą estišką ryšį reikia skirti nuo panašios rašybos kitose kalbose.',
 'Leela on ajalooliselt seotud Leeloga, laulu ja luulet tähistava eesti sõnaga. Seda dokumenteeritud eesti seost tuleb eristada teiste keelte sarnastest kirjapiltidest.'
],[
 'Leela atzīmēta kā tolaik lietota forma un tieši savienota ar Leelo. Vācu skaidrojumi līdzās min dziesmu un dzeju.',
 'Leela отмечено как употреблявшаяся тогда форма и прямо соединено с Leelo. Немецкие пояснения рядом называют песню и поэзию.',
 'Leela is marked as then-current usage and explicitly paired with Leelo. The accompanying German glosses mention song and poetry.',
 'Leela pažymėta kaip tuo metu vartota forma ir tiesiogiai susieta su Leelo. Greta pateiktuose vokiškuose aiškinimuose minimos daina ir poezija.',
 'Leela on märgitud tollal kasutusel olnud vormina ning otseselt ühendatud Leeloga. Saksakeelsed seletused nimetavad laulu ja luulet.'
],17);
record('Malle',[
 'Malle igauņu lietojumā parasti saista ar Maria; latviešu vārdnīca līdzās min arī dāņu saikni ar Amalia. Tāpēc visas valodas nav jāsavelk vienā drošā izcelsmes ceļā.',
 'В эстонском употреблении Malle обычно связывают с Maria; латышский словарь упоминает и датскую связь с Amalia. Поэтому все языки нельзя свести к одному бесспорному пути происхождения.',
 'In Estonian use Malle is usually linked with Maria; the Latvian dictionary also mentions a Danish connection with Amalia. These traditions should not be compressed into one certain derivation.',
 'Estų vartosenoje Malle paprastai siejama su Maria; latvių žodynas mini ir danišką ryšį su Amalia. Šių tradicijų nereikia sutraukti į vieną neabejotiną kilmę.',
 'Eesti kasutuses seostatakse Mallet tavaliselt Mariaga; läti sõnaraamat nimetab ka taani seost Amaliaga. Neid traditsioone ei saa suruda ühte kindlasse tuletuskäiku.'
],[
 'Mall un Malle ir dotas kopā; Malle atzīmēta kā tolaik lietota un pamatota ar vecākiem rakstu avotiem.',
 'Mall и Malle даны вместе; Malle отмечено как употреблявшееся тогда имя со ссылками на более старые письменные источники.',
 'Mall and Malle are presented together; Malle is marked as current usage and supported by older written references.',
 'Mall ir Malle pateiktos kartu; Malle pažymėta kaip tuomet vartotas vardas ir pagrįsta senesniais rašytiniais šaltiniais.',
 'Mall ja Malle on esitatud koos; Malle on märgitud tollal kasutusel olnud nimeks vanemate kirjalike allikate toel.'
],18,['https://www.izpetnieks.lv/en/name/Malle','https://et.wikipedia.org/wiki/Malle']);
record('Mehis',[
 'Mehis ir igauņu vārds ar saikni ar mehis — vīrišķību. Tas ir vēsturisks vārda skaidrojums, nevis apgalvojums par katra cilvēka raksturu vai dzīves uzdevumu.',
 'Mehis — эстонское имя, связанное с mehis, мужественностью. Это историческое объяснение слова, а не утверждение о характере или жизненной задаче каждого носителя.',
 'Mehis is an Estonian name linked with mehis, manliness. This is a historical word explanation, not a statement about every bearer’s character or purpose in life.',
 'Mehis yra estiškas vardas, siejamas su mehis — vyriškumu. Tai istorinis žodžio aiškinimas, o ne teiginys apie kiekvieno turėtojo būdą ar gyvenimo paskirtį.',
 'Mehis on eesti nimi seosega sõnaga mehis, mehisus. See on ajalooline sõnaseletus, mitte väide iga kandja iseloomu või eluülesande kohta.'
],[
 'Mehis salīdzināts ar senāko rakstību Mechis, un blakus dots vācu skaidrojums Mannhaftigkeit. Salīdzinājuma forma saglabāta atsevišķi no mūsdienu vārda.',
 'Mehis сопоставлено со старым написанием Mechis и немецким пояснением Mannhaftigkeit. Форма сравнения сохранена отдельно от современного имени.',
 'Mehis is compared with the older spelling Mechis and glossed in German as Mannhaftigkeit. The compared record remains distinct from the modern spelling.',
 'Mehis palygintas su senesne rašyba Mechis ir vokišku aiškinimu Mannhaftigkeit. Lyginama forma atskiriama nuo dabartinės rašybos.',
 'Mehist võrreldakse vanema kirjapildiga Mechis ning seletatakse saksa sõnaga Mannhaftigkeit. Võrdluskuju jääb tänapäevasest kirjapildist eristatuks.'
],41);
record('Olev',[
 'Olev ir igauņu Olaf saimes forma. To nedrīkst izskaidrot tikai ar līdzīgi rakstītu igauņu filozofijas vārdu «esošais» vai pieņemt vienīgi no tēla Olevipoeg.',
 'Olev — эстонская форма семьи Olaf. Её нельзя объяснять только сходным эстонским философским словом «сущее» или выводить исключительно из персонажа Olevipoeg.',
 'Olev is an Estonian form in the Olaf family. It should not be derived solely from the similar Estonian philosophical word for “being”, or attributed only to the character Olevipoeg.',
 'Olev yra estiška Olaf šeimos forma. Jos negalima aiškinti vien panašiu estų filosofiniu žodžiu „esinys“ ar kildinti tik iš veikėjo Olevipoeg.',
 'Olev on eesti vorm Olafi nimeperest. Seda ei saa tuletada üksnes samakujulisest filosoofiamõistest ega omistada ainult tegelasele Olevipoeg.'
],[
 'Olev skaidri savienots ar Olaf un vecākajām rakstībām Oleff un Olleff. Atsevišķi minēti arī Oolep un Oolev.',
 'Olev прямо связано с Olaf и старыми написаниями Oleff и Olleff. Отдельно названы также Oolep и Oolev.',
 'Olev is explicitly equated with Olaf and older spellings Oleff and Olleff. Oolep and Oolev are also listed separately.',
 'Olev tiesiogiai susietas su Olaf ir senomis rašybomis Oleff bei Olleff. Oolep ir Oolev taip pat pateikti atskirai.',
 'Olev on otseselt ühendatud Olafiga ja vanemate kujudega Oleff ning Olleff. Oolep ja Oolev on samuti eraldi esitatud.'
],43);
record('Pirje',[
 'Pirje ir vairāki starptautiski skaidrojumi. Vēsturiskā igauņu vārdu grāmata to piedāvā sieviešu sarakstā kā somu izloksnes Brigitta formu; vēlākā somu vīriešu saikne ar Pirjeri ir cits skaidrojums.',
 'У Pirje несколько международных объяснений. Историческая эстонская книга предлагает его в женском списке как финскую диалектную форму Brigitta; поздняя финская мужская связь с Pirjeri — другое объяснение.',
 'Pirje has more than one international explanation. The historical Estonian book offers it in the women’s list as a Finnish dialect form of Brigitta; the later Finnish masculine Pirjeri connection is a different account.',
 'Pirje turi kelis tarptautinius aiškinimus. Istorinė estų knyga siūlo jį moterų sąraše kaip suomių tarmės Brigitta formą; vėlesnis suomiškas vyriškas ryšys su Pirjeri yra kitas aiškinimas.',
 'Pirjel on mitu rahvusvahelist seletust. Ajalooline eesti nimeraamat pakub seda naisenimede seas soome murdelise Brigitta vormina; hilisem soome mehenime Pirjeri seos on teine seletus.'
],[
 'Pirje dots tieši zem Piret un Pirit ar atzīmi «sm. murd., = Brigitta». Tātad sieviešu saikne tiešām ir vecajā ieteikumu sarakstā.',
 'Pirje дано сразу после Piret и Pirit с пометой «sm. murd., = Brigitta». Женская связь действительно присутствует в старом списке рекомендаций.',
 'Pirje appears immediately after Piret and Pirit with the note “sm. murd., = Brigitta”. The feminine connection is genuinely present in that recommendation list.',
 'Pirje pateikta iškart po Piret ir Pirit su pastaba „sm. murd., = Brigitta“. Moteriškas ryšys iš tiesų yra senajame rekomendacijų sąraše.',
 'Pirje seisab kohe Pireti ja Piriti järel märkega „sm. murd., = Brigitta“. Naissooline seos on selles soovitusloendis tõepoolest olemas.'
],20,['https://www.nordicnames.de/wiki/Pirje']);
