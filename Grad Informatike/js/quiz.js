let score = 0;
let trenutniZadatak = null;

function otvoriZadatak(zgradaPodatci) {
    trenutniZadatak = zgradaPodatci;
    
    document.getElementById('modal-title').innerText = zgradaPodatci.ime;
    document.getElementById('question-text').innerText = zgradaPodatci.pitanje;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    document.getElementById('feedback-box').classList.add('hidden');
    document.getElementById('question-box').classList.remove('hidden');

    zgradaPodatci.opcije.forEach((opcija, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opcija;
        btn.onclick = () => provjeriOdgovor(index);
        container.appendChild(btn);
    });

    document.getElementById('quiz-modal').classList.remove('hidden');
}

function provjeriOdgovor(odabranaOpcija) {
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackMsg = document.getElementById('feedback-msg');
    const questionBox = document.getElementById('question-box');

    questionBox.classList.add('hidden');
    feedbackBox.classList.remove('hidden');

    if (odabranaOpcija === trenutniZadatak.tocno) {
        score += 10;
        document.getElementById('score-val').innerText = score;
        feedbackMsg.innerText = "🎉 Točno! Osigurao/la si 10 bodova za svoj grad!";
        feedbackMsg.style.color = "#10b981";
    } else {
        feedbackMsg.innerText = "❌ Uh, blizu! Pokušaj ponovno sljedeći put!";
        feedbackMsg.style.color = "#ef4444";
    }
}

function zatvoriModal() {
    document.getElementById('quiz-modal').classList.add('hidden');
}
