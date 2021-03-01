import QuizSummary from './quizSummary.js';
import Character from './character.js';

var game;
window.onload = function () {
    let gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x2a4d69,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 760,
            height: 960
        },
        audio: {
            disableWebAudio: true
        },
        fps: {
            target: 60,
            min: 30,
            forceSetTimeOut: true
        },
        scene: [Quiz, QuizSummary, Character]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

var NUM_ANSWERS = 4;
var SPACE_BETWEEN_ANSWERS = 20;
var yellow = '0xffcc5c';
var red = '0xee4035';
var green = '0x7bc043';
var white = '0xffffff';
var blue_text = "#030EB9";
var red_text = '#B91703';

var MAX_VAL = 10000;
var CURRENT_ANSWER;
var INFO = {
    input:
        [
            {
                question: ['Pergunta 1'],
                answers: ['Resposta 1', 'Resposta 2', 'Resposta 3 sdfsdfsd sdfsdf sdsdffewe2 ew fwef ef 2 f F S FD', 'Resposta 4'],
                right_answer: 2,
                user_right: null,
                user_guess: null,
                audio: true
            },
        ],
    current_question_num: 0,
    timer: false,
    time_to_resp_question: null,
    has_audio: true
};

var timer_text, timedEvent;
var mili = 1000;
// workaround, need to be global to be used by the timer event if the game has timer
var answers_container;
var GAME_REF;

class Quiz extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    init() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        GAME_REF = urlParams.get('ref');
    }

    async preload() {
        this.load.image('bg1', "./assets/images/bg_1.png");
        this.load.image('q_marks', "./assets/images/questions_marks.png");
        this.load.image('btn', "./assets/images/btn_1.png");
        this.load.image('btn2', "./assets/images/btn_2.png");
        this.load.image('correct', "./assets/images/correct.png");
        this.load.image('wrong', "./assets/images/wrong.png");
        this.load.image('listening', "./assets/images/listening.png");

        const get_game_str = '/api/games/quiz/' + GAME_REF;
        await axios.get(get_game_str)
            .then((response) => this.loadFromDB(response))
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    loadFromDB(response) {
        if (response.data) {
            console.log(response.data);
            let obj = response.data;
            // DB_src = response.data.src;
            // DB_size_pieces = response.data.piece_size;
            // DB_image_ref = response.data.image_ref;
            INFO.input = obj.input;
            INFO.timer = obj.timer;
            INFO.time_to_resp_question = obj.time_to_resp_question;
            INFO.has_audio = obj.has_audio;
        }
        this.load.on('complete', () => this.createCostum());
        // this.load.image(DB_image_ref, DB_src);
        this.load.start();
    }

    createCostum() {
        console.log(INFO);
        let s_width = game.scale.width;
        let s_height = game.scale.height;

        var bg = this.add.image(0, 0, 'bg1');
        // bg = this.scaleImageToFitFrame(s_width, 10000, bg);
        bg.setDepth(-3).setOrigin(0);

        // var btn_next = this.add.rectangle(10, 10, 50, 50, 0x696969);
        var btn_next = this.add.image(100, 0, 'btn2');
        btn_next = this.scaleImageToFitFrame(80, MAX_VAL, btn_next);
        btn_next
            .setOrigin(0)
            .setAlpha(0.5)
            .disableInteractive();

        var question_container = this.createQuestionContainer(s_width, s_height, btn_next);
        answers_container = this.createAnswersContainer(s_width, s_height, question_container, btn_next);
        var ending_container = this.createEndingContainer(s_width, s_height, question_container, answers_container);

        question_container.setDepth(-2);
        answers_container.setDepth(-2);
        ending_container.setDepth(-2);

        // only set to visible in the end
        ending_container.setVisible(false);

        var current_answer_text = (INFO.current_question_num + 1) + '/' + this.totalQuestions();
        CURRENT_ANSWER = this.add.text(question_container.x + question_container.dimensions.width / 2, question_container.y - 50, current_answer_text,
            { fontFamily: "Arial", fontSize: 30, color: 0x696969, align: 'center' });
        CURRENT_ANSWER.setOrigin(0.5);

        this.setQuestion(question_container, INFO.input[0].question);
        this.setAnswer(answers_container, INFO.input[0].answers);

        // console.log(question_container);
        // console.log(answers_container);

        // ASSETS
        var q_marks = this.add.image(0, 0, 'q_marks');
        q_marks = this.scaleImageToFitFrame(MAX_VAL, question_container.dimensions.height / 2.5, q_marks);
        q_marks.setDepth(-1).setOrigin(0);
        q_marks.setPosition(question_container.dimensions.width - q_marks.getData('scaled_w') / 2, question_container.dimensions.y - q_marks.getData('scaled_h') * 1.5);
        question_container.add(q_marks);
        btn_next.setPosition(question_container.dimensions.x + question_container.dimensions.width, answers_container.y + answers_container.height);

        // LISTENERS
        btn_next.on('pointerdown', () => this.nextQuestion(s_width, s_height, btn_next, question_container, answers_container, ending_container));
        this.events.on('activateBtnNext', this.setBtnNextHandler, this);
    }

    endingInfoHandler(s_width, s_height, q_container, a_container, e_container) {

        q_container.setVisible(false);
        // create new question container to eliminate the timer
        INFO.timer = false;

        q_container = this.createQuestionContainer(s_width, s_height, null);

        e_container.setVisible(false);

        a_container.setVisible(true);

        this.scene.launch('Summary', {
            s_width: s_width,
            s_height: s_height,
            q_container: q_container,
            a_container: a_container,
            GAME_INFO: INFO,
            MAX_VAL: MAX_VAL,
            yellow: yellow,
            white: white
        });
    }

    nextQuestion(s_width, s_height, btn_ref, q_container, a_container, e_container) {
        console.log('next');
        // clean blurs and colors
        this.setBlurAndColorFromAnswers(a_container, white, 1, true, null, null);

        // remove answers signs
        this.setSignsAnswers(a_container, -1, false);

        // clean q_container color
        this.setQuestionColor(q_container, white);

        // destroy character scene
        var characterGame = this.scene.get('Character');
        characterGame.events.emit('destroyScene');

        // set disable next question button
        this.setBtnNextHandler(btn_ref, false, 0.5);
        // enable pointerover and pointerout listeners


        // put the next question on question container and answers container
        if (INFO.current_question_num < INFO.input.length - 1) {
            let current_question = ++INFO.current_question_num;
            this.setQuestion(q_container, INFO.input[current_question].question);
            this.setAnswer(a_container, INFO.input[current_question].answers);

            // if game has time, do another time event for the next question
            if (INFO.timer) {
                timedEvent.remove();
                timedEvent = this.time.delayedCall(INFO.time_to_resp_question * mili, this.onEvent, [s_width, s_height, q_container, btn_ref], this);
            }
        }
        else {
            console.log('No more questions...');
            // hide the answer container and the button
            a_container.setVisible(false);
            btn_ref.setVisible(false);

            this.updateEndingInfo(e_container);
            // show the ending container
            e_container.setVisible(true);

            // if the game has timer remove the last timer event
            if (INFO.timer) {
                timedEvent.remove();
            }
        }
    }

    updateEndingInfo(container) {
        for (let i = 0; i < container.list.length; i++) {
            let obj = container.list[i];
            if (obj.getData('type') == 'QuestionText') {
                obj.setVisible(false);
            }
            else if (obj.getData('type') == 'QuestionRightWrong') {
                obj.setVisible(true);
                if (obj.getData('type_') == 'RightTextNum') {
                    obj.setText(this.getNumberOfRightWrongAnswers().right)
                }
                else if (obj.getData('type_') == 'WrongTextNum') {
                    obj.setText(this.getNumberOfRightWrongAnswers().wrong)
                }
            }
        }
    }

    update() {
        if (INFO.timer) {
            let current_time = (INFO.time_to_resp_question - timedEvent.elapsed / mili).toFixed(0);
            timer_text.setText(current_time);
            if (current_time <= 3) {
                timer_text.setColor(red_text);
            }
        }
    }

    onEvent(s_width, s_height, q_container, btn_next) {
        console.log('Time Over!');
        this.answerHandler(answers_container, null, s_width, s_height, q_container, btn_next);
    }

    createQuestionContainerWithTimer(s_width, s_height, q_container, text, text_margin, btn_next) {
        text.setPosition(text.x, text_margin * 3);

        timer_text = this.add.text(0, 0, 'sfd', { fontFamily: "Arial", fontSize: 30, color: blue_text });
        timer_text
            .setOrigin(0.5)
            .setPosition(q_container.dimensions.width / 2, text_margin);

        timedEvent = this.time.delayedCall(INFO.time_to_resp_question * mili, this.onEvent, [s_width, s_height, q_container, btn_next], this);

        q_container.add(timer_text);

        return q_container;
    }


    createQuestionContainer(s_width, s_height, btn_next) {
        var questions_w = s_width * 0.7;
        var questions_h = s_height * 0.3;
        var text_margin_w = s_width * 0.05;
        var text_margin = s_height * 0.02;

        var container = this.add.container(0, 0);
        var graphics = this.add.graphics();
        graphics.fillStyle(white, 1);
        graphics.fillRoundedRect(0, 0, questions_w, questions_h, 10);

        var question_text = "Question001";
        var text = this.make.text({
            x: questions_w / 2,
            y: text_margin,
            text: question_text,
            origin: { x: 0.5, y: 0 },
            style: {
                fontFamily: 'Arial',
                fontSize: 30,
                color: 0x696969,
                wordWrap: { width: questions_w - 2 * text_margin_w, useAdvancedWrap: true }
            }
        });
        text.setData('type', 'QuestionText');

        container.add(graphics);
        container.add(text);

        container.setPosition(s_width / 2 - questions_w / 2, questions_w / 6);
        container.dimensions = {
            x: container.x,
            y: container.y,
            height: questions_h,
            width: questions_w,
            BR: {
                x: container.x + questions_w,
                y: container.y + questions_h
            },
            center: s_width / 2 - questions_w / 2
        };

        // do some alterations if the game has TIMER
        if (INFO.timer) {
            return this.createQuestionContainerWithTimer(s_width, s_height, container, text, text_margin, btn_next);
        }

        // if the question has audio
        if (INFO.has_audio) {
            var btn_listening = this.add.image(0, 0, 'listening');
            btn_listening = this.scaleImageToFitFrame(40, MAX_VAL, btn_listening);
            btn_listening
                .setInteractive()
                .setPosition(questions_w - btn_listening.getData('scaled_w'), text.y + text.height / 3);

            btn_listening.on('pointerdown', () => this.playQuestionAudioHandler(btn_listening));

            container.add(btn_listening);
        }

        return container;
    }

    createAnswersContainer(s_width, s_height, q_container, btn_next) {
        var answers_w = s_width * 0.7;
        var answers_h = s_height * 0.08;

        var container = this.add.container(0, 0);
        var graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRoundedRect(0, 0, answers_w, answers_h, 10).setVisible(false);

        var rt = this.add.renderTexture(0, 0, answers_w, answers_h).setVisible(false);
        rt.draw(graphics);
        rt.saveTexture('answer_placeholder');

        var answers_h_counter = 0;
        for (let i = 0; i < NUM_ANSWERS; i++) {
            // placeholder
            let img_answer_placeholder = this.add.image(0, answers_h_counter, 'answer_placeholder');
            img_answer_placeholder.setInteractive().setOrigin(0);
            img_answer_placeholder.setData('type', 'img_placeholder-' + i);

            // text number
            let a_number_text = `${i + 1})`;
            let a_number = this.add.text(0, 0, a_number_text, { fontFamily: "Arial", fontSize: answers_h * 0.4, color: 0x696969, align: 'center' });
            let placeholder_center = img_answer_placeholder.height / 2 - a_number.height / 2;
            a_number.setPosition(5, placeholder_center + answers_h_counter);
            a_number.setVisible(false);

            // text answer
            let a = 'ANSWER_' + i;
            let number_margin = a_number.width * 2;
            var a_text = this.make.text({
                x: number_margin,
                y: placeholder_center + answers_h_counter,
                text: a,
                origin: { x: 0, y: 0.5 },
                style: {
                    fontFamily: 'Arial',
                    fontSize: 20,
                    color: 0x696969,
                    wordWrap: { width: answers_w - number_margin, useAdvancedWrap: true }
                }
            });
            a_text.setData('text_type', 'Answer');
            // fit placeholder 
            // only works for a maximum of 2 rows of text
            if (a_text.text.width > answers_w - SPACE_BETWEEN_ANSWERS) {
                a_text.setPosition(SPACE_BETWEEN_ANSWERS, img_answer_placeholder.height / 2);
            }
            else {
                a_text.setPosition(SPACE_BETWEEN_ANSWERS, img_answer_placeholder.height / 2 + answers_h_counter);
            }

            // right or wrong information
            var info_correct = this.add.image(0, 0, 'correct');
            info_correct = this.scaleImageToFitFrame(MAX_VAL, answers_h / 2, info_correct);
            info_correct
                .setPosition(answers_w - info_correct.getData('scaled_w') / 1.5, img_answer_placeholder.height / 2 + answers_h_counter)
                .setVisible(false)
                .setData('type', 'answer_sign')
                .setData('sign', 'correct');

            var info_wrong = this.add.image(0, 0, 'wrong');
            info_wrong = this.scaleImageToFitFrame(MAX_VAL, answers_h / 2, info_wrong);
            info_wrong
                .setPosition(answers_w - info_wrong.getData('scaled_w') / 1.5, img_answer_placeholder.height / 2 + answers_h_counter)
                .setVisible(false)
                .setData('type', 'answer_sign')
                .setData('sign', 'wrong');

            // Answer Handler
            img_answer_placeholder.on('pointerdown', () => this.answerHandler(container, img_answer_placeholder, s_width, s_height, q_container, btn_next));
            img_answer_placeholder.on('pointerover', () => this.imgPointerOverHandler(img_answer_placeholder, true));
            img_answer_placeholder.on('pointerout', () => this.imgPointerOverHandler(img_answer_placeholder, false));

            var arr_obj_in_placeholder = [img_answer_placeholder, a_number, a_text, info_correct, info_wrong];
            for (let j = 0; j < arr_obj_in_placeholder.length; j++) {
                arr_obj_in_placeholder[j].setData('answer_num', i);
                container.add(arr_obj_in_placeholder[j]);
            }
            answers_h_counter += answers_h + SPACE_BETWEEN_ANSWERS;
            container.height = answers_h_counter;
        }
        container.setPosition(s_width / 2 - answers_w / 2, q_container.dimensions.BR.y + 3 * SPACE_BETWEEN_ANSWERS);
        container.dimensions = {
            answer_w: answers_w,
            answer_h: answers_h
        }
        return container;
    }

    createEndingContainer(s_width, s_height, q_container, a_container) {
        var container = this.add.container(0, 0);
        var questions_w = s_width * 0.7;
        var questions_h = s_height * 0.3;

        var graphics = this.add.graphics();
        graphics.fillStyle(white, 1);
        graphics.fillRoundedRect(0, 0, questions_w, questions_h, 10);

        var info_correct = this.add.image(0, 0, 'correct');
        info_correct = this.scaleImageToFitFrame(50, MAX_VAL, info_correct);
        var info_correct_pos_x = questions_w / 2 - info_correct.getData('scaled_w') * 2;
        info_correct
            .setPosition(info_correct_pos_x, info_correct.getData('scaled_h'))
            .setData('type', 'QuestionRightWrong')

        var info_wrong = this.add.image(0, 0, 'wrong');
        info_wrong = this.scaleImageToFitFrame(50, MAX_VAL, info_wrong);
        var info_wrong_pos_x = questions_w / 2 + info_wrong.getData('scaled_w') * 2;
        info_wrong
            .setPosition(info_wrong_pos_x, info_correct.getData('scaled_h'))
            .setData('type', 'QuestionRightWrong')

        var right_a_num = this.add.text(info_correct_pos_x, info_correct.y * 2, '1', { fontFamily: "Arial", fontSize: 50, color: 0x696969, align: 'center' });
        var wrong_a_num = this.add.text(info_wrong_pos_x, info_wrong.y * 2, '1', { fontFamily: "Arial", fontSize: 50, color: 0x696969, align: 'center' });
        right_a_num
            .setOrigin(0.5, 0)
            .setData('type', 'QuestionRightWrong')
            .setData('type_', 'RightTextNum')

        wrong_a_num
            .setOrigin(0.5, 0)
            .setData('type', 'QuestionRightWrong')
            .setData('type_', 'WrongTextNum')

        // button to load summary scene
        var rect_summary_w = questions_w / 3;
        var rect_summary_h = questions_h / 4;
        var rect_summary = this.add.rectangle(0, 0, rect_summary_w, rect_summary_h, 0x696969, 0.3);
        rect_summary
            .setOrigin(0)
            .setPosition(questions_w / 2 - rect_summary_w / 2, questions_h * 0.7)
            .setInteractive();

        rect_summary.on('pointerdown', () => this.endingInfoHandler(s_width, s_height, q_container, a_container, container, rect_summary));

        var text = this.add.text(0, 0, 'Ver Respostas', { fontFamily: "Arial", fontSize: 20, color: 0x696969, align: 'center' });
        text
            .setOrigin(0.5)
            .setPosition(questions_w / 2, rect_summary.y + rect_summary_h / 2);

        container.add(graphics);
        container.add(info_correct);
        container.add(info_wrong);
        container.add(right_a_num);
        container.add(wrong_a_num);
        container.add(rect_summary);
        container.add(text);

        container.setPosition(s_width / 2 - questions_w / 2, questions_w / 6);

        return container;
    }

    /** 
       * HANDLERS
      */
    answerHandler(container, gameObject, s_width, s_height, q_container, btn_next) {
        var answer_selected_pos
        if (gameObject) {
            answer_selected_pos = gameObject.getData('answer_num');

            // pause the timer if game the game has time
            if (INFO.timer) {
                timedEvent.paused = true;
            }
        }
        // case where the time to respond has overtaken
        else {
            answer_selected_pos = -1;
        }

        var current_question_num = INFO.current_question_num;
        var right_answer_pos = INFO.input[current_question_num].right_answer;
        var question_obj = INFO.input[current_question_num];

        // if its the right answer
        if (answer_selected_pos == right_answer_pos) {
            console.log('right answer!');
            question_obj.user_right = true;
            this.setQuestionColor(q_container, green, 0.8);

            // play answer right sound

        }
        // if its the wrong
        else {
            this.setQuestionColor(q_container, red, 0.8);
            question_obj.user_right = false;

            // play answer wrong sound

        }
        // set the user selected answer
        question_obj.user_guess = answer_selected_pos;

        // put the right sign
        this.setSignsAnswers(container, right_answer_pos, true);

        // disable questions (img_placeholder)
        // blur questions 
        this.setBlurAndColorFromAnswers(container, white, 0.4, false, answer_selected_pos, yellow);

        // launch character scene
        this.scene.launch('Character', {
            qObj: question_obj,
            s_width: s_width,
            s_height: s_height,
            char_left_space: SPACE_BETWEEN_ANSWERS,
            q_container_dimensions: q_container.dimensions,
            q_container: q_container,
            btn_next: btn_next
        });

    }

    imgPointerOverHandler(ref_img, flag) {
        if (flag) {
            ref_img.setTint(yellow);
        }
        else {
            ref_img.setTint(white);
        }
    }

    playQuestionAudioHandler(btn_ref) {
        console.log('play audio');
        btn_ref.setAlpha(0.5);
    }

    /**
     * UTILS
     */

    setBlurAndColorFromAnswers(container, color, alpha, flag, a_selected_pos, a_selected_color) {
        var list_obj;
        for (let i = 0; i < container.list.length; i++) {
            list_obj = container.list[i];
            list_obj.setAlpha(1);
            let str = list_obj.getData('type');
            if (str != null && str.includes('img_placeholder')) {
                // disable or enable interactive
                if (flag) {
                    list_obj.setInteractive();
                }
                else {
                    list_obj.disableInteractive();
                }
                // to show the user selected answer
                if (a_selected_pos != null && a_selected_pos == list_obj.getData('answer_num')) {
                    list_obj.setTint(a_selected_color);
                    list_obj.setAlpha(0.9);
                }
                else {
                    list_obj.setTint(color);
                    list_obj.setAlpha(alpha);
                }
            }
            if (str == 'answer_sign') {
                list_obj.setAlpha(0.8);
            }
        }
    }

    setSignsAnswers(container, right_ans_pos, flag) {
        var list_obj;
        for (let i = 0; i < container.list.length; i++) {
            list_obj = container.list[i];
            if (list_obj.getData('type') == 'answer_sign') {
                // sees if the element from the container list belongs
                if (right_ans_pos == list_obj.getData('answer_num')) {
                    // set the right visible
                    if (list_obj.getData('sign') == 'correct') {
                        list_obj.setVisible(flag);
                    }
                }
                // clean the signs
                else if (right_ans_pos == -1) {
                    list_obj.setVisible(flag);
                }
                else {
                    // set the wrong visible
                    if (list_obj.getData('sign') == 'wrong') {
                        list_obj.setVisible(flag);
                    }
                }
            }
        }
    }

    setQuestion(container, question) {
        for (let i = 0; i < container.list.length; i++) {
            if (container.list[i].getData('type') == "QuestionText") {
                container.list[i].setText(question);
            }
        }
        // update current question text
        CURRENT_ANSWER.setText((INFO.current_question_num + 1) + '/' + this.totalQuestions());
    }

    setQuestionColor(container, color, alpha) {
        for (let i = 0; i < container.list.length; i++) {
            if (container.list[i].type == "Graphics") {
                container.list[i].fillStyle(color, alpha);
                container.list[i].fill();
            }
        }
    }

    setAnswer(container, answers_arr) {
        var answers_arr_counter = 0;
        for (let i = 0; i < container.list.length; i++) {
            if (container.list[i].getData('text_type') == "Answer") {
                container.list[i].setText(answers_arr[answers_arr_counter++]);
            }
        }
    }

    totalQuestions() {
        var counter = 0;
        for (let i = 0; i < INFO.input.length; i++) {
            counter++;
        }
        return counter;
    }

    setBtnNextHandler(btn_ref, flag, alpha) {
        if (flag) {
            btn_ref.setInteractive();
            btn_ref.setAlpha(alpha);
        }
        else {
            btn_ref.disableInteractive();
            btn_ref.setAlpha(alpha);
        }
    }

    getNumberOfRightWrongAnswers() {
        var counter = 0;
        var total = INFO.input.length;
        for (let i = 0; i < total; i++) {
            let obj = INFO.input[i];
            if (obj.user_right) {
                counter++;
            }
        }
        return {
            right: counter,
            wrong: total - counter
        }
    }

    scaleImageToFitFrame(maxWidth, maxHeight, imgObj) {
        var { maxScaleWidth, maxScaleHeight } = 1;
        // find scale width interval
        maxScaleWidth = maxWidth / imgObj.width;
        // find scale height interval
        maxScaleHeight = maxHeight / imgObj.height;

        var newScaleValue = Math.min(maxScaleWidth.toFixed(3), maxScaleHeight.toFixed(3));

        imgObj.setScale(newScaleValue)
        imgObj.setData('scaled_w', Math.floor(imgObj.width * newScaleValue));
        imgObj.setData('scaled_h', Math.floor(imgObj.height * newScaleValue));

        return imgObj;
    }
}