import names from './names.js'

export function getName() {
    let name = names[Math.floor(Math.random() * names.length)]
    name = name + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10)
    return name
}

export function getOnlyName() {
    return names[Math.floor(Math.random() * names.length)]
}