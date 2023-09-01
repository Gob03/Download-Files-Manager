export const cleanEvent = () => { 
    const linkNameInput = document.getElementById("linkNameInput")
    const linkChannelInput = document.getElementById("linkChannelInput")
    const linkURLInput = document.getElementById("linkURLInput")

    linkNameInput.value = ""
    linkChannelInput.value = ""
    linkURLInput.value = ""
}

document.getElementById("cleanInputsBtn").addEventListener("click", cleanEvent)