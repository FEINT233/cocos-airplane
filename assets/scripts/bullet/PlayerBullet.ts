import { _decorator, Component, Node } from 'cc';
import { Constant } from '../framework/Constant';
import { BulletCompBase } from './BulletCompBase';
const { ccclass, property } = _decorator;

const PlAYEROUTOFRANGE = -50
@ccclass('PlayerBullet')
export class PlayerBullet extends BulletCompBase {

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        moveLength = pos.z - this._speed;

        switch (this._direction) {
            case Constant.BulletDirection.LEFT:
                this.node.setPosition(pos.x - this._speed * 0.3, pos.y, moveLength);
                break;
            case Constant.BulletDirection.MIDDIE:
                this.node.setPosition(pos.x, pos.y, moveLength);
                break;
            case Constant.BulletDirection.RIGHT:
                this.node.setPosition(pos.x + this._speed * 0.3, pos.y, moveLength);
                break;
            default:
                this.node.setPosition(pos.x, pos.y, moveLength);
                break;
        }
        
        if (moveLength < PlAYEROUTOFRANGE) { //超出屏幕外就回收
            this._isAlive = false;
        }
    }

    init(speed: number, damage: number, type: number, direction: number){
        super.init(speed, damage, type, direction);
    }
}


