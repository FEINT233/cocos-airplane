import { _decorator, Node, Prefab, NodePool, instantiate } from 'cc';

interface IDictPool {
    [name: string]: NodePool;
}

interface IDictPrefab {
    [name: string]: Prefab;
}

export class PoolNodeManager {

    private static _instance: PoolNodeManager = null;

    private _dictPool: IDictPool = {};

    private _dictPrefab: IDictPrefab = {};

    private constructor(){}

    static instance(){
        if(!this._instance){
            this._instance = new PoolNodeManager();
        }
        return this._instance;
    }

    getNode(prefab: Prefab, parent: Node) {
        let node: Node = null;
        let name = prefab.data.name;
        this._dictPrefab[name] = prefab;
        const pool = this._dictPool[name];
        if (pool) {
            if (pool.size() > 0) node = pool.get();
            else node = instantiate(prefab);
        } else {
            this._dictPool[name] = new NodePool();
            node = instantiate(prefab);
        }
        node.parent = parent;
        node.active = true;
        return node;
    }

    putNode(node: Node) {
        let name = node.name;
        node.parent = null;
        node.active = false;
        if(!this._dictPool[name]) this._dictPool[name] = new NodePool();
        this._dictPool[name].put(node);
    }

}


