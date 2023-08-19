export class Board {
    id: string
    name: string
    goal: string
    stages: Stage[]
    constructor() {
        this.id = 'taskspire-' + crypto.randomUUID()
        this.name = ''
        this.goal = ''
        this.stages = [
            { name: 'To-Do', items: [] },
            { name: 'In-Progress', items: [] },
            { name: 'Done', items: [] },
        ]
    }

    calculateProgress(): number {
        const totalItems = this.stages.reduce((acc, stage) => acc + stage.items.length, 0)
        const doneItems = this.stages[this.stages.length - 1].items.length
        try {
            return Math.floor((doneItems / totalItems) * 100)
        } catch { return 0 }
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
    cycles: number
    estimated: number
    updated: number
    created: number
    constructor(name: string = 'New', desc: string = '...') {
        this.id = crypto.randomUUID()
        this.name = name
        this.desc = desc
        this.cycles = 0
        this.estimated = 0
        this.color = 'blue'
        this.updated = new Date().getTime()
        this.created = new Date().getTime()
    }
}
