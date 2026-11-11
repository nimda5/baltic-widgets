// Follow-up research for exact Estonian calendar spellings. Language order: lv, ru, en, lt, et.
export const historiesEstonianR6={};
const languages=['lv','ru','en','lt','et'];
function add(name,sources,origin,story){historiesEstonianR6[name]={sources,text:Object.fromEntries(languages.map((l,i)=>[l,[origin[i],story[i]]]))};}
add('Kalju',['https://www.nordicnames.de/wiki/Kalju','https://ewod.ut.ee/l/kaljulepik/'],[
 'Kalju ir igauņu vārds ar klints vai ieža tēlu. Tas nāk no igauņu pašu valodas vārdu krājuma; saistītā forma Kaljo saglabā citu patskani galotnē. Dabas tēls paskaidro vārdu, nevis nosaka cilvēka raksturu.',
 'Kalju — эстонское имя с образом скалы, каменной тверди. Оно опирается на собственную лексику эстонского языка; у связанной формы Kaljo другая конечная гласная. Природный образ объясняет имя, не определяя характер человека.',
 'Kalju is an Estonian name with the image of a cliff or rock. It draws on the Estonian language itself; the related form Kaljo retains a different final vowel. The nature image explains the name without assigning a character to its bearer.',
 'Kalju yra estų vardas, turintis uolos ar akmens įvaizdį. Jis remiasi pačios estų kalbos žodynu; gimininga Kaljo forma išlaiko kitą galinį balsį. Gamtos įvaizdis paaiškina vardą, nenusakydamas žmogaus būdo.',
 'Kalju on eesti nimi, mille kujundiks on kalju või kivine pinnas. See lähtub eesti oma sõnavarast; seotud vorm Kaljo säilitab teise lõpuvokaali. Looduskujund seletab nime, määramata inimese iseloomu.'
],[
 'Dzejnieka Kalju Lepika krājums «Nägu koduaknas» iznāca Stokholmā 1946. gadā un ietvēra 1942.–1946. gada dzejoļus. Vēlāk viņš kopā ar Arvo Megi zem kopīga pseidonīma Rein Kaljumägi publicēja romānu «Tuuleveski» (1967).',
 'Сборник поэта Калью Лепика Nägu koduaknas вышел в Стокгольме в 1946 году и включал стихи 1942–1946 годов. Позднее он вместе с Арво Мяги под общим псевдонимом Rein Kaljumägi опубликовал роман Tuuleveski (1967).',
 'The poet Kalju Lepik’s Nägu koduaknas appeared in Stockholm in 1946, collecting poems from 1942–1946. Later he and Arvo Mägi published the novel Tuuleveski (1967) under their shared pen name Rein Kaljumägi.',
 'Poeto Kalju Lepiko rinkinys „Nägu koduaknas“ pasirodė Stokholme 1946 metais ir apėmė 1942–1946 metų eilėraščius. Vėliau jis su Arvo Mägi bendru Rein Kaljumägi slapyvardžiu išleido romaną „Tuuleveski“ (1967).',
 'Kalju Lepiku „Nägu koduaknas“ ilmus Stockholmis 1946. aastal ja koondas aastate 1942–1946 luulet. Hiljem avaldas ta koos Arvo Mägiga ühise Rein Kaljumäe varjunime all romaani „Tuuleveski“ (1967).'
]);
add('Meeli',['https://nimi.keeletoimetajad.ee/wp-content/uploads/2011/03/Eesnimed-XIX-sajandil.pdf','https://www.nordicnames.de/wiki/Meeli'],[
 'Meeli ir igauņu vārds, ko vēsturiskais pārskats «Eesnimed XIX sajandil» pieskaita somu vārdu pielāgojumiem. Ziemeļvalstu vārdnīca piedāvā konkrētāku salīdzinājumu ar Mielikki. Pārskats droši apliecina somu vārdu ietekmes virzienu.',
 'Meeli — эстонское имя, которое исторический обзор Eesnimed XIX sajandil относит к адаптациям финских имён. Северный справочник предлагает более конкретное сопоставление с Mielikki. Обзор надёжно подтверждает само направление финского влияния.',
 'Meeli is an Estonian name classified as an adaptation of Finnish names in the historical survey Eesnimed XIX sajandil. A Nordic guide proposes the more specific comparison with Mielikki. The survey securely documents the direction of Finnish influence.',
 'Meeli yra estų vardas, istorinėje apžvalgoje „Eesnimed XIX sajandil“ priskirtas suomių vardų adaptacijoms. Šiaurės vardų žinynas siūlo konkretesnį palyginimą su Mielikki. Apžvalga patikimai liudija pačią suomiškos įtakos kryptį.',
 'Meeli on eesti nimi, mille ajalooline ülevaade „Eesnimed XIX sajandil“ liigitab soome nimede kohanduste hulka. Põhjamaade nimejuhend pakub täpsemat võrdlust Mielikkiga. Ülevaade tõendab kindlalt soome nimede mõju suunda.'
],[
 'Tajā pašā pārskatā Meeli minēta starp Matsa Tenisona veiksmīgajiem sieviešu vārdu ieteikumiem. No 1884. līdz 1914. gadam viņš kalendāros publicēja ap 800 vārdu. Šis periods raksturo viņa darbu kopumā, nevis Meeli radīšanas gadu.',
 'В том же обзоре Meeli названо среди удачных женских предложений Матса Тыниссона. С 1884 по 1914 год он опубликовал в календарях около 800 имён. Период характеризует его работу в целом, а не год создания Meeli.',
 'The same survey lists Meeli among Mats Tõnisson’s successful feminine recommendations. Between 1884 and 1914 he published about 800 names in calendars. That period describes his work as a whole rather than a creation date for Meeli.',
 'Toje pačioje apžvalgoje Meeli minima tarp sėkmingų Matso Tõnissono moteriškų vardų siūlymų. 1884–1914 metais jis kalendoriuose paskelbė apie 800 vardų. Laikotarpis apibūdina visą jo darbą, o ne Meeli sukūrimo datą.',
 'Sama ülevaade nimetab Meelit Mats Tõnissoni õnnestunud naisenimesoovituste seas. Aastatel 1884–1914 avaldas ta kalendrites umbes 800 nime. See ajavahemik kirjeldab tema tööd tervikuna, mitte Meeli loomisaega.'
]);
add('Ruut',['https://www.nordicnames.de/wiki/Ruut','https://www.nordicnames.de/wiki/Ruut_m','https://etbl.teatriliit.ee/artikkel/tarmo_ruut2'],[
 'Ruut lietots gan sieviešu, gan vīriešu vārdos, un tā skaidrojumi jānošķir. Somu tradīcijā sieviešu formu saista ar Rut vai Trud, vīriešu formu — ar Ruti. Neviens no šiem salīdzinājumiem pats par sevi nenosaka visu igauņu vārda nesēju izcelsmes ceļu.',
 'Ruut употребляется и как женское, и как мужское имя, поэтому объяснения нужно различать. В финской традиции женскую форму связывают с Rut или Trud, мужскую — с Ruti. Эти сопоставления сами по себе не устанавливают происхождение имени у всех эстонских носителей.',
 'Ruut occurs as both a feminine and a masculine name, requiring separate explanations. Finnish tradition connects the feminine form with Rut or Trud and the masculine form with Ruti. Those comparisons alone do not establish every Estonian bearer’s naming route.',
 'Ruut vartojamas ir kaip moteriškas, ir kaip vyriškas vardas, todėl aiškinimus reikia skirti. Suomių tradicijoje moteriška forma siejama su Rut arba Trud, vyriška — su Ruti. Vien šie palyginimai nenustato kiekvieno estų vardo turėtojo kilmės kelio.',
 'Ruut esineb nii naise- kui ka mehenimena ning seletusi tuleb eristada. Soome naisenime võrreldakse vormidega Rut ja Trud, mehenime aga vormiga Ruti. Need võrdlused üksi ei määra kõigi eesti nimekandjate nimevaliku teed.'
],[
 'Aktieris un režisors Rūts Tarmo līdz 1935. gadam bija Harald Rudolf Klein. Viņa biogrāfija rāda konkrētu pāriešanu uz jauno vārdu. Ilgajā skatuves karjerā viņš spēlēja arī Teodora Lutsa filmā «Noored kotkad» (1927).',
 'Актёр и режиссёр Рут Тармо до 1935 года носил имя Harald Rudolf Klein. Биография фиксирует конкретную смену имени. За долгую сценическую карьеру он также сыграл в фильме Теодора Лутса Noored kotkad (1927).',
 'The actor and director Ruut Tarmo was Harald Rudolf Klein until 1935. His biography records an individual change to the new name. His long stage career also included an appearance in Theodor Luts’s film Noored kotkad (1927).',
 'Aktorius ir režisierius Ruut Tarmo iki 1935 metų buvo Harald Rudolf Klein. Biografija užfiksuoja konkretų vardo pakeitimą. Per ilgą sceninę karjerą jis taip pat vaidino Theodoro Lutso filme „Noored kotkad“ (1927).',
 'Näitleja ja lavastaja Ruut Tarmo kandis 1935. aastani nime Harald Rudolf Klein. Tema elulugu dokumenteerib konkreetse nimevahetuse. Pika lavakarjääri kõrval mängis ta ka Theodor Lutsu filmis „Noored kotkad“ (1927).'
]);
add('Kuldar',['https://www.emic.ee/kuldar-sink-70','https://www.emic.ee/?action=view&id=87&lang=eng&method=biograafia&mid=58&sisu=heliloojad'],[
 'Kuldar ir dokumentēts igauņu vīriešu vārds, bet tā sākotnējā nozīme pārbaudītajos materiālos nav droši noteikta. To pazīst no komponista Kuldara Sinka (1942–1995) dzīves. Vārda kultūras vēsture šeit ir skaidrāka par vienu saknes tulkojumu.',
 'Kuldar — документированное эстонское мужское имя, первоначальный смысл которого в проверенных материалах достоверно не установлен. Оно известно по жизни композитора Кулдара Синка (1942–1995). Культурная история имени здесь яснее единственного перевода корня.',
 'Kuldar is a documented Estonian masculine name whose original meaning remains unestablished in the checked material. It is known through the composer Kuldar Sink (1942–1995). Its cultural history is clearer here than a single root translation.',
 'Kuldar yra dokumentuotas estų vyriškas vardas, kurio pradinė reikšmė patikrintoje medžiagoje patikimai nenustatyta. Jis žinomas iš kompozitoriaus Kuldaro Sinko (1942–1995) gyvenimo. Kultūrinė vardo istorija čia aiškesnė už vienintelį šaknies vertimą.',
 'Kuldar on dokumenteeritud eesti mehenimi, mille algtähendus pole kontrollitud materjalis kindlaks tehtud. Nimi on tuntud helilooja Kuldar Singi (1942–1995) kaudu. Kultuurilugu on siin selgem kui üks kindel tüvetõlge.'
],[
 'Sinka «Kolm pala» stīgu orķestrim, flautas koncertīno un Kamersimfonija guva ievērību 1967. gada Zagrebas laikmetīgās mūzikas festivālā. Viņš bija arī profesionāls flautists; no 1973. gada darbojās kā brīvmākslinieks komponists.',
 '«Три пьесы» Синка для струнного оркестра, Концертино для флейты и Камерная симфония привлекли внимание на фестивале современной музыки в Загребе в 1967 году. Он был и профессиональным флейтистом; с 1973 года работал свободным композитором.',
 'Sink’s Three Pieces for Strings, flute Concertino and Chamber Symphony attracted attention at the 1967 Zagreb contemporary music festival. He was also a professional flutist; from 1973 he worked as a freelance composer.',
 'Sinko „Trys pjesės“ styginių orkestrui, Koncertinas fleitai ir Kamerinė simfonija sulaukė dėmesio 1967 metų Zagrebo šiuolaikinės muzikos festivalyje. Jis buvo ir profesionalus fleitininkas; nuo 1973 metų dirbo laisvai samdomu kompozitoriumi.',
 'Singi „Kolm pala“ keelpilliorkestrile, flöödikontsertiino ja Kammersümfoonia pälvisid tähelepanu 1967. aasta Zagrebi nüüdismuusikafestivalil. Ta oli ka professionaalne flötist; alates 1973. aastast töötas vabakutselise heliloojana.'
]);
add('Aimar',['https://www.nordicnames.de/wiki/Aimar','https://www.berghahnbooks.com/title/VentselPunks'],[
 'Aimar ziemeļvalstu vārdnīcā ir jaunāka ģermāņu Agimar forma. Tas dod dokumentētu starptautisku salīdzinājumu, bet ne vienu pierādītu ceļu katram igauņu vārda nesējam. Citās valodās vienāds rakstījums var piederēt citai tradīcijai.',
 'Aimar в северном справочнике — более новая форма германского Agimar. Это документированное международное сопоставление, но не доказанный единый путь для каждого эстонского носителя. В других языках то же написание может принадлежать иной традиции.',
 'A Nordic guide identifies Aimar as a younger form of Germanic Agimar. This supplies a documented international comparison, not one proven route for every Estonian bearer. Identical spelling in another language can belong to a different tradition.',
 'Šiaurės vardų žinynas Aimar laiko naujesne germanų Agimar forma. Tai dokumentuotas tarptautinis palyginimas, bet ne vienas įrodytas kelias kiekvienam estų vardo turėtojui. Tokia pati rašyba kita kalba gali priklausyti kitai tradicijai.',
 'Põhjamaade nimejuhend peab Aimarit germaani Agimari nooremaks vormiks. See annab dokumenteeritud rahvusvahelise võrdluse, mitte üht tõestatud levikuteed igale eesti nimekandjale. Sama kirjapilt teises keeles võib kuuluda teise traditsiooni.'
],[
 'Antropologa Aimara Ventsela grāmata «Punks and Skins United» iznāca 2020. gadā. Tā pēta Austrumvācijas subkultūru, identitāti, šķiru un saimniecisko dzīvi; izdevējs apraksta arī viņa 2009.–2013. gada lauka darbu šajā vidē.',
 'Книга антрополога Аймара Вентселя Punks and Skins United вышла в 2020 году. Она исследует восточногерманскую субкультуру, идентичность, класс и экономическую жизнь; издатель описывает и его полевую работу в этой среде в 2009–2013 годах.',
 'The anthropologist Aimar Ventsel’s Punks and Skins United appeared in 2020. It examines an eastern German subculture through identity, class and economic life; the publisher also describes his fieldwork in this setting from 2009 to 2013.',
 'Antropologo Aimaro Ventselio „Punks and Skins United“ pasirodė 2020 metais. Knyga tiria Rytų Vokietijos subkultūrą, tapatybę, klasę ir ekonominį gyvenimą; leidėjas aprašo ir jo 2009–2013 metų lauko tyrimus šioje aplinkoje.',
 'Antropoloog Aimar Ventseli „Punks and Skins United“ ilmus 2020. aastal. Raamat uurib Ida-Saksamaa subkultuuri identiteedi, klassi ja majanduselu kaudu; kirjastaja kirjeldab ka tema välitöid selles keskkonnas aastatel 2009–2013.'
]);
add('Maia',['https://www.nordicnames.de/wiki/Maia','https://et.wikipedia.org/wiki/Maia_(eesnimi)','https://museum.fide.com/champions/maia-chiburdanidze','https://www.fide.com/how-womens-world-champions-shaped-chess/'],[
 'Maia ir sieviešu vārds Igaunijā un vairākās citās valodās. Ziemeļvalstu vārdnīca to salīdzina ar Maja. Vienāds rakstījums ar grieķu mitoloģijas Maiju pats par sevi nenosaka visu mūsdienu igauņu vārda nesēju izcelsmi.',
 'Maia — женское имя в Эстонии и нескольких других языках. Северный справочник сопоставляет его с Maja. Совпадение написания с Майей греческой мифологии само по себе не устанавливает происхождение имени у всех современных эстонских носительниц.',
 'Maia is a feminine name in Estonia and several other languages. A Nordic guide compares it with Maja. Identical spelling to Maia in Greek mythology does not by itself establish the origin of every modern Estonian bearer’s name.',
 'Maia yra moteriškas vardas Estijoje ir keliose kitose kalbose. Šiaurės vardų žinynas jį lygina su Maja. Sutampanti graikų mitologijos Majos rašyba savaime nenustato kiekvienos dabartinės estų vardo turėtojos kilmės.',
 'Maia on naisenimi Eestis ja mitmes teises keeles. Põhjamaade nimejuhend võrdleb seda Majaga. Sama kirjapilt kreeka mütoloogia Maiaga ei määra iseenesest kõigi tänapäeva eesti nimekandjate nime päritolu.'
],[
 'Gruzīnu šahiste Maia Čiburdanidze 1978. gadā septiņpadsmit gadu vecumā kļuva par pasaules čempioni. Pasaules šaha federācija atzīmē, ka tolaik viņa bija jaunākā šī titula ieguvēja sieviešu šahā.',
 'Грузинская шахматистка Майя Чибурданидзе в 1978 году стала чемпионкой мира в семнадцать лет. Международная шахматная федерация отмечает, что тогда она оказалась самой юной обладательницей этого титула в женских шахматах.',
 'The Georgian chess player Maia Chiburdanidze became world champion in 1978 at seventeen. The International Chess Federation records that she was then the youngest winner of the women’s world title.',
 'Gruzijos šachmatininkė Maia Chiburdanidze 1978 metais tapo pasaulio čempione būdama septyniolikos. Tarptautinė šachmatų federacija pažymi, kad tuo metu ji buvo jauniausia moterų pasaulio titulo laimėtoja.',
 'Gruusia maletaja Maia Tšiburdanidze tuli 1978. aastal seitsmeteistkümneselt maailmameistriks. Rahvusvaheline maleliit märgib, et toona oli ta noorim naiste maailmameistritiitli võitja.'
]);
add('Elli',['https://www.nordicnames.de/wiki/Elli','https://et.wikipedia.org/wiki/Elli_(eesnimi)','https://eki.ee/teatmik/uldlaiend/'],[
 'Elli starptautiskie skaidrojumi ietver Ella variantu un atsevišķu senskandināvu saikni ar vecumu. Igauņu sieviešu vārda lietojums ir dokumentēts, taču katras ģimenes pārņemšanas ceļš nav zināms. Abus skaidrojumus nevar apvienot vienā drošā tulkojumā.',
 'Международные объяснения Elli включают вариант Ella и отдельную древнескандинавскую связь с возрастом. Эстонское женское употребление документировано, но путь каждой семьи неизвестен. Два объяснения нельзя объединять в один достоверный перевод.',
 'International explanations of Elli include an Ella variant and a separate Old Norse connection with age. Estonian feminine use is documented, while individual family transmission remains unknown. The two explanations cannot be fused into one secure translation.',
 'Tarptautiniai Elli aiškinimai apima Ella variantą ir atskirą senosios skandinavų kalbos ryšį su amžiumi. Estiška moteriška vartosena dokumentuota, tačiau atskirų šeimų perėmimo kelias nežinomas. Dviejų aiškinimų negalima sujungti į vieną patikimą vertimą.',
 'Elli rahvusvahelised seletused hõlmavad Ella varianti ning eraldi vanapõhja seost vanusega. Eesti naisenime kasutus on dokumenteeritud, kuid üksikute perede nimevaliku tee pole teada. Kaht seletust ei saa sulatada üheks kindlaks tõlkeks.'
],[
 'Valodniece Elli Rīkoja bija viena no 1974. gadā izdotās grāmatas «Eesti keele lauseõpetuse põhijooned I» autorēm. Igauņu valodas institūts šo kopdarbu joprojām citē savā teikuma uzbūves skaidrojumā.',
 'Лингвист Элли Рийкоя была одной из авторов книги Eesti keele lauseõpetuse põhijooned I, изданной в 1974 году. Институт эстонского языка продолжает ссылаться на коллективный труд в объяснении строения предложения.',
 'The linguist Elli Riikoja was a co-author of Eesti keele lauseõpetuse põhijooned I, published in 1974. The Institute of the Estonian Language continues to cite this collaborative work in its explanation of sentence structure.',
 'Kalbininkė Elli Riikoja buvo viena 1974 metais išleistos knygos „Eesti keele lauseõpetuse põhijooned I“ autorių. Estų kalbos institutas šį bendrą darbą tebecituoja aiškindamas sakinio sandarą.',
 'Keeleteadlane Elli Riikoja oli 1974. aastal ilmunud „Eesti keele lauseõpetuse põhijoonte“ I osa kaasautor. Eesti Keele Instituut viitab sellele ühistööle ka oma tänapäevases lauseehituse selgituses.'
]);
add('Aliise',['https://www.nordicnames.de/wiki/Aliise','https://www.behindthename.com/name/alice'],[
 'Aliise ziemeļvalstu vārdnīcā ir Alise un Alice somu rakstījums. Plašākā saime ietver Adelheides vārda saīsināšanās vēsturi. Somu salīdzinājums ir dokumentēts; tieši tā paša rakstījuma ceļš katrā igauņu ģimenē varēja būt atšķirīgs.',
 'Aliise в северном справочнике — финское написание Alise и Alice. Широкая семья включает историю сокращения имени Adelheid. Финское сопоставление документировано; путь такого же написания в каждой эстонской семье мог различаться.',
 'A Nordic guide identifies Aliise as a Finnish spelling of Alise and Alice. The wider family includes the history of shortening Adelheid. The Finnish comparison is documented; the identical spelling could reach individual Estonian families by different routes.',
 'Šiaurės vardų žinynas Aliise laiko suomiška Alise ir Alice rašyba. Platesnė šeima apima Adelheid vardo trumpėjimo istoriją. Suomiškas palyginimas dokumentuotas; tokia pati rašyba atskiras estų šeimas galėjo pasiekti skirtingais keliais.',
 'Põhjamaade nimejuhend peab Aliiset Alise ja Alice’i soome kirjapildiks. Laiem nimepere hõlmab Adelheidi lühenemise ajalugu. Soome võrdlus on dokumenteeritud; sama kirjapilt võis eesti peredesse jõuda eri teid pidi.'
],[
 'Vārdnīca kā Aliises spēcīgākā lietojuma periodu Somijā norāda 1900.–1939. gadu. Tas rāda konkrētu vārda vietu 20. gadsimta sākuma somu vārdu krājumā, bet nedod Igaunijas pirmās Aliises datumu.',
 'Справочник указывает 1900–1939 годы как период наиболее заметного употребления Aliise в Финляндии. Это конкретное свидетельство места имени в финском именнике начала XX века, которое не датирует первую эстонскую Алиисе.',
 'The guide identifies 1900–1939 as Aliise’s strongest period of use in Finland. This locates the spelling in early twentieth-century Finnish naming without supplying a date for the first Estonian Aliise.',
 'Žinynas 1900–1939 metus nurodo kaip ryškiausią Aliise vartojimo laikotarpį Suomijoje. Tai įrašo rašybą į XX amžiaus pradžios suomių vardyną, nenustatydama pirmos estų Aliise datos.',
 'Nimejuhend märgib Aliise tugevaimaks kasutusajaks Soomes aastad 1900–1939. See asetab kirjapildi 20. sajandi alguse soome nimepruuki, andmata esimese eesti Aliise daatumit.'
]);
add('Säde',['https://www.nordicnames.de/wiki/S%C3%A4de','https://yle.fi/aihe/a/20-124167'],[
 'Säde somu personvārda skaidrojums balstās vārdā säde — gaismas stars. Tas ir dokumentēts somu dabas vārds, kas sastopams arī Igaunijas kalendārā. Somu skaidrojums pats par sevi nenosaka katras igauņu ģimenes izvēles motīvu.',
 'Объяснение финского личного имени Säde опирается на слово säde — луч света. Это документированное финское природное имя, встречающееся и в эстонском календаре. Финское объяснение само по себе не определяет мотив выбора в каждой эстонской семье.',
 'The Finnish personal name Säde is explained through säde, a ray of light. This documented Finnish nature name also appears in Estonia’s calendar. The Finnish explanation alone does not establish every Estonian family’s naming motive.',
 'Suomiško asmenvardžio Säde aiškinimas remiasi žodžiu säde — šviesos spindulys. Šis dokumentuotas suomių gamtinis vardas yra ir Estijos kalendoriuje. Suomiškas aiškinimas savaime nenustato kiekvienos estų šeimos pasirinkimo motyvo.',
 'Soome eesnime Säde seletus lähtub sõnast säde, valguskiir. Dokumenteeritud soome loodusnimi esineb ka Eesti kalendris. Soome seletus üksi ei määra iga eesti perekonna nimevaliku motiivi.'
],[
 'Somu Yle 2015. gada kalendāra pārskatā Säde svin 18. oktobrī kopā ar Satu, Luukas un pievienoto Luka. Almanaha speciāliste to saista ar pārmaiņām, kas ļāva sieviešu un vīriešu vārdus svinēt vienā dienā. Šī ziņa attiecas uz Somiju.',
 'В обзоре финского календаря Yle за 2015 год Säde отмечает 18 октября вместе с Satu, Luukas и добавленным Luka. Специалист по альманахам связывает это с переменами, позволившими объединять мужские и женские именины. Речь идёт о Финляндии.',
 'Yle’s account of Finland’s 2015 calendar places Säde on 18 October with Satu, Luukas and the added Luka. An almanac specialist relates this to reforms allowing feminine and masculine names to share a day. This evidence concerns Finland.',
 'Yle 2015 metų Suomijos kalendoriaus apžvalgoje Säde švenčia spalio 18-ąją su Satu, Luukas ir pridėtu Luka. Almanacho specialistė tai sieja su reformomis, leidusiomis tą pačią dieną švęsti moteriškus ir vyriškus vardus. Žinia skirta Suomijai.',
 'Yle 2015. aasta Soome kalendri ülevaates on Säde nimepäev 18. oktoobril koos Satu, Luukase ja lisatud Lukaga. Almanakispetsialist seostab seda reformidega, mis lubasid nais- ja mehenimedel päeva jagada. See teade käib Soome kohta.'
]);
add('Pirja',['https://www.nordicnames.de/wiki/Pirja','https://www.nordicnames.de/wiki/Pirjo','https://www.nordicnames.de/wiki/Pirita','https://www.nordicnames.de/wiki/Byrita','https://visitestonia.com/fi/piritan-luostarin-rauniot'],[
 'Pirja dokumentēta somu tradīcijā kā Pirjo variants. Pirjo saistīts ar Pirjetta un Pirita, kas ved pie Birgitas saimes. Šis ir pārbaudīts starptautisku formu salīdzinājums; tā paša rakstījuma pārņemšanas ceļš Igaunijā nav precīzi datēts.',
 'Pirja документировано в финской традиции как вариант Pirjo. Pirjo связано с Pirjetta и Pirita, ведущими к семье Birgitta. Это проверенное сопоставление международных форм; путь заимствования такого же написания в Эстонии точно не датирован.',
 'Pirja is documented in Finnish tradition as a variant of Pirjo. Pirjo is linked with Pirjetta and Pirita, leading to the Birgitta family. This is a checked comparison of international forms; transmission of the same spelling in Estonia has not been precisely dated.',
 'Pirja suomių tradicijoje dokumentuota kaip Pirjo variantas. Pirjo siejama su Pirjetta ir Pirita, vedančiomis į Birgitta šeimą. Tai patikrintas tarptautinių formų palyginimas; tos pačios rašybos perėmimas Estijoje tiksliai nedatuotas.',
 'Pirja on soome traditsioonis dokumenteeritud Pirjo variandina. Pirjo seostub Pirjetta ja Piritaga, mis viivad Birgitta nimepereni. See on kontrollitud rahvusvaheliste vormide võrdlus; sama kirjapildi jõudmist Eestisse pole täpselt dateeritud.'
],[
 'Ar radniecīgo Pirita formu saistīts Tallinas klosteris, kura vēsture sākas 1407. gadā. Tas nosaukts Zviedrijas svētās Birgitas vārdā un tika izpostīts 1577. gadā. Šeit sastopas saimes reliģiskā tradīcija un Igaunijas vietas vēsture.',
 'С родственной формой Pirita связан таллинский монастырь, история которого начинается в 1407 году. Он назван в честь святой Бригитты Шведской и был разрушен в 1577-м. Здесь религиозная традиция семьи встречается с историей эстонского места.',
 'The related Pirita form is associated with Tallinn’s convent, whose history begins in 1407. Named for Saint Bridget of Sweden, it was destroyed in 1577. The family’s religious tradition meets the history of an Estonian place here.',
 'Su gimininga Pirita forma susijęs Talino vienuolynas, kurio istorija prasideda 1407 metais. Pavadintas šventosios Brigitos Švedės vardu, jis buvo sugriautas 1577-aisiais. Čia religinė šeimos tradicija susitinka su Estijos vietos istorija.',
 'Sugulasvorm Piritaga seostub Tallinna klooster, mille ajalugu algab 1407. aastal. Rootsi püha Birgitta järgi nimetatud klooster hävitati 1577. aastal. Siin kohtuvad nimepere usuline traditsioon ja Eesti paiga ajalugu.'
]);
