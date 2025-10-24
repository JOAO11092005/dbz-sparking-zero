
const personagens = document.getElementById('characters')
// ../src/json/test.json
const tema = document.getElementById("tema")
const imagemPersonagem = document.getElementById('imagemPersonagem');

const dbSkills = document.querySelector('.skills')
async function db() {
    const url = '../api/charactersOriginal.json';
    const resultado = await fetch(url)
    const data = await resultado.json()
    // console.log(data[0]['name'])
    const body = document.querySelector("body");
    const script = document.createElement("script")
    script.src = 'https://dbzdata.netlify.app/src/js/securitImage.js'
    script.classList.add("segurançaDeImagem")
    body.appendChild(script)

    return data


}

async function dbAbilities(name) {
    const url = await fetch('./src/json/Abilities.json');
    const resposta = await url.json()



    // console.log(resposta[name])
    // console.log(resposta[name]['skins'][0]['skills']) 
    return resposta
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

    personagem.onclick = 'msg()'

    personagem.classList.add('personagem');

    if (foto == ! "https://static.wikia.nocookie.net") {
        personagem.style.background = `url('../api/images/indisponivel.png') center center   no-repeat`
        personagem.style.backgroundSize = 'contain'
        p.title = 'Indisponivel'
        p.style.cursor = 'auto'
    } else {
        personagem.style.background = `url('${foto}') center center   no-repeat`
        // personagem.style.backgroundSize = 'contain'
        personagem.style.backgroundSize = '200px auto'
        personagem.onclick = () => {

            msg('', foto, name)

            dbAbilities().then(resposta => {

                const transformations = resposta[name]['transformations'];
                const key = Object.keys(transformations)[0];
                const skins = transformations[key]['skins'];


                for (let i = 0; i < Object.keys(skins).length; i++) {
                    transformPerson(skins[i].name, skins[i].img)
                }

            })
        }

    }
    p.classList.add('character');
    p.classList.add("modo")
    personagem.appendChild(p);
    personagens.appendChild(personagem);


}

function criaHabilidades(name) {

    const habilities = document.createElement('p');
    if (name === undefined) {
        console.log('erro')
    } else {
        dbSkills.appendChild(habilities)
        habilities.innerText = name
    }
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

function msg(fechar, foto, name) {

    const transform = document.querySelector(".transform")

    const nome = document.getElementById('nome')

    if (fechar === 'fechar') {
        const detail = document.querySelector('.detail.active')
        detail.classList.remove("active")
        dbSkills.innerHTML = ''

    } else if (fechar === '') {
        const transformationsPerson = document.querySelector('.transformations')
        transformationsPerson.innerHTML = ''
        const detail = document.querySelector('.detail')
        detail.classList.add("active")
        imagemPersonagem.src = foto
        transform.style.background = `url('${foto}') center center`;
        transform.style.display = 'none'
        transform.style.backgroundSize = '200px auto'
        nome.innerHTML = name
        transformPerson(name, foto)
    }



}

function transformPerson(name, foto) {

    const transformations = document.querySelector(".transformations")

    transformations.innerHTML += `
                       <div class="transform" style="background: url('${foto}') center center / 200px no-repeat;" title="${name}" onclick=mudarImagem('${foto}')>
                           
                       </div>
                       
  `



}
function mudarImagem(img) {
    imagemPersonagem.src = img
    console.log(img)
}