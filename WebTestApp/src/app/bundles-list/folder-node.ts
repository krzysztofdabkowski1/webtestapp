export interface FolderNode {
  name: string;
  children?: FolderNode[];
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