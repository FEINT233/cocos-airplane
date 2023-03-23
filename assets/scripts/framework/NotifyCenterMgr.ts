import { EventTarget } from "cc";

/**
 * 自定义事件参数封装
 */
export interface IEventArg {

    Args: { [argname: string]: any }
}

/**
 * 自定事件类型
 */
export class IEventType {

    static GameState = {
        GAME_START: "gamestate_gamestart",
        GAME_OVER: "gamestate_gameover",
        GAME_REST: "gamestate_gamerest"
    }


    static Audio = {
        CLICK_BUTTON1: "audio_click_button1",    //按钮1声音
        PLAYER_SHOOTAUDIO: "audio_player_shoot",   //玩家射击音效(子弹类型不同射击音效不同)
        ENEMY_EXPLODE: "audio_enemy_explode"    //敌机爆炸

    }

    static Animation = {
        ENEMY_EXPLODE: "animation_enemy_explode",
        RECYCLE_ANIMATION: "operation_recycle_animation",  //回收所有特效

    }

    static Bullet = {

    }

    static Operation = {
        RESET_DATA: "operation_reset_data",  //重置数据
        RETURN_MAIN: "operation_return_main", //返回主界面
        ADD_SCORE: "operation_add_score",   //加分
        CHANGE_BULLET_PROP: "operation_change_bullet_prop",  //改变玩家持有道具类型
        PLAYER_INIT: "operation_player_init", //玩家飞机初始化
        RECYCLE_BULLET: "operation_recycle_bullet",   //回收所有子弹
        RECYCLE_ENEMY: "operation_recycle_enemy",  //回收所有敌机
        COMBINATION_AUTOAMTIC: "operation_combination_autoamtic",   //组合(number)属性自增,用于不同飞机组合的创建
        CHANGE_PLAYER_SHOOTING: "operation_change_player_shooting",   //改变玩家飞机射击状态
        CHANGE_SCHEDULE: "operation_change_schedule"  //改变游戏计时器(用于计时器开关)
    }


}

// export class Dictionary {
//     items: object;

//     constructor() {
//         this.items = {};
//     }

//     has(key: any): boolean {
//         return this.items.hasOwnProperty(key);
//     }

//     set(key: any, val: any) {
//         this.items[key] = val;
//     }

//     delete(key: any): boolean {
//         if (this.has(key)) {
//             delete this.items[key];
//         }
//         return false;
//     }

//     get(key: any): any {
//         return this.has(key) ? this.items[key] : undefined;
//     }

//     values(): any[] {
//         let values: any[] = [];
//         for (let k in this.items) {
//             if (this.has(k)) {
//                 values.push(this.items[k]);
//             }
//         }
//         return values;
//     }
// }


/**
 * 自用全局消息收发中心,封装了EventTarget类, 目前只有点对点模式
 */
export class NotifyCenterMgr {
    private static eventTarget: EventTarget = new EventTarget();

    private constructor() {
    }

    /**
     * 收听通知
     * @param name 
     * @param callback 
     * @param target 
     */
    static on(name: string, callback: any, target?: any) {
        this.eventTarget.on(name, callback, target);
    }

    /**
     * 收听一次通知
     * @param name 
     * @param callback 
     * @param target 
     */
    static once(name: string, callback: any, target?: any) {
        this.eventTarget.once(name, callback, target);
    }

    /**
     * 
     * @param name 
     * @param callback 
     * @param target 
     */
    static off(name: string, callback: any, target?: any) {
        this.eventTarget.off(name, callback, target);
    }

    /**
     * 取消对应target监听
     * @param target 
     */
    static targetOff(target?: any) {
        this.eventTarget.targetOff(target);
    }

    /**
     * 移除所有通知
     * @param target 
     */
    static removeAll(target?: any) {
        this.eventTarget.removeAll(target);
    }

    /**
     * 发送通知
     * @param name 
     * @param arg1 
     * @param arg2 
     * @param arg3 
     * @param arg4 
     * @param arg5 
     */
    static emit(name: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) {
        this.eventTarget.emit(name, arg1, arg2, arg3, arg4, arg5);
    }
}