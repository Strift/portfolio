import fs from 'fs/promises'
import path from 'path'

export default async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Strift/awesome-esports/master/README.md')
    const markdown = await response.text()

    const sections = markdown.split('## ').slice(1)
    const categories = []

    for (const section of sections) {
      const headingEndIndex = section.indexOf('\n')
      const heading = section.substring(0, headingEndIndex).trim()

      // Skip non-category sections
      if (['Table of Contents', 'Contributing', 'License',
      ].includes(heading)) continue

      const body = section.substring(headingEndIndex + 1)
      const itemRegex = /^- \[([^\]]+)\]\(([^)]+)\) - (.*)$/gm
      const repositories = []

      let match
      while ((match = itemRegex.exec(body)) !== null) {
        repositories.push({
          name: match[
            1
          ],
          url: match[
            2
          ],
          description: match[
            3
          ],
        })
      }

      if (repositories.length) {
        categories.push({ name: heading, repositories,
        })
      }
    }

    const outputPath = path.resolve(process.cwd(), 'content/awesome-esports.json')
    await fs.mkdir(path.dirname(outputPath),
      { recursive: true,
      })
    await fs.writeFile(outputPath, JSON.stringify(categories,
      null,
      2))

    console.log(`✅ Fetched ${categories.length
    } categories with ${categories.reduce((acc, curr) => acc + curr.repositories.length,
      0)
    } total repositories`)
  }
  catch (error) {
    console.error('❌ Error fetching awesome-esports:', error)
    if (process.env.NODE_ENV === 'development') {
      console.warn('Local development detected, using local cache...')
    }
    else {
      process.exit(1)
    }
  }
}
