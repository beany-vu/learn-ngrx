import { Workspace } from './store/entities/workspace/workspace.model';
import { WorkspaceState } from './store/entities/workspace/workspace.reducer';
export interface AppState {
    workspaces: WorkspaceState;
}

