import { _decorator, Component, Node, Prefab, Vec3 } from 'cc';
import { BulletFactory } from '../bullet/BulletFactory';
import { IEventType, NotifyCenterMgr } from './NotifyCenterMgr';
import { PoolNodeManager } from './PoolNodeManager';
const { ccclass, property } = _decorator;

@ccclass('BulletManager')
export class BulletManager extends Component {
    static instance: BulletManager = null;

    @property(Node)
    protected bulletRoot: Node = null;

    //子弹预制体
    @property([Prefab])
    bulletPreList: Prefab[] = []; //1 2 3 4 5

    //子弹道具预制体
    @property([Prefab])
    bulletPropPreList: Prefab[] = [];   //S,H,M

    @property(Number)
    protected _bulletSpeed: number = 1;

    @property(Number)
    protected _bulletDamage: number = 1;

    @property(Number)
    protected _bulletPropSpeed: number = 0.3;

    onLoad() {
        if(!BulletManager.instance){
            BulletManager.instance = this;
        }
    }

    onEnable() {
        NotifyCenterMgr.on(IEventType.Operation.RECYCLE_BULLET, this.recycleBullet, this);

    }

    onDisable() {
        NotifyCenterMgr.off(IEventType.Operation.RECYCLE_BULLET, this.recycleBullet, this);
    }

    /**
     * 
     * @param isEnemyBullet 是否为敌人子弹
     * @param bulletSpeed 子弹速度
     * @param bulletPos 子弹位置
     * @param bulletDamage 子弹伤害
     */
    createPlaneBaseBullet(isEnemyBullet: boolean, bulletPos: Vec3) {
        if (isEnemyBullet) {
            BulletFactory.instance().createPlaneBullet(this.bulletRoot
                , isEnemyBullet, this._bulletSpeed
                , bulletPos, this._bulletDamage
                , this.bulletPreList[1], 2);
        } else {
            BulletFactory.instance().createPlaneBullet(this.bulletRoot
                , isEnemyBullet, this._bulletSpeed
                , bulletPos, this._bulletDamage
                , this.bulletPreList[0], 1);
        }
    }

    createBulletProp() {
        BulletFactory.instance().createBulletProp(this.bulletRoot, this.bulletPropPreList, this._bulletPropSpeed);
    }

    createPlayerPlaneBulletH(playerPos: Vec3) {
        BulletFactory.instance().createPlayerPlaneBulletH(this.bulletRoot, this._bulletSpeed
            , playerPos, this._bulletDamage, this.bulletPreList[2], 3);
    }

    createPlayerPlaneBulletS(playerPos: Vec3) {
        BulletFactory.instance().createPlayerPlaneBulletS(this.bulletRoot, this._bulletSpeed
            , playerPos, this._bulletDamage, this.bulletPreList[4], 5);
    }

    private recycleBullet() {
        let bullets: Node[] = this.node.children;
        for (const bullet of bullets) {
            PoolNodeManager.instance().putNode(bullet);
        }
    }
}


