import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Workspace } from './workspace.model';

export enum WorkspaceActionTypes {
  LoadWorkspaces = '[Workspace] Load Workspaces',
  AddWorkspace = '[Workspace] Add Workspace',
  UpsertWorkspace = '[Workspace] Upsert Workspace',
  AddWorkspaces = '[Workspace] Add Workspaces',
  UpsertWorkspaces = '[Workspace] Upsert Workspaces',
  UpdateWorkspace = '[Workspace] Update Workspace',
  UpdateWorkspaces = '[Workspace] Update Workspaces',
  DeleteWorkspace = '[Workspace] Delete Workspace',
  DeleteWorkspaces = '[Workspace] Delete Workspaces',
  ClearWorkspaces = '[Workspace] Clear Workspaces'
}

export class LoadWorkspaces implements Action {
  readonly type = WorkspaceActionTypes.LoadWorkspaces;

  constructor(public payload: { workspaces: Workspace[] }) {}
}

export class AddWorkspace implements Action {
  readonly type = WorkspaceActionTypes.AddWorkspace;

  constructor(public payload: { workspace: Workspace }) {}
}

export class UpsertWorkspace implements Action {
  readonly type = WorkspaceActionTypes.UpsertWorkspace;

  constructor(public payload: { workspace: Update<Workspace> }) {}
}

export class AddWorkspaces implements Action {
  readonly type = WorkspaceActionTypes.AddWorkspaces;

  constructor(public payload: { workspaces: Workspace[] }) {}
}

export class UpsertWorkspaces implements Action {
  readonly type = WorkspaceActionTypes.UpsertWorkspaces;

  constructor(public payload: { workspaces: Update<Workspace>[] }) {}
}

export class UpdateWorkspace implements Action {
  readonly type = WorkspaceActionTypes.UpdateWorkspace;

  constructor(public payload: { workspace: Update<Workspace> }) {}
}

export class UpdateWorkspaces implements Action {
  readonly type = WorkspaceActionTypes.UpdateWorkspaces;

  constructor(public payload: { workspaces: Update<Workspace>[] }) {}
}

export class DeleteWorkspace implements Action {
  readonly type = WorkspaceActionTypes.DeleteWorkspace;

  constructor(public payload: { id: string }) {}
}

export class DeleteWorkspaces implements Action {
  readonly type = WorkspaceActionTypes.DeleteWorkspaces;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearWorkspaces implements Action {
  readonly type = WorkspaceActionTypes.ClearWorkspaces;
}

export type WorkspaceActions =
 LoadWorkspaces
 | AddWorkspace
 | UpsertWorkspace
 | AddWorkspaces
 | UpsertWorkspaces
 | UpdateWorkspace
 | UpdateWorkspaces
 | DeleteWorkspace
 | DeleteWorkspaces
 | ClearWorkspaces;
