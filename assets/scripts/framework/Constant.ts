
/**
 * 用于存放各种类型的常数, 敌机种类 敌机组合类型 敌机组合间隔
 * 
 */
export class Constant {

    //飞机类型
    static EnemyType = {
        TYPE1: 1,
        TYPE2: 2
    };

    //敌机组合类型
    static Combination = {
        PLAN1: 1,
        PLAN2: 2,
        PLAN3: 3
    };

    //敌机不同组合类型生成的时间间隔
    static CombinationInteval = {
        PLAN1: 1,
        PLAN2: 0.9,
        PLAN3: 0.8
    };

    //物理组
    static PHYGroup = {
        DEFAULT: 1 << 0,
        PLAYER_PLANE: 1 << 1,
        ENEMY_PLANE: 1 << 2,
        PLAYER_BULLET: 1 << 3,
        ENEMY_BULLET: 1 << 4,
        BULLET_PORP: 1 << 5
    }

    //子弹种类
    static BulletType = {
        BULLET01: 1,
        BULLET02: 2,
        BULLET03: 3,
        BULLET04: 4,
        BULLET05: 5
    }

    //子弹道具类型
    static BulletPropType = {
        BULLET_S: 1,
        BULLET_H: 2,
        BULLET_M: 3
    }

    //子弹移动方向
    static BulletDirection = {
        LEFT: 1,
        MIDDIE: 2,
        RIGHT: 3
    }
}


