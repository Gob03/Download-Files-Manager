import {cleanEvent} from "clean.js"
document.addEventListener("DOMContentLoaded", ()=>{
    
    /*async function obtenerInfo(url){
        const videoID = obtenerID(url)

        const urlAPI = ``

        const respuesta = await fetch(urlAPI)

        const datos = respuesta.json()

        console.log(datos)
    }
    const obtenerID = (url) =>{
        const expresionRegularYoutube = /(?:\/|%3D|v=)([0-9A-Za-z_-]{11}).*/

        /*const match = url.match(expresionRegularYoutube)
        if(match){
            return(match[1])
        }
        else{
            console.log("este enlace no es de youtube")
        }
    }

    obtenerInfo("https://youtu.be/z4CKSQ-dVSk")*/


    /*---------------------------------------------------------------------------------------------
                            FUNCIONES DE LA ANIMACION DEL COPY
    ---------------------------------------------------------------------------------------------*/
    const copyIconEvent = () =>{
        const copyIconArray = document.getElementsByClassName("copyIcon")
        const lastLinksListArray = document.getElementsByClassName("lastLinksList")

        for( let i = 0; i < copyIconArray.length; i++){
            copyIconArray[i].addEventListener("click",()=>{
                copyIconArray[i].setAttribute("pos",i)
                navigator.clipboard.writeText(lastLinksListArray[i].textContent)
                copyIconAnimation(i)
            })
        }
    }
    copyIconEvent()

    const copyIconAnimation = (copyIconActivatedPos) => {
        const copyIconArray = document.getElementsByClassName("copyIcon")
        const copyIconActivated = copyIconArray[copyIconActivatedPos]

        
        let opacityValue = 1
        let imageSrc = "imgs/correct.png"
        let color = "#00ee00"
        const playAnimation = () => {
            const bajarOpacidad = setInterval(()=>{
                opacityValue -= 0.1
                copyIconActivated.style.opacity = opacityValue

                if(opacityValue <= 0){
                    opacityValue = 0

                    clearInterval(bajarOpacidad)


                    copyIconActivated.src = imageSrc
                    copyIconActivated.style.background = color

                    const subirOpacidad = setInterval(()=>{
                        opacityValue += 0.1
                        copyIconActivated.style.opacity = opacityValue

                        if(opacityValue >= 1){
                            imageSrc = "imgs/copy.png"
                            color = "#51BBFE"
                            clearInterval(subirOpacidad)
                        }
                    },10)
                }
            },25)
        }  
        
        playAnimation()
        setTimeout(playAnimation, 3000);
    }

     /*---------------------------------------------------------------------------------------------
                            FUNCIONES PARA AGREGAR UN NUEVO ELEMENTO AL REGISTRO Y ACTUALIZAR EL ASIDE
    ---------------------------------------------------------------------------------------------*/

    const compareLinkWithList = () => {
        const linkURLInput = document.getElementById("linkURLInput").value
        const linksInStorage = localStorage.getItem("LinkURL")
        if(linksInStorage == null){
            return addNewLink()
        }
       
        const match = linksInStorage.match(linkURLInput)

        if(match != null) console.log("link ya definido")
        else return addNewLink()
    }

    const addNewLink = () => {
        const linkURLInput = document.getElementById("linkURLInput").value
        let linkNameInput = document.getElementById("linkNameInput").value
        let linkChannelInput = document.getElementById("linkChannelInput").value

        if(!linkNameInput) linkNameInput = "DESCONOCIDO"
        if(!linkChannelInput) linkChannelInput = "DESCONOCIDO"

        const linksInStorage = localStorage.getItem("LinkURL")
        const date = new Date()

        if(linksInStorage != null){
            const titlesInStorage = localStorage.getItem("LinkTitle")
            const channelsInStorage = localStorage.getItem("LinkChannel")
            const datesInStorage = localStorage.getItem("LinkDateCreated")

            localStorage.setItem("LinkURL", `${linkURLInput}, ${linksInStorage}`)
            localStorage.setItem("LinkTitle", `${linkNameInput}, ${titlesInStorage}`)
            localStorage.setItem("LinkChannel", `${linkChannelInput}, ${channelsInStorage}`)
            localStorage.setItem("LinkDateCreated", `${datesInStorage}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
        }
        else{
            localStorage.setItem("LinkURL", linkURLInput)
            localStorage.setItem("LinkTitle", linkNameInput)
            localStorage.setItem("LinkChannel", linkChannelInput)
            localStorage.setItem("LinkDateCreated", `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
        }

        updateLastLinkList()
    }

    const updateLastLinkList = () => {
        const replaceContainer = () =>{
            const fatherOflastLinksContainer = document.getElementById("lastLinksAside")
            const lastLinksContainer = document.getElementById("aside__lastLinksList")
    
            const newLastLinksContainer = document.createElement("ul")
            newLastLinksContainer.setAttribute("id","aside__lastLinksList")
            fatherOflastLinksContainer.replaceChild(newLastLinksContainer, lastLinksContainer)
        }
        replaceContainer()
        if(localStorage.getItem("LinkURL") != null){
            const lastLinksContainer = document.getElementById("aside__lastLinksList")
            const URLArray = localStorage.getItem("LinkURL").split(", ")
            
            for(let i = 0; i < URLArray.length && i < 10; i++){
                lastLinksContainer.innerHTML += `<li class="lastLinksList">${URLArray[i]}</li> <img src="imgs/copy.png" width="40px" height="40px" class="copyIcon">`      
            }
            copyIconEvent()
        }
    }
    updateLastLinkList()
    
    document.getElementById("saveNewLinkBtn").addEventListener("click", compareLinkWithList)

})