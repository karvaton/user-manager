type ListItem = { name: string; type: string }

export class LayerList {
    protected static uniqList: Set<string> = new Set();
    
    static create(list: ListItem[]) {
        this.uniqList.clear();
        return list.map(({name, type}) => {
            const id = this.getId(name);
            const uniqId = this.checkId(id);
            this.uniqList.add(uniqId);
            if (type === 'layer') {
                return new Layer(name, uniqId);
            } else {
                return new LayerGroup(name, uniqId)
            }
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

class Layer {
    name: string;
    title: string;
    id: string;
    type: string;
    
    constructor(name: string, id?: string) {
        this.name = `${name}`;
        this.title = `${name}`;
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
