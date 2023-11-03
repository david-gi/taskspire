import { Colors, IRecommendation } from './interfaces'
import { v4 as uuidv4 } from 'uuid'

export class Board {
    id: string
    name: string
    goal: string
    stages: Stage[]
    constructor() {
        this.id = uuidv4()
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
        try {
            let minEstimated = Number.POSITIVE_INFINITY
            let maxEstimated = Number.NEGATIVE_INFINITY

            this.stages.forEach(stage => {
                stage.items.forEach(item => {
                    minEstimated = Math.min(minEstimated, item.estimated)
                    maxEstimated = Math.max(maxEstimated, item.estimated)
                })
            })

            const range = maxEstimated - minEstimated
            const interval = range / 4

            this.stages.forEach(stage => {
                stage.items.forEach(item => {
                    if (item.estimated <= minEstimated + interval) {
                        item.color = Colors.blue
                    } else if (item.estimated <= minEstimated + 2 * interval) {
                        item.color = Colors.green
                    } else if (item.estimated <= minEstimated + 3 * interval) {
                        item.color = Colors.orange
                    } else {
                        item.color = Colors.pink
                    }
                })
            })
        } catch (e) { console.log(e) }
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
    recommendation?: IRecommendation
    updated: number
    created: number
    constructor(name: string = '+', desc: string = '...') {
        this.id = uuidv4()
        this.name = name
        this.desc = desc
        this.completed = 0
        this.estimated = 0
        this.color = Colors.blue
        this.recommendation = undefined
        this.updated = new Date().getTime()
        this.created = new Date().getTime()
    }
}
