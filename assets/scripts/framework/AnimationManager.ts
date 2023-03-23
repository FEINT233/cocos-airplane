import { _decorator, Component, Prefab, Vec3, Node } from 'cc';
import { IEventType, NotifyCenterMgr } from '../framework/NotifyCenterMgr';
import { PoolNodeManager } from '../framework/PoolNodeManager';
const { ccclass, property } = _decorator;

@ccclass('AnimationManager')
export class AnimationManager extends Component {

    static instance: AnimationManager = null;

    //敌机爆炸预制体
    @property(Prefab)
    enemyExplodePre: Prefab = null;

    onLoad(){
        if(!AnimationManager.instance) AnimationManager.instance = this;
    }

    onEnable() {
        NotifyCenterMgr.on(IEventType.Animation.ENEMY_EXPLODE, this.createEnemyEffect, this);

    }

    onDisable() {
        NotifyCenterMgr.off(IEventType.Animation.ENEMY_EXPLODE, this.createEnemyEffect, this);
    }

    createEnemyEffect(arg1){  //相对位置问题
        const pos = <Vec3>arg1;
        const enemyExplode = PoolNodeManager.instance().getNode(this.enemyExplodePre, this.node);
        enemyExplode.setWorldPosition(pos);
        // this.scheduleOnce(()=>{
        //     PoolNodeManager.instance().putNode(enemyExplode);
        // }, 1);
    }
}