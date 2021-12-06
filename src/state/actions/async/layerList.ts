export class LayerList {
    protected static uniqList: Set<string> = new Set();
    
    static create(list: string[]) {
        this.uniqList.clear();
        return list.map(layerName => {
            const id = this.getId(layerName);
            const uniqId = this.checkId(id);
            this.uniqList.add(uniqId);
            const type = this.checkType(layerName);
            if (type === 'layer') {
                return new Layer(layerName, uniqId);
            } else {
                return new LayerGroup(layerName, uniqId)
            }
            // const layer = new LayerListItem(layerName).create(uniqId);
            // return layer;
        });
    }

    protected static checkId(layerName: string, k: number = 1): string {
        if (this.uniqList.has(layerName)) {
            return this.checkId(layerName + k, ++k);
        } else {
            this.uniqList.add(layerName);
            return layerName;
        }
    }

    protected static checkType(layerName: string): string {
        const isLayer = this.parsableToNumber(layerName);
        if (isLayer) {
            return 'layer';
        } else {
            return 'layergroup';
        }
    }


    protected static getId(id: string): string {
        if (this.parsableToNumber(id)) {
            return id;
        } else {
            return this.codeStr(id);
        }

    }

    protected static parsableToNumber(str: string): boolean {
        return (parseInt(str) || parseInt(str.slice(1))) ? true : false;
    }

    protected static codeStr(text: string): string {
        let input = this.toDouble(text).split(/\s/).join("");
        let str = parseInt(input, 2).toString(36);
        let twoZero = str.indexOf("00");
        return str.slice(0, twoZero);
    }

    protected static toDouble(input: string): string {
        let output = "",
            i = 0;
        for (i = 0; i < input.length; i++) {
            output += input[i].charCodeAt(0).toString(2) + " ";
        }
        return output;
    }

}

export class LayerListItem {
    protected layerName: string;

    constructor(layerName: string) {
        this.layerName = layerName;
    }

    create(id: string) {
        return this.factory(id);
    }

    protected factory(id: string): Layer | LayerGroup {
        const type = this.checkType();
        if (type === 'layer') {
            return new Layer(this.layerName, id);
        } else {
            return new LayerGroup(this.layerName, id);
        }
    }

    protected checkType(): string {
        const isLayer = parseInt(this.layerName) || parseInt(this.layerName.slice(1));
        if (isLayer) {
            return 'layer';
        } else {
            return 'layergroup';
        }
    }
}

class Layer {
    name: string;
    title: string;
    id: string;
    type: string;
    
    constructor(name: string, id?: string) {
        this.name = name;
        this.title = name;
        this.id = id || name;
        this.type = 'layer';
    }
}

class LayerGroup extends Layer {
    constructor(name: string, id?: string) {
        super(name, id);
        this.type = 'layergroup';
    }
}
