function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        day: 'numeric', 
        month: 'long',  
    };
    return date.toLocaleString('en-US', options).replace(" at", "");
}
const loadAllPet = () =>{
    document.getElementById("loader").style.display = "block";
    fetch("https://exi-pet-drf.vercel.app/all_pet/")
    .then((res)=>res.json())
    .then((data)=>{
        
        if(data && data.length > 0){
            document.getElementById("loader").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayAllPet(data)
        }
        else{
            document.getElementById("loader").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        }
    })
}
const loadInitialPet = () =>{
    document.getElementById("loader").style.display = "block";
    fetch("https://exi-pet-drf.vercel.app/all_pet/")
    .then((res)=>res.json())
    .then((data)=>{
        if(data && data.length > 0){
            document.getElementById("loader").style.display = "none";
            document.getElementById("nodata").style.display = "none";
            displayInitialPet(data.slice(0,3))
        }
        else{
            document.getElementById("loader").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        }
    })
}
const displayAllPet = (pets) =>{
    // console.log(pets)
    document.getElementById("all-pet").innerHTML = " "
    const parent = document.getElementById("all-pet")

    pets.forEach((pet)=>{
        const div = document.createElement("div")
        div.classList.add("pet-card")
        const formattedDate = formatDate(pet.created_on);
        div.innerHTML=`
                
                <div class="border border-gray-400 mx-auto md:w-96 lg:w-96 max-w-[100%] transform overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-pink-200 shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                        <div>
                            <img class="h-48 w-full object-cover object-center" src=${pet.image} alt="Product Image" />
                            </div>
                        <div class="p-4 text-center">
                            <div class="w-4/6 mx-auto bg-gray-900 text-red-700 font-mono text-xl rounded-full px-4 py-2 shadow-lg">$${pet.price} </div>
                            <h1 class="mb-3 mt-2 text-2xl font-medium text-gray-900"><strong>${pet.name}</strong> </h1>
                            <p class="mb-2 text-base  text-gray-700">${pet.description.slice(0,40)}...</p>
                            <div class="flex justify-evenly items-center mt-5 cta">
                                <h2 class="font-bold border border-slate-300 bg-lime-50 py-1 px-3 rounded-full shadow-2xl">${pet.adoption_status}</h2>
                                <button type="button"><a class="p-2 text-lg hover-underline-animation font-bold font-mono " href="./pet_details.html?pet_id=${pet.id}">Details --> </a> </button>
                            </div>
                            <div>
                                <p class="text-sm mt-3">Created By <a class="text-red-500 underline" href="">${pet.author}</a> on ${formattedDate}</p>
                            </div>
                        </div>
                    </div>
        
        `
        parent.appendChild(div)
    })
}
const displayInitialPet = (pets) =>{
    // console.log(pets)
    const parent = document.getElementById("initial-pet")
        if (!parent) {
            console.error('Element with ID "initial-pet" not found');
            return;
        }
    if(pets){
        pets.forEach((pet)=>{
            const div = document.createElement("div")
            div.classList.add("pet-card")
            const formattedDate = formatDate(pet.created_on);
            div.innerHTML=`
                    <div class="border border-gray-400 mx-auto mt-11 mb-10 md:w-96 lg:w-96 max-w-[100%] transform overflow-hidden rounded-xl bg-gradient-to-r from-slate-50 to-pink-200 shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                        <div>
                            <img class="h-48 w-full object-cover object-center" src=${pet.image} alt="Product Image" />
                            </div>
                        <div class="p-4 text-center">
                            <div class="w-4/6 mx-auto bg-gray-900 text-red-700 font-mono text-xl rounded-full px-4 py-2 shadow-lg">$${pet.price} </div>
                            <h1 class="mb-3 mt-2 text-2xl font-medium text-gray-900"><strong>${pet.name}</strong> </h1>
                            <p class="mb-2 text-base text-gray-700">${pet.description.slice(0,40)}...</p>
                            <div class="flex justify-evenly items-center mt-5 cta">
                                <h2 class="font-bold border border-slate-300 bg-lime-50 py-1 px-3 rounded-full shadow-2xl">${pet.adoption_status}</h2>
                                <button type="button"><a class="p-2 text-lg hover-underline-animation font-bold font-mono " href="./pet_details.html?pet_id=${pet.id}">Details --> </a> </button>
                            </div>
                            <div>
                                <p class="text-sm mt-3">Created By <a class="text-red-500 underline" href="">${pet.author}</a> on ${formattedDate}</p>
                            </div>
                        </div>
                    </div>
                    
                        
            `
            parent.appendChild(div)
        })
    }
}
const loadPetCategoryWise = (search) =>{
    // console.log(search)
    document.getElementById("loader").style.display = "block";
    document.getElementById("nodata").style.display = "none";
    fetch(`https://exi-pet-drf.vercel.app/pet/list/?search=${search? search : "" }`)
    .then((res)=>res.json())
    .then((data)=>{
        // displayPetCategoryWise(data?.results)
        if(data && data.length > 0){     
            document.getElementById("loader").style.display = "none";
            displayAllPet(data)
        }
        else{
            document.getElementById("all-pet").innerHTML = " "
            document.getElementById("nodata").style.display = "block";
            document.getElementById("loader").style.display = "none";
        }
        
    })
}
const getParam = () =>{
    const param = new URLSearchParams(window.location.search).get("page")
    // console.log(param)
    loadPetPageBy(param)
}
// const loadPetPageBy = (search) =>{
//     console.log(search)
//     fetch(`http://127.0.0.1:8000/pet/list/?page=${search? search : "" }`)
//     .then((res)=>res.json())
//     .then((data)=>{
//         displayPetCategoryWise(data?.results)
//     })
// }
const displayPetCategoryWise = (pets) =>{
    // console.log(pets)
    document.getElementById("category-pet").innerHTML = ""
    pets.forEach((pet)=>{
        const parent = document.getElementById("category-pet")
        const div = document.createElement("div")
        div.classList.add("pet-card")
        div.innerHTML=`
                <div class="mx-auto bg-gray-200 mt-11 w-96 transform overflow-hidden rounded-lg bg-white shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                    <img class="h-48 w-full object-cover object-center" src=${pet.image} alt="Product Image" />
                    <div class="p-4 ">
                        <h1 class="mb-2 text-lg font-medium text-gray-900"><strong>${pet.name}</strong> </h1>
                        <p class="mb-2 text-base text-gray-700">${pet.description.slice(0,50)}...</p>
                        <div class="flex justify-evenly items-center">
                            <p class="mr-2 text-lg font-semibold text-gray-900">$${pet.price}</p>
                            <h2 class="font-bold ">${pet.adoption_status }</h2>
                        </div>
                        <div class="flex mt-7">
                            <button type="button" class="w-1/2 focus:outline-none text-white bg-black hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"><a href="./pet_details.html?pet_id=${pet.id}">Details</a></button>
                        </div>
                        
                    </div>
                </div> 
        
        `
        parent.appendChild(div)
    })
}
const loadAllPetType = () =>{
    fetch("https://exi-pet-drf.vercel.app/pet/types/")
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        if(data){
            data.forEach((type)=>{
                const parent = document.getElementById("pet-types")
                const div = document.createElement("div")
                div.classList.add("pet-ty")
                div.innerHTML=`               
                    <p type="button" onclick="loadPetCategoryWise('${type.name}')"
                        class="category-btn font-mono font-bold">${type.name}
                    </p>            
                `
              parent.appendChild(div)
            })
        }   
    })
}
const loadPetTypePost = () =>{
    const token = localStorage.getItem("token")
    fetch("https://exi-pet-drf.vercel.app/pet/types/",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Token ${token}`,},
    })
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        data.forEach((item)=>{
            // console.log(item) 
            const parent = document.getElementById("pet-type")
            const option = document.createElement("option")

            option.value = item.name
            option.innerHTML = item.name

            parent.appendChild(option)
        })
    })
}
const loadPetTypeEdit = () =>{
    const token = localStorage.getItem("token")
    fetch("https://exi-pet-drf.vercel.app/pet/types/",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Token ${token}`,}
    })
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        data.forEach((item)=>{
            // console.log(item) 
            const ed_parent = document.getElementById("ed-pet-type")
            const ed_option = document.createElement("option")

            ed_option.value = item.name
            ed_option.innerHTML = item.name

            ed_parent.appendChild(ed_option)
        })
    })
}
const loadAllMember = () =>{
    fetch("https://exi-pet-drf.vercel.app/member/")
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        data.forEach((member)=>{
            const parent = document.getElementById("team_members")
            const div = document.createElement("div")
            div.classList.add("member")
            div.innerHTML=`
                <div class="bg-slate-200 rounded-lg p-6 shadow-md hover:scale-105 transition-all duration-500" style="width:290px;">
                    <div class="lg:min-h-[250px]">
                        <img src=${member.image} class="rounded-full border-4 border-white shadow-xl w-[230px] h-[230px] inline-block" />
                    </div>

                    <div class="mt-6">
                        <h4 class="text-gray-800 text-lg font-bold">${member.name}</h4>
                        <p class="text-sm text-gray-600 mt-1">${member.type}</p>

                        <div class="space-x-4 mt-6">
                            <button type="button"
                                class="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-gray-100 hover:bg-gray-200">
                                <i class="fa-brands fa-facebook"></i>
                            </button>
                            <button type="button"
                                class="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none  bg-gray-100 hover:bg-gray-200">
                                <i class="fa-brands fa-twitter"></i>
                            </button>
                            <button type="button"
                                class="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none  bg-gray-100 hover:bg-gray-200">
                                <i class="fa-brands fa-linkedin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `
            parent.appendChild(div)
        })
    })
}

document.addEventListener("DOMContentLoaded", function() {  
    loadInitialPet()
    loadAllPetType();
    loadAllPet()
    loadAllMember();
    displayInitialPet();
});
document.addEventListener("DOMContentLoaded", () => {
    loadPetTypePost();
    loadPetTypeEdit()
});

const loadUserProNav = () => {
    const user_id = localStorage.getItem("user_id");
  
    fetch(`https://exi-pet-drf.vercel.app/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("p-btn-name").innerText = `${data.first_name } ${data.last_name}`
        document.getElementById("p-btn-email").innerText = data.email
      });
    const customer_id = localStorage.getItem("customer_id");
    fetch(`https://exi-pet-drf.vercel.app/customer/list/${customer_id}`)
      .then((res) => res.json())
      .then((data) => {
          document.getElementById("p-btn-img").src = `${data.image}`;
          document.getElementById("p-btn-img2").src = `${data.image}`;
      });
  };
loadUserProNav()
 
