// let axios = require('axios')
let pokemonInicio = 'wobbuffet'

function pesquisa (){
    let busca = document.getElementById('search').value
    
    // console.log(campo)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${busca}`)
    .then(pokemon => {
        const {name, abilities, sprites} = pokemon.data
        // console.log(name) 
        //adicionando nome 
        let nomePokemon = document.getElementById('nome')
        nomePokemon.innerText = name
    
        
        //Criando as habilidades
        
        abilities.forEach((habilidade, indice) => {
            
            let hab = habilidade.ability.name
            let pegaCampoHabilidade = document.getElementById('hab')
            let criaHabilidade = document.createElement('div')
            criaHabilidade.setAttribute('id','habilidade')
            criaHabilidade.textContent = hab
            pegaCampoHabilidade.appendChild(criaHabilidade)
            
            
            //pegando descrição
            let desc = habilidade.ability.url
           //console.log(desc) // - Tudo ok, link da descrição de habilidades
           axios.get(desc)
           .then(descricao => {
            let descricaoHabilidades = descricao.data.effect_entries[1]
            // console.log(descricaoHabilidades)
            let pegaDescricao = document.getElementById('conteudo')
            let criaDescricao = document.createElement('div')
            criaDescricao.setAttribute('id','conteudo-habilidades')
            criaDescricao.textContent = 'oi'
            pegaDescricao.append(criaDescricao)
        })
           .catch(erro => console.log(erro))
            
        })
        //removendo habilidades existentes
        for (var i = 0; i < abilities.length; i++){
        function limpaDados(){
            let pegaCampoHabilidade = document.getElementById('habilidade')
            pegaCampoHabilidade.remove()
            
        }
        limpaDados()
    }
        
        //pegando tipo
        let tipo = pokemon.data.types[0].type
        let NomeTipo = tipo.name
        // console.log(tipo.name) - tipo do pokemon
        let pegaTipo = document.getElementById('tipo')
        pegaTipo.innerHTML = NomeTipo
        
        // BACKGROUND DOS TIPOS
        pegaTipo.setAttribute('class',NomeTipo)
        
        //ALTERANDO A IMAGEM DO POKEMON
        let urlNovaImg = sprites.front_default
        //console.log(urlNovaImg) // link da imagem padrão do pokemon
        let RotaDaimagem = document.getElementById('imagem-pokemon')
        RotaDaimagem.setAttribute('src', urlNovaImg)
        
        //console.log(tipo.url) // - URL DOS TIPOS DE POKEMON, VANTAGEM/DESVANTAGEM

        axios.get(tipo.url)
        .then(vantagemDesvantagem => {
            let tiposDeDanos = vantagemDesvantagem.data.damage_relations
            // console.log(tiposDeDanos)
           
            //HABILIDADES 

            let dobleDamageTo = tiposDeDanos.double_damage_to //Dobro de dano em
            // console.log(dobleDamageTo)
            dobleDamageTo.forEach((tipo, i) => {
                let nomeTipo = tipo.name
               // console.log(nomeTipo)
                let pegaDDT = document.getElementById('db-desc' + i)
                pegaDDT.setAttribute('class', nomeTipo)
                pegaDDT.innerText = nomeTipo
                // console.log(pegaDDT)
            })
            
          
            let halfDamageTo = tiposDeDanos.half_damage_to //metade do dano em
            // console.log(halfDamageTo)
            halfDamageTo.forEach((tipo, i) => {
                let nomeTipo = tipo.name
                // console.log(nomeTipo,i)
                let pegaHDT = document.getElementById('hdt-desc' + i)
                pegaHDT.setAttribute('class', nomeTipo)
                pegaHDT.innerText = nomeTipo
                // console.log(pegaHDT)
            })

            
            let noDamageTo = tiposDeDanos.no_damage_to //não da dano em
            // console.log(noDamageTo)
            noDamageTo.forEach((tipo,i) => {
                let nomeTipo = tipo.name
                // console.log(tipo.name,i)
                let pegaNDT = document.getElementById('ndt-desc' + i)
                pegaNDT.setAttribute('class', nomeTipo)
                pegaNDT.innerHTML = nomeTipo
                // console.log(pegaNDT)
            })


        })
        .catch(erro => console.log(erro))
        

    })
    .catch(erro => console.log(`Esse pokemon não existe ${erro}`))
    
}

