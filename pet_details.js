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
    
    fetch(`https://exipet-drf-api.onrender.com/pet/list/${param}`)
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
        document.getElementById("pd-price").innerText = data.price
        document.getElementById("pd-description").innerText = data.description
        document.getElementById("pd-author").innerText = data.author
        document.getElementById("pd-created-on").innerText = data.created_on

            const adoptionStatus = data.adoption_status;
            const adoptBTN = document.getElementById("adopt-btn");

            if (adoptionStatus === "Adopted") {
                adoptBTN.innerHTML =`<a href="#" class="bg-black text-xl font-mono text-center text-green-300 hover:text-white px-7 py-3 font-extrabold rounded-full">Already Adopted</a>`;
            } else {
                adoptBTN.innerHTML = `<a href="#" class="bg-black text-xl font-mono text-center text-green-300 hover:text-white px-7 py-3 font-extrabold rounded-full">Adopt Now</a>`;
            }
    })
    
}
const loadReview = () =>{
    const param = new URLSearchParams(window.location.search).get("pet_id")
    fetch(`https://exipet-drf-api.onrender.com/customer/review/?search=${param}`)
    .then((res)=>res.json())
    .then((data)=> {
        data.forEach((review) =>{
            // console.log(review)
            const parent = document.getElementById("pet-all-review")
            const div = document.createElement("div")
            div.classList.add("review")
            div.innerHTML =`
                <p class="text-xs text-2xl font-bold font-mono my-2">${review.rating}</p>
                <p class="text-sm text-gray-800 text-lg font-mono font-semibold"><strong>${review.reviewer}:</strong> ${review.body}</p>
                <p class="text-xs text-gray-500 mt-0.5">${review.created_on}</p>
            `
            parent.appendChild(div)
        })
    })
}
// Conditional button
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const petId = localStorage.getItem("pet_id");

    const detailsBTN = document.getElementById("details-btn")
   
    fetch(`https://exipet-drf-api.onrender.com/pet/post/${petId}/`, {
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

    const apiUrl = `https://exipet-drf-api.onrender.com/pet/adopt/${petId}`;

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    };

    try {
        const response = await fetch(apiUrl, requestOptions);

        if (response.ok) {
            const data = await response.json();
            alert("Adoption successful")
            console.log("Adoption successful:", data);
            window.location.href = "dashboard.html"
        } else if (response.status === 404) {
            alert("Pet not found or already adopted.")
            console.error("Error: Pet not found or already adopted.");
        } else if (response.status === 400) {
            const errorData = await response.json();
            alert("Insufficient balance or other error")
            console.error("Insufficient balance or other error:", errorData);
        } else {
            const errorData = await response.json();
            alert("Unexpected error during adoption")
            console.error("Unexpected error during adoption:", errorData);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}

document.getElementById('adopt-btn').addEventListener('click', adoptPet);


getParams()
loadReview()