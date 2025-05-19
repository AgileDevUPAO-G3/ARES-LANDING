import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasDisponiblesComponent } from './mesas-disponibles.component';

describe('MesasDisponiblesComponent', () => {
  let component: MesasDisponiblesComponent;
  let fixture: ComponentFixture<MesasDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesasDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
