interface Folder {
  name: string
  size: number
  folders: Folder[]
  files: File[]
}

interface File {
  name :string
  size: number
}

function mapStructure(input: string): Folder {
  const regex = new RegExp(/\$ cd (?<foldername>.*)|(?<size>\d+) (?<filename>.*)/)

  const root: Folder = {
    name: 'root',
    size: 0,
    folders: [],
    files: []
  }

  const path: Folder[] = [root]

  for (const line of input.split('\n')) {
    const arr = regex.exec(line)
    
    if (!arr) continue

    const { foldername, size, filename } = arr.groups

    if (foldername) {
      if ('..' === foldername) {
        path.pop()
        continue
      }

      const folder: Folder = {
        name: foldername,
        size: 0,
        folders: [],
        files: []
      }

      path[path.length-1].folders.push(folder)
      path.push(folder)
    
    } else if (filename) {
      const file: File = {
        name: filename,
        size: Number(size)
      }

      path[path.length-1].files.push(file)
      path.forEach(folder => folder.size += file.size)
    }
  }

  return root.folders[0]
}

const sumSmallDirs = (folder: Folder): number =>
  folder.folders.reduce(
    (total: number, folder: Folder) => total + sumSmallDirs(folder),
    (folder.size <= 100_000) ? folder.size : 0
  )

export function part1(input: string): number {
  return sumSmallDirs(mapStructure(input))
}

export function part2(input: string): number {
  const struct              = mapStructure(input)
  const totalSpaceAvailable = 70_000_000
  const spaceNeeded         = 30_000_000
  const usedSpace           = struct.size

  const findSize = (folders: Folder[], perfectSize: number): number =>
    folders.reduce((size: number, folder: Folder) =>
      findSize(
        folder.folders,
        (folder.size < size && totalSpaceAvailable - usedSpace + folder.size >= spaceNeeded)
          ? folder.size
          : size
      )
    , perfectSize)

  return findSize(struct.folders, Infinity)
}