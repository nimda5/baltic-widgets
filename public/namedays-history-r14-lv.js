// 14 November: documented forms only; unresolved comparisons are stored separately.
export const historiesLatvianR14={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
function add(name,origin,story,extra=[],year){historiesLatvianR14[name]={sources:[cat(name),...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i].replaceAll('{name}',name),story[i].replaceAll('{name}',name)]])),...(year?{calendar_entry_year:year}:{})};}
const peace=[
 '{name} pieder Fridrihs vārdu saimei. Vārdnīca tās pamatu skaidro ar senaugšvācu fridu, «miers», un rīchi, «varens, stiprs; valdnieks». Šie vēsturiskie elementi raksturo vārda veidošanos, nevis paredz tā nesēja raksturu.',
 '{name} относится к семье Fridrihs. Словарь объясняет её основу древневерхненемецкими fridu, «мир», и rīchi, «могучий, сильный; правитель». Исторические элементы рассказывают об образовании имени, а не предсказывают характер человека.',
 '{name} belongs to the Fridrihs family. The dictionary explains its basis through Old High German fridu, peace, and rīchi, mighty or strong, ruler. These historical elements describe the name’s formation rather than predict its bearer’s character.',
 '{name} priklauso Fridrihs vardų šeimai. Žodynas jos pagrindą aiškina senosios vokiečių aukštaičių kalbos fridu „taika“ ir rīchi „galingas, stiprus; valdovas“. Istoriniai dėmenys pasakoja apie vardo susidarymą, o ne numato žmogaus būdą.',
 '{name} kuulub Fridrihsi nimeperre. Sõnaraamat seletab selle alust vanaülemsaksa osadega fridu, rahu, ja rīchi, vägev või tugev, valitseja. Ajaloolised nimeosad kirjeldavad nime kujunemist, mitte ei ennusta nimekandja iseloomu.'
];
const record=(dates,year)=>[
 `Katalogs dokumentē {name} ${dates[0]}.${year?` Kalendāra ieraksts datēts ar ${year}. gadu.`:''} Tā ir konkrēta rakstības vēstures liecība. Atrastais pieraksts rāda vārda lietojumu avotā, bet nepierāda, ka pats vārds būtu radīts tieši tajā laikā.`,
 `Каталог документирует {name} ${dates[1]}.${year?` Календарная запись датирована ${year} годом.`:''} Это конкретное свидетельство истории написания. Найденная запись показывает употребление имени в источнике, но не доказывает, что само имя было создано именно тогда.`,
 `The catalogue documents {name} ${dates[2]}.${year?` Its calendar entry is dated ${year}.`:''} This is a specific record in the spelling’s history. The surviving attestation demonstrates use in that source, rather than proving that the name itself was created at that time.`,
 `Katalogas {name} dokumentuoja ${dates[3]}.${year?` Kalendoriaus įrašas datuojamas ${year} metais.`:''} Tai konkretus rašybos istorijos liudijimas. Rastas įrašas rodo vardo vartojimą šaltinyje, bet neįrodo, kad pats vardas buvo sukurtas būtent tuo metu.`,
 `Kataloog dokumenteerib nime {name} ${dates[4]}.${year?` Kalendrikirje on dateeritud aastaga ${year}.`:''} See on kirjapildi ajaloo konkreetne tõend. Säilinud kirje näitab nime kasutust selles allikas, mitte ei tõesta nime loomist just sel ajal.`
];
add('Fricis',[
 'Fricis vārdnīcā norādīts pie Fridrihs. Tādējādi latviešu īsākā forma saistīta ar senaugšvācu fridu, «miers», un rīchi, «varens; valdnieks». Saikni pamato tieša vārdnīcas norāde, nevis mēģinājums tulkot Fricis kā parastu latviešu vārdu.',
 'Fricis словарь отсылает к Fridrihs. Латышская краткая форма тем самым связана с древневерхненемецкими fridu, «мир», и rīchi, «могучий; правитель». Основание — прямая словарная отсылка, а не попытка перевести Fricis как обычное латышское слово.',
 'The dictionary places Fricis under Fridrihs, connecting the shorter Latvian form with Old High German fridu, peace, and rīchi, mighty or ruler. The relationship rests on an explicit cross-reference rather than an attempt to translate Fricis as an ordinary Latvian word.',
 'Žodynas Fricis pateikia prie Fridrihs, taip susiedamas trumpesnę latvišką formą su senosios vokiečių aukštaičių kalbos fridu „taika“ ir rīchi „galingas; valdovas“. Ryšys paremtas tiesiogine nuoroda, o ne bandymu versti Fricis kaip paprastą latvių kalbos žodį.',
 'Sõnaraamat esitab Fricise Fridrihsi juures, sidudes lühema läti vormi vanaülemsaksa osadega fridu, rahu, ja rīchi, vägev või valitseja. Seos põhineb otsesel ristviitel, mitte katsel tõlkida Fricist tavalise läti sõnana.'
],record(['Bīriņos 1638. gadā','в Бирини в 1638 году','in Bīriņi in 1638','Byriniuose 1638 metais','Bīriņis 1638. aastal'],1889),[cat('Fridrihs')],1889);
add('Frederiks',[
 'Frederiks vārdnīcā ir Fridrihs lejasvācu forma. Vārdu saimes senākie elementi ir fridu, «miers», un rīchi, «varens; valdnieks». Šeit lejasvācu forma ir dokumentēts pārneses posms, nevis tikai līdzība ar angļu Frederick.',
 'Frederiks словарь называет нижненемецкой формой Fridrihs. Древние элементы семьи — fridu, «мир», и rīchi, «могучий; правитель». Нижненемецкая форма здесь представляет документированный путь передачи, а не одно лишь сходство с английским Frederick.',
 'The dictionary identifies Frederiks as a Low German form of Fridrihs. The family’s older elements are fridu, peace, and rīchi, mighty or ruler. The Low German form is a documented transmission stage, beyond a resemblance to English Frederick.',
 'Žodynas Frederiks nurodo kaip Fridrihs žemaičių vokiečių kalbos formą. Senieji šeimos dėmenys — fridu „taika“ ir rīchi „galingas; valdovas“. Ši forma yra dokumentuotas perteikimo etapas, o ne vien panašumas į anglų Frederick.',
 'Sõnaraamat nimetab Frederiksi Fridrihsi alamsaksa vormiks. Nimepere vanemad osad on fridu, rahu, ja rīchi, vägev või valitseja. Alamsaksa vorm on dokumenteeritud ülekandeetapp, mitte üksnes sarnasus inglise Frederickiga.'
],record(['1522. gadā','в 1522 году','in 1522','1522 metais','1522. aastal']),[cat('Fridrihs')]);
add('Friderika',peace,record(['Ēdolē 1829. gadā','в Эдоле в 1829 году','in Ēdole in 1829','Ėduolėje 1829 metais','Ēdoles 1829. aastal'],1767),[cat('Fridrihs')],1767);
add('Fridrihs',peace,record(['Burtniekos 1638. gadā','в Буртниеки в 1638 году','in Burtnieki in 1638','Burtniekuose 1638 metais','Burtniekis 1638. aastal'],1901),[],1901);
add('Spricis',[
 'Spricis vārdnīcas norāžu ķēdē saistīts ar Fricis un tālāk ar Fridrihs. Tādēļ tā saime ved pie senaugšvācu fridu, «miers», un rīchi, «varens; valdnieks». Šis skaidrojums attiecas uz personvārdu; tādu pašu uzvārdu nevar izmantot kā vienīgo cilmes pierādījumu.',
 'Spricis словарной цепочкой связан с Fricis, а затем с Fridrihs. Поэтому его семья ведёт к древневерхненемецким fridu, «мир», и rīchi, «могучий; правитель». Это объяснение личного имени; одноимённая фамилия сама по себе не доказывает его происхождение.',
 'The dictionary cross-references Spricis to Fricis and then Fridrihs, connecting its family with Old High German fridu, peace, and rīchi, mighty or ruler. This concerns the given name; an identical surname would not alone establish its origin.',
 'Žodyno nuorodų grandinė Spricis sieja su Fricis ir toliau su Fridrihs, taigi su senosios vokiečių aukštaičių kalbos fridu „taika“ ir rīchi „galingas; valdovas“. Tai asmenvardžio aiškinimas; tokia pati pavardė pati savaime neįrodo vardo kilmės.',
 'Sõnaraamatu ristviited seovad Spricise Fricise ja seejärel Fridrihsiga, viies vanaülemsaksa osadeni fridu, rahu, ja rīchi, vägev või valitseja. See puudutab eesnime; samasugune perekonnanimi üksi ei tõestaks selle päritolu.'
],record(['Apriķos 1742. gadā','в Априки в 1742 году','in Apriķi in 1742','Aprikiuose 1742 metais','Apriķis 1742. aastal'],1817),[cat('Fricis'),cat('Fridrihs')],1817);
add('Frederika',[
 'Frederika ir dokumentēts angļu Frederica atveidojums latviešu valodā. Frederica ir Frederick sieviešu forma; saimes pamatā ir ģermāņu elementi «miers» un «valdnieks». Šo konkrēto atbilsmi apstiprina Valodas aģentūras tabula, nevis tikai salīdzinājums ar Friderika.',
 'Frederika документировано как латышская передача английского Frederica. Frederica — женская форма Frederick; основа семьи — германские элементы «мир» и «правитель». Конкретное соответствие подтверждает таблица Языкового агентства, а не одно сравнение с Friderika.',
 'Frederika is a documented Latvian rendering of English Frederica, a feminine form of Frederick. The family is based on Germanic elements for peace and ruler. The Language Agency’s table establishes this particular correspondence, beyond a comparison with Friderika.',
 'Frederika dokumentuota kaip anglų Frederica perteikimas latvių kalba. Frederica yra moteriška Frederick forma; šeimos pagrindas — germaniški dėmenys „taika“ ir „valdovas“. Konkrečią atitiktį patvirtina Kalbos agentūros lentelė, o ne vien palyginimas su Friderika.',
 'Frederika on dokumenteeritud inglise Frederica läti vastena. Frederica on Fredericki naissoovorm ning nimepere aluseks on germaani osad rahu ja valitseja. Keeleagentuuri tabel kinnitab just seda vastavust, mitte ainult võrdlust Friderikaga.'
],[
 'Ahero 2006. gada angļu īpašvārdu rokasgrāmatas 102. lappuse ir aģentūras norādītais avots gan Frederīka, gan Frederika atveidojumam. Abas rakstības tabulā ir dotas atsevišķi. Tas dokumentē atveides tradīciju, bet nedatē Frederika pirmo dzimšanas reģistra ierakstu Latvijā.',
 'Агентство ссылается на страницу 102 справочника передачи английских имён Аhero 2006 года для двух вариантов — Frederīka и Frederika. Написания даны отдельными строками. Это свидетельство традиции передачи, а не дата первой записи Frederika в латвийском реестре рождений.',
 'The agency cites page 102 of Ahero’s 2006 English-name rendering manual for both Frederīka and Frederika, listed separately in its table. This documents a rendering tradition, rather than dating Frederika’s first appearance in a Latvian birth register.',
 'Agentūra abiem variantams — Frederīka ir Frederika — nurodo Ahero 2006 metų angliškų vardų perteikimo vadovo 102 puslapį. Rašybos pateiktos atskiromis eilutėmis. Tai perteikimo tradicijos liudijimas, o ne pirmojo Frederika įrašo Latvijos gimimų registre data.',
 'Agentuur viitab nii Frederīka kui ka Frederika puhul Ahero 2006. aasta inglise nimede käsiraamatu leheküljele 102. Kirjapildid on tabelis eraldi ridadel. See dokumenteerib edasiandmise tava, mitte Frederika esimest Läti sünniregistri kirjet.'
],['https://www.personvarduatveide.lv/words/28368%2C28369.pdf?locale=lv','https://www.behindthename.com/name/frederica','https://www.behindthename.com/name/frederick']);
add('Frīdrihs',peace,[
 'Valodas aģentūra vācu Friedrich atveido kā Frīdrihs, atsaucoties uz L. Ceplīša 1960. gada vācu īpašvārdu norādījumu 61. lappusi. Šī liecība apstiprina tieši garo ī. Fridrihs agrāko Burtnieku ierakstu tā nepārvērš par Frīdrihs pirmā pieraksta datumu.',
 'Языковое агентство передаёт немецкое Friedrich как Frīdrihs, ссылаясь на страницу 61 указаний по немецким именам под редакцией L. Ceplītis 1960 года. Это подтверждает именно долгую ī. Ранняя запись Fridrihs в Буртниеки не становится первой записью Frīdrihs.',
 'The Language Agency renders German Friedrich as Frīdrihs, citing page 61 of L. Ceplītis’s 1960 German-name guidelines. This establishes the exact long-ī spelling. It does not turn the earlier Burtnieki record for Fridrihs into a first-attestation date for Frīdrihs.',
 'Kalbos agentūra vokiečių Friedrich perteikia kaip Frīdrihs, nurodydama L. Ceplīčio 1960 metų vokiškų vardų gairių 61 puslapį. Tai patvirtina būtent rašybą su ilgąja ī. Ankstesnis Fridrihs įrašas Burtniekuose netampa pirmuoju Frīdrihs paliudijimu.',
 'Keeleagentuur annab saksa Friedrichi vasteks Frīdrihs, viidates L. Ceplītise 1960. aasta saksa nimede juhendi leheküljele 61. See kinnitab just pika ī-ga kirjapildi. Fridrihsi varasem Burtnieki kirje ei muutu sellega Frīdrihsi esmakirjeks.'
],['https://www.personvarduatveide.lv/words/39362.pdf?locale=en',cat('Fridrihs'),'https://www.behindthename.com/name/frederick']);
add('Frideriks',[
 'Frideriks ir dokumentēta poļu Fryderyk atveide latviešu valodā: Nacionālā enciklopēdija šo pāri dod Šopēna šķirklī. Fryderyk ir Frederick saimes poļu forma ar ģermāņu elementiem «miers» un «valdnieks». Tādēļ saikne nav jāizsecina tikai no burtu līdzības.',
 'Frideriks документировано как латышская передача польского Fryderyk: Национальная энциклопедия приводит эту пару в статье о Шопене. Fryderyk — польская форма семьи Frederick с германскими элементами «мир» и «правитель». Связь не приходится угадывать по сходству букв.',
 'Frideriks is a documented Latvian rendering of Polish Fryderyk: the National Encyclopaedia gives the pair in its Chopin entry. Fryderyk is a Polish form in the Frederick family, with Germanic elements for peace and ruler. The relationship need not be guessed from similar letters.',
 'Frideriks dokumentuotas kaip lenkų Fryderyk perteikimas latvių kalba: šią porą Nacionalinė enciklopedija pateikia Chopino straipsnyje. Fryderyk yra Frederick šeimos lenkiška forma su germaniškais dėmenimis „taika“ ir „valdovas“. Ryšio nereikia spėti iš raidžių panašumo.',
 'Frideriks on dokumenteeritud poola Fryderyki läti vastena: Rahvusentsüklopeedia annab selle paari Chopini artiklis. Fryderyk on Fredericki nimepere poola vorm germaani osadega rahu ja valitseja. Seost ei pea oletama sarnaste tähtede põhjal.'
],[
 'Enciklopēdija stāsta, ka Frideriks Šopēns Parīzē ieradās 1831. gada 5. oktobrī. Šajā pilsētā izveidojās viņa vēlākās profesionālās dzīves centrs. Tas ir konkrēts komponista dzīves notikums; viņa vārda latviskais atveidojums nenozīmē, ka pats komponists bijis latvietis.',
 'Энциклопедия сообщает, что Frideriks Šopēns прибыл в Париж 5 октября 1831 года. Город стал центром его дальнейшей профессиональной жизни. Это конкретное событие биографии; латышская передача имени не означает, что композитор был латышом.',
 'The encyclopaedia records Frideriks Šopēns arriving in Paris on 5 October 1831. The city became the centre of his later professional life. This is a specific event in the composer’s biography; the Latvian rendering of his name does not make him a Latvian composer.',
 'Enciklopedija nurodo, kad Frideriks Šopēns į Paryžių atvyko 1831 metų spalio 5 dieną. Miestas tapo jo tolesnio profesinio gyvenimo centru. Tai konkretus kompozitoriaus biografijos įvykis; latviškas vardo perteikimas nereiškia, kad pats kompozitorius buvo latvis.',
 'Entsüklopeedia järgi saabus Frideriks Šopēns Pariisi 5. oktoobril 1831. Linnast sai tema hilisema tööelu keskus. See on konkreetne sündmus helilooja eluloos; nime lätikeelne kuju ei tähenda, et helilooja ise oleks olnud lätlane.'
],['https://enciklopedija.lv/skirklis/247143','https://www.behindthename.com/name/fryderyk','https://www.behindthename.com/name/frederick']);
const conquer=[
 '{name} vārdnīcas norāžu ķēdē saistīts ar Vincentijs. Saimes pamatā ir latīņu vincens, «uzvarošs», no darbības vārda vincere, «uzvarēt». Tas ir vēsturiskā pamata skaidrojums, nevis solījums, ka vārda nesējs vienmēr uzvarēs.',
 '{name} словарной цепочкой связан с Vincentijs. Основа семьи — латинское vincens, «побеждающий», от глагола vincere, «побеждать». Это объяснение исторической основы, а не обещание, что носитель имени всегда будет побеждать.',
 '{name} is linked through dictionary cross-references to Vincentijs. The family is based on Latin vincens, conquering, from vincere, to conquer. This explains the historical basis rather than promising that a person with the name will always win.',
 '{name} žodyno nuorodų grandine siejamas su Vincentijs. Šeimos pagrindas — lotynų vincens „nugalintis“, iš veiksmažodžio vincere „nugalėti“. Tai istorinio pagrindo aiškinimas, o ne pažadas, kad vardo turėtojas visada laimės.',
 '{name} seostub sõnaraamatu ristviidete kaudu Vincentijsiga. Nimepere alus on ladina vincens, võitev, tegusõnast vincere, võitma. See seletab ajaloolist alust ega luba, et nimekandja alati võidab.'
];
add('Vincents',conquer,record(['Rēzeknē 1877. gadā','в Резекне в 1877 году','in Rēzekne in 1877','Rėzeknėje 1877 metais','Rēzeknes 1877. aastal'],1925),[cat('Vincentijs'),'https://www.behindthename.com/name/vincent'],1925);
add('Vincens',conquer,record(['1650. gadā','в 1650 году','in 1650','1650 metais','1650. aastal']),[cat('Vincentijs'),'https://www.behindthename.com/name/vincent']);
add('Vincentijs',[
 'Vincentijs vārdnīcā saistīts ar latīņu vincens, «uzvarošs». Starptautiskajā saimē Vincentius ved pie darbības vārda vincere, «uzvarēt». Latviešu galotne pielāgo senāko vārdu valodai; saknes nozīme nav prognoze par konkrēta cilvēka nākotni.',
 'Vincentijs словарь связывает с латинским vincens, «побеждающий». В международной семье Vincentius ведёт к глаголу vincere, «побеждать». Латышское окончание приспосабливает старое имя к языку; значение корня не предсказывает будущее конкретного человека.',
 'The dictionary connects Vincentijs with Latin vincens, conquering. In the international family Vincentius leads to the verb vincere, to conquer. The Latvian ending adapts the older name to the language; the root’s meaning does not predict a particular person’s future.',
 'Žodynas Vincentijs sieja su lotynų vincens „nugalintis“. Tarptautinėje šeimoje Vincentius veda į veiksmažodį vincere „nugalėti“. Latviška galūnė pritaiko senesnį vardą kalbai; šaknies reikšmė nenumato konkretaus žmogaus ateities.',
 'Sõnaraamat seob Vincentijsi ladina sõnaga vincens, võitev. Rahvusvahelises nimeperes viib Vincentius tegusõnani vincere, võitma. Läti lõpp kohandab vanema nime keelele; juure tähendus ei ennusta konkreetse inimese tulevikku.'
],record(['1395. gadā','в 1395 году','in 1395','1395 metais','1395. aastal'],1937),['https://www.behindthename.com/name/vincent'],1937);
add('Vincenta',conquer,record(['19. gadsimta pēdējā ceturksnī','в последней четверти XIX века','in the last quarter of the nineteenth century','XIX amžiaus paskutiniame ketvirtyje','19. sajandi viimasel veerandil']),[cat('Vincentīna'),cat('Vincentijs'),'https://www.behindthename.com/name/vincent']);
for(const [name,year,period] of [['Vikentijs',1889,true],['Vicents',1928,true]])add(name,conquer,[
 `Katalogs ${name} personvārda liecību attiecina uz 20. gadsimta pirmo ceturksni, bet kalendāra ierakstu datē ar ${year}. gadu. Plašais periods saglabā avota precizitāti: tas nav sašaurināts līdz vienam izdomātam gadam un nav sajaukts ar kalendāra datējumu.`,
 `Личную запись ${name} каталог относит к первой четверти XX века, а календарную — к ${year} году. Широкий период сохраняет точность источника: он не сужается до одного вымышленного года и не смешивается с датой календарной записи.`,
 `The catalogue places the personal-name attestation of ${name} in the first quarter of the twentieth century and dates its calendar record to ${year}. The broad period preserves the source’s precision; it is not narrowed to an invented exact year or confused with the calendar date.`,
 `Katalogas ${name} asmenvardžio paliudijimą priskiria XX amžiaus pirmam ketvirčiui, o kalendoriaus įrašą datuoja ${year} metais. Platus laikotarpis išlaiko šaltinio tikslumą: jis nesusiaurinamas iki išgalvotų metų ir nesupainiojamas su kalendoriaus data.`,
 `Kataloog paigutab ${name} isikunimekirje 20. sajandi esimesse veerandisse ja dateerib kalendrikirje aastaga ${year}. Lai periood säilitab allika täpsuse: seda ei kitsendata väljamõeldud aastaks ega aeta segamini kalendriaastaga.`
],[cat('Vincentijs'),...(name==='Vicents'?[cat('Vincents')]:[]),'https://www.behindthename.com/name/vincent'],year);
for(const name of ['Vincentīna','Vincentīne'])add(name,conquer,[
 'Vārdnīcas kopīgais šķirklis Vincentīn/a, -e aptver abas sieviešu formas un norāda uz Vincentīns, tālāk uz Vincentijs. Katalogs šim šķirklim dod Rēzeknes 1877. gada liecību. Tā jāsaglabā kopīgā šķirkļa tvērumā, neizdomājot katrai galotnei atsevišķu pirmās lietošanas datumu.',
 'Общая словарная статья Vincentīn/a, -e охватывает обе женские формы и отсылает к Vincentīns, далее к Vincentijs. Каталог даёт для этой статьи запись в Резекне 1877 года. Она остаётся свидетельством общего словарного гнезда, а не отдельной первой датой для каждого окончания.',
 'The combined dictionary entry Vincentīn/a, -e covers both feminine forms and refers to Vincentīns, then Vincentijs. The catalogue gives a Rēzekne attestation in 1877 for this entry. Its shared-entry scope is retained rather than inventing a separate first-use date for each ending.',
 'Bendras žodyno straipsnis Vincentīn/a, -e apima abi moteriškas formas ir nurodo į Vincentīns, toliau į Vincentijs. Katalogas šiam straipsniui pateikia Rėzeknės 1877 metų liudijimą. Išlaikoma bendro straipsnio aprėptis, neišgalvojant atskiros pirmojo vartojimo datos kiekvienai galūnei.',
 'Sõnaraamatu ühine artikkel Vincentīn/a, -e hõlmab mõlemat naissoovormi ja viitab Vincentīnsile ning edasi Vincentijsile. Kataloog annab artiklile Rēzekne 1877. aasta kirje. Säilitatakse ühise artikli ulatus, mitte ei leiutata kummalegi lõpule eraldi esmakasutusaastat.'
],[cat('Vincentīna'),cat('Vincentijs'),'https://www.behindthename.com/name/vincent']);
add('Vinsents',[
 'Vinsents ir oficiāli dokumentēta angļu Vincent atveide latviešu valodā. Vincent saime nāk no latīņu Vincentius un darbības vārda vincere, «uzvarēt». Saikni pamato Valodas aģentūras precīzā atbilsme; tā nav minēta tikai pēc līdzības ar Vincents.',
 'Vinsents официально документировано как латышская передача английского Vincent. Семья Vincent происходит от латинского Vincentius и глагола vincere, «побеждать». Связь подтверждает точное соответствие Языкового агентства, а не одно сходство с Vincents.',
 'Vinsents is an officially documented Latvian rendering of English Vincent. The Vincent family comes from Latin Vincentius and the verb vincere, to conquer. The Language Agency’s exact correspondence establishes the link, beyond a resemblance to Vincents.',
 'Vinsents oficialiai dokumentuotas kaip anglų Vincent perteikimas latvių kalba. Vincent šeima kilo iš lotynų Vincentius ir veiksmažodžio vincere „nugalėti“. Ryšį pagrindžia tiksli Kalbos agentūros atitiktis, o ne vien panašumas į Vincents.',
 'Vinsents on ametlikult dokumenteeritud inglise Vincenti läti vastena. Vincenti nimepere tuleb ladina Vincentiusest ja tegusõnast vincere, võitma. Keeleagentuuri täpne vastavus kinnitab seost, mitte üksnes sarnasus Vincentsiga.'
],[
 'Ahero 2006. gada angļu īpašvārdu rokasgrāmatas 89. lappuse ir norādīta kā avots diviem atveidojumiem — Vinsents un Vincents. Aģentūra tos rāda atsevišķās tabulas rindās. Šī ir datēta atveides tradīcijas liecība; tā nepārceļ Vincents agrīno Rēzeknes ierakstu uz Vinsents.',
 'Для двух передач — Vinsents и Vincents — агентство ссылается на страницу 89 справочника английских имён Ahero 2006 года и показывает их отдельными строками. Это датированное свидетельство традиции передачи; ранняя запись Vincents в Резекне не переносится на Vinsents.',
 'The agency cites page 89 of Ahero’s 2006 English-name manual for two renderings, Vinsents and Vincents, displayed in separate table rows. This is dated evidence of a rendering tradition; it does not transfer Vincents’s early Rēzekne record to Vinsents.',
 'Abiem perteikimo formoms — Vinsents ir Vincents — agentūra nurodo Ahero 2006 metų angliškų vardų vadovo 89 puslapį ir pateikia jas atskiromis eilutėmis. Tai datuotas perteikimo tradicijos liudijimas; ankstyvas Vincents įrašas Rėzeknėje neperkeliamas Vinsents formai.',
 'Agentuur viitab kahe vaste, Vinsentsi ja Vincentsi puhul Ahero 2006. aasta inglise nimede käsiraamatu leheküljele 89 ning esitab need eraldi tabeliridadel. See on dateeritud edasiandmistava tõend; Vincentsi varast Rēzekne kirjet Vinsentsile üle ei kanta.'
],['https://www.personvarduatveide.lv/words/30051.pdf?locale=en','https://www.behindthename.com/name/vincent']);
