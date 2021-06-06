import{a as t}from"./vendor.daadd3da.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(s){const i=new URL(t,location),a=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((s,h)=>{const r=new URL(t,i);if(self[e].moduleMap[r])return s(self[e].moduleMap[r]);const d=new Blob([`import * as m from '${r}';`,`${e}.moduleMap['${r}']=m;`],{type:"text/javascript"}),n=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(d),onerror(){h(new Error(`Failed to import: ${t}`)),a(n)},onload(){s(self[e].moduleMap[r]),a(n)}});document.head.appendChild(n)})),self[e].moduleMap={}}}("/assets/");class e extends Phaser.Scene{constructor(){super({key:"BootScene"}),this.timeCardIsVisible=800,this.imagesArr=[],this.totalImagesArr=[3,6,8,10]}init(){const t=window.location.search,e=new URLSearchParams(t);this.gameId=e.get("id")}async preload(){this.load.script("webfont","https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js");const e="/api/games/game/"+this.gameId;await t.get(e).then((t=>{console.log(t.data);const e=t.data.config;this.timer=e.timer,this.timeToComplete=e.time_to_complete,this.maxAttempts=e.max_attempts,this.destroyCard=e.destroy_card,this.totalCards=this.totalImagesArr[e.total_images];const s=t.data.assets,i=s.back_card;this.load.on("complete",(()=>this.createCustom())),this.load.image(i.id,""+i.path+i.server_path),this.backCardId=i.id;for(let a=0;a<this.totalCards;a++){const t=s.front_cards[a].pair;this.load.image(t.id,""+t.path+t.server_path),this.imagesArr.push(t.id)}this.load.image("bg","assets/images/bg2.jpg"),this.load.image("hourglass","assets/images/hourglass.png"),this.load.image("star","assets/images/star.png"),this.load.audio("right_guess","./assets/sounds/right_guess.mp3"),this.load.audio("finish_game","./assets/sounds/finish_game.mp3"),this.load.audio("game_over","./assets/sounds/game_over.mp3"),this.load.start()})).catch((function(t){console.log(t)}))}createCustom(){this.scene.start("GameScene",{totalCards:this.totalCards,destroyCard:this.destroyCard,timeCardIsVisible:this.timeCardIsVisible,timer:this.timer,timeToComplete:this.timeToComplete,maxAttempts:this.maxAttempts,imagesArr:this.imagesArr,backCardId:this.backCardId})}}let s={TOTAL:0,CURRENT:0,ATTEMPTS:0,MAX_ATTEMPTS:0,TIME:0,GAME_OVER:!1};class i{constructor(t,e,s,i,a,h){this.flipSpeed=200,this.flipZoom=1.1,this.cardIsBack=!0,this.scene=t,this.cardW=e,this.cardH=s,this.cardImgRef=i,this.cardFrontTexture=a,this.cardBackTexture=h,this.buildCard()}buildCard(){this.cardBack=this.scene.add.image(0,0,this.cardBackTexture).setOrigin(0).setVisible(!1);let t=this.scene.add.image(0,0,this.cardFrontTexture).setOrigin(0).setVisible(!1);this.scaleX_Back=this.cardW/this.cardBack.width,this.scaleY_Back=this.cardH/this.cardBack.height;let e=this.cardW/t.width,s=this.cardH/t.height;this.cardBack.setScale(this.scaleX_Back,this.scaleY_Back),t.setScale(e,s);let i=this.scene.make.renderTexture({width:this.cardW,height:this.cardH},!1);i.draw(this.cardBack,0,0).saveTexture("card_back"),i=this.scene.make.renderTexture({width:this.cardW,height:this.cardH},!1),i.draw(t,0,0).saveTexture("card_front_"+this.cardFrontTexture)}placeCard(t,e){let s=this.scaleX_Back*this.cardBack.width/2,i=this.scaleX_Back*this.cardBack.height/2;this.cardBack=this.scene.add.image(t+s,e+i,"card_back").setInteractive()}flipCard(){this.cardBack.disableInteractive(),this.cardIsBack=!this.cardIsBack,this.flipTween=this.scene.tweens.add({targets:this.cardBack,scaleY:this.flipZoom,scaleX:.1,duration:this.flipSpeed,ease:"Power1",yoyo:!0,onComplete:()=>this.onCompleteHandler(this.cardBack),onYoyo:()=>this.onCardComeBack(this.cardBack)})}onCardComeBack(t){this.cardIsBack?t.setTexture("card_back"):t.setTexture("card_front_"+this.cardFrontTexture)}onCompleteHandler(t){this.cardBack.setInteractive()}newCardPosition(t,e){this.cardX=t,this.cardY=e}getCard(){return this.cardBack}getCardImgRef(){return this.cardImgRef}getCardIsBack(){return this.cardIsBack}}class a{constructor(t,e,s){this.gapInBetween=50,this.gapSide=150,this.scene=t,this.boardW=e-2*this.gapSide,this.boardH=s-2*this.gapSide}doGridCalculations(t,e){this.numCardsW=t,this.numCardsH=e;return{width:this.boardW/t-this.gapInBetween,height:this.boardH/e-this.gapInBetween}}createGrid(t,e,s){this.container=this.scene.add.container();let i=0;for(let a=0;a<this.numCardsH;a++)for(let h=0;h<this.numCardsW;h++){const r=h*(e+this.gapInBetween)+this.gapSide+this.gapInBetween/2,d=a*(s+this.gapInBetween)+this.gapSide;t[i].placeCard(r,d),this.container.add(t[i].getCard()),i++}console.log(s/2),console.log(t)}getGridBounds(){return this.container.getBounds()}setGridPosition(t,e){this.container.setPosition(t,e)}}const h=(t,e,s)=>{let i=1,a=1;i=t/s.width,a=e/s.height;let h=Math.min(Number(i.toFixed(3)),Number(a.toFixed(3)));return s.setScale(h),s.setData("scaled_value",h),s.setData("scaled_w",Math.floor(s.width*h)),s.setData("scaled_h",Math.floor(s.height*h)),s};class r{constructor(t,e,s,i){this.scene=t,this.backgroundImage=this.scene.add.image(0,0,e),this.backgroundImage=this.fitImage(this.backgroundImage,s,i)}fitImage(t,e,s){return(t=h(1.3*e,s,t)).setOrigin(.5),t.getBounds(),t.setPosition(e/2,s/2),t}setAlpha(t){this.backgroundImage.setAlpha(t)}}class d{constructor(t,e,s){this.endingColor=16711680,this.scene=t,this.clockImage=this.scene.add.image(0,0,"hourglass"),this.clockImage=h(e,s,this.clockImage),this.timeContainer=this.scene.add.container(),this.text=this.scene.add.text(0,16,"100",{fontFamily:"Arial",fontSize:64,color:"#ffffff",align:"center"}),this.text.setPosition(this.clockImage.getBounds().right+20,this.clockImage.y),this.text.setOrigin(0,.5),this.timeContainer.add(this.clockImage),this.timeContainer.add(this.text);const i=this.clockImage.getBounds().left+this.text.getBounds().right;this.timeContainer.setPosition(e/2-i/2,s)}updateTime(t){12===parseInt(t)&&this.shakeImage(),parseInt(t)<=10&&this.text.setTint(this.endingColor),this.text.setText(t)}shakeImage(){this.scene.tweens.add({targets:this.clockImage,duration:500,ease:"Sine.easeInOut",yoyo:!0,repeat:-1,scale:this.clockImage.getData("scaled_value")+.2*this.clockImage.getData("scaled_value")})}cancelAnims(){this.scene.tweens.destroy()}}class n extends Phaser.Scene{constructor(){super({key:"GameScene"}),this.cards=[],this.flippedCardsIndex=[],this.matches=0}init(t){switch(this.gameHeight=this.sys.canvas.height,this.gameWidth=this.sys.canvas.width,this.totalCards=t.totalCards,this.destroyCard=t.destroyCard,this.timeCardIsVisible=t.timeCardIsVisible,this.imagesArr=t.imagesArr,this.timer=t.timer,this.timeToComplete=t.timeToComplete,this.maxAttempts=t.maxAttempts,this.backCardId=t.backCardId,this.imagesArr.length){case 3:this.numCardsHorizontal=3,this.numCardsVertical=2;break;case 6:this.numCardsHorizontal=4,this.numCardsVertical=3;break;case 8:this.numCardsHorizontal=4,this.numCardsVertical=4;break;case 10:this.numCardsHorizontal=5,this.numCardsVertical=4}}create(){new r(this,"bg",this.gameWidth,this.gameHeight).setAlpha(.5),this.grid=new a(this,this.gameWidth,this.gameHeight);const{width:t,height:e}=this.grid.doGridCalculations(this.numCardsHorizontal,this.numCardsVertical),h=[];this.imagesArr.forEach(((t,e)=>{h.push(e),h.push(e)})),(t=>{for(var e,s,i=t.length;0!==i;)s=Math.floor(Math.random()*i),e=t[i-=1],t[i]=t[s],t[s]=e;return t})(h).forEach(((s,a)=>this.cards.push(new i(this,t,e,s,this.imagesArr[s],this.backCardId)))),this.grid.createGrid(this.cards,t,e),console.log(this.grid.getGridBounds());const n=this.grid.getGridBounds().bottom-this.grid.getGridBounds().top;let o=2;6===this.totalCards&&(o=1.8),8===this.totalCards&&(o=1.7),10===this.totalCards&&(o=1.8),this.grid.setGridPosition(0,this.gameHeight/2-n/o),this.input.on("gameobjectdown",this.cardDown,this),s.TOTAL=this.imagesArr.length;let c="";this.timer?(s.TIME=this.timeToComplete,c=`${s.TIME}`,this.timedEvent=this.time.delayedCall(1e3*this.timeToComplete,this.onEventTimeOver,[],this),this.clock=new d(this,this.gameWidth,.1*this.gameHeight),this.clock.updateTime(c)):(this.maxAttempts>0?(this.displayText="Tentativas restantes para acabar o jogo\n",s.MAX_ATTEMPTS=this.maxAttempts,c=`${this.displayText}${s.MAX_ATTEMPTS}`):(this.displayText="Tentativas\n",c=`${this.displayText}${s.ATTEMPTS}`),this.text=this.add.text(0,16,c,{fontFamily:"Arial",fontSize:32,color:"#ffffff",align:"center"}),this.text.setPosition(this.gameWidth/2-this.text.width/2,this.text.height/2)),this.right_guess=this.sound.add("right_guess"),this.finish_game=this.sound.add("finish_game"),this.game_over=this.sound.add("game_over")}update(){this.timer&&!s.GAME_OVER&&this.clock.updateTime(`${(this.timeToComplete-this.timedEvent.elapsed/1e3).toFixed(0)}`)}onEventTimeOver(){console.log("time over"),s.GAME_OVER=!0,this.clock.cancelAnims(),this.game_over.play(),this.scene.launch("GameEndScene",{width:this.gameWidth,height:this.gameHeight,win:!1})}cardDown(t,e,i){const a=this.cards.find((t=>t.getCard()===e));if(a&&this.flippedCardsIndex.length<2&&a.getCardIsBack()&&!s.GAME_OVER){a.flipCard();const t=this.cards.findIndex((t=>t.getCard()===e)),s=a.getCardImgRef();this.flippedCardsIndex.push({index:t,imageRef:s}),2===this.flippedCardsIndex.length&&this.time.delayedCall(this.timeCardIsVisible,this.checkPairMatch,[],this)}}checkPairMatch(){const t=this.flippedCardsIndex[0],e=this.flippedCardsIndex[1];(null==t?void 0:t.imageRef)===(null==e?void 0:e.imageRef)?(console.log("match!!"),this.flippedCardsIndex.forEach((t=>{this.destroyCard?this.cards[t.index].getCard().setVisible(!1):this.cards[t.index].getCard().disableInteractive()})),this.matches++,this.matches===this.imagesArr.length?(this.finish_game.play(),s.GAME_OVER=!0,this.timer&&this.clock.cancelAnims(),this.scene.launch("GameEndScene",{width:this.gameWidth,height:this.gameHeight,win:!0})):this.right_guess.play()):(console.log("try again"),this.flippedCardsIndex.forEach((t=>{this.cards[t.index].flipCard()}))),this.timer||(this.maxAttempts>0?(s.MAX_ATTEMPTS--,this.text.setText(`${this.displayText}${s.MAX_ATTEMPTS}`),0===s.MAX_ATTEMPTS&&(s.GAME_OVER=!0)):(s.ATTEMPTS++,this.text.setText(`${this.displayText}${s.ATTEMPTS}`))),this.flippedCardsIndex=[]}}class o{constructor(t,e,s,i,a,h){this.scene=t,this.barColor=170,this.barStrokeColor=16763904,this.buildMenu(e,s,i,a,h)}buildMenu(t,e,s,i,a){this.menuRect=this.scene.add.graphics(),this.menuRect.beginPath(),this.menuRect.fillStyle(this.barStrokeColor,1),this.menuRect.fillRoundedRect(t-a/2,e-a/2,s+a,i+a,{tl:20,tr:20,bl:20,br:20}),this.menuRect.strokePath(),this.menuRect.closePath(),this.menuRect.beginPath(),this.menuRect.fillStyle(this.barColor,1),this.menuRect.fillRoundedRect(t,e,s,i,{tl:20,tr:20,bl:20,br:20}),this.menuRect.strokePath(),this.menuRect.closePath()}getMenuRect(){return this.menuRect}}class c extends Phaser.Scene{constructor(){super({key:"GameEndScene"})}init(t){this.gameWidth=t.width,this.gameHeight=t.height,this.win=t.win}create(){this.modal=this.add.rectangle(0,0,this.gameWidth,this.gameHeight,0,.6).setOrigin(0);const t=.5*this.gameWidth,e=.5*this.gameHeight,s=this.gameWidth/2-t/2,i=this.gameHeight/2-e/2,a=.015*t;this.menu=new o(this,s,i,t,e,a);let h="";h=this.win?"Parabéns, ganhaste!":"Não conseguiste, tenta outra vez!";let r=this.add.text(0,0,h,{fontFamily:"Arial",fontSize:32,color:"#ffffff",align:"center"});r.setPosition(this.gameWidth/2,i+2*r.height).setOrigin(.5);var d=new Phaser.Geom.Circle(this.gameWidth/2,i+e/2.2,(e-i)/2.1).getPoints(12);let n=0;for(var c=0;c<d.length;c++){var l=d[c];n>d.length-2?n=0:n++;let t=this.add.image(l.x,l.y,"star").setScale(.1).setTint(16763904);this.tweens.add({targets:t,scaleX:.15625,scaleY:.15625,ease:"Sine.easeInOut",duration:1e3,repeat:-1,yoyo:!0})}this.btn=this.add.graphics(),this.btn.fillStyle(16776960,1);const m=t/2,g=e/8,u=this.gameWidth/2-t/4,p=i+.8*e;this.btn.fillRoundedRect(u,p,m,g,24),this.add.text(0,0,"Jogar novamente",{fontFamily:"Arial",fontSize:32,color:"#0000aa",align:"center"}).setPosition(this.gameWidth/2,p+r.height).setOrigin(.5);var C=new Phaser.Geom.Rectangle(u,p,m,g);this.btn.setInteractive(C,Phaser.Geom.Rectangle.Contains),this.btn.on("pointerdown",(()=>{window.location.reload()}))}}const l={type:Phaser.AUTO,parent:"game",backgroundColor:2772329,scale:{width:1600,height:1200,mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},fps:{target:30,forceSetTimeOut:!0},scene:[e,n,c]};class m extends Phaser.Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new m(l)}));