import { _decorator, Component,  macro } from 'cc';
import { BulletManager } from './BulletManager';
import { IEventType, NotifyCenterMgr } from './NotifyCenterMgr';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    static _instance: GameManager = null;
    static isGameStart: boolean = false;



    onLoad() {
        if (GameManager._instance == null) {
            GameManager._instance = this;
        }
    }

    start() {
    }

    onEnable() {
        NotifyCenterMgr.on(IEventType.Operation.CHANGE_SCHEDULE, this.changeSchedule, this);
    }

    onDisable() {
        NotifyCenterMgr.off(IEventType.Operation.CHANGE_SCHEDULE, this.changeSchedule, this);

    }

    update(deltaTime: number) {

    }


    private changeSchedule(arg1) {
        const flag: boolean = <boolean>arg1;
        if(flag) this.schedule(this._modeChanged, 10, macro.REPEAT_FOREVER);    //每十秒切换一种敌机组合状态, 重复无数次
        else  this.unschedule(this._modeChanged);
    }

    

    private _modeChanged() {
        NotifyCenterMgr.emit(IEventType.Operation.COMBINATION_AUTOAMTIC);
        BulletManager.instance.createBulletProp();
    }

}


