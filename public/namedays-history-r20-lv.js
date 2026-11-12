export const historiesLatvianR20={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
function add(name,sources,origin,story,year){historiesLatvianR20[name]={sources:[cat(name),...sources],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
add('Vigo',['https://www.personvarduatveide.lv/words/77.pdf?locale=lv','https://www.behindthename.com/name/viggo'],[
 'Vigo ir dokumentēta dāņu vārda Viggo atveide latviešu valodā. Viggo saista ar senziemeļnieku víg, «karš, kauja», kā īsformu vārdiem ar šo daļu. Tādējādi vārda skaidrojums balstās tiešā valodu atbilsmē, nevis tikai līdzībā ar citiem Vig- vārdiem.',
 'Vigo — документированная латышская передача датского Viggo. Viggo связывают с древнескандинавским víg «война, битва» как краткую форму имён с этой частью. Объяснение опирается на прямое языковое соответствие, а не только на сходство с другими именами на Vig-.',
 'Vigo is a documented Latvian rendering of Danish Viggo. Viggo is connected with Old Norse víg, war or battle, as a short form of names containing that element. The explanation rests on an explicit language correspondence rather than resemblance to other Vig- names alone.',
 'Vigo yra dokumentuotas danų Viggo perteikimas latviškai. Viggo siejamas su senosios skandinavų kalbos víg „karas, kova“ kaip vardų su šiuo dėmeniu trumpinys. Aiškinimas remiasi tiesiogine kalbų atitiktimi, o ne vien panašumu į kitus Vig- vardus.',
 'Vigo on dokumenteeritud läti vaste taani nimele Viggo. Viggot seostatakse vanapõhja sõnaga víg, sõda või lahing, seda osa sisaldavate nimede lühivormina. Seletus põhineb otsesel keelelisel vastel, mitte üksnes sarnasusel teiste Vig-alguliste nimedega.'
],[
 'Latviešu valodas aģentūras atveides ieraksts atsaucas uz I. Mežaraupes dāņu īpašvārdu rokasgrāmatas 102. lappusi 2003. gada izdevumā. Atsevišķi Siliņa vārdnīca Vigo liecību ievieto 20. gadsimta pirmajā ceturksnī. Rokasgrāmatas gads dokumentē atveides noteikumu, nevis vārda pirmo lietojumu.',
 'Запись Латышского языкового агентства ссылается на страницу 102 раздела И. Межараупе о датских именах в издании 2003 года. Отдельно словарь Силиньша относит свидетельство Vigo к первой четверти XX века. Год руководства документирует передачу имени, а не его первое употребление.',
 'The Latvian Language Agency record cites page 102 of I. Mežaraupe’s Danish-name guide in the 2003 volume. Separately, Siliņš’s dictionary places a Vigo record in the first quarter of the twentieth century. The guide’s year documents a rendering rule rather than first use of the name.',
 'Latvių kalbos agentūros įrašas remiasi I. Mežaraupe daniškų tikrinių vardų vadovo 102 puslapiu 2003 metų leidinyje. Atskirai Siliņšo žodynas Vigo liudijimą priskiria pirmajam XX amžiaus ketvirčiui. Vadovo metai dokumentuoja perteikimo taisyklę, o ne pirmąjį vardo vartojimą.',
 'Läti Keeleagentuuri kirje viitab I. Mežaraupe taani nimede juhendi leheküljele 102 aastast 2003. Eraldi paigutab Siliņši sõnaraamat Vigo nimekirje 20. sajandi esimesse veerandisse. Juhendi aasta dokumenteerib nime edasiandmise reeglit, mitte esmakasutust.'
]);
add('Viga',[cat('Jadviga'),'https://www.behindthename.com/name/hedwig'],[
 'Viga Siliņa vārdnīcā minēta kā Jadviga mīļvārda forma. Jadviga tur savukārt saistīta ar Hedviga saimi, kuras ģermāņu pamatdaļas hadu un wīg abas saistītas ar kauju. Tā ir pilnā vārda vēsture, caur kuru skaidrojama dokumentētā īsforma.',
 'Viga у Силиньша упомянуто как ласкательная форма Jadviga. Само Jadviga связано с семьёй Hedviga, германские части которой hadu и wīg обе относятся к битве. Документированная краткая форма объясняется через историю полного имени.',
 'Siliņš lists Viga as an affectionate form of Jadviga. Jadviga in turn belongs to the Hedviga family, whose Germanic elements hadu and wīg both concern battle. The documented short form is explained through that history of the full name.',
 'Siliņšas Viga mini kaip maloninę Jadviga formą. Jadviga savo ruožtu siejama su Hedviga šeima, kurios germaniški dėmenys hadu ir wīg abu susiję su kova. Dokumentuota trumpoji forma aiškinama per šią pilnojo vardo istoriją.',
 'Siliņš nimetab Vigat Jadviga hellitusvormiks. Jadviga kuulub omakorda Hedviga nimeperre, mille germaani osad hadu ja wīg mõlemad seostuvad lahinguga. Dokumenteeritud lühivormi seletab seega pika nime ajalugu.'
],[
 'Precīzās Viga formas liecība vārdnīcā datēta ar 1936. gadu. Šis ieraksts apliecina pašas īsformas lietojumu, bet nedatē visas Jadviga saimes rašanos. Rakstība Vīga ar garo ī nav tas pats šķirklis, un 1936. gada ziņa uz to netiek automātiski attiecināta.',
 'Свидетельство точной формы Viga словарь датирует 1936 годом. Оно подтверждает употребление самого сокращения, не датируя появление всей семьи Jadviga. Написание Vīga с долгим ī — другая форма; запись 1936 года на него автоматически не переносится.',
 'The dictionary dates a record of exact Viga to 1936. It establishes use of the short form itself rather than dating the creation of the whole Jadviga family. Long-ī Vīga is a different spelling, to which the 1936 record is not automatically transferred.',
 'Tikslios Viga formos liudijimą žodynas datuoja 1936 metais. Jis patvirtina paties trumpinio vartojimą, o ne visos Jadviga šeimos atsiradimą. Vīga su ilguoju ī yra kita rašyba; 1936 metų įrašas jai automatiškai neperkeliamas.',
 'Sõnaraamat dateerib täpse Viga kuju kirje 1936. aastasse. See kinnitab lühivormi enda kasutust, mitte kogu Jadviga nimepere loomist. Pika ī-ga Vīga on teine kirjapilt, millele 1936. aasta kirjet automaatselt üle ei kanta.'
]);
add('Vigilija',[],[
 'Vigilija Siliņa vārdnīcā saistīta ar latīņu vigilia, «nomods, modrība». Tas ir kopvārda skaidrojums, kas palīdz izprast vārda valodisko pamatu. No tā nav jāveido rakstura pareģojums vai jāpieņem, ka visi līdzīgi Vigil- vārdi ir viena un tā pati forma.',
 'Vigilija у Силиньша связано с латинским vigilia «бодрствование, бдительность». Это значение нарицательного слова помогает понять языковую основу имени. Оно не является предсказанием характера и не делает все похожие имена на Vigil- одной и той же формой.',
 'Siliņš connects Vigilija with Latin vigilia, wakefulness or watchfulness. This common-noun gloss helps explain the name’s linguistic basis. It need not become a prediction of character or imply that all similar Vigil- names are one identical form.',
 'Siliņšas Vigilija sieja su lotynų vigilia „budėjimas, budrumas“. Šis bendrinio žodžio aiškinimas padeda suprasti kalbinį vardo pagrindą. Jis netampa būdo pranašyste ir nereiškia, kad visi panašūs Vigil- vardai yra viena ta pati forma.',
 'Siliņš seob Vigilija ladina sõnaga vigilia, ärkvelolek või valvsus. Üldsõna seletus aitab mõista nime keelelist alust. Sellest ei pea kujunema iseloomuennustust ega väidet, et kõik sarnased Vigil-algulised nimed on üks ja sama kuju.'
],[
 'Vigilija lietojuma liecību vārdnīca ievieto Balvu apkaimē 20. gadsimta otrajā ceturksnī; kalendārā vārds norādīts kopš 1951. gada. Tās ir atsevišķas lietojuma un kalendāra ziņas. Šie datējumi paliek tieši Vigilija rakstībai, nevis Viģīlija vai vēl nepārbaudītajam Vigilijs.',
 'Свидетельство употребления Vigilija словарь относит к окрестностям Балви второй четверти XX века; календарная запись указана с 1951 года. Это отдельные сведения об употреблении и календаре. Даты остаются при Vigilija, не переходя к Viģīlija или ещё не проверенному Vigilijs.',
 'The dictionary places a Vigilija usage record near Balvi in the second quarter of the twentieth century and calendar membership from 1951. These are separate usage and calendar records. They remain attached to exact Vigilija rather than Viģīlija or the still-unverified Vigilijs.',
 'Vigilija vartojimo liudijimą žodynas priskiria Balvų apylinkėms antrajame XX amžiaus ketvirtyje; kalendoriuje vardas nurodytas nuo 1951 metų. Tai atskiros vartojimo ir kalendoriaus žinios. Datos lieka prie tikslios Vigilija, neperkeliamos Viģīlija ar dar nepatikrintam Vigilijs.',
 'Sõnaraamat paigutab Vigilija kasutuskirje Balvi ümbrusse 20. sajandi teise veerandisse ning kalendrisse kuulumise alguseks 1951. aasta. Need on eri andmed kasutuse ja kalendri kohta. Need jäävad täpsele Vigilijale, kandumata üle kujule Viģīlija või veel kontrollimata Vigilijs.'
],1951);
