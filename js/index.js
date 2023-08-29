const itemContainer = document.getElementById('item-container');
const loadingCircle = document.getElementById('loading-circle')

const loadCards = async () =>{
    loadingSign();
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    displayCards(data.data.tools);
}


const displayCards = (aiCard) => {
    aiCard = aiCard.slice(0,6);
    aiCard.forEach(card =>{
        console.log(card.image);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
      <div style="border-radius: 16px;
      border: 1px solid rgba(17, 17, 17, 0.10);
      background: #FFF;" class="p-6 space-y-6">
          <!-- image container -->
          <div>
              <img class="rounded-2xl h-[300px] object-cover" src="${card.image}" alt="">
          </div>
          <!-- text container  -->
          <div>
              <h2 class="text-2xl font-semibold mb-4">Features</h2>
              <ol class="list-decimal list-inside">
                  <li>Natural language processing</li>
                  <li>Contextual understanding</li>
                  <li>Text generation</li>
              </ol>
          </div>
          <hr>
          <!-- card footer  -->
          <div class="flex justify-between items-center">
              <div>
                  <h2 class="text-2xl font-semibold mb-4">${card.name}</h2>
                  <p class="font-medium">Date</p>
              </div>
              <button class="btn btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
          </div>
      </div>
        
        `

        itemContainer.appendChild(cardDiv)
    }

        )

    loadingCircle.classList.add('hidden');
    

}


const loadingSign = () =>{
    loadingCircle.classList.remove('hidden');
}

loadCards()

