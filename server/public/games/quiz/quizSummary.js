export default class QuizSummary extends Phaser.Scene {

    constructor() {
        super('Summary');
    }

    init(data) {
        this.s_width = data.s_width;
        this.s_height = data.s_height;
        this.q_container = data.q_container;
        this.a_container = data.a_container;
        this.GAME_INFO = data.GAME_INFO;
        this.MAX_VAL = data.MAX_VAL;
        this.yellow = data.yellow;
        this.white = data.white;
    }

    preload() {
        this.load.image('correct', "./assets/images/correct.png");
        this.load.image('wrong', "./assets/images/wrong.png");
        this.load.image('btn2', "./assets/images/btn_2.png");
    }

    create() {
        console.log('Game Summary');
        var sceneGame = this.scene.get('Game');

        var btn_next = this.add.image(100, 0, 'btn2');
        btn_next = sceneGame.scaleImageToFitFrame(80, this.MAX_VAL, btn_next);
        btn_next
            .setOrigin(0)
            .setInteractive();
        btn_next.setPosition(this.q_container.dimensions.x + this.q_container.dimensions.width, this.a_container.y + this.a_container.height);

        var btn_previous = this.add.image(100, 0, 'btn2');
        btn_previous = sceneGame.scaleImageToFitFrame(80, this.MAX_VAL, btn_previous);
        btn_previous
            .setOrigin(0)
            .setInteractive();
        btn_previous.scaleX *= -1;
        btn_previous.setPosition(this.q_container.dimensions.x, this.a_container.y + this.a_container.height);

        // display first question answered 
        var current_question = 0;
        this.GAME_INFO.current_question_num = current_question;

        this.setQuestionSummary(sceneGame, current_question);
        btn_previous.setAlpha(0.5);

        // listeners
        btn_next.on('pointerdown', () => this.SummaryQuestion(sceneGame, btn_previous, btn_next, true));
        btn_previous.on('pointerdown', () => this.SummaryQuestion(sceneGame, btn_previous, btn_next, false));
    }

    SummaryQuestion(sceneGame, btn_p, btn_n, next) {
        var current_q = this.GAME_INFO.current_question_num;
        var total_q = sceneGame.totalQuestions();
        var valid = false;
        if (next) {
            if (++current_q < total_q) {
                this.GAME_INFO.current_question_num++;
                valid = true;
            }
        }
        else {
            if (--current_q >= 0) {
                this.GAME_INFO.current_question_num--;
                valid = true;
            }
        }
        if (valid) {
            // clean the anterior signs
            sceneGame.setSignsAnswers(this.a_container, -1, false);
            this.setQuestionSummary(sceneGame, this.GAME_INFO.current_question_num);

            // button alpha
            if (current_q == 0) {
                btn_p.setAlpha(0.5);
            }
            else if (current_q == total_q - 1) {
                btn_n.setAlpha(0.5);
            }
            else {
                btn_p.setAlpha(1);
                btn_n.setAlpha(1);
            }
        }
    }

    setQuestionSummary(sceneGame, pos) {
        // set the questions
        sceneGame.setQuestion(this.q_container, this.GAME_INFO.input[pos].question);

        // set the answers
        sceneGame.setAnswer(this.a_container, this.GAME_INFO.input[pos].answers);

        // set the blurs and colors
        sceneGame.setBlurAndColorFromAnswers(this.a_container, this.white, 0.4, false, this.GAME_INFO.input[pos].user_guess, this.white);

        // set signs
        sceneGame.setSignsAnswers(this.a_container, this.GAME_INFO.input[pos].right_answer, true);
    }
}