import { _decorator, Component, Node, Prefab, math } from 'cc';
import { PlaneFactory } from '../plane/PlaneFactory';
import { BulletManager } from './BulletManager';
import { Constant } from './Constant';
import { GameManager } from './GameManager';
import { IEventType, NotifyCenterMgr } from './NotifyCenterMgr';
import { PoolNodeManager } from './PoolNodeManager';
const { ccclass, property } = _decorator;

export class planeData {
    planePreType: Prefab;
    planeSpeed: number;
}

@ccclass('PlaneManager')
export class PlaneManager extends Component {

    @property(Node)
    planeRoot: Node = null;

    protected _createEnemyTime: number = 1;

    protected _currCreateEnemyTime: number = 0;   //当前创建敌机时间

    //飞机预制体
    @property([Prefab])
    planePreList: Prefab[] = []; //2 3

    protected _planeSpeedList: number[] = [0.5, 0.7]; //2 3

    protected _enemyShootTime: number = 0.5; //子弹射击间隔

    protected _combination: number = Constant.Combination.PLAN1;    //敌机组合类型

    protected _planeDataList: planeData[] = [];

    start(){
        this.init();

    }
    update(deltaTime: number) {
        //游戏是否开始
        if(!GameManager.isGameStart) return;
        /**
         * 敌机生成
         */
        this._currCreateEnemyTime += deltaTime;
        this.randomCombination();
    }

    onEnable() {
        NotifyCenterMgr.on(IEventType.Operation.RESET_DATA, this.resetData, this);
        NotifyCenterMgr.on(IEventType.Operation.COMBINATION_AUTOAMTIC, this.combinationAutoamtic, this);
        NotifyCenterMgr.on(IEventType.Operation.RECYCLE_ENEMY, this.recycleEnemyPlane, this);

    }

    onDisable() {
        NotifyCenterMgr.off(IEventType.Operation.RESET_DATA, this.resetData, this);
        NotifyCenterMgr.off(IEventType.Operation.COMBINATION_AUTOAMTIC, this.combinationAutoamtic, this);
        NotifyCenterMgr.off(IEventType.Operation.RECYCLE_ENEMY, this.recycleEnemyPlane, this);
    }


    createCombination1() {
        PlaneFactory.instance().createCombination1(this._planeDataList, this.planeRoot, BulletManager.instance.bulletPreList[1]);
    }

    createCombination2() {
        PlaneFactory.instance().createCombination2(this._planeDataList, this.planeRoot);
    }

    createCombination3() {
        PlaneFactory.instance().createCombination3(this._planeDataList, this.planeRoot);
    }

    private init() {
        // console.log(this.planePreList[0]);
        const arrLen: number = this.planePreList.length;
        for (let i = 0; i < arrLen; i++) {
            this._planeDataList[i] = new planeData();
            this._planeDataList[i].planePreType = this.planePreList[i];
            this._planeDataList[i].planeSpeed = this._planeSpeedList[i];
        }
    }

    private resetData() {
        this._currCreateEnemyTime = 0;   //当前创建敌机时间s
        this._combination = Constant.Combination.PLAN1;    //组合类型
    }

    randomCombination() {
        if (this._combination > 3) this._combination = Constant.Combination.PLAN1;
        switch (this._combination) {
            case Constant.Combination.PLAN1:
                if (this._currCreateEnemyTime > this._createEnemyTime) {
                    this.createCombination1();
                    this._currCreateEnemyTime = 0;
                }
                break;
            case Constant.Combination.PLAN2:
                if (this._currCreateEnemyTime > this._createEnemyTime * Constant.CombinationInteval.PLAN2) {
                    const randomCombination = math.randomRangeInt(1, 3);
                    if (randomCombination === Constant.Combination.PLAN2) {
                        this.createCombination2();
                    } else {
                        this.createCombination1();
                    }
                    this._currCreateEnemyTime = 0;
                }
                break;
            case Constant.Combination.PLAN3:
                if (this._currCreateEnemyTime > this._createEnemyTime * Constant.CombinationInteval.PLAN3) {
                    const randomCombination = math.randomRangeInt(1, 4);
                    if (randomCombination === Constant.Combination.PLAN2) {
                        this.createCombination2();
                    } else if (randomCombination === Constant.Combination.PLAN3) {
                        this.createCombination3();
                    } else {
                        this.createCombination1();
                    }
                    this._currCreateEnemyTime = 0;
                }
                break;
        }
    }

    private combinationAutoamtic(){
        this._combination++;
    }

    private recycleEnemyPlane(){
        let Enemys: Node[] = this.node.children;
        for (const enemy of Enemys) {
            PoolNodeManager.instance().putNode(enemy);
        }
    }
}


