function display(res) {
  const usertype = res.data.usertype;
  console.log(usertype);

  const tbody = document.querySelector("table");
  tbody.innerHTML = `
        <thead>
                                          <tr>
                                            <th scope="col">Cin</th>
                                            <th scope="col">Date de prise</th>
                                            <th scope="col">Nombre de jours</th>
                                            <th scope="col">Date de depart</th>
                                            <th scope="col">type</th>
                                            <th scope="col">Etat</th>
                                            <th scope="col">Action</th>
                                          </tr>
        </thead>



        `;
  const e = document.createElement("tbody");
  demandes = res.data.demande;
  let table = ``;
  let i = 0;
  const disp = demandes.forEach((Element) => {
    table += `
          <tr><th scope="row">${Element.cin} </th>
                                              <td>${Element.prise.substring(
                                                0,
                                                24
                                              )}</td>
                                              <td>${Element.nb_jour}</td>
                                              <td>${Element.date_depart}</td>
                                              <td>${Element.type}</td>`;
    if (Element.etat === "En attente") {
      if (usertype === "admin") {
        table += `
          <td><span class="badge bg-warning">${Element.etat}</span></td>
          
          <td>
                                              <button type="button" class="btn btn-success" onClick="showValidationModal('${Element._id}')" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" >
                                                Validée
                                              </button>
                                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter2" style="background-color: #fc7878;" onclick="showDenyingModal('${Element._id}')">
                                                Refusée
                                              </button>
          </td>
        </tr> 
          `;
      } else {
        table += `<td><span class="badge bg-warning">${Element.etat}</span></td>
          
          <td>--
            </td>
            </tr>`;
      }
    } else if (Element.etat === "valide") {
      if (usertype === "admin") {
        table += `<td><span class="badge bg-success">Validée</span></td>
                                              <td>
                                              
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter2" style="background-color: #fc7878;" onclick="showDenyingModal('${Element._id}')">
                                                Refusée
                                              </button>

                                            

                                            
                                            <button type="button" class="btn btn-primary" onclick="genPDF('${Element.nb_jour}','1','1','${Element.cin}')">
                                              Extraire
                                            </button>
                                            

                                              </td>
                                              
                                            </tr>`;
      } else {
        table += `
                                              <td><span class="badge bg-success">Validée</span></td>
                                              <td>
                                              <button type="button" class="btn btn-primary" onclick="genPDF('${Element.nb_jour}','1','1','${Element.cin}')">
                                              Extraire
                                            </button>
                                              </td>
                                              </tr>

                                              `;
      }
    } else if (Element.etat === "refus") {
      if (usertype === "admin") {
        table += `<td><span class="badge bg-danger" style="background-color: #fc7878;">Refusée</span></td>
            <td>
                                              <button type="button" class="btn btn-success" onClick="showValidationModal('${Element._id}')" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" >
                                                Validée
                                              </button>
                                              </td>
                                                
                                              </tr>`;
      } else {
        table += `
                                              <td><span class="badge bg-danger" style="background-color: #fc7878;">Refusée</span></td>
                                              <td>
                                                --
                                                </td>
                                                </tr>
                                              `;
      }
    }
  });

  e.innerHTML = table;
  tbody.appendChild(e);
}

axios
  .post("./api/getdemande", { token: localStorage.getItem("token") })
  .then((res) => display(res));
axios
  .post("./api/getdemande", { token: localStorage.getItem("token") })
  .then((res) => Notification(res));

// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});
// Listen for messages
socket.addEventListener("message", function (event) {
  event.data.text().then((txt) => getNotification(txt));

  axios.get("./api/getdemande").then((res) => display(res));
  console.log("new demande");
});
function showValidationModal(id) {
  console.log("this is event : ", id);
  const validationLink = document.querySelector("#validationlink");
  validationLink.setAttribute(
    "href",
    `./getdemande.html?action=valide&id=${id}`
  );
  console.log(validationLink);
}
function showDenyingModal(id) {
  console.log("id is :", id);
  const denyingLink = document.querySelector("#denyingLink");
  denyingLink.setAttribute("href", `/getdemande.html?action=refus&id=${id}`);
  console.log(denyingLink);
}

function genPDF(jr, nom, grade, cin) {
  console.log(jr, nom, grade, cin);
  let doc = new jsPDF();
  let img = new Image();
  img.src = "conge_p1.png";
  let img2 = new Image();
  img2.src = "conge_p2.png";
  console.log(img2)
  img.onload = () => {
    doc.addImage(img, "png", 0, 0, 220, 150);
    doc.addImage(img2, "png", 0, 160, 210, 80);
    doc.text(45, 171, "JOURS");
    doc.text(100, 185, "Nom Prenom");
    doc.text(100, 198, "Grade");
    doc.text(160, 212, "CIN");
  doc.save("myPDF.pdf");
    
    
    
  };
   
  
  
}
