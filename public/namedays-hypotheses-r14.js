// 14 November comparisons remain unverified even where dated use is documented.
export const hypothesesLatvianR14={},hypothesesEstonianR14={};
const langs=['lv','ru','en','lt','et'];
for(const [name,compared]of [['Fridriha','Friderika'],['Vicenta','Vincenta'],['Vincentina','Vincentīna']]){
 const text=[
  `{name} varētu salīdzināt ar dokumentēto formu ${compared}. Tā paliek nepārbaudīta darba versija: izmantotais avots nenodrošina nepārprotamu atbilsmi tieši šai rakstībai. Tādēļ ${compared} cilmi, agrīnos pierakstus un kalendāra gadus nevar automātiski attiecināt uz {name}.`,
  `{name} можно предположительно сопоставить с документированной формой ${compared}. Это остаётся непроверенной рабочей версией: источник не даёт однозначного соответствия именно этому написанию. Поэтому происхождение, ранние записи и календарные годы ${compared} нельзя автоматически переносить на {name}.`,
  `{name} could be compared with the documented form ${compared}. This remains an unverified working proposal: the reference does not provide an unambiguous correspondence for this exact spelling. The origin, early records and calendar years of ${compared} therefore cannot automatically be assigned to {name}.`,
  `{name} galima būtų lyginti su dokumentuota forma ${compared}. Tai lieka nepatikrinta darbo versija: šaltinis nepateikia vienareikšmės atitikties būtent šiai rašybai. Todėl ${compared} kilmės, ankstyvų įrašų ir kalendoriaus metų negalima automatiškai perkelti vardui {name}.`,
  `{name} võiks võrrelda dokumenteeritud vormiga ${compared}. See jääb kontrollimata tööversiooniks: allikas ei anna just sellele kirjapildile ühemõttelist vastavust. Seega ei saa ${compared} päritolu, varaseid kirjeid ega kalendriaastaid automaatselt nimele {name} üle kanda.`
 ];
 hypothesesLatvianR14[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(compared)],comparison:compared,text:Object.fromEntries(langs.map((l,i)=>[l,[text[i]]]))};
}
hypothesesLatvianR14.Vikars={sources:['https://www.izpetnieks.lv/en/name/Vikars'],comparison:'Latin vicarius',text:{
 lv:['Vikars vārdnīcā piesardzīgi salīdzināts ar latīņu vicarius, «vietnieks, palīgs». Pats avots šo cilmi apšauba, tādēļ tā saglabāta kā nepārbaudīts pieņēmums. Atsevišķi dokumentēts Vikars personvārda pieraksts Bauskas apkārtnē 1975. gadā; tas apstiprina lietojumu, nevis piedāvāto latīņu cilmi.'],
 ru:['Vikars словарь предположительно сравнивает с латинским vicarius, «заместитель, помощник». Сам источник ставит происхождение под вопрос, поэтому оно остаётся непроверенной версией. Отдельно документирована личная запись Vikars около Бауски в 1975 году; она подтверждает употребление, а не предложенную латинскую этимологию.'],
 en:['The dictionary tentatively compares Vikars with Latin vicarius, deputy or helper. The source itself questions this origin, so it remains an unverified proposal. A separate personal-name record of Vikars near Bauska in 1975 establishes use, rather than the suggested Latin etymology.'],
 lt:['Žodynas Vikars atsargiai lygina su lotynų vicarius „pavaduotojas, padėjėjas“. Pats šaltinis šia kilme abejoja, todėl ji lieka nepatikrinta versija. Atskirai dokumentuotas Vikars asmenvardžio įrašas netoli Bauskės 1975 metais patvirtina vartojimą, o ne siūlomą lotynišką etimologiją.'],
 et:['Sõnaraamat võrdleb Vikarsit oletuslikult ladina sõnaga vicarius, asetäitja või abiline. Allikas ise seab selle päritolu kahtluse alla, mistõttu see jääb kontrollimata ettepanekuks. Eraldi Vikarsi isikunimekirje Bauska lähedalt 1975. aastal tõendab kasutust, mitte pakutud ladina etümoloogiat.']
}};
hypothesesEstonianR14.Alve={sources:['https://en.wiktionary.org/wiki/Alviine#Estonian','https://en.wiktionary.org/wiki/Alvi#Estonian','https://www.stat.ee/nimed/ALVE'],comparison:'Alviine / Alvi',text:{
 lv:['Alve varētu būt saistīts ar Alviine un Alvi: igauņu vārdnīcas šķirkļi to min saistīto vārdu vidū. Tomēr tie nedod atsevišķu Alve cilmes skaidrojumu, tādēļ atvasināšanas ceļš paliek nepārbaudīts. Līdzīgs skandināvu vārds vai somu uzvārds pats par sevi nepierāda šā igauņu vārda izcelsmi.'],
 ru:['Alve может быть связано с Alviine и Alvi: эстонские словарные статьи называют его среди связанных имён. Однако отдельной этимологии Alve они не дают, поэтому путь образования остаётся непроверенным. Похожее скандинавское имя или финская фамилия сами по себе не объясняют происхождение эстонского имени.'],
 en:['Alve may be connected with Alviine and Alvi: the Estonian dictionary entries list it among related names. They do not supply a separate Alve etymology, so its derivational route remains unverified. A similar Scandinavian name or Finnish surname does not itself establish the Estonian name’s origin.'],
 lt:['Alve galėtų būti susijęs su Alviine ir Alvi: estų žodyno straipsniai jį mini tarp susijusių vardų. Tačiau atskiros Alve etimologijos nepateikia, tad darybos kelias lieka nepatikrintas. Panašus skandinavų vardas ar suomių pavardė savaime nepaaiškina estiško vardo kilmės.'],
 et:['Alve võib olla seotud Alviine ja Alviga: eesti sõnaraamatuartiklid loetlevad selle seotud nimede hulgas. Eraldi Alve etümoloogiat need ei anna, mistõttu tuletustee jääb kontrollimata. Sarnane skandinaavia nimi või soome perekonnanimi ei tõesta iseenesest eesti nime päritolu.']
}};
