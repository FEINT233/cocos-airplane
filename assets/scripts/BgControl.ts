import { _decorator, Component, Node } from 'cc';
const { ccclass, property,  executeInEditMode} = _decorator;

@ccclass('BgControl')
// @executeInEditMode(true)
export class BgControl extends Component {

    @property(Number)
    public bgSpeed: number = 10;

    @property(Number)
    public bgMovingRange: number = 90;

    start() {

    }

    update(deltaTime: number) {
        for (let child of this.node.children) {
            this._moveBackGround(child, deltaTime);
        }
    }

    private _moveBackGround(child: Node, dt: number) {
        let p = child.getPosition();
        p.z += this.bgSpeed * dt;
        child.setPosition(p);
        if (child.position.z >= this.bgMovingRange) {
            child.setPosition(p.x, p.y, child.getPosition().z - 2*this.bgMovingRange);
        }
    }
}


