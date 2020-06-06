//Pegando a API do IBGE 

// Encaixando states 
function populateUFs(){
  const ufSelect = document.querySelector( 'select[name=uf]' );

  fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados" )
  .then( res => res.json() )
  .then( states => {
    for( const state of states ){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
} populateUFs()

// Encaixando cities with varying states
function getCities(event) {
  const citySelect = document.querySelector( "select[name=city]" )
  const stateInput = document.querySelector( "input[name=state]" )

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

  fetch( url )
  .then( res => res.json() )
  .then( cities => {
    for( const city of cities ){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
  .querySelector( "select[name=uf]" )
  .addEventListener( "change", getCities )

/** Itens collect */

// Pegar todos os li
const itensToCollect = document.querySelectorAll(".itens-grid li")

for( const item of itensToCollect ){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem( event ){
  const itemLi = event.target

  // Add or remove a class with javascript
  // add = adiciona remove = remove toggle = adicionar ou remover
  itemLi.classList.toggle( "selected" )
  const itemId = itemLi.dataset.id

  // 1º Verificar se existem itens selecionados

  // 2º Se a resposta for: Sim
  const alreadySelected = selectedItems.findIndex( item  => {
    // Pegar os itens selecionados 
    const itemFound = item == itemId
    return itemFound
  })

  // 3º Se já estiver selecionado:
  if( alreadySelected >= 0 ){
    // Tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      const itemIsDiferent = item != itemId
      return itemIsDiferent
    })
    selectedItems = filteredItems
  // 4º Se não estiver selecionado:
  } else {
    //   Adicionar á seleção
    selectedItems.push(itemId)
  } 
  console.log(selectedItems)

  // 5º Atualizar o campo hidden com os itens selecionados

  collectedItems.value = selectedItems
}
