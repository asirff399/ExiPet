const fetchTotalPets = async () => {
    try {
        const response = await fetch('https://exi-pet-drf.vercel.app/pet/list');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("pet-count").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
const fetchAvailablePets = async () => {
    try {
        const response = await fetch('https://exi-pet-drf.vercel.app/pet/list/?adoption_status=Available');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("available-pet-cnt").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
const fetchAdoptedPets = async () => {
    try {
        const response = await fetch('https://exi-pet-drf.vercel.app/pet/list/?adoption_status=Adopted');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("adopted-pet-cnt").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
const fetchUsers = async () => {
    try {
        const response = await fetch('https://exi-pet-drf.vercel.app/users/');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("total-user-cnt").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
fetchTotalPets();
fetchAvailablePets();
fetchAdoptedPets();
fetchUsers();

const loadDbUsers = () => {
    fetch("https://exi-pet-drf.vercel.app/users/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-user-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.first_name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.last_name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.username}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.email}
                </th> 
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbCustomer = () => {
    fetch("https://exi-pet-drf.vercel.app/customer/list/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-customer-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.user}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.user_type}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    <img class="h-12 w-12 rounded" src=${item.image} alt="Pet Image">
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.address}
                </th> 
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.phone}
                </th> 
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbPets = () => {
    fetch("https://exi-pet-drf.vercel.app/pet/list")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-pet-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.pet_type}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.gender}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.age}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.price}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.adoption_status                    }
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.author}
                </th>
                 
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbTop5Pets = () => {
    fetch("https://exi-pet-drf.vercel.app/pet/list")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-top-pets-table");
        data.slice(0,5).forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <td class="py-4 px-5 whitespace-nowrap text-sm font-medium text-gray-900">${item.id}</td>
                <td class="py-4 px-5 whitespace-nowrap text-center">
                    <img class="h-12 w-12 rounded-full mx-auto" src=${item.image} alt="Pet Image">
                </td>
                <td class="py-4 px-5 whitespace-nowrap text-sm text-gray-900">${item.name}</td>
                <td class="py-4 px-5 whitespace-nowrap text-sm text-gray-900">${item.pet_type}</td>
                <td class="py-4 px-5 whitespace-nowrap text-sm text-green-600 font-semibold">${item.adoption_status}</td>
                <td class="py-4 px-5 whitespace-nowrap text-sm text-right text-gray-900">${item.price}</td>
                 
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbPetCategory = () => {
    fetch("https://exi-pet-drf.vercel.app/pet/types")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-pet-category-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.slug}
                </th>   
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
function DbadoptionformatDate(dateStr) {
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
const loadDbAdoption = () => {
    fetch("https://exi-pet-drf.vercel.app/pet/adoption")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-adoption-table");
        data.forEach((item) => {
            const time = DbadoptionformatDate(item.adopted_on)
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.pet}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.pet_name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    <img class="h-12 w-12 rounded" src=${item.pet_image} alt="Pet Image">
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.customer}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${time}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.pet_price}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.transaction_id}
                </th>   

            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbContactUs = () => {
    fetch("https://exi-pet-drf.vercel.app/contact_us")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-contact-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.email}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.problem}
                </th>
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbTeamMember = () => {
    fetch("https://exi-pet-drf.vercel.app/member")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-team-member-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.image}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.type}
                </th>
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbService = () => {
    fetch("https://exi-pet-drf.vercel.app/service")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-service-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.name}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.image}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.description}
                </th>
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbReview = () => {
    fetch("https://exi-pet-drf.vercel.app/customer/review")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-review-table");
        data.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('hover:bg-gray-50')
            row.innerHTML = `                           
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.id}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.reviewer}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.pet}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.body}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.rating}
                </th>
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.created_on}
                </th>
            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};

loadDbUsers()
loadDbCustomer()
loadDbPets()
loadDbTop5Pets()
loadDbPetCategory()
loadDbAdoption()
loadDbContactUs()
loadDbTeamMember()
loadDbService()
loadDbReview()