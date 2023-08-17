export class Board {
    id: string
    name: string
    stages: Stage[]
    constructor(name: string, firstItems: Item[] = []) {
        this.id = 'taskspire-' + crypto.randomUUID()
        this.name = name
        this.stages = [
            { name: 'To-Do', items: firstItems },
            { name: 'In-Progress', items: [] },
            { name: 'Done', items: [] },
        ]
    }
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
