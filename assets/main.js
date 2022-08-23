const nomePokemon = document.querySelector('.nomePokemon')
const idPokemon = document.querySelector('.idPokemon')
const pokemonImagem = document.querySelector('.pokemon_img')
const hpPokemon = document.querySelector('#hp')
const ataque = document.querySelector('#ataque')
const defesa = document.querySelector('#defesa')
const ataqueEspecial = document.querySelector('#ataqueEspecial')
const defesaEspecial = document.querySelector('#defesaEspecial')
const velocidade = document.querySelector('#velocidade')

const form = document.querySelector('.form')
const input = document.querySelector('.input_pesquisa')
const btnDireita = document.querySelector('.btn_direita')
const btnEsquerda = document.querySelector('.btn_esquerda')
const habilidades = document.querySelector('#tabela')

let pokemonInicial = 1


const fetchPokemon = async (pokemon) =>{
    nomePokemon.innerHTML = 'Carregando ...'
    idPokemon.innerHTML = ''

    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(respostaAPI.status == 200){
        const dadosAPI = await respostaAPI.json()
        return dadosAPI
    }
}

const renderPokemon = async (pokemon) =>{
    const dados = await fetchPokemon(pokemon)
    
    if(dados){
        pokemonImagem.style.display = 'block'
        habilidades.style.display = ''
        nomePokemon.innerHTML = dados.name
        idPokemon.innerHTML = dados.id
        pokemonImagem.src = dados['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default']
        hpPokemon.innerHTML = dados['stats'][0]['base_stat']
        ataque.innerHTML = dados['stats'][1]['base_stat']
        defesa.innerHTML = dados['stats'][2]['base_stat']
        ataqueEspecial.innerHTML = dados['stats'][3]['base_stat']
        defesaEspecial.innerHTML = dados['stats'][4]['base_stat']
        velocidade.innerHTML = dados['stats'][5]['base_stat']

        pokemonInicial = dados.id
        input.value = ''
    } else{ 
        pokemonImagem.style.display = 'none'
        nomePokemon.innerHTML = 'Não encontrado'
        idPokemon.innerHTML = ''
        habilidades.style.display = 'none'
        input.value = ''

    }
    
}

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    renderPokemon(input.value.toLowerCase())
})

btnDireita.addEventListener('click',()=>{
    pokemonInicial +=1
    renderPokemon(pokemonInicial)  
})

btnEsquerda.addEventListener('click',()=>{
    if (pokemonInicial > 1 ) {
        pokemonInicial -=1
        renderPokemon(pokemonInicial) 
    }
    
})

renderPokemon(pokemonInicial)

