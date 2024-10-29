async function payment(event) {
    event.preventDefault();

    const form = document.getElementById("adoption-form");
    const token = localStorage.getItem("token");
    const petID = localStorage.getItem("pet_id");

    if (!token || !petID) {
        console.error("Token or pet ID is missing.");
        return;
    }

    try {
        const response = await fetch(`https://exi-pet-drf.vercel.app/transaction/payment/initiate/${petID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        });

        const responseData = await response.json();
        
        if (response.ok && responseData.gateway_url) {
            window.location.href = responseData.gateway_url;
        } else {
            console.error(responseData.error || "Payment initiation failed.");
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
    }
}

const chechoutPetDetails = ()=>{
    const petId = localStorage.getItem("pet_id")
    
    fetch(`https://exi-pet-drf.vercel.app/pet/list/${petId}`)
    .then((res)=>res.json())
    .then((data)=> {
        // console.log(data)
        document.getElementById("co-image").src = data.image
        document.getElementById("co-name").innerText = data.name
        document.getElementById("co-type").innerText = data.pet_type
        document.getElementById("co-price").innerHTML = `<span class="p-1 font-mono">BDT</span>${data.price}`
    })
}
const chechoutUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://exi-pet-drf.vercel.app/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("username", data.username); 
        document.getElementById("co-first-name").value = data.first_name 
        document.getElementById("co-last-name").value = data.last_name 
        document.getElementById("co-username").value = data.username
        document.getElementById("co-email").value = data.email
      });
    const customer_id = localStorage.getItem("customer_id");
    fetch(`https://exi-pet-drf.vercel.app/customer/list/${customer_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.phone && data.phone.length > 4) {  
            document.getElementById("co-phone").value = data.phone;
        } else {
            document.getElementById("co-phone").value = ''; 
        }
          document.getElementById("co-address").value = data.address
      });
  };
chechoutPetDetails()
chechoutUserDetails()