import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddatabaseComponent } from './adddatabase.component';

describe('AdddatabaseComponent', () => {
  let component: AdddatabaseComponent;
  let fixture: ComponentFixture<AdddatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
