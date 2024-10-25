function formatDate2(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
    };
    return date.toLocaleString('en-US', options).replace(" at", "");
}
const getParams = ()=>{
    const param = new URLSearchParams(window.location.search).get("pet_id")
    localStorage.setItem("pet_id",param)
    
    fetch(`https://exi-pet-drf.vercel.app/pet/list/${param}`)
    .then((res)=>res.json())
    .then((data)=> {
        // console.log(data)
        const formattedDate2 = formatDate2(data.created_on);

        localStorage.setItem("pet_price", data.price)

        document.getElementById("pd-image").src = data.image
        document.getElementById("pd-name").innerText = data.name
        document.getElementById("pd-adoption-status").innerText = data.adoption_status
        document.getElementById("pd-pet-type").innerText = data.pet_type
        document.getElementById("pd-gender").innerText = data.gender
        document.getElementById("pd-age").innerText = data.age
        document.getElementById("pd-price").innerHTML = `<span class="p-1 font-mono">BDT</span>${data.price}`
        document.getElementById("pd-description").innerText = data.description
        document.getElementById("pd-author").innerText = data.author
        document.getElementById("pd-created-on").innerText = data.created_on

            const adoptionStatus = data.adoption_status;
            const adoptBTN = document.getElementById("adopt-btn");
            const token = localStorage.getItem('token')
            if (adoptionStatus === "Adopted" || !token) {
                adoptBTN.innerHTML = " ";
            } else {
                adoptBTN.innerHTML = `<a href="#" class="bg-black text-xl text-nowrap font-mono text-center text-green-300 hover:text-white px-7 py-3 font-extrabold rounded-full">Adopt Now</a>`;
            }
    })
    
}
const loadReview = () =>{
    const param = new URLSearchParams(window.location.search).get("pet_id")
    fetch(`https://exi-pet-drf.vercel.app/customer/review/?search=${param}`)
    .then((res)=>res.json())
    .then((data)=> {
        if(data && data.length > 0){  
            data.forEach((review) =>{
                const formattedDate = formatDate2(review.created_on);
                // console.log(review)
                const parent = document.getElementById("pet-all-review")
                const div = document.createElement("div")
                div.classList.add("review")
                div.innerHTML =`
                    <p class="text-xs text-2xl font-bold font-mono my-2 text-pink-400 ">${review.rating}</p>
                    <p class="text-sm text-gray-800 text-lg font-mono font-semibold"><strong>${review.reviewer}:</strong> ${review.body}</p>
                    <p class="text-xs text-gray-500 mt-0.5">${formattedDate}</p>
                `
                parent.appendChild(div)
            })
        }
        else{
            document.getElementById("pet-all-review").innerHTML = `<p class="text-center font-bold text-red-500 m-auto text-xl">No Review Yet</p>`;
        }
    })  
}
// Conditional button
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const petId = localStorage.getItem("pet_id");

    const detailsBTN = document.getElementById("details-btn")
   
    fetch(`https://exi-pet-drf.vercel.app/pet/post/${petId}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.author === userName) {
            detailsBTN.innerHTML = `
                <a href="./editPost.html?pet_id=${data.id}" id="edit-pet" class=" text-xl font-mono text-center m-3 border-b-4 border-black hover:border-gray-200 p-1 font-extrabold">Edit</a>
                <a href="./addpost.html" class=" text-xl font-mono text-center m-3 border-b-4 border-black hover:border-gray-200 p-1 font-extrabold ">Add New</a>
                <button type="submit" onclick="deletePet()" id="delete-pet" class=" text-xl font-mono text-center text-red-700 m-3 border-b-4 border-black hover:border-red-700 p-1 font-extrabold ">Delete</button>             
            `
        } else {
            detailsBTN.innerHTML=`
                <a href="./addpost.html" class=" text-xl font-mono text-center m-3 border-b-4 border-black hover:border-gray-200 p-1 font-extrabold ">Add New</a>

            `
        }
    })
    .catch((error) => {
        console.error("Error fetching pet details:", error);
    });
});

async function adoptPet(event) {
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

    const petId = localStorage.getItem('pet_id');
    const token = localStorage.getItem('token');

    if (!petId) {
        console.error("No pet_id found in localStorage.");
        return;
    }

    if (!token) {
        console.error("No token found in localStorage.");
        return;
    }

    const apiUrl = `https://exi-pet-drf.vercel.app/pet/adopt/${petId}`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    try {
        const response = await fetch(apiUrl, requestOptions);

        // if (response.ok) {
        //     const data = await response.json();
        //     showError("Adoption successful")
        //     console.log("Adoption successful:", data);
        //     window.location.href = "dashboard.html"
        // } 
        if (response.ok) {
            const data = await response.json();
            showError("Adoption successful");
            setTimeout(() => {
                window.location.href = "history.html";
            }, 2000);  // Add delay before redirecting
            console.log("Adoption successful:", data);
        }else if (response.status === 404) {
            showError("Pet not found or already adopted.")
            console.error("Error: Pet not found or already adopted.");
        } else if (response.status === 400) {
            const errorData = await response.json();
            showError("Insufficient balance or other error")
            console.error("Insufficient balance or other error:", errorData);
        } else {
            const errorData = await response.json();
            showError("Unexpected error during adoption")
            console.error("Unexpected error during adoption:", errorData);
        }
    } catch (error) {
        console.error("Network error:", error);
        showError("Network error:" + error)
    }
}


document.getElementById('adopt-btn').addEventListener('click', adoptPet);
// Pet Category
document.addEventListener('DOMContentLoaded', function () {
    let tabs = document.querySelectorAll('.tab');
    let contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            let targetId = tab.id.replace('Tab', 'Content');

            // Hide all content divs
            contents.forEach(function (content) {
                content.classList.add('hidden');
            });

            // Remove active class from all tabs
            tabs.forEach(function (tab) {
                tab.classList.remove('text-blue-600', 'font-bold', 'bg-gray-50', 'border-blue-600');
                tab.classList.add('text-gray-600', 'font-semibold');
            });

            // Show the target content
            document.getElementById(targetId).classList.remove('hidden');

            // Add active class to the clicked tab
            tab.classList.add('text-blue-600', 'font-bold', 'bg-gray-50', 'border-blue-600');
            tab.classList.remove('text-gray-600', 'font-semibold');
        });
    });
});

getParams()
loadReview()