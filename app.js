/* =========================================================================
   MONK MODE · Rutina (versión amiga)
   App de una sola página, sin dependencias. Todo se guarda en localStorage.
   Prefijo de claves: mm_a_  (a = Anderson) para no chocar con otras versiones.
   ========================================================================= */

/* ---------- 1. ESQUEMA PROGRESIVO POR SEMANA ---------- */
const WEEKS = {
  1: { nivel:'Inicial',    series:'3×15', descanso:'1 min',      iso:30 },
  2: { nivel:'Intermedio', series:'3×12', descanso:'1:30 min',   iso:40 },
  3: { nivel:'Avanzado',   series:'4×10', descanso:'2–2:30 min', iso:60 },
  4: { nivel:'Pro',        series:'4×8',  descanso:'2–3 min',    iso:90 },
};

/* ---------- 2. LA RUTINA ----------
   Cada día tiene "grupos". Un grupo puede ser:
   - type:'set'     → un ejercicio principal de fuerza (main) + opcionales
                      cronometrados en biserie (supers, 30/10).
   - type:'circuit' → un circuito HIIT/Core: lista de ejercicios de 30 s.
   Marca iso:true en los ejercicios isométricos (tiempo escalado por semana).   */
const ROUTINE = [
  {
    id:'D1', title:'DÍA 1', focus:'Piernas + HIIT',
    home:[
      { type:'set', label:'Ej 1', main:{id:'A101', name:'Sentadilla goblet con mancuerna'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A102', name:'Sentadilla búlgara con mancuernas (pie atrás en escalón)'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A103', name:'Peso muerto rumano con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A104', name:'Step-up con mancuernas (escalón/escalera)'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A105', name:'Hip thrust con mancuerna (espalda alta en sofá)'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A106', name:'Zancadas caminando con mancuernas'}, supers:[] },
    ],
    gym:[
      { type:'set', label:'Ej 1', main:{id:'A111', name:'Prensa de pierna (leg press)'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A112', name:'Sentadilla libre con barra'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A113', name:'Extensión de cuádriceps en máquina'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A114', name:'Hip thrust con barra'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A115', name:'Zancadas caminando con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A116', name:'Elevación de talones (gemelos) en máquina'}, supers:[] },
    ],
    hiit:{ type:'circuit', label:'HIIT final · 30 s c/u · 1–2 min entre vueltas', items:[
      {id:'A121',name:'Thrusters'},{id:'A122',name:'Sentadilla sumo con pulsaciones'},
      {id:'A123',name:'High knees'},{id:'A124',name:'Mountain climbers'},
      {id:'A125',name:'Plancha', iso:true},{id:'A126',name:'Crunch abdominal'} ] }
  },
  {
    id:'D2', title:'DÍA 2', focus:'Pecho + tríceps + HIIT',
    home:[
      { type:'set', label:'Ej 1', main:{id:'A201', name:'Press de pecho con mancuernas (piso o banco)'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A202', name:'Press inclinado con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A203', name:'Aperturas con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A204', name:'Fondos de tríceps (en silla o borde de cama)'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A205', name:'Press francés con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A206', name:'Push-up excéntrico (bajada lenta 3–4 s)'}, supers:[] },
    ],
    gym:[
      { type:'set', label:'Ej 1', main:{id:'A211', name:'Press de banca con barra'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A212', name:'Press inclinado con mancuernas o máquina'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A213', name:'Aperturas en peck deck / cruces en polea'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A214', name:'Fondos en paralelas / máquina'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A215', name:'Extensión de tríceps en polea (cuerda)'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A216', name:'Press francés con barra Z'}, supers:[] },
    ],
    hiit:{ type:'circuit', label:'HIIT final · 30 s c/u · 1–2 min entre vueltas', items:[
      {id:'A221',name:'Burpees'},{id:'A222',name:'High knees'},{id:'A223',name:'Butt kicks'},
      {id:'A224',name:'Mountain climbers'},{id:'A225',name:'Plancha', iso:true},{id:'A226',name:'Scissors'} ] }
  },
  {
    id:'D3', title:'DÍA 3', focus:'Espalda + bíceps + HIIT',
    home:[
      { type:'set', label:'Ej 1', main:{id:'A301', name:'Dominadas en barra (asistidas si hace falta)', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A302', name:'Remo con mancuernas (agarre neutro)', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A303', name:'Remo a una mano con mancuerna (apoyo en silla)', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A304', name:'Pull-over con mancuerna', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A305', name:'Curl bíceps con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A306', name:'Curl martillo con mancuernas'}, supers:[] },
    ],
    gym:[
      { type:'set', label:'Ej 1', main:{id:'A311', name:'Jalón al pecho (polea)', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A312', name:'Remo sentado en polea', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A313', name:'Remo con barra', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A314', name:'Face pull en polea', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A315', name:'Curl bíceps con barra'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A316', name:'Curl martillo con mancuernas'}, supers:[] },
    ],
    hiit:{ type:'circuit', label:'HIIT final · 30 s c/u · 1–2 min entre vueltas', items:[
      {id:'A321',name:'Thrusters'},{id:'A322',name:'Mountain climbers'},{id:'A323',name:'Russian twists'},
      {id:'A324',name:'Elevación de piernas colgado (barra)'},{id:'A325',name:'Plancha', iso:true},
      {id:'A326',name:'Crunch abdominal'} ] }
  },
  {
    id:'D4', title:'DÍA 4', focus:'Femoral / glúteo + HIIT',
    home:[
      { type:'set', label:'Ej 1', main:{id:'A401', name:'Peso muerto rumano con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A402', name:'Sentadilla búlgara con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A403', name:'Hip thrust con mancuerna (espalda alta en sofá/cama)'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A404', name:'Peso muerto a una pierna con mancuerna'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A405', name:'Curl femoral deslizante (toalla en piso liso)'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A406', name:'Abducción de cadera de pie'}, supers:[] },
    ],
    gym:[
      { type:'set', label:'Ej 1', main:{id:'A411', name:'Peso muerto rumano con barra'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A412', name:'Curl femoral en máquina (acostado o sentado)'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A413', name:'Hip thrust con barra'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A414', name:'Búlgara en Smith / prensa a una pierna'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A415', name:'Abductor en máquina'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A416', name:'Elevación de talones (gemelos) en máquina'}, supers:[] },
    ],
    hiit:{ type:'circuit', label:'HIIT final · 30 s c/u · 1–2 min entre vueltas', items:[
      {id:'A421',name:'Sentadilla sumo con pulsaciones'},{id:'A422',name:'High knees'},{id:'A423',name:'Butt kicks'},
      {id:'A424',name:'Plancha lateral (cada lado)', iso:true},{id:'A425',name:'Bicycle crunch'},
      {id:'A426',name:'Hollow hold', iso:true} ] }
  },
  {
    id:'D5', title:'DÍA 5', focus:'Hombro + torso + HIIT',
    home:[
      { type:'set', label:'Ej 1', main:{id:'A501', name:'Press militar de pie con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A502', name:'Elevaciones laterales con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A503', name:'Elevación frontal con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A504', name:'Pájaros / rear delt fly con mancuernas', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A505', name:'Remo al mentón con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A506', name:'Press de pecho con mancuernas'}, supers:[] },
    ],
    gym:[
      { type:'set', label:'Ej 1', main:{id:'A511', name:'Press militar con barra'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A512', name:'Elevaciones laterales con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A513', name:'Elevación frontal en polea'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A514', name:'Face pull / pájaros en polea', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A515', name:'Remo al mentón con barra'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A516', name:'Press de pecho en banca o máquina'}, supers:[] },
    ],
    hiit:{ type:'circuit', label:'HIIT final · 30 s c/u · 1–2 min entre vueltas', items:[
      {id:'A521',name:'Thrusters'},{id:'A522',name:'High knees'},{id:'A523',name:'Mountain climbers'},
      {id:'A524',name:'Crunch abdominal'},{id:'A525',name:'Plancha', iso:true},{id:'A526',name:'Scissors'} ] }
  },
  {
    id:'D6', title:'DÍA 6', focus:'Full body + core + HIIT',
    home:[
      { type:'set', label:'Ej 1', main:{id:'A601', name:'Dominadas en barra (asistidas si hace falta)', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A602', name:'Press de pecho con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A603', name:'Sentadilla goblet con mancuerna'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A604', name:'Remo con mancuernas', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A605', name:'Peso muerto con mancuernas'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A606', name:'Crunch en máquina de abdominales'}, supers:[] },
    ],
    gym:[
      { type:'set', label:'Ej 1', main:{id:'A611', name:'Jalón al pecho (polea)', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 2', main:{id:'A612', name:'Press de banca con barra'}, supers:[] },
      { type:'set', label:'Ej 3', main:{id:'A613', name:'Prensa de pierna (leg press)'}, supers:[] },
      { type:'set', label:'Ej 4', main:{id:'A614', name:'Remo sentado en polea', tag:'espalda'}, supers:[] },
      { type:'set', label:'Ej 5', main:{id:'A615', name:'Peso muerto con barra'}, supers:[] },
      { type:'set', label:'Ej 6', main:{id:'A616', name:'Crunch en máquina / rueda abdominal'}, supers:[] },
    ],
    hiit:{ type:'circuit', label:'HIIT final · 30 s c/u · 1–2 min entre vueltas', items:[
      {id:'A621',name:'Burpees'},{id:'A622',name:'Thrusters'},{id:'A623',name:'Mountain climbers'},
      {id:'A624',name:'Russian twists'},{id:'A625',name:'Plancha', iso:true},{id:'A626',name:'Hollow hold', iso:true} ] }
  },
];

/* ---------- 3. ESTADO + PERSISTENCIA ---------- */
const KEY = {
  week:'mm_a_week', day:'mm_a_day',
  log:(w,id)=>`mm_a_log_${w}_${id}`,
  weight:'mm_a_weight',
  macro:'mm_a_macro',
  food:(date)=>`mm_a_food_${date}`,
  mode:'mm_a_mode',
};
const store = {
  get:(k,def)=>{ try{ const v=localStorage.getItem(k); return v==null?def:JSON.parse(v);}catch(e){return def;} },
  set:(k,v)=>{ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
};
let state = {
  week: store.get(KEY.week, 1),
  day:  store.get(KEY.day, 0),
  mode: store.get(KEY.mode, 'home'),
};

/* ---------- 4. HELPERS DE DOM ---------- */
const $  = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const el = (tag,cls,html)=>{ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; };
const PLAY = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
const VIDEO_ICON = '<svg viewBox="0 0 24 24"><path d="M4 5h11a2 2 0 0 1 2 2v2.5l4-2.5v10l-4-2.5V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/></svg>';

/* Botón de video: usa ex.video si existe; si no, busca el ejercicio en YouTube. */
function videoBtn(ex){
  const b = el('button','vid', VIDEO_ICON);
  b.title = 'Ver video: '+ex.name;
  b.setAttribute('aria-label','Ver video de '+ex.name);
  b.onclick = ()=>{
    const url = ex.video
      || ('https://www.youtube.com/results?search_query=' + encodeURIComponent(ex.name + ' técnica ejercicio'));
    window.open(url, '_blank', 'noopener');
  };
  return b;
}

/* ---------- 5. RENDER: selector de semanas + banner de esquema ---------- */
function renderWeeks(){
  const box = $('#weeks'); box.innerHTML='';
  Object.entries(WEEKS).forEach(([n,w])=>{
    const b = el('button', 'week'+(+n===state.week?' active':''),
      `S${n}<b>${w.nivel}</b>`);
    b.onclick = ()=>{ state.week=+n; store.set(KEY.week,+n); renderWeeks(); renderScheme(); renderDay(); };
    box.appendChild(b);
  });
}
function renderScheme(){
  const w = WEEKS[state.week];
  $('#scheme').innerHTML = `
    <div><span class="k">Series</span><span class="v acc">${w.series}</span></div>
    <div><span class="k">Descanso</span><span class="v">${w.descanso}</span></div>
    <div><span class="k">Isometría</span><span class="v">${w.iso}s</span></div>
    <div><span class="k">Tabata</span><span class="v">30/10</span></div>`;
}

/* ---------- 6. RENDER: tabs de días ---------- */
function renderDays(){
  const box = $('#days'); box.innerHTML='';
  ROUTINE.forEach((d,i)=>{
    const t = el('button', 'day-tab'+(i===state.day?' active':''),
      `${d.title}<small>${d.focus}</small>`);
    t.onclick = ()=>{ state.day=i; store.set(KEY.day,i); renderDays(); renderDay(); };
    box.appendChild(t);
  });
}

/* ---------- 7. RENDER: contenido del día ---------- */
function renderDay(){
  const d = ROUTINE[state.day];
  const main = $('#dayContent'); main.innerHTML='';

  main.appendChild(el('div','day-head', `<h2>${d.title}</h2><p>${d.focus}</p>`));

  // Selector Casa / Gym — Casa es la opción por defecto
  const toggle = el('div','mode-toggle');
  [['home','🏠 Casa'],['gym','🏋️ Gym']].forEach(([m,txt])=>{
    const b = el('button','mode'+(state.mode===m?' active':''), txt);
    b.onclick = ()=>{ state.mode=m; store.set(KEY.mode,m); renderDay(); };
    toggle.appendChild(b);
  });
  main.appendChild(toggle);

  // Bloque de fuerza según el modo elegido
  const blocks = state.mode==='gym' ? d.gym : d.home;
  blocks.forEach(g=> main.appendChild(renderSet(g)));

  // HIIT final compartido (mismo para casa y gym)
  main.appendChild(renderCircuit(d.hiit));
}

/* un "Set": ejercicio principal (con log) + biserie cronometrada opcional */
function renderSet(g){
  const wrap = el('div');
  wrap.appendChild(el('div','set-label', g.label));

  const card = el('div','card');
  const m = g.main;
  const tag = m.tag ? `<span class="chip">${m.tag}</span>` : '';
  const iso = m.iso ? `<span class="chip">ISO</span>` : '';
  const rm = el('div','row-main', `<div class="ex-name">${m.name}${tag}${iso}</div>`);
  rm.appendChild(videoBtn(m));
  card.appendChild(rm);

  // El principal isométrico no lleva log de peso: lleva timer.
  if(m.iso){
    card.appendChild(timedRow(m, true));
  } else {
    card.appendChild(logRow(m));
  }

  // biserie cronometrada (30/10)
  g.supers.forEach(s=> card.appendChild(timedRow(s, s.iso===true)));

  wrap.appendChild(card);
  return wrap;
}

/* fila con inputs de peso/reps + botón hecho, guardada por semana */
function logRow(ex){
  const saved = store.get(KEY.log(state.week, ex.id), {peso:'', reps:'', done:false});
  const row = el('div','log');

  const fPeso = el('div','field', `<label>Peso (kg)</label>`);
  const iPeso = el('input'); iPeso.type='number'; iPeso.inputMode='decimal'; iPeso.step='0.5';
  iPeso.placeholder='—'; iPeso.value=saved.peso; fPeso.appendChild(iPeso);

  const fReps = el('div','field', `<label>Reps</label>`);
  const iReps = el('input'); iReps.type='number'; iReps.inputMode='numeric';
  iReps.placeholder = WEEKS[state.week].series.split('×')[1]; iReps.value=saved.reps; fReps.appendChild(iReps);

  const done = el('button','done'+(saved.done?' on':''), '✓');

  const save = ()=> store.set(KEY.log(state.week,ex.id), {peso:iPeso.value, reps:iReps.value, done:done.classList.contains('on')});
  iPeso.onchange = save; iReps.onchange = save;
  done.onclick = ()=>{ done.classList.toggle('on'); save(); };

  row.append(fPeso,fReps,done);
  return row;
}

/* fila cronometrada: nombre + botón ▶ que abre el timer */
function timedRow(ex, isIso){
  const secs = isIso ? WEEKS[state.week].iso : 30;
  const sub  = isIso ? `Isometría · ${secs}s` : `${secs}s · 10s descanso`;
  const row = el('div','timed', `<div><div class="t-name">${ex.name}</div><div class="t-sub">${sub}</div></div>`);
  const btn = el('button','play', `${PLAY}${secs}s`);
  btn.onclick = ()=> Timer.start([{ label: isIso?'Mantén':'Trabaja', ex:ex.name, sec:secs }]);
  const actions = el('div','timed-actions');
  actions.appendChild(videoBtn(ex));
  actions.appendChild(btn);
  row.appendChild(actions);
  return row;
}

/* circuito HIIT/Core: botón para correrlo completo + filas individuales */
function renderCircuit(g){
  const wrap = el('div');
  wrap.appendChild(el('div','set-label', g.label));

  const run = el('button','circuit-run', `${PLAY} Correr circuito completo`);
  run.onclick = ()=>{
    const seq = g.items.map(it=>({
      label: it.iso?'Mantén':'Trabaja', ex:it.name,
      sec: it.iso ? WEEKS[state.week].iso : 30
    }));
    Timer.start(seq);
  };
  wrap.appendChild(run);

  const card = el('div','card');
  g.items.forEach(it=> card.appendChild(timedRow(it, it.iso===true)));
  wrap.appendChild(card);
  return wrap;
}

/* ---------- 8. TIMER DE INTERVALOS ----------
   Recibe una secuencia [{label, ex, sec}]. Entre ejercicios mete 10s de
   descanso automáticamente. Pita y vibra en cada cambio de fase.            */
const Timer = (()=>{
  const back=$('#timerBack'), numEl=$('#tNum'), arc=$('#tArc'),
        phaseEl=$('#tPhase'), exEl=$('#tEx'), metaEl=$('#tMeta'),
        pauseBtn=$('#tPause'), stopBtn=$('#tStop');
  const CIRC = 2*Math.PI*104;           // circunferencia del anillo (r=104)
  let queue=[], idx=0, remaining=0, total=0, tick=null, paused=false, ac=null;

  function beep(freq=880, dur=0.15){
    try{
      ac = ac || new (window.AudioContext||window.webkitAudioContext)();
      const o=ac.createOscillator(), g=ac.createGain();
      o.frequency.value=freq; o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.4, ac.currentTime+0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime+dur);
      o.start(); o.stop(ac.currentTime+dur);
    }catch(e){}
    if(navigator.vibrate) navigator.vibrate(120);
  }

  // Expande la secuencia de ejercicios en fases con descansos intercalados
  function build(seq){
    const phases=[];
    seq.forEach((s,i)=>{
      phases.push({kind:'work', label:s.label, ex:s.ex, sec:s.sec});
      if(i < seq.length-1) phases.push({kind:'rest', label:'Descanso', ex:'Siguiente: '+seq[i+1].ex, sec:10});
    });
    return phases;
  }

  function paint(){
    numEl.textContent = remaining;
    const frac = total ? remaining/total : 0;
    arc.style.strokeDasharray = CIRC;
    arc.style.strokeDashoffset = CIRC*(1-frac);
  }

  function loadPhase(){
    const p = queue[idx];
    total = remaining = p.sec;
    phaseEl.textContent = p.label;
    exEl.textContent = p.ex || '';
    metaEl.textContent = `Fase ${idx+1} de ${queue.length}`;
    arc.style.stroke = p.kind==='rest' ? '#9AA0AA' : 'url(#g)';
    paint();
    beep(p.kind==='rest'?440:880);
  }

  function loop(){
    if(paused) return;
    remaining--;
    if(remaining<=0){
      idx++;
      if(idx>=queue.length){ finish(); return; }
      loadPhase();
    } else {
      if(remaining<=3) beep(660,0.08);
      paint();
    }
  }

  function start(seq){
    queue=build(seq); idx=0; paused=false;
    pauseBtn.textContent='Pausa';
    back.classList.add('show');
    loadPhase();
    clearInterval(tick); tick=setInterval(loop,1000);
  }
  function finish(){ clearInterval(tick); beep(1046,0.3); back.classList.remove('show'); }
  function stop(){ clearInterval(tick); back.classList.remove('show'); }

  pauseBtn.onclick=()=>{ paused=!paused; pauseBtn.textContent=paused?'Reanudar':'Pausa'; };
  stopBtn.onclick=stop;

  return { start };
})();

/* ---------- 9. PESO CORPORAL ---------- */
function renderWeight(){
  const data = store.get(KEY.weight, []);        // [{date:'2026-07-12', kg:62}]
  const list = $('#wlist'); list.innerHTML='';
  const trend = $('#wTrend');

  if(!data.length){
    list.innerHTML = '<div class="empty">Aún no hay registros. Guarda tu primer peso 👆</div>';
    trend.textContent=''; drawSpark([]); return;
  }
  // tendencia = primer vs último
  const first=data[0].kg, last=data[data.length-1].kg, diff=(last-first).toFixed(1);
  trend.innerHTML = diff<0 ? `▼ ${Math.abs(diff)} kg` : diff>0 ? `▲ ${diff} kg` : 'sin cambio';
  trend.style.color = diff<0 ? 'var(--ok)' : diff>0 ? 'var(--accent)' : 'var(--muted)';

  [...data].reverse().forEach(d=>{
    const li=el('li', null, `<span>${d.date}</span><b>${d.kg} kg</b>`);
    list.appendChild(li);
  });
  drawSpark(data);
}
function drawSpark(data){
  const svg=$('#spark'); svg.innerHTML='';
  if(data.length<2) return;
  const ks=data.map(d=>d.kg), min=Math.min(...ks), max=Math.max(...ks), rng=(max-min)||1;
  const pts=data.map((d,i)=>{
    const x = (i/(data.length-1))*300;
    const y = 62 - ((d.kg-min)/rng)*54;   // margen arriba/abajo
    return [x,y];
  });
  const path = pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const line=document.createElementNS('http://www.w3.org/2000/svg','path');
  line.setAttribute('d',path); line.setAttribute('fill','none');
  line.setAttribute('stroke','var(--accent)'); line.setAttribute('stroke-width','2.5');
  line.setAttribute('stroke-linecap','round'); line.setAttribute('stroke-linejoin','round');
  svg.appendChild(line);
  const last=pts[pts.length-1];
  const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
  dot.setAttribute('cx',last[0]); dot.setAttribute('cy',last[1]); dot.setAttribute('r','4');
  dot.setAttribute('fill','var(--accent-2)'); svg.appendChild(dot);
}
$('#wSave').onclick = ()=>{
  const inp=$('#wInput'); const kg=parseFloat(inp.value);
  if(isNaN(kg)||kg<=0){ inp.focus(); return; }
  const data=store.get(KEY.weight,[]);
  const today=new Date().toISOString().slice(0,10);
  const existing=data.find(d=>d.date===today);
  if(existing) existing.kg=kg; else data.push({date:today, kg});
  store.set(KEY.weight, data); inp.value=''; renderWeight();
};

/* ---------- 9b. COMIDA · DÉFICIT Y MACROS ----------
   Calcula metas con Mifflin-St Jeor y registra la comida del día.
   Metas -> KEY.macro ; comida del día -> KEY.food(fecha).                    */
const ACTIVITY = {
  '1.2':   'Sedentaria (poco movimiento)',
  '1.375': 'Ligera (camina algo)',
  '1.55':  'Moderada (entrena 3–5 días)',
  '1.725': 'Activa (entrena fuerte a diario)',
};
const GOALS = {
  '0':    'Mantener peso',
  '-250': 'Bajar suave · ~0.25 kg/sem',
  '-500': 'Bajar moderado · ~0.5 kg/sem',
};

/* Mifflin-St Jeor (hombres) -> TDEE -> déficit -> reparto de macros */
function calcTargets({age, cm, kg, act, goal}){
  const bmr  = 10*kg + 6.25*cm - 5*age + 5;
  const tdee = bmr * parseFloat(act);
  let kcal = tdee + parseFloat(goal);
  kcal = Math.max(1200, Math.round(kcal/10)*10);   // piso de seguridad + redondeo
  const p = Math.round(1.8*kg);                    // proteína
  const f = Math.round(0.8*kg);                    // grasa
  const c = Math.max(0, Math.round((kcal - p*4 - f*9)/4)); // carbos rellenan
  return { kcal, p, c, f, tdee:Math.round(tdee), in:{age,cm,kg,act,goal} };
}

const todayStr = ()=> new Date().toISOString().slice(0,10);

function renderFood(){
  const t = store.get(KEY.macro, null);
  if(!t) return renderMacroSetup(null);
  renderMacroTracker(t);
}

/* --- Formulario de metas (primera vez o al editar) --- */
function renderMacroSetup(prefill){
  const box = $('#foodContent');
  const lastW = store.get(KEY.weight, []);
  const p = prefill || { age:'', cm:'', kg:(lastW.length?lastW[lastW.length-1].kg:''), act:'1.55', goal:'-500' };

  const actOpts  = Object.entries(ACTIVITY).map(([v,l])=>`<option value="${v}" ${v===p.act?'selected':''}>${l}</option>`).join('');
  const goalOpts = Object.entries(GOALS).map(([v,l])=>`<option value="${v}" ${v===p.goal?'selected':''}>${l}</option>`).join('');

  box.innerHTML = `
    <div class="card-lg setup">
      <h2>TUS METAS</h2>
      <p class="sub">Calculamos tu gasto y tu déficit. Puedes editarlas cuando quieras.</p>
      <div class="two">
        <div><label>Edad</label><input id="mAge" type="number" inputmode="numeric" value="${p.age}" placeholder="años"></div>
        <div><label>Altura (cm)</label><input id="mCm" type="number" inputmode="numeric" value="${p.cm}" placeholder="cm"></div>
      </div>
      <label>Peso (kg)</label><input id="mKg" type="number" inputmode="decimal" step="0.1" value="${p.kg}" placeholder="kg">
      <label>Nivel de actividad</label><select id="mAct">${actOpts}</select>
      <label>Objetivo</label><select id="mGoal">${goalOpts}</select>
      <button class="btn" id="mCalc" style="width:100%;margin-top:16px">Calcular mis metas</button>
      <p class="note">Es una estimación con la fórmula Mifflin-St Jeor. Un déficit sostenible ronda ~0.5 kg/semana; no conviene bajar de forma agresiva. Si tienes alguna condición de salud, consúltalo con un profesional.</p>
    </div>`;

  $('#mCalc').onclick = ()=>{
    const age=+$('#mAge').value, cm=+$('#mCm').value, kg=+$('#mKg').value;
    const act=$('#mAct').value, goal=$('#mGoal').value;
    if(!age||!cm||!kg){ $('#mAge').focus(); return; }
    const t = calcTargets({age,cm,kg,act,goal});
    store.set(KEY.macro, t);
    renderMacroTracker(t);
  };
}

/* --- Vista diaria: barras + registro de comida --- */
function renderMacroTracker(t){
  const box = $('#foodContent');
  const date = todayStr();
  const food = store.get(KEY.food(date), []);
  const sum = food.reduce((a,x)=>({kcal:a.kcal+x.kcal, p:a.p+x.p, c:a.c+x.c, f:a.f+x.f}), {kcal:0,p:0,c:0,f:0});

  const bar = (lab, cons, tgt, cls)=>{
    const pct = tgt? Math.min(100, (cons/tgt)*100) : 0;
    const over = cons>tgt;
    return `<div class="mbar">
      <div class="top"><span class="lab">${lab}</span>
        <span class="val"><b>${Math.round(cons)}</b> / ${tgt}${cls==='kcal'?' kcal':' g'}</span></div>
      <div class="track"><div class="fill ${cls}${over?' over':''}" style="width:${pct}%"></div></div>
    </div>`;
  };

  const remK = t.kcal - Math.round(sum.kcal);
  box.innerHTML = `
    <div class="card-lg">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <h2>HOY</h2>
        <button class="link-btn" id="editGoals">Editar metas</button>
      </div>
      <p class="sub">Meta: ${t.kcal} kcal · P ${t.p} · C ${t.c} · G ${t.f} &nbsp;·&nbsp; gasto est. ${t.tdee} kcal</p>
      <div class="macro-bars">
        ${bar('Calorías', sum.kcal, t.kcal, 'kcal')}
        ${bar('Proteína', sum.p, t.p, 'p')}
        ${bar('Carbohidratos', sum.c, t.c, 'c')}
        ${bar('Grasa', sum.f, t.f, 'f')}
      </div>
      <div class="rem">Te quedan <b class="${remK<0?'over':''}">${remK} kcal</b> ${remK<0?'(te pasaste)':'para hoy'}</div>
    </div>

    <div class="card-lg">
      <h2 style="font-size:18px">Agregar comida</h2>
      <div class="food-add">
        <input id="fName" placeholder="Nombre (ej. Yogurt griego)">
        <div class="macros4">
          <input id="fKcal" type="number" inputmode="numeric" placeholder="kcal">
          <input id="fP" type="number" inputmode="decimal" placeholder="P (g)">
          <input id="fC" type="number" inputmode="decimal" placeholder="C (g)">
          <input id="fF" type="number" inputmode="decimal" placeholder="G (g)">
        </div>
        <button class="btn" id="fAdd" style="width:100%">Agregar</button>
      </div>
      <ul class="food-list" id="foodList"></ul>
    </div>`;

  // lista de comidas del día
  const list = $('#foodList');
  if(!food.length){
    list.innerHTML = '<div class="empty">Sin comidas registradas hoy.</div>';
  } else {
    food.forEach((x,i)=>{
      const li = el('li','food-item', `
        <div class="fi-main">
          <div class="fi-name">${x.name||'—'}</div>
          <div class="fi-macros">P ${x.p} · C ${x.c} · G ${x.f}</div>
        </div>
        <div class="fi-kcal">${x.kcal} kcal</div>
        <button class="del" aria-label="Eliminar">×</button>`);
      li.querySelector('.del').onclick = ()=>{
        food.splice(i,1); store.set(KEY.food(date), food); renderMacroTracker(t);
      };
      list.appendChild(li);
    });
  }

  $('#editGoals').onclick = ()=> renderMacroSetup(t.in);
  $('#fAdd').onclick = ()=>{
    const name=$('#fName').value.trim();
    const kcal=Math.round(+$('#fKcal').value||0);
    const p=+$('#fP').value||0, c=+$('#fC').value||0, f=+$('#fF').value||0;
    if(!name && !kcal){ $('#fName').focus(); return; }
    food.push({name, kcal, p, c, f});
    store.set(KEY.food(date), food);
    renderMacroTracker(t);
  };
}

/* ---------- 10. NAVEGACIÓN ENTRE VISTAS ---------- */
$('#nav').addEventListener('click', e=>{
  const btn=e.target.closest('button'); if(!btn) return;
  const view=btn.dataset.view;
  $$('#nav button').forEach(b=>b.classList.toggle('active', b===btn));
  $('#view-routine').classList.toggle('hidden', view!=='routine');
  $('#view-weight').classList.toggle('hidden', view!=='weight');
  $('#view-food').classList.toggle('hidden', view!=='food');
  $('#view-info').classList.toggle('hidden', view!=='info');
  if(view==='weight') renderWeight();
  if(view==='food')   renderFood();
});

/* ---------- 11. ARRANQUE ---------- */
renderWeeks();
renderScheme();
renderDays();
renderDay();
