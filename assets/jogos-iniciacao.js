const games = {
  apresentar: {
    storage: 'raia-apresentar-unlocked',
    finish: 'Já sabes apresentar-te nas duas línguas!',
    levels: [
      {name:'Em espanhol',pass:4,questions:[
        {word:'<span class="blank">_____</span> Yo soy Mateo.',prompt:'Escolhe a primeira palavra da conversa.',answers:['Hola.','Adiós.'],correct:0,note:'Hola significa Olá e serve para começar a conversa.'},
        {word:'Hola, me <span class="blank">_____</span> Lía.',prompt:'Completa a apresentação.',answers:['llamo','adiós','bien'],correct:0,note:'Me llamo Lía significa Chamo-me Lía.'},
        {word:'¿Cómo te <span class="blank">_____</span>?',prompt:'Pergunta o nome da outra pessoa.',answers:['llamas','soy','hola'],correct:0,note:'¿Cómo te llamas? significa Como te chamas?'},
        {word:'Yo <span class="blank">_____</span> Pablo.',prompt:'Completa a frase.',answers:['soy','eres','llamas'],correct:0,note:'Yo soy Pablo significa Eu sou o Pablo.'},
        {word:'Mucho <span class="blank">_____</span>.',prompt:'O que dizemos quando conhecemos alguém?',answers:['gusto','nombre','adiós'],correct:0,note:'Mucho gusto significa Muito prazer.'}
      ]},
      {name:'Em português',pass:4,questions:[
        {word:'Olá, eu <span class="blank">_____</span> Lía.',prompt:'Completa a apresentação.',answers:['chamo-me','lindo','adeus'],correct:0,note:'Eu chamo-me Lía é uma forma simples de dizer o nome.'},
        {word:'Eu <span class="blank">_____</span> o Mateo.',prompt:'Completa a frase.',answers:['sou','és','chamas'],correct:0,note:'Eu sou o Mateo é outra forma de te apresentares.'},
        {word:'Como te <span class="blank">_____</span>?',prompt:'Pergunta o nome da outra pessoa.',answers:['chamas','sou','olá'],correct:0,note:'Como te chamas? pergunta o nome de alguém.'},
        {word:'Prazer em <span class="blank">_____</span>.',prompt:'Completa a expressão.',answers:['conhecer-te','adeus','bom dia'],correct:0,note:'Prazer em conhecer-te usa-se quando conhecemos alguém.'},
        {word:'O meu <span class="blank">_____</span> é Ana.',prompt:'Completa a frase.',answers:['nome','sou','olá'],correct:0,note:'O meu nome é Ana é uma forma clara de apresentação.'}
      ]}
    ]
  },
  cumprimentos: {
    storage: 'raia-cumprimentos-unlocked',
    finish: 'Já sabes cumprimentar e despedir-te!',
    levels: [
      {name:'Em espanhol',pass:5,questions:[
        {word:'<span class="blank">_____</span>, Ana!',prompt:'Encontras uma amiga. O que dizes?',answers:['¡Hola!','¡Adiós!','Buenas noches'],correct:0,note:'¡Hola! é a saudação mais simples e pode usar-se a qualquer hora.'},
        {word:'São 9:00. <span class="blank">_____</span>.',prompt:'Escolhe a saudação adequada.',answers:['Buenos días','Buenas noches','Adiós'],correct:0,note:'Buenos días usa-se de manhã.'},
        {word:'São 17:00. <span class="blank">_____</span>.',prompt:'Escolhe a saudação adequada.',answers:['Buenas tardes','Buenos días','Hasta mañana'],correct:0,note:'Buenas tardes usa-se durante a tarde.'},
        {word:'Vais dormir. <span class="blank">_____</span>.',prompt:'O que dizes?',answers:['Buenas noches','Buenos días','Hola'],correct:0,note:'Buenas noches usa-se à noite e antes de dormir.'},
        {word:'Vou-me embora. <span class="blank">_____</span>.',prompt:'Escolhe uma despedida.',answers:['Adiós','Hola','Buenos días'],correct:0,note:'Adiós significa Adeus.'},
        {word:'Vemo-nos depois. <span class="blank">_____</span>.',prompt:'Escolhe uma despedida.',answers:['Hasta luego','Buenas tardes','Mucho gusto'],correct:0,note:'Hasta luego significa Até logo.'}
      ]},
      {name:'Em português',pass:5,questions:[
        {word:'<span class="blank">_____</span>, Rui!',prompt:'Encontras um amigo. O que dizes?',answers:['Olá!','Adeus!','Boa noite'],correct:0,note:'Olá é uma saudação simples e informal.'},
        {word:'São 9:00. <span class="blank">_____</span>.',prompt:'Escolhe a saudação adequada.',answers:['Bom dia','Boa noite','Adeus'],correct:0,note:'Bom dia usa-se durante a manhã.'},
        {word:'São 16:00. <span class="blank">_____</span>.',prompt:'Escolhe a saudação adequada.',answers:['Boa tarde','Bom dia','Até amanhã'],correct:0,note:'Boa tarde usa-se durante a tarde.'},
        {word:'Vais dormir. <span class="blank">_____</span>.',prompt:'O que dizes?',answers:['Boa noite','Bom dia','Olá'],correct:0,note:'Boa noite usa-se à noite e antes de dormir.'},
        {word:'Vemo-nos depois. <span class="blank">_____</span>.',prompt:'Escolhe uma despedida.',answers:['Até logo','Olá','Bom dia'],correct:0,note:'Até logo usa-se quando esperamos voltar a ver a pessoa.'},
        {word:'Vemo-nos amanhã. <span class="blank">_____</span>.',prompt:'Escolhe a expressão certa.',answers:['Até amanhã','Boa tarde','Muito prazer'],correct:0,note:'Até amanhã significa que voltaremos a ver-nos no dia seguinte.'}
      ]}
    ]
  }
};
const game = games[document.body.dataset.game];
const levels = game.levels;
let unlocked = Math.min(Number(localStorage.getItem(game.storage) || 1),levels.length);
let currentLevel = 0, questionIndex = 0, levelScore = 0, totalScore = 0, answered = false;
const panel = document.querySelector('#game-panel'), picker = document.querySelector('#level-picker'), total = document.querySelector('#total-score');
function renderPicker(){picker.innerHTML=levels.map((level,i)=>`<button class="level-button ${i===currentLevel?'active':''} ${i+1>unlocked?'locked':''}" data-level="${i}" ${i+1>unlocked?'disabled':''}>Nível ${i+1}<small>${i+1>unlocked?'🔒 Bloqueado':level.name}</small></button>`).join('');picker.querySelectorAll('[data-level]').forEach(button=>button.addEventListener('click',()=>startLevel(Number(button.dataset.level))));updateProgress()}
function updateProgress(){document.querySelectorAll('.progress-step').forEach((step,i)=>{step.className='progress-step'+(i<currentLevel?' complete':i===currentLevel?' active':'')})}
function startLevel(i){if(i+1>unlocked)return;currentLevel=i;questionIndex=0;levelScore=0;answered=false;renderPicker();renderQuestion()}
function shuffledAnswers(question){return question.answers.map((text,i)=>({text,correct:i===question.correct})).sort(()=>Math.random()-.5)}
function renderQuestion(){const level=levels[currentLevel],question=level.questions[questionIndex],answers=shuffledAnswers(question);panel.innerHTML=`<p class="question-count">Nível ${currentLevel+1} · Pergunta ${questionIndex+1} de ${level.questions.length}</p><h2 class="question-word beginner-dialogue">${question.word}</h2><p class="question-prompt">${question.prompt}</p><div class="answer-grid">${answers.map(answer=>`<button class="answer-button" data-correct="${answer.correct}">${answer.text}</button>`).join('')}</div><div class="feedback">Escolhe uma resposta.</div><div class="game-next"><button class="game-button" id="next-question" hidden>Continuar →</button></div>`;panel.querySelectorAll('.answer-button').forEach(button=>button.addEventListener('click',()=>answer(button,question)));panel.querySelector('#next-question').addEventListener('click',nextQuestion)}
function answer(button,question){if(answered)return;answered=true;const correct=button.dataset.correct==='true';panel.querySelectorAll('.answer-button').forEach(item=>{item.disabled=true;if(item.dataset.correct==='true')item.classList.add('correct')});if(!correct)button.classList.add('wrong');if(correct){levelScore++;totalScore+=10;total.textContent=`${totalScore} pontos`}panel.querySelector('.feedback').innerHTML=`<strong>${correct?'Muito bem!':'Vamos aprender!'}</strong> ${question.note}`;panel.querySelector('#next-question').hidden=false}
function nextQuestion(){questionIndex++;answered=false;if(questionIndex<levels[currentLevel].questions.length)renderQuestion();else renderResult()}
function renderResult(){const level=levels[currentLevel],passed=levelScore>=level.pass;if(passed&&currentLevel<levels.length-1){unlocked=Math.max(unlocked,currentLevel+2);localStorage.setItem(game.storage,unlocked)}renderPicker();panel.innerHTML=`<div class="result"><div class="result-badge">${levelScore}/${level.questions.length}</div><h2>${passed?'Muito bem!':'Vamos tentar outra vez'}</h2><p>${passed?(currentLevel<levels.length-1?'Desbloqueaste o segundo nível!':game.finish):`Precisas de ${level.pass} respostas certas. Lê as explicações e tenta novamente.`}</p><div class="result-actions"><button class="game-button" id="retry">Jogar novamente</button>${passed&&currentLevel<levels.length-1?'<button class="game-button" id="advance">Nível seguinte →</button>':''}<a class="button button-secondary" href="jogos-a1.html">Outros jogos A1</a></div></div>`;panel.querySelector('#retry').addEventListener('click',()=>startLevel(currentLevel));const advance=panel.querySelector('#advance');if(advance)advance.addEventListener('click',()=>startLevel(currentLevel+1))}
renderPicker();renderQuestion();
