import { _decorator, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
import { IEventType, NotifyCenterMgr } from '../framework/NotifyCenterMgr';
import { BulletCompBase } from './BulletCompBase';
const { ccclass, property } = _decorator;

@ccclass('BulletProp')
export class BulletProp extends BulletCompBase {

    protected _propXSpeed: number = 0;

    protected _gameManager: GameManager = GameManager._instance;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;

        if (pos.x < -15 || pos.x > 15)
            this._propXSpeed = -this._propXSpeed;
        this.node.setPosition(pos.x + this._propXSpeed, pos.y, pos.z - this._speed);

        if (this.node.position.z > 50){
            this._isAlive = false;
        } 
    }

    protected _onTriggerEnter(event: ITriggerEvent) {
        const name = event.selfCollider.node.name;
        if (name === "bulletH") {
            NotifyCenterMgr.emit(IEventType.Operation.CHANGE_BULLET_PROP, Constant.BulletPropType.BULLET_H);
        } else if (name === "bulletS") {
            NotifyCenterMgr.emit(IEventType.Operation.CHANGE_BULLET_PROP, Constant.BulletPropType.BULLET_S);
        } else {
            NotifyCenterMgr.emit(IEventType.Operation.CHANGE_BULLET_PROP, Constant.BulletPropType.BULLET_M);
        }
        this._isAlive = false;
    }

    init(speed: number) {
        this._speed = speed;
        this._propXSpeed = speed;
    }
}


