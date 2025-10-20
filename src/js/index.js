const personagens = document.getElementById('characters')
// ../src/json/test.json
const tema = document.getElementById("tema")
async function db() {
    const url = '../api/characters.json';
    const resultado = await fetch(url)
    const data = await resultado.json()
    // console.log(data[0]['name'])
    const body = document.querySelector("body");
    const script = document.createElement("script")
    script.src = 'https://dbzdata.netlify.app/src/js/securitImage.js'
    script.classList.add("segurança")
    return data


}

function personagem() {
    const dados = db().then(resultado => {

        for (let i = 0; i < resultado.length; i++) {
            characters(resultado[i]['name'], resultado[i]['image'])
        }
    })


}

function characters(name, foto) {
    const personagem = document.createElement('div');
    const p = document.createElement('p');

    p.innerText = name;
    p.title = name;

    //   p.style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.98) 12%, rgba(5, 5, 5, 0.64) 40%)`;


    personagem.classList.add('personagem');
    personagem.style.background = `url('${foto || ''}') center center   no-repeat`
    p.classList.add('character');
    p.classList.add("modo")
    personagem.appendChild(p);
    personagens.appendChild(personagem);
}

personagem()

let temaPadrao = 'c'

function alterarTema(resposta) {

    if (resposta === 'c') {
        const fundo = document.querySelector('.fundo')
        const body = document.querySelector('body')
        body.style.color = 'black'
        body.style.background = `url('./src/img/fundo-1.png') center center no-repeat`
        document.querySelector(".character").style.color = 'white'
        // document.querySelectorAll(".modo").style.color = 'white'
        fundo.style.backgroundColor = ' rgba(255, 255, 255, 0.67)'
        body.style.backgroundSize = 'cover'
        tema.innerHTML = `
            <img src="./src/img/lua.png" alt="Tema" title="Tema">
        `
        temaPadrao = 'e'
    } else if (resposta === 'e') {
        const fundo = document.querySelector('.fundo')
        const body = document.querySelector('body')
        body.style.color = 'white'
        body.style.background = `url('https://gmedia.playstation.com/is/image/SIEPDC/dragon-ball-sparking-zero-roster-screenshot-01-en-05sept24?$4000px$') center center no-repeat `
        body.style.backgroundSize = 'cover'
        tema.innerHTML = `
            <img src="./src/img/sol.png" alt="Tema" title="Tema">
        `
        document.querySelector(".character").style.color = 'white'
        // document.querySelectorAll(".modo").style.color = 'white'
        fundo.style.backgroundColor = ' #000000e0'
        temaPadrao = 'c'
    }

}

tema.addEventListener("click", function () {
    alterarTema(temaPadrao)
})