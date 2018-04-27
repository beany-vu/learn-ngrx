import { RemoveTabItemOuttaWorkspace } from './../../store/entities/workspace/workspace.actions';
import { Tab } from './../../store/entities/workspace/tab.model';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../appState';
import { WorkspaceActionTypes } from '../../store/entities/workspace/workspace.actions';


@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @Input() tab: Tab;
  @Input() classList: Array<string>;
  @Input() type: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
  }

  closeTabItem(href) {
    this.store.dispatch({
      type: WorkspaceActionTypes.RemoveTabItemOuttaWorkspace,
      payload: {
        type: this.type,
        href: href
      }
    })
  }
}
