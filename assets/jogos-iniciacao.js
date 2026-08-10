const lang=new URLSearchParams(location.search).get('lang')==='es'?'es':'pt';
const gameId=document.body.dataset.game;
const content={
  apresentar:{
    pt:{title:'Apresentar-se',subtitle:'Completa frases muito simples para dizer o teu nome e conhecer outra pessoa.',questions:[
      ['Olá, eu <span class="blank">_____</span> Lía.','Completa a apresentação.',['chamo-me','lindo','adeus'],0,'Eu chamo-me Lía é uma forma simples de dizer o nome.'],
      ['Eu <span class="blank">_____</span> o Mateo.','Completa a frase.',['sou','és','chamas'],0,'Eu sou o Mateo é outra forma de te apresentares.'],
      ['Como te <span class="blank">_____</span>?','Pergunta o nome da outra pessoa.',['chamas','sou','olá'],0,'Como te chamas? pergunta o nome de alguém.'],
      ['Prazer em <span class="blank">_____</span>.','Completa a expressão.',['conhecer-te','adeus','bom dia'],0,'Prazer em conhecer-te usa-se quando conhecemos alguém.'],
      ['O meu <span class="blank">_____</span> é Ana.','Completa a frase.',['nome','sou','olá'],0,'O meu nome é Ana é uma forma clara de apresentação.']
    ]},
    es:{title:'Presentarse',subtitle:'Completa frases muy sencillas para decir tu nombre y conocer a otra persona.',questions:[
      ['<span class="blank">_____</span> Yo soy Mateo.','Elige la primera palabra de la conversación.',['Hola.','Adiós.'],0,'Hola sirve para empezar la conversación.'],
      ['Hola, me <span class="blank">_____</span> Lía.','Completa la presentación.',['llamo','adiós','bien'],0,'Me llamo Lía es una forma sencilla de decir el nombre.'],
      ['¿Cómo te <span class="blank">_____</span>?','Pregunta el nombre de la otra persona.',['llamas','soy','hola'],0,'¿Cómo te llamas? sirve para preguntar el nombre.'],
      ['Yo <span class="blank">_____</span> Pablo.','Completa la frase.',['soy','eres','llamas'],0,'Yo soy Pablo es otra forma de presentarse.'],
      ['Mucho <span class="blank">_____</span>.','¿Qué decimos al conocer a alguien?',['gusto','nombre','adiós'],0,'Mucho gusto se utiliza al conocer a alguien.']
    ]}
  },
  cumprimentos:{
    pt:{title:'Cumprimentos',subtitle:'Aprende a cumprimentar e a despedir-te em diferentes momentos do dia.',questions:[
      ['<span class="blank">_____</span>, Rui!','Encontras um amigo. O que dizes?',['Olá!','Adeus!','Boa noite'],0,'Olá é uma saudação simples e informal.'],
      ['São 9:00. <span class="blank">_____</span>.','Escolhe a saudação adequada.',['Bom dia','Boa noite','Adeus'],0,'Bom dia usa-se durante a manhã.'],
      ['São 16:00. <span class="blank">_____</span>.','Escolhe a saudação adequada.',['Boa tarde','Bom dia','Até amanhã'],0,'Boa tarde usa-se durante a tarde.'],
      ['Vais dormir. <span class="blank">_____</span>.','O que dizes?',['Boa noite','Bom dia','Olá'],0,'Boa noite usa-se à noite e antes de dormir.'],
      ['Vemo-nos depois. <span class="blank">_____</span>.','Escolhe uma despedida.',['Até logo','Olá','Bom dia'],0,'Até logo usa-se quando esperamos voltar a ver a pessoa.'],
      ['Vemo-nos amanhã. <span class="blank">_____</span>.','Escolhe a expressão certa.',['Até amanhã','Boa tarde','Muito prazer'],0,'Até amanhã indica que voltaremos a ver-nos no dia seguinte.']
    ]},
    es:{title:'Saludos',subtitle:'Aprende a saludar y despedirte en distintos momentos del día.',questions:[
      ['<span class="blank">_____</span>, Ana!','Te encuentras con una amiga. ¿Qué dices?',['¡Hola!','¡Adiós!','Buenas noches'],0,'¡Hola! es un saludo sencillo e informal.'],
      ['Son las 9:00. <span class="blank">_____</span>.','Elige el saludo adecuado.',['Buenos días','Buenas noches','Adiós'],0,'Buenos días se utiliza por la mañana.'],
      ['Son las 17:00. <span class="blank">_____</span>.','Elige el saludo adecuado.',['Buenas tardes','Buenos días','Hasta mañana'],0,'Buenas tardes se utiliza durante la tarde.'],
      ['Te vas a dormir. <span class="blank">_____</span>.','¿Qué dices?',['Buenas noches','Buenos días','Hola'],0,'Buenas noches se utiliza por la noche y antes de dormir.'],
      ['Nos vemos después. <span class="blank">_____</span>.','Elige una despedida.',['Hasta luego','Buenas tardes','Mucho gusto'],0,'Hasta luego se usa cuando esperamos volver a ver a la persona.'],
      ['Nos vemos mañana. <span class="blank">_____</span>.','Elige la expresión correcta.',['Hasta mañana','Buenas tardes','Mucho gusto'],0,'Hasta mañana indica que volveremos a vernos al día siguiente.']
    ]}
  }
};
const ui=lang==='es'?{eyebrow:'Juego A1 · Español',choose:'Elige una respuesta.',good:'¡Muy bien!',learn:'Vamos a aprender.',next:'Continuar →',result:'¡Juego terminado!',retry:'Jugar de nuevo',back:'Otros juegos en español',backUrl:'jogos-a1-espanhol.html',points:'puntos'}:{eyebrow:'Jogo A1 · Português',choose:'Escolhe uma resposta.',good:'Muito bem!',learn:'Vamos aprender!',next:'Continuar →',result:'Jogo concluído!',retry:'Jogar novamente',back:'Outros jogos em português',backUrl:'jogos-a1-portugues.html',points:'pontos'};
const game=content[gameId][lang],questions=[...game.questions].sort(()=>Math.random()-.5);let index=0,score=0,answered=false;
document.documentElement.lang=lang==='es'?'es':'pt-PT';document.querySelector('.page-title').textContent=game.title;document.querySelector('.page-subtitle').textContent=game.subtitle;document.querySelector('.page-hero .eyebrow').textContent=ui.eyebrow;document.querySelector('.page-translation')?.remove();document.querySelector('.level-picker')?.remove();document.querySelectorAll('.progress-step').forEach((step,i)=>{if(i>0)step.remove()});
const panel=document.querySelector('#game-panel'),total=document.querySelector('#total-score');
function shuffle(items){return [...items].sort(()=>Math.random()-.5)}
function render(){const [sentence,prompt,answers,correct,note]=questions[index],options=shuffle(answers.map((text,i)=>({text,correct:i===correct})));panel.innerHTML=`<p class="question-count">${index+1} / ${questions.length}</p><h2 class="question-word beginner-dialogue">${sentence}</h2><p class="question-prompt">${prompt}</p><div class="answer-grid">${options.map(o=>`<button class="answer-button" data-correct="${o.correct}">${o.text}</button>`).join('')}</div><div class="feedback">${ui.choose}</div><div class="game-next"><button class="game-button" hidden>${ui.next}</button></div>`;panel.querySelectorAll('.answer-button').forEach(b=>b.onclick=()=>answer(b,note));panel.querySelector('.game-button').onclick=next}
function answer(button,note){if(answered)return;answered=true;const ok=button.dataset.correct==='true';panel.querySelectorAll('.answer-button').forEach(b=>{b.disabled=true;if(b.dataset.correct==='true')b.classList.add('correct')});if(!ok)button.classList.add('wrong');if(ok){score++;total.textContent=`${score*10} ${ui.points}`}panel.querySelector('.feedback').innerHTML=`<strong>${ok?ui.good:ui.learn}</strong> ${note}`;panel.querySelector('.game-button').hidden=false}
function next(){index++;answered=false;index<questions.length?render():finish()}
function finish(){panel.innerHTML=`<div class="result"><div class="result-badge">${score}/${questions.length}</div><h2>${ui.result}</h2><div class="result-actions"><button class="game-button" id="retry">${ui.retry}</button><a class="button button-secondary" href="${ui.backUrl}">${ui.back}</a></div></div>`;panel.querySelector('#retry').onclick=()=>location.reload()}
render();
