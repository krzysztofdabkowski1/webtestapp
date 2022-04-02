import { BundleNode } from "./bundle-node.model";

export interface FolderNode {
    name?: string;
    children?: BundleNode[];
    folderId?: number;
    bundleId?: number;
  }