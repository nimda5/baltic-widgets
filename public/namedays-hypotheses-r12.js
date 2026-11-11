// Editorial comparisons only: none establishes an exact-name etymology.
export const hypothesesLatvianR12={};
const langs=['lv','ru','en','lt','et'];
const groups={
 Jevgeņijs:['Jevģenijs'],
 Jevgeņija:['Jevģēnija','Jevgēņija','Jevģenija','Jevženija','Jevžēnija'],
 Eugēnijs:['Evgenijs','Eugenijs','Evģenijs','Evģēnijs','Euģēnijs','Evgēnijs','Euģenijs']
};
for(const [compared,names] of Object.entries(groups))for(const name of names){
 const text=[
  `{name} varētu salīdzināt ar vārdnīcā aprakstīto formu ${compared}. Tā ir nepārbaudīta darba versija pēc rakstības līdzības: izmantotais šķirklis nepierāda tieši abu formu saikni. Tādēļ ${compared} cilmi, agrīnās liecības un kalendāra gadus nevar droši pārņemt vārdam {name}.`,
  `{name} можно предположительно сопоставить со словарной формой ${compared}. Это непроверенная рабочая версия по сходству написаний: использованная статья не доказывает связь именно этих двух форм. Поэтому происхождение, ранние записи и календарные годы ${compared} нельзя уверенно переносить на {name}.`,
  `{name} could be compared with the documented dictionary form ${compared}. This is an unverified working proposal based on spelling resemblance: the cited entry does not establish a relationship between these exact forms. The origin, early attestations and calendar years of ${compared} therefore cannot safely be assigned to {name}.`,
  `{name} būtų galima palyginti su žodyne aprašyta forma ${compared}. Tai nepatikrinta darbo versija pagal rašybos panašumą: naudojamas straipsnis neįrodo būtent šių dviejų formų ryšio. Todėl ${compared} kilmės, ankstyvų liudijimų ir kalendoriaus metų negalima patikimai perkelti vardui {name}.`,
  `{name} võiks võrrelda sõnaraamatus kirjeldatud vormiga ${compared}. See on kontrollimata tööversioon kirjapildi sarnasuse põhjal: viidatud artikkel ei tõesta just nende kahe vormi seost. Seega ei saa ${compared} päritolu, varaseid kirjeid ega kalendriaastaid kindlalt nimele {name} üle kanda.`
 ];
 hypothesesLatvianR12[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(compared)],text:Object.fromEntries(langs.map((l,i)=>[l,[text[i]]])),comparison:compared};
}
