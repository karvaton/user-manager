const initialState = {
    userManager: {
        users: [],
        modalWindow: null,
    },
    registration: {
        layers: [],
        loading: false,
        activeLayer: {
            name: 30310210,
            id: "l30310210",
        },
        entry: {
            schema: "public",
            database: "bazis",
            host: "45.94.158.117",
            port: "5432",
            user: "postgres",
        },
    },
};

export default initialState;