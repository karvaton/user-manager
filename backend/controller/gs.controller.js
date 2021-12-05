import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const { GEOSERVLOG, GEOSERVPASS } = process.env;


export function getWorkspaces(req, res) {
    getGeoserverData("workspaces")
        .then((json) =>
            res.status(200).send(getNameList(json.workspaces?.workspace) || [])
        )
        .catch(() => res.status(200).send({ error: "error" }));
}

export function getDataStores(req, res) {
    const { workspace } = req.body;
    getGeoserverData(`workspaces/${workspace}/datastores`)
        .then((json) =>
            res.status(200).send(getNameList(json.dataStores?.dataStore) || [])
        )
        .catch(() => res.status(200).send({ error: "error" }));
}

export async function getLayerList(req, res) {
    const { workspace, dataStore } = req.body;
    try {
        const layerGroups = await getLayerGourps(workspace);
        const layers = await getLayers(workspace, dataStore);
        res.status(200).send([...layerGroups, ...layers]);
    } catch (error) {
        res.status(500).send({ error: "error" });
    }
}

async function getLayerGourps(workspace) {
    const json = await getGeoserverData(`workspaces/${workspace}/layergroups`);
    // const json = await json.json();
    return getNameList(json.layerGroups?.layerGroup) || [];
}

async function getLayers(workspace, datastore) {
    const json = await getGeoserverData(`workspaces/${workspace}/datastores/${datastore}/featuretypes`);
    // const json = await result.json();
    return getNameList(json.featureTypes?.featureType) || [];
}

async function getGeoserverData(path) {
    try {
        const result = await fetch(
            `http://${GEOSERVLOG}:${GEOSERVPASS}@45.94.158.117:8080/geoserver/rest/${path}.json`
        );
        return await result.json();
    } catch (err) {
        console.log(err);
        return "error";
    }
}

function getNameList(list) {
    return list?.map(({ name }) => name);
}

export function getDataStoreEntry(req, res) {
    const { workspace, dataStore } = req.body;
    getGeoserverData(`workspaces/${workspace}/datastores/${dataStore}`)
        .then((json) => {
            const entryKeys = ["host", "port", "database", "user", "schema"];
            const entry = json.dataStore.connectionParameters.entry
                .filter((item) => entryKeys.includes(item["@key"]) && item["$"])
                .reduce((entryObj, entry) => {
                    entryObj[entry["@key"]] = entry["$"];
                    return entryObj;
                }, {});
            res.status(200).send(entry);
        })
        .catch(() => res.status(200).send({ error: "error" }));
}