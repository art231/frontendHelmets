export function deleteElement(elementDel, parentId, elementTag, elementId, style, className, mount, other) {

    let mapContainer = document.getElementById(elementDel);
    if(mapContainer) {
        mapContainer.remove()

        if(mount === 'mount') {
            let parent = document.getElementById(parentId);
            let newElement = document.createElement(elementTag);

            newElement.setAttribute('id', elementId);
            newElement.setAttribute("style", style);
            newElement.setAttribute("class", className);
            if(other) {
                newElement.setAttribute(other.attributes, other.name);
            }
            parent.appendChild(newElement);
        }
    }

}


