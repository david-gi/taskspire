const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T

export default { clone }