const handleLogout = () =>{
    const token = localStorage.getItem("token")
    fetch("https://exipet-drf-api.onrender.com/customer/logout/",{
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
        window.location.href = "./index.html"
    })

}