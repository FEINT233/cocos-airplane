import { _decorator , Prefab, ITriggerEvent, Vec3 } from 'cc';
import { BulletManager } from '../framework/BulletManager';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
import { IEventType, NotifyCenterMgr } from '../framework/NotifyCenterMgr';
import { PoolNodeManager } from '../framework/PoolNodeManager';
import { PlaneCompBase } from './PlaneCompBase';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 50

@ccclass('EnemyPlane')
export class EnemyPlane extends PlaneCompBase {

    protected _shootTime: number = 0.5;

    protected _speed: number = 0;    //敌机速度

    protected _bulletType: Prefab = null;   //子弹种类(预制体)

    protected _gameManager: GameManager = null;

    protected _isAlive: boolean = true;

    start() {
    }


    update(deltaTime: number) {
        const pos = this.node.position;
        const movePos = pos.z + this._speed;
        this.node.setPosition(pos.x, pos.y, movePos);

        /**
         * 子弹是否发射
         */
        if (this._isShooting) {
            this._currShootTime += deltaTime;
            if (this._currShootTime > this._shootTime) {
                const pos = this.node.position;
                BulletManager.instance.createPlaneBaseBullet(true, new Vec3(pos.x, pos.y, pos.z + 4));  
                this._currShootTime = 0;
            }
        }

        if (movePos > OUTOFRANGE) {
            PoolNodeManager.instance().putNode(this.node);
        }
    }

    lateUpdate() {
        if (this.node.isValid && !this._isAlive) {

            NotifyCenterMgr.emit(IEventType.Audio.ENEMY_EXPLODE);
            NotifyCenterMgr.emit(IEventType.Animation.ENEMY_EXPLODE, this.node.worldPosition);
            PoolNodeManager.instance().putNode(this.node);
            this._isAlive = true;
        }
    }

    /**
     * 敌机初始化
     * @param speed 敌机速度
     * @param isShooting 射击状态
     * @param shootTime 射击间隔
     * @param bulletType 子弹类型
     */
    init(speed: number, isShooting: boolean, bulletType: Prefab) {
        this._speed = speed;
        this._isShooting = isShooting;
        this._bulletType = bulletType;
    }

    protected _onTriggerEnter(event: ITriggerEvent) {
        const otherGroup = event.otherCollider.getGroup();
        if (otherGroup === Constant.PHYGroup.PLAYER_PLANE) {
            this._isAlive = false;
        } else if (otherGroup === Constant.PHYGroup.PLAYER_BULLET) {
            this._isAlive = false;
            NotifyCenterMgr.emit(IEventType.Operation.ADD_SCORE);
        }
    }
}


