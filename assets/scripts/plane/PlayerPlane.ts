import { _decorator, Node, __private, EventTouch, Vec3, Camera, ResolutionPolicy, ITriggerEvent, AudioSource } from 'cc';
import { BulletManager } from '../framework/BulletManager';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
import { IEventType, NotifyCenterMgr } from '../framework/NotifyCenterMgr';
import { PlaneCompBase } from './PlaneCompBase';
const { ccclass, property } = _decorator;

@ccclass('PlayerPlane')
export class PlayerPlane extends PlaneCompBase {

    @property(Node)
    explode: Node = null;

    @property(Node)
    hpRootNode: Node = null;

    protected _initalHp: number = 5;   //初始血量

    protected _currHp: number = 0;    //当前血量

    protected _isAlive: boolean = true;

    protected _speed: number = 1;

    protected _bulletPropType: number = Constant.BulletPropType.BULLET_M;   //持有道具类型

    @property(Camera)
    public camera: Camera = null!;



    start() {
        // this.schedule(() => {
        //     console.log(View.instance.getResolutionPolicy());
        //     console.log(this.node.position);

        // }, 2)
        // input.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        // input.on(Input.EventType.TOUCH_START, this._touchStart, this);
    }

    update(deltaTime: number) {
        //游戏是否开始
        if (!GameManager.isGameStart) return;
        //飞机射击
        this._currShootTime += deltaTime;
        if (this._isShooting && this._currShootTime > this._shootTime) {   //触摸一定时间才会发射子弹
            const pos = this.node.position;
            // console.log(this._bulletType);
            switch (this._bulletPropType) {
                case Constant.BulletPropType.BULLET_H:
                    BulletManager.instance.createPlayerPlaneBulletH(pos);
                    break;
                case Constant.BulletPropType.BULLET_S:
                    BulletManager.instance.createPlayerPlaneBulletS(pos);
                    break;
                case Constant.BulletPropType.BULLET_M:
                    BulletManager.instance.createPlaneBaseBullet(false, new Vec3(pos.x, pos.y, pos.z - 7));
                    break;
                default:
                    BulletManager.instance.createPlaneBaseBullet(false, new Vec3(pos.x, pos.y, pos.z - 7));
                    break;
            }
            const bulletAudioName: string = 'bullet' + (this._bulletPropType % 2 + 1);
            // this.playAudioEffect(bulletAudioName);  //播放音效
            NotifyCenterMgr.emit(IEventType.Audio.PLAYER_SHOOTAUDIO, bulletAudioName);
            this._currShootTime = 0;
        }
    }

    onEnable() {
        super.onEnable();
        NotifyCenterMgr.on(IEventType.Operation.CHANGE_PLAYER_SHOOTING, this.changeShooting, this);
        NotifyCenterMgr.on(IEventType.Operation.RESET_DATA, this.resetData, this);
        NotifyCenterMgr.on(IEventType.Operation.CHANGE_BULLET_PROP, this.changeBulletProp, this);
        NotifyCenterMgr.on(IEventType.Operation.PLAYER_INIT, this.init, this);
    }

    onDisable() {
        super.onDisable();
        // NotifyCenterMgr.off(IEventType.Operation.CHANGE_PLAYER_SHOOTING, this.changeShooting, this);
        // NotifyCenterMgr.off(IEventType.Operation.RESET_DATA, this.resetData, this);
        // NotifyCenterMgr.off(IEventType.Operation.CHANGE_BULLET_PROP, this.changeBulletProp, this);
        // NotifyCenterMgr.off(IEventType.Operation.PLAYER_INIT, this.init, this);

    }

    protected _onTriggerEnter(event: ITriggerEvent) {
        const otherGroup = event.otherCollider.getGroup();
        // console.log(event.otherCollider.name);
        if (otherGroup === Constant.PHYGroup.ENEMY_PLANE || otherGroup === Constant.PHYGroup.ENEMY_BULLET) {
            // console.log(event.otherCollider.name + ':reduce blood');
            this._currHp--;
            this.hpRootNode.active = true;
            this.hpRootNode.getChildByName("hp").setScale(this._currHp / this._initalHp, 1, 1);
            if (this._currHp <= 0) {
                this.getComponent(AudioSource).play();
                this._isAlive = false;
                this.explode.active = true;
                this._isShooting = false;
                this.scheduleOnce(() => {
                    this.node.active = false;
                    NotifyCenterMgr.emit(IEventType.GameState.GAME_OVER);
                }, 0.25);
            }
        }
    }

    protected _touchMove(event: EventTouch) {
        const delta = event.touch.getDelta();
        // console.log(delta);

        let pos = this.node.position;
        this.node.setPosition(pos.x + 0.01 * this._speed * delta.x, pos.y, pos.z - 0.01 * this._speed * delta.y);
    }



    /**
     * 初始化
     */
    init() {
        // console.log("player init");
        this._currHp = this._initalHp;
        this._isAlive = true;
        this.node.setPosition(0, 0, 15);
        this.explode.active = false;
        this.hpRootNode.active = false;
        this.hpRootNode.getChildByName("hp").setScale(1, 1, 1);
        this._bulletPropType = Constant.BulletPropType.BULLET_M;
        this.node.active = true;
    }

    private resetData() {
        this.init();
        this._currShootTime = 0;     //当前射击的时间
        this._isShooting = false;    //子弹是否发射
    }

    private changeBulletProp(arg1) {
        this._bulletPropType = <number>arg1;
    }

    private changeShooting(arg1) {
        this._isShooting = <boolean>arg1;
    }
}


