import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
import { IEventType, NotifyCenterMgr } from './NotifyCenterMgr';
const { ccclass, property } = _decorator;

interface IAudioMap {
    [name: string]: AudioClip;
}

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property([AudioClip])
    audioList: AudioClip[] = [];

    private _dict: IAudioMap = {};
    private _audioSource: AudioSource = null;

    start() {
        for (const audio of this.audioList) {
            this._dict[audio.name] = audio;
        }
        // console.log(this._dict);
        this._audioSource = this.node.getComponent(AudioSource);
    }

    update(deltaTime: number) {}

    onEnable(){
        NotifyCenterMgr.on(IEventType.Audio.CLICK_BUTTON1, this.clickButton, this);
        NotifyCenterMgr.on(IEventType.Audio.PLAYER_SHOOTAUDIO, this.playerShoot, this);  //
        NotifyCenterMgr.on(IEventType.Audio.ENEMY_EXPLODE, this.enemyExplode, this);  //
    }
    
    onDisable(){
        NotifyCenterMgr.off(IEventType.Audio.CLICK_BUTTON1, this.clickButton, this);
        NotifyCenterMgr.off(IEventType.Audio.PLAYER_SHOOTAUDIO, this.playerShoot, this);  //
        NotifyCenterMgr.off(IEventType.Audio.ENEMY_EXPLODE, this.enemyExplode, this);  //


    }

    private playAudio(name: string) {
        const audioClip = this._dict[name];
        if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
        }
    }

    private clickButton(){
        this.playAudio("button");
    }

    private playerShoot(arg1){
        const bulletAudioName = <string>arg1;
        this.playAudio(bulletAudioName);

    }

    private enemyExplode(){
        this.playAudio("enemy");
    }
    
}


