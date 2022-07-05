const e = document.createElement('li')
const b =document.querySelector('#Mynav')
const befor =document.querySelector('#befor')
let text =``

const socket = new WebSocket('ws://localhost:3000');
socket.addEventListener('open', function (event) {
  console.log('Connected to WS Server')
});
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
});




function Notification(res){
  if(res.data.status ==="ok"){
    attente = res.data.attente
    e.setAttribute("class","nav-item dropdown")
    text +=`
    <a class="nav-link notifications-dropdown" href="#" id="notificationsDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">${attente.length}</a>
    <div class="dropdown-menu dropdown-menu-end notif-drop-menu" aria-labelledby="notificationsDropDown">
      <h6 class="dropdown-header">Notifications</h6>`

      const map1 =attente.map((Element)=>{
        text += `<a href="./liste_demande.html">
        <div class="header-notif">
          <div class="notif-image">
            <span class="notification-badge bg-info text-white">
              <i class="fas fa-edit"></i>
            </span>
          </div>
          <div class="notif-text">
            <p class="bold-notif-text">Une Demande de cin =${Element.cin}</p>
            <small>${Element.prise.substring(0,10)}</small>
          </div>
        </div>
      `
      
    

      })

      text +=`</div>`
      e.innerHTML = text;
      b.insertBefore(e,befor)
  }
}
axios.get('/api/getdemande').then((res)=>Notification(res))