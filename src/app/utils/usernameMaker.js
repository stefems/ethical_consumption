import names from './names.js'

const getName = () => {
    let name = names[Math.floor(Math.random() * names.length)]
    name = name + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10)
    return name
}

export default getName