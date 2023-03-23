import { _decorator, Component, Node, EventTouch, Input, screen } from 'cc';
import { GameManager } from '../framework/GameManager';
import { IEventType, NotifyCenterMgr } from '../framework/NotifyCenterMgr';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {
    @property(Number)
    planeSpeed: number = 1;

    @property(Node)
    playerPlane: Node = null!;

    @property(Node)
    gameStart: Node = null; //游戏开始界面ui
    @property(Node)
    game: Node = null;  //游戏进行界面ui
    @property(Node)
    gameOver: Node = null;  //游戏结束界面ui

    // cameraMaxX = screen.windowSize.x / 2;
    // cameraMaxY = screen.windowSize.y / 2;

    start() {
        this.node.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(Input.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(Input.EventType.TOUCH_END, this._touchEnd, this);
    }
    private _touchMove(event: EventTouch) {
        if (!GameManager.isGameStart) return;

        console.log(screen.windowSize);
        let cameraMaxX = screen.windowSize.x / 2;
        let cameraMaxY = screen.windowSize.y / 2;
        console.log(cameraMaxX);
        console.log(cameraMaxY);

        const delta = event.touch.getDelta();
        let pos = this.playerPlane.position;
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
        // if (pos.x + 50 > this.cameraMaxX) {
        //     this.node.setPosition(this.cameraMaxX - 50, pos.y);
        // }
        // if (pos.x - 50 < -this.cameraMaxX) {
        //     this.node.setPosition(-this.cameraMaxX + 50, pos.y);
        // }
        // if (pos.y + 50 > this.cameraMaxY) {
        //     this.node.setPosition(pos.x, this.cameraMaxY - 50);
        // }
        // if (pos.y - 50 < -this.cameraMaxY) {
        //     this.node.setPosition(pos.x, -this.cameraMaxY + 50);
        // }
        if (pos.x + 50 > cameraMaxX) {
            this.playerPlane.setPosition(cameraMaxX - 50, pos.y, pos.z);
        }
        if (pos.x - 50 < -cameraMaxX) {
            this.playerPlane.setPosition(-cameraMaxX + 50, pos.y, pos.z);
        }
        if (pos.z + 50 > cameraMaxY) {
            this.playerPlane.setPosition(pos.x, pos.y, cameraMaxY - 50);
        }
        if (pos.z - 50 < -cameraMaxY) {
            this.playerPlane.setPosition(pos.x, pos.y, -cameraMaxY + 50);
        }
    }

    private _touchStart(event: EventTouch) {
        console.log(this.playerPlane.position);
        if (!GameManager.isGameStart) {
            NotifyCenterMgr.emit(IEventType.Audio.CLICK_BUTTON1);
            this.gameStart.active = false;
            this.game.active = true;
            NotifyCenterMgr.emit(IEventType.GameState.GAME_START);
        }
        else {
            //改变玩家飞机设计状态
            NotifyCenterMgr.emit(IEventType.Operation.CHANGE_PLAYER_SHOOTING, true);
        }
    }

    // protected _touchStart(event: EventTouch) {
    //     // const location = event.touch.getLocation();
    //     // console.log(`screen touch pos: ${location}`);
    //     // const locationUI = event.touch.getUILocation();
    //     // console.log(`UI touch pos: ${locationUI}`);

    //     // 获取 3D 相机里的相机数据
    //     const camera = this.camera.camera;
    //     const pos = new Vec3();
    //     event.touch.getUILocation
    //     console.log(ResolutionPolicy.ContentStrategy.FIXED_HEIGHT._result.viewport);
    //     // 1. 3D 节点世界坐标转屏幕坐标
    //     const wpos = this.node.worldPosition;
    //     // 将 3D 节点的世界坐标转换到屏幕坐标
    //     console.log(camera.worldToScreen(pos, wpos));
    //     // 2. 屏幕坐标转 3D 节点世界坐标
    //     // 获取当前触点在屏幕上的坐标
    //     const location = event.touch.getLocation();
    //     // 注意此处的 z 值。将近平面到远平面之间的距离归一化到 0-1 之间的值。
    //     // 如果值是 0.5，那么转换后的世界坐标值则是在相机近平面到远平面的中心切面的位置
    //     const screenPos = new Vec3(location.x, location.y, 0.5);
    //     console.log(camera.screenToWorld(pos, screenPos));
    // }

    private _touchEnd(event: EventTouch) {
        if (!GameManager.isGameStart) return;
        NotifyCenterMgr.emit(IEventType.Operation.CHANGE_PLAYER_SHOOTING, false);//玩家飞机射击状态

    }

    /**
     * 返回主界面按钮
     */
    returnMain() {
        NotifyCenterMgr.emit(IEventType.Audio.CLICK_BUTTON1);
        NotifyCenterMgr.emit(IEventType.Operation.RETURN_MAIN);
        this.gameOver.active = false;
        this.game.active = false;
        this.gameStart.active = true;

    }

    /**
     * 重新游戏按钮 发通知
     */
    reStart() {
        NotifyCenterMgr.emit(IEventType.Audio.CLICK_BUTTON1);
        NotifyCenterMgr.emit(IEventType.GameState.GAME_REST);
        this.gameOver.active = false;
        this.gameStart.active = false;
        this.game.active = true;
    }
}