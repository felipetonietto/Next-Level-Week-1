function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
     .then( res => res.json() )
     .then( states => {

        for( let state of states ) { //entra nos estados pega um estado armazena na let state e entra no bloco de código
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

     })
}

populateUFs()

function getCitys(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // Limpa o campo antes de fz a chamada
    citySelect.disabled = true

    fetch(url)
     .then( res => res.json() )
     .then( citys => {

        for ( const city of citys ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

     })

}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCitys)

// Itens de Coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for ( let item of itemsToCollect ) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => { // procura o index e executa uma função pra cada item selecionado e retorna true/false
        const itemFound = item == itemId
        return itemFound
    }) 

    // se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0) {
        const filteredtItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredtItems
    } else {
        // se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}