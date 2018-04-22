import { AppState } from './../appState';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

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

  ngOnInit() {
  }

  toArray(obj) {
    console.log(obj);
    const keys = Object.keys(obj);
    console.log(keys.map(key => obj[key]);
    return keys.map(key => obj[key]);
    }
}
