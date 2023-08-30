export class Board {
    id: string
    name: string
    goal: string
    stages: Stage[]
    constructor() {
        this.id = crypto.randomUUID()
        this.name = ''
        this.goal = ''
        this.stages = [
            { name: '', items: [] },
            { name: '', items: [] },
            { name: '', items: [] },
        ]
    }

    calculateProgress(): number {
        const min = 1
        try {
            let totalPomodoros = 0
            let donePomodoros = 0
            this.stages.forEach((stage, i) => {
                stage.items.forEach(item => {
                    totalPomodoros += item.estimated ?? 0
                    if (i < 2) donePomodoros += item.completed ?? 0
                    else donePomodoros += item.estimated ?? 0
                })
            })
            const sum = Math.floor((donePomodoros / totalPomodoros) * 99) + min
            return sum < 1 ? min : sum
        } catch { return min }
    }
}

export class Stage {
    name: string
    items: Item[]
    constructor(name: string = '', items: Item[] = []) {
        this.name = name
        this.items = items
    }
}

export class Item {
    id: string
    name: string
    desc: string
    color: string
    completed: number
    estimated: number
    updated: number
    created: number
    constructor(name: string = '+', desc: string = '...') {
        this.id = crypto.randomUUID()
        this.name = name
        this.desc = desc
        this.completed = 0
        this.estimated = 0
        this.color = 'blue'
        this.updated = new Date().getTime()
        this.created = new Date().getTime()
    }
}
