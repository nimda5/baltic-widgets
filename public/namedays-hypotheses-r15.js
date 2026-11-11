// Unverified 15 November comparisons: no root or dated attestation is transferred.
export const hypothesesLatvianR15={},hypothesesEstonianR15={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
for(const [name,compared]of [['Leopoldina','Leopolds'],['Undija','Unda'],['Undina','Undīna'],['Undita','Unda']]){
 const text=[
  `{name} varētu salīdzināt ar ${compared}, tomēr pārbaudītie avoti neapstiprina tiešu cilmes saikni tieši šai rakstībai. Tā paliek nepārbaudīta versija. Līdzīga skaņa vai galotne nav pietiekams pierādījums: ${compared} cilmi un vēsturiskos gadus nevar automātiski attiecināt uz {name}.`,
  `{name} можно предположительно сравнить с ${compared}, однако проверенные источники не подтверждают прямую связь происхождения именно для этого написания. Версия остаётся непроверенной. Сходства звучания или окончания недостаточно: происхождение и исторические годы ${compared} нельзя автоматически переносить на {name}.`,
  `{name} could be compared with ${compared}, but the checked references do not confirm a direct derivational link for this exact spelling. This remains an unverified proposal. Similar sound or an ending is insufficient evidence: the origin and historical dates of ${compared} cannot automatically be assigned to {name}.`,
  `{name} galima būtų lyginti su ${compared}, tačiau patikrinti šaltiniai nepatvirtina tiesioginio kilmės ryšio būtent šiai rašybai. Versija lieka nepatikrinta. Panašaus skambesio ar galūnės nepakanka: ${compared} kilmės ir istorinių metų negalima automatiškai perkelti vardui {name}.`,
  `{name} võiks võrrelda nimega ${compared}, kuid kontrollitud allikad ei kinnita just selle kirjapildi otsest päritoluseost. See jääb kontrollimata ettepanekuks. Sarnane kõla või lõpp ei ole piisav tõend: ${compared} päritolu ja ajaloolisi aastaid ei saa automaatselt nimele {name} üle kanda.`
 ];
 hypothesesLatvianR15[name]={sources:[cat(name),cat(compared)],comparison:compared,text:Object.fromEntries(langs.map((l,i)=>[l,[text[i]]]))};
}
hypothesesLatvianR15.Undalgs={sources:[cat('Undalgs'),'https://www.lrvk.gov.lv/lv/jaunumi/rigas-domes-nekustamo-ipasumu-parvaldiba-ka-ir-bijis-lidz-sim-un-ka-vajadzetu-but-turpmak'],text:{
 lv:['Undalgs cilme pārbaudītajos vārdnīcas materiālos nav noskaidrota. Salīdzinājums ar Unda vai citiem Und- vārdiem būtu tikai nepārbaudīts pieņēmums. Vārda lietojumu neatkarīgi apliecina Valsts kontroles diskusijas apraksts, kurā minēts Undalgs Mētra; šis piemērs neizskaidro vārda izveidošanos.'],
 ru:['Происхождение Undalgs в проверенных словарных материалах не установлено. Сопоставление с Unda или другими именами на Und- было бы лишь непроверенным предположением. Употребление отдельно подтверждает описание дискуссии Государственного контроля с участием Undalgs Mētra; этот пример не объясняет образование имени.'],
 en:['The checked dictionary material does not establish the origin of Undalgs. Comparing it with Unda or other Und- names would remain an unverified proposal. A State Audit Office discussion report independently documents the name in participant Undalgs Mētra, but this usage example does not explain its formation.'],
 lt:['Patikrinta žodyninė medžiaga nenustato Undalgs kilmės. Lyginimas su Unda ar kitais Und- vardais būtų tik nepatikrinta prielaida. Vartojimą atskirai patvirtina Valstybės kontrolės diskusijos aprašymas, kuriame minimas Undalgs Mētra, tačiau šis pavyzdys nepaaiškina vardo susidarymo.'],
 et:['Kontrollitud sõnaraamatumaterjal ei selgita Undalgsi päritolu. Võrdlus Unda või teiste Und-alguliste nimedega jääks kontrollimata oletuseks. Riigikontrolli arutelu kirjeldus dokumenteerib eraldi osaleja Undalgs Mētra nime, kuid see kasutusnäide ei seleta nime kujunemist.']
}};
hypothesesLatvianR15.Undis={sources:[cat('Undis'),'https://snl.no/Undis_-_kvinnenamn'],text:{
 lv:['Latviešu Undis cilme vēl nav apstiprināta. Salīdzinājums ar Unda būtu darba pieņēmums. Norvēģijā ir arī sieviešu vārds Undis, ko skaidro ar Unn un dis un datē ar 1897. gadu, taču citas valodas sieviešu vārda skaidrojums nepierāda šā latviešu vīriešu vārda cilmi vai rašanās laiku.'],
 ru:['Происхождение латышского Undis пока не подтверждено. Сравнение с Unda было бы рабочей гипотезой. В Норвегии есть женское Undis, объясняемое через Unn и dis и датируемое 1897 годом, но этимология женского имени другого языка не доказывает происхождение или время появления латышского мужского имени.'],
 en:['The origin of Latvian Undis remains unconfirmed. A comparison with Unda would be a working hypothesis. Norwegian also has a feminine Undis, explained through Unn and dis and dated to 1897, but the explanation of a female name in another language does not establish this Latvian masculine name’s origin or date.'],
 lt:['Latviško Undis kilmė dar nepatvirtinta. Palyginimas su Unda būtų darbo prielaida. Norvegų kalboje yra moteriškas Undis, aiškinamas per Unn ir dis ir datuojamas 1897 metais, tačiau kitos kalbos moters vardo etimologija neįrodo latviško vyro vardo kilmės ar atsiradimo laiko.'],
 et:['Läti Undise päritolu on veel kinnitamata. Võrdlus Undaga oleks tööhüpotees. Norra keeles on ka naisenimi Undis, mida seletatakse Unni ja disi kaudu ning dateeritakse aastasse 1897, kuid teise keele naisenime seletus ei tõenda selle läti mehenime päritolu ega loomisaega.']
}};
for(const name of ['Vaigi','Vaiki']){
 const text=[
  `{name} varētu būt saistīts ar igauņu Vaike un Vaige, tomēr tieša atbilsme šai rakstībai vēl nav apstiprināta. Megistes 1929. gada grāmata savieno Vaige ar Vaike un mierīguma vai klusuma skaidrojumu. Tas ir salīdzinājuma pamats, nevis pierādījums {name} cilmei vai tā pierakstam 1929. gadā.`,
  `{name} может быть связано с эстонскими Vaike и Vaige, однако прямое соответствие для этого написания ещё не подтверждено. Книга Мягисте 1929 года соединяет Vaige с Vaike и толкованием спокойствия или тишины. Это основа для сравнения, а не доказательство происхождения {name} или его записи в 1929 году.`,
  `{name} may be connected with Estonian Vaike and Vaige, but a direct correspondence for this spelling remains unconfirmed. Mägiste’s 1929 book links Vaige with Vaike and an explanation of calm or quiet. That supports a comparison, rather than proving the origin of {name} or its presence in a 1929 record.`,
  `{name} galėtų būti susijęs su estų Vaike ir Vaige, tačiau tiesioginė šios rašybos atitiktis dar nepatvirtinta. Mägiste 1929 metų knyga sieja Vaige su Vaike ir ramybės ar tylos aiškinimu. Tai pagrindas palyginti, o ne {name} kilmės ar jo įrašo 1929 metais įrodymas.`,
  `{name} võib olla seotud eesti Vaike ja Vaigega, kuid selle kirjapildi otsene vastavus on veel kinnitamata. Mägiste 1929. aasta raamat seob Vaige Vaikega ning rahulikkuse või vaikuse seletusega. See annab võrdlusaluse, mitte tõendi nime {name} päritolust või esinemisest 1929. aasta kirjes.`
 ];
 hypothesesEstonianR15[name]={sources:['https://en.wiktionary.org/wiki/Vaike#Estonian','https://www.etera.ee/api/oai2/download/10343.pdf#page=22'],comparison:'Vaike / Vaige',text:Object.fromEntries(langs.map((l,i)=>[l,[text[i]]]))};
}
