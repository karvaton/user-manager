import { useEffect, useState } from "react";
import Parameter from "../../registr/Parameter";


function LayerSetting({layer}) {
    const { workspace, layer_name, login } = layer;
    const [title, rename] = useState(layer.title);
    const [access, changeAccess] = useState(layer.access);
    const [availableParams, setAvailableParams] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/data/parameters/${login}?table=${layer_name}`)
        .then(res => res.json())
        .then(json => {
            const parameters = JSON.parse(layer.parameters);
            const paramsNames = parameters.map(({name}) => name);
            const params = json.map((param) => ({
                title: param,
                name: param,
                checked: paramsNames.includes(param),
            }));
            setAvailableParams(params);
        });
    }, [layer_name, login, layer]);
    
    function changeParamsList(params) {
        
    }

    return (
        <>
            <div id="layer-settings">
                <p>Робоча область</p>
                <div name="workspace">{workspace}</div>
                <p>Назва шару</p>
                <div className="layer-name">{layer_name}</div>
                <p>Тип доступу</p>
                <select
                    className="access-type"
                    value={access}
                    onChange={(e) => changeAccess(e.target.value)}
                >
                    <option value="visible">Видимий</option>
                    <option value="selectable">Доступний</option>
                    <option value="editable">Редогований</option>
                </select>
                <p>Підпис шару</p>
                <input
                    className="layer-title"
                    value={title || layer_name}
                    onChange={(e) => rename(e.target.value)}
                />
                {/* <p>Створити фільтр</p>
                    <div className="filter"></div> */}
                {(access === "selectable" || access === "editable") && (
                    <>
                        <p>Параметри</p>
                        <div name="parameters" className="parameters">
                            {availableParams.map(({ name, title, checked }) => (
                                <Parameter
                                    name={name}
                                    title={title}
                                    checked={checked}
                                    changeParameter={() => changeParamsList()}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div>Вибрати всі</div>
        </>
    );
}

export default LayerSetting;