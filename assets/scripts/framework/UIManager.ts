import { _decorator, Component, Node, Animation, Label } from 'cc';
import { GameManager } from './GameManager';
import { IEventType, NotifyCenterMgr } from './NotifyCenterMgr';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Node)
    gameStartPage: Node = null;

    @property(Node)
    gamePage: Node = null;
    @property(Node)
    gameOverPage: Node = null;

    @property(Label)
    gameScore: Label = null;
    @property(Label)
    gameOverScore: Label = null;

    private _score: number = 0;

    start() {

    }

    update(deltaTime: number) {
        
    }

    onEnable() {
        NotifyCenterMgr.on(IEventType.Operation.ADD_SCORE, this.addScore, this);
        NotifyCenterMgr.on(IEventType.GameState.GAME_REST, this.reStart, this);
        NotifyCenterMgr.on(IEventType.GameState.GAME_OVER, this.gameOver, this);
        NotifyCenterMgr.on(IEventType.GameState.GAME_START, this.gameStart, this);
        NotifyCenterMgr.on(IEventType.Operation.RETURN_MAIN, this.returnMain, this);
    }

    onDisable() {
        NotifyCenterMgr.off(IEventType.Operation.ADD_SCORE, this.addScore, this);
        NotifyCenterMgr.off(IEventType.GameState.GAME_REST, this.reStart, this);
        NotifyCenterMgr.off(IEventType.GameState.GAME_OVER, this.gameOver, this);
        NotifyCenterMgr.off(IEventType.GameState.GAME_START, this.gameStart, this);
        NotifyCenterMgr.off(IEventType.Operation.RETURN_MAIN, this.returnMain, this);
    }

    /**
     * 返回主界面时,重置数据
     */
    returnMain() {
        GameManager.isGameStart = false;
        NotifyCenterMgr.emit(IEventType.Operation.RESET_DATA);

        this.resetData();
        NotifyCenterMgr.emit(IEventType.Operation.CHANGE_SCHEDULE, false);
    }

    gameStart() {
        
        GameManager.isGameStart = true;
        NotifyCenterMgr.emit(IEventType.Operation.PLAYER_INIT);

        NotifyCenterMgr.emit(IEventType.Operation.CHANGE_SCHEDULE, true);//子弹道具 敌机生成

    }

    gameOver(){
        GameManager.isGameStart = false;

        this.gamePage.active = false;
        this.gameOverPage.active = true;
        this.gameOverPage.getChildByName("fightBoxSettlement").getComponent(Animation).play("fightBoxSettlement");
        this.gameOverScore.string = this._score + "";

        NotifyCenterMgr.emit(IEventType.Operation.CHANGE_SCHEDULE, false);
        NotifyCenterMgr.emit(IEventType.Operation.RECYCLE_BULLET);//回收所有子弹
        NotifyCenterMgr.emit(IEventType.Operation.RECYCLE_ENEMY);//回收所有敌机
    }

    private reStart() {
        GameManager.isGameStart = true;
        NotifyCenterMgr.emit(IEventType.Operation.RESET_DATA);
        this.resetData();

        NotifyCenterMgr.emit(IEventType.Operation.CHANGE_SCHEDULE, true);
    }

    /**
     * 得分
     */
    private addScore() {
        this._score++;
        this.gameScore.string = this._score + "";
    }

    /**
     * 重置数据
     */
    private resetData() {
        this._score = 0;
        this.gameScore.string = 0 + "";
    }
}


