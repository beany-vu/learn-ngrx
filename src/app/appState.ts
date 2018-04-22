import { Workspace } from './store/entities/workspace/workspace.model';
import { State as WorkspaceState } from './store/entities/workspace/workspace.reducer';
export interface AppState {
    workspaces: WorkspaceState;
}

