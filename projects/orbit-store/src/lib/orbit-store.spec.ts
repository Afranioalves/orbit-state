import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitStore } from './orbit-store';

describe('OrbitStore', () => {
  let component: OrbitStore;
  let fixture: ComponentFixture<OrbitStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrbitStore],
    }).compileComponents();

    fixture = TestBed.createComponent(OrbitStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
