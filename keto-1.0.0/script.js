// fct pour enregistrer des clients
function signup() {
    var firstname  = document.getElementById("FirstName").value;
    var lastName = document.getElementById("LastName").value;
    var tel = document.getElementById("tel").value;
    var pwd = document.getElementById("Pwd").value;
    var email = document.getElementById("Email").value;
    var adress = document.getElementById("Address").value;
    // Valider le prénom
    var isFirstNameValid = IsAlpha(firstname, 3);
    if (isFirstNameValid == false) {
        document.getElementById("firstNameError").innerHTML = "  FN must be alphabetic and 3+ charac long.";
        document.getElementById("firstNameError").style.color = "rgb(174, 5, 25)";
 
    } else {
        document.getElementById("firstNameError").innerHTML = "";
    }
    // Valider le nom
    var isLastNameValid = IsAlpha(lastName, 3);
    if (isLastNameValid == false) {
        document.getElementById("LastNameError").innerHTML = " LN must be alphabetic and 3+ charac long.";
        document.getElementById("LastNameError").style.color = "rgb(174, 5, 25)";

    } else {
        document.getElementById("LastNameError").innerHTML = "";
    }

    // Valider le téléphone
    var isTelValid = checktel(tel, 8);
    if (isTelValid == false) {
        document.getElementById("telError").innerHTML = " TEL should have 8 numbers";
        document.getElementById("telError").style.color = "rgb(174, 5, 25)";
        isFormValid = false;
    } else {
        document.getElementById("telError").innerHTML = "";
    }

    // Valider le mot de passe
    var isPwdValid = checkLength(pwd, 5);
    if (isPwdValid == false) {
        document.getElementById("PWDError").innerHTML = "pwd should have at least 5 charac";
        document.getElementById("PWDError").style.color = "rgb(174, 5, 25)";
        isFormValid = false;
    } else {
        document.getElementById("PWDError").innerHTML = "";
    }
    if (email == "") {
        document.getElementById("emailError").innerHTML = "Please enter an email address.";
        document.getElementById("emailError").style.color = "rgb(174, 5, 25)";
        return;
    }
        else{
        document.getElementById("emailError").innerHTML = "";
    }
    var isEmailValid = true;
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].email == email) {
            isEmailValid = false;
            document.getElementById("emailError").innerHTML = "this email already exists"
            document.getElementById("emailError").style.color =  "rgb(168, 41, 56)";
        } else {
            document.getElementById("emailError").innerHTML = ""
        }

    }
    // Si tous les champs sont valides
    if (isFirstNameValid && isLastNameValid && isTelValid && isPwdValid && isEmailValid) {
        var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
        var user = {
            id: generateId(usersTab),
            FN: firstname,
            LN: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            adress:adress,
            role: "client",
        };
        
        usersTab.push(user);
       
        localStorage.setItem("users", JSON.stringify(usersTab));

        toggleModal(true)
    }

}
// fct pour enregistrer owners
function signupOwner() {
    var firstname = document.getElementById("FirstNameOWNER").value;
    var lastName = document.getElementById("LastNameOWNER").value;
    var tel = document.getElementById("telOWNER").value;
    var pwd = document.getElementById("PwdOWNER").value;
    var email = document.getElementById("EmailOWNER").value;
    var Adress = document.getElementById("AddressOWNER").value;

    // Valider le prénom
    var isFirstNameOwnerValid = IsAlpha(firstname, 3);
    if (isFirstNameOwnerValid == false) {
        document.getElementById("firstNameError").innerHTML = " ❌ FN must be alphabetic and 3+ charac long.";
        document.getElementById("firstNameError").style.color = "rgb(174, 5, 25)";
    } else {
        document.getElementById("firstNameError").innerHTML = "";
    }

    // Valider le nom
    var isLastNameOwnerValid = IsAlpha(lastName, 3);
    if (isLastNameOwnerValid == false) {
        document.getElementById("LastNameError").innerHTML = " ❌ LN must be alphabetic and 3+ charac long.";
        document.getElementById("LastNameError").style.color ="rgb(174, 5, 25)";
    } else {
        document.getElementById("LastNameError").innerHTML = "";
    }

    // Valider le téléphone
    var isTelOwnerValid = checktel(tel, 8);
    if (isTelOwnerValid == false) {
        document.getElementById("telError").innerHTML = "❌ TEL should have 8 numbers";
        document.getElementById("telError").style.color = "rgb(174, 5, 25)";
    } else {
        document.getElementById("telError").innerHTML = "";
    }

    // Valider le mot de passe
    var isPwdOwnerValid = checkLength(pwd, 5);
    if (isPwdOwnerValid == false) {
        document.getElementById("PWDError").innerHTML = "pwd should have at least 5 charac";
        document.getElementById("PWDError").style.color = "rgb(174, 5, 25)";
    } else {
        document.getElementById("PWDError").innerHTML = "";
    }

    if (email == "") {
        document.getElementById("emailError").innerHTML = "Please enter an email address.";
        document.getElementById("emailError").style.color = "rgb(174, 5, 25)";
        return; // Arrête l'exécution si l'email est vide
    } else {
        document.getElementById("emailError").innerHTML = "";
    }
    
    // Vérifier si l'email existe déjà
    var isEmailOwnerValid = true;
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].email == email) {
            isEmailOwnerValid = false;
            document.getElementById("emailError").innerHTML = "This email already exists.";
            document.getElementById("emailError").style.color = "rgb(174, 5, 25)";
            break;
        } else {
            document.getElementById("emailError").innerHTML = "";
        }
    }
    

    // Si tous les champs sont valides
    if (isFirstNameOwnerValid && isLastNameOwnerValid && isTelOwnerValid && isPwdOwnerValid && isEmailOwnerValid) {
        // Créer l'objet utilisateur
        var user = {
            id: generateId(usersTab),
            FN: firstname,
            LN: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            adress:Adress,
            role: "owner",
            status: "not validated"
        };

        // Sauvegarder dans localStorage
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));

        // Afficher la modal de succès
        toggleModal(true)

      
    }
}
// se connecter selon le role 
function login() {
    var email = document.getElementById("EmailLogin").value;
    var pwd = document.getElementById("passwordLogin").value;
    document.getElementById("loginError").innerHTML = "";

    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var foundUser;

    
    for (let i = 0; i < usersTab.length; i++) {
        console.log("Checking user: ", usersTab[i]);  
        if (email == usersTab[i].email && pwd == usersTab[i].pwd) {
            foundUser = usersTab[i];
            break;
        }
    }
    if (foundUser) {
        //user is a client
        if (foundUser.role =="client") {
            localStorage.setItem("connectedUserId", foundUser.id);
            newModel(foundUser.FN,"house.html");
            //user is a owner 
        } else if (foundUser.role =="owner") {
            if (foundUser.status == "not validated") {
            
                document.getElementById("loginError").innerHTML = "Account not yet validated by admin";
                document.getElementById("loginError").style.color = "red";
            } else {
                localStorage.setItem("connectedUserId", foundUser.id);
                newModel(foundUser.FN,"addHouse.html");
                
            }
            //user is a admin
        } else if (foundUser.role == "admin") {
            localStorage.setItem("connectedUserId", foundUser.id);
            newModel(foundUser.FN,"ADMIN.html");
        }
    } else {
        document.getElementById("loginError").innerHTML = "Please check again";
        document.getElementById("loginError").style.color = "red";
    }

}
// Fonction pour afficher une fenêtre modale de bienvenue personnalisée avec le nom de l'utilisateur,
// et rediriger l'utilisateur vers une page spécifique lorsqu'il clique sur le bouton "Get Started".
function newModel(userName,Page) {
    document.getElementById("thankYouModalTitle").innerText = `${userName} welcome!`;
    $('#thankYouModal').modal('show');
    var okButton = document.getElementById("getStartedBtn");
    okButton.onclick = function () {
        location.replace(Page);
    };

}
// fct pour enregistrer Admin
function signupAdmin() {
    var firstname = document.getElementById("FirstNameAdmin").value;
    var lastName = document.getElementById("LastNameAdmin").value;
    var tel = document.getElementById("telAdmin").value;
    var pwd = document.getElementById("PwdAdmin").value;
    var email = document.getElementById("EmailAdmin").value;
    var adress=document.getElementById("AddressAdmin").value;

    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
       
        var user = {
            id: generateId(usersTab),
            FN: firstname,
            LN: lastName,
            email: email,
            pwd: pwd,
            tel: tel,
            adress:adress,
            role: "admin",
          
        };

   
        usersTab.push(user);
        localStorage.setItem("users", JSON.stringify(usersTab));
alert("Your sign-up was successful. Welcome Admin!")
location.replace("login.html")
    }

// comparer l'égalité du nbr de carac d'une chaine % à un nbr
function checktel(tel,nb){
    return tel.length==nb
     }
     //verifier  est une chaine  alpha ou non
function IsAlpha(name, nb) {
    var isValid = name.length >= nb;

    var i = 0;
    while (i < name.length) {
        var char = name.charAt(i); 
        if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z'))) { 
            isValid = false;
            break;
        }
        i++;
    }

    return isValid;
}
// fct pr générer auto un id à chaque nouveau obj: chercher l'id max +1
function generateId(T) {
    var max;
    // si tab encore vide
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;
            }
        }
    }
    return max + 1;
}
// fct pour comparer le nbr de carac % à nbr
function checkLength(ch, nb) {
    
    return ch.length >= nb;
}
// Cette fonction sert à afficher  un modal 
function toggleModal(show) {
    // Récupère l'élément du modal avec l'ID 'thankYouModal'
    var modalElement = document.getElementById('thankYouModal');
    // Si le paramètre 'show' est vrai (true), on affiche le modal
    if (show) {
        // Ajouter la classe 'show' pour rendre le modal visible
        modalElement.classList.add('show');
        // Retirer la classe 'fade' pour éviter une animation de disparition
        modalElement.classList.remove('fade');
        // Mettre l'attribut 'aria-hidden' à 'false' pour signaler que le modal est visible
        modalElement.setAttribute('aria-hidden', 'false');
        // Modifier le style de l'élément pour le rendre visible (affiché)
        modalElement.style.display = 'block';
    } }
//fonction pour ajouter une maison d hote
function addGuestHouse() {
    isValid = true;
    const HouseName = document.getElementById("houseName").value;
    const Housedescription = document.getElementById("description").value;
    const HouseAdress = document.getElementById("Address").value;
    const HouseCity = document.getElementById("city").value;

    const wifi = document.getElementById("wifi").checked;
    const pool = document.getElementById("pool").checked;
    const HouseKitchen = document.getElementById("kitchen").checked;
    const bathroom = document.getElementById("bathroom").checked;

    document.getElementById("houseNameError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";
    document.getElementById("cityError").innerHTML = "";

    if (HouseName.length < 3) {
        document.getElementById("houseNameError").innerHTML = "GuestHouse Name must be 3+ characters long.";
        document.getElementById("houseNameError").style.color = "rgb(168, 41, 56)";
        isValid = false;
    }

    if (HouseAdress.length == 0) {
        document.getElementById("addressError").innerHTML = "Address cannot be empty.";
        document.getElementById("addressError").style.color = "rgb(168, 41, 56)";
        isValid = false;
    }

    if (HouseCity.length == 0) {
        document.getElementById("cityError").innerHTML = "City cannot be empty.";
        document.getElementById("cityError").style.color = "rgb(168, 41, 56)";
        isValid = false;
    }

    if (isValid) {
        const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
        const connectedUserId = localStorage.getItem("connectedUserId");

         house = {
            id: generateId(housesTab),
            ownerId: connectedUserId,
            name: HouseName,
            description: Housedescription,
            address: HouseAdress,
            city: HouseCity,
            equipment: {
            wifi: wifi,
            pool: pool,
            kitchen: HouseKitchen,
            bathroom: bathroom,}
        };

        housesTab.push(house);
        localStorage.setItem("housesTab", JSON.stringify(housesTab));

        localStorage.setItem("selectedHouseId", house.id);
        toggleModal(true)
    }
}
//foncion pour ajouter une chambre
function addroom() {
    let isValid = true;

    const roomName = document.getElementById("roomName").value;
    const description = document.getElementById("description").value;
    const capacity = document.getElementById("capacity").value;
    const price = document.getElementById("Price").value;

    // Récupération des équipements sélectionnés
    const airConditioning = document.getElementById("air-conditioning-room").checked;
    const heating = document.getElementById("heating-room").checked;
    const tv = document.getElementById("tv").checked;
    const privateBathroom = document.getElementById("private-bathroom").checked;
    const jacuzzi = document.getElementById("jacuzzi").checked;
 
    document.getElementById("roomNameError").innerHTML = "";
    document.getElementById("capacityError").innerHTML = "";
    document.getElementById("priceError").innerHTML = "";
//verification de name room
    if (roomName.length < 3) {
        document.getElementById("roomNameError").innerHTML = "Room Name must be at least 3 characters.";
        document.getElementById("roomNameError").style.color = "rgb(168, 41, 56)";
        isValid = false;
    }
//verification de capacity
    if (!capacity || capacity <= 0) {
        document.getElementById("capacityError").innerHTML = "Capacity must be a positive number.";
        document.getElementById("capacityError").style.color = "rgb(168, 41, 56)";
        isValid = false;
    }
//  verification de price
    if (!price || price <= 0) {
        document.getElementById("priceError").innerHTML = "Price must be a positive number.";
        document.getElementById("priceError").style.color = "rgb(168, 41, 56)";
        isValid = false;
    }

    if (isValid) {
        const houseId = localStorage.getItem("selectedHouseId");
        const roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
        var roomCount = 0;
        for (let i = 0; i < roomsTab.length; i++) {
            if (roomsTab[i].houseId ==houseId) {
                roomCount++;
            }
        }

        if (roomCount >= 5) {
            alert("You cannot add more than 5 rooms to this house.");
            document.getElementById("room").reset();
            return;
        }

   
       else{
        room = {
            id: generateId(roomsTab), 
            houseId: houseId,
            name: roomName,
            description: description,
            capacity: parseInt(capacity),
            price: parseFloat(price),
            equipment: {
                airConditioning: airConditioning,
                heating: heating,
                tv: tv,
                privateBathroom: privateBathroom,
                jacuzzi: jacuzzi,
            },
        };
        roomsTab.push(room);
        localStorage.setItem("roomsTab", JSON.stringify(roomsTab));
        alert("Room added successfully!");
        document.getElementById("room").reset();
        return;
       } 
    }
}// Fonction pour afficher dynamiquement le contenu de "house.html" en fonction des données des maisons stockées dans `localStorage`.
function displayHouse() {
    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    let content = ``;
    
    for (let i = 0; i < housesTab.length; i++) {
        let wifiStatus = "Not Available";
        let poolStatus = "Not Available";
        let kitchenStatus = "Not Available";
        let bathroomStatus = "Not Available";

        if (housesTab[i].equipment.wifi) {
            wifiStatus = "Available";
        }

        if (housesTab[i].equipment.pool) {
            poolStatus = "Available";
        }

        if (housesTab[i].equipment.kitchen) {
            kitchenStatus = "Available";
        }

        if (housesTab[i].equipment.bathroom) {
            bathroomStatus = "Available";
        }
        // Génère un chemin d'image basé sur l'index, avec une rotation limitée à 10 images.
        let imagePath = `img/house${(i % 10) + 1}.jpg`;
      
        content += `
            <div class="box">
                 <img src="${imagePath}" alt="">
                <div class="overlay">
                    <h3>${housesTab[i].name}</h3>
                    <p>${housesTab[i].description}</p>
                    <p><strong>Address:</strong> ${housesTab[i].address}</p>
                    <p><strong>City:</strong> ${housesTab[i].city}</p>
                    <p><strong><i class="fas fa-wifi"></i> WiFi:</strong> ${wifiStatus}</p>
                    <p><strong><i class="fas fa-swimmer"></i> Pool:</strong> ${poolStatus}</p>
                    <p><strong><i class="fas fa-utensils"></i> Kitchen:</strong> ${kitchenStatus}</p>
                    <p><strong><i class="fas fa-bath"></i> Bathroom:</strong> ${bathroomStatus}</p>
                    <button onclick="goToDisplay(${housesTab[i].id})">Display</button>
                </div>
            </div>`;
    }
    document.getElementById("cardContainer").innerHTML = content;
}
// Fonction pour rediriger l'utilisateur vers "Rooms.html" et stocker l'ID de la maison sélectionnée dans `localStorage`.
function goToDisplay(id) {
    localStorage.setItem("selectedHouseId", id);
    location.replace("Rooms.html");
}
// Fonction pour afficher dynamiquement les chambres disponibles sur la page rooms.html
function displayRooms() {
        // Récupère l'ID de la maison sélectionnée depuis `localStorage`
    var houseId = localStorage.getItem("selectedHouseId");
    // Récupère la liste des chambres depuis `localStorage`, ou initialise un tableau vide s'il n'y a pas de données.
    var roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    var content = ``;
    var availableRoomsFound = false;
    for (let i = 0; i < roomsTab.length; i++) {
          let imagePath =`img/room${(i % 10) + 1}.jpg` // Génère un chemin d'image dynamique pour chaque chambre.
        if (roomsTab[i].houseId == houseId) {
            availableRoomsFound = true;
            content += `
                <article class="card__article">
                 <img src="${imagePath}" alt="" class="card__img">

                    <div class="card__data">
                        
                        <h2 class="card__title">
                            <i class="fa-solid fa-bed"></i> ${roomsTab[i].name}
                        </h2>
                        <p><strong>Capacity:</strong> ${roomsTab[i].capacity}</p>
                        <p><strong>Price:</strong> ${roomsTab[i].price}DT</p>
                        <button class="card__button" onclick="goToRoomDetails(${roomsTab[i].id},'${imagePath}')">Select Room</button>
                    </div>
                </article>`;
        }
    }

    // Si aucune chambre n'est trouvée
    if (!availableRoomsFound) {
        content = "<p>No rooms available for this house.</p>";
    }

    document.getElementById("roomContainer").innerHTML = content;
}
// Fonction pour sauvegarder les informations de la chambre sélectionnée 
// et rediriger l'utilisateur vers la page des détails de la chambre
function goToRoomDetails(roomId,imagePath) {
       // Sauvegarde l'ID de la chambre sélectionnée dans `localStorage`
    localStorage.setItem("selectedRoomId", roomId); 
    localStorage.setItem("selectedRoomImage", imagePath); // Enregistrer le chemin de l'imagepour l'utiliser sur la page suivante
    location.replace("roomDetails.html");
}
// Fonction pour afficher dynamiquement les  details  chambres disponibles sur la page Roomsdetails.html
function displayRoomDetails() {
    selectedRoomId = localStorage.getItem("selectedRoomId");
    roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    // Récupérer le chemin de l'image associée à la chambre sélectionnée
   var selectedRoomImage = localStorage.getItem("selectedRoomImage");
    
    var selectedRoom ;
    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == selectedRoomId) {
            selectedRoom = roomsTab[i];
            break; 
        }
    }

    if (selectedRoom) {
        let equipmentList = '';

        
        if (selectedRoom.equipment.airConditioning) {
            equipmentList += ` 
                <div class="room-info">
                    <i class="fas fa-snowflake"></i>
                    <span>Air Conditioning</span>
                </div>`;
        }

        if (selectedRoom.equipment.heating) {
            equipmentList += `
                <div class="room-info">
                    <i class="fas fa-sun"></i>
                    <span>Heating</span>
                </div>`;
        }

        if (selectedRoom.equipment.tv) {
            equipmentList += `
                <div class="room-info">
                    <i class="fas fa-tv"></i>
                    <span>TV</span>
                </div>`;
        }

        if (selectedRoom.equipment.privateBathroom) {
            equipmentList += `
                <div class="room-info">
                    <i class="fas fa-bath"></i>
                    <span>Private Bathroom</span>
                </div>`;
        }

        if (selectedRoom.equipment.jacuzzi) {
            equipmentList += `
                <div class="room-info">
                    <i class="fas fa-tint"></i>
                    <span>Jacuzzi</span>
                </div>`;
        }

        // Générer dynamiquement le contenu HTML pour la chambre sélectionnée
        let roomContent = `
            <section class="room-availability spad">
                <div class="container">
                    <div class="room-check">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="room-item">
                                    <div class="room-pic-slider room-pic-item owl-carousel">
                                       <div class="PHOTO">
                                        <img src="${selectedRoomImage}" alt="Room Image">
                                       </div>
                                    </div>
                                    <div class="room-text">
                                        <div class="room-title">
                                            <h2>${selectedRoom.name}</h2>
                                        </div>
                                        
                                        <div class="room-price">
                                            <span><i class="fas fa-tag"></i> price per night:</span>
                                            <h2>${selectedRoom.price}DT</h2>
                                        </div>
                                        <!-- Ajouter la description de la chambre -->
                                        <div class="room-description">
                                            <h3><i class="fas fa-info-circle"></i> Description:</h3>
                                            <p>${selectedRoom.description}</p>
                                        </div>
                                        <div class="room-features">
                                            ${equipmentList}
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <div class="col-lg-6">
                                <div class="check-form">
                                    <h2><i class="fas fa-calendar-alt"></i> Availability Check</h2>
                                    <form action="#">
                                        <div class="datepicker">
                                            <div class="date-select">
                                                <p><i class="fas fa-calendar-day"></i> Check-in</p>
                                                <input type="date" id="checkInDate">
                                                <span id="checkInError" class="error-message"></span> 
                                            </div>
                                            <div class="date-select to">
                                                <p><i class="fas fa-calendar-times"></i> Check-out</p>
                                                <input type="date" id="checkOutDate">
                                                <span id="checkOutError" class="error-message"></span> 
                                            </div>
                                        </div>
                                        <div class="room-quantity">
                                            <div class="single-quantity">
                                                <p><i class="fas fa-users"></i> Number of Guests</p>
                                                <input type="number" id="numberOfGuests" min="1" value="1">
                                                <span id="guestsError" class="error-message"></span> <!-- Span pour message d'erreur -->
                                            </div>
                                        </div>
                                        <button type="button" onclick="ReserveRoom('${selectedRoom.id}', ${selectedRoom.capacity},${selectedRoom.price})">
                                            Reserve Now <i class="lnr lnr-arrow-right"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        document.getElementById("roomDetailsContainer").innerHTML = roomContent;

    } else {
        document.getElementById("roomDetailsContainer").innerHTML = "<p>Room details not found. Please try again.</p>";
    }
}
// Fonction pour réserver une chambre
function ReserveRoom(roomId, roomCapacity, roomPrice) {
    let numberOfGuests = parseInt(document.getElementById("numberOfGuests").value);
    let checkInDate1 = document.getElementById("checkInDate").value;
    let checkOutDate2 = document.getElementById("checkOutDate").value;
    var connectedUserId = localStorage.getItem("connectedUserId");
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    document.getElementById("guestsError").innerText = "";
    document.getElementById("checkInError").innerText = "";
    document.getElementById("checkOutError").innerText = "";
    if (!connectedUserId) {
        alert("You must be logged in to make a reservation.");
        location.replace("login.html");
        return;
    }
    // Vérifier que tous les champs sont remplis 
    if (isNaN(numberOfGuests) || checkInDate1 == "" || checkOutDate2 == "") {
        if (isNaN(numberOfGuests)) {
            document.getElementById("guestsError").innerText = "⚠ Please enter a valid number of guests.";
        }
        if (checkInDate1 == "") {
            document.getElementById("checkInError").innerText = "⚠ Please select a check-in date.";
        }
        if (checkOutDate2 == "") {
            document.getElementById("checkOutError").innerText = "⚠ Please select a check-out date.";
        }
        return;
    }

    // Vérifier que le nombre de places est valide (<= capacite)
    if (numberOfGuests < 1 || numberOfGuests > roomCapacity) {
        document.getElementById("guestsError").innerText = `⚠ The number of guests must be between 1 and ${roomCapacity}.`;
        return;
    }

    // Convertir les dates en objets Date pour calculer les nuits
    let checkInDate = new Date(checkInDate1);
    let checkOutDate = new Date(checkOutDate2);

    // Vérifier que la date de check-out est après la date de check-in
    if (checkOutDate <= checkInDate) {
        document.getElementById("checkOutError").innerText = "⚠ Check-out date must be after check-in date.";
        return;
    }

    // Vérifier que la date de check-in n'est pas avant aujourd'hui
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparer uniquement les dates
    if (checkInDate < currentDate) {
        document.getElementById("checkInError").innerText = "⚠ Check-in date cannot be before today.";
        return;
    }

    // Vérifier que la date de check-out n'est pas avant aujourd'hui
    if (checkOutDate < currentDate) {
        document.getElementById("checkOutError").innerText = "⚠ Check-out date cannot be before today.";
        return;
    }

    // Calculer le nombre de nuits
    //Cela donne la différence en millisecondes entre les deux dates.(checkOutDate - checkInDate)
    //(1000 * 3600) :Cela équivaut à 1 heure en millisecondes.
    //(1000 * 3600 * 24) :Cela correspond à 1 jour en millisecondes.

    const numberOfNights = (checkOutDate - checkInDate) / (1000 * 3600 * 24);  // Convertir en jours

    if (numberOfNights <= 0) {
        document.getElementById("checkOutError").innerText = "⚠ Check-out date must be after check-in date.";
        return;
    }

    // Calculer le prix total
    const totalPrice = roomPrice * numberOfNights;

    // Appeler la fonction isRoomDispo pour vérifier la disponibilité
    if (!isRoomDispo(roomId, checkInDate, checkOutDate)) {
        alert("The room is not available for the selected dates.");
        return;
    }
    else { 
     
        booking = {
            id: generateId(bookings),
            roomId: roomId,
            userId: connectedUserId,
            numberOfGuests: numberOfGuests,
            checkInDate: checkInDate1,
            checkOutDate: checkOutDate2,
            totalPrice: totalPrice,
             status: "Pending",
            
        };
        bookings.push(booking);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        localStorage.setItem("selectedbookingId", booking.id);
        
        
        alert(`Booking confirmed!\nRoom ID: ${roomId}\nTotal Price: ${totalPrice} DT\nGuests: ${numberOfGuests}\nCheck-in: ${checkInDate.toLocaleDateString()}\nCheck-out: ${checkOutDate.toLocaleDateString()}`);
        location.replace("basket.html")
    }
}
// Fonction qui vérifie si une chambre est disponible pour les dates données
function isRoomDispo(roomId, checkInDate, checkOutDate) {
    // Récupère la liste des réservations depuis le localStorage, ou un tableau vide si aucune réservation n'existe
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    // Déclare une variable pour stocker une réservation individuelle
    var booking;
    
    // Boucle à travers toutes les réservations pour vérifier si la chambre est déjà réservée
    for (let i = 0; i < bookings.length; i++) {
         // Assigne la réservation actuelle à la variable 'booking'
         booking = bookings[i];

        // Vérifie si la réservation concerne la chambre spécifiée par l'ID
        if (booking.roomId == roomId) {
            // Convertit les dates de check-in et check-out de la réservation existante en objets Date
            const existingCheckIn = new Date(booking.checkInDate);
            const existingCheckOut = new Date(booking.checkOutDate);

            // Vérifie si les dates demandées se superposent avec la réservation existante
            if (checkInDate < existingCheckOut && checkOutDate > existingCheckIn) {
                // Si les dates se superposent, retourne false (la chambre n'est pas disponible)
                return false; 
            }
        }
    }

    // Si aucune réservation ne se superpose avec les dates données, retourne true (la chambre est disponible)
    return true; 
}

// Fonction pour afficher les commandes (réservations) de l'utilisateur
function displayMyOrders() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let row = ""; 
    let s = 0;
    let connectedUserId = localStorage.getItem("connectedUserId");

    for (let i = 0; i < bookings.length; i++) {
        // Recherche des réservations uniquement pour connectedUserId
        if (bookings[i].userId == connectedUserId) {

            // Recherche de la chambre correspondante à la réservation
            let room = searchObjByIdAndKey(bookings[i].roomId, "roomsTab");
            let house = searchObjByIdAndKey(room.houseId, "housesTab");

            s += bookings[i].totalPrice;

            // Générer les boutons conditionnels
            let confirmButton = "";
            if (bookings[i].status =="Pending") {
                confirmButton = `<button class="btn btn-success" onclick="goToDisplayconfirmOrder(${bookings[i].id})">Confirm</button>`;
            }

            row += `
                <tr>
                    <td>${bookings[i].id}</td>
                    <td>${room.name}</td> 
                    <td>${house.name}</td> 
                    <td>${bookings[i].numberOfGuests}</td>
                    <td>${bookings[i].checkInDate}</td>
                    <td>${bookings[i].checkOutDate}</td>
                    <td>${bookings[i].totalPrice}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteOrder(${bookings[i].id})">Delete</button>
                        ${confirmButton}
                    </td>
                </tr>`;
        }
    }

    // Ajouter la somme totale
    row += `
        <tr>
            <td colspan="6"><strong>Total Sum</strong></td>
            <td><strong>${s} DT</strong></td>
            <td></td>
        </tr>`;

    document.getElementById("ordersBody").innerHTML = row;
   
}
function goToDisplayconfirmOrder(bookingId) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Rechercher la réservation par ID
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].id == bookingId) {
            console.log("Booking found:", bookings[i]);

            // Mettre à jour le statut de la réservation
            bookings[i].status = "confirmed";
            console.log("Updated status to 'confirmed':", bookings[i]);

           
            localStorage.setItem("bookings", JSON.stringify(bookings));

            // Enregistrer l'ID de la réservation confirmée dans le localStorage
            localStorage.setItem("selectedBookingId", bookingId);

            // Afficher les commandes mises à jour
            displayMyOrders();

            location.replace("conf.html");
            return;  // Fin de la fonction une fois la redirection effectuée
        }
    }

   
}


// Fonction pour rechercher un objet dans le localStorage en fonction de son ID et de la clé (nom du tableau)
function searchObjByIdAndKey(id, key) {
    var T = JSON.parse(localStorage.getItem(key) || "[]");
    for (let i = 0; i < T.length; i++) {
          // Si l'ID de l'objet correspond à l'ID recherché, retourner cet objet
        if (T[i].id == id) {
            return T[i]
        }
    }
}
// Fonction pour supprimer une réservation par son ID
function deleteOrder(id) {
   
    var bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    var pos;

   
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].id == id) {
            pos = i;
            break;
        }
    }

    // Supprimer la réservation
    bookings.splice(pos, 1);
    // Mettre à jour les données
    localStorage.setItem("bookings", JSON.stringify(bookings));
    location.reload();
}
function searchHouse() {
    const search = document.getElementById("searchInput").value.toLowerCase(); // Récupérer la requête de recherche
    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    let content = ``;

    let found = false;

    // Parcourir toutes les maisons
    for (let i = 0; i < housesTab.length; i++) {
        const house = housesTab[i];

        // Vérifier si le nom ou l'adresse de la maison correspond exactement à la recherche
        if (house.name.toLowerCase() == search || house.address.toLowerCase() == search) {
            found = true;

            // Vérification des équipements
            let wifiStatus = "Not available";
            let poolStatus = "Not available";
            let kitchenStatus = "Not available";
            let bathroomStatus = "Not available";

            if (house.equipment.wifi) {
                wifiStatus = "Available";
            }
            if (house.equipment.pool) {
                poolStatus = "Available";
            }
            if (house.equipment.kitchen) {
                kitchenStatus = "Available";
            }
            if (house.equipment.bathroom) {
                bathroomStatus = "Available";
            }

            let imagePath = `img/house${(i % 10) + 1}.jpg`;

            content += `
                <div class="box">
                    <img src="${imagePath}" alt="House Image">
                    <div class="overlay">
                        <h3>${house.name}</h3>
                        <p>${house.description}</p>
                        <p><strong>Address:</strong> ${house.address}</p>
                        <p><strong>City:</strong> ${house.city}</p>
                        <p><strong><i class="fas fa-wifi"></i> WiFi:</strong> ${wifiStatus}</p>
                        <p><strong><i class="fas fa-swimmer"></i> Pool:</strong> ${poolStatus}</p>
                        <p><strong><i class="fas fa-utensils"></i> Kitchen:</strong> ${kitchenStatus}</p>
                        <p><strong><i class="fas fa-bath"></i> Bathroom:</strong> ${bathroomStatus}</p>
                        <button onclick="goToDisplay(${house.id})">Display</button>
                    </div>
                </div>`;
        }
    }

    if (!found) {
        content = "<p>No houses found matching your search.</p>";
    }
    document.getElementById("searchResults").innerHTML = content;
}
// Fonction pour afficher les réservations des maisons appartenant à l'utilisateur connecté(owner)
function displayOwnerReserv() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    var housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    var roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    var usersTab = JSON.parse(localStorage.getItem("users")) || [];

    var content = "";
    var totalSum = 0;

    // Créer un dictionnaire pour retrouver rapidement les maisons par leur ID
    var housesMap = {};
    for (let i = 0; i < housesTab.length; i++) {
        if (housesTab[i].ownerId == connectedUserId) {
            housesMap[housesTab[i].id] = housesTab[i];
        }
    }

    // Chercher les réservations sur les maisons appartenant à l'utilisateur
    for (let i = 0; i < bookings.length; i++) {
        var booking = bookings[i];

        // Trouver la chambre correspondant à la réservation
        var roomDetails = searchObjByIdAndKey(booking.roomId, "roomsTab");

        // Si la chambre existe et appartient à l'une des maisons de l'utilisateur
        if (roomDetails && housesMap[roomDetails.houseId]) {
            var houseDetails = housesMap[roomDetails.houseId];  // On récupère la maison depuis le dictionnaire
            var userDetails = searchObjByIdAndKey(booking.userId, "users");

            // Ajouter à la liste des réservations
            totalSum += booking.totalPrice;
            content += `
                <tr>
                    <td>${booking.id}</td>
                    <td>${houseDetails.id}</td>
                    <td>${houseDetails.name}</td>
                    <td>${roomDetails.name}</td>
                    <td>${houseDetails.address}</td>
                    <td>${userDetails.id}</td>
                    <td>${userDetails.FN} ${userDetails.LN}</td>
                    <td>${booking.numberOfGuests}</td>
                    <td>${userDetails.email}</td>
                    <td>${userDetails.tel}</td>
                    <td>${booking.checkInDate}</td>
                    <td>${booking.checkOutDate}</td>
                    <td>${booking.totalPrice} DT</td>
                    <td>${booking.status}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteReservation(${booking.id})">Delete</button>
                    </td>
                </tr>
            `;
        }
    }

    // Ajouter le total des revenus
    content += `
        <tr>
            <td colspan="13" class="text-right"><strong>Total Revenue: ${totalSum} DT</strong></td>
        </tr>
    `;

    // Mettre à jour la table HTML
    document.getElementById("reservationsList").innerHTML = content;
}
 // Fonction pour afficher les chambres des maisons appartenant à l'utilisateur connecté
function displayOwnerRooms() {
    var connectedUserId = localStorage.getItem("connectedUserId");

   
    const roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];

    var ownerRooms = [];
    var content = "";
     // chercher mes houses
    for (let i = 0; i < housesTab.length; i++) {
        if (housesTab[i].ownerId == connectedUserId) {
            //chercher mes rooms
            for (let j = 0; j < roomsTab.length; j++) {
                if (roomsTab[j].houseId == housesTab[i].id) {
                    ownerRooms.push(roomsTab[j]);
                }
            }
        }
    }

    for (let i = 0; i < ownerRooms.length; i++) {
        content += `
            <tr>
                <td>${ownerRooms[i].id}</td>
                <td>${ownerRooms[i].name}</td>
                <td>${ownerRooms[i].capacity}</td>
                <td>${ownerRooms[i].price} DT</td>
                <td>
                    <button class="btn btn-warning" onclick="editRoom('${ownerRooms[i].id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteRoom('${ownerRooms[i].id}')">Delete</button>
                </td>
            </tr>
        `;
    }

    
    document.getElementById("roomsList").innerHTML = content;
}
 // Fonction pour afficher  des maisons appartenant à l'utilisateur connecté
function displayOwnerHouses() {
    const connectedUserId = localStorage.getItem("connectedUserId");
    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    let content = "";
    for (let i = 0; i < housesTab.length; i++) {
        const house = housesTab[i];
        if (house.ownerId == connectedUserId) {
            content += `
                <tr class="text-center">
                    <td>${house.id}</td>
                    <td>${house.name}</td>
                    <td>${house.address}</td>
                    <td>${house.city}</td>
                      <td>
                        <div style="display: flex; gap: 5px; justify-content: center;">
                            <button class="btn btn-warning btn-sm" onclick="editHouse('${house.id}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteHouse('${house.id}')">Delete</button>
                            <button class="btn btn-success btn-sm" onclick="addRoom('${house.id}')">Add Room</button>
                        </div>
                    </td>
                </tr>
            `;
        }
    }

    document.getElementById("housesList").innerHTML = content;
}
//add room in housesOwner
function addRoom(houseId) {
    const form = `
        <div class="row login_form" style="color: #000; background-color: #fff; padding: 20px; border-radius: 10px; border: 2px solid #000;">
            
            <!-- Title with Icon -->
            <div class="col-md-12 form-group" style="margin-bottom: 20px;">
                <h3 style="color: #333; font-weight: 600;">
                    <i class="fa fa-plus" style="color: rgb(155, 5, 5);"></i> Add Room
                </h3>
            </div>

            <!-- Room Name -->
            <div class="col-md-12 form-group">
                <label for="roomName" style="color: #333; font-weight: 600;">Room Name</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-door-closed"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="roomName" placeholder="Enter room name"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
                <p id="roomNameError" style="color: rgb(168, 41, 56);"></p>
            </div>

            <!-- Description -->
            <div class="col-md-12 form-group">
                <label for="description" style="color: #333; font-weight: 600;">Description</label>
                <textarea class="form-control" id="description" placeholder="Enter room description"
                          style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; background-color: #f9f9f9; color: #333;"></textarea>
            </div>

            <!-- Room Capacity -->
            <div class="col-md-12 form-group">
                <label for="roomCapacity" style="color: #333; font-weight: 600;">Room Capacity</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-users"></i>
                        </span>
                    </div>
                    <input type="number" class="form-control" id="roomCapacity" placeholder="Enter room capacity"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
                <p id="capacityError" style="color: rgb(168, 41, 56);"></p>
            </div>

            <!-- Room Price -->
            <div class="col-md-12 form-group">
                <label for="roomPrice" style="color: #333; font-weight: 600;">Room Price (DT)</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-money-bill-wave"></i>
                        </span>
                    </div>
                    <input type="number" class="form-control" id="roomPrice" placeholder="Enter room price"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
                <p id="priceError" style="color: rgb(168, 41, 56);"></p>
            </div>

            <!-- Equipment -->
            <div class="col-md-12 form-group">
                <label style="color: #333; font-weight: 600;">Equipment</label>
                <div class="input-group" style="background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <!-- Air Conditioning -->
                    <div class="form-check" style="margin-right: 20px;">
                        <input type="checkbox" id="air-conditioning-room" class="form-check-input">
                        <label for="air-conditioning-room" class="form-check-label">
                            <i class="fa fa-snowflake" style="color: rgb(155, 5, 5);"></i> Air Conditioning
                        </label>
                    </div>

                    <!-- Heating -->
                    <div class="form-check" style="margin-right: 20px;">
                        <input type="checkbox" id="heating-room" class="form-check-input">
                        <label for="heating-room" class="form-check-label">
                            <i class="fa fa-fire" style="color: rgb(155, 5, 5);"></i> Heating
                        </label>
                    </div>

                    <!-- TV -->
                    <div class="form-check" style="margin-right: 20px;">
                        <input type="checkbox" id="tv" class="form-check-input">
                        <label for="tv" class="form-check-label">
                            <i class="fa fa-tv" style="color: rgb(155, 5, 5);"></i> TV
                        </label>
                    </div>

                    <!-- Private Bathroom -->
                    <div class="form-check" style="margin-right: 20px;">
                        <input type="checkbox" id="private-bathroom" class="form-check-input">
                        <label for="private-bathroom" class="form-check-label">
                            <i class="fa fa-bath" style="color: rgb(155, 5, 5);"></i> Private Bathroom
                        </label>
                    </div>

                    <!-- Jacuzzi -->
                    <div class="form-check">
                        <input type="checkbox" id="jacuzzi" class="form-check-input">
                        <label for="jacuzzi" class="form-check-label">
                            <i class="fa fa-hot-tub" style="color: rgb(155, 5, 5);"></i> Jacuzzi
                        </label>
                    </div>
                </div>
            </div>

            <!-- Validate and Cancel Buttons -->
            <div class="col-md-12 form-group" style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" class="primary-btn" onclick="validateAddRoom(${houseId})"
                        style="padding: 10px 18px; background-color: rgb(155, 5, 5); color: white; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                    <i class="fa fa-check" style="margin-right: 8px;"></i> Add Room
                </button>
                <button type="button" class="primary-btn" onclick="cancel('addRoom')"
                        style="padding: 10px 18px; background-color: #ddd; color: #333; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                    <i class="fa fa-times" style="margin-right: 8px;"></i> Cancel
                </button>
            </div>
        </div>
    `;

    document.getElementById("addRoom").innerHTML = form;
}// Fonction cancel pour vider le contenu d'un élément avec l'id
function cancel(id) {
    document.getElementById(id).innerHTML = "";
}
//masquer model
function hideModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}

//validation de addroom inhousesOwner (dashboerd)
function validateAddRoom(houseId) {

    const roomName = document.getElementById("roomName").value;
    const roomDescription = document.getElementById("description").value;
    const roomCapacity = parseInt(document.getElementById("roomCapacity").value);
    const roomPrice = parseFloat(document.getElementById("roomPrice").value);

    const airConditioning = document.getElementById("air-conditioning-room").checked;
    const heating = document.getElementById("heating-room").checked;
    const tv = document.getElementById("tv").checked;
    const privateBathroom = document.getElementById("private-bathroom").checked;
    const jacuzzi = document.getElementById("jacuzzi").checked;


    let isValid = true;

    // Réinitialisation des messages d'erreur
    document.getElementById("roomNameError").innerHTML = "";
    document.getElementById("capacityError").innerHTML = "";
    document.getElementById("priceError").innerHTML = "";

    if (roomName.length < 3) {
        document.getElementById("roomNameError").innerHTML = "⚠ Room Name must be at least 3 characters.";
        isValid = false;
    }


if (isNaN(roomCapacity) || roomCapacity <= 0) {
    document.getElementById("capacityError").innerHTML = "⚠ Capacity must be a positive number.";
    isValid = false;
}

if (isNaN(roomPrice) || roomPrice <= 0) {
    document.getElementById("priceError").innerHTML = "⚠ Price must be a positive number.";
    isValid = false;
}
  
    let roomsTab = JSON.parse(localStorage.getItem("roomsTab") || "[]");
    // Vérifier si le nombre maximal de chambres pour cette maison est==5 ou non
    let roomCount = 0;
    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].houseId == houseId) {
            roomCount++;
        }
    }

    if (roomCount >= 5) {
        toggleModal(true)
        isValid = false;
    }
if(isValid){
  
    const room = {
        id: generateId(roomsTab),
        houseId: houseId,
        name: roomName,
        description: roomDescription,
        capacity: roomCapacity,
        price: roomPrice,
        equipment: {
            airConditioning: airConditioning,
            heating: heating,
            tv: tv,
            privateBathroom: privateBathroom,
            jacuzzi: jacuzzi,
        }
    };

 
    roomsTab.push(room);
    localStorage.setItem("roomsTab", JSON.stringify(roomsTab));
    alert("Room added successfully!");
    document.getElementById("addRoom").innerHTML = "";
    location.reload();
}}
   // Fonction pour éditer les détails d'une chambre
function editRoom(roomId) {
    var roomsTab = JSON.parse(localStorage.getItem("roomsTab") || "[]");
    var room;

    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == roomId) {
            room = roomsTab[i];
            break;
        }
    }

    var form = `
        <div class="row login_form" style="color: #000; background-color: #fff; padding: 20px; border-radius: 10px; border: 2px solid #000;">
            
            <!-- Title with Icon -->
            <div class="col-md-12 form-group" style="margin-bottom: 20px;">
                <h3 style="color: #333; font-weight: 600;">
                    <i class="fa fa-pencil" style="color: rgb(155, 5, 5);"></i> Edit Room
                </h3>
            </div>

            <!-- Room Name -->
            <div class="col-md-12 form-group">
                <label for="newRoomName" style="color: #333; font-weight: 600;">Room Name</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-bed"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="newRoomName" value="${room.name}"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
            </div>

            <!-- Room Capacity -->
            <div class="col-md-12 form-group">
                <label for="newRoomCapacity" style="color: #333; font-weight: 600;">Room Capacity</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-users"></i>
                        </span>
                    </div>
                    <input type="number" class="form-control" id="newRoomCapacity" value="${room.capacity}"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
            </div>

            <!-- Room Price -->
            <div class="col-md-12 form-group">
                <label for="newRoomPrice" style="color: #333; font-weight: 600;">Room Price (DT)</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-money"></i>
                        </span>
                    </div>
                    <input type="number" class="form-control" id="newRoomPrice" value="${room.price}"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
            </div>

            <!-- Room Description -->
            <div class="col-md-12 form-group">
                <label for="newRoomDescription" style="color: #333; font-weight: 600;">Room Description</label>
                <textarea class="form-control" id="newRoomDescription" rows="4" style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">${room.description}</textarea>
            </div>

            <!-- Room Equipment -->
            <div class="col-md-12 form-group">
                <label style="color: #333; font-weight: 600;">Room Equipment</label>
                <div class="checkbox-group" style="display: flex; flex-wrap: wrap; gap: 25px; margin-bottom: 20px;">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-snowflake" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="air-conditioning-room"> Air Conditioning
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-thermometer-half" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="heating-room"> Heating
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-tv" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="tv"> TV
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-bath" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="private-bathroom"> Private Bathroom
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-hot-tub" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="jacuzzi"> Jacuzzi
                    </label>
                </div>
            </div>

            <!-- Validate Button -->
            <div class="col-md-12 form-group">
               <button type="submit" class="primary-btn" onclick="validateRoomEdit(${roomId})"
        style="padding: 10px 18px; background-color: rgb(155, 5, 5); color: white; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; transition: background-color 0.3s ease;">
    <i class="fa fa-check" style="margin-right: 8px;"></i> Validate
</button>
 <button type="button" class="primary-btn" onclick="cancel('formDiv')"
    style="padding: 10px 18px; background-color: #ddd; color: #333; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
    <i class="fa fa-times" style="margin-right: 8px;"></i> Cancel
</button>

            </div>
        </div>`;

    document.getElementById("formDiv").innerHTML = form;
    updateCheckboxes(room.equipment);
}



function updateCheckboxes(equipment) {
    document.getElementById("air-conditioning-room").checked = equipment.airConditioning;
    document.getElementById("heating-room").checked = equipment.heating;
    document.getElementById("tv").checked = equipment.tv;
    document.getElementById("private-bathroom").checked = equipment.privateBathroom;
    document.getElementById("jacuzzi").checked = equipment.jacuzzi;
}
//fct pour valider
function validateRoomEdit(roomId) {
    var newRoomName = document.getElementById("newRoomName").value;
    var newRoomCapacity = document.getElementById("newRoomCapacity").value;
    var newRoomPrice = document.getElementById("newRoomPrice").value;
    var newRoomDescription = document.getElementById("newRoomDescription").value; 

    var roomsTab = JSON.parse(localStorage.getItem("roomsTab") || "[]");

    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == roomId) {
            roomsTab[i].name = newRoomName;
            roomsTab[i].capacity = newRoomCapacity;
            roomsTab[i].price = newRoomPrice;
            roomsTab[i].description = newRoomDescription; 

            roomsTab[i].equipment.airConditioning = document.getElementById("air-conditioning-room").checked;
            roomsTab[i].equipment.heating = document.getElementById("heating-room").checked;
            roomsTab[i].equipment.tv = document.getElementById("tv").checked;
            roomsTab[i].equipment.privateBathroom = document.getElementById("private-bathroom").checked;
            roomsTab[i].equipment.jacuzzi = document.getElementById("jacuzzi").checked;

            break;
        }
    }

    localStorage.setItem("roomsTab", JSON.stringify(roomsTab));
    location.reload();
}
function deleteRoom(roomId) {
    
    var roomsTab = JSON.parse(localStorage.getItem("roomsTab") || "[]");
    var bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    var roomIndex = -1;
    for (let i = 0; i < roomsTab.length; i++) {
        if (roomsTab[i].id == roomId) {
            roomIndex = i;
            break;
        }
    }

    if (roomIndex !== -1) {
        roomsTab.splice(roomIndex, 1); // Supprimer la chambre
        localStorage.setItem("roomsTab", JSON.stringify(roomsTab));
    }

    // Supprimer manuellement les réservations associées à la chambre
    for (let i = bookings.length - 1; i >= 0; i--) {
        if (bookings[i].roomId == roomId) {
            bookings.splice(i, 1); // Supprimer la réservation
        }
    }

    // Mettre à jour le tableau des réservations dans le localStorage
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Recharger la page 
    location.reload();
}
function deleteHouse(houseId) {
    var housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    var roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    var bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    console.log("Initial housesTab:", housesTab);
    console.log("Initial roomsTab:", roomsTab);
    console.log("Initial bookings:", bookings);

    // Trouver la maison à supprimer
    var house = null;
    for (let i = 0; i < housesTab.length; i++) {
        if (housesTab[i].id == houseId) {
            house = housesTab[i];
            break;
        }
    }
    console.log("House to delete:", house);

    if (house) {
        // Supprimer les chambres associées à la maison
        for (let i = 0; i < roomsTab.length; i++) {
            if (roomsTab[i].houseId == houseId) {
                console.log("Deleting room:", roomsTab[i]);
                // Supprimer les réservations liées à la chambre
                for (let j = 0; j < bookings.length; j++) {
                    if (bookings[j].roomId == roomsTab[i].id) {
                        console.log("Deleting booking:", bookings[j]);
                        bookings.splice(j, 1);
                        j--; // Ajuster l'index pour n'est pas sauter un element
                    }
                }
                roomsTab.splice(i, 1); // Supprimer la chambre
                i--; // Ajuster l'index
            }
        }

        // Supprimer la maison
        for (let i = 0; i < housesTab.length; i++) {
            if (housesTab[i].id == houseId) {
                console.log("Deleting house:", housesTab[i]);
                housesTab.splice(i, 1); // Supprimer la maison
                break; // Une seule maison à supprimer
            }
        }

        console.log("Updated housesTab:", housesTab);
        console.log("Updated roomsTab:", roomsTab);
        console.log("Updated bookings:", bookings);

        // Mettre à jour le localStorage
        localStorage.setItem("housesTab", JSON.stringify(housesTab));
        localStorage.setItem("roomsTab", JSON.stringify(roomsTab));
        localStorage.setItem("bookings", JSON.stringify(bookings));

        alert("House and related data deleted successfully!");
        location.reload();
    } else {
        console.log("House not found!");
        alert("House not found!");
    }
}


function editHouse(houseId) {
    let housesTab = JSON.parse(localStorage.getItem("housesTab") || "[]");
    let house = null;
    for (let i = 0; i < housesTab.length; i++) {
        if (housesTab[i].id == houseId) {
            house = housesTab[i];
            break;
        }
    }

    const form = `
        <div class="row edit-house-form" style="color: #000; background-color: #fff; padding: 20px; border-radius: 10px; border: 2px solid #000;">
            
            <!-- Title with Icon -->
            <div class="col-md-12 form-group" style="margin-bottom: 20px;">
                <h3 style="color: #333; font-weight: 600;">
                    <i class="fa fa-home" style="color: rgb(155, 5, 5);"></i> Edit House
                </h3>
            </div>

            <!-- House Name -->
            <div class="col-md-12 form-group">
                <label for="editHouseName" style="color: #333; font-weight: 600;">House Name</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-building"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="editHouseName" value="${house.name}"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
            </div>

            <!-- House Address -->
            <div class="col-md-12 form-group">
                <label for="editHouseAddress" style="color: #333; font-weight: 600;">Address</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-map-marker-alt"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="editHouseAddress" value="${house.address}"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
            </div>

            <!-- House City -->
            <div class="col-md-12 form-group">
                <label for="editHouseCity" style="color: #333; font-weight: 600;">City</label>
                <div class="input-group" style="background-color: #f9f9f9;">
                    <div class="input-group-prepend">
                        <span class="input-group-text" style="background-color: #f9f9f9; color: rgb(155, 5, 5);">
                            <i class="fa fa-city"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control" id="editHouseCity" value="${house.city}"
                           style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">
                </div>
            </div>

            <!-- Description -->
            <div class="col-md-12 form-group">
                <label for="editHouseDescription" style="color: #333; font-weight: 600;">Description</label>
                <textarea id="editHouseDescription" class="form-control" rows="4" style="padding: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; background-color: #f9f9f9; color: #333;">${house.description}</textarea>
            </div>

            <!-- Equipment -->
            <div class="col-md-12 form-group">
                <label style="color: #333; font-weight: 600;">Equipment</label>
                <div class="checkbox-group" style="display: flex; flex-wrap: wrap; gap: 25px; margin-bottom: 20px;">
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-wifi" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="editWifi"> WiFi
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-swimming-pool" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="editPool"> Pool
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-utensils" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="editKitchen"> Kitchen
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px;">
                        <i class="fa fa-bath" style="color: rgb(155, 5, 5); font-size: 18px;"></i>
                        <input type="checkbox" id="editBathroom"> Bathroom
                    </label>
                </div>
            </div>

            <!-- Validate Button -->
            <div class="col-md-12 form-group">
                <button type="submit" class="primary-btn" onclick="validateHouseEdit(${houseId})"
                        style="padding: 10px 18px; background-color: rgb(155, 5, 5); color: white; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; transition: background-color 0.3s ease;">
                    <i class="fa fa-check" style="margin-right: 8px;"></i> Validate
                </button>
                <button type="button" class="primary-btn" onclick="cancel('addRoom')"
                        style="padding: 10px 18px; background-color: #ddd; color: #333; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                    <i class="fa fa-times" style="margin-right: 8px;"></i> Cancel
                </button>
            </div>
        </div>
    `;

    document.getElementById("addRoom").innerHTML = form;
}




function validateHouseEdit(houseId) {
    const newName = document.getElementById("editHouseName").value;
    const newAddress = document.getElementById("editHouseAddress").value;
    const newCity = document.getElementById("editHouseCity").value;
    const newDescription = document.getElementById("editHouseDescription").value;

    const wifi = document.getElementById("editWifi").checked;
    const pool = document.getElementById("editPool").checked;
    const kitchen = document.getElementById("editKitchen").checked;
    const bathroom = document.getElementById("editBathroom").checked;

    let housesTab = JSON.parse(localStorage.getItem("housesTab") || "[]");
    for (let i = 0; i < housesTab.length; i++) {
        if (housesTab[i].id == houseId) {
            housesTab[i].name = newName;
            housesTab[i].address = newAddress;
            housesTab[i].city = newCity;
            housesTab[i].description = newDescription;
            housesTab[i].equipment = {
                wifi: wifi,
                pool: pool,
                kitchen: kitchen,
                bathroom: bathroom
            };
            break;
        }
    }
    localStorage.setItem("housesTab", JSON.stringify(housesTab));
    alert("House updated successfully!");
    location.reload();
}
function deleteReservation(reservationId) {
    const confirmDelete = confirm("Are you sure you want to delete this reservation?");
    if (!confirmDelete) {
        return; 
    }

    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    let found = false;
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].id == reservationId) {
            bookings.splice(i, 1); // Supprimer la réservation
            found = true;
            break;
        }
    }

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Reservation deleted successfully!");
    location.reload();
}
function displayAdminUsers() {
    const usersTab = JSON.parse(localStorage.getItem("users")) || [];
    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || []; 
    let content = "";

    // Parcours des utilisateurs
    for (let i = 0; i < usersTab.length; i++) {
        const user = usersTab[i];

    // un statut par défaut s'il n'est pas défini
        if (!user.status) {
            if (user.role === "owner") {
                user.status = "not validated"; // Si c'est un propriétaire, le statut est "not validated"
            } else {
                user.status = "validated"; // Sinon, le statut est "validated"
            }
        }
        if (user.role !== "admin") {

            content += `
                <tr>
                    <td>
                        <div class="media">
                            <div class="media-body">
                                <p>${user.id}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h5>${user.FN} </h5>
                    </td>
                      <td>
                        <h5>${user.LN}</h5>
                    </td>
                    
                    <td>
                        <h5>${user.email}</h5>
                    </td>
                    <td>
                        <h5>${user.tel}</h5>
                    </td>
                      <td>
                        <h5>${user.adress}</h5>
                    </td>

                    <td>
                        <h5>${user.role}</h5>
                    </td>
                    <td>
                        <h5>${user.status}</h5>
                    </td>
                    
                   
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            `;
            if (user.role == "owner" && user.status == "not validated") {
                content += `
                    <button class="btn btn-warning" onclick="validateOwner(${user.id})">Validate</button>
                `;
            }
            content += `
                    </td>
                </tr>
            `;
        }
    }

    // Insérer le contenu généré dans l'élément HTML
    document.getElementById("usersList").innerHTML = content;
}
//fct pour valider le owner
function validateOwner(id) {
    usersTab = JSON.parse(localStorage.getItem("users")) || [];
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == id) {
            usersTab[i].status = "validated";
            break;
        }
    } 
    localStorage.setItem("users", JSON.stringify(usersTab));
    location.reload();
}
function deleteUser(userId) {
    var usersTab = JSON.parse(localStorage.getItem("users")) || [];
    var housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    var roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    var bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    console.log("Initial usersTab:", usersTab);
    console.log("Initial housesTab:", housesTab);
    console.log("Initial roomsTab:", roomsTab);
    console.log("Initial bookings:", bookings);

    // Trouver l'utilisateur
    var user = null;
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == userId) {
            user = usersTab[i];
            break;
        }
    }
    console.log("User to delete:", user);

    if (user) {
        if (user.role === "owner") {
            console.log("Deleting owner-related data...");
            for (let i = 0; i < housesTab.length; i++) {// Suppression des maisons du propriétaire
                if (housesTab[i].ownerId == userId) {
                    console.log("Deleting house:", housesTab[i]);
                    for (let j = 0; j < roomsTab.length; j++) {// Suppression des chambres de chaque maison
                        if (roomsTab[j].houseId == housesTab[i].id) {
                            console.log("Deleting room:", roomsTab[j]);
                            for (let k = 0; k < bookings.length; k++) {// Suppression des réservations associées
                                if (bookings[k].roomId == roomsTab[j].id) {
                                    console.log("Deleting booking:", bookings[k]);
                                    bookings.splice(k, 1);
                                    k--; // Ajuster l'index
                                }
                            }
                            roomsTab.splice(j, 1);
                            j--; // Ajuster l'index
                        }
                    }
                    housesTab.splice(i, 1);
                    i--; // Ajuster l'index
                }
            }
        } else if (user.role === "client") {
            console.log("Deleting client-related bookings...");
            for (let i = 0; i < bookings.length; i++) {
                if (bookings[i].userId == userId) {
                    console.log("Deleting booking:", bookings[i]);
                    bookings.splice(i, 1);
                    i--; // Ajuster l'index
                }
            }
        }

        console.log("Deleting user:", user);
        for (let i = 0; i < usersTab.length; i++) {
            if (usersTab[i].id == userId) {
                usersTab.splice(i, 1);
                break;
            }
        }

        console.log("Updated usersTab:", usersTab);
        console.log("Updated housesTab:", housesTab);
        console.log("Updated roomsTab:", roomsTab);
        console.log("Updated bookings:", bookings);

        // Mettre à jour le localStorage
        localStorage.setItem("users", JSON.stringify(usersTab));
        localStorage.setItem("housesTab", JSON.stringify(housesTab));
        localStorage.setItem("roomsTab", JSON.stringify(roomsTab));
        localStorage.setItem("bookings", JSON.stringify(bookings));

        alert("User and related data deleted successfully!");
        location.reload();
    } else {
        console.log("User not found!");
        alert("User not found!");
    }
}

function displayAdminHouses() {

    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];

    let content = "";

    // Parcourir les maisons
    for (let i = 0; i < housesTab.length; i++) {
        const house = housesTab[i];
        const owner = searchObjByIdAndKey(house.ownerId, "users");
        if (owner) {
            // Ajouter les informations de la maison et du propriétaire dans le tableau
            content += `
                <tr class="text-center">
                    <td>${house.id}</td>
                    <td>${house.name}</td>
                    <td>${house.address}</td>
                    <td>${house.city}</td>
                    <td>${house.ownerId}</td>
                    <td>${owner.FN} ${owner.LN}</td>
                    <td>${owner.tel}</td>
                    <td>${owner.email}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteHouse(${house.id})">Delete</button>
                        <button class="btn btn-info" onclick="editHouse('${house.id}')">Edit</button>
                    </td>
                </tr>
            `;
        } 
    }
    document.getElementById("housesList").innerHTML = content;
}


function displayAdminRoom() {
    const roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
    const housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
    const usersTab = JSON.parse(localStorage.getItem("users")) || [];  

    let content = "";
    for (let i = 0; i < roomsTab.length; i++) {
        const room = roomsTab[i];
        const house = searchObjByIdAndKey(room.houseId, "housesTab");  
        const owner =  searchObjByIdAndKey(house.ownerId, "users") 
        if (house && owner) {
            content += `
                <tr class="text-center">
                    <td>${room.id}</td>
                    <td>${room.name}</td>
                    <td>${room.capacity}</td>
                    <td>${room.price}DT</td>
                    <td>${house.name}</td>
                    <td>${owner.FN} ${owner.LN}</td>  
                    <td>${owner.tel}</td>  
                    <td>${owner.email}</td> 
                     <td>
                        <button class="btn btn-warning" onclick="editRoom('${room.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteRoom('${room.id}')">Delete</button>
                    </td> 
                </tr>
            `;
        } 
    }
    document.getElementById("roomsList").innerHTML = content;
}

function displayAdminReserv() {

     bookings = JSON.parse(localStorage.getItem("bookings")) || [];
     housesTab = JSON.parse(localStorage.getItem("housesTab")) || [];
     roomsTab = JSON.parse(localStorage.getItem("roomsTab")) || [];
   usersTab = JSON.parse(localStorage.getItem("users")) || [];
     content = "";
     totalRevenue = 0;

    for (let i = 0; i < bookings.length; i++) {
         booking = bookings[i];

         roomDetails = searchObjByIdAndKey(booking.roomId, "roomsTab");
         houseDetails = searchObjByIdAndKey(roomDetails.houseId, "housesTab");
         guestDetails = searchObjByIdAndKey(booking.userId, "users");
        if (houseDetails && roomDetails && guestDetails) {
            totalRevenue += booking.totalPrice; 
            content += `
                <tr class="text-center">
                    <td>${booking.id}</td>
                    <td>${houseDetails.id}</td>
                    <td>${houseDetails.name}</td>
                    <td>${roomDetails.id}</td>
                    <td>${roomDetails.name}</td>
                    <td>${roomDetails.capacity || "N/A"}</td>
                    <td>${houseDetails.address}</td>
                    <td>${guestDetails.id}</td>
                    <td>${guestDetails.FN} ${guestDetails.LN}</td>
                    <td>${booking.numberOfGuests}</td>
                    <td>${guestDetails.email}</td>
                    <td>${guestDetails.tel}</td>
                    <td>${booking.checkInDate}</td>
                    <td>${booking.checkOutDate}</td>
                    <td>${booking.totalPrice} DT</td>
                    <td>${booking.status}</td>
                
                    <td>
                        <button class="btn btn-danger" onclick="deleteReservation(${booking.id})">Delete</button>
                    </td>
                </tr>
            `;
        }
    }
    content += `
        <tr>
            <td colspan="15" class="text-right font-weight-bold">Total Revenue:</td>
            <td>${totalRevenue} DT</td>
            <td></td>
        </tr>
    `;


    document.getElementById("reservationsList").innerHTML = content;
}
//afficher les informations personnelles de l'utilisateur connecté sur la page de profil.
function displayProfile() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var connectedUser = null;

    // Recherche de l'utilisateur connecté
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == connectedUserId) {
            connectedUser = usersTab[i];
            break;
        }
    }

    var profileContainer = document.getElementById("profileContainer");

    if (!connectedUser) {
        profileContainer.innerHTML = `
            <div class="text-center mt-4">
                <h5 class="text-danger" style="font-size: 24px;">No profile found.</h5>
                <p style="font-size: 18px;">Please create an account to access your profile.</p>
                <button class="btn btn-primary" onclick="redirectToSignup()">Sign Up</button>
            </div>
        `;
        return;
    } else {
    
        var content = `
            <div class="row">
                <div class="col-sm-6">
                    <p class="font-weight-bold" style="font-size: 20px;">
                        <i class="fas fa-user"></i> First Name:
                    </p>
                    <h6 class="text-muted" style="font-size: 18px;">${connectedUser.FN}</h6>
                </div>
                <div class="col-sm-6">
                    <p class="font-weight-bold" style="font-size: 20px;">
                        <i class="fas fa-user"></i> Last Name:
                    </p>
                    <h6 class="text-muted" style="font-size: 18px;">${connectedUser.LN}</h6>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-6">
                    <p class="font-weight-bold" style="font-size: 20px;">
                        <i class="fas fa-envelope"></i> Email:
                    </p>
                    <h6 class="text-muted" style="font-size: 18px;">${connectedUser.email}</h6>
                </div>
                <div class="col-sm-6">
                    <p class="font-weight-bold" style="font-size: 20px;">
                        <i class="fas fa-phone"></i> Phone:
                    </p>
                    <h6 class="text-muted" style="font-size: 18px;">${connectedUser.tel}</h6>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-sm-12">
                    <p class="font-weight-bold" style="font-size: 20px;">
                        <i class="fas fa-home"></i> Address:
                    </p>
                    <h6 class="text-muted" style="font-size: 18px;">${connectedUser.adress}</h6>
                </div>
            </div>
            <button class="btn btn-dark text-white mt-3 center" onclick="editProfile()">
    <i class="fas fa-edit"></i> Edit
</button>
        `;

        profileContainer.innerHTML = content;
    }
}
function redirectToSignup() {
    location.replace("signup.html");
}
function editProfile() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var connectedUser = null;
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == connectedUserId) {
            connectedUser = usersTab[i];
            break;
        }
    }
  
    var content = `
        <div class="row">
            <div class="col-sm-6">
                <p class="font-weight-bold" style="font-size: 20px;">
                    <i class="fas fa-user"></i> First Name:
                </p>
                <input type="text" class="form-control" id="FN" value="${connectedUser.FN}">
                <span id="fnError" class="text-danger"></span> 
            </div>
            <div class="col-sm-6">
                <p class="font-weight-bold" style="font-size: 20px;">
                    <i class="fas fa-user"></i> Last Name:
                </p>
                <input type="text" class="form-control" id="LN" value="${connectedUser.LN}">
                <span id="lnError" class="text-danger"></span> <!-- Erreur nom -->
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-6">
                <p class="font-weight-bold" style="font-size: 20px;">
                    <i class="fas fa-envelope"></i> Email:
                </p>
                <input type="email" class="form-control" id="email" value="${connectedUser.email}">
                <span id="emailError" class="text-danger"></span> <!-- Erreur email -->
            </div>
            <div class="col-sm-6">
                <p class="font-weight-bold" style="font-size: 20px;">
                    <i class="fas fa-phone"></i> Phone:
                </p>
                <input type="number" class="form-control" id="tel" value="${connectedUser.tel}">
                <span id="phoneError" class="text-danger"></span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-sm-12">
                <p class="font-weight-bold" style="font-size: 20px;">
                    <i class="fas fa-home"></i> Address:
                </p>
                <input type="text" class="form-control" id="adress" value="${connectedUser.adress}">
                <span id="addressError" class="text-danger"></span> 
            </div>
        </div>
        <button class="btn btn-danger text-white mt-3" onclick="saveProfile()">
            <i class="fas fa-save"></i> Save
        </button>
        <button class="btn btn-light text-dark mt-3" onclick="displayProfile()">
            <i class="fas fa-times-circle"></i> Cancel
        </button>
    `;

    document.getElementById("profileContainer").innerHTML = content;
}

function saveProfile() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var usersTab = JSON.parse(localStorage.getItem("users") || "[]");
    var connectedUser;
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].id == connectedUserId) {
            connectedUser = usersTab[i];
            break;
        }
    }
    var email = document.getElementById("email").value;
    var phone = document.getElementById("tel").value;
    var FN = document.getElementById("FN").value;
    var LN = document.getElementById("LN").value;
    var adress = document.getElementById("adress").value;

    var isValid = true; 
    if (!checktel(phone, 8)) {
        document.getElementById("phoneError").innerHTML = "Phone number must be 8 digits.";
        document.getElementById("phoneError").style.color = "red";
        isValid = false; 
    } else {
        document.getElementById("phoneError").innerHTML = "";
    }

    // Vérification du prénom via IsAlpha
    if (!IsAlpha(FN, 3)) {
        document.getElementById("fnError").innerHTML = "FN must be alphabetic and at least 3 characters long.";
        document.getElementById("fnError").style.color = "red";
        isValid = false; 
    } else {
        document.getElementById("fnError").innerHTML = "";
    }
    if (!IsAlpha(LN, 3)) {
        document.getElementById("lnError").innerHTML = "LN must be alphabetic and at least 3 characters long.";
        document.getElementById("lnError").style.color = "red";
        isValid = false;
    } else {
        document.getElementById("lnError").innerHTML = "";
    }
    if (isValid) {
        connectedUser.FN = FN;
        connectedUser.LN = LN;
        connectedUser.email = email;
        connectedUser.tel = phone;
        connectedUser.adress = adress;
        for (var i = 0; i < usersTab.length; i++) {
            if (usersTab[i].id == connectedUserId) {
                usersTab[i] = connectedUser;
                break;
            }
        }

        localStorage.setItem("users", JSON.stringify(usersTab));
        location.reload();
    }
}
function generateHeader() {
    var connectedUserId = localStorage.getItem("connectedUserId");
    var content = "";
    var connectedUser = searchObjByIdAndKey(connectedUserId, "users");

    // connected user
    if (connectedUserId) {
        // client
        if (connectedUser.role == "client") {
            content = `<div class="main_menu">
                <nav class="navbar navbar-expand-lg navbar-light main_box">
                    <div class="container">
                        <!-- Logo -->
                        <a class="navbar-brand logo_h" href="house.html"><img src="img/logo.png" alt=""></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <!-- Navigation -->
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item"><a class="nav-link" href="house.html"><i class="fas fa-home"></i> Houses</a></li>
                                <li class="nav-item"><a class="nav-link" href="basket.html"><i class="fas fa-shopping-basket"></i> Basket</a></li>
                                <li class="nav-item"><a class="nav-link" href="Profile.html"><i class="fas fa-user"></i> Hello ${connectedUser.FN} ${connectedUser.LN}</a></li>
                                <li class="nav-item"><a class="nav-link" href="searchHouse.html"><i class="fas fa-search"></i> Search</a></li>
                                <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                                <li class="nav-item"><button class="nav-link" onclick="logOut()"><i class="fas fa-sign-out-alt"></i> LogOut</button></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>`;
        }
        // store (owner)
        else if (connectedUser.role == "owner") {
            content = `<div class="main_menu">
                <nav class="navbar navbar-expand-lg navbar-light main_box">
                    <div class="container">
                        <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item"><a class="nav-link" href="house.html"><i class="fas fa-home"></i> Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="AddHouse.html"><i class="fas fa-plus-circle"></i> Add House</a></li>
                                <li class="nav-item"><a class="nav-link" href="OWNER.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                                <li class="nav-item"><a class="nav-link" href="Profile.html"><i class="fas fa-user"></i> Hello ${connectedUser.FN} ${connectedUser.LN}</a></li>
                                <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                                <li class="nav-item"><button class="nav-link" onclick="logOut()"><i class="fas fa-sign-out-alt"></i> LogOut</button></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>`;
        }
        // admin
        else if (connectedUser.role == "admin") {
            content = `<div class="main_menu">
                <nav class="navbar navbar-expand-lg navbar-light main_box">
                    <div class="container">
                        <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                            <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item"><a class="nav-link" href="admin.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>

                                <li class="nav-item"><a class="nav-link" href="profile.html"><i class="fas fa-user"></i> Profile</a></li>
                                <li class="nav-item"><button class="nav-link" onclick="logOut()"><i class="fas fa-sign-out-alt"></i> LogOut</button></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>`;
        }
    }
    // non-connected
    else {
        content = `<div class="main_menu">
            <nav class="navbar navbar-expand-lg navbar-light main_box">
                <div class="container">
                    <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul class="nav navbar-nav menu_nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="house.html"><i class="fas fa-home"></i> Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="searchHouse.html"><i class="fas fa-search"></i> Search</a></li>
                            <li class="nav-item"><a class="nav-link" href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                            <li class="nav-item"> <a class="nav-link" href="signup.html"><i class="fas fa-user-plus"></i> client</a> 
                            <li class="nav-item"><a class="nav-link" href="SignupOnwer.html"><i class="fas fa-store"></i>Owner</a></li>
                            <li class="nav-item"><a class="nav-link" href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>`;
    }

    document.getElementById("headerDiv").innerHTML = content;
}
function logOut() {
    localStorage.removeItem("connectedUserId");
location.replace("house.html")
}