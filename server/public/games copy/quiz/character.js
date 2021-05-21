var CHARACTER;

export default class Character extends Phaser.Scene {

    constructor() {
        super('Character');
    }

    init(data) {
        console.log('Character launched');
        this.qObj = data.qObj;
        this.s_width = data.s_width;
        this.s_height = data.s_height;
        this.char_left_space = data.char_left_space;
        this.q_container_dimensions = data.q_container_dimensions;
        this.q_container = data.q_container;
        this.btn_next = data.btn_next;
        this.justification = data.justification;
    }

    preload() {
        this.load.atlas('right', "./assets/images/spritesheet_right.png", "./assets/images/spritesheet_right.json");
        this.load.atlas('wrong', "./assets/images/spritesheet_wrong.png", "./assets/images/spritesheet_wrong.json");
    }

    create() {
        this.anims.create({
            key: 'correct_answer',
            frames: 'right',
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'wrong_answer',
            frames: 'wrong',
            frameRate: 30,
            repeat: 0
        });

        CHARACTER = this.add.sprite(0, 0, 'right')
        CHARACTER
            .setOrigin(0, 0.5)
            .setDepth(1)
            .setScale(0.6)
            .setPosition(-2 * this.char_left_space, this.q_container_dimensions.height);

        this.playCharacterAnimation(CHARACTER);
        // this.playCharacterAnimation(this.qObj.user_right, CHARACTER, false);
        this.events.on('destroyScene', this.destroySceneHandler, this);
    }

    playCharacterAnimation(img_obj, flag_end) {
        var char_offset_x = this.q_container_dimensions.width * 0.18;

        // if (user_right) {

        // } 
        // else {
        //     // img_obj.play('wrong_answer');
        // }
        img_obj.play('correct_answer');

        this.tweens.timeline({
            targets: img_obj,

            onComplete: function () { img_obj.stop() },
            tweens: [{
                x: this.s_width + this.char_left_space,
                ease: 'Linear',
                duration: 1500,
                onComplete: () => this.showJustification(img_obj)
            },
            {
                x: this.q_container_dimensions.BR.x + 1.3*char_offset_x,
                ease: 'Power2',
                duration: 1500,
                onComplete: () => this.nextQuestion()
            }]
        });

        this.tweens.timeline({
            targets: this.q_container,
            tweens: [{
                x: this.s_width + this.char_left_space,
                ease: 'Linear',
                duration: 1400,
            },
            {
                x: this.q_container_dimensions.center,
                ease: 'Power2',
                duration: 1500
            }]
        });
    }

    flipCharacter(img_obj) {
        img_obj.setOrigin(0.5);
        img_obj.scaleX *= -1;

        img_obj.setOrigin(0, 0.5);
        img_obj.setPosition(img_obj.x + img_obj.width/2, img_obj.y);
        return img_obj;
    }

    showJustification(img_obj) {
        var sceneGame = this.scene.get('Game');
        sceneGame.setPlayJustificationFlag(true);
        sceneGame.setQuestion(this.q_container, this.justification);

        img_obj = this.flipCharacter(img_obj);
    }

    nextQuestion() {
        console.log('button to next question');
        var sceneGame = this.scene.get('Game');
        sceneGame.events.emit('activateBtnNext', this.btn_next, true, 1);
    }

    destroySceneHandler() {
        console.log('characted destroyed');
        CHARACTER.destroy();
    }
}