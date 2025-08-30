/**
 * Geographic-related constants
 * Contains complete regions, cities, and related mappings for Ukraine
 */

export enum UkraineRegion {
  KYIV_CITY = 'kyiv_city',
  VINNYTSIA_REGION = 'vinnytsia_region',
  VOLYN_REGION = 'volyn_region',
  DNIPROPETROVSK_REGION = 'dnipropetrovsk_region',
  DONETSK_REGION = 'donetsk_region',
  ZHYTOMYR_REGION = 'zhytomyr_region',
  ZAKARPATTIA_REGION = 'zakarpattia_region',
  ZAPORIZHZHIA_REGION = 'zaporizhzhia_region',
  IVANO_FRANKIVSK_REGION = 'ivano_frankivsk_region',
  KIROVOHRAD_REGION = 'kirovohrad_region',
  KYIV_REGION = 'kyiv_region',
  LUHANSK_REGION = 'luhansk_region',
  LVIV_REGION = 'lviv_region',
  MYKOLAIV_REGION = 'mykolaiv_region',
  ODESA_REGION = 'odesa_region',
  POLTAVA_REGION = 'poltava_region',
  RIVNE_REGION = 'rivne_region',
  SUMY_REGION = 'sumy_region',
  TERNOPIL_REGION = 'ternopil_region',
  KHARKIV_REGION = 'kharkiv_region',
  KHERSON_REGION = 'kherson_region',
  KHMELNYTSKYI_REGION = 'khmelnytskyi_region',
  CHERKASY_REGION = 'cherkasy_region',
  CHERNIVTSI_REGION = 'chernivtsi_region',
  CHERNIHIV_REGION = 'chernihiv_region',
  CRIMEA = 'crimea',
  ABROAD = 'abroad'
}

export const UKRAINE_REGION_LABELS = {
  [UkraineRegion.KYIV_CITY]: 'м. Київ / Kyiv City',
  [UkraineRegion.VINNYTSIA_REGION]: 'Вінницька область / Vinnytsia Oblast',
  [UkraineRegion.VOLYN_REGION]: 'Волинська область / Volyn Oblast',
  [UkraineRegion.DNIPROPETROVSK_REGION]: 'Дніпропетровська область / Dnipropetrovsk Oblast',
  [UkraineRegion.DONETSK_REGION]: 'Донецька область / Donetsk Oblast',
  [UkraineRegion.ZHYTOMYR_REGION]: 'Житомирська область / Zhytomyr Oblast',
  [UkraineRegion.ZAKARPATTIA_REGION]: 'Закарпатська область / Zakarpattia Oblast',
  [UkraineRegion.ZAPORIZHZHIA_REGION]: 'Запорізька область / Zaporizhzhia Oblast',
  [UkraineRegion.IVANO_FRANKIVSK_REGION]: 'Івано-Франківська область / Ivano-Frankivsk Oblast',
  [UkraineRegion.KIROVOHRAD_REGION]: 'Кіровоградська область / Kirovohrad Oblast',
  [UkraineRegion.KYIV_REGION]: 'Київська область / Kyiv Oblast',
  [UkraineRegion.LUHANSK_REGION]: 'Луганська область / Luhansk Oblast',
  [UkraineRegion.LVIV_REGION]: 'Львівська область / Lviv Oblast',
  [UkraineRegion.MYKOLAIV_REGION]: 'Миколаївська область / Mykolaiv Oblast',
  [UkraineRegion.ODESA_REGION]: 'Одеська область / Odesa Oblast',
  [UkraineRegion.POLTAVA_REGION]: 'Полтавська область / Poltava Oblast',
  [UkraineRegion.RIVNE_REGION]: 'Рівненська область / Rivne Oblast',
  [UkraineRegion.SUMY_REGION]: 'Сумська область / Sumy Oblast',
  [UkraineRegion.TERNOPIL_REGION]: 'Тернопільська область / Ternopil Oblast',
  [UkraineRegion.KHARKIV_REGION]: 'Харківська область / Kharkiv Oblast',
  [UkraineRegion.KHERSON_REGION]: 'Херсонська область / Kherson Oblast',
  [UkraineRegion.KHMELNYTSKYI_REGION]: 'Хмельницька область / Khmelnytskyi Oblast',
  [UkraineRegion.CHERKASY_REGION]: 'Черкаська область / Cherkasy Oblast',
  [UkraineRegion.CHERNIVTSI_REGION]: 'Чернівецька область / Chernivtsi Oblast',
  [UkraineRegion.CHERNIHIV_REGION]: 'Чернігівська область / Chernihiv Oblast',
  [UkraineRegion.CRIMEA]: 'АР Крим / Autonomous Republic of Crimea',
  [UkraineRegion.ABROAD]: 'За кордоном / Abroad'
} as const;

// Comprehensive cities by region with Ukrainian and English names
export const UKRAINE_CITIES_BY_REGION = {
  [UkraineRegion.KYIV_CITY]: [
    { value: 'kyiv', label: 'Київ / Kyiv', isAdminCenter: true }
  ],
  
  [UkraineRegion.VINNYTSIA_REGION]: [
    { value: 'vinnytsia', label: 'Вінниця / Vinnytsia', isAdminCenter: true },
    { value: 'bershad', label: 'Бершадь / Bershad', isAdminCenter: false },
    { value: 'haisyn', label: 'Гайсин / Haisyn', isAdminCenter: false },
    { value: 'zhmerynka', label: 'Жмеринка / Zhmerynka', isAdminCenter: false },
    { value: 'illintsi', label: 'Іллінці / Illintsi', isAdminCenter: false },
    { value: 'kalynivka', label: 'Калинівка / Kalynivka', isAdminCenter: false },
    { value: 'khmilnyk', label: 'Хмільник / Khmilnyk', isAdminCenter: false },
    { value: 'mohyliv_podilskyi', label: 'Могилів-Подільський / Mohyliv-Podilskyi', isAdminCenter: false },
    { value: 'nemyriv', label: 'Немирів / Nemyriv', isAdminCenter: false },
    { value: 'tulchyn', label: 'Тульчин / Tulchyn', isAdminCenter: false }
  ],
  
  [UkraineRegion.VOLYN_REGION]: [
    { value: 'lutsk', label: 'Луцьк / Lutsk', isAdminCenter: true },
    { value: 'volodymyr_volynskyi', label: 'Володимир-Волинський / Volodymyr-Volynskyi', isAdminCenter: false },
    { value: 'kovel', label: 'Ковель / Kovel', isAdminCenter: false },
    { value: 'novovolynsk', label: 'Нововолинськ / Novovolynsk', isAdminCenter: false },
    { value: 'ustyluh', label: 'Устилуг / Ustyluh', isAdminCenter: false },
    { value: 'kivertsi', label: 'Ківерці / Kivertsi', isAdminCenter: false },
    { value: 'rozhyshche', label: 'Рожище / Rozhyshche', isAdminCenter: false }
  ],
  
  [UkraineRegion.DNIPROPETROVSK_REGION]: [
    { value: 'dnipro', label: 'Дніпро / Dnipro', isAdminCenter: true },
    { value: 'kryvyi_rih', label: 'Кривий Ріг / Kryvyi Rih', isAdminCenter: false },
    { value: 'kamianske', label: 'Кам\'янське / Kamianske', isAdminCenter: false },
    { value: 'nikopol', label: 'Нікополь / Nikopol', isAdminCenter: false },
    { value: 'novomoskovsk', label: 'Новомосковськ / Novomoskovsk', isAdminCenter: false },
    { value: 'pavlohrad', label: 'Павлоград / Pavlohrad', isAdminCenter: false },
    { value: 'synelnykove', label: 'Синельникове / Synelnykove', isAdminCenter: false },
    { value: 'zhovti_vody', label: 'Жовті Води / Zhovti Vody', isAdminCenter: false },
    { value: 'marhanets', label: 'Марганець / Marhanets', isAdminCenter: false },
    { value: 'ternivka', label: 'Тернівка / Ternivka', isAdminCenter: false }
  ],
  
  [UkraineRegion.DONETSK_REGION]: [
    { value: 'donetsk', label: 'Донецьк / Donetsk', isAdminCenter: true },
    { value: 'mariupol', label: 'Маріуполь / Mariupol', isAdminCenter: false },
    { value: 'kramatorsk', label: 'Краматорск / Kramatorsk', isAdminCenter: false },
    { value: 'sloviansk', label: 'Слов\'янськ / Sloviansk', isAdminCenter: false },
    { value: 'horlivka', label: 'Горлівка / Horlivka', isAdminCenter: false },
    { value: 'makiivka', label: 'Макіївка / Makiivka', isAdminCenter: false },
    { value: 'pokrovsk', label: 'Покровськ / Pokrovsk', isAdminCenter: false },
    { value: 'bakhmut', label: 'Бахмут / Bakhmut', isAdminCenter: false },
    { value: 'kostiantynivka', label: 'Костянтинівка / Kostiantynivka', isAdminCenter: false },
    { value: 'druzhkivka', label: 'Дружківка / Druzhkivka', isAdminCenter: false }
  ],
  
  [UkraineRegion.ZHYTOMYR_REGION]: [
    { value: 'zhytomyr', label: 'Житомир / Zhytomyr', isAdminCenter: true },
    { value: 'berdychiv', label: 'Бердичів / Berdychiv', isAdminCenter: false },
    { value: 'korosten', label: 'Коростень / Korosten', isAdminCenter: false },
    { value: 'novohrad_volynskyi', label: 'Новоград-Волинський / Novohrad-Volynskyi', isAdminCenter: false },
    { value: 'malyn', label: 'Малин / Malyn', isAdminCenter: false },
    { value: 'ovruch', label: 'Овруч / Ovruch', isAdminCenter: false },
    { value: 'radomyshl', label: 'Радомишль / Radomyshl', isAdminCenter: false },
    { value: 'cherniakhiv', label: 'Черняхів / Cherniakhiv', isAdminCenter: false }
  ],
  
  [UkraineRegion.ZAKARPATTIA_REGION]: [
    { value: 'uzhhorod', label: 'Ужгород / Uzhhorod', isAdminCenter: true },
    { value: 'mukachevo', label: 'Мукачево / Mukachevo', isAdminCenter: false },
    { value: 'berehove', label: 'Берегове / Berehove', isAdminCenter: false },
    { value: 'vynohradiv', label: 'Виноградів / Vynohradiv', isAdminCenter: false },
    { value: 'khust', label: 'Хуст / Khust', isAdminCenter: false },
    { value: 'tiachiv', label: 'Тячів / Tiachiv', isAdminCenter: false },
    { value: 'rakhiv', label: 'Рахів / Rakhiv', isAdminCenter: false },
    { value: 'chop', label: 'Чоп / Chop', isAdminCenter: false }
  ],
  
  [UkraineRegion.ZAPORIZHZHIA_REGION]: [
    { value: 'zaporizhzhia', label: 'Запоріжжя / Zaporizhzhia', isAdminCenter: true },
    { value: 'melitopol', label: 'Мелітополь / Melitopol', isAdminCenter: false },
    { value: 'berdyansk', label: 'Бердянськ / Berdyansk', isAdminCenter: false },
    { value: 'enerhodar', label: 'Енергодар / Enerhodar', isAdminCenter: false },
    { value: 'tokmak', label: 'Токмак / Tokmak', isAdminCenter: false },
    { value: 'orikhiv', label: 'Оріхів / Orikhiv', isAdminCenter: false },
    { value: 'polohy', label: 'Пологи / Polohy', isAdminCenter: false },
    { value: 'hulyaipole', label: 'Гуляйполе / Hulyaipole', isAdminCenter: false }
  ],
  
  [UkraineRegion.IVANO_FRANKIVSK_REGION]: [
    { value: 'ivano_frankivsk', label: 'Івано-Франківськ / Ivano-Frankivsk', isAdminCenter: true },
    { value: 'kalush', label: 'Калуш / Kalush', isAdminCenter: false },
    { value: 'kolomyia', label: 'Коломия / Kolomyia', isAdminCenter: false },
    { value: 'chernivtsi_if', label: 'Чернівці / Chernivtsi', isAdminCenter: false },
    { value: 'yaremche', label: 'Яремче / Yaremche', isAdminCenter: false },
    { value: 'nadvirna', label: 'Надвірна / Nadvirna', isAdminCenter: false },
    { value: 'dolyna', label: 'Долина / Dolyna', isAdminCenter: false },
    { value: 'horodenka', label: 'Городенка / Horodenka', isAdminCenter: false }
  ],
  
  [UkraineRegion.KIROVOHRAD_REGION]: [
    { value: 'kropyvnytskyi', label: 'Кропивницький / Kropyvnytskyi', isAdminCenter: true },
    { value: 'oleksandriia', label: 'Олександрія / Oleksandriia', isAdminCenter: false },
    { value: 'znamianka', label: 'Знам\'янка / Znamianka', isAdminCenter: false },
    { value: 'svitlovodsk', label: 'Світловодськ / Svitlovodsk', isAdminCenter: false },
    { value: 'novomyrhorod', label: 'Новомиргород / Novomyrhorod', isAdminCenter: false },
    { value: 'dolynska', label: 'Долинська / Dolynska', isAdminCenter: false },
    { value: 'hayvoron', label: 'Гайворон / Hayvoron', isAdminCenter: false }
  ],
  
  [UkraineRegion.KYIV_REGION]: [
    { value: 'bila_tserkva', label: 'Біла Церква / Bila Tserkva', isAdminCenter: false },
    { value: 'brovary', label: 'Бровари / Brovary', isAdminCenter: false },
    { value: 'irpin', label: 'Ірпінь / Irpin', isAdminCenter: false },
    { value: 'bucha', label: 'Буча / Bucha', isAdminCenter: false },
    { value: 'fastiv', label: 'Фастів / Fastiv', isAdminCenter: false },
    { value: 'obukhiv', label: 'Обухів / Obukhiv', isAdminCenter: false },
    { value: 'pereiaslav', label: 'Переяслав / Pereiaslav', isAdminCenter: false },
    { value: 'slavutych', label: 'Славутич / Slavutych', isAdminCenter: false },
    { value: 'vasylkiv', label: 'Васильків / Vasylkiv', isAdminCenter: false },
    { value: 'vyshorod', label: 'Вишгород / Vyshorod', isAdminCenter: false }
  ],
  
  [UkraineRegion.LUHANSK_REGION]: [
    { value: 'luhansk', label: 'Луганськ / Luhansk', isAdminCenter: true },
    { value: 'sievierodonetsk', label: 'Сєвєродонецьк / Sievierodonetsk', isAdminCenter: false },
    { value: 'lysychansk', label: 'Лисичанськ / Lysychansk', isAdminCenter: false },
    { value: 'alchevsk', label: 'Алчевськ / Alchevsk', isAdminCenter: false },
    { value: 'stakhanov', label: 'Стаханов / Stakhanov', isAdminCenter: false },
    { value: 'rubizhne', label: 'Рубіжне / Rubizhne', isAdminCenter: false },
    { value: 'kreminna', label: 'Кремінна / Kreminna', isAdminCenter: false },
    { value: 'svatove', label: 'Сватове / Svatove', isAdminCenter: false }
  ],
  
  [UkraineRegion.LVIV_REGION]: [
    { value: 'lviv', label: 'Львів / Lviv', isAdminCenter: true },
    { value: 'drohobych', label: 'Дрогобич / Drohobych', isAdminCenter: false },
    { value: 'chervonohrad', label: 'Червоноград / Chervonohrad', isAdminCenter: false },
    { value: 'stryi', label: 'Стрий / Stryi', isAdminCenter: false },
    { value: 'truskavets', label: 'Трускавець / Truskavets', isAdminCenter: false },
    { value: 'sambir', label: 'Самбір / Sambir', isAdminCenter: false },
    { value: 'boryslav', label: 'Борислав / Boryslav', isAdminCenter: false },
    { value: 'yavoriv', label: 'Яворів / Yavoriv', isAdminCenter: false },
    { value: 'morshyn', label: 'Моршин / Morshyn', isAdminCenter: false },
    { value: 'novyi_rozdil', label: 'Новий Розділ / Novyi Rozdil', isAdminCenter: false }
  ],
  
  [UkraineRegion.MYKOLAIV_REGION]: [
    { value: 'mykolaiv', label: 'Миколаїв / Mykolaiv', isAdminCenter: true },
    { value: 'pervomaysk', label: 'Первомайськ / Pervomaysk', isAdminCenter: false },
    { value: 'voznesensk', label: 'Вознесенськ / Voznesensk', isAdminCenter: false },
    { value: 'ochakiv', label: 'Очаків / Ochakiv', isAdminCenter: false },
    { value: 'bashtanka', label: 'Баштанка / Bashtanka', isAdminCenter: false },
    { value: 'nova_odesa', label: 'Нова Одеса / Nova Odesa', isAdminCenter: false },
    { value: 'snihurivka', label: 'Снігурівка / Snihurivka', isAdminCenter: false }
  ],
  
  [UkraineRegion.ODESA_REGION]: [
    { value: 'odesa', label: 'Одеса / Odesa', isAdminCenter: true },
    { value: 'chornomorsk', label: 'Чорноморськ / Chornomorsk', isAdminCenter: false },
    { value: 'izmayil', label: 'Ізмаїл / Izmayil', isAdminCenter: false },
    { value: 'bilhorod_dnistrovskyi', label: 'Білгород-Дністровський / Bilhorod-Dnistrovskyi', isAdminCenter: false },
    { value: 'podilsk', label: 'Подільськ / Podilsk', isAdminCenter: false },
    { value: 'yuzhne', label: 'Южне / Yuzhne', isAdminCenter: false },
    { value: 'reni', label: 'Рені / Reni', isAdminCenter: false },
    { value: 'teplodar', label: 'Теплодар / Teplodar', isAdminCenter: false }
  ],
  
  [UkraineRegion.POLTAVA_REGION]: [
    { value: 'poltava', label: 'Полтава / Poltava', isAdminCenter: true },
    { value: 'kremenchuk', label: 'Кременчук / Kremenchuk', isAdminCenter: false },
    { value: 'komsomolsk', label: 'Комсомольськ / Komsomolsk', isAdminCenter: false },
    { value: 'myrhorod', label: 'Миргород / Myrhorod', isAdminCenter: false },
    { value: 'lubny', label: 'Лубни / Lubny', isAdminCenter: false },
    { value: 'hadiach', label: 'Гадяч / Hadiach', isAdminCenter: false },
    { value: 'pyriatyn', label: 'Пирятин / Pyriatyn', isAdminCenter: false },
    { value: 'zinkiv', label: 'Зіньків / Zinkiv', isAdminCenter: false }
  ],
  
  [UkraineRegion.RIVNE_REGION]: [
    { value: 'rivne', label: 'Рівне / Rivne', isAdminCenter: true },
    { value: 'varash', label: 'Вараш / Varash', isAdminCenter: false },
    { value: 'dubno', label: 'Дубно / Dubno', isAdminCenter: false },
    { value: 'ostroh', label: 'Острог / Ostroh', isAdminCenter: false },
    { value: 'sarny', label: 'Сарни / Sarny', isAdminCenter: false },
    { value: 'bereznе', label: 'Березне / Bereznе', isAdminCenter: false },
    { value: 'kostopil', label: 'Костопіль / Kostopil', isAdminCenter: false }
  ],
  
  [UkraineRegion.SUMY_REGION]: [
    { value: 'sumy', label: 'Суми / Sumy', isAdminCenter: true },
    { value: 'konotop', label: 'Конотоп / Konotop', isAdminCenter: false },
    { value: 'shostka', label: 'Шостка / Shostka', isAdminCenter: false },
    { value: 'romny', label: 'Ромни / Romny', isAdminCenter: false },
    { value: 'okhtyrka', label: 'Охтирка / Okhtyrka', isAdminCenter: false },
    { value: 'hlukhiv', label: 'Глухів / Hlukhiv', isAdminCenter: false },
    { value: 'lebedyn', label: 'Лебедин / Lebedyn', isAdminCenter: false },
    { value: 'trostianets', label: 'Тростянець / Trostianets', isAdminCenter: false }
  ],
  
  [UkraineRegion.TERNOPIL_REGION]: [
    { value: 'ternopil', label: 'Тернопіль / Ternopil', isAdminCenter: true },
    { value: 'chortkiv', label: 'Чортків / Chortkiv', isAdminCenter: false },
    { value: 'kremenets', label: 'Кременець / Kremenets', isAdminCenter: false },
    { value: 'berezhany', label: 'Бережани / Berezhany', isAdminCenter: false },
    { value: 'buchach', label: 'Бучач / Buchach', isAdminCenter: false },
    { value: 'terebovlia', label: 'Теребовля / Terebovlia', isAdminCenter: false },
    { value: 'zbarazh', label: 'Збараж / Zbarazh', isAdminCenter: false }
  ],
  
  [UkraineRegion.KHARKIV_REGION]: [
    { value: 'kharkiv', label: 'Харків / Kharkiv', isAdminCenter: true },
    { value: 'lozova', label: 'Лозова / Lozova', isAdminCenter: false },
    { value: 'izium', label: 'Ізюм / Izium', isAdminCenter: false },
    { value: 'kupiansk', label: 'Куп\'янськ / Kupiansk', isAdminCenter: false },
    { value: 'chuhuiv', label: 'Чугуїв / Chuhuiv', isAdminCenter: false },
    { value: 'balakliia', label: 'Балаклія / Balakliia', isAdminCenter: false },
    { value: 'pervomayskyi', label: 'Первомайський / Pervomayskyi', isAdminCenter: false },
    { value: 'merefa', label: 'Мерефа / Merefa', isAdminCenter: false }
  ],
  
  [UkraineRegion.KHERSON_REGION]: [
    { value: 'kherson', label: 'Херсон / Kherson', isAdminCenter: true },
    { value: 'nova_kakhovka', label: 'Нова Каховка / Nova Kakhovka', isAdminCenter: false },
    { value: 'kakhovka', label: 'Каховка / Kakhovka', isAdminCenter: false },
    { value: 'skadovsk', label: 'Скадовськ / Skadovsk', isAdminCenter: false },
    { value: 'henichesk', label: 'Генічеськ / Henichesk', isAdminCenter: false },
    { value: 'tavriisk', label: 'Таврійськ / Tavriisk', isAdminCenter: false },
    { value: 'oleshky', label: 'Олешки / Oleshky', isAdminCenter: false }
  ],
  
  [UkraineRegion.KHMELNYTSKYI_REGION]: [
    { value: 'khmelnytskyi', label: 'Хмельницький / Khmelnytskyi', isAdminCenter: true },
    { value: 'kamianets_podilskyi', label: 'Кам\'янець-Подільський / Kamianets-Podilskyi', isAdminCenter: false },
    { value: 'netishyn', label: 'Нетішин / Netishyn', isAdminCenter: false },
    { value: 'slavuta', label: 'Славута / Slavuta', isAdminCenter: false },
    { value: 'shepetivka', label: 'Шепетівка / Shepetivka', isAdminCenter: false },
    { value: 'starokostiantyniv', label: 'Старокостянтинів / Starokostiantyniv', isAdminCenter: false },
    { value: 'polonne', label: 'Полонне / Polonne', isAdminCenter: false }
  ],
  
  [UkraineRegion.CHERKASY_REGION]: [
    { value: 'cherkasy', label: 'Черкаси / Cherkasy', isAdminCenter: true },
    { value: 'uman', label: 'Умань / Uman', isAdminCenter: false },
    { value: 'smila', label: 'Сміла / Smila', isAdminCenter: false },
    { value: 'zolotonosha', label: 'Золотоноша / Zolotonosha', isAdminCenter: false },
    { value: 'kaniv', label: 'Канів / Kaniv', isAdminCenter: false },
    { value: 'chyhyryn', label: 'Чигирин / Chyhyryn', isAdminCenter: false },
    { value: 'vatutine', label: 'Ватутіне / Vatutine', isAdminCenter: false },
    { value: 'khrystynivka', label: 'Христинівка / Khrystynivka', isAdminCenter: false }
  ],
  
  [UkraineRegion.CHERNIVTSI_REGION]: [
    { value: 'chernivtsi', label: 'Чернівці / Chernivtsi', isAdminCenter: true },
    { value: 'khotyn', label: 'Хотин / Khotyn', isAdminCenter: false },
    { value: 'novoselytsia', label: 'Новоселиця / Novoselytsia', isAdminCenter: false },
    { value: 'storozhynets', label: 'Сторожинець / Storozhynets', isAdminCenter: false },
    { value: 'vashkivtsi', label: 'Вашківці / Vashkivtsi', isAdminCenter: false },
    { value: 'kitsman', label: 'Кіцмань / Kitsman', isAdminCenter: false },
    { value: 'sokyriany', label: 'Сокиряни / Sokyriany', isAdminCenter: false }
  ],
  
  [UkraineRegion.CHERNIHIV_REGION]: [
    { value: 'chernihiv', label: 'Чернігів / Chernihiv', isAdminCenter: true },
    { value: 'nizhyn', label: 'Ніжин / Nizhyn', isAdminCenter: false },
    { value: 'pryluky', label: 'Прилуки / Pryluky', isAdminCenter: false },
    { value: 'bakhmach', label: 'Бахмач / Bakhmach', isAdminCenter: false },
    { value: 'novhorod_siverskyi', label: 'Новгород-Сіверський / Novhorod-Siverskyi', isAdminCenter: false },
    { value: 'mena', label: 'Мена / Mena', isAdminCenter: false },
    { value: 'kozelets', label: 'Козелець / Kozelets', isAdminCenter: false },
    { value: 'ichnia', label: 'Ічня / Ichnia', isAdminCenter: false }
  ],
  
  [UkraineRegion.CRIMEA]: [
    { value: 'simferopol', label: 'Сімферополь / Simferopol', isAdminCenter: true },
    { value: 'sevastopol', label: 'Севастополь / Sevastopol', isAdminCenter: false },
    { value: 'kerch', label: 'Керч / Kerch', isAdminCenter: false },
    { value: 'yevpatoriia', label: 'Євпаторія / Yevpatoriia', isAdminCenter: false },
    { value: 'feodosiia', label: 'Феодосія / Feodosiia', isAdminCenter: false },
    { value: 'yalta', label: 'Ялта / Yalta', isAdminCenter: false },
    { value: 'alushta', label: 'Алушта / Alushta', isAdminCenter: false },
    { value: 'dzhankoi', label: 'Джанкой / Dzhankoi', isAdminCenter: false }
  ],
  
  [UkraineRegion.ABROAD]: [
    { value: 'other', label: 'Інше / Other', isAdminCenter: false }
  ]
} as const;

// Helper functions for working with geographic data
export const getRegionsForDropdown = () => {
  return Object.entries(UKRAINE_REGION_LABELS).map(([value, label]) => ({
    value,
    label,
    disabled: false
  }));
};

export const getCitiesByRegion = (regionValue: string) => {
  const region = regionValue as UkraineRegion;
  return UKRAINE_CITIES_BY_REGION[region] || [];
};

export const getCitiesForDropdown = (regionValue: string) => {
  const cities = getCitiesByRegion(regionValue);
  return cities.map(city => ({
    value: city.value,
    label: city.label,
    disabled: false
  }));
};

// Aliases for clearer external usage in registration modules
export const getRegionOptions = getRegionsForDropdown;
export const getCityOptions = getCitiesForDropdown;

// Get all administrative centers (for special handling if needed)
export const getAdministrativeCenters = () => {
  const centers: Array<{ region: string; city: string; label: string }> = [];
  
  Object.entries(UKRAINE_CITIES_BY_REGION).forEach(([region, cities]) => {
    const adminCenter = cities.find(city => city.isAdminCenter);
    if (adminCenter) {
      centers.push({
        region,
        city: adminCenter.value,
        label: adminCenter.label
      });
    }
  });
  
  return centers;
};

// Check if a city is an administrative center
export const isAdministrativeCenter = (regionValue: string, cityValue: string): boolean => {
  const cities = getCitiesByRegion(regionValue);
  const city = cities.find(c => c.value === cityValue);
  return city?.isAdminCenter || false;
};
