import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { PoolNodeManager } from '../framework/PoolNodeManager';
const { ccclass, property } = _decorator;

@ccclass('PlaneCompBase')
export class PlaneCompBase extends Component {

    protected _speed: number = 0;

    protected _initalHp: number = 0;   //初始血量

    protected _currHp: number = 0;    //当前血量

    protected _isAlive: boolean = true;

    protected _shootTime: number = 0.1;     //射击间隔

    protected _currShootTime: number = 0;     //当前射击的时间

    protected _isShooting = false;    //子弹是否发射


    get isAlive(){
        return this._isAlive;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    onEnable() {
        const colliders = this.node.getComponents(Collider);
        if (colliders) {
            for (const collider of colliders) {
                collider.on('onTriggerEnter', this._onTriggerEnter, this);
            }
        }
    }

    onDisable() {
        const colliders = this.node.getComponents(Collider);
        if (colliders) {
            for (const collider of colliders) {
                collider.off('onTriggerEnter', this._onTriggerEnter, this);
            }
        }
    }


    protected _onTriggerEnter(event: ITriggerEvent){

    }
}


