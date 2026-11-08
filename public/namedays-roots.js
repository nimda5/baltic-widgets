// Reviewed name families. Meanings are historical glosses, not personality traits.
// Gloss order: lv, ru, en, lt, et. Aliases are explicit, never suffix guesses.
const rows=[
 ['theodore','Theodoros','Ancient Greek','Teodors Teodora Theodore Theodor Theodora Teodor Feodors Fedors Fjodors Fedor Feodor Фёдор Федор Феодор Феодора',['Dieva dāvana','дар Бога','gift of God','Dievo dovana','Jumala kingitus']],
 ['theodotus','Theodotos','Ancient Greek','Fedots Fedot Feodots Feodot Theodotus Theodotos Федот Феодот',['Dieva dots','данный Богом','given by God','Dievo duotas','Jumala antud']],
 ['theodosius','Theodosios','Ancient Greek','Feodosija Feodosijs Theodosia Theodosius Theodosios Феодосия Феодосий',['Dieva dots','данный Богом','given by God','Dievo duotas','Jumala antud']],
 ['theophilus','Theophilos','Ancient Greek','Teofils Teofila Teofile Teofilija Theophilus Theophilos Teofil Teofilo Феофил',['Dieva draugs','друг Бога','friend of God','Dievo draugas','Jumala sõber']],
 ['theobald','Theudebald','Germanic languages','Teobalds Theobald Theudebald Teobaldo Thibault Thibaut',['tauta un drosme','народ и смелость','people and bravery','tauta ir drąsa','rahvas ja vaprus']],
 ['axel','Absalom','Hebrew','Aksels Akselis Aksela Axel Aksel Absalom Аксель',['mans tēvs ir miers','мой отец — мир','my father is peace','mano tėvas yra taika','mu isa on rahu']],
 ['simeon','Shimon','Hebrew','Saimons Saimona Semions Semjons Simeons Simions Simon Simona Simeon Shimon Semjon Семён Симеон Симон',['viņš ir sadzirdējis','он услышал','he has heard','jis išgirdo','ta on kuulnud']],
 ['julian','Julianus','Latin','Julians Džulians Juliana Julian Julianna Julijans Юлиан Юлиана',['piederīgs Jūlijam','принадлежащий Юлию','belonging to Julius','priklausantis Julijui','Juliusele kuuluv']],
 ['francis','Franciscus','Latin','Franciska Francisks Francišeks Franciška Frančeska Frančiska Františeks Francis Francisco Francesca Franz Франциск Франциска',['francūzis','француз','Frenchman','prancūzas','prantslane']],
 ['reginald','Raginald','Germanic languages','Reginalds Redžinalds Redženalds Regnalds Regnolds Renalds Reinolds Renolds Reginald Reynold Rinaldo',['padoms un vara','совет и власть','counsel and rule','patarimas ir valdžia','nõuanne ja võim']],
 ['reinhard','Raginhard','Germanic languages','Reinhards Reinards Reinhard',['padoms un stingrība','совет и твёрдость','counsel and firmness','patarimas ir tvirtumas','nõuanne ja kindlus']],
 ['ambrose','Ambrosios','Ancient Greek','Ambrozijs Ambrosijs Amvrosijs Ambrose Ambrosius Амвросий',['nemirstīgs','бессмертный','immortal','nemirtingas','surematu']],
 ['amir','Amir','Arabic','Amirs Amira Amir Amirah Амир Амира',['valdnieks, princis','повелитель, князь','commander, prince','valdovas, princas','valitseja, prints']],
 ['amrita','Amrita','Sanskrit','Amrita Amrit Амрита',['nemirstība; dievu nektārs','бессмертие; нектар богов','immortality; the nectar of the gods','nemirtingumas; dievų nektaras','surematus; jumalate nektar']],
 ['arun','Aruna','Sanskrit','Aruns Arun Aruna Арун',['sarkanbrūns, rītausmas krāsa','красноватый, цвет зари','reddish brown, the colour of dawn','rausvai rudas, aušros spalvos','punakaspruun, koidu värv']],
 ['eric','Eirikr','Old Norse','Eriks Erika Airiks Airika Eric Erik Erika Eirik Эрик Эрика',['mūžīgais valdnieks','вечный правитель','ever ruler','amžinas valdovas','igavene valitseja']],
 ['albert','Adalbert','Germanic languages','Alberts Alberta Albert Albertas Альберт Альберта',['dižciltīgs un gaišs','благородный и светлый','noble and bright','kilnus ir šviesus','üllas ja hele']],
 ['alfred','Ælfræd','English','Alfreds Alfrida Alfred Alfredas Альфред',['elfu padoms','совет эльфов','elf counsel','elfų patarimas','haldjanõu']],
 ['edgar','Eadgar','English','Edgars Edgar Эдгар',['bagātība un šķēps','богатство и копьё','wealth and spear','turtas ir ietis','rikkus ja oda']],
 ['edmund','Eadmund','English','Edmunds Edmonds Edmonda Edmund Эдмунд',['bagātība un aizsardzība','богатство и защита','wealth and protection','turtas ir apsauga','rikkus ja kaitse']],
 ['edward','Eadweard','English','Eduards Edvards Eduarda Edvarda Edward Eduard Эдуард Эдвард',['bagātība un sargs','богатство и страж','wealth and guard','turtas ir sargas','rikkus ja valvur']],
 ['robert','Hrodebert','Germanic languages','Roberts Roberta Robert Роберт Роберта',['slava un spožums','слава и свет','fame and brightness','šlovė ir šviesa','kuulsus ja sära']],
 ['richard','Rikhard','Germanic languages','Rihards Ričards Richards Richard Ricardo Рихард Ричард',['valdnieks un drosme','власть и храбрость','rule and bravery','valdžia ir drąsa','võim ja vaprus']],
 ['martin','Martinus','Latin','Martins Martiņš Martina Martin Martynas Мартин',['piederīgs Marsam','принадлежащий Марсу','belonging to Mars','priklausantis Marsui','Marsile kuuluv']],
 ['peter','Petros','Ancient Greek','Peteris Petrs Petra Peter Petras Petar Пётр Петр Петра',['akmens','камень','stone','akmuo','kivi']],
 ['paul','Paulus','Latin','Pavils Pauls Paulis Paula Paulina Paul Paulius Павел Паула Паулина',['mazs','маленький','small','mažas','väike']],
 ['michael','Mikhael','Hebrew','Mihails Mihals Miķelis Mikels Mihaila Mikaela Michael Mikael Mihail Михаил Микаэль',['kurš ir kā Dievs?','кто подобен Богу?','who is like God?','kas yra kaip Dievas?','kes on nagu Jumal?']],
 ['gabriel','Gavriel','Hebrew','Gabriels Gabriela Gabriella Gabriel Gabriele Габриэль Гавриил',['Dievs ir mans spēks','Бог — моя сила','God is my strength','Dievas yra mano stiprybė','Jumal on mu jõud']],
 ['raphael','Rafael','Hebrew','Rafaels Rafails Rafaela Rafael Raphael Рафаил Рафаэль',['Dievs ir dziedinājis','Бог исцелил','God has healed','Dievas išgydė','Jumal on tervendanud']],
 ['daniel','Daniyyel','Hebrew','Daniels Daniils Danila Daniela Daniel Daniil Daniil Даниил Данила Даниэль',['Dievs ir mans tiesnesis','Бог — мой судья','God is my judge','Dievas yra mano teisėjas','Jumal on mu kohtunik']],
 ['david','Dawid','Hebrew','Davids Davis Davida David Dovydas Давид',['mīļotais','любимый','beloved','mylimasis','armastatu']],
 ['joseph','Yosef','Hebrew','Jazeps Jozefs Josifs Joseph Jozef Juozapas Иосиф Йозеф',['viņš vairos','он прибавит','he will add','jis pridės','ta lisab']],
 ['john','Yohanan','Hebrew','Janis Jans Ivans Ivana Ivanna Johann Johannes Johanna Joanna Johana Ivan John Ivanas Иван Иоанн Иоганн',['Dievs ir žēlīgs','Бог милостив','God is gracious','Dievas maloningas','Jumal on armuline']],
 ['anna','Hannah','Hebrew','Anna Anne Ann Anita Anete Annette Annija Anja Anya Hana Hannah Анна Анита Аня',['žēlastība','благодать','grace','malonė','arm']],
 ['marina','Marinus','Latin','Marina Marin Marinus Марина',['jūras','морской','of the sea','jūrinis','mereline']],
 ['margaret','Margarites','Ancient Greek','Margarita Margrieta Margareta Margieta Marga Margaret Margrethe Маргарита',['pērle','жемчужина','pearl','perlas','pärl']],
 ['irene','Eirene','Ancient Greek','Irena Irina Irene Eirene Ирина',['miers','мир','peace','taika','rahu']],
 ['sophia','Sophia','Ancient Greek','Sofija Sofia Sofya Sophia София Софья',['gudrība','мудрость','wisdom','išmintis','tarkus']],
 ['victor','Victor','Latin','Viktors Victors Viktorija Viktorina Viktor Viktoras Victoria Виктор Виктория',['uzvarētājs','победитель','victor','nugalėtojas','võitja']],
 ['felix','Felix','Latin','Felikss Feliks Felicija Felicita Felix Феликс',['laimīgs, veiksmīgs','счастливый, удачливый','happy, fortunate','laimingas, sėkmingas','õnnelik, edukas']],
 ['alexander','Alexandros','Ancient Greek','Aleksandrs Aleksanders Aleksandris Alexander Alexandros Александр',['cilvēku aizstāvis','защитник людей','defender of people','žmonių gynėjas','inimeste kaitsja']],
 ['andrew','Andreas','Ancient Greek','Andrejs Andris Andra Andrew Andreas Андрей',['vīrišķīgs','мужественный','manly','vyriškas','mehine']],
 ['george','Georgios','Ancient Greek','Georgs Georgijs Jurijs George Georgios Георгий Юрий',['zemkopis','земледелец','farmer','žemdirbys','põlluharija']],
 ['nicholas','Nikolaos','Ancient Greek','Nikolajs Nikols Nikolai Nikola Nicholas Nikolaos Николай',['tautas uzvara','победа народа','victory of the people','tautos pergalė','rahva võit']],
 ['philip','Philippos','Ancient Greek','Filips Filipsa Philip Filip Филипп',['zirgu mīļotājs','любящий лошадей','lover of horses','žirgų mylėtojas','hobuste armastaja']],
 ['stephen','Stephanos','Ancient Greek','Stefans Stefans Stepons Stepans Stepanija Stefanija Stephen Stefan Степан Стефан',['vainags','венок, корона','wreath, crown','vainikas','pärg']],
 ['alexis','Alexios','Ancient Greek','Aleksejs Aleksis Alexius Alexis Alexios Алексей',['aizstāvis','защитник','defender','gynėjas','kaitsja']],
 ['barbara','Barbaros','Ancient Greek','Barbara Barbala Barba Варвара',['svešiniece','чужеземка','foreign woman','svetimšalė','võõramaalanna']],
 ['veronica','Berenike','Ancient Greek','Veronika Veronica Вероника',['uzvaras nesēja','приносящая победу','bringer of victory','pergalės nešėja','võidu tooja']]
];
function norm(s){return s.normalize('NFD').replace(/(\p{Script=Latin})\p{M}+/gu,'$1').normalize('NFC').toLowerCase();}
export const REVIEWED_ROOTS=Object.fromEntries(rows.map(([key,form,origin,aliases,meaning])=>[key,{key,form,origin,aliases:aliases.split(' '),meaning,source:{url:'https://www.behindthename.com/name/'+key,type:'reviewed_name_root'}}]));
const parentSources={axel:'absalom',simeon:'simon-1',reginald:'reynold',reinhard:'reynard',arun:'aruna',amrita:'amrit',anna:'hannah',marina:'marinus',veronica:'berenice'};
for(const [key,parent] of Object.entries(parentSources))REVIEWED_ROOTS[key].sources=[{url:'https://www.behindthename.com/name/'+parent,type:'reviewed_name_root'}];
REVIEWED_ROOTS.amir.source.url='https://www.behindthename.com/name/amir-1';
for(const key of ['theodotus','theodosius'])REVIEWED_ROOTS[key].sources=[{url:'https://en.wikipedia.org/wiki/'+(key==='theodotus'?'Theodotus':'Theodosius'),type:'reviewed_name_root'}];
REVIEWED_ROOTS.theodotus.sources.push({url:'https://www.personvarduatveide.lv/words/24448?locale=en',type:'official_name_equivalence',provider:'Latvian Language Agency'});
const aliases=new Map();for(const root of Object.values(REVIEWED_ROOTS))for(const alias of [...root.aliases,root.form])aliases.set(norm(alias),root.key);
export function reviewedRoot(name,related=[]){
 const exact=aliases.get(norm(name));if(exact)return REVIEWED_ROOTS[exact];
 const candidates=[...new Set(related.map(n=>aliases.get(norm(n))).filter(Boolean))];
 return candidates.length===1?REVIEWED_ROOTS[candidates[0]]:null;
}
const languageIndex={lv:0,ru:1,en:2,lt:3,et:4};
const originLabels={"Ancient Greek":["sengrieķu","древнегреческие","Ancient Greek","senovės graikų","vanakreeka"],"Latin":["latīņu","латинские","Latin","lotynų","ladina"],"Hebrew":["senebreju","древнееврейские","Hebrew","hebrajų","heebrea"],"Germanic languages":["ģermāņu","германские","Germanic","germanų","germaani"],"Old Norse":["senskandināvu","древнескандинавские","Old Norse","senovės skandinavų","vanapõhja"],"English":["senangļu","древнеанглийские","Old English","senosios anglų","vanainglise"],"Arabic":["arābu","арабские","Arabic","arabų","araabia"],"Sanskrit":["sanskrita","санскритские","Sanskrit","sanskrito","sanskriti"]};
const lines={"lv":"Vārdam {name} ir {origin} saknes. {form} nozīmē «{meaning}».","ru":"У имени {name} {origin} корни. {form} означает «{meaning}».","en":"{name} has {origin} roots. {form} means “{meaning}”.","lt":"Vardas {name} turi {origin} šaknis. {form} reiškia «{meaning}».","et":"Nimel {name} on {origin} juured. {form} tähendab «{meaning}»."};
const details={
 theodore:[
  'Dorothea veidots no tiem pašiem diviem grieķu vārdiem, tikai pretējā secībā.',
  'Dorothea сложено из тех же двух греческих слов, только в обратном порядке.',
  'Dorothea uses the same two Greek words in the opposite order.',
  'Dorothea sudėtas iš tų pačių dviejų graikiškų žodžių, tik atvirkštine tvarka.',
  'Dorothea koosneb samadest kahest kreeka sõnast vastupidises järjekorras.'
 ],
 theodotus:[
  'Theodotos un Theodoros ir tuvi pēc nozīmes, taču to otrās daļas atšķiras.',
  'Theodotos и Theodoros близки по смыслу, но вторые части у них разные.',
  'Theodotos and Theodoros are close in meaning, but their second elements differ.',
  'Theodotos ir Theodoros reikšme artimi, tačiau jų antrosios dalys skiriasi.',
  'Theodotos ja Theodoros on tähenduselt lähedased, kuid nende teised osad erinevad.'
 ],
 theophilus:[
  'Tā sauca cilvēku, kuram Lūka veltīja savu evaņģēliju un Apustuļu darbus.',
  'Так звали человека, которому Лука посвятил своё Евангелие и Деяния апостолов.',
  'Luke addressed his Gospel and the Acts of the Apostles to a man of this name.',
  'Taip vadinosi žmogus, kuriam Lukas skyrė savo Evangeliją ir Apaštalų darbus.',
  'Sellenimelisele inimesele pühendas Luukas oma evangeeliumi ja Apostlite teod.'
 ],
 theobald:[
  'Vienu no 6. gadsimta franku karaļiem sauca Theudebald.',
  'Одного из франкских королей VI века звали Theudebald.',
  'Theudebald was the name of a sixth-century Frankish king.',
  'Theudebald buvo vieno VI amžiaus frankų karaliaus vardas.',
  'Theudebald oli ühe 6. sajandi Frangi kuninga nimi.'
 ],
 axel:[
  'Īsais Axel radās viduslaiku Dānijā no daudz garākā Absalom.',
  'Короткое Axel выросло в средневековой Дании из гораздо более длинного Absalom.',
  'The short form Axel grew out of the much longer Absalom in medieval Denmark.',
  'Trumpasis Axel viduramžių Danijoje išaugo iš gerokai ilgesnio Absalom.',
  'Lühike Axel kasvas keskaegses Taanis välja palju pikemast nimest Absalom.'
 ],
 simeon:[
  'Simeon un Simon ir divi grieķu ceļi no viena ebreju vārda.',
  'Simeon и Simon — два греческих пути от одного еврейского имени.',
  'Simeon and Simon are two Greek routes from the same Hebrew name.',
  'Simeon ir Simon — du graikiški keliai iš to paties hebrajiško vardo.',
  'Simeon ja Simon on kaks kreeka teed ühe ja sama heebrea nime juurest.'
 ],
 reinhard:[
  'Viduslaiku pasakās radniecīgo Reynard nesa lapsa; franču renard tagad nozīmē «lapsa».',
  'В средневековых сказках родственное Reynard носил лис; французское renard теперь означает «лиса».',
  'A fox bore the related name Reynard in medieval tales; French renard now means “fox”.',
  'Viduramžių pasakose giminingą Reynard turėjo lapinas; prancūziškas renard dabar reiškia «lapė».',
  'Keskaegsetes lugudes kandis rebane sugulasnime Reynard; prantsuse renard tähendab nüüd «rebast».'
 ],
 ambrose:[
  'Vārdu Eiropā palīdzēja izplatīt 4. gadsimta Milānas bīskaps Ambrozijs.',
  'Распространиться в Европе имени помог Амвросий, епископ Милана IV века.',
  'Ambrose, the fourth-century bishop of Milan, helped spread the name in Europe.',
  'Vardui Europoje paplisti padėjo IV amžiaus Milano vyskupas Ambraziejus.',
  'Nime levikule Euroopas aitas kaasa 4. sajandi Milano piiskop Ambrosius.'
 ]
};
export function rootHistory(key,name,lang){const root=REVIEWED_ROOTS[key];if(!root)return null;const i=languageIndex[lang]??2;return (lines[lang]||lines.en).replace(/\{(\w+)\}/g,(_,k)=>({name,origin:originLabels[root.origin][i],form:root.form,meaning:root.meaning[i]})[k])+(details[key]?' '+details[key][i]:'');}
