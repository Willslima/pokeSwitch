function pesquisa() {

    console.log('Pokemon pesquisado com sucesso! ')

    var busca = document.getElementById('search').value

    // console.log(campo)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${busca}`)
        .then(pokemon => {
            const { name, abilities, sprites } = pokemon.data
            // console.log('Dentro do axios')
            //adicionando nome 
            let nomePokemon = document.getElementById('nome')
            nomePokemon.innerText = name


            //Criando as habilidades
            for (var i = 0; i < 4; i++) {
                let pegaCampoHabilidadefora = document.getElementById('habilidade' + i)
                pegaCampoHabilidadefora.innerHTML = ''
            }

            abilities.forEach((habilidade, indice) => {

                let hab = habilidade.ability.name
                let pegaCampoHabilidade = document.getElementById('habilidade' + indice)
                pegaCampoHabilidade.innerHTML = indice + ' - ' + hab
                // console.log(pegaCampoHabilidade.textContent)

            })


            //pegando tipo
            let tipo = pokemon.data.types[0].type
            let NomeTipo = tipo.name
            // console.log(tipo.name) - tipo do pokemon
            let pegaTipo = document.getElementById('tipo')
            pegaTipo.innerHTML = NomeTipo

            // BACKGROUND DOS TIPOS
            pegaTipo.setAttribute('class', NomeTipo)

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

                    //limpando as habilidades doble damage to
                    for (var i = 0; i < 7; i++) {
                        let pegaDDTfora = document.getElementById('db-desc' + i)
                        pegaDDTfora.innerHTML = ''
                        pegaDDTfora.setAttribute('class', '')
                    }


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

                    //limpando as habilidades half damage to
                    for (var i = 0; i < 7; i++) {
                        let pegaHDTfora = document.getElementById('hdt-desc' + i)
                        pegaHDTfora.innerHTML = ''
                        pegaHDTfora.setAttribute('class', '')
                    }


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

                    //limpando as habilidades no damage to
                    for (var i = 0; i < 7; i++) {
                        let pegaNDTfora = document.getElementById('ndt-desc' + i)
                        pegaNDTfora.innerHTML = ''
                        pegaNDTfora.setAttribute('class', '')
                    }

                    let noDamageTo = tiposDeDanos.no_damage_to //não da dano em
                    // console.log(noDamageTo)
                    noDamageTo.forEach((tipo, i) => {
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
function devolveValor() {
    var habilidadesDescricao = document.getElementById('search').value
    window.location.href = 'descricao.html?' + habilidadesDescricao
}

function carregaDescricao() {
    let separadorDeLink = window.location.search
    let linkDeConsulta = separadorDeLink.replace('?', '')
    // console.log(linkDeConsulta)

    axios.get(`https://pokeapi.co/api/v2/pokemon/${linkDeConsulta}`)
        .then(descricao => {

            let descricoes = descricao.data

            //pegando descrição

            let texto = descricoes.abilities

            texto.forEach((valor, i) => {
                let url = valor.ability.url

                axios.get(url)
                    .then(descricao => {

                        let descricaoHabilidades = descricao.data.effect_entries[1].effect
                        // console.log(descricaoHabilidades)

                        let criaDescricaoHabilidade = document.createElement('div')
                        criaDescricaoHabilidade.setAttribute('id','conteudo-habilidades' + i)
                        criaDescricaoHabilidade.innerHTML = i + ' - ' + descricaoHabilidades
                        let campos = document.getElementById('conteudo')
                        campos.append(criaDescricaoHabilidade)

                    })
                    .catch(erro => console.log(erro))

            })
        })//Fim do THEN

}

