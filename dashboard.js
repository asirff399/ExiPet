const fetchTotalPets = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/pet/list');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("pet-count").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
const fetchAvailablePets = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/pet/list/?adoption_status=Available');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("available-pet-cnt").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
const fetchAdoptedPets = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/pet/list/?adoption_status=Adopted');
        const data = await response.json();
        const totalPets = data.length;
        document.getElementById("adopted-pet-cnt").innerText = `${totalPets}` 
    } catch (error) {
        console.error("Error fetching total pets:", error);
    }
};
const fetchUsers = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/users/');
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
    fetch("http://127.0.0.1:8000/users/")
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
const loadDbPets = () => {
    fetch("http://127.0.0.1:8000/pet/list")
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
    fetch("http://127.0.0.1:8000/pet/list")
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
    fetch("http://127.0.0.1:8000/pet/types")
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
const loadDbAdoption = () => {
    fetch("http://127.0.0.1:8000/pet/adoption")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-adoption-table");
        data.forEach((item) => {
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
                    ${item.pet_image}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.customer}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.adopted_on}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.pet_price}
                </th>   
                <th class="p-4 text-left text-xs font-semibold text-gray-800">
                    ${item.balance_after_adoption}
                </th>   

            `;
            parent.appendChild(row);
        });
    })
    .catch((error) => console.error("Error loading users:", error));
};
const loadDbContactUs = () => {
    fetch("http://127.0.0.1:8000/contact_us")
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
    fetch("http://127.0.0.1:8000/member")
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
    fetch("http://127.0.0.1:8000/service")
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
    fetch("http://127.0.0.1:8000/customer/review")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("db-review-table");
        console.log(data);

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
loadDbPets()
loadDbTop5Pets()
loadDbPetCategory()
loadDbAdoption()
loadDbContactUs()
loadDbTeamMember()
loadDbService()
loadDbReview()