const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id);

  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("username", data.username);
      // console.log(data)
      document.getElementById(
        "profile-username"
      ).innerText = `${data.first_name} ${data.last_name}`;
      const parent = document.getElementById("profile-details");
      const div = document.createElement("profile-all");
      div.classList.add("profile-all");
      div.innerHTML = `
                <div class="user-img mb-12 pb-12">
                    <img id="profile-card-img" class="object-fill  w-full " src="" alt="" />
                </div>
                <div class="mt-11 font-mono  ">
                    <h2 class="text-4xl mb-5  text-center my-5">${data.first_name} ${data.last_name}</h2>
                    <div>
                      <h6 class="leading-none m-2 text-lg text-gray-900 "><strong>Username:</strong> ${data.username}</h6>
                      <h4 class="m-2 " ><strong>Email:</strong> ${data.email}</h4>
                      <h4 class="m-2 " ><strong>Balance:  $ </strong><span class="font-bold" id="balance"></span></h4>
                    </div>
                </div>      
        
        `;
      parent.appendChild(div);
    });
  const customer_id = localStorage.getItem("customer_id");
  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/list/${customer_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      document.getElementById("balance").innerText = `${data.balance}`;
      document.getElementById("profile-img").src = `${data.image}`;
      document.getElementById("profile-card-img").src = `${data.image}`;
    });
};
const loadCustomerId = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/list/?search=${user_id}`)
    .then((res) => res.json())
    .then((data) => localStorage.setItem("customer_id", data[0].id));
};
const changePass = (event) => {
  event.preventDefault();

  const oldPassword = document.getElementById("old_password").value;
  const newPassword = document.getElementById("new_password").value;
  const token = localStorage.getItem("token");
  // console.log(token);
  const data = {
    old_password: oldPassword,
    new_password: newPassword,
  };
  // console.log(data);

  fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/pass_change/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (window.location.href = "./profile.html"));
};

const deposit = (event) => {
  event.preventDefault();
  const form = document.getElementById("deposit-form");
  const formData = new FormData(form);
  const data = {
    amount: formData.get("deposit"),
  };

  // console.log(data);
  const token = localStorage.getItem("token");
  fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/transaction/deposit/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Message sent successfully!");
      window.location.href = "./profile.html";
    })
    
};
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("deposit-form").addEventListener("submit", deposit);
});

// document.getElementById("deposit-form").addEventListener("submit", deposit);

const withdraw = (event) => {
  event.preventDefault();
  const form = document.getElementById("withdraw-form");
  const formData = new FormData(form);
  const data = {
    amount: formData.get("withdraw"),
  };

  console.log(data);
  const token = localStorage.getItem("token");
 
  fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/transaction/withdraw/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Message sent successfully!");
      window.location.href = "./profile.html";
    })
    
};

const availablePet = () =>{
  const userId = localStorage.getItem("user_id")
  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/pet/list/?adoption_status=Available&author=${userId}`)
  .then((res) => res.json())
  .then((data)=>{
    // console.log(data)
    data.forEach((pet)=>{
      const parent = document.getElementById("available-pets")
      const div = document.createElement("div")
      div.classList.add("av-pet")
      div.innerHTML=`
            <div class="w-full mx-auto mt-11 mb-10 w-96 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                    <img class="h-48 w-full object-cover object-center" src=${pet.image} alt="Product Image" />
                    <div class="p-2 text-center">
                        <h1 class=" dark:text-white text-gray-900"><strong>${pet.name}</strong> </h1>
                        <button type="button" class="bg-black text-sm font-mono text-center text-green-300 hover:text-white px-4 py-1 m-1 font-extrabold rounded-full"><a href="./pet_details.html?pet_id=${pet.id}">Details</a> </button>
                    </div>
                </div> 
      `
      parent.appendChild(div)
    })
  })
}
const adoptedPet = () =>{
  const user_id = localStorage.getItem("user_id")
    fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/pet/adoption/?search=${user_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        data.forEach((item)=>{        
          // console.log(item)   
            const parent = document.getElementById("my-adoption")
            const div = document.createElement("div")
            div.classList.add("av-pet")
            div.innerHTML=`
                  <div class="w-full mx-auto mt-11 mb-10 w-96 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                          <img class="h-48 w-full object-cover object-center" src=${item.pet_image} alt="Product Image" />
                          <div class="p-2 text-center">
                              <h1 class=" dark:text-white text-gray-900"><strong>${item.pet_name}</strong> </h1>
                              <button type="button" class="bg-black text-sm font-mono text-center text-green-300 hover:text-white px-4 py-1 m-1 font-extrabold rounded-full"><a href="./review.html?pet_id=${item.pet}">Review</a> </button>
                          </div>
                      </div> 
            `
            parent.appendChild(div)        
                            
            
        })
    })

}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("withdraw-form").addEventListener("submit", withdraw);
});

// document.getElementById("withdraw-form").addEventListener("submit", withdraw);

loadUserDetails();
loadCustomerId();
availablePet()
adoptedPet()
// document.querySelector('[data-drawer-show="drawer-navigation"]').click();
document.addEventListener("DOMContentLoaded", function () {
  const drawerButton = document.querySelector(
    '[data-drawer-show="drawer-navigation"]'
  );
  if (drawerButton) {
    drawerButton.click();
  } else {
    console.error(
      "Element with data-drawer-show='drawer-navigation' not found."
    );
  }
});

// Dropdown
document.addEventListener("click", closeOpenDropdowns);


let dropdownToggle = document.getElementById('dropdownToggle');
let dropdownMenu = document.getElementById('dropdownMenu');

function handleClick() {
    if (dropdownMenu.className.includes('block')) {
        dropdownMenu.classList.add('hidden')
        dropdownMenu.classList.remove('block')
    } else {
        dropdownMenu.classList.add('block')
        dropdownMenu.classList.remove('hidden')
    }
}
document.addEventListener("DOMContentLoaded", function() {
  dropdownToggle.addEventListener('click', handleClick);
});
// dropdownToggle.addEventListener('click', handleClick);

