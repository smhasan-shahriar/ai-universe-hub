const itemContainer = document.getElementById('item-container');
const loadingCircle = document.getElementById('loading-circle');
const moreButton = document.getElementById('btn-more');

const loadCards = async (moreClicked) =>{
    loadingSign();
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    const dataSorted = data.data.tools;
    dataSorted.sort((a, b) => {
      const dateA = new Date(a.published_in.split('/').reverse().join('/'));
      const dateB = new Date(b.published_in.split('/').reverse().join('/'));
      return dateB - dateA;
    });
    displayCards(dataSorted, moreClicked);
  


}


const displayCards = (aiCard, moreClicked) => {
    
    if(!moreClicked){
        aiCard = aiCard.slice(0,6);
    }
    else{
        itemContainer.innerHTML = '';
    }
    

    aiCard.forEach(card =>{
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
      <div style="border-radius: 16px;
      border: 1px solid rgba(17, 17, 17, 0.10);
      background: #FFF;" class="p-6 space-y-6">
          <!-- image container -->
          <div>
              <img class="rounded-2xl h-[300px] object-cover" src="${card?.image}" alt="">
          </div>
          <!-- text container  -->
          <div>
              <h2 class="text-2xl font-semibold mb-4">Features</h2>
              <ol id="ol_${card.id}" class="list-decimal list-inside">
              </ol>
          </div>
          <hr>
          <!-- card footer  -->
          <div class="flex justify-between items-center">
              <div>
                  <h2 class="text-2xl font-semibold mb-4">${card.published_in}</h2>
                  <div class="font-medium flex">
                  <img src="frame.svg" alt=""> <span class="ml-2">${card.name}</span>
              </div>
              </div>
              <button class="btn btn-circle" onclick="modalInfoLoader('${card.id}', this); my_modal_${card.id}.showModal()">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <dialog id="my_modal_${card.id}" class="modal">

          </dialog>
          </div>
      </div>
        
        `
        itemContainer.appendChild(cardDiv)
        const featureList = document.getElementById(`ol_${card.id}`)
        card.features.forEach(item=>{
          const li = document.createElement('li');
          li.innerText = item;
          featureList.appendChild(li);
          
        })
        
        
        
      
    }
    
   
        )

    loadingCircle.classList.add('hidden');
    moreButton.classList.remove('hidden');


    

}

const buttonCheck = (target) => {
    console.log(target)
}

const loadingSign = () =>{
    loadingCircle.classList.remove('hidden');
}


const seeAllLoader = () => {
    loadCards(true);
}





const modalInfoLoader = async (id , target) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await response.json();
    modalOpener(data.data, target);
}


const modalOpener = (item, target) =>{

    target.parentNode.childNodes[5].innerHTML = `<form method="dialog" class="modal-box max-w-[1250px] relative">
    <!-- modal left and right side container  -->
    <div class="grid grid-cols-2 gap-5 p-28">
      <!-- modal left side container  -->
      <div
        style="
          background: rgba(235, 87, 87, 0.05);
          border: 1px solid #eb5757;
        "
        class="w-full rounded-2xl p-8 space-y-6"
      >
        <h2 class="text-2xl font-semibold">
          ${item.description}
        </h2>
        <!-- middle buttons container  -->
        <div class="grid grid-cols-3 text-center gap-4">
          <p
            class="bg-white rounded-2xl text-colorGreen font-bold px-6 py-5"
          >
            $10/ <br />
            month <br />Basic
          </p>
          <p
            style="color: #f28927"
            class="bg-white rounded-2xl font-bold px-6 py-5"
          >
            $50/ <br />
            month <br />Pro
          </p>
          <p
            class="bg-white rounded-2xl text-colorPrimary font-bold px-6 py-5"
          >
            Contact <br />
            us <br />Enterprise
          </p>
        </div>
        <!-- modal left bottom container  -->
        <div class="flex gap-4">
          <div>
            <h2 class="text-2xl font-semibold mb-4">Features</h2>
            <ul id="list${item.id}" class="list-inside list-disc">
            </ul>
          </div>
          <div>
            <h2 class="text-2xl font-semibold mb-4">Integrations</h2>
            <ul id="integration${item.id}" class="list-inside list-disc">
            </ul>
          </div>
        </div>
      </div>
      <!-- modal right side container  -->
      <div
        style="border: 1px solid #e7e7e7"
        class="rounded-2xl p-6 text-center"
      >
        <div>
          <img
            class="w-full rounded-2xl"
            src=${item.image_link[0]}
            alt=""
          />
        </div>
        <div>
          <h2 class="text-2xl font-semibold mt-6 mb-4">
            Hi, how are you doing today?
          </h2>
          <p>
            I'm doing well, thank you for asking. How can I <br />
            assist you today?
          </p>
        </div>
      </div>
    </div>
    <div class="modal-action absolute top-[-10px] right-3">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </form>`
  
    const featureList = document.getElementById(`list${item.id}`)
    const integrationList = document.getElementById(`integration${item.id}`)
    for(feature in item.features){
      console.log(item.features[feature].feature_name);
      const li = document.createElement('li');
      li.innerText = item.features[feature].feature_name;
      featureList.appendChild(li);
    }
    console.log(item.integrations)
    item.integrations.forEach(item => {
      const li = document.createElement('li');
      li.innerText = item; 
      integrationList.appendChild(li);
    })


}


