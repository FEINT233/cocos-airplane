import { _decorator, Component, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
import { PoolNodeManager } from '../framework/PoolNodeManager';
const { ccclass, property } = _decorator;

@ccclass('BulletCompBase')
export class BulletCompBase extends Component{

    protected _speed: number = 0;    //子弹移动速度

    protected _damage: number = 1;    //子弹伤害数值

    protected _type: number = -1;    //子弹种类
    
    protected _direction: number = Constant.BulletDirection.MIDDIE;

    protected _isAlive: boolean = true;


    lateUpdate(){
        if(this.node.isValid && !this._isAlive){
            PoolNodeManager.instance().putNode(this.node);
            this._isAlive = true;
        }
    }

    onEnable(){
        const collider = this.node.getComponent(Collider);
        if(collider){
            collider.on('onTriggerEnter', this._onTriggerEnter, this);
        }
    }

    onDisable(){
        const collider = this.getComponent(Collider);
        if(collider){
            collider.off('onTriggerEnter', this._onTriggerEnter, this);
        }
    }

    // /**
    //  * bullet初始化
    //  * @param speed 子弹速度
    //  * @param damage 子弹伤害
    //  * @param type 子弹种类
    //  * @param direction 子弹移动方向
    //  */
    // init(speed: number, damage: number, type: number, direction: number){
    //     this._speed = speed;
    //     this._damage = damage;
    //     this._type = type;
    //     this._direction = direction;
    // }

    protected _onTriggerEnter(event: ITriggerEvent) {
        this._isAlive = false;
    }

}


