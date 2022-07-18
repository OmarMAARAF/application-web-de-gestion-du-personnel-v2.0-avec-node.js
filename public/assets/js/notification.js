const e = document.createElement('li')
const b =document.querySelector('#Mynav')
const befor =document.querySelector('#befor')
let text =``

function setHTML(res){
  
  
  
  attente = res.data.attente
  e.setAttribute("class","nav-item dropdown")
  e.setAttribute("id","Mynoti")
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


function Notification(res){
  

  if(res.data.status ==="ok"){
    ele=document.querySelector("#Mynoti")
    if(!ele){
      setHTML(res)
    }
    else{

      text =``
      ele=document.querySelector("#Mynoti")
      ele.remove()
      setHTML(res)

  

    }
  }
}

function getNotification(txt){
  axios.post("./api/getdemande", { token: localStorage.getItem("token") })
  .then((res) => Notification(res));
  displayNotification(txt)
}

let i=0
function displayNotification(txt){
  const main_wrapper =document.querySelector(".main-wrapper")
  const toast_container =document.querySelector(".toast-container")
  
  let templatesNoti =``
  
  if(!toast_container){
  const toast = document.createElement('div')
  toast.setAttribute("class","toast-container")
  /* toast.setAttribute("style",'bottom: 30px;position: fixed;right:30px;') */


  /* <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="../../assets/images/logo.png" class="m-r-sm" alt="Toast image" height="18" width="18">

    <strong class="me-auto">Nouvelle demande</strong>
    <small class="text-muted">Maintenant</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
    See? Just like this.
  </div>
</div>  */
  templatesNoti +=`
  

<div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true" id="toast${i}">
  <div class="toast-header">
    <img src="../../assets/images/logo.png" class="m-r-sm" alt="Toast image" height="18" width="18">

    <strong class="me-auto">Nouvelle demande</strong>
    <small class="text-muted">Maintenant</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onclick="closeToast(${i})"></button>
  </div>
  <div class="toast-body">
   Une demande de cin = ${txt}
  </div>
</div>`
 toast.innerHTML=templatesNoti
 main_wrapper.appendChild(toast)
 i++
 setTimeout(fadeoutNotification, 5000,i-1);
 
  }
  else{
    const E=document.createElement('div')
    E.setAttribute("id",`toast${i}`)
    templatesNoti+=`
    <div class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="../../assets/images/logo.png" class="m-r-sm" alt="Toast image" height="18" width="18">

    <strong class="me-auto">Nouvelle demande</strong>
    <small class="text-muted">Maintenant</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" onclick="closeToast(${i})"></button>
  </div>
  <div class="toast-body">
   Une demande de cin = ${txt}
  </div>
</div>`
 E.innerHTML=templatesNoti
 toast_container.appendChild(E)
 i++
 setTimeout(fadeoutNotification, 5000,i-1);
  }

 

}

function fadeoutNotification(i){
  const toast =document.querySelector(`#toast${i}`)
  if(toast){
  toast.classList.add('hidden');
  console.log("time out")
  setTimeout(()=>{
    toast.remove()
  templatesNoti=``
  },1000)
}

}

function closeToast(i){
  const toast =document.querySelector(`#toast${i}`)
  toast.remove()
  templatesNoti=``
  
}