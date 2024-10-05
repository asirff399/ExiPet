const handelRegistration = async (event) => {
    event.preventDefault();

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");

    
    const imageFile = document.getElementById("image").files[0];

    const imgbbApiKey = 'd66ac61ddd293e9365044261d374f2d1';
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const imageData = new FormData();
    imageData.append('image', imageFile);

    try {
        const imgbbResponse = await fetch(imgbbUrl, {
            method: 'POST',
            body: imageData,
        });

        if (!imgbbResponse.ok) {
            throw new Error("Failed to upload image. Please try again.");
        }

        const imgbbData = await imgbbResponse.json();
        const imageUrl = imgbbData.data.url;
        // console.log("test",imageUrl);

        const info = {
            username,
            first_name,
            last_name,
            email,
            image: imageUrl,  
            password,
            confirm_password,
        };

        if (password === confirm_password) {
            document.getElementById("error").innerText = "";
            
            if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
                // console.log(info);
                
                
                const response = await fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/register/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Registration successful");
                    document.getElementById("error").innerText = "Check Your Confirmation Mail!";
                } else {
                    alert("Failed to register: " + data.message);
                }
                
            } else {
                document.getElementById("error").innerText = "Password must contain eight characters, at least one letter, one number, and one special character."; 
            }
        } else {
            document.getElementById("error").innerText = "Password and confirm password don't match";
        }
    } catch (error) {
        // console.error("Error:", error);
        alert("An error occurred during registration: " + error.message);
    }
};
const getValue=(id)=>{
    const value = document.getElementById(id).value
    return value
}
const handleLogin = (event) =>{
    event.preventDefault()
    const username = getValue("login-username")
    const password = getValue("login-password")
    // console.log(username,password)
    if(username,password){
        fetch("https://exi-pet-drf-git-main-asirff399s-projects.vercel.app/customer/login/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username,password}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            document.getElementById("error").innerText = data.error;
            alert("Logged in Seccessfully !")
             

            if(data.token && data.user_id){
                localStorage.setItem("token",data.token)
                localStorage.setItem("user_id",data.user_id)
                window.location.href = "index.html"
            }
        })
        
    }
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