// Subjective images drawn from the spelling of a name, never personality claims.
// Rows follow lv, ru, en, lt, et. No historical meaning is inferred here.
const pictures=[
 ['zīda lente vējā','шёлковая лента на ветру','a silk ribbon in the wind','šilko juosta vėjyje','siidpael tuules'],
 ['sarma uz loga malas','иней по краю окна','frost along a window edge','šerkšnas lango pakraštyje','härmatis aknaserval'],
 ['smilšu vilnītis kāpā','тонкая рябь песка на дюне','a ripple of sand on a dune','smėlio raibulys kopoje','liivaviirg luitevallil'],
 ['balta spalva gaisa plūsmā','белое перо в потоке воздуха','a white feather riding an air current','balta plunksna oro srovėje','valge sulg õhuvoolus'],
 ['ēna no lapota zara','тень от ветки с листьями','the shadow of a leafy branch','lapuotos šakos šešėlis','lehes oksa vari'],
 ['gaisma ziepju burbulī','свет внутри мыльного пузыря','light caught in a soap bubble','šviesa muilo burbule','valgus seebimullis'],
 ['mežģīne uz gaiša auduma','кружево на светлой ткани','lace against pale cloth','nėriniai ant šviesaus audinio','pits heledal kangal'],
 ['vēja pašķirta grāmatas lappuse','страница, чуть приподнятая ветром','a book page lifted by a breeze','vėjo kilstelėtas knygos lapas','tuulest kerkinud raamatuleht'],
 ['ūdens pāri gludiem oļiem','вода поверх гладкой гальки','water slipping over smooth pebbles','vanduo virš glotnių akmenukų','vesi üle siledate kivide'],
 ['čella lociņa lēnais vilciens','медленное движение виолончельного смычка','the slow draw of a cello bow','lėtas violončelės stryko judesys','tšellopoogna aeglane tõmme'],
 ['medus pavediens no karotes','нить мёда, стекающая с ложки','a thread of honey falling from a spoon','nuo šaukšto tįstantis medaus siūlas','lusikalt veniv meeniit'],
 ['upes loks aiz pļavas','излучина реки за лугом','a river bend beyond a meadow','upės vingis už pievos','jõekäär heinamaa taga'],
 ['sila sūnas starp saknēm','лесной мох между корнями','forest moss between tree roots','miško samanos tarp šaknų','metsasammal juurte vahel'],
 ['laiva klusā līcī','лодка в тихой заводи','a boat in a quiet inlet','valtis tylioje įlankoje','paat vaikses abajas'],
 ['stikla malas dzidrais skanējums','чистый звон стеклянного края','the clear ring of a glass rim','skaidrus stiklo briaunos skambesys','klaasiserva puhas helin'],
 ['mīksta auduma loks','мягкая складка ткани','a soft fold of fabric','minkšta audinio klostė','pehme kangavolt'],
 ['akmens arka virs taciņas','каменная арка над тропой','a stone arch over a path','akmens arka virš tako','kivikaar teeraja kohal'],
 ['īss piesitiens koka bungai','короткий удар по деревянному барабану','a short beat on a wooden drum','trumpas medinio būgno dūžis','lühike löök puust trummil'],
 ['precīzs atslēgas pagrieziens','точный поворот ключа','a precise turn of a key','tikslus rakto pasukimas','võtme täpne pööre'],
 ['soļi uz akmens plāksnēm','шаги по каменным плитам','footsteps across stone slabs','žingsniai akmens plokštėmis','sammud kiviplaatidel'],
 ['cieši savienotas koka detaļas','плотно пригнанный деревянный стык','a closely fitted wooden joint','tiksliai sujungtos medinės detalės','täpselt sobitatud puiduliide'],
 ['kalta atstāta rieva','бороздка, оставленная резцом','a groove left by a chisel','kalto paliktas griovelis','peitli jäetud vagu'],
 ['pulksteņa mehānisma klikšķis','щелчок часового механизма','the click of a clock mechanism','laikrodžio mechanizmo spragtelėjimas','kellamehhanismi klõps'],
 ['keramikas trauka stingrā mala','твёрдый край керамической чаши','the firm rim of a ceramic bowl','tvirtas keraminio dubens kraštas','keraamilise kausi tugev serv'],
 ['saullēkta josla pie apvāršņa','полоса рассвета у горизонта','a band of dawn along the horizon','aušros juosta horizonte','koiduriba silmapiiril'],
 ['atvērts saulessargs','раскрытый солнечный зонт','an open sunshade','išskleistas saulės skėtis','avatud päikesevari'],
 ['augsta debesu velve','высокий небесный свод','a high vault of sky','aukštas dangaus skliautas','kõrge taevavõlv'],
 ['zeltaina bļoda gaismā','золотистая чаша на свету','a golden bowl in the light','auksaspalvis dubuo šviesoje','kuldne kauss valguses'],
 ['klajums starp bērziem','просвет между берёзами','a clearing between birches','proskyna tarp beržų','lagendik kaskede vahel'],
 ['aplis, ko ūdenī atstāj piliens','круг, оставленный каплей на воде','a ring left by a drop on water','lašo paliktas ratas vandenyje','veetilga jäetud ring'],
 ['gaismas plankums uz baltas sienas','пятно света на белой стене','a patch of light on a white wall','šviesos lopinėlis ant baltos sienos','valguslaik valgel seinal'],
 ['plaši atvērta loga rāmis','рама широко открытого окна','the frame of a wide-open window','plačiai atverto lango rėmas','pärani akna raam'],
 ['ogle zem plānas pelnu kārtas','уголёк под тонким слоем золы','an ember under a thin veil of ash','žarija po plonu pelenų sluoksniu','süsi õhukese tuhakihi all'],
 ['bronzas zvans darbnīcā','бронзовый колокол в мастерской','a bronze bell in a workshop','bronzinis varpas dirbtuvėse','pronkskell töökojas'],
 ['sasilusi māla krūze','согретая глиняная кружка','a warmed clay mug','sušilęs molinis puodelis','soe savikruus'],
 ['zema basa nots','низкая басовая нота','a low bass note','žema boso nata','madal bassinoodike'],
 ['dziļas akas tumšais aplis','тёмный круг глубокого колодца','the dark circle of a deep well','tamsus gilaus šulinio ratas','sügava kaevu tume ring'],
 ['vara trauks uz koka galda','медный сосуд на деревянном столе','a copper vessel on a wooden table','varinis indas ant medinio stalo','vasknõu puust laual'],
 ['tikko ceptas maizes garoza','корочка только что испечённого хлеба','the crust of freshly baked bread','ką tik iškeptos duonos pluta','äsja küpsenud leiva koorik'],
 ['tumša koka atspīdums','отблеск тёмного дерева','the sheen of dark wood','tamsaus medžio atšvaitas','tumeda puidu helk'],
 ['adatas dūriens zvaigžņu rakstā','стежок иглы в узоре созвездия','a needle stitch in a constellation pattern','adatos dygsnis žvaigždyno rašte','nõelapiste tähtkujumustris'],
 ['pūķa aukla pret debesīm','нить воздушного змея на фоне неба','a kite string against the sky','aitvaro virvelė dangaus fone','lohenöör taeva taustal'],
 ['zibens uz slidām pāri ledum','блик конька, скользящего по льду','the flash of a skate crossing ice','ledo pačiūžos blyksnis','uisutera sähvatus jääl'],
 ['viena vijoles stīgas dzirksts','одна искра скрипичной струны','a single spark from a violin string','viena smuiko stygos kibirkštis','üks viiulikeele säde'],
 ['sīka sudraba zivtiņa','крошечная серебряная рыбка','a tiny silver fish','maža sidabrinė žuvelė','tilluke hõbekala'],
 ['saulesstars starp žalūzijām','солнечный луч между жалюзи','a sunbeam between blind slats','saulės spindulys tarp žaliuzių','päikesekiir rulooribade vahel'],
 ['putna asais pagrieziens','резкий поворот птицы в воздухе','a bird’s sharp turn in the air','staigus paukščio posūkis ore','linnu järsk pööre õhus'],
 ['rasas piliens zirnekļa tīklā','капля росы в паутине','a dewdrop caught in a spiderweb','rasos lašas voratinklyje','kastepiisk ämblikuvõrgus'],
 ['vilnas auduma vilnis','волна шерстяной ткани','a wave of woollen cloth','vilnonio audinio banga','villase kanga laine'],
 ['klusi dūcoša melodija','тихо напеваемая мелодия','a quietly hummed tune','tyliai niūniuojama melodija','vaikselt ümisenud viis'],
 ['naktslampas gaismas aplis','круг света от ночника','a circle of lamplight at night','naktinės lempos šviesos ratas','öölambi valgusring'],
 ['sniega apslāpēti soļi','шаги, приглушённые снегом','footsteps softened by snow','sniego prislopinti žingsniai','lumest summutatud sammud'],
 ['silta elpa uz auksta stikla','тёплое дыхание на холодном стекле','warm breath on cold glass','šiltas kvėpavimas ant šalto stiklo','soe hingeõhk külmal klaasil'],
 ['zems mākonis pār pakalnu','низкое облако над холмом','a low cloud over a hill','žemas debesis virš kalvos','madal pilv künka kohal'],
 ['kaķa klusā murrāšana','тихое кошачье мурлыканье','a cat’s quiet purr','tylus katės murkimas','kassi vaikne nurrumine'],
 ['filca kurpīte uz plaukstas','войлочная туфелька на ладони','a felt slipper resting in a palm','veltinis batelis ant delno','vildist kingake peopesal'],
 ['ritenis, kas sāk griezties','колесо, начинающее вращаться','a wheel beginning to turn','pradedantis suktis ratas','pöörlema hakkav ratas'],
 ['sarkans pavediens spolē','красная нить на катушке','a red thread on a spool','raudonas siūlas ant ritės','punane niit poolil'],
 ['kuģa klāja ritms','ритм корабельной палубы','the rhythm of a ship’s deck','laivo denio ritmas','laevateki rütm'],
 ['virpulis upes līkumā','водоворот на речном повороте','an eddy at a river bend','sūkurys upės vingyje','keeris jõekäärus'],
 ['zirga soļu ritms tālumā','ритм конских шагов вдали','the distant rhythm of hooves','tolimas kanopų ritmas','kauge kabjarütm'],
 ['tramvaja zvans aiz stūra','звонок трамвая за углом','a tram bell around a corner','tramvajaus skambutis už kampo','trammikell nurga taga'],
 ['pirksti klavieru arpedžo','пальцы в движении по клавишам арпеджио','fingers moving through a piano arpeggio','pirštai, skambinantys pianino arpedžio','sõrmed klaveriarpedžos'],
 ['akmens lēciens pāri ūdenim','скачок камешка по воде','a stone skipping across water','vandeniu šoktelėjęs akmenukas','veepinnal hüplev kivi']
];
const index={lv:0,ru:1,en:2,lt:3,et:4};
function identity(name){return name.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();}
export function nameShape(name){
 const letters=[...identity(name).replace(/[^\p{L}]/gu,'')],length=letters.length;
 const cut=Math.max(1,Math.min(3,Math.ceil(length/3))),head=letters.slice(0,cut).join(''),tail=letters.slice(-cut).join(''),middle=letters.slice(cut,-cut).join('')||letters[Math.floor(length/2)]||head;
 const first=head[0]||'a';
 const group=/[sfvzhc]/.test(first)?0:/[l]/.test(first)?1:/[tpk]/.test(first)?2:/[aeou]/.test(first)?3:/[bdgq]/.test(first)?4:/[ijy]/.test(first)?5:/[mn]/.test(first)?6:7;
 // The image follows the opening, vowel movement and consonant density.
 const vowels=letters.filter(c=>'aeiouy'.includes(c)),contour=vowels.reduce((n,c)=>n*5+'aeiouy'.indexOf(c),0),consonants=length-vowels.length;
 return{head,middle,tail,picture:group*8+(contour+consonants)%8,frame:(length+vowels.length)%8,ending:/[aeiouy]$/.test(tail)?0:/[szfvh]$/.test(tail)?1:/[rlmn]$/.test(tail)?2:3};
}
const frames={
 ru:[
  'В начале «{head}» у имени {name} мне слышится {image}.',
  'Если нарисовать {name}, первым штрихом будет {image} — так я слышу «{head}».',
  '{name} вызывает у меня один образ: {image}. Его задаёт начальное «{head}».',
  'От «{head}» в {name} в воображении появляется {image}.',
  'Для {name} мне хочется выбрать такой образ: {image}. Всё начинается с «{head}».',
  'Я бы передал начало {name}, «{head}», через рисунок: {image}.',
  'Когда читаю {name}, начальное «{head}» — это {image}.',
  'В звуковом рисунке {name} сначала возникает {image}: это отклик на «{head}».'
 ],
 en:[
  'At the opening of {name}, “{head}”, I hear an image: {image}.',
  'If I drew {name}, the first mark would suggest {image}; that is how “{head}” sounds to me.',
  '{name} brings one image to my mind: {image}, prompted by the opening “{head}”.',
  'The “{head}” in {name} conjures up {image} for me.',
  'For {name}, I would choose this image: {image}. It begins with “{head}”.',
  'I would sketch the opening of {name}, “{head}”, as {image}.',
  'When I read {name}, its opening “{head}” becomes {image}.',
  'In a sound sketch of {name}, {image} comes first: my response to “{head}”.'
 ],
 lv:[
  'Vārda {name} sākumā «{head}» man ieskanas šāds tēls: {image}.',
  'Ja es zīmētu {name}, pirmais vilciens būtu {image} — tā man skan «{head}».',
  '{name} man raisa vienu tēlu: {image}. To iesāk «{head}».',
  'No «{head}» vārdā {name} iztēlē rodas {image}.',
  'Vārdam {name} gribas izvēlēties šādu tēlu: {image}. Viss sākas ar «{head}».',
  'Vārda {name} sākumu «{head}» es attēlotu šādi: {image}.',
  'Lasot {name}, tā sākums «{head}» man ir {image}.',
  'Vārda {name} skaņu zīmējumā vispirms rodas {image}: tā ir mana atbilde uz «{head}».'
 ],
 lt:[
  'Vardo {name} pradžioje «{head}» man suskamba toks vaizdas: {image}.',
  'Jei pieščiau {name}, pirmasis potėpis būtų {image} — taip man skamba «{head}».',
  '{name} man sukelia vieną vaizdą: {image}. Jį pradeda «{head}».',
  'Iš «{head}» varde {name} vaizduotėje atsiranda {image}.',
  'Vardui {name} norisi parinkti tokį vaizdą: {image}. Viskas prasideda nuo «{head}».',
  'Vardo {name} pradžią «{head}» nupieščiau taip: {image}.',
  'Skaitant {name}, jo pradžia «{head}» man tampa tokiu vaizdu: {image}.',
  'Vardo {name} garsų piešinyje pirmiausia atsiranda {image}: taip atsiliepiu į «{head}».'
 ],
 et:[
  'Nime {name} alguses «{head}» kuulen ma sellist pilti: {image}.',
  'Kui joonistaksin nime {name}, oleks esimene pintslitõmme {image} — nii kõlab mulle «{head}».',
  '{name} toob mulle silme ette ühe pildi: {image}. Selle algatab «{head}».',
  'Nime {name} algusest «{head}» tekib mu kujutlusse {image}.',
  'Nimele {name} valiksin sellise pildi: {image}. Kõik algab osast «{head}».',
  'Nime {name} algust «{head}» joonistaksin nii: {image}.',
  'Kui loen nime {name}, saab selle algusest «{head}» minu jaoks {image}.',
  'Nime {name} kõlajoonistuses ilmub kõigepealt {image}: see on mu vastus algusele «{head}».'
 ]
};
const movements={
 ru:['Середина «{middle}» растягивает этот миг,','В «{middle}» рисунок становится плавнее,','Участок «{middle}» добавляет к нему ещё один изгиб,','За «{head}» следует «{middle}», и темп меняется,'],
 en:['The middle “{middle}” stretches that moment,','In “{middle}”, the sketch grows more fluid,','The passage “{middle}” gives it another curve,','After “{head}” comes “{middle}”, and the pace changes,'],
 lv:['Vidusdaļa «{middle}» šo mirkli pagarina,','Daļā «{middle}» zīmējums kļūst plūstošāks,','Daļa «{middle}» tam piešķir vēl vienu izliekumu,','Pēc «{head}» nāk «{middle}», un temps mainās,'],
 lt:['Vidurys «{middle}» pratęsia tą akimirką,','Ties «{middle}» piešinys tampa sklandesnis,','Dalis «{middle}» prideda dar vieną vingį,','Po «{head}» ateina «{middle}», ir tempas keičiasi,'],
 et:['Keskosa «{middle}» venitab seda hetke,','Osas «{middle}» muutub joonistus voolavamaks,','Osa «{middle}» lisab sellele veel ühe kaare,','Pärast «{head}» tuleb «{middle}» ja tempo muutub,']
};
const endings={
 ru:['а открытое «{tail}» словно оставляет свету место за краем рисунка.','а «{tail}» в конце растворяется тихим шорохом.','а «{tail}» ещё немного отзывается после последней буквы.','а «{tail}» ставит короткую, ощутимую точку.'],
 en:['and the open “{tail}” seems to leave room for light beyond its edge.','while the final “{tail}” dissolves into a quiet rustle.','and “{tail}” lingers a little beyond the final letter.','and “{tail}” brings it to a short, tangible stop.'],
 lv:['bet atvērtais «{tail}» it kā atstāj gaismai vietu aiz zīmējuma malas.','bet beigu «{tail}» izgaist klusā šalkoņā.','un «{tail}» vēl mazliet atbalsojas pēc pēdējā burta.','bet «{tail}» pieliek īsu, sajūtamu punktu.'],
 lt:['o atviras «{tail}» tarsi palieka vietos šviesai už piešinio krašto.','o baigiamasis «{tail}» ištirpsta tyliame šlamesyje.','ir «{tail}» dar kiek atsiliepia po paskutinės raidės.','o «{tail}» padeda trumpą, juntamą tašką.'],
 et:['aga avatud «{tail}» jätab justkui valgusele ruumi joonistuse serva taha.','kuid lõpu «{tail}» hajub vaiksesse kahinasse.','ja «{tail}» jääb veel pärast viimast tähte pisut kajama.','aga «{tail}» paneb lühikese, tajutava punkti.']
};
export function nameImpression(name,lang='en'){
 const original=originals[identity(name)];if(original)return original[index[lang]??2].replaceAll('{name}',name);
 const shape=nameShape(name),values={...shape,name,image:pictures[shape.picture][index[lang]??2]},fill=s=>s.replace(/\{(\w+)\}/g,(_,key)=>values[key]);
 return fill(frames[lang]?.[shape.frame]||frames.en[shape.frame])+' '+fill((movements[lang]||movements.en)[shape.middle.length%4])+' '+fill((endings[lang]||endings.en)[shape.ending]);
}
const originals={
 fedots:[
  '{name} man atgādina rokām taisītu dāvanu — mazu koka putnu, kas pēc slīpēšanas vēl glabā plaukstu siltumu. Īsajā «-dots» it kā noklikšķ kastītes vāks. To atverot, vispirms pamani rūpību, tikai pēc tam pašu lietu.',
  '{name} напоминает мне подарок ручной работы — деревянную птицу, ещё тёплую после шлифовки. В коротком «-dots» будто щёлкает крышка коробочки. Открываешь её и сначала замечаешь вложенное внимание, а уже потом — саму вещь.',
  '{name} makes me think of a handmade gift: a wooden bird still warm from polishing. The short “-dots” sounds like the click of its little box. You open it and notice the care before you notice the object.',
  '{name} man primena rankų darbo dovaną — medinį paukštį, dar šiltą po šlifavimo. Trumpame «-dots» tarsi spragteli dėžutės dangtelis. Ją atvėrus pirmiausia pastebi rūpestį, o tik paskui patį daiktą.',
  '{name} meenutab mulle käsitsi tehtud kingitust: puust lindu, mis on lihvimisest veel soe. Lühikeses lõpus «-dots» klõpsatab justkui karbikaas. Karpi avades märkad kõigepealt hoolt ja alles siis eset.'
 ],
 teodors:[
  'Vārdā {name} dzirdu lēni atveramu mūzikas instrumenta futrāli. «Teo» dod telpu pirmajai notij, bet «-dors» pievieno koka dziļo rezonansi. Dāvana šajā ainā ir iespēja pirmoreiz izdzirdēt vēl nepazīstamu melodiju.',
  'В {name} мне слышится медленно открываемый футляр музыкального инструмента. «Teo» даёт пространство первой ноте, а «-dors» добавляет глубокий деревянный резонанс. Подарок в этой сцене — возможность впервые услышать ещё незнакомую мелодию.',
  'In {name}, I hear an instrument case opening slowly. “Teo” gives the first note space, while “-dors” adds a deep wooden resonance. The gift in this scene is hearing a melody you have never heard before.',
  'Varde {name} girdžiu lėtai atidaromą instrumento dėklą. «Teo» suteikia erdvės pirmajai natai, o «-dors» prideda gilų medžio rezonansą. Šio vaizdo dovana — pirmą kartą išgirsti dar nepažįstamą melodiją.',
  'Nimes {name} kuulen aeglaselt avanevat pillikasti. «Teo» annab esimesele noodile ruumi, «-dors» lisab puidu sügava resonantsi. Selle pildi kingitus on võimalus kuulda esimest korda veel tundmatut viisi.'
 ],
 teodora:[
  '{name} man ir gara gaismas josla uz parketa. Vidējais «-dor-» to it kā uz mirkli aiztur pie durvju sliekšņa, bet pēdējais «a» atkal ielaiž telpā. Tādu vārdu gribas uzzīmēt vienā nepārtrauktā līnijā.',
  '{name} для меня — длинная полоса света на паркете. Середина «-dor-» словно на миг задерживает её у порога, а последнее «a» снова впускает в комнату. Такое имя хочется нарисовать одной непрерывной линией.',
  '{name}, to me, is a long band of light across a wooden floor. The middle “-dor-” holds it at the threshold for a moment; the final “a” lets it into the room again. I would draw this name in one unbroken line.',
  '{name} man yra ilga šviesos juosta ant parketo. Vidurys «-dor-» trumpam ją sulaiko ties slenksčiu, o paskutinis «a» vėl įleidžia į kambarį. Tokį vardą norisi nupiešti viena nenutrūkstančia linija.',
  '{name} on minu jaoks pikk valgusriba parketil. Keskosa «-dor-» peatab selle hetkeks lävel, viimane «a» laseb valguse jälle tuppa. Seda nime tahaksin joonistada ühe katkematu joonega.'
 ],
 teobalds:[
  '{name} iztēlē pārtop par koka tiltu. Sākums «Teo» paceļas kā loks, bet blīvais «-balds» balstās uz stingriem pāļiem. Skaņas it kā pāriet no vienas malas uz otru, un zem tām paliek vieta upei.',
  '{name} в моём воображении превращается в деревянный мост. Начальное «Teo» поднимается дугой, а плотное «-balds» опирается на крепкие сваи. Звуки будто переходят с одного берега на другой, оставляя внизу место реке.',
  'In my imagination, {name} becomes a wooden bridge. Its opening “Teo” rises in an arch; the dense “-balds” rests on firm piles. The sounds cross from one bank to the other, leaving room for the river below.',
  '{name} mano vaizduotėje virsta mediniu tiltu. Pradinis «Teo» kyla lanku, o tankus «-balds» remiasi tvirtais poliais. Garsai tarsi pereina iš vieno kranto į kitą, apačioje palikdami vietos upei.',
  '{name} muutub mu kujutluses puusillaks. Alguse «Teo» kerkib kaarena, tihe lõpp «-balds» toetub kindlatele vaiadele. Häälikud astuvad ühelt kaldalt teisele, jättes all ruumi jõele.'
 ],
 tea:[
  'Trīs burti vārdā {name} man ir trīs mazi akmentiņi pie jūras. «T» dod pirmo piesitienu, «e» atrod līdzsvaru, bet «a» atver skatu uz ūdeni. Tik īsam vārdam iztēlē pietiek vietas veselam apvārsnim.',
  'Три буквы {name} для меня — три маленьких камня у моря. «T» даёт первый стук, «e» находит равновесие, а «a» открывает вид на воду. У такого короткого имени в воображении хватает места для целого горизонта.',
  'The three letters of {name} are three little stones by the sea to me. “T” makes the first tap, “e” finds its balance, and “a” opens the view of the water. This short name leaves room for a whole horizon.',
  'Trys {name} raidės man yra trys maži akmenukai prie jūros. «T» duoda pirmą stuksenimą, «e» randa pusiausvyrą, o «a» atveria vaizdą į vandenį. Toks trumpas vardas vaizduotėje sutalpina visą horizontą.',
  'Nime {name} kolm tähte on mulle kolm väikest kivi mere ääres. «T» teeb esimese koputuse, «e» leiab tasakaalu ja «a» avab vaate veele. Nii lühikeses nimes on kujutluses ruumi tervele silmapiirile.'
 ],
 teo:[
  '{name} es dzirdu kā vienu tīru zvaniņa skaņu. Sākuma «T» ir piesitiens, «e» — gaišais vidus, bet apaļais «o» ļauj skaņai aiziet tālāk. Vēl brīdi pēc pēdējā burta tā paliek gaisā.',
  '{name} я слышу как один чистый удар колокольчика. Начальное «T» — прикосновение, «e» — светлая середина, а круглое «o» отпускает звук вдаль. Ещё мгновение после последней буквы он остаётся в воздухе.',
  'I hear {name} as one clear chime. The opening “T” is the touch, “e” its bright centre, and the round “o” releases the sound into the distance. It stays in the air for a moment after the last letter.',
  '{name} girdžiu kaip vieną skaidrų varpelio dūžį. Pradinis «T» yra prisilietimas, «e» — šviesus vidurys, o apvalus «o» paleidžia garsą tolyn. Po paskutinės raidės jis dar akimirką lieka ore.',
  '{name} kõlab mulle ühe puhta kellalöögina. Alguse «T» on puudutus, «e» selle hele kese ning ümar «o» laseb heli kaugusse. Veel hetk pärast viimast tähte püsib see õhus.'
 ]
};
