import { math, Prefab, Vec3, Node } from "cc";
import { Constant } from "../framework/Constant";
import { planeData } from "../framework/PlaneManager";
import { PoolNodeManager } from "../framework/PoolNodeManager";
import { EnemyPlane } from "./EnemyPlane";

export class PlaneFactory {
    private static _planeFactory: PlaneFactory = null;

    private constructor() { }

    static instance() {
        if (!this._planeFactory) {
            this._planeFactory = new PlaneFactory();
        }
        return this._planeFactory;
    }

    /**
     * 
     * @param parent 
     * @param enemyTypeNode 敌机预制体
     * @param position 敌机生成位置
     * @param speed 敌机速度 
     * @returns 
     */
    private _enemyCombination(parent: Node, enemyTypeNode: Prefab, position: Vec3, speed: number): Node {
        const curEnemy = PoolNodeManager.instance().getNode(enemyTypeNode, parent);
        curEnemy.setPosition(position);
        curEnemy.getComponent(EnemyPlane).init(speed, false, null);
        return curEnemy;
    }

    /**
     * 敌机组合1 随机单个敌机生成
     */
    createCombination1(planeDataList: planeData[], parent: Node, bulletPreType: Prefab) {
        //随机飞机种类
        const whichEnemy = math.randomRangeInt(1, 3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = planeDataList[0].planePreType;
            speed = planeDataList[0].planeSpeed;
        } else {
            prefab = planeDataList[1].planePreType;
            speed = planeDataList[1].planeSpeed;
        }

        //实例化敌机预制体
        const enemy = PoolNodeManager.instance().getNode(prefab, parent);
        enemy.getComponent(EnemyPlane).init(speed, true, bulletPreType);

        //飞机生成位置
        const randomPosX = math.randomRangeInt(-25, 26);
        enemy.setPosition(randomPosX, 0, -50);
    }

    /**
     * 敌机组合2 横一字排列
     */
    createCombination2(planeDataList: planeData[], parent: Node) {
        const enemyArray = new Array<Node>(5);
        const enemyType = math.randomRangeInt(1, 3);
        // console.log('createCombination1');
        for (let i = 0; i < enemyArray.length; i++) {
            const enemyPos = new Vec3(-20 + i * 10, 0, -50);
            if (enemyType === Constant.EnemyType.TYPE1) {
                enemyArray[i] = this._enemyCombination(parent, planeDataList[0].planePreType, enemyPos, planeDataList[0].planeSpeed);
            } else {
                enemyArray[i] = this._enemyCombination(parent, planeDataList[1].planePreType, enemyPos, planeDataList[1].planeSpeed);
            }
        }
    }

    /**
     * 敌机组合3 V字排列
     */
    createCombination3(planeDataList: planeData[], parent: Node) {
        const enemyArray = new Array<Node>(7);
        const enemyType = math.randomRangeInt(1, 3);
        const combinationPos = [
            [-21, 0, -60],
            [-14, 0, -55],
            [-7, 0, -50],
            [0, 0, -45],
            [7, 0, -50],
            [14, 0, -55],
            [21, 0, -60]
        ];
        // console.log('createCombination2');
        for (let i = 0; i < enemyArray.length; i++) {
            const enemyPos = new Vec3(combinationPos[i][0], combinationPos[i][1], combinationPos[i][2]);
            if (enemyType === Constant.EnemyType.TYPE1) {
                enemyArray[i] = this._enemyCombination(parent, planeDataList[0].planePreType, enemyPos, planeDataList[0].planeSpeed);
            } else {
                enemyArray[i] = this._enemyCombination(parent, planeDataList[1].planePreType, enemyPos, planeDataList[1].planeSpeed);
            }
        }
    }
}