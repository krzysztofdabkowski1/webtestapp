import { Observable } from "rxjs";

export interface FolderNode {
  name?: string;
  children?: FolderNode[];
  folderId?: number;
  bundleId?: number;
}

export const FOLDER_DATA: FolderNode[] = [
  {
    name: 'Folder 1',
    children: [
      {name: 'Fiszki long long long longer title example #1', bundleId: 1},
      {name: 'Fiszki #2', bundleId: 2},
      {name: 'Fiszki #3', bundleId: 3}
    ],
  },
  {
    name: 'Folder 2',
    children: [
      {name: 'Fiszki long long long longer title example #1', bundleId: 1},
      {name: 'Fiszki #2', bundleId: 2},
      {name: 'Fiszki #3', bundleId: 3}
    ],
  },
  {
    name: 'Folder 3',
    children: [
      {name: 'Fiszki long long long longer title example #1', bundleId: 1},
      {name: 'Fiszki #2', bundleId: 2},
      {name: 'Fiszki #3', bundleId: 3}
    ],
  },
  {
    name: 'Folder 4',
    children: [
      {name: 'Fiszki long long long longer title example #1', bundleId: 1},
      {name: 'Fiszki #2', bundleId: 2},
      {name: 'Fiszki #3', bundleId: 3}
    ],
  },
];

export const SEARCHED_FOLDER_DATA: FolderNode[] = [
  {
    name: 'Folder 1',
    folderId: 1
  },
  {
    name: 'Folder 2',
    folderId: 2
  },
  {
    name: 'Folder 3',
    folderId: 3
  },
  {
    name: 'Folder 4',
    folderId: 4
  },
  {
    name: 'Folder 5',
    folderId: 5
  }
];

 export function searchFolder(term: string): FolderNode[] {
  return FOLDER_DATA.filter( f=>{
    return f.name?.includes(term);
  })
}