import { Colors } from './interfaces'

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

    setColors() {
        let maxEstimated = 1
        this.stages.forEach((stage) => {
            maxEstimated = stage.items.reduce((b, a) => (b.estimated ?? 0) > (a.estimated ?? 0) ? b : a, new Item()).estimated ?? 0
        })
        const colors = Object.keys(Colors)
        const len = colors.length
        this.stages.forEach((stage) => {
            stage.items.forEach(item => {
                let index = Math.floor((item.estimated ?? 0) / maxEstimated * (len - 1))
                if (index < 0) index = 0
                if (index == Infinity) index = 1
                if (index >= len) index = len - 1
                item.color = colors[index] as unknown as Colors
            })
        })
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
    color: Colors
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
        this.color = Colors.blue
        this.updated = new Date().getTime()
        this.created = new Date().getTime()
    }
}
