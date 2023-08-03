export type Board = {
    id: string,
    stages: Stage[],
}

export type Stage = {
    name: string,
    items: Item[],
}

export class Item {
    id: string
    name: string
    desc: string
    color: string
    updated: number
    created: number
    constructor(name: string = 'New', desc: string = '...') {
        this.id = crypto.randomUUID()
        this.name = name
        this.desc = desc
        this.color = 'blue'
        this.updated = new Date().getTime()
        this.created = new Date().getTime()
    }
}
