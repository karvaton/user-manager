import { post } from '../../../tools/ajax';
import * as types from '../../constants/types';
import { LayerList } from './layerList';

export const getParams = (payload) => ({
    type: types.registration.GET_PARAMS,
    payload,
});

export const getLayers = (payload) => ({
    type: types.registration.GET_LAYERS,
    payload,
});

export function fetchParams(layer, entry) {
    return (dispatch) => {
        post.json(`http://localhost:5000/data/parameters?table=${layer}`, entry)
            .then((res) => res.json())
            .then((params) =>
                params.map((param) => ({
                    name: param,
                    title: param,
                    checked: false,
                }))
            ).then((data) => {
                dispatch({
                    type: types.registration.FINISH_LOADING,
                });
                dispatch(getParams({ data, layer }));
            });
    };
}

export function fetchLayerList(workspace, dataStore) {
    return async (dispatch) => {
        const result = await post.json(`http://localhost:5000/gs/layers`, {
            workspace,
            dataStore,
        });
        const layers = await result.json();
        const layerList = LayerList.create(layers);
        dispatch({
            type: types.registration.FINISH_LOADING,
        });
        dispatch(getLayers(layerList));
    };
}


// async function fetchGroups(ws) {
//     let res = await fetch(
//         `http://localhost:5000/geoserver/workspaces/${ws}/layergroups`
//     );
//     let json = await res.json();
//     let groups = json?.layerGroups.layerGroup?.map(async ({ name }) => {
//         let group = await getSublayers(ws, name);
//         return group.layerGroup;
//     });

//     if (groups && groups.length) {
//         groups = await Promise.all(groups);

//         return groups.map(
//             ({ bounds, name, title, publishables }, index) => {
//                 let idCode = index.toString(36);
//                 return {
//                     id: ("g" + codeStr(name) + idCode).slice(0, 16 - idCode.length),
//                     name,
//                     workspace: ws,
//                     title,
//                     sublayers: publishables.published.map(({ name }) => name),
//                     bbox: bounds,
//                 }
//             }
//         );
//     } else {
//         return [];
//     }
// }


// async function getSublayers(ws, group) {
//     const res = await fetch(
//         `http://localhost:5000/geoserver/workspaces/${ws}/layergroups/${group}`
//     );
//     return await res.json();
// }


// async function fetchLayers(ws, ds) {
//     const idList = new Set();
//     let res = await fetch(
//         `http://localhost:5000/geoserver/workspaces/${ws}/datastores/${ds}/featuretypes`
//     );
//     let json = await res.json();
//     let layers = json?.featureTypes?.featureType?.map(async (layer) => {
//         let info = await getLayerData(ws, ds, layer.name);
//         let name = info.name || layer.name;
//         let id = checkLayerId(idList, name);
//         idList.add(id);
//         return info
//             ? { name, workspace: ws, id, ...info }
//             : { name, workspace: ws, id };
//     });

//     if (layers && layers.length) {
//         layers = await Promise.all(layers);

//         return layers.filter(item => !!item);
//     } else {
//         return [];
//     }
// }

// async function getLayerData(ws, ds, layerId) {
//     try {
//         const res1 = await fetch(
//             `http://localhost:5000/geoserver/workspaces/${ws}/layers/${layerId}`
//         );
//         const res2 = await fetch(
//             `http://localhost:5000/geoserver/workspaces/${ws}/datastores/${ds}/featuretypes/${layerId}`
//         );
//         const json1 = await res1.json();
//         const json2 = await res2.json();
//         const layer = json1.layer;
//         const feature = json2.featureType;
//         let { defaultStyle, styles } = layer;

//         if (styles) {
//             styles = styles.style
//                 .filter(item => item !== "null")
//                 .map(({ name }) => ({ name }));
//             styles.unshift({
//                 name: defaultStyle.name,
//                 isDefault: true,
//             });
//         }

//         let { nativeName, title, srs, nativeBoundingBox } = feature;
//         return {
//             name: nativeName,
//             title,
//             styles,
//             srs,
//             bbox: nativeBoundingBox,
//         };
//     } catch (error) {
//         return {};
//     }
// }
