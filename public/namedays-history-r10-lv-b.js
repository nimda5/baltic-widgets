// LV-only research. Uncertain roots remain qualified in every translation.
export const historiesLatvianR10B={};
const langs=['lv','ru','en','lt','et'];
function add(name,extra,origin,story,year){historiesLatvianR10B[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Māra',['https://www.literatura.lv/personas/mara-zalite'],[
 'Māra skaidrojumā vārdnīca saglabā dažādas iespējas: saikni ar Marija vai Tamāra, ebreju «rūgtā» skaidrojumu un atsevišķi latviešu folkloras Māru. Tās nav viena pierādīta etimoloģija. Iespējamā liecība Trikātā datēta ar 1765. gadu.',
 'В объяснении Māra словарь сохраняет разные возможности: связь с Marija или Tamāra, еврейское толкование «горькая» и отдельно латышскую фольклорную Мару. Это не одна доказанная этимология. Возможная запись в Трикате датирована 1765 годом.',
 'For Māra the dictionary retains different possibilities: Marija or Tamāra, a Hebrew bitter interpretation, and separately Māra in Latvian folklore. These do not constitute one proven etymology. A possible Trikāta attestation is dated 1765.',
 'Māra aiškinime žodynas palieka skirtingas galimybes: Marija arba Tamāra, hebrajišką „karti“ aiškinimą ir atskirai latvių folkloro Marą. Tai nėra viena įrodyta etimologija. Galimas Trikatos paliudijimas datuojamas 1765 metais.',
 'Māra seletuses säilitab sõnaraamat eri võimalused: Marija või Tamāra, heebrea mõru-tõlgenduse ning eraldi läti rahvaluule Māra. Need pole üks tõestatud etümoloogia. Võimalik Trikāta kirje dateeritakse 1765. aastasse.'
],[
 'Māras Zālītes romāns «Pieci pirksti» iznāca 2013. gadā, bet turpinājums «Paradīzes putni» — 2018. gadā. Bērnības pieredzes stāstījums tā ieguva divu grāmatu loku. Autore ir arī 1988. gada rokoperas «Lāčplēsis» libreta radītāja.',
 'Роман Мары Залите «Pieci pirksti» вышел в 2013 году, продолжение «Paradīzes putni» — в 2018 году. Рассказ о детском опыте образовал цикл из двух книг. Писательница также создала либретто рок-оперы «Lāčplēsis» 1988 года.',
 'Māra Zālīte published Pieci pirksti in 2013 and its continuation Paradīzes putni in 2018, giving the childhood narrative a two-book span. She also wrote the libretto for the 1988 rock opera Lāčplēsis.',
 'Māros Zālītes romanas „Pieci pirksti“ pasirodė 2013 metais, tęsinys „Paradīzes putni“ — 2018 metais. Vaikystės pasakojimas taip apėmė dvi knygas. Autorė taip pat sukūrė 1988 metų roko operos „Lāčplēsis“ libretą.',
 'Māra Zālīte avaldas romaani „Pieci pirksti“ 2013. ning järje „Paradīzes putni“ 2018. aastal, andes lapsepõlveloole kahe raamatu ulatuse. Ta kirjutas ka 1988. aasta rokkooperi „Lāčplēsis“ libreto.'
]);
add('Gustavs',['https://www.president.lv/lv/Gustavs-Zemgals'],[
 'Gustavs cilmei vārdnīcā piedāvāti vairāki skandināvu skaidrojumi, tostarp daļas ar nozīmēm «kauja» un «spieķis», kā arī zviedru skaidrojums par Jētalandes ļaužu atbalstu. Viens droši izvēlēts sākotnējais salikums nav noteikts.',
 'Для Gustavs словарь предлагает несколько скандинавских объяснений, в том числе элементы «битва» и «посох», а также шведское толкование об опоре жителей Гёталанда. Единственное достоверное исходное сложение не установлено.',
 'The dictionary offers several Scandinavian accounts of Gustavs, including elements glossed battle and staff, and a Swedish interpretation involving support of the people of Götaland. It does not securely select one original compound.',
 'Gustavs kilmei žodynas siūlo kelis skandinaviškus aiškinimus, tarp jų dėmenis „mūšis“ ir „lazda“ bei švedišką aiškinimą apie Gėtalando žmonių atramą. Vienas patikimas pradinis dūrinys nenustatytas.',
 'Gustavsi päritolule pakub sõnaraamat mitu skandinaavia seletust, sealhulgas osad lahing ja kepp ning rootsi tõlgenduse Götalandi rahva toest. Üht kindlat algset liitnime ei määrata.'
],[
 'Gustavs Zemgals vadīja Latvijas neatkarības pasludināšanas svinīgo aktu Nacionālajā teātrī 1918. gada 18. novembrī. 1927. gada 8. aprīlī Saeima viņu ievēlēja par Valsts prezidentu; šajā amatā viņš bija līdz 1930. gada 9. aprīlim.',
 'Густав Земгалс вёл торжественный акт провозглашения независимости Латвии в Национальном театре 18 ноября 1918 года. 8 апреля 1927 года Сейм избрал его президентом; эту должность он занимал до 9 апреля 1930 года.',
 'Gustavs Zemgals chaired Latvia’s independence proclamation ceremony at the National Theatre on 18 November 1918. The Saeima elected him president on 8 April 1927, and he served until 9 April 1930.',
 'Gustavs Zemgals vedė Latvijos nepriklausomybės paskelbimo iškilmes Nacionaliniame teatre 1918 metų lapkričio 18 dieną. Saeima išrinko jį prezidentu 1927 metų balandžio 8 dieną; pareigas ėjo iki 1930 metų balandžio 9 dienos.',
 'Gustavs Zemgals juhatas Läti iseseisvuse väljakuulutamise pidulikku aktust Rahvusteatris 18. novembril 1918. Saeima valis ta presidendiks 8. aprillil 1927; ametiaeg kestis 9. aprillini 1930.'
]);
add('Valērijs',['https://www.uefa.com/uefaeuro/history/news/0253-0d80a06bdc4c-93a26e80b8ff-1000--latvia-rally-from-two-down-against-iceland/'],[
 'Valērijs rakstības cilme izmantotajā vārdnīcas materiālā nav droši noteikta: katalogs norāda, ka tieši šī forma skenējumā nav atrasta. Tajā minētais Valerijs ir cita rakstība, tādēļ tās skaidrojums šeit netiek automātiski pārņemts.',
 'Происхождение написания Valērijs по использованному словарному материалу надёжно не установлено: каталог отмечает отсутствие именно этой формы в скане. Упомянутое Valerijs — другое написание, чьё объяснение не переносится автоматически.',
 'The consulted dictionary material does not securely establish the origin of the spelling Valērijs: the catalogue says this exact form was not found in the scan. Valerijs is a different spelling whose explanation is not automatically transferred.',
 'Naudota žodyno medžiaga patikimai nenustato Valērijs rašybos kilmės: katalogas nurodo, kad būtent ši forma skenuotame šaltinyje nerasta. Valerijs yra kita rašyba, kurios aiškinimas automatiškai neperkeliamas.',
 'Kasutatud sõnaraamatumaterjal ei määra kirjapildi Valērijs päritolu kindlalt: kataloogi järgi seda täpset vormi skannist ei leitud. Valerijs on teine kirjapilt, mille seletust ei kanta automaatselt üle.'
],[
 'Valērijs Šabala 2015. gada 10. oktobrī guva Latvijas izlases izlīdzinājuma vārtus Eiropas čempionāta kvalifikācijas spēlē Islandē. Latvija pēc pirmā puslaika zaudēja ar 0:2, bet Aleksandra Cauņas un Šabalas vārti panāca 2:2.',
 'Валерий Шабала 10 октября 2015 года забил ответный мяч сборной Латвии в отборочном матче чемпионата Европы в Исландии. После первого тайма Латвия уступала 0:2; голы Александра Цауни и Шабалы принесли ничью 2:2.',
 'Valērijs Šabala scored Latvia’s equaliser in Iceland in a European Championship qualifier on 10 October 2015. Latvia trailed 2–0 at half-time, but goals from Aleksandrs Cauņa and Šabala earned a 2–2 draw.',
 'Valērijs Šabala 2015 metų spalio 10 dieną įmušė Latvijos išlyginamąjį įvartį Europos čempionato atrankos rungtynėse Islandijoje. Po pirmo kėlinio latviai atsiliko 0:2, bet Aleksandro Cauņos ir Šabalos įvarčiai lėmė lygiąsias 2:2.',
 'Valērijs Šabala lõi 10. oktoobril 2015 Islandil Euroopa meistrivõistluste valikmängus Läti viigivärava. Poolajaks oli Läti 0:2 taga, ent Aleksandrs Cauņa ja Šabala tabamused tõid 2:2 viigi.'
]);
add('Tamāra',[],[
 'Tamāra vārdnīcā saistīta ar ebreju tāmār — «dateļpalma». Avots piesardzīgi piemin arī tamarisku; tas ir cits augs, un abi skaidrojumi nav sapludināmi. Šķirklī minētas arī vārda īsās un pamazināmās formas.',
 'Tamāra словарь связывает с еврейским tāmār, «финиковая пальма». Источник предположительно упоминает и тамариск — другое растение, поэтому объяснения не объединяются. В статье приведены также краткие и уменьшительные формы.',
 'The dictionary connects Tamāra with Hebrew tāmār, date palm. It also tentatively mentions tamarisk, a different plant, so the two explanations remain distinct. Short and diminutive forms are also listed in the entry.',
 'Žodynas Tamāra sieja su hebrajų tāmār „datulinė palmė“. Atsargiai minimas ir tamariskas — kitas augalas, todėl aiškinimai nesuplakami. Įraše taip pat pateiktos trumposios ir mažybinės formos.',
 'Sõnaraamat seob Tamāra heebrea tāmāriga, datlipalm. Oletuslikult mainitakse ka tamariskipuud, mis on teine taim, nii et seletused jäävad eraldi. Kirje loetleb ka lühi- ja hellitusvorme.'
],[
 'Latvijas liecība katalogā saistīta ar Rīgu un 19. gadsimta pēdējo ceturksni. Kalendāra ieraksts dots 1910. gadā. Pirmais datējums saglabā vesela ceturkšņa plašumu, nevis izdomātu precīzu gadu; otrs raksturo kalendāra vēsturi.',
 'Латвийское свидетельство каталог относит к Риге и последней четверти XIX века. Календарная запись указана за 1910 год. Первая дата сохраняет широту периода, без вымышленного точного года; вторая относится к истории календаря.',
 'The Latvian attestation is placed in Riga in the last quarter of the nineteenth century. The calendar entry is dated 1910. The first keeps the source’s quarter-century precision rather than an invented exact year; the second belongs to calendar history.',
 'Latvijos paliudijimas kataloge siejamas su Ryga ir XIX amžiaus paskutiniu ketvirčiu. Kalendoriaus įrašas datuojamas 1910 metais. Pirmasis išlaiko viso ketvirčio tikslumą be išgalvotų konkrečių metų, antrasis priklauso kalendoriaus istorijai.',
 'Läti kasutusnäide paigutatakse Riiga 19. sajandi viimasesse veerandisse. Kalendrikande aastaks antakse 1910. Esimene säilitab allika veerandsajandi täpsuse väljamõeldud aastaarvu asemel; teine kirjeldab kalendrilugu.'
],1910);
add('Jana',['https://www.literatura.lv/personas/jana-egle'],[
 'Jana vārdnīcā ir Johanna forma, savukārt Johanna saistīta ar Johannes. Saimes ebreju pamats Yōḥānān skaidrots kā «Jahve parādījis žēlastību». Šī dokumentētā norāžu ķēde sasaista īso formu ar plašo starptautisko vārdu saimi.',
 'Jana в словаре — форма Johanna, которая связана с Johannes. Еврейская основа семьи Yōḥānān объясняется как «Яхве проявил милость». Документированная цепочка отсылок связывает краткую форму с большой международной семьёй имён.',
 'The dictionary lists Jana as a form of Johanna, in turn connected to Johannes. The family’s Hebrew Yōḥānān is explained as Yahweh has shown grace. This documented chain links the short form with the wider international name family.',
 'Žodynas Jana pateikia kaip Johanna formą, o Johanna sieja su Johannes. Hebrajiškas šeimos pagrindas Yōḥānān aiškinamas „Jahvė parodė malonę“. Dokumentuota nuorodų grandinė sieja trumpąją formą su tarptautine vardų šeima.',
 'Sõnaraamat esitab Jana Johanna vormina ja seob Johanna Johannesega. Nimepere heebrea Yōḥānān tähendab seletuses Jahve on osutanud armu. See dokumenteeritud viiteahel seob lühivormi laia rahvusvahelise nimeperega.'
],[
 'Janas Egles stāstu krājums «Gaismā» iznāca 2016. gadā. Viņas stāsts «Bedre» vēlāk kļuva par pamatu Daces Pūces 2021. gada spēlfilmai ar tādu pašu nosaukumu. Šis ir konkrēts prozas darba ceļš no grāmatas uz kino.',
 'Сборник рассказов Яны Эгле «Gaismā» вышел в 2016 году. Её рассказ «Bedre» позднее лёг в основу одноимённого фильма Даце Пуце 2021 года. Это конкретный путь прозаического произведения от книги к кино.',
 'Jana Egle published the story collection Gaismā in 2016. Her story Bedre later became the basis for Dace Pūce’s 2021 feature of the same name, a concrete passage from prose to the cinema.',
 'Janos Egles apsakymų rinkinys „Gaismā“ pasirodė 2016 metais. Jos apsakymas „Bedre“ vėliau tapo Daces Pūces 2021 metų to paties pavadinimo filmo pagrindu — konkrečiu prozos keliu į kiną.',
 'Jana Egle jutukogu „Gaismā“ ilmus 2016. aastal. Tema jutt „Bedre“ sai hiljem Dace Pūce 2021. aasta samanimelise mängufilmi aluseks. See on konkreetne teekond proosast kinolinale.'
]);
add('Sintija',['https://www.behindthename.com/name/cynthia'],[
 'Sintija vārdnīcā ir Kintija forma, kas saistīta ar grieķu Kynthia — «sieviete no Kinta». Tas bija Artemīdas epitets. Grieķu mītā Kints ir kalns Dēlas salā, kur dzimusi dieviete un viņas dvīņubrālis Apollons.',
 'Sintija в словаре — форма Kintija, связанная с греческим Kynthia, «женщина с Кинфа». Это был эпитет Артемиды. В греческом мифе Кинф — гора на Делосе, где родились богиня и её брат-близнец Аполлон.',
 'The dictionary lists Sintija as a form of Kintija, connected with Greek Kynthia, woman from Cynthus, an epithet of Artemis. In Greek myth Cynthus is the mountain on Delos where the goddess and her twin brother Apollo were born.',
 'Žodyne Sintija yra Kintija forma, susijusi su graikų Kynthia „moteris iš Kinto“, Artemidės epitetu. Graikų mite Kintas yra Delo salos kalnas, kuriame gimė deivė ir jos dvynys brolis Apolonas.',
 'Sõnaraamat nimetab Sintijat Kintija vormiks, mis seostub kreeka Kynthiaga, naine Kynthoselt, Artemise epiteediga. Kreeka müüdis on Kynthos mägi Delose saarel, kus sündisid jumalanna ja tema kaksikvend Apollon.'
],[
 'Sintija kalendāra ierakstam katalogs dod 1970. gadu. Šī liecība stāsta par formas vietu Latvijas kalendāru tradīcijā. Tā pati par sevi nenosaka, kad dzimusi pirmā šī vārda nesēja vai kādā valodā konkrēta ģimene to pirmoreiz iepazinusi.',
 'Календарную запись Sintija каталог датирует 1970 годом. Это свидетельство места формы в латвийской календарной традиции. Оно само по себе не определяет рождение первой носительницы или язык, через который имя узнала отдельная семья.',
 'The catalogue dates Sintija’s calendar entry to 1970. This places the form in Latvian calendar tradition. It does not by itself identify the birth of the earliest bearer or the language through which an individual family encountered it.',
 'Sintija kalendoriaus įrašą katalogas datuoja 1970 metais. Tai formos vietos Latvijos kalendoriaus tradicijoje liudijimas. Jis savaime nenustato pirmos turėtojos gimimo ar kalbos, per kurią vardą pažino konkreti šeima.',
 'Sintija kalendrikande aastaks annab kataloog 1970. See paigutab nimekuju Läti kalendritraditsiooni. Üksi ei määra see esimese nimekandja sündi ega keelt, mille kaudu konkreetne pere nimega tutvus.'
],1970);
add('Artis',['https://www.literatura.lv/personas/artis-ostups'],[
 'Artis cilmei vārdnīca atstāj divas iespējas: Arturs formu vai salīdzinājumu ar latīņu ars — «amats, māksla, zināšanas». Tās ir atšķirīgas izcelsmes versijas; latīņu vārda tulkojums pats par sevi nepierāda visu Artis nesēju vārda cilmi.',
 'Для Artis словарь оставляет две возможности: форму Arturs или сравнение с латинским ars, «ремесло, искусство, знание». Это разные версии происхождения; перевод латинского слова сам по себе не доказывает этимологию имени каждого носителя.',
 'The dictionary leaves two possibilities for Artis: a form of Arturs or a comparison with Latin ars, craft, art or knowledge. These are different origin accounts; translating the Latin word alone does not establish every bearer’s naming history.',
 'Artis kilmei žodynas palieka dvi galimybes: Arturs formą arba palyginimą su lotynų ars „amatas, menas, žinios“. Tai skirtingos versijos; vien lotyniško žodžio vertimas nenustato kiekvieno turėtojo vardo istorijos.',
 'Artise puhul jätab sõnaraamat kaks võimalust: Artursi vormi või võrdluse ladina ars’iga, oskus, kunst või teadmised. Need on eri päritoluseletused; ladina sõna tõlge üksi ei tõesta iga nimekandja nimevaliku lugu.'
],[
 'Artis Ostups debitēja ar dzejoļu krājumu «Biedrs Sniegs» 2010. gadā. Tam sekoja «Fotogrāfija un šķēres» (2013) un «Žesti» (2016). 2014. gadā viņš kopā ar Justīni Janpauli un Igoru Gubenko izveidoja žurnālu «Punctum».',
 'Артис Оступс дебютировал со сборником «Biedrs Sniegs» в 2010 году; затем вышли «Fotogrāfija un šķēres» (2013) и «Žesti» (2016). В 2014 году он вместе с Юстине Янпауле и Игорем Губенко создал журнал Punctum.',
 'Artis Ostups debuted with Biedrs Sniegs in 2010, followed by Fotogrāfija un šķēres (2013) and Žesti (2016). In 2014 he founded the journal Punctum with Justīne Janpaule and Igors Gubenko.',
 'Artis Ostups debiutavo rinkiniu „Biedrs Sniegs“ 2010 metais; vėliau pasirodė „Fotogrāfija un šķēres“ (2013) ir „Žesti“ (2016). 2014 metais su Justīne Janpaule ir Igors Gubenko įkūrė žurnalą „Punctum“.',
 'Artis Ostups debüteeris koguga „Biedrs Sniegs“ 2010. aastal, järgnesid „Fotogrāfija un šķēres“ (2013) ja „Žesti“ (2016). 2014 asutas ta koos Justīne Janpaule ja Igors Gubenkoga ajakirja Punctum.'
]);
add('Sarmīte',[],[
 'Sarmīte vārdnīcā ievietota pie Sarma; atsevišķs saknes tulkojums Sarmīte šķirklī nav dots. Tādēļ droši norādāma avotā dokumentētā saikne ar Sarma, nevis patstāvīgi izdomāta cita vārda vai svešvalodas cilme.',
 'Sarmīte в словаре помещено при Sarma; отдельного перевода корня для Sarmīte не дано. Поэтому можно указать документированную связь с Sarma, не придумывая самостоятельное происхождение из другого имени или иностранного слова.',
 'The dictionary places Sarmīte under Sarma without giving it a separate root gloss. The documented relationship with Sarma can be stated; a different name or foreign-language origin should not be invented to replace that evidence.',
 'Žodyne Sarmīte pateikta prie Sarma be atskiro šaknies vertimo. Galima nurodyti dokumentuotą ryšį su Sarma, bet jo nepakeisti išgalvota kilme iš kito vardo ar svetimos kalbos žodžio.',
 'Sõnaraamat paigutab Sarmīte Sarma alla eraldi juuretõlget andmata. Dokumenteeritud seost Sarmaga saab nimetada, asendamata seda väljamõeldud algupäraga mõnest teisest nimest või võõrkeelsest sõnast.'
],[
 'Katalogs Sarmīte personas vārda liecību datē ar 1922. gadu un kalendāra ierakstu ar 1925. gadu. Trīs gadu atstatums parāda divus dažādus pierādījumu veidus: vārda lietojumu un tā iekļaušanu kalendārā, nevis vārda radīšanas brīdi.',
 'Каталог датирует свидетельство Sarmīte как личного имени 1922 годом, календарную запись — 1925 годом. Разница в три года относится к разным видам свидетельств: употреблению имени и включению в календарь, а не к его созданию.',
 'The catalogue dates a personal-name record of Sarmīte to 1922 and a calendar entry to 1925. The three-year interval separates two kinds of evidence: use of the name and its calendar inclusion, rather than a moment of invention.',
 'Katalogas Sarmīte asmenvardžio paliudijimą datuoja 1922 metais, kalendoriaus įrašą — 1925 metais. Trejų metų tarpas skiria du liudijimus: vardo vartojimą ir įtraukimą į kalendorių, o ne vardo sukūrimą.',
 'Kataloog dateerib Sarmīte isikunimekirje 1922. ja kalendrikande 1925. aastasse. Kolmeaastane vahe eristab kaht tõendiliiki: nime kasutamist ja selle kalendrisse võtmist, mitte nime loomise hetke.'
],1925);
add('Evelīna',['https://www.literatura.lv/personas/evelina-gramatniece'],[
 'Evelīna cilme tieši šai rakstībai izmantotajā vārdnīcas materiālā nav noteikta. Katalogs nošķir to no Evelina ar īso i. Līdzīgs skanējums bez papildu pierādījuma neļauj vienai formai piešķirt otras vēsturiskos datumus un skaidrojumu.',
 'Для точного написания Evelīna использованный словарный материал не устанавливает происхождение. Каталог отличает его от Evelina с кратким i. Сходное звучание без дополнительных свидетельств не позволяет переносить даты и объяснение одной формы на другую.',
 'The consulted dictionary material does not establish an origin for the exact spelling Evelīna. The catalogue distinguishes it from Evelina with a short i. Similar sound alone does not transfer the other form’s historical dates or explanation.',
 'Naudota žodyno medžiaga nenustato būtent Evelīna rašybos kilmės. Katalogas skiria ją nuo Evelina su trumpuoju i. Vien panašus skambesys neleidžia perkelti kitos formos istorinių datų ir aiškinimo.',
 'Kasutatud sõnaraamatumaterjal ei määra täpse kirjapildi Evelīna päritolu. Kataloog eristab seda lühikese i-ga Evelinast. Üksi sarnane kõla ei kanna üle teise vormi ajaloolisi daatumeid ega seletust.'
],[
 'Evelīna Grāmatniece pirmo dzejoli «Piesnigušā mežā» publicēja 1915. gada 30. janvārī «Jauno Latviešu Avīžu» literārajā pielikumā. Viņas komēdiju «Jaunsaimnieka līgava» 1936. gadā iestudēja Liepājā, vēlāk arī latviešu teātra kopas trimdā.',
 'Эвелина Граматниеце опубликовала первое стихотворение «Piesnigušā mežā» 30 января 1915 года в литературном приложении «Jauno Latviešu Avīžu». Её комедию «Jaunsaimnieka līgava» поставили в Лиепае в 1936 году, позднее — латышские театральные группы в эмиграции.',
 'Evelīna Grāmatniece published her first poem, Piesnigušā mežā, on 30 January 1915 in the literary supplement of Jauno Latviešu Avīžu. Her comedy Jaunsaimnieka līgava was staged in Liepāja in 1936 and later by Latvian theatre groups in exile.',
 'Evelīna Grāmatniece pirmą eilėraštį „Piesnigušā mežā“ paskelbė 1915 metų sausio 30 dieną „Jauno Latviešu Avīžu“ literatūriniame priede. Komedija „Jaunsaimnieka līgava“ 1936 metais pastatyta Liepojoje, vėliau — latvių tremties teatro grupių.',
 'Evelīna Grāmatniece avaldas esimese luuletuse „Piesnigušā mežā“ 30. jaanuaril 1915 lehe Jauno Latviešu Avīžu kirjanduslisas. Komöödia „Jaunsaimnieka līgava“ lavastati Liepājas 1936 ning hiljem välisläti teatritruppides.'
]);
add('Daina',['https://www.literatura.lv/personas/daina-avotina'],[
 'Daina ir personvārds, kas veidots no latviešu vārda daina — «tautasdziesma». Vārdnīca to skaidro kā vietējā vārda izmantojumu cilvēka vārdā. Tajā pašā saimē ir vīriešu forma Dainis, tāpēc saikne ar dziesmu saglabājas abās formās.',
 'Daina образовано от латышского daina, «народная песня». Словарь объясняет его как использование местного слова в личном имени. К той же семье относится мужское Dainis: связь с песней сохраняется в обеих формах.',
 'Daina is formed from Latvian daina, folk song. The dictionary explains it as a local word used as a personal name. The masculine Dainis belongs to the same family, preserving the song connection in both forms.',
 'Daina sudaryta iš latvių žodžio daina „liaudies daina“. Žodynas ją aiškina kaip vietinį žodį, vartojamą asmenvardžiui. Tai pačiai šeimai priklauso vyriškas Dainis, tad ryšys su daina išlieka abiejose formose.',
 'Daina on moodustatud läti sõnast daina, rahvalaul. Sõnaraamat seletab seda kohaliku sõna kasutamisena isikunimena. Samasse perre kuulub mehenimi Dainis, nii et seos lauluga säilib mõlemas vormis.'
],[
 'Daina Avotiņa rakstīja un tulkoja, īpaši veicinot latviešu un lietuviešu literatūras sakarus. 2018. gadā iznāca «Soliņš pie Salacas», viņas sarakste ar lietuviešu dzejnieku Alfonu Maldoni. Vārds šeit saistās ar īstu divu literatūru dialogu.',
 'Дайна Авотиня писала и переводила, развивая связи латышской и литовской литератур. В 2018 году вышла книга «Soliņš pie Salacas» — её переписка с литовским поэтом Альфонсасом Малдонисом, настоящий диалог двух литератур.',
 'Daina Avotiņa wrote and translated, fostering exchanges between Latvian and Lithuanian literature. Soliņš pie Salacas appeared in 2018, publishing her correspondence with Lithuanian poet Alfonsas Maldonis, a real dialogue between two literary cultures.',
 'Daina Avotiņa rašė ir vertė, plėtodama latvių ir lietuvių literatūrų ryšius. 2018 metais išleista „Soliņš pie Salacas“ — jos susirašinėjimas su lietuvių poetu Alfonsu Maldoniu, tikras dviejų literatūrų dialogas.',
 'Daina Avotiņa kirjutas ja tõlkis, arendades läti ja leedu kirjanduse sidemeid. 2018 ilmus „Soliņš pie Salacas“, tema kirjavahetus leedu luuletaja Alfonsas Maldonisega: kahe kirjanduskultuuri tegelik vestlus.'
]);
