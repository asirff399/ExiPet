const handelRegistration = (event) => {
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

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
   
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };
    console.log(info)

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {          
            
            fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/register/",{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify(info)
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to register!");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                alert("Check your confirmation email!");
                showError("Registration successfull!");
            })
            .catch((error) => {
                console.error(error);
                showError("Registration failed. Please try again.");
            });               
        } else {
          showError("Password must contain eight characters, at least one letter, one number, and one special character.");
        }
    } else {
      showError("Password and confirm password don't match.");
    }
    
};
const getValue=(id)=>{
    const value = document.getElementById(id).value
    return value
}
const handleLogin = (event) =>{
    event.preventDefault()
    const errorContainer = document.getElementById("error-container");
    const errorElement = document.getElementById("error");
    const hideToast = () => {
      setTimeout(() => {
          errorContainer.classList.add("hidden");
      }, 3000);  
    };

    const username = getValue("login-username")
    const password = getValue("login-password")
    console.log(username,password)
    if(username,password){
        fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/login/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username,password}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if (data.error) {
                errorElement.innerText = data.error;
                errorContainer.classList.remove("hidden");  
                hideToast();
            } 
              if (data.token && data.user_id) {
                  errorElement.innerText = "Logged in Successfully!"
                  errorContainer.classList.remove("hidden"); 
                  hideToast();

                  localStorage.setItem("token", data.token);
                  localStorage.setItem("user_id", data.user_id);
                  window.location.href = "./index.html";
              }
        })
        .catch((err) => {
          errorElement.innerText = "An error occurred. Please try again later.";
          errorContainer.classList.remove("hidden"); 
          console.error("Error during login:", err);
          hideToast();
      });
        
    }else{
      errorElement.innerText = "Please provide both username and password.";
      errorContainer.classList.remove("hidden");
      errorContainer.classList.add("text-red-900");
      hideToast();
    }
}
const handleLogout = () =>{
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
    const token = localStorage.getItem("token")
    fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/logout/",{
        method:"POST",
        headers:{
            Authorization:`Token ${token}`,
            "content-type":"application/json",
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        showError('Logged out successfully')
        window.location.href = "./index.html"
    })

}
const handleReview = async (event) =>{
    event.preventDefault()
    const pet_id = new URLSearchParams(window.location.search).get("pet_id")
    const userId = localStorage.getItem("user_id")
    const token = localStorage.getItem("token")
    const message = getValue("message")
    const ratingValue = getValue("rating")

    const starRatings = ['✮', '✮✮', '✮✮✮', '✮✮✮✮', '✮✮✮✮✮'];
    const rating = starRatings[ratingValue - 1];

    if (!pet_id || !userId || !message || !rating) {
        console.error("Missing required fields.");
        return;
    }

    const rData = {
        pet:pet_id,
        reviewer:userId,
        body:message,
        rating:rating,
    }
    // console.log(rData)

    try {
        const response = await fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/create_review/", {
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(rData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error submitting review:", errorData);
            alert("Failed to submit review: " + JSON.stringify(errorData)); 
        } else {
            const data = await response.json();
            console.log("Review submitted successfully:", data);
            alert("Review submitted successfully!");
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error occurred");
    }
} 