let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let numeros = document.querySelector('.d-1-3');
let lateral = document.querySelector('.d-1-right');

let etapaAtual = 0;
let numero = '';
let votoEmBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    let votoEmBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if(i==0){
            numeroHTML = '<div class="numero pisca"></div>&nbsp'; 
        } else {
            numeroHTML += '<div class="numero"></div>&nbsp';
        }                
    }    

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    numeros.innerHTML = numeroHTML;
    lateral.innerHTML = '';
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.canditados.filter(candidato => {
        return candidato.numero === numero;
    })
    if (candidato.length > 0){
        candidato = candidato[0];
        let vice = candidato.numero.lenght > 3 ? `<br/>Vice-Prefeito: ${candidato.vice}`: '';
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}${vice}`;
        aviso.style.display = 'block';

        console.log(candidato.fotos);
        let fotoHTML = '';
        candidato.fotos.forEach(foto => {
            fotoHTML = `<div class="d-1-image"><img src="images/${foto.url}" alt="">                        
            ${foto.legenda}    
            </div>`;
        });
        lateral.innerHTML = fotoHTML;
    } else {
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO<div>';
        aviso.style.display = 'block';
        //numero = 'NULO';
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    elNumero.innerHTML = n;
    numero = `${numero}${n}`;
    elNumero.classList.remove('pisca');

    if(elNumero.nextElementSibling){
        elNumero.nextElementSibling.classList.add('pisca');
    } else {
        atualizaInterface();
    }
}

function branco(){
    if (numero === ''){
        votoEmBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO<div>';
        numero = 'BRANCO';
    }
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let votoConfirmado = false;
    let etapa = etapas[etapaAtual];
    if (votoEmBranco || etapa.numeros === numero.length){
        votoConfirmado = true;
        votos.push({
            etapa: etapa.titulo,
            voto: numero
        })
    }

    if (votoConfirmado){
        etapaAtual++;

        if (etapas[etapaAtual] != undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM<div>';
            console.log(votos);
            etapaAtual = 0;
            setTimeout(function(){  
                seuVotoPara.style.display = 'none';
                cargo.innerHTML = '';
                descricao.innerHTML = '';
                aviso.style.display = 'none';
                numeros.innerHTML = '';
                lateral.innerHTML = '';                              
                document.location.reload(true);
            }, '7000')
        }
    }
}

comecarEtapa();