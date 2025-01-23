import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllUserListComponent } from './get-all-user-list.component';

describe('GetAllUserListComponent', () => {
  let component: GetAllUserListComponent;
  let fixture: ComponentFixture<GetAllUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
