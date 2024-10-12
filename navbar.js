fetch("navbar.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("navbar").innerHTML= data;
	// Assign navElement
	const navElement = document.getElementById("nav-element")
	
		const token = localStorage.getItem("token")

		if(!token){
			navElement.innerHTML=`
				<div class="flex flex-wrap md:flex-nowrap lg:flex-nowrap font-semibold" >
					<a href="./login.html" class=" md:text-xl lg:text-xl font-mono text-center md:m-3 lg:m-3 hover:border-b-4 hover:border-black p-1 font-extrabold " >LOGIN</a>
					<a href="./registration.html" class=" md:text-xl lg:text-xl font-mono text-center md:m-3 lg:m-3 hover:border-b-4 hover:border-black p-1 font-extrabold ">REGISTER</a>
				</div>
			`
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



document.addEventListener('DOMContentLoaded',() => {
	const drawerToggle = document.getElementById('drawer-toggle');
	const drawer = document.getElementById('drawer');
	const closeDrawer = document.getElementById('close-drawer');

	drawerToggle.addEventListener('click', () => {
	  drawer.classList.toggle('hidden');
	});
  
	closeDrawer.addEventListener('click', () => {
	  drawer.classList.add('hidden');
	});
  
	const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
	const dropdown = document.getElementById('dropdownNavbar');
  
	dropdownToggle.addEventListener('click', () => {
	  dropdown.classList.toggle('hidden');
	});
  });
  
 




