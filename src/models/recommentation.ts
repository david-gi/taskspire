export class Recommendation {
  title: string
  tagline: string
  label: string
  url: string
  constructor(title: string, tagline: string, label: string, url: string) {
    this.title = title
    this.tagline = tagline
    this.label = label
    this.url = url
  }

}