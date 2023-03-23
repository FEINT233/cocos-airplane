import { _decorator } from 'cc';
import { Constant } from '../framework/Constant';
import { BulletCompBase } from './BulletCompBase';
const { ccclass, property } = _decorator;

const PlAYEROUTOFRANGE = -50
const ENEMYROUTOFRANGE = 50

@ccclass('Bullet')
export class Bullet extends BulletCompBase {

    protected _isEnemyBullet: boolean = false;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0;
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._speed;
            this.node.setPosition(pos.x, pos.y, moveLength);
        } else {
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
        }

        if (moveLength < PlAYEROUTOFRANGE || moveLength > ENEMYROUTOFRANGE) { //超出屏幕外就删除
            this._isAlive = false;
        }
    }


    /**
     * bullet初始化
     * @param speed 子弹速度
     * @param damage 子弹伤害
     * @param type 子弹种类
     * @param direction 子弹移动方向
     * @param isEnemyBullet 是否为敌方子弹
     */
    init(speed: number, damage: number, type: number, direction: number = Constant.BulletDirection.MIDDIE, isEnemyBullet: boolean){
        this._speed = speed;
        this._damage = damage;
        this._type = type;
        this._direction = direction;
        this._isEnemyBullet = isEnemyBullet;
    }

}


