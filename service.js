const loadAllService = () =>{
    document.getElementById("loader").style.display = "block";
    fetch("https://exi-pet-drf.vercel.app/service/")
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        
        if(data.length > 0){
            
            document.getElementById("loader").style.display = "none";
            displayService(data)
        }
        else{
            document.getElementById("nodata").style.display = "block";
            document.getElementById("loader").style.display = "none";
        }
    })
}
const displayService = (data)=>{
    data.forEach((service)=>{
        const parent = document.getElementById("services-container")
        const div = document.createElement("div")
        div.classList.add("service")
        div.setAttribute("data-aos", "zoom-in-up")
        div.innerHTML=`
            <div class="bg-white rounded-lg overflow-hidden shadow-lg" style="width: 290px;">
                <img src=${service.image} alt="Blog Post 1" class="w-full h-52 object-cover" />
                <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${service.name}</h3>
                <p class="text-gray-600 text-sm">${service.description.slice(0,30)}...</p>
                <a href="service_detail.html?service_id=${service.id}" class="mt-4 inline-block text-blue-600 text-sm hover:underline">Read More</a>
                </div>
            </div>

        `
        parent.appendChild(div)
    })
}
const ServiceDetails = ()=>{
    const param = new URLSearchParams(window.location.search).get("service_id")
    // console.log(param)
    
    fetch(`https://exi-pet-drf.vercel.app/service/${param}`)
    .then((res)=> res.json())
    .then((data)=> {
        // console.log(data)
            const parent = document.getElementById("service-details-container")
            const div = document.createElement("div")
            div.classList.add("service-datils")
            div.innerHTML=`
                <div class="bg-gray-50 w-full rounded-lg font-[sans-serif] overflow-hidden max-w-5xl mx-auto">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 items-center">
                        <img src=${data.image} class="w-full rounded-lg m-4 h-full object-cover shrink-0" />
                        <div class="lg:col-span-2 p-10">
                        <h1 class="text-3xl font-bold text-gray-800">${data.name}</h1>
                        <p class="mt-4 text-sm text-gray-500 leading-relaxed">${data.description}</p>

                        <button type="button"
                            class="px-6 py-3 mt-8 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-black "><a href="./index.html">Back Home</a></button>
                        </div>
                    </div>
                </div>

            `
            parent.appendChild(div)
    })
    
}
const loadDashboard = () =>{
    const user_id = localStorage.getItem("user_id")
    // document.getElementById("dashboard").style.display = "none";
    const dashboardElement = document.getElementById("dashboard");
    if (dashboardElement) {
      dashboardElement.style.display = "none";
    } else {
      return;
    }
    fetch(`https://exi-pet-drf.vercel.app/pet/adoption/?search=${user_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        document.getElementById("loader").style.display = "block";
        if(data && data.length > 0){
            
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("loader").style.display = "none";
            displayDashboard(data)
        }
        else{
            document.getElementById("nodata").style.display = "block";
            document.getElementById("loader").style.display = "none";
        }
    })
}
function adoptionformatDate(dateStr) {
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
const displayDashboard = (data) =>{
    data.forEach((item)=>{           
        const parent = document.getElementById("tb")
        const tr = document.createElement("tr")
        const time = adoptionformatDate(item.adopted_on)
        tr.innerHTML=`
                    <td  class="p-4 text-sm text-black whitespace-nowrap">
                        ${item.transaction_id}
                    </td>
                    <td  class="p-4 text-sm text-black">
                        <img class="h-12 w-12 rounded" src=${item.pet_image} alt="Pet Image">
                    </td>
                    <td  class="p-4 text-sm text-black">
                        ${item.pet_name}
                    </td>
                    <td  class="p-4 text-sm text-black">
                        ${item.pet}
                    </td>
                    <td  class="p-4 text-sm text-black">
                        ${time}
                    </td>
                    <td  class="p-4 text-sm text-black">
                        ${item.pet_price}
                    </td>  
        `
        parent.appendChild(tr)
        
        
    })
}
const contactUs = (event) => {
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

    const form = document.getElementById("contact-us");
    const formData = new FormData(form);
    const postData = {
        name: formData.get("name"),
        email: formData.get("email"),
        problem: formData.get("message"),
    };

    // console.log(postData); 
    const token = localStorage.getItem("token")
    // console.log(token)
    fetch("https://exi-pet-drf.vercel.app/contact_us/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Token ${token}`,

        },
        body: JSON.stringify(postData),
    })
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        // alert("Message sent successfully!");
        showError("Message sent successfully!")
        window.location.href = "./index.html";
    })
    .catch((error) => {
        console.error("Error:", error); 
        // alert("There was a problem sending your message.");
        showError("There was a problem sending your message.")
    });
};

loadAllService()
loadDashboard()