const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");

  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("username", data.username);
      // console.log(data)
      document.getElementById("p-first_name").value = data.first_name 
      document.getElementById("p-last_name").value = data.last_name 
      document.getElementById("p-username").value = data.username
      document.getElementById("p-email").value = data.email
      
    });
  const customer_id = localStorage.getItem("customer_id");
  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/list/${customer_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      document.getElementById("p-phone").value = data.phone
        document.getElementById("p-address").value = data.address

        document.getElementById("img").src = `${data.image}`;
        document.getElementById("p-btn-img").src = `${data.image}`;
        document.getElementById("curr-p-img").value = data.image;
        
        document.getElementById("p-balance").innerText = `$${data.balance}`;

        localStorage.setItem('user_type',data.user_type)
    });
};
const loadCustomerId = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/list/?search=${user_id}`)
    .then((res) => res.json())
    .then((data) => localStorage.setItem("customer_id", data[0].id));
};
// const changePass = (event) => {
//   event.preventDefault();

//   const errorContainer = document.getElementById("error-container");
//     const errorElement = document.getElementById("error");
//     const hideToast = () => {
//       setTimeout(() => {
//           errorContainer.classList.add("hidden");
//       }, 3000);  
//     };
//     const showError = (message) => {
//       errorElement.innerText = message;
//       errorContainer.classList.remove("hidden");  
//       hideToast(); 
//     };

//   const oldPassword = document.getElementById("old-password").value;
//   const newPassword = document.getElementById("new-password").value;
//   const token = localStorage.getItem("token");
//   // console.log(token);
//   const data = {
//     old_password: oldPassword,
//     new_password: newPassword,
//   };
//   // console.log(data);

//   fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/pass_change/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`,
//     },
//     body: JSON.stringify(data),
//   })
//   .then((res) => res.json())
//   .then((data) => {
//       if (data.success) {
//         // alert("Password changed successfully!");
//         showError("Password changed successfully!")
//         window.location.href = "./profile.html";
//       } else {
//         // alert("Password change failed: " + (data.error || "Unknown error"));
//         showError("Password change failed: " + (data.error || "Unknown error"))
//       }
//   })
//   .catch((err) => {
//       console.error(err);
//       // alert("An error occurred while changing the password.");
//       showError("An error occurred while changing the password.")
//   });
// };
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

  fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/pass_change/", {
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
    });
};

const deposit = (event) => {
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
      if (data.success) {
        showError("Deposit successful!");
        setTimeout(() => {
          window.location.href = "./profile.html";
        }, 3000);  
      } else {
        showError("Deposit failed: " + (data.error || "Unknown error"));
      }
    })
    .catch((err) => {
      console.error(err);
      showError("An error occurred while processing the deposit.");
    });
    
};
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("deposit-form").addEventListener("submit", deposit);
});

const withdraw = (event) => {
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
      if (data.success) {
        showError("Withdraw successful!");
        setTimeout(() => {
          window.location.href = "./profile.html";
        }, 3000);  
      } else {
        showError("Withdraw failed: " + (data.error || "Unknown error"));
      }
    })
    .catch((err) => {
      console.error(err);
      showError("An error occurred while processing the withdraw.");
    });
    
};
const availablePet = () =>{
  const userId = localStorage.getItem("user_id")
  document.getElementById("available").style.display = "none";
  fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/pet/list/?adoption_status=Available&author=${userId}`)
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
  document.getElementById("adopted").style.display = "none";
    fetch(`https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/pet/adoption/?search=${user_id}`)
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

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("withdraw-form").addEventListener("submit", withdraw);
});

loadUserDetails();
loadCustomerId();
availablePet()
adoptedPet()
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
