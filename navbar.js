fetch("navbar.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("navbar").innerHTML= data;
	// Assign navElement
	const navElement = document.getElementById("nav-element")
	const admin = document.getElementById("admin-db")
	
		const token = localStorage.getItem("token")
		const userType = localStorage.getItem("user_type")

		if(!token){
			navElement.innerHTML=`
				<div class="flex flex-wrap md:flex-nowrap lg:flex-nowrap font-semibold" >
					<a href="./login.html" class=" md:text-xl lg:text-xl font-mono text-center md:m-3 lg:m-3 hover:border-b-4 hover:border-black p-1 font-extrabold " >LOGIN</a>
					<a href="./registration.html" class=" md:text-xl lg:text-xl font-mono text-center md:m-3 lg:m-3 hover:border-b-4 hover:border-black p-1 font-extrabold ">REGISTER</a>
				</div>
			`
		}
		
		if (userType === "User" || !token) {
			admin.classList.add("hidden"); 
			if (!token && !sessionStorage.getItem("redirected")) {
				sessionStorage.setItem("redirected", "true");
				window.location.href = "./index.html"; 
			} 
		} else {
			admin.classList.remove("hidden"); 
			sessionStorage.removeItem("redirected");
		}

		
})

// DropDown
function closeOpenDropdowns(e) {
	let openDropdownEls = document.querySelectorAll("details.dropdown[open]");

	if (openDropdownEls.length > 0) {
		// If we're clicking anywhere but the summary element, close dropdowns
		if (e.target.parentElement.nodeName.toUpperCase() !== "SUMMARY") {
			openDropdownEls.forEach((dropdown) => {
				dropdown.removeAttribute("open");
			});
		}
	}
}

//Modal
fetch("modal.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("modal").innerHTML= data;
})

//footer
fetch("footer.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("footer").innerHTML= data;
})
