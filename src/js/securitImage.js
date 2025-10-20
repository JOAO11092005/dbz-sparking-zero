function imagem(resposta) {
    const img = document.querySelector('.fundo')
    const body = document.querySelector('body')
    const pageBlock = document.querySelector(".page-block.desativada")
    if (resposta === 'y') {

        img.remove()
        pageBlock.classList.remove("desativada")
        body.style.background = `url('https://www.publicdomainpictures.net/pictures/200000/nahled/plain-black-background.jpg') center center no-repeat`;
        body.style.backgroundColor = '#000000'
    } else {
        img.style.display = 'block'
    }
}

imagem('semImagem')

