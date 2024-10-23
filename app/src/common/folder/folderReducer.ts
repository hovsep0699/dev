import * as TYPES from './types';

const initialState: TYPES.FolderState = {
  folders: [],
  attachLoading: false,
  error: null
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TYPES.LOAD_FOLDERS:
      return {
        ...state,
        folders: action.payload,
        error: null
      };

    case TYPES.CREATE_FOLDER:
      return {
        ...state,
        folders: [...state.folders, action.payload],
        error: null
      };

    case TYPES.DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter((f: TYPES.Folder) => f.id !== action.payload.id),
        error: null
      };

    case TYPES.SET_EDIT_FOLDER:
      return {
        ...state,
        folders: state.folders.map((f: TYPES.Folder) =>
          f.id === action.payload.id ? { ...f, editing: true } : f
        )
      };

    case TYPES.EDIT_FOLDER:
      return {
        ...state,
        folders: state.folders.map((f: TYPES.Folder) =>
          f.id === action.payload.id ? action.payload : f
        ),
        error: null
      };

    case TYPES.ATTACH_DOCUMENTS_LOADING:
      return {
        ...state,
        attachLoading: true
      };

    case TYPES.ATTACH_DOCUMENTS_SUCCESS:
      return {
        ...state,
        attachLoading: false
      };

    case TYPES.FOLDERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
