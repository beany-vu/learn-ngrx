import { WorkspaceConcrete, Workspace } from './../store/entities/workspace/workspace.model';
import { TabConcrete } from './../store/entities/workspace/tab.model';
import { AddWorkspace, AddTabItemIntoWorkspace } from './../store/entities/workspace/workspace.actions';
import { TabItemConcrete } from './../store/entities/workspace/tabItem.model';
import { AppState } from './../appState';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { WorkspaceActionTypes } from '../store/entities/workspace/workspace.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  workspaces$;
  selectedWorkspaceId;
  currentWorkspaceData;
  constructor(private store: Store<AppState>) {
    this.workspaces$ = store.select(state => state.workspaces)
      .do(data => this.selectedWorkspaceId = data.selectedWorkspaceId)
      .map(data => data.entities)
      .pipe(map(this.toArray));
    // .do(data => this.currentWorkspaceData = data.filter(item => item.id === (this.selectedWorkspaceId)));

    this.workspaces$.subscribe(data => {
      this.currentWorkspaceData = data.filter(item => item.id == this.selectedWorkspaceId)[0];
    });
  }

  ngOnInit() { }

  toArray(obj) {
    const keys = Object.keys(obj);
    return keys.map(key => obj[key]);
  }

  onSubmit(form: any) {

    const name = form.name;
    const url = form.url;
    const classList = form.classList !== undefined ? form.classList : new Set();
    // const item = new TabItemConcrete(name, url, classList);
    const item = {
      number: 1,
      name: name,
      url: url,
      classList: classList
    };
    const type = form.type === 'primary' ? 'primary' : 'secondary';
    // add the tab item into the the tab of current workspace
    this.store.dispatch({
      type: WorkspaceActionTypes.AddTabItemIntoWorkspace,
      payload: {
        type: type,
        newItem: item
      }
    });
  }

  addWorkspace() {
    const primaryTabItem1 = new TabItemConcrete('Tinh te', 'http://tinhte.vn', new Set());
    const primaryTabItem2 = new TabItemConcrete('Techrum', 'http://techrum.vn', new Set());
    const secondaryTabItem1 = new TabItemConcrete('Tinh te Xiaomi', 'http://tinhte.vn/xiaomi', new Set());

    const primaryTab = new TabConcrete([primaryTabItem1, primaryTabItem2]);
    const secondaryTab = new TabConcrete([secondaryTabItem1]);

    // const workspace = new WorkspaceConcrete(primaryTab, secondaryTab);
    const workspace = {
      id: '3',
      primaryTab: [{ 'number': '3', 'name': 'Tinh te', 'href': 'http://tinhte.vn', 'classList': [] }],
      secondaryTab: [{ 'number': '4', 'name': 'Tinh te Xiaomi', 'href': 'http://tinhte.vn/xiaomi', 'classList': [] }]
    };

    this.store.dispatch({
      type: WorkspaceActionTypes.AddWorkspace,
      payload: { workspace: workspace }
    });
  }

  closeWorkspace(id) {
    this.store.dispatch({
      type: WorkspaceActionTypes.DeleteWorkspace,
      payload: { id: id }
    });
  }

  setCurrentWorkspace(value) {
    this.store.dispatch({
      type: WorkspaceActionTypes.SetCurrentWorkspace,
      payload: { selectedWorkspaceId: value }
    });
  }
}
