import { WorkspaceConcrete } from './../store/entities/workspace/workspace.model';
import { TabConcrete } from './../store/entities/workspace/tab.model';
import { AddWorkspace } from './../store/entities/workspace/workspace.actions';
import { TabItemConcrete } from './../store/entities/workspace/tabItem.model';
import { AppState } from './../appState';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
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
  constructor(private store: Store<AppState>) {
    this.workspaces$ = store.select(state => state.workspaces)
      .do((data) => this.selectedWorkspaceId = data.selectedWorkspaceId)
      .map(data => data.entities)
      .pipe(map(this.toArray));
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

    let item = new TabItemConcrete(name, url, classList);
    console.log(item);
  }

  addWorkspace() {
    const primaryTabItem1 = new TabItemConcrete('Tinh te', 'http://tinhte.vn', new Set());
    const primaryTabItem2 = new TabItemConcrete('Techrum', 'http://techrum.vn', new Set());
    const secondaryTabItem1 = new TabItemConcrete('Tinh te Xiaomi', 'http://tinhte.vn/xiaomi', new Set());

    const primaryTab = new TabConcrete([primaryTabItem1,primaryTabItem2]);
    const secondaryTab = new TabConcrete([secondaryTabItem1]);

    // const workspace = new WorkspaceConcrete(primaryTab, secondaryTab);
    const workspace = {
      id: '3',
      primaryTab: [{'number': '3', 'name': 'Tinh te', 'href': 'http://tinhte.vn', 'classList': []}],
      secondaryTab: [{'number': '4', 'name': 'Tinh te Xiaomi', 'href': 'http://tinhte.vn/xiaomi', 'classList': []}]
    };

    this.store.dispatch({
      type: WorkspaceActionTypes.AddWorkspace,
      payload: {workspace: workspace}
    });
  }

  closeWorkspace(id) {
    this.store.dispatch({
      type: WorkspaceActionTypes.DeleteWorkspace,
      payload: {id: id}
    });
  }

  setCurrentWorkspace(value) {
    this.store.dispatch({
      type: WorkspaceActionTypes.SetCurrentWorkspace,
      payload: {selectedWorkspaceId: value}
    });
  }
}
