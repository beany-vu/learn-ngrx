import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Workspace } from './workspace.model';
import { WorkspaceActions, WorkspaceActionTypes } from './workspace.actions';

export interface State extends EntityState<Workspace> {
  selectedWorkspaceId: number | null;
}

export const adapter: EntityAdapter<Workspace> = createEntityAdapter<Workspace>();

export const initialState: State = adapter.getInitialState({
  ids: ['1', '2'],
  entities: [
    {
      id: '1',
      primaryTab: [{'number': '1', 'name': 'Google', 'href': 'http://google.com', 'classList': []}],
      secondaryTab: [{'number': '1', 'name': 'Gmail', 'href': 'http://gmail.com', 'classList': []}]
    },
    {
      id: '2',
      primaryTab: [{'number': '1', 'name': 'Sutunam', 'href': 'http://sutunam.com', 'classList': []}],
      secondaryTab: [{'number': '1', 'name': 'Sutunam FR', 'href': 'http://sutunam.fr', 'classList': []},
                    {'number': '1', 'name': 'Sutunam VN ', 'href': 'http://sutunam.vn', 'classList': []}]
    },
  ],
  selectedWorkspaceId: 2
});

export function reducer(
  state = initialState,
  action: WorkspaceActions
): State {
  switch (action.type) {
    case WorkspaceActionTypes.AddWorkspace: {
      console.log(state);
      return adapter.addOne(action.payload.workspace, state);
    }

    case WorkspaceActionTypes.UpsertWorkspace: {
      return adapter.upsertOne(action.payload.workspace, state);
    }

    case WorkspaceActionTypes.AddWorkspaces: {
      return adapter.addMany(action.payload.workspaces, state);
    }

    case WorkspaceActionTypes.UpsertWorkspaces: {
      return adapter.upsertMany(action.payload.workspaces, state);
    }

    case WorkspaceActionTypes.UpdateWorkspace: {
      return adapter.updateOne(action.payload.workspace, state);
    }

    case WorkspaceActionTypes.UpdateWorkspaces: {
      return adapter.updateMany(action.payload.workspaces, state);
    }

    case WorkspaceActionTypes.DeleteWorkspace: {
      return adapter.removeOne(action.payload.id, state);
    }

    case WorkspaceActionTypes.DeleteWorkspaces: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case WorkspaceActionTypes.LoadWorkspaces: {
      return adapter.addAll(action.payload.workspaces, state);
    }

    case WorkspaceActionTypes.ClearWorkspaces: {
      return adapter.removeAll(state);
    }

    case WorkspaceActionTypes.SetCurrentWorkspace: {
      return Object.assign({}, state, action.payload);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
