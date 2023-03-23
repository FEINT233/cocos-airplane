import {  Prefab, Vec3, Node, _decorator, RigidBody, math } from "cc";
import { Constant } from "../framework/Constant";
import { PoolNodeManager } from "../framework/PoolNodeManager";
import { Bullet } from "./Bullet";
import { BulletProp } from "./BulletProp";

export class BulletFactory {

    private static _bulletFactroy: BulletFactory = null;

    private constructor() { }

    static instance() {
        if (this._bulletFactroy == null) {
            this._bulletFactroy = new BulletFactory();
        }
        return this._bulletFactroy;
    }

    /**
     * 生成飞机子弹(己方或敌方通用)
     * @param bulletRoot 子弹的根节点
     * @param isEnemyBullet 是否为敌机子弹
     * @param bulletSpeed 子弹速度
     * @param bulletPos 子弹生成位置
     * @param bulletDamage 子弹伤害
     * @param bulletPreType 子弹种类(预制体)
     * @param bulletType 子弹种类
     * @param bulletDirection 子弹移动方向
     */
    createPlaneBullet(bulletRoot: Node
                    , isEnemyBullet: boolean
                    , bulletSpeed: number
                    , bulletPos: Vec3
                    , bulletDamage: number
                    , bulletPreType: Prefab
                    , bulletType: number
                    , bulletDirection: number = Constant.BulletDirection.MIDDIE) {
        const bullet = PoolNodeManager.instance().getNode(bulletPreType, bulletRoot); 
        bullet.setPosition(bulletPos);
        let bulletComp: Bullet = null;
        bulletComp = bullet.getComponent(Bullet); 
        bulletComp.init(bulletSpeed, bulletDamage, bulletType, bulletDirection, isEnemyBullet);

        const rigid = bullet.getComponent(RigidBody);
        if (rigid && isEnemyBullet) {
            rigid.setGroup(Constant.PHYGroup.ENEMY_BULLET);
            rigid.setMask(Constant.PHYGroup.PLAYER_PLANE);
        } else if (rigid && !isEnemyBullet) {
            rigid.setGroup(Constant.PHYGroup.PLAYER_BULLET);
            rigid.setMask(Constant.PHYGroup.ENEMY_PLANE);
        }
    }

    createBulletProp(bulletRoot: Node, bulletPropPreList: Prefab[], bulletPropSpeed: number) {
        const randomBulletProp = math.randomRangeInt(1, 4);
        let prefab: Prefab = null;
        switch (randomBulletProp) {
            case Constant.BulletPropType.BULLET_S:
                prefab = bulletPropPreList[0];
                break;
            case Constant.BulletPropType.BULLET_H:
                prefab = bulletPropPreList[1];
                break;
            case Constant.BulletPropType.BULLET_M:
                prefab = bulletPropPreList[2];
                break;
            default:
                break;
        }
        const prop = PoolNodeManager.instance().getNode(prefab, bulletRoot);
        prop.setPosition(15, 0, -50);
        prop.getComponent(BulletProp).init(-bulletPropSpeed);
    }

    /**
     * H道具是3号子弹
     * @param bulletRoot 子弹根节点
     * @param bulletSpeed 子弹速度
     * @param playerPos 玩家位置
     * @param bulletDamage 子弹伤害
     * @param bulletPreType 子弹预制体
     * @param bulletType 子弹类型
     */
    createPlayerPlaneBulletH(bulletRoot: Node, bulletSpeed: number, playerPos: Vec3, bulletDamage: number, bulletPreType: Prefab, bulletType: number) {
        const pos = playerPos;
        this.createPlaneBullet(bulletRoot, false, bulletSpeed, new Vec3(pos.x - 2.5, pos.y, pos.z - 7), bulletDamage, bulletPreType, bulletType);
        this.createPlaneBullet(bulletRoot, false, bulletSpeed, new Vec3(pos.x + 2.5, pos.y, pos.z - 7), bulletDamage, bulletPreType, bulletType);
    }

    /**
     * S道具是5号子弹
     * @param bulletRoot 子弹根节点
     * @param bulletSpeed 子弹速度
     * @param playerPos 玩家位置
     * @param bulletDamage 子弹伤害
     * @param bulletPreType 子弹预制体
     * @param bulletType 子弹类型
     */
    createPlayerPlaneBulletS(bulletRoot: Node, bulletSpeed: number, playerPos: Vec3, bulletDamage: number, bulletPreType: Prefab, bulletType: number) {
        const pos = playerPos;
        this.createPlaneBullet(bulletRoot, false, bulletSpeed, new Vec3(pos.x - 4, pos.y, pos.z - 7), bulletDamage, bulletPreType, bulletType, Constant.BulletDirection.LEFT);
        this.createPlaneBullet(bulletRoot, false, bulletSpeed, new Vec3(pos.x, pos.y, pos.z - 7), bulletDamage, bulletPreType, bulletType);
        this.createPlaneBullet(bulletRoot, false, bulletSpeed, new Vec3(pos.x + 4, pos.y, pos.z - 7), bulletDamage, bulletPreType, bulletType, Constant.BulletDirection.RIGHT);
    }

}