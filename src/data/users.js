const USERS = [{
        available_wms: "[]",
        db_conn: null,
        editable_wms: "[]",
        email: "admin@mail",
        filters: "{}",
        id: "1",
        login: "admin",
        name: "Адмін",
        parameters: "",
        password: "??????",
        print: true,
        selectable_wms: "[]",
        status: "admin",
}, {
        available_wms: "[]",
        db_conn: "host=31.131.28.7 port=5432 dbname=agroprav_db schema=public user=postgres  password=password_anton",
        editable_wms: "[{\"layerName\":\"l100\",\"layerId\":\"l0\",\"workspace\":\"Agro\",\"style\":\"\",\"title\":\"Ділянки\"}]",
        email: "test@mail",
        filters: "{}",
        id: "3",
        login: "test2",
        name: "Тест",
        parameters: "l1[area,objectid,p011,p023,p024,p040,p041,p043,perimeter]l0[area,p001,p002,p003,p004,p005,p006,p007,p008,p009,p010,p011,p012,p013,p014,p015,p016,p017,p018,p019,p020,p021,p022,p023,p024,p025,p026,p027,p028,p029,p030,p031,p032,p033,p034,p035,p036,p037,p038,p039,p045,perimeter",
        password: "??????",
        print: true,
        selectable_wms: "[{\"title\":\"Поля обробітку\",\"workspace\":\"Agro\",\"layerId\":\"l1\",\"layerName\":\"l200\",\"style\":\"\"}]",
        status: null,
}, {
        available_wms: "[]",
        db_conn: "host=localhost port=5432 dbname=bazis schema=public user=postgres password=admin",
        editable_wms: "[]",
        email: "vldmr@mail",
        filters: "{}",
        id: "97",
        login: "vladimir",
        name: "Владимир",
        parameters: "g3[]g8[]g9[area,p097,p40044,p888000,perimeter]g15[]g57[area,p097,p40044,p888004,p888011,p888013,p888026,p888027,p888033,p888034,perimeter]g59[]g61[]g62[area,count,p097,p11010,p3405963,p3405964,p3405965,p40044,p888000,p888001,p888007,p888009,p888010,p888030,p888037,p888038,perimeter]g2[area,p097,p40044,p888000,perimeter]g10[area,p097,p099,p100,p120,p121,p40044,p8050,p8060,p8070,p8080,p888000,perimeter",
        password: "??????",
        print: false,
        selectable_wms: "[{\"layerName\":\"Функціональне зонування території\",\"layerId\":\"g62\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"Функціональне зонування території\"},{\"layerName\":\"Туристично-рекреаційні території та об&#146;єкти\",\"layerId\":\"g61\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"\"},{\"layerName\":\"СПОРУДИ ЕЛЕКТРОПОСТАЧАННЯ\",\"layerId\":\"g59\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"\"},{\"layerName\":\"Планувальні обмеження\",\"layerId\":\"g57\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"Планувальні обмеження\"},{\"layerName\":\"Вулично_дорожня мережа міського сільського та зовнішнього транспорту\",\"layerId\":\"g15\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"\"},{\"layerName\":\"Адміністративні межі територій\",\"layerId\":\"g9\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"Адміністративні межі територій\"},{\"layerName\":\"АВТОМОБІЛЬНИЙ ТРАНСПОРТ\",\"layerId\":\"g8\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"\"},{\"layerName\":\"Інженерне обладнання території\",\"layerId\":\"g3\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"\"},{\"layerName\":\"ІНЖЕНЕРНО-БУДІВЕЛЬНІ УМОВИ\",\"layerId\":\"g2\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"\"},{\"layerName\":\"Будівлі та споруди  масштаби 500 – 2000\",\"layerId\":\"g10\",\"workspace\":\"MistoBud\",\"style\":\"\",\"title\":\"Будівлі та споруди  масштаби 500 – 2000\"}]",
        status: null,
}, {
        available_wms: "[]",
        db_conn: "host=localhost port=5432 dbname=bazis schema=public user=postgres password=admin",
        editable_wms: "[{\"title\":\"Будівлі та споруди  масштаби 500 – 2000\",\"workspace\":\"MistoBud\",\"layerId\":\"g10\",\"layerName\":\"Будівлі та споруди  масштаби 500 – 2000\",\"style\":\"\"}]",
        email: "test@mail",
        filters: "{\"g10\":\"area > &quot;1000&quot;\"}",
        id: "2",
        login: "test",
        name: "Тест",
        parameters: "g2[area,count,objectid,p097,p40044,perimeter]g8[area,count,objectid,p097,p40044,perimeter]g9[area,count,objectid,p097,p40044,perimeter]g14[area,count,objectid,p001,p097,p3010,p40044,perimeter]g57[area,objectid,p097,p40044,p888004,p888011,p888013,p888026,p888027,p888033,p888034,perimeter]g59[area,count,objectid,p097,p15010,p15020,p40044,perimeter]g3[area,count,objectid,p097,p3020,p3030,p4000,p40044,p4010,perimeter]g10[area,objectid,p097,p099,p100,p120,p121,p40044,p8050,p8060,p8070,p8080,perimeter]g61[area,count,objectid,p097,p3405963,p3405964,p3405965,p40044,p888015,p888026,p888027,p888028,p888029,p888030,p888038,perimeter]g62[area,objectid,p097,p11010,p3405963,p3405964,p3405965,p40044,p888001,p888007,p888009,p888010,p888030,p888037,p888038,perimeter",
        password: "??????",
        print: true,
        selectable_wms: "[{\"title\":\"СПОРУДИ ЕЛЕКТРОПОСТАЧАННЯ\",\"workspace\":\"MistoBud\",\"layerId\":\"g59\",\"layerName\":\"СПОРУДИ ЕЛЕКТРОПОСТАЧАННЯ\",\"style\":\"\"},{\"title\":\"Туристично-рекреаційні території та об&#39;єкти\",\"workspace\":\"MistoBud\",\"layerId\":\"g61\",\"layerName\":\"Туристично-рекреаційні території та об&#39;єкти\",\"style\":\"\"},{\"title\":\"Інженерне обладнання території\",\"workspace\":\"MistoBud\",\"layerId\":\"g3\",\"layerName\":\"Інженерне обладнання території\",\"style\":\"\"},{\"title\":\"Планувальні обмеження\",\"workspace\":\"MistoBud\",\"layerId\":\"g57\",\"layerName\":\"Планувальні обмеження\",\"style\":\"\"},{\"title\":\"ВУЛИЧНО_ДОРОЖНЯ МЕРЕЖА\",\"workspace\":\"MistoBud\",\"layerId\":\"g14\",\"layerName\":\"ВУЛИЧНО_ДОРОЖНЯ МЕРЕЖА\",\"style\":\"\"},{\"title\":\"Адміністративні межі територій\",\"workspace\":\"MistoBud\",\"layerId\":\"g9\",\"layerName\":\"Адміністративні межі територій\",\"style\":\"\"},{\"title\":\"ІНЖЕНЕРНО-БУДІВЕЛЬНІ УМОВИ\",\"workspace\":\"MistoBud\",\"layerId\":\"g2\",\"layerName\":\"ІНЖЕНЕРНО-БУДІВЕЛЬНІ УМОВИ\",\"style\":\"\"},{\"title\":\"АВТОМОБІЛЬНИЙ ТРАНСПОРТ\",\"workspace\":\"MistoBud\",\"layerId\":\"g8\",\"layerName\":\"АВТОМОБІЛЬНИЙ ТРАНСПОРТ\",\"style\":\"\"},{\"title\":\"Функціональне зонування території\",\"workspace\":\"MistoBud\",\"layerId\":\"g62\",\"layerName\":\"Функціональне зонування території\",\"style\":\"\"}]",
        status: null,
}]

export default USERS;