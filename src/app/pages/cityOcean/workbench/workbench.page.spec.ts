import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkbenchPage } from './workbench.page';

describe('WorkbenchPage', () => {
  let component: WorkbenchPage;
  let fixture: ComponentFixture<WorkbenchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkbenchPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkbenchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
