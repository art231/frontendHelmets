export function saveDataStorage(name, value){
    localStorage.setItem(name, value);
}

export function getDataStorage(name){
    return localStorage.getItem(name)
}

export function removeDataStorage(name){
    delete localStorage[name];
}
