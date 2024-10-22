import { Folder } from '../types';

export default (folders: any[]): Folder[] => {
  return folders.map(f => ({
    id: f.id,
    title: f.title,
    isVisible: f.is_shown_in_list,
    editing: false
  }));
};
