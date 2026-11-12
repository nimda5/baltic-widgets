export const hypothesesLatvianR20={},hypothesesLithuanianR20={},hypothesesEstonianR20={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
function add(target,name,comparison,sources,text){target[name]={comparison,sources,text:Object.fromEntries(langs.map((l,i)=>[l,[text[i].replaceAll('{name}',name)]]))};}
for(const name of ['Anda','Andija','Andīna','Andīne','Andina']){
 const text=[
  '{name} varētu būt saistīts ar Anda saimi, taču tās skaidrojumā joprojām paliek Amanda un Andra iespējas. Tās neļauj izvēlēties vienu pārbaudītu visa vārda nozīmi. Vārdnīcas garā ī un īsā i formas nav automātiski savstarpēji aizstājamas; katrai rakstībai nepieciešams savs tiešs pamatojums.',
  '{name} может относиться к семье Anda, но в её объяснении остаются варианты Amanda и Andra. Они не позволяют выбрать одно проверенное значение всего имени. Формы с долгим ī и кратким i не становятся автоматически взаимозаменяемыми; каждому написанию нужно прямое подтверждение.',
  '{name} may belong to the Anda family, whose explanation still leaves Amanda and Andra possibilities. These do not establish one verified whole-name meaning. Dictionary forms with long ī and short i are not automatically interchangeable; each spelling needs its own direct evidence.',
  '{name} galėtų priklausyti Anda šeimai, kurios aiškinime lieka Amanda ir Andra galimybės. Jos nenustato vienos patikrintos viso vardo reikšmės. Formos su ilguoju ī ir trumpuoju i automatiškai netampa pakeičiamomis; kiekvienai rašybai reikia tiesioginio pagrindo.',
  '{name} võib kuuluda Anda nimeperre, mille seletuses jäävad alles Amanda ja Andra võimalused. Need ei määra üht kontrollitud terviknime tähendust. Sõnaraamatu pika ī ja lühikese i-ga kujud ei ole automaatselt asendatavad; iga kirjapilt vajab oma otsest tõendit.'
 ];
 const sources=[cat(name),cat('Anda')];
 if(name==='Andīna'){
  sources.push('https://www.personvarduatveide.lv/words/28978.pdf?locale=lv');
  const extra=[
   ' Atsevišķi LVA ieraksts, atsaucoties uz 2006. gada rokasgrāmatu, droši dod angļu Undine → Andīna. Tas pievieno dokumentētu atveides ceļu, bet neizšķir visu latviešu nesēju cilmi vai pārējās Anda versijas.',
   ' Отдельно запись LVA со ссылкой на руководство 2006 года надёжно даёт английское Undine → Andīna. Это добавляет документированный путь передачи, не определяя происхождение всех латышских носительниц и не разрешая остальные версии Anda.',
   ' Separately, an LVA record citing a 2006 guide explicitly gives English Undine → Andīna. This adds a documented rendering route without settling every Latvian bearer’s origin or the other Anda proposals.',
   ' Atskirai LVA įrašas, remdamasis 2006 metų vadovu, tiesiogiai pateikia anglų Undine → Andīna. Tai papildomas dokumentuotas perteikimo kelias, nenustatantis visų latvių vardo turėtojų kilmės ir neišsprendžiantis kitų Anda versijų.',
   ' Eraldi annab LVA kirje 2006. aasta juhendile viidates otsese vaste inglise Undine → Andīna. See lisab dokumenteeritud edasiandmistee, lahendamata kõigi läti nimekandjate päritolu või teisi Anda seletusi.'
  ];text.forEach((_,i)=>text[i]+=extra[i]);
 }
 add(hypothesesLatvianR20,name,name==='Andina'?'Andīna':'Anda / Amanda / Andra',sources,text);
}
add(hypothesesLatvianR20,'Nanda','Nana / international Nanda',[cat('Nanda'),'https://www.behindthename.com/name/nanda'],[
 'Nanda starptautiskajā lietojumā var būt sanskrita vārds ar prieka nozīmi, taču tas vēl nepierāda tieši latviešu Nanda cilmi. Latviešu katalogs precīzo formu neatrisina un norāda uz Nana salīdzinājumu. Tādēļ sanskrita skaidrojums šeit ir iespēja, nevis pārbaudīta atbilsme vai visiem nesējiem kopīga vēsture.',
 'В международном употреблении Nanda может быть санскритским именем со значением радости, но это ещё не доказывает происхождение именно латышского Nanda. Латышский каталог не разрешает точную форму и отсылает к сравнению с Nana. Поэтому санскритское объяснение остаётся возможностью, а не проверенным соответствием или общей историей всех носителей.',
 'International Nanda can be a Sanskrit name meaning joy, but this does not establish exact Latvian Nanda’s origin. The Latvian catalogue leaves the form unresolved and points towards a Nana comparison. The Sanskrit explanation therefore remains a possibility rather than a verified correspondence or a shared history for every bearer.',
 'Tarptautiniame vartojime Nanda gali būti sanskrito vardas, reiškiantis džiaugsmą, tačiau tai neįrodo būtent latviško Nanda kilmės. Latvių katalogas tikslios formos nepaaiškina ir nukreipia į Nana palyginimą. Sanskrito aiškinimas lieka galimybė, o ne patikrinta atitiktis ar bendra visų turėtojų istorija.',
 'Rahvusvahelises kasutuses võib Nanda olla sanskriti nimi tähendusega rõõm, kuid see ei tõenda täpse läti Nanda päritolu. Läti kataloog jätab kuju lahtiseks ja viitab võrdlusele Nanaga. Sanskriti seletus jääb seega võimaluseks, mitte kontrollitud vasteks või kõigi nimekandjate ühiseks ajalooks.'
]);
const uncertain={
 'Vīgants':[
  'Vīgants avots līdzās dod lietuviešu vyti, ginti un ganyti un senaugšvācu wigand, «karotājs», neizvēloties vienu cilmi. Tādēļ pilns vārda tulkojums paliek nepārbaudīts. Atsevišķi dokumentēta precīzā forma Allažos 1638. gadā un kalendārā 1767. gadā; šīs ziņas apliecina lietojumu, nevis izvēlas etimoloģiju.',
  'Для Vīgants источник приводит литовские vyti, ginti, ganyti и древневерхненемецкое wigand «воин», не выбирая происхождение. Полный перевод имени остаётся непроверенным. Отдельно документирована точная форма в Аллажи в 1638 году и календаре 1767 года; записи подтверждают употребление, не выбирая этимологию.',
  'For Vīgants the source gives Lithuanian vyti, ginti and ganyti alongside Old High German wigand, warrior, without selecting one origin. A full translation remains unverified. Separately documented are exact Vīgants in Allaži in 1638 and a 1767 calendar entry; these establish use rather than select an etymology.',
  'Vīgants šaltinis pateikia lietuvių vyti, ginti, ganyti ir senosios vokiečių aukštaičių wigand „karys“, nepasirinkdamas vienos kilmės. Viso vardo vertimas lieka nepatikrintas. Atskirai dokumentuota tiksli forma Allaži 1638 metais ir 1767 metų kalendoriuje; įrašai patvirtina vartojimą, o ne pasirenka etimologiją.',
  'Vīgantsi kohta annab allikas leedu vyti, ginti ja ganyti kõrval vanaülemsaksa wigand, sõdalane, valimata üht päritolu. Terviktõlge jääb kontrollimata. Eraldi on dokumenteeritud täpne Vīgants Allažis 1638. aastal ja kalendris 1767. aastal; need kinnitavad kasutust, mitte ei vali etümoloogiat.'
 ],
 Vigars:[
  'Vigars vārdnīcā piesardzīgi salīdzināts ar Wighard, kura daļas skaidrotas ar senaugšvācu wīg, «kauja», un hart, «stingrs». Jautājuma zīme paliek būtiska: tas vēl nav pierādīts Vigars atvasinājums. Atsevišķā lietojuma liecība Preiļu apkaimē 20. gadsimta trešajā ceturksnī cilmes izvēli neizšķir.',
  'Vigars в словаре осторожно сравнивается с Wighard, части которого объяснены древневерхненемецкими wīg «битва» и hart «твёрдый». Знак вопроса существенен: это ещё не доказанное образование Vigars. Отдельное свидетельство возле Прейли третьей четверти XX века не решает этимологический вопрос.',
  'The dictionary cautiously compares Vigars with Wighard, explained through Old High German wīg, battle, and hart, firm. Its question mark matters: this is not yet a proved Vigars derivation. A separate usage record near Preiļi in the third quarter of the twentieth century does not settle the etymology.',
  'Žodynas Vigars atsargiai lygina su Wighard, kurio dėmenys aiškinami senosios vokiečių aukštaičių wīg „kova“ ir hart „tvirtas“. Klaustukas svarbus: tai dar neįrodyta Vigars daryba. Atskiras vartojimo liudijimas prie Preiļi trečiame XX amžiaus ketvirtyje etimologijos neišsprendžia.',
  'Sõnaraamat võrdleb Vigarsit ettevaatlikult Wighardiga, mida seletavad vanaülemsaksa wīg, lahing, ja hart, kindel. Küsimärk on oluline: see ei ole veel tõestatud Vigarsi tuletus. Eraldi kasutuskirje Preiļi ümbrusest 20. sajandi kolmandas veerandis ei lahenda etümoloogiat.'
 ],
 Vigda:[
  'Vigda vārdnīcā norādīts uz Vigdis ar jautājuma zīmi. Tas ir neatrisināts vārdu salīdzinājums, nevis droši apstiprināts atvasinājums; arī līdzīgu starptautisku formu dzimti un nozīmi nevar automātiski pārnest. Precīzās Vigda formas 1936. gada liecība apliecina lietojumu, bet ne šo cilmes saikni.',
  'Vigda в словаре отсылает к Vigdis со знаком вопроса. Это неразрешённое сравнение, а не подтверждённое образование; род и значение похожих международных форм тоже нельзя переносить автоматически. Свидетельство точного Vigda 1936 года подтверждает употребление, но не эту связь происхождения.',
  'The dictionary refers Vigda to Vigdis with a question mark. This is an unresolved comparison rather than a confirmed derivation; gender and meaning from similar international forms cannot be transferred automatically either. A 1936 record establishes exact Vigda in use, not the proposed origin link.',
  'Žodynas Vigda nukreipia į Vigdis su klaustuku. Tai neišspręstas palyginimas, o ne patvirtinta daryba; panašių tarptautinių formų giminės ir reikšmės taip pat negalima perkelti automatiškai. Tikslios Vigda formos 1936 metų liudijimas patvirtina vartojimą, o ne siūlomą kilmės ryšį.',
  'Sõnaraamat viitab Vigda juurest küsimärgiga Vigdiseni. See on lahtine võrdlus, mitte kinnitatud tuletus; ka sarnaste rahvusvaheliste kujude sugu ja tähendust ei saa automaatselt üle kanda. 1936. aasta kirje kinnitab täpse Vigda kasutust, mitte pakutud päritoluseost.'
 ]
};
for(const [name,text]of Object.entries(uncertain))add(hypothesesLatvianR20,name,name==='Vīgants'?'vyti / ginti / wigand':name==='Vigars'?'Wighard':'Vigdis',[cat(name)],text);
for(const [name,comparison,record]of [['Vigita','Viga / Ligita',['Talsu apkaimē 1975. gadā','около Талси в 1975 году','near Talsi in 1975','prie Talsų 1975 metais','Talsi ümbruses 1975. aastal']],['Vigeta','Vigita',['Liepājā 1976. gadā','в Лиепае в 1976 году','in Liepāja in 1976','Liepojoje 1976 metais','Liepājas 1976. aastal']],['Vigija','Vigilija',['Talsos 1977. gadā','в Талси в 1977 году','in Talsi in 1977','Talsuose 1977 metais','Talsis 1977. aastal']]])add(hypothesesLatvianR20,name,comparison,[cat(name)],[
 `${name} vārdnīcā piesardzīgi salīdzināts ar ${comparison}, taču saikne ir apšaubīta. Tādēļ salīdzinātā vārda cilme vēl nav pārbaudīta ${name} etimoloģija. Atsevišķi avots dokumentē precīzās formas lietojumu ${record[0]}; šis datējums izcelsmes jautājumu neatrisina.`,
 `${name} в словаре осторожно сравнивается с ${comparison}, но связь поставлена под вопрос. Поэтому происхождение сравниваемого имени ещё не является проверенной этимологией ${name}. Отдельно источник документирует употребление точной формы ${record[1]}; дата не решает вопрос происхождения.`,
 `The dictionary cautiously compares ${name} with ${comparison}, but questions the connection. The compared name’s origin is therefore not yet a verified ${name} etymology. Separately, the source documents use of the exact form ${record[2]}; that date does not settle the origin.`,
 `Žodynas ${name} atsargiai lygina su ${comparison}, bet ryšį pažymi kaip abejotiną. Todėl lyginamo vardo kilmė dar nėra patikrinta ${name} etimologija. Atskirai šaltinis dokumentuoja tikslios formos vartojimą ${record[3]}; ši data kilmės neišsprendžia.`,
 `Sõnaraamat võrdleb ${name} kuju ettevaatlikult nimega ${comparison}, kuid kahtleb seoses. Võrdlusnime päritolu ei ole seega veel kontrollitud ${name} etümoloogia. Eraldi dokumenteerib allikas täpse kuju kasutust ${record[4]}; see daatum ei lahenda päritolu.`
]);
for(const [name,comparison]of [['Vīgo','Vigo'],['Vīga','Viga'],['Viģīlija','Vigilija'],['Vigilijs','Vigilija']])add(hypothesesLatvianR20,name,comparison,[cat(name),cat(comparison)],[
  `{name} varētu salīdzināt ar ${comparison}, taču precīzās rakstības saikne vēl nav apstiprināta. Avota ziņas par ${comparison} nevar automātiski attiecināt uz {name}. Tādēļ līdzīgās formas cilme paliek darba versija, bet tās vēsturiskās liecības un kalendāra gadi netiek pārnesti.`,
  `{name} можно сравнить с ${comparison}, но связь точных написаний пока не подтверждена. Сведения источника о ${comparison} нельзя автоматически приписать {name}. Происхождение похожей формы остаётся рабочей версией; её исторические свидетельства и календарные годы не переносятся.`,
  `{name} may be compared with ${comparison}, but the connection between the exact spellings remains unconfirmed. Source information about ${comparison} cannot automatically be assigned to {name}. The similar form’s origin remains a working proposal, and its historical records and calendar years are not transferred.`,
  `{name} galima lyginti su ${comparison}, tačiau tikslių rašybų ryšys dar nepatvirtintas. Šaltinio žinių apie ${comparison} negalima automatiškai priskirti {name}. Panašios formos kilmė lieka darbo versija, o istoriniai liudijimai ir kalendoriaus metai neperkeliami.`,
  `{name} võib võrrelda kujuga ${comparison}, kuid täpsete kirjapiltide seos on kinnitamata. Allika andmeid nime ${comparison} kohta ei saa automaatselt omistada nimele {name}. Sarnase kuju päritolu jääb tööversiooniks ning selle ajaloolisi kirjeid ja kalendriaastaid üle ei kanta.`
]);
for(const name of ['Helmu','Helmur'])add(hypothesesEstonianR20,name,'Helmut / Helmo',['https://wi.ee/wp-content/uploads/2017/06/VItoim16sisu.pdf#page=42','https://stat.ee/nimed/NIMEPAEVAD'],[
 '{name} varētu salīdzināt ar Helmut un Helmo saimi, taču precīzs atvasinājums pārbaudītajos avotos nav atrasts. Vēsturiskā pētījuma rinda Helmok, Helmus — Helmo, Helmke — Helmut nesatur {name}. Kopīga vārdadiena arī nepierāda cilmi, tādēļ ķiveres un prāta skaidrojums paliek nepārbaudīts salīdzinājums.',
 '{name} можно сравнить с семьёй Helmut и Helmo, но точное образование проверенными источниками не установлено. Строка исторического исследования Helmok, Helmus — Helmo, Helmke — Helmut не содержит {name}. Общие именины тоже не доказывают происхождение; объяснение через шлем и дух остаётся непроверенным сравнением.',
 '{name} may be compared with the Helmut and Helmo family, but the checked sources do not establish the exact derivation. The historical study’s row Helmok, Helmus — Helmo, Helmke — Helmut does not contain {name}. A shared name day does not prove origin either, so the helmet-and-spirit explanation remains an unverified comparison.',
 '{name} galima lyginti su Helmut ir Helmo šeima, tačiau patikrinti šaltiniai tikslios darybos nenustato. Istorinio tyrimo eilutėje Helmok, Helmus — Helmo, Helmke — Helmut nėra {name}. Bendra vardadienio data taip pat neįrodo kilmės, todėl šalmo ir dvasios aiškinimas lieka nepatikrintas palyginimas.',
 '{name} võib võrrelda Helmuti ja Helmo nimeperega, kuid kontrollitud allikad ei määra täpset tuletust. Ajaloolise uurimuse rida Helmok, Helmus — Helmo, Helmke — Helmut ei sisalda nime {name}. Ühine nimepäev ei tõesta samuti päritolu, seega jääb kiivri ja meele seletus kontrollimata võrdluseks.'
]);
