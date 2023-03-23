import { _decorator, Component, Node } from 'cc';
import { PoolNodeManager } from './framework/PoolNodeManager';
const { ccclass, property } = _decorator;

@ccclass('ExplodeManager')
export class ExplodeManager extends Component {
    start() {

    }


    onEnable(){
        this.scheduleOnce(this._putBack, 1);
    }

    onDisable(){

    }

    update(deltaTime: number) {
        
    }

    /**
     * 回收到节点池
     */
    private _putBack(){
        PoolNodeManager.instance().putNode(this.node);
    }
}


