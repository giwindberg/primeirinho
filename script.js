//variaveis que nao podem ser atualizadas
const minutesEl = document.querySelector("#minutes")
const secondsEl = document.querySelector("#seconds")
const millisecondsEl = document.querySelector("#milliseconds")
const startBtn = document.querySelector("#startBtn")
const pauseBtn = document.querySelector("#pauseBtn")
const resumeBtn = document.querySelector("#resumeBtn")
const resetBtn = document.querySelector("#resetBtn")

//variaveis que podem ser atualizadas
let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false; //isPaused false = rodando; isPaused true = pausado

//pras funcoes funcionarem pra cada botao diferente
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer); 
resetBtn.addEventListener("click", resetTimer); 

//funcao do botao pra iniciar o cronometro
function startTimer() {

    interval = setInterval(() => {

        if (!isPaused) {
            
            milliseconds += 10
//quando os microsegundos chegarem no 1000, o segundo aumenta e o microsegundo volta pro 0
            if (milliseconds === 1000) {
                seconds++;
                milliseconds = 0;
            }
//e quando o segundos chegar no 60, os minutos aumentam e o segundos volta pro 0
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }

            minutesEl.textContent = formatTime(minutes);
            secondsEl.textContent = formatTime(seconds);
            millisecondsEl.textContent = formatMilliseconds(milliseconds);
        }
    }, 10)
//funcao pro iniciar funcionar: ao apertar o botao "iniciar", o tempo roda e o botao "iniciar" some e aparece o "pausar"
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";
}

//funcao pro pause funcionar: ao apertar o botao "pausar", o tempo para de rodar (isPoused true); o botao de "pausar" some e aparece o "continuar"
function pauseTimer() {
    isPaused = true;
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "block";
}

//funcao pro continuar funcionar: ao apertar o botao "continuar", o tempo continua a rodar (isPoused false); o botao de "continuar" some e aparece o "pausar"
function resumeTimer() {
    isPaused = false;
    resumeBtn.style.display = "none";
    pauseBtn.style.display = "block";
}

//funcao pro resetar funcionar: ao apertar o botao "resetar", o tempo zera; o botao de "pausar" e "continuar" somem e aparece o "iniciar"
function resetTimer() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    millisecondsEl.textContent = "000";

    resumeBtn.style.display = "none";
    pauseBtn.style.display = "none";
    startBtn.style.display = "block";
}

//funcao pro cronometro manter, por exemplo, "01s" ao invés de "1s" e ficar padrao 2 casas decimais: entao quando o tempo for menor que 10, o 0 aparece
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

//funcao pro microsegundos manter, por exemplo, padrao as 3 casas: entao quando o tempo for menor que 100, preenche as casas que faltarem com o 0
function formatMilliseconds(time) {
    return time <100 ? `${time}`.padStart(3, "0") : time;
}