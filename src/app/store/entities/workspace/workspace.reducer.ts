import { WorkspaceState } from './workspace.reducer';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Workspace, WorkspaceConcrete } from './workspace.model';
import { WorkspaceActions, WorkspaceActionTypes, AddTabItemIntoWorkspace } from './workspace.actions';
import { Tab, TabConcrete } from './tab.model';
import { State } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';
import * as _ from 'lodash';

export interface WorkspaceState extends EntityState<Workspace> {
  selectedWorkspaceId: number | null;
}

export const adapter: EntityAdapter<Workspace> = createEntityAdapter<Workspace>();

export const initialState: WorkspaceState = adapter.getInitialState({
  ids: [1, 2],
  entities: [

    {
      id: 1,
      primaryTab: [{ 'number': 1, 'name': 'Google', 'href': 'http://google.com', 'classList': [] }],
      secondaryTab: [{ 'number': 2, 'name': 'Gmail', 'href': 'http://gmail.com', 'classList': [] }]
    },
    {
      id: 2,
      primaryTab: [{ 'number': 2, 'name': 'Sutunam', 'href': 'http://sutunam.com', 'classList': [] }],
      secondaryTab: [{ 'number': 2, 'name': 'Sutunam FR', 'href': 'http://sutunam.fr', 'classList': [] },
      { 'number': 3, 'name': 'Sutunam VN', 'href': 'http://sutunam.vn', 'classList': [] }]
    },
  ],
  selectedWorkspaceId: 2
});

export function reducer(
  state = initialState,
  action: WorkspaceActions
): WorkspaceState {
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
      // return adapter.updateOne({ id: action.id, changes: action.changes}, state);
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

    case WorkspaceActionTypes.AddTabItemIntoWorkspace: {
      const clonedState = _.cloneDeep(state);
      const clonedEntities = clonedState.entities;

      const selectedId = getCurrentWorkspaceEntityId(clonedEntities, clonedState.selectedWorkspaceId);
      const workspace: any = clonedEntities[selectedId];
      if (action.payload.type == 'primary') {
        workspace.primaryTab.push(action.payload.newItem);
      } else {
        workspace.secondaryTab.push(action.payload.newItem);
      }
      return Object.assign({}, state, { entities: clonedEntities });
    }

    case WorkspaceActionTypes.RemoveTabItemOuttaWorkspace: {
      const clonedState = _.cloneDeep(state);
      const cloneEntities = clonedState.entities;

      const selectedId = getCurrentWorkspaceEntityId(cloneEntities, clonedState.selectedWorkspaceId);
      const updatedEntities: any = cloneEntities[selectedId];

      if (action.payload.type == 'primary') {
        cloneEntities[selectedId].primaryTab = updatedEntities.primaryTab.filter(item => item.href != action.payload.href);
      } else {
        cloneEntities[selectedId].secondaryTab = updatedEntities.secondaryTab.filter(item => item.href != action.payload.href);
      }
      return Object.assign({}, state, { entities: cloneEntities });
    }

    default: {
      return state;
    }
  }
}

export function getCurrentWorkspaceEntityId(entities: Dictionary<Workspace>, currentWorkspaceId: number): any {
    // Read more: https://stackoverflow.com/questions/16174182/typescript-looping-through-a-dictionary
    return Object.keys(entities).find((key: any): any => {
      const item: WorkspaceConcrete = entities[key] as WorkspaceConcrete;
      if (item.id == currentWorkspaceId) {
        return item.id;
      }
    });
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
