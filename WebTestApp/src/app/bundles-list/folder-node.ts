import { Observable } from "rxjs";

export interface FolderNode {
  name?: string;
  children?: FolderNode[];
  folderId?: number;
  bundleId?: number;
}

export interface BundleNode{
  name?: string;
  folderName?: string;
  bundleId?: number;
}

let bundleList: BundleNode[] = [];



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
    name: 'Folder 3 long long very long folder name',
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

FOLDER_DATA.forEach( f =>{
  f.children?.forEach( c =>{
    bundleList.push({
      "name": c.name,
      "folderName": f.name,
      "bundleId": c.bundleId

    })
  })
})

export function searchFolder(term: string): FolderNode[] {
  return FOLDER_DATA.filter( f=>{
    return f.name?.includes(term);
  })
}

export function searchBundle(term: string): BundleNode[] {
  return bundleList.filter( f=>{
    return f.name?.includes(term);
  })
}