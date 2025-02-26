const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");

  fetch(`https://exi-pet-drf.vercel.app/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("username", data.username);
      // console.log(data)
      document.getElementById("p-first_name").value = data.first_name 
      document.getElementById("p-last_name").value = data.last_name 
      document.getElementById("p-username").value = data.username
      document.getElementById("p-email").value = data.email
      
    });
  fetch(`https://exi-pet-drf.vercel.app/customer/list/?user=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data[0])
        if (data[0].phone && data[0].phone.length > 4) {  
          document.getElementById("p-phone").value = data[0].phone;
      } else {
          document.getElementById("p-phone").value = ''; 
      }
        document.getElementById("p-address").value = data[0].address

        document.getElementById("img").src = `${data[0].image}`;
        document.getElementById("p-btn-img").src = `${data[0].image}`;
        document.getElementById("curr-p-img").value = data[0].image;

        localStorage.setItem('user_type',data[0].user_type)
        console.log(data[0].user_type)
    });
};

const changePass = (event) => {
  event.preventDefault();

  const errorContainer = document.getElementById("error-container");
  const errorElement = document.getElementById("error");
  const hideToast = () => {
    setTimeout(() => {
      errorContainer.classList.add("hidden");
    }, 3000);
  };
  const showError = (message) => {
    errorElement.innerText = message;
    errorContainer.classList.remove("hidden");
    hideToast();
  };

  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const token = localStorage.getItem("token");

  const data = {
    old_password: oldPassword,
    new_password: newPassword,
  };

  fetch("https://exi-pet-drf.vercel.app/customer/pass_change/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.detail === "Password updated successfully.") {  
        showError("Password changed successfully!");
        setTimeout(() => {
          window.location.href = "./profile.html";  
        }, 1000);
      } else if (data.old_password || data.new_password) {
        showError(`Error: ${data.old_password || data.new_password}`);
      } else {
        showError("Password change failed: " + (data.detail || "Unknown error"));
      }
    })
    .catch((err) => {
      console.error(err);
      showError("An error occurred while changing the password.");
    })
}

const availablePet = () =>{
  const userId = localStorage.getItem("user_id")
  // document.getElementById("available").style.display = "none";
  const availableElement = document.getElementById("available");
  if (availableElement) {
    availableElement.style.display = "none";
  } else {
    return;
  }
  fetch(`https://exi-pet-drf.vercel.app/pet/list/?adoption_status=Available&author=${userId}`)
  .then((res) => res.json())
  .then((data)=>{
    // console.log(data)
    if(data && data.length > 0){
      document.getElementById("available").style.display = "block";
      data.forEach((pet)=>{
        const parent = document.getElementById("available-pets")
        const div = document.createElement("div")
        div.classList.add("av-pet")
        div.innerHTML=`
              <div class="w-full mx-auto mt-11 mb-10 w-96 transform overflow-hidden rounded-lg bg-white shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                      <img class="h-48 w-full object-cover object-center" src=${pet.image} alt="Product Image" />
                      <div class="p-2 text-center">
                          <h1 class=" text-gray-900"><strong>${pet.name}</strong> </h1>
                          <button type="button" class="bg-black text-sm font-mono text-center text-green-300 hover:text-white px-4 py-1 m-1 font-extrabold rounded-full"><a href="./pet_details.html?pet_id=${pet.id}">Details</a> </button>
                      </div>
                  </div> 
        `
        parent.appendChild(div)
      })
    }
    
  })
}
const adoptedPet = () =>{
  const user_id = localStorage.getItem("user_id")
  // document.getElementById("adopted").style.display = "none";
  const adoptedElement = document.getElementById("adopted");
  if (adoptedElement) {
    adoptedElement.style.display = "none";
  } else {
    return;
  }
    fetch(`https://exi-pet-drf.vercel.app/pet/adoption/?search=${user_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        if(data && data.length > 0){
          document.getElementById("adopted").style.display = "block";
          data.forEach((item)=>{        
            // console.log(item)   
              const parent = document.getElementById("my-adoption")
              const div = document.createElement("div")
              div.classList.add("av-pet")
              div.innerHTML=`
                    <div class="w-full mx-auto mt-11 mb-10 w-96 transform overflow-hidden rounded-lg bg-white  shadow-lg duration-300 hover:scale-105 hover:shadow-lg">
                            <img class="h-48 w-full object-cover object-center" src=${item.pet_image} alt="Product Image" />
                            <div class="p-2 text-center">
                                <h1 class=" text-gray-900"><strong>${item.pet_name}</strong> </h1>
                                <button type="button" class="bg-black text-sm font-mono text-center text-green-300 hover:text-white px-4 py-1 m-1 font-extrabold rounded-full"><a href="./review.html?pet_id=${item.pet}">Review</a> </button>
                            </div>
                        </div> 
              `
              parent.appendChild(div)         
          })
        } 
    })
}

loadUserDetails();
loadCustomerId();
availablePet()
adoptedPet()
