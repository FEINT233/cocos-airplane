import { _decorator, Component, Node } from 'cc';
import { BulletCompBase } from './BulletCompBase';
const { ccclass, property } = _decorator;

const ENEMYROUTOFRANGE = 50
@ccclass('EnemyBullet')
export class EnemyBullet extends BulletCompBase {
    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
            moveLength = pos.z + this._speed;

        this.node.setPosition(pos.x, pos.y, moveLength);
        
        if (moveLength > ENEMYROUTOFRANGE) { //超出屏幕外就回收
            this._isAlive = false;
        }
    }

    init(speed: number, damage: number, type: number, direction: number){
        super.init(speed, damage, type, direction);
    }
}


