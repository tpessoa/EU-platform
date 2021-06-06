import{a as t}from"./vendor.daadd3da.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const i=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,a)=>{const h=new URL(t,i);if(self[e].moduleMap[h])return s(self[e].moduleMap[h]);const r=new Blob([`import * as m from '${h}';`,`${e}.moduleMap['${h}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){a(new Error(`Failed to import: ${t}`)),n(o)},onload(){s(self[e].moduleMap[h]),n(o)}});document.head.appendChild(o)})),self[e].moduleMap={}}}("/assets/");class e extends Phaser.Scene{constructor(){super({key:"BootScene"}),this.prefix=""}init(){const t=window.location.search,e=new URLSearchParams(t);this.gameId=e.get("id")}async preload(){t({method:"post",url:this.prefix+"/api/games/statistics-game-opened",data:{gameId:this.gameId}}),this.load.script("webfont","https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js");const e=this.prefix+"/api/games/game/"+this.gameId;await t.get(e).then((t=>{console.log(t.data);const e=t.data.config;this.questions=e.questions,this.timer=e.timer,this.timeToRespQuestion=e.time_to_resp_question,this.load.on("complete",(()=>this.createCustom())),this.load.image("bg","./assets/images/bg_1.png"),this.load.image("q_marks","./assets/images/questions_marks.png"),this.load.image("btn","./assets/images/btn_1.png"),this.load.image("btn2","./assets/images/btn_2.png"),this.load.image("correct","./assets/images/correct.png"),this.load.image("wrong","./assets/images/wrong.png"),this.load.image("listening","./assets/images/listening.png"),this.load.image("star","assets/images/star.png"),this.load.image("question","assets/images/question.png"),this.load.image("hourglass","assets/images/hourglass.png"),this.load.audio("right_answer","./assets/sounds/right_answer.mp3"),this.load.audio("wrong_answer","./assets/sounds/wrong_answer.mp3"),this.load.atlas("right","./assets/images/spritesheet_right.png","./assets/images/spritesheet_right.json"),this.load.atlas("wrong","./assets/images/spritesheet_wrong.png","./assets/images/spritesheet_wrong.json"),this.load.start()})).catch((function(t){console.log(t)}))}createCustom(){this.scene.start("GameScene",{questions:this.questions,timer:this.timer,timeToRespQuestion:this.timeToRespQuestion,prefix:this.prefix,gameId:this.gameId})}}let s={CURRENT_QUESTION:0,USER_ANSWERS:[],USER_TIMES:[],TIME:0,GAME_OVER:!1};const i=(t,e,s)=>{let i=1,n=1;i=t/s.width,n=e/s.height;let a=Math.min(Number(i.toFixed(3)),Number(n.toFixed(3)));return s.setScale(a),s.setData("scaled_value",a),s.setData("scaled_w",Math.floor(s.width*a)),s.setData("scaled_h",Math.floor(s.height*a)),s};class n{constructor(t,e,s,i){this.scene=t;let n=this.scene.add.image(0,0,e);this.fitImage(n,s,i)}fitImage(t,e,s){(t=i(1e6,s,t)).setOrigin(0)}}class a{constructor(t,e,s,i,n,a,h){this.scene=t,this.text=this.scene.make.text({x:e,y:s,text:i,origin:{x:.5,y:.5},style:{fontFamily:"Arial",fontSize:a,color:h,wordWrap:{width:n,useAdvancedWrap:!0}}})}changeDisplayedText(t){this.text.setText(t)}changeTextPositios(t,e){this.text.setPosition(t,e)}getText(){return this.text}}class h{constructor(t,e,s,i,n,a){this.bgColor=16777215,this.scene=t,this.posX=e,this.posY=s,this.questions_w=i,this.questions_h=n,this.emitter=a,this.answerInfo(!1),this.createContainer(i,n)}createContainer(t,e){this.container=this.scene.add.container(0,0);const s=this.scene.add.graphics();s.fillStyle(this.bgColor,1),s.fillRoundedRect(0,0,t,e,10),this.questionText=new a(this.scene,t/2,e/2,"default",t-.1*t,38,6908265),this.container.add(s),this.container.add(this.questionText.getText()),this.container.setPosition(this.posX-this.questions_w/2,this.posY),this.emitter.on("answerInfoInQuestionContainer",this.answerInfo,this)}center(t){}getCenterX(t){return t/2-this.questions_w/2}getQuestContainer(){return this.container}setQuestionText(t){this.questionText.changeDisplayedText(t)}answerInfo(t){const e=this.posX-this.questions_w/2;this.image=t?this.scene.add.image(e,this.posY,"correct"):this.scene.add.image(e,this.posY,"wrong"),this.image.setScale(.5),this.tween=this.scene.tweens.add({targets:this.image,scale:.75,duration:800,ease:"Linear",yoyo:!0,repeat:-1,hold:800})}clearAnswerInfo(){this.image.destroy(),this.tween.stop()}}class r{constructor(t,e,s,i,n,a,h){this.bgColor=16777215,this.rightColor=1952316,this.wrongColor=13255197,this.yellow=16763904,this.selectedColor=13882323,this.borderSize=5,this.scene=t,this.index=e,this.posX=s,this.posY=i,this.answerW=n,this.answerH=a,this.emitter=h,this.createContainer(s,i,n,a)}createContainer(t,e,s,i){this.container=this.scene.add.container(0,0),this.graphics=this.scene.add.graphics(),this.graphics.fillStyle(this.bgColor,1),this.graphics.fillRoundedRect(t-s/2,e-i/2,s,i),this.answerText=new a(this.scene,t,e,"default",s-.1*s,28,6908265),this.container.add(this.graphics),this.container.add(this.answerText.getText()),this.container.setInteractive(new Phaser.Geom.Rectangle(t-s/2,e-i/2,s,i),Phaser.Geom.Rectangle.Contains),this.container.on("pointerdown",(()=>{this.emitter.emit("selectedAnswer",this,!0)}))}getAnswerContainer(){return this.container}getAnswerContainerBottom(){return this.posX+this.answerH/2}setAnswerText(t){this.answerText.changeDisplayedText(t),this.paintContainer(this.bgColor)}getAnswerIndex(){return this.index}paintContainer(t){this.graphics.fillStyle(t,1),this.graphics.fillRoundedRect(this.posX-this.answerW/2,this.posY-this.answerH/2,this.answerW,this.answerH)}setSelected(t){this.drawBorder(t),this.graphics.fillStyle(this.selectedColor,1),this.graphics.fillRoundedRect(this.posX-this.answerW/2,this.posY-this.answerH/2,this.answerW,this.answerH)}drawBorder(t){this.graphics.fillStyle(t?this.rightColor:this.wrongColor,1),this.graphics.fillRoundedRect(this.posX-this.answerW/2-this.borderSize,this.posY-this.answerH/2-this.borderSize,this.answerW+2*this.borderSize,this.answerH+2*this.borderSize)}setDefault(){this.graphics.fillStyle(this.bgColor,1),this.graphics.fillRoundedRect(this.posX-this.answerW/2,this.posY-this.answerH/2,this.answerW,this.answerH)}clearGraphics(){this.graphics.clear(),this.setDefault()}changeSignificance(t){t?this.container.setAlpha(.5):(this.container.setAlpha(1),this.clearGraphics())}}class o{constructor(t,e,s,i,n,a,h){this.answersContainers=[],this.scene=t,this.numAnswers=e,this.emitter=h,this.createContainer(s,i,n,a)}createContainer(t,e,s,i){const n=i/2;let a=e;for(let h=0;h<this.numAnswers;h++){const e=new r(this.scene,h,t,a,s,i,this.emitter);this.answersContainers.push(e),a+=i+n}}setAnswers(t){for(let e=0;e<this.numAnswers;e++)this.answersContainers[e].setAnswerText(t[e])}drawBorderOnRightAnswer(t){this.answersContainers[t].drawBorder(!0),this.answersContainers[t].setDefault()}changeAnswerAlpha(t,e,s){for(let i=0;i<this.numAnswers;i++)s?i!==e&&this.answersContainers[i].changeSignificance(s):this.answersContainers[i].changeSignificance(s)}resumeUserAnswers(t,e){for(let s=0;s<this.numAnswers;s++)s===t&&this.answersContainers[s].setSelected(t===e)}}class c{constructor(t,e,s,i,n){this.spaceButtons=40,this.scene=t,this.emitter=n,this.btnLeft=this.createBtn(s,e,this.btnLeft,!0,"left"),this.btnRight=this.createBtn(i,e,this.btnRight,!1,"right")}createBtn(t,e,s,i,n){return i?(s=this.scene.add.image(t.x-this.spaceButtons,t.y,e)).setScale(-.3):(s=this.scene.add.image(t.x+this.spaceButtons,t.y,e)).setScale(.3),s.setInteractive(),s.on("pointerdown",(()=>this.clickHandler(n))),s}clickHandler(t){this.emitter.emit("changeQuestion",t)}disableButton(t){t.setAlpha(.6),t.disableInteractive()}enableButton(t){t.setAlpha(1),t.setInteractive()}enableRightBtn(t){t?this.enableButton(this.btnRight):this.disableButton(this.btnRight)}enableLeftButton(t){t?this.enableButton(this.btnLeft):this.disableButton(this.btnLeft)}}class l{constructor(t,e,s,i,n,a,h,r){this.characterScaleValue=.6,this.globalEase="Linear",this.debug=1,this.scene=t,this.initX=e,this.finalX=s,this.centerY=i,this.gameWidth=n,this.questionContainer=a,this.questions=h,this.emitter=r,this.createCharacter(),this.createAnimations()}createCharacter(){this.characterScaleValue=.6,this.character=this.scene.add.sprite(0,0,"right"),this.character.setOrigin(0,.5).setDepth(1).setScale(this.characterScaleValue).setPosition(-this.character.width*this.characterScaleValue,this.centerY)}deleteCharacter(){this.character.destroy()}createAnimations(){this.scene.anims.create({key:"correct_answer",frames:"right",frameRate:30,repeat:-1})}playCharacterAppearAnimation(){this.character.play("correct_answer"),this.scene.tweens.add({targets:this.character,x:this.initX-this.character.width*this.characterScaleValue/4,ease:this.globalEase,duration:1e3/this.debug,onComplete:()=>this.playCharacterJustificationAnimation()})}playCharacterJustificationAnimation(){this.scene.tweens.add({targets:[this.character,this.questionContainer.getQuestContainer()],x:this.gameWidth,ease:this.globalEase,duration:1600/this.debug,onComplete:()=>this.playCharacterComeBackAnimation()})}playCharacterComeBackAnimation(){const t=this.questions[s.CURRENT_QUESTION];this.questionContainer.setQuestionText(t.justification),this.scene.tweens.add({targets:this.questionContainer.getQuestContainer(),x:this.questionContainer.getCenterX(this.gameWidth),ease:this.globalEase,duration:1e3/this.debug,onComplete:()=>{this.completedAnimation()}}),this.flipCharacter(),this.scene.tweens.add({targets:this.character,x:this.finalX+this.character.width*this.characterScaleValue/4,ease:this.globalEase,duration:1e3/this.debug})}flipCharacter(){this.character.setScale(-1*this.characterScaleValue,1*this.characterScaleValue);const t=this.character.x;this.character.setX(t+this.character.width*this.characterScaleValue)}completedAnimation(){this.character.stop(),this.emitter.emit("completedAnimation",this)}}class d{constructor(t,e,s,i){this.scene=t,this.totalQuestions=i,this.displayQuestionNumber(e,s,i)}displayQuestionNumber(t,e,n){this.container=this.scene.add.container(0,0);let h=this.scene.add.image(t,e,"question");h=i(64,64,h);const r=`${s.CURRENT_QUESTION+1}/${n}`;this.text=new a(this.scene,t+.2*h.width,e,r,100,64,"#000000");const o=h.getData("scaled_w")+this.text.getText().width;this.container.add(h),this.container.add(this.text.getText()),this.container.setX(1.2*-o)}setCurrentQuestion(t){const e=`${t+1}/${this.totalQuestions}`;this.text.changeDisplayedText(e)}}class g{constructor(t,e,s,i,n){this.endingColor=16711680,this.animClock=null,this.scene=t,this.posX=e,this.posY=s,this.width=i,this.height=n,this.createClock()}createClock(){this.clockImage=this.scene.add.image(0,0,"hourglass"),this.clockImage=i(this.width,this.height,this.clockImage),this.timeContainer=this.scene.add.container(),this.text=this.scene.add.text(0,16,"--",{fontFamily:"Arial",fontSize:64,color:"#000000",align:"center"}),this.text.setPosition(this.clockImage.getBounds().right+20,this.clockImage.y),this.text.setOrigin(0,.5),this.timeContainer.add(this.clockImage),this.timeContainer.add(this.text),this.clockImage.getBounds().left,this.text.getBounds().right,this.timeContainer.setPosition(this.posX,this.posY)}updateTime(t){8===parseInt(t)&&null===this.animClock&&this.shakeImage(),parseInt(t)<=6&&this.text.setTint(this.endingColor),this.text.setText(t)}shakeImage(){this.animClock=this.scene.tweens.add({targets:this.clockImage,duration:500,ease:"Sine.easeInOut",yoyo:!0,repeat:-1,scale:this.clockImage.getData("scaled_value")+.2*this.clockImage.getData("scaled_value")})}cancelAnims(){null!==this.animClock&&(this.animClock.stop(),this.animClock=null)}clearClock(){this.clockImage.destroy(),this.text.destroy(),this.timeContainer.destroy()}}class m extends Phaser.Scene{constructor(){super({key:"GameScene"}),this.containerW=.7,this.qContainerH=.22,this.aContainerH=.08}init(t){this.gameHeight=this.sys.canvas.height,this.gameWidth=this.sys.canvas.width,this.questions=t.questions,this.timer=t.timer,this.timeToRespQuestion=t.timeToRespQuestion,this.prefix=t.prefix,this.gameId=t.gameId,console.log(t)}create(){s.CURRENT_QUESTION=-1,this.mainEmitter=new Phaser.Events.EventEmitter,new n(this,"bg",this.gameWidth,this.gameHeight);const t=this.gameWidth*this.containerW,e=this.gameHeight*this.qContainerH,i=this.gameWidth/2,a=t/4;this.questionContainer=new h(this,i,a,t,e,this.mainEmitter),this.questionNum=new d(this,this.gameWidth,50,this.questions.length);const r=this.questionContainer.getQuestContainer().getBounds();this.answersContainer=new o(this,4,r.centerX,r.centerY+e,this.gameWidth*this.containerW,this.gameHeight*this.aContainerH,this.mainEmitter);const m=this.gameHeight-this.gameHeight*this.aContainerH,u={x:r.centerX-t/2,y:m},w={x:r.centerX+t/2,y:m};this.buttons=new c(this,"btn2",u,w,this.mainEmitter),this.mainEmitter.on("changeQuestion",this.changeQuestionHandler,this),this.buttons.enableLeftButton(!1),this.character=new l(this,r.centerX-t/2,r.centerX+t/2,r.centerY,this.gameWidth,this.questionContainer,this.questions,this.mainEmitter),this.mainEmitter.on("completedAnimation",this.completedAnimationHandler,this),this.mainEmitter.on("reviewGame",this.reviewGameHandler,this),this.timer&&(this.clock=new g(this,this.gameWidth/2,150,100,100)),this.rightAnswer=this.sound.add("right_answer"),this.wrongAnswer=this.sound.add("wrong_answer"),this.changeQuestionHandler("right")}update(){!this.timer||this.resetingClock||s.GAME_OVER||(this.currentTime=(this.timeToRespQuestion-this.timedEvent.elapsed/1e3).toFixed(0),this.clock.updateTime(`${this.currentTime}`))}onEventTimeOver(){console.log("time to respond question over"),this.wrongAnswer.play(),this.clock.cancelAnims(),this.mainEmitter.emit("selectedAnswer",null,!1)}reviewGameHandler(){s.CURRENT_QUESTION=-1,this.changeQuestionHandler("right")}changeQuestionHandler(t){if("left"===t?s.CURRENT_QUESTION--:"right"===t&&s.CURRENT_QUESTION++,this.questionNum.setCurrentQuestion(s.CURRENT_QUESTION),null==this.questions[s.CURRENT_QUESTION])return s.GAME_OVER||(this.character.deleteCharacter(),this.mainEmitter.removeListener("selectedAnswer"),s.GAME_OVER=!0,this.timer&&(this.clock.cancelAnims(),this.clock.clearClock(),this.clock.createClock())),this.buttons.enableRightBtn(!1),void this.scene.launch("GameEndScene",{width:this.gameWidth,height:this.gameHeight,emitter:this.mainEmitter,prefix:this.prefix,gameId:this.gameId});this.timer&&!s.GAME_OVER&&(this.resetingClock=!1,this.timedEvent=this.time.delayedCall(1e3*this.timeToRespQuestion,this.onEventTimeOver,[],this),this.clock.clearClock(),this.clock.createClock());var e=this.questions[s.CURRENT_QUESTION].question;this.questionContainer.setQuestionText(e),this.questionContainer.clearAnswerInfo();var i=[];if(i.push(this.questions[s.CURRENT_QUESTION].answer1),i.push(this.questions[s.CURRENT_QUESTION].answer2),i.push(this.questions[s.CURRENT_QUESTION].answer3),i.push(this.questions[s.CURRENT_QUESTION].answer4),this.answersContainer.setAnswers(i),this.answersContainer.changeAnswerAlpha(null,null,!1),s.GAME_OVER){null==this.questions[s.CURRENT_QUESTION-1]?this.buttons.enableLeftButton(!1):this.buttons.enableLeftButton(!0);null==this.questions[s.CURRENT_QUESTION+1]||this.buttons.enableRightBtn(!0);const t=s.CURRENT_QUESTION,e=s.USER_ANSWERS[t];this.answersContainer.resumeUserAnswers(e.userIndex,e.rightIndex),this.answersContainer.drawBorderOnRightAnswer(e.rightIndex),this.answersContainer.changeAnswerAlpha(e.userIndex,e.rightIndex,!0),this.mainEmitter.emit("answerInfoInQuestionContainer",e.rightIndex===e.userIndex),this.timer&&this.clock.updateTime(s.USER_TIMES[t])}else this.character.deleteCharacter(),this.mainEmitter.on("selectedAnswer",this.selectedAnswerHandler,this),this.buttons.enableRightBtn(!1),this.character.createCharacter()}selectedAnswerHandler(t,e){this.mainEmitter.removeListener("selectedAnswer"),this.timer&&(this.timedEvent.remove(),this.resetingClock=!0,s.USER_TIMES.push(this.currentTime),this.clock.cancelAnims());const i=this.questions[s.CURRENT_QUESTION];let n=-1;if(e){n=t.getAnswerIndex();const e=i.right_answer===n;t.setSelected(e),this.answersContainer.drawBorderOnRightAnswer(i.right_answer),this.answersContainer.changeAnswerAlpha(n,i.right_answer,!0),e?this.rightAnswer.play():this.wrongAnswer.play()}else this.answersContainer.drawBorderOnRightAnswer(i.right_answer),this.answersContainer.changeAnswerAlpha(null,i.right_answer,!0);this.character.playCharacterAppearAnimation();const a={userIndex:n,rightIndex:i.right_answer};s.USER_ANSWERS.push(a)}completedAnimationHandler(){this.buttons.enableRightBtn(!0);const t=s.USER_ANSWERS[s.CURRENT_QUESTION],e=t.userIndex===t.rightIndex;this.mainEmitter.emit("answerInfoInQuestionContainer",e)}}class u{constructor(t,e,s,i,n,a){this.scene=t,this.barColor=170,this.barStrokeColor=16763904,this.buildMenu(e,s,i,n,a)}buildMenu(t,e,s,i,n){this.menuRect=this.scene.add.graphics(),this.menuRect.beginPath(),this.menuRect.fillStyle(this.barStrokeColor,1),this.menuRect.fillRoundedRect(t-n/2,e-n/2,s+n,i+n,{tl:20,tr:20,bl:20,br:20}),this.menuRect.strokePath(),this.menuRect.closePath(),this.menuRect.beginPath(),this.menuRect.fillStyle(this.barColor,1),this.menuRect.fillRoundedRect(t,e,s,i,{tl:20,tr:20,bl:20,br:20}),this.menuRect.strokePath(),this.menuRect.closePath()}getMenuRect(){return this.menuRect}}class w extends Phaser.Scene{constructor(){super({key:"GameEndScene"})}init(t){this.gameWidth=t.width,this.gameHeight=t.height,this.emitter=t.emitter,this.prefix=t.prefix,this.gameId=t.gameId}create(){this.modal=this.add.rectangle(0,0,this.gameWidth,this.gameHeight,0,.95).setOrigin(0);const e=.8*this.gameWidth,i=.45*this.gameHeight,n=this.gameWidth/2-e/2,a=.015*e,h=i/5,r=1.2*h,o=2.5*h;this.menu=new u(this,n,o,e,i,a);let c=this.add.text(0,0,"Resumo do jogo",{fontFamily:"Arial",fontSize:32,color:"#ffffff",align:"center"});this.EUCircle(r,h,c,.25),this.answerInfo(this.gameWidth/2,o,.4);this.button(this.gameWidth/2,1.5*i,"Jogar novamente",32,40,(()=>{window.location.reload()}));const l=[];let d=0;for(const t of s.USER_ANSWERS)l.push({correct:t.userIndex===t.rightIndex,time_remaining:s.USER_TIMES.length?s.USER_TIMES[d]:null}),d++;t({method:"post",url:this.prefix+"/api/games/statistics-quiz",data:{gameId:this.gameId,answers:l}})}countRightAnswers(t){console.log(t);let e=0;for(let s=0;s<t.length;s++)t[s].userIndex===t[s].rightIndex&&e++;return{right:e,wrong:Math.abs(e-t.length)}}answerInfo(t,e,i){const n=this.add.image(t,e,"wrong"),h=this.add.image(t,e,"correct"),r=h.width*i*1.5,o=h.height*i+e;n.setScale(i).setPosition(t-r,o),h.setScale(i).setPosition(t+r,o);const c=this.countRightAnswers(s.USER_ANSWERS);new a(this,t-r,n.getBounds().bottom+1.2*n.getBounds().height,`${c.wrong}`,n.width,82,"#ffffff");const l=new a(this,t+r,n.getBounds().bottom+1.2*n.getBounds().height,`${c.right}`,n.width,82,"#ffffff");this.button(this.gameWidth/2,l.getText().getBounds().bottom+l.getText().getBounds().height,"Rever respostas dadas",32,20,(()=>{this.emitter.emit("reviewGame"),this.scene.stop("GameEndScene")}))}button(t,e,s,i,n,h){this.btn=this.add.graphics(),this.btn.fillStyle(16763904,1);const r=new a(this,t,e,s,1e3,i,"#0000aa").getText().getBounds(),o=r.left-n,c=r.top-n,l=r.width+2*n,d=r.height+2*n;this.btn.fillRoundedRect(o,c,l,d,n);const g=new Phaser.Geom.Rectangle(o,c,l,d);this.btn.setInteractive(g,Phaser.Geom.Rectangle.Contains),this.btn.on("pointerdown",h)}EUCircle(t,e,s,i){var n=new Phaser.Geom.Circle(this.gameWidth/2,t,e);s.setPosition(this.gameWidth/2,t).setOrigin(.5);var a=n.getPoints(12);let h=0;for(var r=0;r<a.length;r++){var o=a[r];h>a.length-2?h=0:h++;let t=this.add.image(o.x,o.y,"star").setScale(.1).setTint(16763904);this.tweens.add({targets:t,scaleX:i/2,scaleY:i/1.8,ease:"Sine.easeInOut",duration:1e3,repeat:-1,yoyo:!0})}}}const p={type:Phaser.AUTO,parent:"game",backgroundColor:2772329,scale:{width:1200,height:1600,mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},fps:{target:50,forceSetTimeOut:!0},scene:[e,m,w]};class C extends Phaser.Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new C(p)}));