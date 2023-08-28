const itemContainer = document.getElementById('item-container');

const loadCards = async () =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    displayCards(data.data.tools);
}


const displayCards = (aiCard) => {
    
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
              <button class="btn btn-circle btn-outline">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
          </div>
      </div>
        
        `

        itemContainer.appendChild(cardDiv)
    }

        )


    

}


// loadCards('02')

